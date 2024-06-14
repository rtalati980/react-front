import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { add, remove } from "../component/Slices/CartSlice";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import './productc.css';

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
      <div className='container-fluid ct' style={{ backgroundColor: '#deb88c', height: 'auto' }}>
      <div className='intro'>
        <h2>Discover the Assurance of Certified Rudraksha</h2>
        <p>
          When it comes to spiritual and healing practices, authenticity and quality are of utmost importance. At Hare Krishna Mart, we are dedicated to providing you with the finest certified Rudraksha beads, ensuring that each bead you purchase is genuine and holds its spiritual essence.
        </p>
        <h3>Why Choose Certified Rudraksha?</h3>
        <ul>
          <li><strong>Guaranteed Authenticity:</strong> Certified Rudraksha beads come with a certificate of authenticity from reputable sources, verifying the bead's origin, type, and quality.</li>
          <li><strong>Spiritual Benefits:</strong> Authentic Rudraksha beads are known to offer numerous spiritual and health benefits, including enhancing meditation, reducing stress, and promoting overall well-being.</li>
          <li><strong>Quality Assurance:</strong> Certification ensures that the Rudraksha bead meets specific standards for its mukhi (faces), size, shape, and natural properties, giving you confidence in your purchase.</li>
          <li><strong>Ethical Sourcing:</strong> Certified Rudraksha beads are sourced ethically, ensuring they are harvested and processed in a sustainable and responsible manner.</li>
          <li><strong>Peace of Mind:</strong> When you buy a certified Rudraksha, you have peace of mind knowing that you are receiving a genuine and potent spiritual tool. The certification provides detailed information about the bead, removing any doubts about its authenticity and efficacy.</li>
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
