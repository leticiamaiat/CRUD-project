import React from 'react';
import { Link } from 'react-router-dom';

const NewProductsButton = () => {
  return (
    <Link to="/NewProducts">
      <button>Add New Product</button>
    </Link>
  );
};

export default NewProductsButton;
