import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './Checkout.css'; 
import API_BASE_URL from '../config';// Make sure to create and import a CSS file for styling

const Checkout = () => {
  const [showModal, setShowModal] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState('');
  const [orderId, setOrderId] = useState(null); // State to store the order ID
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const totalPrice = searchParams.get('totalPrice');
  const totalQuantity = searchParams.get('totalQuantity');
  const productNames = searchParams.get('productNames');
  const productQuantities = searchParams.get('productQuantities');
  const carat = searchParams.get('carat'); // Retrieve the carat value from the query parameters

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
  const [otpError, setOtpError] = useState(null);

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
      const response = await axios.post(`${API_BASE_URL}/api/orders/pg/v1/pay`, {
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
        state: formData.state,
        carat: carat // Include carat value if available
      });
      console.log('Payment successful:', response.data);
      window.location.href = response.data.redirectUrl; // Redirect to the payment URL
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentError('Payment failed. Please try again.');
    }
  };

  // Handle COD order
  const handleCodOrder = async () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/api/orders/cod`, {
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
        state: formData.state,
        carat: carat // Include carat value if available
      });
      console.log('COD order placed:', response.data);
      setOrderId(response.data.orderId); // Save the order ID for OTP verification
      setShowOtpModal(true);
    } catch (error) {
      console.error('COD order error:', error);
      setPaymentError('Failed to place COD order. Please try again.');
    }
  };

  // Handle OTP submission
  const handleOtpSubmit = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/orders/verifyOtp`, {
        orderId: orderId, // Use the saved order ID
        otp: otp
      });
      console.log('OTP verified:', response.data);
      setShowModal(true);
      setShowOtpModal(false);
    } catch (error) {
      console.error('OTP verification error:', error);
      setOtpError('Invalid OTP. Please try again.');
    }
  };

  const Modal = () => (
    <div className="modal">
      <div className="modal-content">
        <h2>Thank you for your purchase!</h2>
        <p>You will receive an email confirmation shortly.</p>
        <button type="button" onClick={() => setShowModal(false)}>Close</button>
      </div>
    </div>
  );

  const OtpModal = () => (
    <div className="modal">
      <div className="modal-content">
        <h2>Enter OTP</h2>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button type="button" onClick={handleOtpSubmit}>Submit</button>
        {otpError && <p className="error">{otpError}</p>}
        <button type="button" onClick={() => setShowOtpModal(false)}>Close</button>
      </div>
    </div>
  );

  return (
    <div className="container">
      <div className="title">
        <h2>Product Order Form</h2>
      </div>
      <div className="summary-container">
        <div className='row'>
          <div className='col-lg-6 col-md-6'>
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
            {carat && (
              <div>
                <strong>Carat:</strong> {carat}
              </div>
            )}
          </div>
          <div className='col-lg-6 col-md-6'>
            <div className='imges'>
              <img src='https://martimages.blob.core.windows.net/imagesmart/imttqfz.jpeg' alt='Product' />
            </div>
          </div>
        </div>
      </div>
      <div className="checkout-content">
        <div className="form-container">
          <form>
            <div className='row'>
              <div className="col-lg-12 col-md-12">
                <h3>Billing Address</h3>
              </div>
              <div className='col-lg-6 col-md-6'>
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
              </div>
              <div className='col-lg-6 col-md-6'>
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
              </div>
              <div className='col-lg-6 col-md-6'>
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
              </div>
              <div className='col-lg-6 col-md=6'>
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
              </div>
              <div className='col-lg-6 col-md-6'>
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
              </div>
              <div className='col-lg-6 col-md-6'>
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
              </div>
              <div className='col-lg-6 col-md-6'>
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
              </div>
              <div className='col-lg-6 col-md-6'>
                <button type="button" onClick={handlePayment}>Pay Now</button>
                {paymentError && <p className="error">{paymentError}</p>}
                <button type="button" onClick={handleCodOrder}>Cash on Delivery</button>
                {paymentError && <p className="error">{paymentError}</p>}
                {showModal && <Modal />}
                {showOtpModal && <OtpModal />}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
