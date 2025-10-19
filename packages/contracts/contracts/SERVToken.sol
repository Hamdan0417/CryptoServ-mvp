// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC20Burnable} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

/// @title SERVToken
/// @notice Basic ERC20 token placeholder for the Crypto Serv ecosystem.
contract SERVToken is ERC20, ERC20Burnable, Ownable {
    address public treasury;

    event TreasuryUpdated(address indexed treasury);

    constructor(address owner, address initialTreasury) ERC20("SERV Token", "SERV") Ownable(owner) {
        treasury = initialTreasury;
        _mint(owner, 1_000_000 ether);
    }

    function setTreasury(address newTreasury) external onlyOwner {
        require(newTreasury != address(0), "treasury required");
        treasury = newTreasury;
        emit TreasuryUpdated(newTreasury);
    }

    function mint(address to, uint256 amount) external {
        require(msg.sender == owner() || msg.sender == treasury, "unauthorized");
        _mint(to, amount);
    }
}
