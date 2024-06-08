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
import Terms from './pages/Terms';
import Shipping from './pages/Shipping';
import Privacy from './pages/Privacy';
import Refund from './pages/Refund';
import Login from './component/Login';
import AdminHome from './component/AdminHome';
import AddProduct from './component/admin/AddProduct';
import Category from './component/admin/category/Category';
import AddCategory from './component/admin/addCategory/AddCategory';
import Product2 from './component/admin/product/Product';
import Contact2 from './component/admin/contact/Contact';
import Email from './component/admin/Subscribe/Subscribe';
import Order from './component/admin/Order';
import Dashboard from './component/Dashboard';
import PrivateRoute from './component/PrivateRoute';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/dashboard" element={<PrivateRoute><AdminHome /></PrivateRoute>}>
            <Route path="" element={<Dashboard />} />
            <Route path="product" element={<Product2 />} />
            <Route path="addproducts" element={<AddProduct />} />
            <Route path="category" element={<Category />} />
            <Route path="addcategory" element={<AddCategory />} />
            <Route path="query" element={<Contact2 />} />
            <Route path="subcribeEmail" element={<Email />} />
            <Route path="orders" element={<Order />} />
          </Route>
          <Route
            path="*"
            element={
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
                    <Route path="/products" element={<AllProducts />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/refund" element={<Refund />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/shipping" element={<Shipping />} />
                  </Routes>
                </Layout>
              </CartProvider>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
