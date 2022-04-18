import React from 'react';
import MetaMaskOnboarding from '@metamask/onboarding'
//Chain Params
// Polygon Mainnet Params
const POLYGON_MAINNET_PARAMS = {
  chainId: '0x89', // 137
  chainName: 'Polygon Mainnet',
  nativeCurrency: {
    name: 'MATIC Token',
    symbol: 'MATIC',
    decimals: 18
  },
  rpcUrls: ['https://rpc-mainnet.matic.quiknode.pro'],
  blockExplorerUrls: ['https://polygonscan.com/']
}

// Polygon Testnet params
const POLYGON_TESTNET_PARAMS = {
  chainId: '0x13881', // 8001
  chainName: 'Mumbai',
  nativeCurrency: {
    name: 'MATIC Token',
    symbol: 'MATIC',
    decimals: 18
  },
  rpcUrls: ['https://matic-mumbai.chainstacklabs.com/'],
  blockExplorerUrls: ['https://mumbai.polygonscan.com/']
}

const SELECTED_NETWORK_PARAMS = POLYGON_TESTNET_PARAMS;
//const SELECTED_NETWORK_PARAMS = POLYGON_MAINNET_PARAMS;

const sameChain = (chain) => chain === SELECTED_NETWORK_PARAMS.chainId.toLowerCase();

class Wallet extends React.Component {
	constructor(props){
		super(props);
		this.attemptConnection = this.attemptConnection.bind(this);
		this.switchNetwork = this.switchNetwork.bind(this);
		this.buttonClick = this.buttonClick.bind(this);
	}

  switchToPolygonChain () {
		//switch from a non polygon chain to polygon
    window.ethereum
      .request({
        method: 'wallet_addEthereumChain',
        params: [SELECTED_NETWORK_PARAMS]
      })
  }

	componentDidMount(){
		if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      this.attemptConnection()

      // Update the list of accounts if the user switches accounts in MetaMask
      window.ethereum.on('accountsChanged', accounts => this.props.updateAccount(accounts[0]));

      // Reload the site if the user selects a different chain
      window.ethereum.on('chainChanged', () => window.location.reload())

      // Set the chain id once the MetaMask wallet is connected
      window.ethereum.on('connect', (connectInfo) => {
        const chainId = connectInfo.chainId
				this.props.updateChain(chainId);
        if (sameChain(chainId)) {
          // The user is now connected to the MetaMask wallet and has the correct
          // Avalanche chain selected.
          //this.props.onConnected()
        }
      })
    }
	}

	async attemptConnection(){
		if (window.ethereum){
			try{
				const res = await window.ethereum.request({
					method: "eth_requestAccounts",
				});
				this.props.updateAccount(res[0]);
			}catch (err){
				console.error(err);
			}
		}else{
			alert("Metamask is not installed.");
		}
	}

	async switchNetwork(){
		if (window.ethereum){
			try{
				const res = await window.ethereum.request({
					method: "wallet_addEthereumChain",
					params: [SELECTED_NETWORK_PARAMS]
				});
				this.props.updateChain(SELECTED_NETWORK_PARAMS.chainId);
			}catch (err){
				console.error(err);
			}
		}else{
			alert("Metamask is not installed.");
		}
	}

	buttonClick(){
		if (!this.props.walletAddress){
			this.attemptConnection();
		}else if (!sameChain(this.props.chainId)){
			this.switchNetwork();
		}
	}

  render() {
    return (
			<>
				<button onClick={this.buttonClick}>
					{(this.props.walletAddress && sameChain(this.props.chainId) && "Connected!") || (!this.props.walletAddress && "Connect Wallet") || (!sameChain(this.props.chainId) && "Switch networks")}
				</button>
				<p style={{"color":"yellow"}}>{this.props.walletAddress}</p>
				<p style={{"color":"yellow"}}>{this.props.chainId}</p>
			</>
		);
  }
}

export default Wallet;
