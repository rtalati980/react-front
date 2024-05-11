import React, { useState, useEffect } from 'react';
import './productc.css';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useCart } from './CartContext'; // Import the useCart hook

const fetchData = async () => {
  try {
    const response = await fetch('https://ec2.radhakrishnamart.com:8443/category/api/', {
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

const GemStone = () => {
  const [category, setCategory] = useState([]);
  const { categoryName } = useParams();
  const { dispatch } = useCart(); // Use the useCart hook to access the dispatch function

  const handleAddToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  useEffect(() => {
    const fetchCategory = async () => {
      const fetchedCategory = await fetchData();
      if (fetchedCategory) {
        setCategory(fetchedCategory);
      }
    };

    fetchCategory();
  }, []);

  const filteredCategory = category.filter((cat) => cat.name === 'Gemstone');

  console.log(categoryName);

  return (
    <div className='mcn'>
      {filteredCategory.map((cat) => (
        <div key={cat.name} className='pcb'>
          <div className='pcntr'>
            {cat.products.map((pro) => (
              <div key={pro.id} className='ctpro'>
                <Link to={`/product/${pro.id}`}>
                  <img src={`${pro.images[0]}`} alt={`${pro.name}`} />
                </Link>
                <h2>
                  <Link to={`/product/${pro.id}`}>{pro.name}</Link>
                </h2>
                <h3>Rs. {pro.price}.00</h3>
                <p>Radhe Krishna Mart</p>
                <Link to='/cart'><button   onClick={() =>handleAddToCart(pro)}>Add To Cart</button></Link>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GemStone;
