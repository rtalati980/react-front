import { AiFillFacebook, AiOutlineInstagram } from "react-icons/ai";
import { BsYoutube, BsTwitter } from "react-icons/bs";
import { FaPinterestSquare } from "react-icons/fa";
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div className='container-fluid text-white '>
  <div className='top row justify-content-center' style={{ backgroundColor: '#b16f23' }}>
    <div className='col-md-6 text-center'>
      <h2>Subscribe to our emails</h2>
      <input className="form-control" placeholder="Enter your email" />
    </div>
    <div className='col-md-6 text-center'>
      <div className='social-icons' style={{ fontSize: '24px', marginTop: '10px' }}>
        <AiFillFacebook className="mr-3" />
        <AiOutlineInstagram className="mr-3" />
        <BsYoutube className="mr-3" />
        <BsTwitter className="mr-3" />
        <FaPinterestSquare />
      </div>
    </div>
  </div>
  <div className='line '></div>
  <div className='text row justify-content-center' style={{ backgroundColor: '#b16f23' }}>
    <div class="col-md-6 text-center" style={{ marginBottom: '20px' }}>
      <h3 style={{ fontSize: '18px' }}>&#169;2024 All Rights are reserved for RadheKrishnaMart</h3>
    </div>
    <div class="col-md-6 text-center">
      <ul class="list-unstyled d-flex justify-content-around">
        <li><Link   to="/refund"  style={{textDecoration:'none' ,color:'white'}}>Refund Policy </Link></li>
        <li><Link to='/privacy' style={{textDecoration:'none' ,color:'white'}}>Privacy Policy </Link></li>
        <li><Link to='/terms'style={{textDecoration:'none' ,color:'white'}} >Terms & Condition </Link></li>
        <li><Link to='/shipping' style={{textDecoration:'none' ,color:'white'}} >Shipping Policy</Link></li>
      </ul>
    </div>
  </div>
</div>
  );
}