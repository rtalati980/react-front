import React from 'react';
import { Link } from 'react-router-dom';
import './menu.css';

export default function Menu() {
  return (
    <div className='mainm'>
      <div className='conatinerm'>
      <Link to='/admin/dashboard/'><h1>DashBoard</h1></Link>
        <hr />
        <div className='items'>
          <li>
            <Link to='/admin/dashboard/product'>Product</Link>
            <Link to='/admin/dashboard/addproducts'>Add Product</Link>
            <Link to='/admin/dashboard/category'>Category</Link>
            <Link to='/admin/dashboard/addcategory'>Add Category</Link>
            <Link to='/admin/dashboard/orders'>Order</Link>
            <Link to='/admin/dashboard/query'>Querys</Link>
            <Link to='/admin/dashboard/subcribeEmail'>SubcribeEmail</Link>
          </li>
        </div>
      </div>
    </div>
  );
}
