import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Shipping() {
  return (
    <div className="container mt-5">
      <div className="shipping-info-container">
        <h1 className="mb-4">Shipping Information</h1>
        
        <p>Radha Krishna Mart strives to deliver your groceries fresh and fast. Here's a breakdown of our shipping process to help you plan your shopping:</p>
        
        <h2 className="mt-4">Shipping Process Time</h2>
        <p>Once your order is placed and payment confirmed, it typically takes 1-2 business days to process and pack your order.</p>

        <h2 className="mt-4">Delivery Timeline</h2>
        <p>Delivery timelines depend on your chosen shipping method and location. We offer various options, from expedited delivery within a day to standard delivery within 3-5 business days. You'll see estimated delivery dates clearly displayed during checkout based on your selected option.</p>

        <h2 className="mt-4">Shipping Rates and Delivery Estimates</h2>
        <p>Shipping rates are calculated based on your order weight, destination, and chosen delivery speed. You'll see the exact cost reflected before confirming your order.</p>

        <h2 className="mt-4">Shipment to the Address</h2>
        <p>We deliver to most residential addresses within our service area. Please ensure you enter your complete and accurate address during checkout, including any apartment numbers or specific delivery instructions.</p>

        <h2 className="mt-4">Shipment Confirmation and Order Tracking</h2>
        <p>Once your order ships, you'll receive a confirmation email with a tracking number. You can use this number to track your order's progress on our website or the courier's website.</p>

        <h2 className="mt-4">Customs/ Duties/ Taxes</h2>
        <p>For international orders, any customs duties or taxes are the responsibility of the recipient. Please check with your local customs office for any applicable charges.</p>

        <h2 className="mt-4">Damages</h2>
        <p>In the rare case that your order arrives damaged, please contact us immediately. We'll work swiftly to resolve the issue and ensure your satisfaction.</p>

        <p className="mt-4">We recommend reviewing our full Shipping Policy for detailed information on excluded locations, delivery restrictions, and our returns and exchange process. Shop with confidence at Radha Krishna Mart!</p>
        <ul>
          <li><strong>Email:</strong> <a href="mailto:radhakrishnmart6@gmail.com">radhakrishnmart6@gmail.com</a></li>
          <li><strong>Phone:</strong> +917300002965</li>
          <li><strong>Business Hours:</strong> Monday to Friday, 9 AM to 6 PM (local time)</li>
        </ul>
        
        <p>
          Thank you for shopping with RadhakrishnMart. We appreciate your business and are committed to providing you with an excellent shopping experience.
        </p>
      </div>
    </div>
  );
}
