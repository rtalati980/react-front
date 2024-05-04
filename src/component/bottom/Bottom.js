import React from 'react'
import './bottom.css'
import { AiFillFacebook } from "react-icons/ai";
import { AiOutlineInstagram } from "react-icons/ai";
import { BsYoutube } from "react-icons/bs";
import { BsTwitterX } from "react-icons/bs";
import { FaPinterestSquare } from "react-icons/fa";

export default function Bottom() {
  return (
    <div className='par'>
        <div className='top'>
        <h2>Subscribe to our emails</h2>
            <input></input>
        <div className='left'>
        </div>
        <div className='right'>
           <AiFillFacebook/>
           <AiOutlineInstagram/>
           <BsYoutube/>
           <BsTwitterX/>
           <FaPinterestSquare/>
        </div>
        </div>
        <div className='line'></div>
        <div className='text'>
            <h3>&#169;2024 All Rights are reserved for RadheKrishnaMart</h3>
            <ul>
                <li>Refund Policy</li>
                <li>Privacy Policy</li>
                <li>Terms & Condition</li>
                <li>Shipping Policy</li>
            </ul>
        </div>
    </div>
  )
}
