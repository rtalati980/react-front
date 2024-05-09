import React, { useState } from 'react';
import axios from 'axios';

const Checkout = ({ productName, quantity, totalPrice }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePayment = async () => {
    try {
      const response = await axios.post('YOUR_BACKEND_API_ENDPOINT', {
        productName,
        quantity,
        totalPrice,
        ...formData
      });
      console.log('Payment successful:', response.data);
      // Handle successful payment response
    } catch (error) {
      console.error('Payment error:', error);
      // Handle payment error
    }
  };

  return (
    <div>
      <h3>Order Summary</h3>
      <div>
        <strong>Product Name:</strong> {productName}
      </div>
      <div>
        <strong>Quantity:</strong> {quantity}
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
          <button onClick={handlePayment}>Pay Now</button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
