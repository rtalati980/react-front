import React, { useState, useEffect } from 'react';
import './productc.css';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { add } from "../component/Slices/CartSlice";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
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
    dispatch(add(product)); // Pass product as payload to the add action
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

  const filteredCategory = category.filter((cat) => cat.name === 'Gemstone');

  return (
    <div className='product_section'>
      <div className='container-fluid ct'>
        <div className='intro'>
          <h2>Discover the Assurance of Certified Gemstones</h2>
          <p>
            When it comes to purchasing gemstones, authenticity and quality are paramount. At Radha Krishna Mart, we are committed to providing you with only the finest certified gemstones, ensuring that every piece you purchase is genuine and of the highest quality.
          </p>
        </div>
        <div className='' style={{ backgroundColor: '#deb88c', height: 'auto' }}>
          <div className='row ctr row-cols-2 row-cols-sm-2 row-cols-md-4'>
            {filteredCategory.map((cat) =>
              cat.products.map((pro) => (
                <div key={pro.id} className='col cp'>
                  <div className='card mb-3 crd' style={{ border: '1px solid #b16f23', padding: '10px', backgroundColor: '#deb88c', maxWidth: '250px', height: 'auto' }}>
                    <Link to={`/product/${pro.id}`}>
                      <img src={`${pro.images[0]}`} className='card-img-top' alt={`${pro.name}`} style={{ height: 'auto', width: '100%', objectFit: 'cover' }} />
                    </Link>
                    <div className='card-body'>
                      <h5 className='card-title' style={{ color: '#b16f23' }}>
                        <Link to={`/product/${pro.id}`} style={{ fontSize: '17px', color: '#b16f23', textDecoration: 'none' }}>{pro.name}</Link>
                      </h5>
                      <p className='card-text' style={{ color: '#b16f23', fontWeight: 'bold' }}>Starting from: Rs. {pro.price}.00</p>
                      <div className='rating' style={{ color: '#b16f23', fontWeight: 'bold' }}>
                        {Array.from({ length: 5 }, (_, i) => (
                          <span key={i} className={i < pro.rating ? 'fa fa-star checked' : 'fa fa-star'}></span>
                        ))}
                      </div>
                      <p className='card-text logss' style={{ color: '#b16f23' }}>Radhe Krishna Mart</p>
                      <Link to={`/product/${pro.id}`} className='btn btn-primary' style={{ backgroundColor: '#b16f23', border: 'none' }}>
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GemStone;
