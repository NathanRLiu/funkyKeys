//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract FunKey is ERC1155{
    
    address public governance;
    uint256 public productCount;

    constructor() public ERC1155("") {
        governance = msg.sender;

        productCount = 0;
    }

    
    modifier ensureCallerIsOwner() {
        require(governance == msg.sender, "Caller is not governance.");
        _;
    }

    function addNewProduct(uint256 initialSupply) external ensureCallerIsOwner {
        productCount++;

        _mint(msg.sender, productCount, initialSupply, "");
    }
}
