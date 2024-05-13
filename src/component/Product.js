import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './productc.css';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
// Import useDispatch

import { add, remove } from "../component/Slices/CartSlice";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from "notistack";// Import the addToCart action

const Product = ({ pro }) => {
  const [isLoading, setIsLoading] = useState(true); // Add a loading state

  const [category, setCategory] = useState([]); 
  const { categoryName } = useParams();

  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const addToCart = (product) => {
    dispatch(add(product)); // Pass product as payload to the add action
    enqueueSnackbar(`Item added to your cart successfully`, {
      variant: "success",
      autoHideDuration: 3000,
    });
    console.log(cart);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://ec2.radhakrishnamart.com:8443/category/api/`);
        setCategory(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false); // Set loading state to false after fetching (optional)
      }
    };

    fetchData();
  }, []);

  const filteredCategory = category.filter((cat) => cat.name === categoryName);

  return (
    <div className='container-fluid' style={{ backgroundColor: '#deb88c', height:'auto' }}>
      {isLoading ? ( // Conditionally render loading message or spinner
        <p>Loading products...</p>
      ) : (
        <div className='row row-cols-1 row-cols-sm-2 row-cols-lg-4'>
          {/* Rest of your product rendering logic */}
          {filteredCategory.map((cat) => (
            cat.products.map((pro) => (
              <div key={pro.id} className='col p-3'>
                <div className='card mb-3' style={{ border: '1px solid #b16f23', padding: '10px', backgroundColor: '#deb88c', width: '250px' }}>
                  <Link to={`/product/${pro.id}`}>
                    <img src={`${pro.images[0]}`} className='card-img-top' alt={`${pro.name}`} style={{ height: '200px', objectFit: 'cover' }} />
                  </Link>
                  <div className='card-body'>
                    <h5 className='card-title' style={{ color: '#b16f23' }}>
                      <Link to={`/product/${pro.id}`} style={{ textDecoration: 'none' }}>{pro.name}</Link>
                    </h5>
                    <p className='card-text'>Price: Rs. {pro.price}.00</p>
                    <p className='card-text'>Radhe Krishna Mart</p>
                    {pro && ( // Conditionally render button only if product is available
                      <button className='btn btn-primary' style={{ backgroundColor: '#b16f23', border: 'none' }} onClick={() => addToCart(pro)}>
                        Add To Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ))}
        </div>
      )}
    </div>
  );
};

export default Product;