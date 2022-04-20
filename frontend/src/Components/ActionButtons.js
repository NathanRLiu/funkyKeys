import React from 'react';
import {ethers} from 'ethers';

class ActionButtons extends React.Component {
	constructor(props){
		super(props);
		this.buy = this.buy.bind(this);
	}
	async buy(){
		const cost = await this.props.contract.getPrice(this.props.productId);
		const options = {"value":ethers.utils.parseEther(cost+"")}
		this.props.contract.buyListing(this.props.productId, options);
	}
  render() {
    return (
			<div className = "actionButtons">
				<button className = "buyButton" onClick={this.buy}> Buy </button> 
				<button className = "sellButton"> Sell </button> 
				<button className = "exchangeButton"> Exchange </button> 
			</div>
		);
  }
}

export default ActionButtons;
