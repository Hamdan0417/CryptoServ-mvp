// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

/// @title StakingPools
/// @notice Minimal staking pool manager backing SERV-based gating.
contract StakingPools is Ownable {
    struct Pool {
        bool exists;
        uint256 totalStaked;
        uint256 lockPeriod;
    }

    struct StakeInfo {
        uint256 amount;
        uint256 depositedAt;
    }

    IERC20 public immutable servToken;

    uint256 public poolCount;
    mapping(uint256 => Pool) public pools;
    mapping(uint256 => mapping(address => StakeInfo)) public stakes;

    event PoolCreated(uint256 indexed poolId, uint256 lockPeriod);
    event Staked(address indexed user, uint256 indexed poolId, uint256 amount);
    event Withdrawn(address indexed user, uint256 indexed poolId, uint256 amount);

    constructor(address tokenAddress, address owner) Ownable(owner) {
        servToken = IERC20(tokenAddress);
    }

    function createPool(uint256 lockPeriod) external onlyOwner returns (uint256) {
        uint256 poolId = poolCount;
        pools[poolId] = Pool({exists: true, totalStaked: 0, lockPeriod: lockPeriod});
        poolCount += 1;
        emit PoolCreated(poolId, lockPeriod);
        return poolId;
    }

    function stake(uint256 poolId, uint256 amount) external {
        require(amount > 0, "amount=0");
        Pool storage pool = pools[poolId];
        require(pool.exists, "pool missing");
        StakeInfo storage info = stakes[poolId][msg.sender];
        servToken.transferFrom(msg.sender, address(this), amount);
        info.amount += amount;
        info.depositedAt = block.timestamp;
        pool.totalStaked += amount;
        emit Staked(msg.sender, poolId, amount);
    }

    function withdraw(uint256 poolId, uint256 amount) external {
        Pool storage pool = pools[poolId];
        require(pool.exists, "pool missing");
        StakeInfo storage info = stakes[poolId][msg.sender];
        require(info.amount >= amount, "insufficient");
        if (pool.lockPeriod > 0) {
            require(block.timestamp >= info.depositedAt + pool.lockPeriod, "locked");
        }
        info.amount -= amount;
        pool.totalStaked -= amount;
        servToken.transfer(msg.sender, amount);
        emit Withdrawn(msg.sender, poolId, amount);
    }

    function getStake(address user, uint256 poolId) external view returns (uint256 amount, uint256 depositedAt) {
        StakeInfo memory info = stakes[poolId][user];
        return (info.amount, info.depositedAt);
    }
}
