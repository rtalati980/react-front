import React from 'react'
import './appear.css'
import { TbMicroscope } from "react-icons/tb";
import { SiFsecure } from "react-icons/si";
import { LiaShippingFastSolid } from "react-icons/lia";

export default function Appear() {
  return (
    <div className="container-fluid appear_main_container " >
  <div className="row">
    <div className='col-md-12 mb-3 appear_heading'>
      <h2> Why Choose Us? </h2>
    </div>
    <div className="col-md-4 mb-4">
      <div className="card">
        <div>
          <TbMicroscope fontSize="5em" style={{ color: '#b16f23' }} />
          <h2 style={{ color: '#b16f23' }}>Lab Certified</h2>
          <p>All of our products are tested through certified labs so you don't have to worry about the quality.</p>
        </div>
      </div>
    </div>
    <div className="col-md-4 mb-4">
    <div className="card">
        <div>
          <SiFsecure fontSize="5em" />
          <h2 style={{ color: '#b16f23' }}>Secure Payment</h2>
          <p>We have encrypted connections with enhanced security so you can pay using your credit card without being subjected to online scams.</p>
        </div>
      </div>
    </div>
    <div className="col-md-4 mb-4">
     <div className="card">
        <div>
          <LiaShippingFastSolid fontSize="5em" />
          <h2 style={{ color: '#b16f23' }}>Free Shipping</h2>
          <p>Currently, we are shipping to customers all across India, serving our clients with the same level of excellence and commitment.</p>
        </div>
      </div>
    </div>
  </div>
  <hr />
  <div className="row">
  <div className="col">
    <h2 style={{ color: '#b16f23' }}>Buy Spiritual Items Online at Hare Krishna Mart</h2>
    <p style={{ color: '#b16f23' }}>Hare Krishna Mart is an online store that offers a wide range of spiritual items for individuals who seek to enhance their spiritual practice. The store offers a variety of products, including Rudraksha Beads, Rings, Wall Hanging Yantra, Kada, Bracelet, Worship Idols, Horse Shoe, Kavach, Gemstones, Religious products, and spiritual gift items.<br/><br/>We specialize in authentic and high-quality products sourced from trusted vendors. Each item is designed to serve a specific spiritual purpose, and we provide a detailed description of each product to help customers make an informed purchase.<br/><br/>If you're looking to buy Rudraksha beads for your daily chanting practice or a Yantra wall hanging for your home altar, Hare Krishna Mart has a range of options to choose from. The store also offers spiritual jewelry, such as Kada and Bracelet, which are believed to have healing properties.</p>
  </div>
</div>
<div className="row">
  <div className="col">
    <h2 style={{ color: '#b16f23' }}>What are the Benefits of Buying Spiritual Items?</h2>
    <p style={{ color: '#b16f23' }}>- Spiritual items can enhance your spiritual practice and help you connect with a higher power.<br/>- These items can serve as a reminder to stay focused on your spiritual goals and aspirations.<br/>- Many spiritual items, such as Rudraksha beads and gemstones, are believed to have healing properties that can improve your physical and mental well-being.<br/>- Certain items, such as Yantras and Kavachs, are believed to provide protection from negative energies and promote positivity.<br/>- Using spiritual items during meditation or prayer can help create a peaceful and conducive environment for spiritual practice.<br/>- Spiritual items can also serve as a beautiful addition to your home altar or sacred space, creating a serene and inspiring ambiance.<br/>- Some spiritual items, such as Rudraksha beads and religious idols, hold cultural and historical significance and can connect you to your cultural roots.<br/>- Purchasing spiritual items from a trusted source can also support artisans and small businesses that specialize in creating these items.</p>
  </div>
</div>
</div>

  );
}