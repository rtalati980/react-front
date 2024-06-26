import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { add, remove } from "../component/Slices/CartSlice";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import './productc.css';
import API_BASE_URL from '../config';

const fetchData = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/category/api/`, {
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
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const addToCart = (product) => {
    dispatch(add(product));
    enqueueSnackbar(`Item added to your cart successfully`, {
      variant: "success",
      autoHideDuration: 3000,
    });
    console.log(cart);
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

  const filteredCategory = category.filter((cat) => cat.name === 'Rudraksha');

  return (
    <div className='product_rudraksh'>
      <div className='container-fluid ct' >
      <div className='intro'>
        <h2>Discover the Assurance of Certified Rudraksha</h2>
        <p>
          When it comes to spiritual and healing practices, authenticity and quality are of utmost importance. At Hare Krishna Mart, we are dedicated to providing you with the finest certified Rudraksha beads, ensuring that each bead you purchase is genuine and holds its spiritual essence.
        </p>
        
      </div>
      <div className='row ctr row-cols-2 row-cols-sm-2 row-cols-md-4'>
        {filteredCategory.map((cat) => (
          cat.products.map((pro) => (
            <div key={pro.id} className='col cp p-3'>
              <div className='card mb-3 crd' style={{ border: '1px solid #b16f23', padding: '10px', backgroundColor: '#deb88c', maxWidth: '250px', height:'auto' }}>
                <Link to={`/product/${pro.id}`}>
                  <img src={`${pro.images[0]}`} className='card-img-top' alt={`${pro.name}`} style={{ height: 'auto', width: '100%', objectFit: 'cover' }} />
                </Link>
                <div className='card-body'>
                  <h5 className='card-title' style={{ color: '#b16f23'  }}>
                    <Link to={`/product/${pro.id}`} style={{ fontSize: '17px', color: '#b16f23', textDecoration: 'none' }}>{pro.name}</Link>
                  </h5>
                  <p className='card-text' style={{ color: '#b16f23',fontWeight:'bold' }}>Starting from: Rs. {pro.price}.00</p>
                  <p className='card-text logss' style={{ color: '#b16f23' }}>Radhe Krishna Mart</p>
                  <Link to={`/product/${pro.id}`} className='btn btn-primary' style={{ backgroundColor: '#b16f23', border: 'none' }}>
                        View
                      </Link>
                </div>
              </div>
            </div>
          ))
        ))}
      </div>
      </div>
      </div>
  );
};

export default GemStone;
