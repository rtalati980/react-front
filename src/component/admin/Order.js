import React, { useState, useEffect } from 'react';
import './contact/contact.css';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import axiosInstance from './axiousInstance'; // Corrected import statement

const fetchOrders = async () => {
  try {
    const response = await axiosInstance.get('https://ec2.radhakrishnamart.com:8443/api/orders');
    return response.data; 
      console.log(response.data);// assuming the data is in response.data
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

export default function Contact() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrderData = async () => {
      const fetchedOrders = await fetchOrders();
      console.log("order ",fetchedOrders);
      if (fetchedOrders) {
        setOrders(fetchedOrders);
      }
    };

    fetchOrderData();
  }, []);

  const handleDelete = async (orderId) => {
    try {
      await axiosInstance.delete(`/api/orders/${orderId}`);
      setOrders(orders.filter(order => order.id !== orderId));
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  return (
    <div className='main'>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th>Customer Name</th>
            <th>Address</th>
            <th>Zip Code</th>
            <th>Mobile Number</th>
            <th>Email Address</th>
            <th>City</th>
            <th>State</th>
            <th>Action</th>
            <th>status</th>
              <th>carat</th>
              <th>merchantTransactionId</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.productName}</td>
              <td>{order.quantity}</td>
              <td>{order.totalPrice}</td>
              <td>{order.customerName}</td>
              <td>{order.address}</td>
              <td>{order.zipCode}</td>
              <td>{order.mobileNumber}</td>
              <td>{order.emailAddress}</td>
              <td>{order.city}</td>
              <td>{order.state}</td>
              <td>{order.status}</td>
              <td>{order.carat}</td>
              <td>{order.merchantTransactionId}</td>
              <td>{}</td>
              <td>
                <button onClick={() => handleDelete(order.id)}><MdDelete /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
