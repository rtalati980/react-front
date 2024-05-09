import React from 'react'
import './banner.css'
import "../../headerm/headerb.css";
import { Link } from 'react-router-dom';


export default function ({isOpen}) {
  return (
    <div className={`ban ${isOpen ? 'overlay' : ''}`}> 
       
    <div className='child'>
      <h1>CLICK HERE TO BUY JAAPMALA</h1>
     
      <Link to="/rudraksh" >  <button   className='but1'> Buy Rudhraksh</button></Link>
      <Link to="/gemstone"> <button    className='but2'> Buy Gemstone </button></Link>
    </div>
    
    </div>
  )
}
