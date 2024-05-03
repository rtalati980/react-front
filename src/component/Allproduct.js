import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './productc.css'

// Function to fetch products data
const fetchData = async () => {
  try {
    const response = await fetch(`https://radhakrishnamart.azurewebsites.net/product/api/`, {
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

  // Function to add a product to the cart
  const handleAddToCart = (product) => {
    addToCart(product); // Pass the product to the addToCart function
    console.log("Added to cart:", product);
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
          <img src={`https://radhakrishnamart.azurewebsites.net/product/api/images/product_images/${getFileName(product.images[0])}`} alt={product.name} />
          <h2><Link to={`/product/${product.id}`}>{product.name}</Link></h2> 
          <h3>Rs. {product.price}.00</h3>
          <p>Radhe Krishna Mart</p>
          <Link to='/cart'><button   onClick={() => addToCart(product)}>Add To Cart</button></Link>
        </div>
      ))}
      </div>
        </div>
    </div>
  );
};

export default AllProducts;