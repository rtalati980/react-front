import React, { useState, useEffect } from 'react';
import './productc.css';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { add } from "../component/Slices/CartSlice";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from "notistack";

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
    <div className='container-fluid ct' style={{ backgroundColor: '#deb88c', height: 'auto' }}>
      <div className='intro'>
        <h2>Discover the Assurance of Certified Gemstones</h2>
        <p>
          When it comes to purchasing gemstones, authenticity and quality are paramount. At Radha Krishna Mart, we are committed to providing you with only the finest certified gemstones, ensuring that every piece you purchase is genuine and of the highest quality.
        </p>
        <h3>Why Choose Certified Gemstones?</h3>
        <ul>
          <li><strong>Guaranteed Authenticity:</strong> Certified gemstones come with a certificate of authenticity from reputable gemological laboratories, verifying the gemstone's origin, quality, and properties.</li>
          <li><strong>Quality Assurance:</strong> Certification ensures that the gemstone meets specific standards for color, clarity, cut, and carat weight, giving you confidence in your purchase.</li>
          <li><strong>Ethical Sourcing:</strong> Certified gemstones often come with assurance of ethical sourcing, meaning they are mined and processed in a responsible and sustainable manner.</li>
          <li><strong>Peace of Mind:</strong> When you buy a certified gemstone, you have peace of mind knowing that you are getting what you pay for. The certification provides detailed information about the gemstone, removing any doubts about its quality and authenticity.</li>
        </ul>
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
                  <p className='card-text' style={{ color: '#b16f23' }}>Starting from: Rs. {pro.price}.00</p>
                  <p className='card-text logss' style={{ color: '#b16f23' }}>Radhe Krishna Mart</p>
                 
                </div>
              </div>
            </div>
          ))
        ))}
      </div>
    </div>
  );
};

export default GemStone;
