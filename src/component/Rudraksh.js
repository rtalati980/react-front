import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
 // Import the useCart hook
 import { add, remove } from "../component/Slices/CartSlice";
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
 // Use the useCart hook to access the dispatch function

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

  const filteredCategory = category.filter((cat) => cat.name === 'Rudraksha');

  return (
    <div className='container-fluid ct' style={{ backgroundColor: '#deb88c', minHeight: '100vh' }}>
  <div className='row row-cols-1  ctr row-cols-sm-2 row-cols-lg-4'>
    {filteredCategory.map((cat) => (
      cat.products.map((pro) => (
        <div key={pro.id} className='col cp p-3'> {/* Use product id as key */}
          <div className='card mb-3 crd' style={{ border: '1px solid #b16f23', padding: '10px', backgroundColor: '#deb88c', width: '250px' }}>
            <Link to={`/product/${pro.id}`}>
              <img src={`${pro.images[0]}`} className='card-img-top' alt={`${pro.name}`} style={{ height: '200px', objectFit: 'cover' }} />
            </Link>
            <div className='card-body'>
              <h5 className='card-title' style={{ color: '#b16f23' }}>
                <Link to={`/product/${pro.id}`} style={{ textDecoration: 'none' }}>{pro.name}</Link>
              </h5>
              <p className='card-text'>Price: Rs. {pro.price}.00</p>
              <p className='card-text'>Radhe Krishna Mart</p>
              <button className='btn btn-primary' style={{ backgroundColor: '#b16f23', border: 'none' }} onClick={() => addToCart(pro)}>Add To Cart</button>
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