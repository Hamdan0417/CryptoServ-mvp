// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

/// @title SERVToken
/// @notice Basic ERC20 token placeholder for the Crypto Serv ecosystem.
contract SERVToken is ERC20, Ownable {
    constructor(address owner) ERC20("SERV Token", "SERV") Ownable(owner) {
        _mint(owner, 1_000_000 ether);
    }
}
