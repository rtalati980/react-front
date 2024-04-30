import React, { useState, useEffect } from 'react';
import './cart.css';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { MdOutlineDeleteForever } from 'react-icons/md';

const Cart = ({ cart }) => {
  const [counts, setCounts] = useState({});

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
    console.log(itemId);
  };

  useEffect(() => {
    const countsData = {};
    cart.forEach((item) => {
      countsData[item.id] = 1;
    });
    setCounts(countsData);
  }, [cart]);

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
                <img src={`http://ec2-3-111-149-200.ap-south-1.compute.amazonaws.com:8080/product/api/images${item.images[0]}`} alt={item.name} />
                <p>{item.name}</p>
                <div className='icp'>
                 <FaMinus   onClick={() => handleDecrement(item.id)} />
                  <p>{counts[item.id] || 1}</p>
                  <FaPlus   onClick={() => handleIncrement(item.id)} />
                  
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
            <button>CHECKOUT</button>
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