import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Checkout = () => {
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const totalPrice = searchParams.get('totalPrice');
  const totalQuantity = searchParams.get('totalQuantity');
  const productNames = searchParams.get('productNames');
  const productQuantities = searchParams.get('productQuantities');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: ''
  });

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle payment
  const handlePayment = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/orders', {
        productId: 1, // Replace with actual product ID
        productName: productNames,
        quantity: totalQuantity,
        totalPrice: parseFloat(totalPrice),
        
        customerName: formData.fullName,
        address: formData.address,
        zipCode: formData.zip,
        mobileNumber: '1234567890', // Replace with actual mobile number if available
        emailAddress: formData.email,
        city: formData.city,
        state: formData.state
      });
      console.log('Payment successful:', response.data);
      window.location.href = response.data.redirectUrl; // Redirect to the payment URL
    } catch (error) {
      console.error('Payment error:', error);
      // Handle payment error
    }
  };

  const Modal = () => {
    return (
      <div className="modal">
        <div className="modal-content">
          <h2>Thank you for your purchase!</h2>
          <p>You will receive an email confirmation shortly.</p>
        </div>
      </div>
    );
  };
  

  return (
    <div>
      <h3>Order Summary</h3>
      {/* Render individual product names and quantities */}
      {productNames.split(',').map((productName, index) => (
        <div key={index}>
          <strong>Product Name:</strong> {productName}
          <br />
          <strong>Quantity:</strong> {productQuantities.split(',')[index]}
          <hr />
        </div>
      ))}
      {/* Display total quantity */}
      <div>
        <strong>Total Quantity:</strong> {totalQuantity}
      </div>
      <div>
        <strong>Total Price:</strong> Rs.{totalPrice}.00
      </div>

      <h3>Billing Address</h3>
      <label htmlFor="fullName"><i className="fa fa-user"></i> Full Name</label>
      <input type="text" id="fullName" name="fullName" placeholder="John M. Doe" onChange={handleInputChange} />
      <label htmlFor="email"><i className="fa fa-envelope"></i> Email</label>
      <input type="text" id="email" name="email" placeholder="john@example.com" onChange={handleInputChange} />
      <label htmlFor="address"><i className="fa fa-address-card-o"></i> Address</label>
      <input type="text" id="address" name="address" placeholder="542 W. 15th Street" onChange={handleInputChange} />
      <label htmlFor="city"><i className="fa fa-institution"></i> City</label>
      <input type="text" id="city" name="city" placeholder="New York" onChange={handleInputChange} />
      <div className="row">
        <div className="col-50">
          <label htmlFor="state">State</label>
          <input type="text" id="state" name="state" placeholder="NY" onChange={handleInputChange} />
        </div>
        <div className="col-50">
          <label htmlFor="zip">Zip</label>
          <input type="text" id="zip" name="zip" placeholder="10001" onChange={handleInputChange} />
        </div>
      </div>
      <button onClick={handlePayment}>Pay Now</button>
      {showModal && <Modal />}
    </div>
  );
};

export default Checkout;
