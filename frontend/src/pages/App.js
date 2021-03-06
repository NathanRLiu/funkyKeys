import './App.css';
import React from 'react';
import Wallet from '../Components/Wallet';
import Product from '../Components/Product';
import { ethers } from "ethers";

import ContractArtifact from '../contract/FunkyKeys.json';
const ContractAddress = '0x44987b46E9C52215AB269160dbE3064aC8740e85';


let testJSON = {
	"productId":0,
	"product":"Name",
	"description":"A short paragraph or tagline that gives a bit more info.",
	"image":"https://ipfs.io/ipfs/bafkreifd47nriehb6mrkt32yzyvbfs7em2ed77yyevpzwr465tharncfsu"
};
class App extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			"address":null,
			"chain":null,
			"contract":null,
		};
		this.updateAccount = this.updateAccount.bind(this);
		this.updateChain = this.updateChain.bind(this);
	}
	
	async onWalletConnect(){
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const contract = new ethers.Contract(
			ContractAddress,
			ContractArtifact.abi,
			provider.getSigner()
		);
		this.setState({"contract":contract});
	}
	async isMetaMaskConnected(){
		if (window.ethereum){
			let provider = new ethers.providers.Web3Provider(window.ethereum);
			const accounts = await provider.listAccounts();
			if (accounts.length > 0) {
				this.setState({"address":accounts[0].toLowerCase()});
				if (this.state.contract == null){
					this.onWalletConnect();
				}
			}
		}
	}
	
	componentDidMount(){
		this.isMetaMaskConnected();
	}

	updateAccount(newAddress){
		this.setState({"address":newAddress});
		this.onWalletConnect();
	}
	
	updateChain(newChain){
		this.setState({"chain":newChain});
	}

	render(){
		return (
			<>
				<Wallet updateChain={this.updateChain} updateAccount={this.updateAccount} walletAddress={this.state.address} chainId={this.state.chain}/>
			{/*<Wallet updateAccount={this.updateAccount} walletAddress={this.state.address}/>*/}
				<Product productInfo={testJSON} walletAddress={this.state.address} contract={this.state.contract}/>
			</>
		);
	}
}

export default App;
