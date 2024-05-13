// App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './component/CartContext';
import Layout from './component/Layout';
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
  return (
   
    <div className="App">
      <BrowserRouter>
        <CartProvider>
          <Layout>
            <Routes>
              <Route index element={<Home />} />
              <Route path="/collection/:categoryName" element={<Product />} />
              <Route path="/product/:id" element={<DetailsPro />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/rudraksh" element={<Rudraksh />} />
              <Route path="/gemstone" element={<Gemstone />} />
              <Route path="/products/" element={<AllProducts />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </Layout>
        </CartProvider>
      </BrowserRouter>
    </div>
    
  );
}

export default App;