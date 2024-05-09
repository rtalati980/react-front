import React from 'react'
import './banner.css'
import "../../headerm/headerb.css";



export default function ({isOpen}) {
  return (
    <div className={`ban ${isOpen ? 'overlay' : ''}`}> 
       
    <div className='child'>
      <h1>CLICK HERE TO BUY JAAPMALA</h1>
      <h3>CLICK HERE FOR YANTRAS</h3>
      <button    className='but1'>Buy Rudhraksh</button>
      <button    className='but2'>Buy Gemstone</button>
    </div>
    
    </div>
  )
}
