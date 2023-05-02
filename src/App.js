import React from 'react';
import './App.css';

import { BrowserRouter as Router, Routes, Route}
	from 'react-router-dom';
import Products from './Pages/Products';
import NewProducts from './Pages/NewProduct';

function App() {
return (
	<Router>
	<Routes>
		<Route exact path='/' element={<Products />} />
		<Route path='/NewProducts' element={<NewProducts/>} />
	</Routes>
	</Router>
);
}

export default App;
