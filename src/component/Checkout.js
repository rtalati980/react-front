import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './Checkout.css'; // Make sure to create and import a CSS file for styling

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
        totalPrice: totalPrice,
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
    <div className="container">
      <div className="title">
        <h2>Product Order Form</h2>
      </div>
      <div className="checkout-content">
        <div className="form-container">
          <form>
            <h3>Billing Address</h3>
            <label>
              <span className="fname">Full Name <span className="required">*</span></span>
              <input
                type="text"
                name="fullName"
                placeholder="John M. Doe"
                onChange={handleInputChange}
                required
              />
              {formErrors.fullName && <span className="error">{formErrors.fullName}</span>}
            </label>
            
            <label>
              <span className="email">Email <span className="required">*</span></span>
              <input
                type="email"
                name="email"
                placeholder="john@example.com"
                onChange={handleInputChange}
                required
              />
              {formErrors.email && <span className="error">{formErrors.email}</span>}
            </label>
            
            <label>
              <span className="mobileno">Mobile Number <span className="required">*</span></span>
              <input
                type="tel"
                name="mobileno"
                placeholder="+9112347890"
                onChange={handleInputChange}
                required
              />
              {formErrors.mobileno && <span className="error">{formErrors.mobileno}</span>}
            </label>
            
            <label>
              <span className="address">Address <span className="required">*</span></span>
              <input
                type="text"
                name="address"
                placeholder="542 W. 15th Street"
                onChange={handleInputChange}
                required
              />
              {formErrors.address && <span className="error">{formErrors.address}</span>}
            </label>
            
            <label>
              <span className="city">City <span className="required">*</span></span>
              <input
                type="text"
                name="city"
                placeholder="New York"
                onChange={handleInputChange}
                required
              />
              {formErrors.city && <span className="error">{formErrors.city}</span>}
            </label>
            
            <label>
              <span className="state">State <span className="required">*</span></span>
              <input
                type="text"
                name="state"
                placeholder="NY"
                onChange={handleInputChange}
                required
              />
              {formErrors.state && <span className="error">{formErrors.state}</span>}
            </label>
            
            <label>
              <span className="zip">Zip <span className="required">*</span></span>
              <input
                type="text"
                name="zip"
                placeholder="10001"
                onChange={handleInputChange}
                required
              />
              {formErrors.zip && <span className="error">{formErrors.zip}</span>}
            </label>

            <button type="button" onClick={handlePayment}>Pay Now</button>
            {paymentError && <p className="error">{paymentError}</p>}
            {showModal && <Modal />}
          </form>
        </div>
        <div className="summary-container">
          <h3>Order Summary</h3>
          {productNames.split(',').map((productName, index) => (
            <div key={index}>
              <strong>Product Name:</strong> {productName}
              <br />
              <strong>Quantity:</strong> {productQuantities.split(',')[index]}
              <hr />
            </div>
          ))}
          <div>
            <strong>Total Quantity:</strong> {totalQuantity}
          </div>
          <div>
            <strong>Total Price:</strong> Rs.{totalPrice}.00
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
