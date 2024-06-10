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
    zip: '',
    mobileno: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [paymentError, setPaymentError] = useState(null);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.fullName) errors.fullName = 'Full Name is required';
    if (!formData.email) errors.email = 'Email is required';
    if (!formData.address) errors.address = 'Address is required';
    if (!formData.city) errors.city = 'City is required';
    if (!formData.state) errors.state = 'State is required';
    if (!formData.zip) errors.zip = 'Zip is required';
    if (!formData.mobileno) errors.mobileno = 'Mobile Number is required';
    return errors;
  };

  // Handle payment
  const handlePayment = async () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const response = await axios.post('https://ec2.radhakrishnamart.com:8443/api/orders/pg/v1/pay', {
        productId: 1, // Replace with actual product ID
        productName: productNames,
        quantity: totalQuantity,
        totalPrice: parseFloat(totalPrice),
        customerName: formData.fullName,
        address: formData.address,
        zipCode: formData.zip,
        mobileNumber: formData.mobileno,
        emailAddress: formData.email,
        city: formData.city,
        state: formData.state
      });
      console.log('Payment successful:', response.data);
      window.location.href = response.data.redirectUrl; // Redirect to the payment URL
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentError('Payment failed. Please try again.');
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
      <input
        type="text"
        id="fullName"
        name="fullName"
        placeholder="John M. Doe"
        onChange={handleInputChange}
        required
      />
      {formErrors.fullName && <span className="error">{formErrors.fullName}</span>}
      
      <label htmlFor="email"><i className="fa fa-envelope"></i> Email</label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="john@example.com"
        onChange={handleInputChange}
        required
      />
      {formErrors.email && <span className="error">{formErrors.email}</span>}
      
      <label htmlFor="mobileno"><i className="fa fa-phone"></i> Mobile Number</label>
      <input
        type="tel"
        id="mobileno"
        name="mobileno"
        placeholder="+9112347890"
        onChange={handleInputChange}
        required
      />
      {formErrors.mobileno && <span className="error">{formErrors.mobileno}</span>}
      
      <label htmlFor="address"><i className="fa fa-address-card-o"></i> Address</label>
      <input
        type="text"
        id="address"
        name="address"
        placeholder="542 W. 15th Street"
        onChange={handleInputChange}
        required
      />
      {formErrors.address && <span className="error">{formErrors.address}</span>}
      
      <label htmlFor="city"><i className="fa fa-institution"></i> City</label>
      <input
        type="text"
        id="city"
        name="city"
        placeholder="New York"
        onChange={handleInputChange}
        required
      />
      {formErrors.city && <span className="error">{formErrors.city}</span>}
      
      <div className="row">
        <div className="col-50">
          <label htmlFor="state">State</label>
          <input
            type="text"
            id="state"
            name="state"
            placeholder="NY"
            onChange={handleInputChange}
            required
          />
          {formErrors.state && <span className="error">{formErrors.state}</span>}
        </div>
        <div className="col-50">
          <label htmlFor="zip">Zip</label>
          <input
            type="text"
            id="zip"
            name="zip"
            placeholder="10001"
            onChange={handleInputChange}
            required
          />
          {formErrors.zip && <span className="error">{formErrors.zip}</span>}
        </div>
      </div>
      <button onClick={handlePayment}>Pay Now</button>
      {paymentError && <p className="error">{paymentError}</p>}
      {showModal && <Modal />}
    </div>
  );
};

export default Checkout;
