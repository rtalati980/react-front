import React, { useState, useEffect } from 'react';
import "./headerb.css";

import { FiShoppingBag } from "react-icons/fi";
import AnchorTemporaryDrawer from './AnchorTemporaryDrawer';
import { useCart } from '../CartContext';
import { useSelector } from "react-redux"; 
import { Link } from 'react-router-dom';
 // Import the SearchSection component
import { FiPhone } from "react-icons/fi"; // Import phone icon for WhatsApp

export default function Headerb() {
  const { cart } = useSelector((state) => state);
  const itemCount = cart.length;

  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

 

  return (
    <div className={`head`}>
      {isMobile && <AnchorTemporaryDrawer />}
      <div className='title'>
        <Link to='/' style={{ textDecoration: 'none'  }}>
          <img src="https://martimages.blob.core.windows.net/imagesmart/logo-radhakrisna.png" alt="Logo" />
        </Link>
      </div>

      <div className={`naviga ${isOpen ? 'active overlay' : ''}`}>
        <ul>
          <li><Link style={{ color: '#b16f23' }}>Track Order</Link></li>
          <li><Link to='/products' style={{ color: '#b16f23' }}>All Product</Link></li>
          <li><Link to='/rudraksh' style={{ color: '#b16f23' }}>Rudhraksh</Link></li>
          <li><Link to='/gemstone' style={{ color: '#b16f23' }}>Gemstone</Link></li>
          <li><Link to='/about' style={{ color: '#b16f23' }}>About us</Link></li>
          <li><Link to='/contact' style={{ color: '#b16f23' }}>CONTACT US</Link></li>
        </ul>
      </div>
      <div className='ricons'>
        <div className='fa'>
          <Link to='/cart'>
            <FiShoppingBag style={{ color: '#b16f23', fontSize: '25px' }} />
            <span className='cart-count'>{itemCount}</span>
          </Link>
        </div>
      </div>
      {/* WhatsApp Button */}
      <a
        href="https://api.whatsapp.com/send?phone=+917300002965"
        className="whatsapp_float"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FiPhone style={{ fontSize: '25px', color: '#fff' }} />
      </a>
    </div>
  );
}
