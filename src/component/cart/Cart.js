import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../CartContext'; // Import the useCart hook

const Cart = () => {
  const { state } = useCart(); // Use the useCart hook to access the state from the context
  const { cart } = state; // Destructure the cart from the state

  const [counts, setCounts] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState(0);

  // Function to update counts state and save to local storage
  const updateCounts = (newCounts) => {
    setCounts(newCounts);
    localStorage.setItem('cartCounts', JSON.stringify(newCounts));
  };

  // Function to update total price state and save to local storage
  const updateTotalPrice = (newTotalPrice) => {
    setTotalPrice(newTotalPrice);
    localStorage.setItem('totalPrice', newTotalPrice);
  };

  useEffect(() => {
    // Load cart counts from session storage on component mount
    const savedCounts = JSON.parse(sessionStorage.getItem('cartCounts'));
    if (savedCounts) {
      setCounts(savedCounts);
    }

    // Load total price from session storage on component mount
    const savedTotalPrice = sessionStorage.getItem('totalPrice');
    if (savedTotalPrice) {
      setTotalPrice(parseFloat(savedTotalPrice));
    }
  }, []);

  // Increment count for a specific item
  const handleIncrement = (itemId) => {
    updateCounts((prevCounts) => ({ ...prevCounts, [itemId]: (prevCounts[itemId] || 0) + 1 }));
  };

  // Decrement count for a specific item
  const handleDecrement = (itemId) => {
    if (counts[itemId] && counts[itemId] > 1) {
      updateCounts((prevCounts) => ({ ...prevCounts, [itemId]: prevCounts[itemId] - 1 }));
    }
  };

  // Delete item from counts
  const handleDeleteItem = (itemId) => {
    const updatedCounts = { ...counts };
    delete updatedCounts[itemId];
    updateCounts(updatedCounts);
  };

  return (
    <div className='container'>
      {cart.length > 0 ? (
          <div className='cart'>
          {cart.map((product) => (
            <div key={product.id} className='card mb-3'>
              <div className='row g-0'>
                <div className='col-md-4'>
                  <img src={`${product.images[0]}`} alt={`${product.name}`} className='img-fluid' />
                </div>
                <div className='col-md-8'>
                  <div className='card-body'>
                    <h5 className='card-title'>{product.name}</h5>
                    <p className='card-text'>Price: {product.price}</p>
                    <div className='d-flex align-items-center'>
                      <button className='btn btn-outline-secondary me-2' onClick={() => handleDecrement(product.id)}>-</button>
                      <span>{counts[product.id] || 0}</span>
                      <button className='btn btn-outline-secondary ms-2' onClick={() => handleIncrement(product.id)}>+</button>
                    </div>
                    <button className='btn btn-danger mt-2' onClick={() => handleDeleteItem(product.id)}>Remove</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div>Total Price: {totalPrice}</div>
        </div>
      )  : (
        <div className='text-center'>
          <h1>Your Cart Is Empty</h1>
          <Link to='/'>
            <button className='btn btn-primary'>Continue Shopping</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
