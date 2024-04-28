import React, { useState } from 'react';
import './App.css';
import Layout from './component/Layout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './component/Home';
import About from './component/about/About';
import Contact from './component/contact/Contact';
import Cart from './component/cart/Cart';
import Product from './component/Product';
import Rudraksh from './component/Rudraksh';
import Gemstone from './component/Gemstone';
import DetailsPro from './component/DetailsPro';
import Checkout from './component/Checkout';
import AllProducts from './component/Allproduct';

function App() {
  const [cart, setCart] = useState([]);

  // Function to add a product to the cart
  const addToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
  };

  // Function to handle adding a product to the cart with additional logic
  const handleAddToCart = (product) => {
    addToCart(product); // Call the addToCart function to add the product to the cart
    console.log('Product added to cart:', product);
    // You can add more custom logic here if needed
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/collection/:categoryName" element={<Product addToCart={handleAddToCart} />} />
            <Route path="/product/:id" element={<DetailsPro />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/rudraksh" element={<Rudraksh addToCart={handleAddToCart} />} />
            <Route path="/gemstone" element={<Gemstone addToCart={handleAddToCart} />} />
            <Route path="/products/" element={<AllProducts addToCart={handleAddToCart} />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart cart={cart} />} />
            <Route path="/checkout" element={<Checkout />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;