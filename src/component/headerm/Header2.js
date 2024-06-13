import React, { useState, useEffect } from 'react';
import "./headerb.css";
import { CiSearch } from "react-icons/ci";
import { FiShoppingBag } from "react-icons/fi";
import AnchorTemporaryDrawer from './AnchorTemporaryDrawer';
import { useCart } from '../CartContext';
import { useSelector } from "react-redux"; 
import { Link } from 'react-router-dom';

export default function Headerb() {
  const { cart } = useSelector((state) => state);
  const itemCount = cart.length;

  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    setIsOpen(false); // Close the menu when search is opened
  };

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
    <div className={`head ${showSearch ? 'show-search' : ''}`}>
      {isMobile && <AnchorTemporaryDrawer />}
      <div className='title'>
        <h1><Link to='/' style={{ color: '#b16f23' ,textDecoration:'none'}}>Radha Krishna Mart</Link></h1>
      </div>

      <div className={`naviga ${isOpen && !showSearch ? 'active overlay' : ''}`}>
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
          <a id='ci' onClick={toggleSearch}><CiSearch style={{ color: '#b16f23', cursor: 'pointer',fontSize:'25px' }} /></a>
          {showSearch && (
            <input
              type="text"
              placeholder="Search..."
              className='search-input'
            />
          )}
          
          <Link to='/cart'><FiShoppingBag style={{ color: '#b16f23' ,fontSize:'25px'}} />
            <span className='cart-count'>{itemCount}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
