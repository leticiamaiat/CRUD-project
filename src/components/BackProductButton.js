import React from 'react';
import { Link } from 'react-router-dom';

const BackProductButton = () => {
  return (
    <Link to="/">
      <button>Back to Products</button>
    </Link>
  );
};

export default BackProductButton;
