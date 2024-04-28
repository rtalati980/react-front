import React from 'react'
import './menu.css'

export default function menu() {
  return (
    <div className='main'>
     <ul>
                <li><a href='/'>Home</a></li>
                <li><a href='/collections'>All Product</a></li>
                <li> <a href='/rudraksh'>Rudhraksh</a></li>
                <li> <a href='/gemston'>Gemstone</a></li>
                <li> <a href='/about'>About us</a></li>
                <li> <a href='/contact'>CONTACT US</a></li>
                </ul>
    </div>
  )
}
