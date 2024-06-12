import React, { useState } from 'react';
import { AiFillFacebook, AiOutlineInstagram } from "react-icons/ai";
import { BsYoutube, BsTwitter } from "react-icons/bs";
import { FaPinterestSquare } from "react-icons/fa";
import { IoHeart } from "react-icons/io5";
import './bottom.css';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://ec2.radhakrishnamart.com:8443/api/email', {
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
                  required
                  type="email"  // Ensure the email format is validated
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
                <li><a href="/refund">Refund Policy</a></li>
                <li><a href="/privacy">Privacy Policy</a></li>
                <li><a href="/terms">Terms & Conditions</a></li>
                <li><a href="/shipping">Shipping Policy</a></li>
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
               <Link to="https://www.facebook.com/profile.php?id=61559847878765" style={{color:'white'}}> <AiFillFacebook className="mr-3" /></Link>
               <Link to="https://www.instagram.com/radha_krishna_mart_com?igsh=MTg3dXpuYWgwcmxxbA==" style={{color:'white'}}> <AiOutlineInstagram className="mr-3" /></Link>
               <Link to="https://www.youtube.com/channel/UCqtCL7lgLHHtPbcyDw3z7ng"  style={{color:'white'}}> <BsYoutube className="mr-3" /></Link>
                
              </div>
            </div>
          </div>
          <p style={{ textAlign: 'center',fontSize:'25px',marginTop:'20px'  }}>
            Design & Developed by 
            <span style={{ display: 'inline-block', margin: '0 5px' }}>
              <IoHeart style={{ color: 'white', fontSize: '25px', verticalAlign: 'middle' }} />
            </span>
            CodeCrafters.
          </p>
        </div>
        {showPopup && <div className="popup">Thanks for subscribing!</div>}
      </div>
    </>
  );
}
