import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './productc.css';
import { useCart } from './CartContext';

// Function to fetch products data
const fetchData = async () => {
  try {
    const response = await fetch(`https://ec2.radhakrishnamart.com:8443/product/api/`, {
      method: 'GET'
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

const AllProducts = ({ addToCart }) => {
  const [products, setProducts] = useState([]);

  const { dispatch } = useCart(); // Use the useCart hook to access the dispatch function

  const handleAddToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };


  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await fetchData();
      setProducts(fetchedProducts);
    };

    fetchProducts();
  }, []);

  const getFileName = (path) => {
    const parts = path.split('/');
    return parts[parts.length - 1];
  };

  return (
    <div className='mcn'>
        <div className='pcb'>
            <div className='pcntr'>

      {products.map(product => (
        <div key={product.id} className='ctpro'>
              <Link to={`/product/${product.id}`}><img src={`${product.images[0]}`} alt={`${product.name}`} /></Link>  
          <h2><Link to={`/product/${product.id}`}>{product.name}</Link></h2> 
          <h3>Rs. {product.price}.00</h3>
          <p>Radhe Krishna Mart</p>
          <button   onClick={() =>handleAddToCart(product)}>Add To Cart</button>
        </div>
      ))}
      </div>
        </div>
    </div>
  );
};

export default AllProducts;