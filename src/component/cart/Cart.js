import React, { useState, useEffect } from 'react';
import './cart.css';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Cart = ({ cart }) => {
  const [counts, setCounts] = useState({});
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleIncrement = (itemId) => {
    setCounts({ ...counts, [itemId]: (counts[itemId] || 0) + 1 });
  };

  const handleDecrement = (itemId) => {
    if (counts[itemId] && counts[itemId] > 1) {
      setCounts({ ...counts, [itemId]: counts[itemId] - 1 });
    }
  };

  const handleDeleteItem = (itemId) => {
    const updatedCounts = { ...counts };
    delete updatedCounts[itemId];
    setCounts(updatedCounts);
  };

  useEffect(() => {
    const countsData = {};
    cart.forEach((item) => {
      countsData[item.id] = 1;
    });
    setCounts(countsData);

    // Calculate total price
    let totalPrice = 0;
    cart.forEach((item) => {
      totalPrice += item.price * (counts[item.id] || 1);
    });
    setTotalPrice(totalPrice);
  }, [cart]);

  const handleCheckout = () => {
    // Calculate product name, quantity, and total price
    let productName = '';
    let totalQuantity = 0;
    let totalPrice = 0;
  
    cart.forEach((item) => {
      productName += item.name + ', ';
      totalQuantity += counts[item.id] || 1;
      totalPrice += item.price * (counts[item.id] || 1);
    });
  
    // Remove trailing comma and space from productName
    productName = productName.replace(/, $/, '');
  
    // Update state
    setProductName(productName);
    setQuantity(totalQuantity);
    setTotalPrice(totalPrice);
  
    console.log(productName, totalQuantity, totalPrice); // Check the values immediately after setting state
  };
  
  useEffect(() => {
    // This useEffect hook will be called after productName, quantity, and totalPrice have been updated
    console.log(productName, quantity, totalPrice);
  }, [productName, quantity, totalPrice]);

  return (
    <div className='cart'>
      {cart.length > 0 ? (
        <div className='cartdd'>
          <h1>Your Cart</h1>
          <div className='head'>
            <p>Product</p>
            <p>Quantity</p>
            <p>Total</p>
          </div>
          <div className='items'>
            {cart.map((item) => (
              <div className='pr' key={item.id}>
                <img src={`${item.images[0]}`} alt={`${item.name}`} />
                <p>{item.name}</p>
                <div className='icp'>
                  <FaMinus onClick={() => handleDecrement(item.id)} />
                  <p>{counts[item.id] || 1}</p>
                  <FaPlus onClick={() => handleIncrement(item.id)} />
                </div>
                <div className='del'>
                  <MdOutlineDeleteForever onClick={() => handleDeleteItem(item.id)} />
                </div>
                <div className='to'>
                  <p>Rs.{item.price * (counts[item.id] || 1)}.00</p>
                </div>
              </div>
            ))}
          </div>
          <div className='checkout'>
          <Link to={{ pathname: '/checkout', state: { productName, quantity, totalPrice } }}>
  <button>Proceed to Checkout</button>
</Link>
          </div>
        </div>
      ) : (
        <div>
          <h1>Your Cart Is Empty</h1>
          <button>Continue Shopping</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
