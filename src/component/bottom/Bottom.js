import React, { useState } from 'react';
import { AiFillFacebook, AiOutlineInstagram } from "react-icons/ai";
import { BsYoutube, BsTwitter } from "react-icons/bs";
import { FaPinterestSquare } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import './bottom.css';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        setShowPopup(true);
        setEmail('');
        setTimeout(() => setShowPopup(false), 3000); // Hide popup after 3 seconds
      } else {
        // Handle error case
        alert('Subscription failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <>
      <div className="footer_section">
        <div className='container-fluid text-white'>
          <div className='row mb-3'>
            <div className='col-md-5'>
              <h2>Subscribe to our emails</h2>
              <form onSubmit={handleSubmit}>
                <input
                  className="form-control"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" className="btn btn-primary mt-2">Subscribe</button>
              </form>
            </div>
            <div className='col-md-3'>
              <h2>Our Policies</h2>
              <ul>
                <li><a href="/refund-policy">Refund Policy</a></li>
                <li><a href="/privacy-policy">Privacy Policy</a></li>
                <li><a href="/terms-conditions">Terms & Conditions</a></li>
                <li><a href="/shipping-policy">Shipping Policy</a></li>
              </ul>
            </div>
            <div className='col-md-4'>
              <h2>Quick Link</h2>
              <ul>
                <li><a href="/products">All Products</a></li>
                <li><a href="/rudraksh">Rudraksh</a></li>
                <li><a href="/gemstone">Gemstone</a></li>
                <li><a href="/about">About Us</a></li>
                <li><a href="/contact">Contact Us</a></li>
              </ul>
            </div>
          </div>

          <div className='line' style={{ borderBottom: '1px solid #fff' }}></div>
          <div className="row">
            <div className="col-md-6">
              <h3 style={{ fontSize: '18px', marginTop: '10px' }}>Copyright &#169; 2024 RadhaKrishnaMart All Rights Reserved.</h3>
            </div>
            <div className="col-md-6 d-flex justify-content-end">
              <div className='social-icons' style={{ fontSize: '24px' }}>
                <AiFillFacebook className="mr-3" />
                <AiOutlineInstagram className="mr-3" />
                <BsYoutube className="mr-3" />
                <BsTwitter className="mr-3" />
                <FaPinterestSquare />
              </div>
            </div>
          </div>
          <p style={{ textAlign: 'center' }}>
  Design & Developed by 
  <span style={{ display: 'inline-block', margin: '0 5px' }}>
    <CiHeart style={{ color: 'red', fontSize: '25px', verticalAlign: 'middle' }} />
  </span>
  CodeCraft.
</p>
        </div>
        {showPopup && <div className="popup">Thanks for subscribing!</div>}
      </div>
    </>
  );
}
