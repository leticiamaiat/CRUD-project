import React, { useState, useEffect } from "react";
import "../App.css";
import ClientsTable from "../components/MyTable";
import NewProductsButton from "../components/NewProductsButton";

function Products() {
  const [products, setProducts] = useState([]);
	// usestate for setting a javascript
	// object for storing and using dat

	// Using useEffect for single rendering
	useEffect(() => {
		// Using fetch to fetch the api from
		// flask server it will be redirected to proxy
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
                <NewProductsButton/>
        		<ClientsTable/>
        
				{/* Calling a data from setdata for showing */}
			

			</header>
		</div>
	);
}

export default Products;
