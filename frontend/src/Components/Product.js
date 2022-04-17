import React from 'react';
import ActionButtons from './ActionButtons';

class Product extends React.Component {
	constructor(props){
		super(props);
	}
  render() {
    return (
			<div className = "productDiv">
				<div className = "productTitle"> {this.props.productInfo.product} </div>
				<div className = "productImage">
					<img src={this.props.productInfo.image} className="productImage" alt={this.props.productInfo.description} width="250" height="250"/>
				</div>
				<div className = "productDescription"> {this.props.productInfo.description} </div>
				<ActionButtons/>
			</div>
		);
  }
}

export default Product;
