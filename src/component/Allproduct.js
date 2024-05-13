import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './productc.css';
import { add, remove } from "../component/Slices/CartSlice";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from "notistack";


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

const AllProducts = ({ product }) => {
  const [products, setProducts] = useState([]);

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
    <div className='container-fluid' style={{ backgroundColor: '#deb88c' ,minHeight:'100vh'}}>
  <div className='row  row-cols-2 row-cols-md-2 row-cols-lg-4'>
    {products.map(product => (
      <div key={product.id} className='col  mt-5 mb-4 '>
        <div className='card' style={{  border: '1px solid #b16f23', backgroundColor: 'transparent',height:'450px' }}>
  <Link to={`/product/${product.id}`}><img src={`${product.images[0]}`} className='card-img-top' alt={`${product.name}`} style={{height:'250px'}}/></Link>
  <div className='card-body'>
  <h5 className='card-title' >
  <Link style={{ color: '#b16f23',textDecoration:'none'}} to={`/product/${product.id}`}>{product.name}</Link>
</h5>
    <p className='card-text'>Rs. {product.price}.00</p>
    <p className='card-text'>Radhe Krishna Mart</p>
    <button className='btn btn-primary' style={{ backgroundColor: '#b16f23', border: 'none' }} onClick={() => addToCart(product)}  >Add To Cart</button>
  </div>
</div>
      </div>
    ))}
  </div>
</div>
  );
};

export default AllProducts;