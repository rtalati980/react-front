import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './productc.css'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const fetchData = async () => {
 
  try {
    const response = await fetch(`http://ec2-13-201-60-182.ap-south-1.compute.amazonaws.com:8080/category/api/`,{
      method: 'GET'
    }
    
    );
   
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


const Product = ({ addToCart }) => {
  const [category, setCategory] = useState([]);
  const { categoryName } = useParams();

  const [cart, setCart] = useState([]); // Initialize cart state as an empty array

  // Function to add a product to the cart
  const handleAddToCart = (pro) => {
    const updatedCart = [...cart, pro]; // Add the product to the cart array
    setCart(updatedCart); // Update the cart state with the new product
    addToCart(pro); // Pass the product to the addToCart function (optional)

    console.log(addToCart(pro));
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
   
  const filteredCategory = category.filter(cat => cat.name === categoryName);

  console.log(categoryName);
  return (
    <div className='mcn'>
    {filteredCategory.map(cat => (
  <div key={cat.name} className='pcb' >
    <div className='pcntr' >
      {(cat.products).map(pro => (
        <div key={pro.id}  className='ctpro' >
          <img 
             src= {`http://ec2-13-201-60-182.ap-south-1.compute.amazonaws.com:8080/product/api/images${pro.images[0]}`}
              alt={pro.name} />
          <h2><Link to={`/product/${pro.id}`}>{pro.name}</Link></h2> 
          <h3>Rs. {pro.price}.00</h3>
           <p>Radhe Krishna Mart</p>
           <Link to={'/cart'} ><button onClick={() => addToCart(pro)}>Add To Cart</button></Link>
        </div>
      ))}
    </div>
  </div>
))}   
</div>
)
}

export default Product;
