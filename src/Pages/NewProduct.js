import React, { useState, useEffect } from "react";
import "../App.css";
import AddProductForm from "../components/AddProductForm";
import BackProductButton from "../components/BackProductButton";

function Products() {
  const [products, setProducts] = useState([]);
	
	useEffect(() => {
		fetch("/products").then((res) =>
			res.json().then((data) => {

        console.log(data)

        
			})
		);
	}, []);


	return (
		<div className="App">
			<header className="App-header">
				<h1>React and flask</h1>
                <AddProductForm/>
                <BackProductButton/>

			</header>
		</div>
	);
}

export default Products;
