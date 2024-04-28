import React, { useState } from 'react';
import "./headerb.css";
import { CiSearch } from "react-icons/ci";
import { LuMenuSquare } from "react-icons/lu";
import { FiShoppingBag } from "react-icons/fi";
import Banner from '../mainBo/banner/Banner';

export default function Headerb() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    console.log("Hello");
  };

  return (
    <div className='head'>
      <div className='title'>
        <LuMenuSquare id='ic' onClick={toggleMenu}/>
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
      
      <div className='ricons'>
        <div className='fa '>
          <a id='ci' href='/cart'><CiSearch/></a>
          <a id='fi' href='/cart'><FiShoppingBag/></a>
        </div>
      </div>

     
    </div>
  );
}
