const FunkyKeys = artifacts.require("FunkyKeys");

module.exports = function(deployer, network, accounts){
	const inventoryAddress = accounts[1];
	deployer.deploy(FunkyKeys, inventoryAddress);
};
