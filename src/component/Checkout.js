import React from 'react';

export default function Checkout() {
  return (
    <div>
      <h3>Billing Address</h3>
      <label htmlFor="fname"><i className="fa fa-user"></i> Full Name</label>
      <input type="text" id="fname" name="firstname" placeholder="John M. Doe"/>
      <label htmlFor="email"><i className="fa fa-envelope"></i> Email</label>
      <input type="text" id="email" name="email" placeholder="john@example.com"/>
      <label htmlFor="adr"><i className="fa fa-address-card-o"></i> Address</label>
      <input type="text" id="adr" name="address" placeholder="542 W. 15th Street"/>
      <label htmlFor="city"><i className="fa fa-institution"></i> City</label>
      <input type="text" id="city" name="city" placeholder="New York"/>

      <div className="row">
        <div className="col-50">
          <label htmlFor="state">State</label>
          <input type="text" id="state" name="state" placeholder="NY"/>
        </div>
        <div className="col-50">
          <label htmlFor="zip">Zip</label>
          <input type="text" id="zip" name="zip" placeholder="10001"/>
          <button type='submit'>Pay Now</button>
        </div>
      </div>
    </div>
  );
}
