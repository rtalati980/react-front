import React, { useState ,useEffect } from 'react';
import "./headerb.css";
import { CiSearch } from "react-icons/ci";
import { LuMenuSquare } from "react-icons/lu";
import { FiShoppingBag } from "react-icons/fi";
import AnchorTemporaryDrawer from './AnchorTemporaryDrawer';




export default function Headerb() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust threshold as needed
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check on component mount

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleMenu = () => {
    
    console.log("Hello");
  };

  return (
    <div className='head'>
      {isMobile && <AnchorTemporaryDrawer  />} 
      <div className='title'>
        
        <h1>Radhe Krishna Mart</h1>
      </div>
      
      <div className={`naviga ${isOpen ? 'active overlay' : ''}`}>
  <ul>
    <li><a href='/'>Home</a></li>
    <li><a href='/products'>All Product</a></li>
    <li><a href='/rudraksh'>Rudhraksh</a></li>
    <li><a href='/gemstone'>Gemstone</a></li>
    <li><a href='/about'>About us</a></li>
    <li><a href='/contact'>CONTACT US</a></li>
  </ul>
</div>
      
      <div className='ricons' >
        <div className='fa '>
          <a id='ci' href='/cart'><CiSearch  style={{color: '#b16f23'}}/></a>
          <a id='fi' href='/cart'><FiShoppingBag style={{color: '#b16f23'}}/></a>
        </div>
      </div>

     
    </div>
  );
}
