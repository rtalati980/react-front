import { AiFillFacebook, AiOutlineInstagram } from "react-icons/ai";
import { BsYoutube, BsTwitter } from "react-icons/bs";
import { FaPinterestSquare } from "react-icons/fa";

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
        <li>Refund Policy</li>
        <li>Privacy Policy</li>
        <li>Terms & Condition</li>
        <li>Shipping Policy</li>
      </ul>
    </div>
  </div>
</div>
  );
}