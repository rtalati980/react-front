import React from 'react';
import './banner.css';
import { Link } from 'react-router-dom';

export default function Banner({ isOpen }) {
  return (
    <div className={`container-fluid p-1 ban ${isOpen ? 'overlay' : ''}`}>
      <div className='d-flex justify-content-center align-items-center' style={{ height: '500px', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
        <div className={`child d-flex flex-column align-items-center ${isOpen ? 'd-none' : ''}`} style={{ width: '90%', maxWidth: '600px', border: '2px solid #b16f23', borderBottom: '15px solid #b16f23', backgroundColor: '#fefae0', borderRadius: '10px', padding: '10px' }}>
          
          <div className="btm d-flex justify-content-center align-items-center" style={{ width: '100%' }}>
            <Link to="/rudraksh" >
              <button className='but1 mb-2 mt-3 mx-2' style={{ border: '1px solid #b16f23', width: '200px', borderBottom: '5px solid #b16f23', borderRadius: '10px', color: '#b16f23', backgroundColor: '#fefae0',textAlign:'center' }}>Buy Rudhraksh</button>
            </Link>

            <Link to="/gemstone">
              <button className='but2 mb-2 mt-3 mx-2' style={{ border: '1px solid #b16f23', width: '200px', borderBottom: '5px solid #b16f23', borderRadius: '10px', color: '#b16f23', backgroundColor: '#fefae0',textAlign:'center'  }}>Buy Gemstone</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
