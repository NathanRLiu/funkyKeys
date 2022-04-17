import React from 'react';

class ActionButtons extends React.Component {
	constructor(props){
		super(props);
	}
  render() {
    return (
			<div className = "actionButtons">
				<button className = "buyButton"> Buy </button> 
				<button className = "sellButton"> Sell </button> 
				<button className = "exchangeButton"> Exchange </button> 
			</div>
		);
  }
}

export default ActionButtons;
