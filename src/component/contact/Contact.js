import React, { useState } from 'react';
import './contact.css';
import { AiFillFacebook, AiOutlineInstagram } from "react-icons/ai";
import { BsYoutube, BsTwitter } from "react-icons/bs";
import { FaPinterestSquare } from "react-icons/fa";

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    mobileNumber: '',
    subject: ''
  });

  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
        }, 3000);
      } else {
        alert('Failed to save contact.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while saving the contact.');
    }
  };

  return (
    <>
      <div className='contact_form_section'>
        <div className="container">
        <div className='contact_address_section'> 
        <div className='container'>
          <div className='row'>
            <div className='col-md-4 col-sm-6 col-xs-12 mb-3'>
              <div className='card contact_address_box'>
                <h2 style={{color:'#b16f23'}}>Address</h2>
                <p style={{color:'#b16f23'}}>G-21 Varun Mall Mochiwada, Udaipur 313001</p>
              </div>
            </div>
            <div className='col-md-4 col-sm-6 col-xs-12 mb-3'>
              <div className='card contact_address_box'>
                <h2 style={{color:'#b16f23'}}>Email Us</h2>
                <p style={{color:'#b16f23'}}>radhakrishnamart6@gmail.com</p>
              </div>
            </div>
            <div className='col-md-4 col-sm-6 col-xs-12 mb-3'>
              <div className='card contact_address_box'>
                <h2 style={{color:'#b16f23'}}>Mobile</h2>
                <p style={{color:'#b16f23'}}>+91-7300002965(Available time 10AM - 7PM)</p>
                
              </div>
            </div>
          </div>
        </div>
      </div>
          <div className='row align-items-center'>
            <div className='col-md-6 col-sm-12 col-xs-12'>
              <form onSubmit={handleSubmit} className='contact_form'>
                <div className="row">
                  <div className='col-md-12 col-sm-12 col-xs-12 mb-3'>
                    <h2>Have Query!! Contact Us Today</h2>
                  </div>
                  <div className='col-md-12 col-sm-12 col-xs-12'>
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" id="firstName" name="firstName" placeholder="Your name.." value={formData.firstName} onChange={handleChange} required></input>
                  </div>
                  <div className='col-md-12 col-sm-12 col-xs-12'>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="Your email.." value={formData.email} onChange={handleChange} required></input>
                  </div>
                  <div className='col-md-12 col-sm-12 col-xs-12'>
                    <label htmlFor="mobileNumber">Mobile No.</label>
                    <input type="text" id="mobileNumber" name="mobileNumber" placeholder="Your mobile number.." value={formData.mobileNumber} onChange={handleChange} required></input>
                  </div>
                  <div className='col-md-12 col-sm-12 col-xs-12'>
                    <label htmlFor="subject">Subject</label>
                    <textarea id="subject" name="subject" placeholder="Write something.." value={formData.subject} onChange={handleChange} required></textarea>
                  </div>
                  <div className='col-md-12 col-sm-12 col-xs-12'>
                    <div className='form_btn mt-3'>
                      <button type="submit" className="submit_btn">Submit</button>
                      <button type="reset" className="reset_btn" onClick={() => setFormData({ firstName: '', email: '', mobileNumber: '', subject: '' })}>Reset</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className='col-md-6 col-sm-12 col-xs-12'>
              <div className='contact_img_box'>
                <img src='https://martimages.blob.core.windows.net/imagesmart/contact.jpeg' alt="Contact Us"></img>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {showPopup && (
        <div className='popup'>
          <div className='popup_inner'>
            <h3>Thanks for your query, we will assist you shortly!</h3>
          </div>
        </div>
      )}
    </>
  );
}
