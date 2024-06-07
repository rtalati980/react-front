import React, { useState, useEffect } from 'react';
import './contact/contact.css';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const fetchOrders = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/orders', {
      method: 'GET'
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    
    const data = await response.json();
    return data;
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
      if (fetchedOrders) {
        setOrders(fetchedOrders);
      }
    };

    fetchOrderData();
  }, []);

  const handleDelete = async (orderId) => {
    setOrders(orders.filter(order => order.id !== orderId));
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
