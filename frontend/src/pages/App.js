import './App.css';
import React from 'react';
import Product from '../Components/Product.js';

let testJSON = {
	"product":"Name",
	"description":"A short paragraph or tagline that gives a bit more info.",
	"image":"https://ipfs.io/ipfs/bafkreifd47nriehb6mrkt32yzyvbfs7em2ed77yyevpzwr465tharncfsu"
}
function App() {
  return (
		<>
			<Product productInfo = {testJSON}/>
		</>
  );
}

export default App;
