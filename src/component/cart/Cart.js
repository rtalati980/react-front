import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { remove } from '../Slices/CartSlice';

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleDeleteItem = (itemId) => {
    dispatch(remove(itemId));
  };

  const [counts, setCounts] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  // Function to update counts state and save to local storage
  const updateCounts = (newCounts) => {
    setCounts(newCounts);
    localStorage.setItem('cartCounts', JSON.stringify(newCounts));
  };

  useEffect(() => {
    // Load cart counts from session storage on component mount
    const savedCounts = JSON.parse(sessionStorage.getItem('cartCounts'));
    if (savedCounts) {
      setCounts(savedCounts);
    }

    // Calculate total price and quantity
    let price = 0;
    let quantity = 0;
    cart.forEach((product) => {
      price += product.price * (counts[product.id] || 1); // Start count from 1
      quantity += counts[product.id] || 1; // Start count from 1
    });
    setTotalPrice(price);
    setTotalQuantity(quantity);

  }, [cart, counts]);

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
                      <span>{counts[product.id] || 1}</span>
                      <button className='btn btn-outline-secondary ms-2' onClick={() => handleIncrement(product.id)}>+</button>
                    </div>
                    <button className='btn btn-danger mt-2' onClick={() => handleDeleteItem(product.id)}>Remove</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {/* Display all product names */}
          <div>
            <h3>Product Names:</h3>
            <ul>
              {cart.map((product) => (
                <li key={product.id}>{product.name}</li>
              ))}
            </ul>
          </div>
          {/* Calculate and display total price */}
          <div>Total Price: {totalPrice}</div>
          <div>Total quantity: {totalQuantity}</div>
          <Link to={`/checkout?totalPrice=${totalPrice}&totalQuantity=${totalQuantity}&productNames=${cart.map(product => product.name).join(',')}&productQuantities=${cart.map(product => counts[product.id] || 1).join(',')}`}>
  <button className='btn btn-primary'>
    Checkout ({totalPrice} - {totalQuantity} items)
  </button>
</Link>
        </div>
      ) : (
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
