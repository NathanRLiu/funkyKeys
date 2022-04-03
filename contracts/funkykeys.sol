//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract FunkyKeys is ERC1155{
		
	mapping(address => bool) private governance;
	address tokenInventory;
	uint256 private productCount;
	mapping(uint256 => uint256) productToPrice;
	
	event tokenBurned(address indexed _sender, uint256 indexed _tokenID, uint16 _amount);

	constructor(address _tokenInventory) public ERC1155("") {
		governance[msg.sender] = true;
		tokenInventory = _tokenInventory;
		productCount = 0;
	}

	modifier ensureCallerIsOwner() {
		require(governance[msg.sender], "Caller is not governance.");
		_;
	}

	function addOwner(address _newOwner) external ensureCallerIsOwner{
		governance[_newOwner] = true;
	}

	function addNewProduct(uint256 initialSupply, uint256 price) external ensureCallerIsOwner {
		_mint(tokenInventory, productCount, initialSupply, "");
		productToPrice[productCount] = price;
		productCount++;
	}

	function editPrice(uint256 price, uint256 _id) external ensureCallerIsOwner {
		productToPrice[_id] = price;
	}
	
	function getPrice(uint256 _id) public view returns (uint256){
		return productToPrice[_id];
	}
	
	function burn(uint256 _id, uint16 _count) public{
		_burn(msg.sender, _id, _count);
		emit tokenBurned(msg.sender, _id, _count);
	}

	function buyListing(uint256 _tokenID) public payable{
		require (msg.value == productToPrice[_tokenID] * (1 ether), "Send the exact amount specified by getPrice");
		_safeTransferFrom(tokenInventory, msg.sender, _tokenID, 1, "");
	}
}
