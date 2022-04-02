//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract FunkyKeys is ERC1155{
		
	address private governance;
	uint256 private productCount;
	
	event tokenBurned(address indexed _sender, uint256 indexed _tokenID, uint16 _amount);

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
	
	function burn(uint256 _id, uint16 _count) public{
		_burn(msg.sender, _id, _count);
		emit tokenBurned(msg.sender, _id, _count);
	}
}
