import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [productCount, setProductCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [subscribedEmailCount, setSubscribedEmailCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [queryCount, setQueryCount] = useState(0);

  // Function to fetch product count
  const fetchProductCount = async () => {
    try {
      const response = await fetch('http://localhost:8080/product/api/');
      if (!response.ok) {
        throw new Error('Failed to fetch product count');
      }
      const data = await response.json();
      setProductCount(data.length); // Assuming the response is an array
    } catch (error) {
      console.error('Error fetching product count:', error);
    }
  };

  // Function to fetch order count
  const fetchOrderCount = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/orders');
      if (!response.ok) {
        throw new Error('Failed to fetch order count');
      }
      const data = await response.json();
      setOrderCount(data.length); // Assuming the response is an array
    } catch (error) {
      console.error('Error fetching order count:', error);
    }
  };

  // Function to fetch subscribed email count
  const fetchSubscribedEmailCount = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/email');
      if (!response.ok) {
        throw new Error('Failed to fetch subscribed email count');
      }
      const data = await response.json();
      setSubscribedEmailCount(data.length); // Assuming the response is an array
    } catch (error) {
      console.error('Error fetching subscribed email count:', error);
    }
  };

  // Function to fetch query count
  const fetchQueryCount = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/contact');
      if (!response.ok) {
        throw new Error('Failed to fetch query count');
      }
      const data = await response.json();
      setQueryCount(data.length); // Assuming the response is an array
    } catch (error) {
      console.error('Error fetching query count:', error);
    }
  };

  // Function to fetch category count
  const fetchCategoryCount = async () => {
    try {
      const response = await fetch('http://localhost:8080/category/api/');
      if (!response.ok) {
        throw new Error('Failed to fetch category count');
      }
      const data = await response.json();
      setCategoryCount(data.length); // Assuming the response is an array
    } catch (error) {
      console.error('Error fetching category count:', error);
    }
  };

  useEffect(() => {
    fetchProductCount();
    fetchOrderCount();
    fetchSubscribedEmailCount();
    fetchCategoryCount();
    fetchQueryCount();
  }, []);

  return (
    <div className="dashboard">
      <div className="card">
        <h2>Product Category</h2>
        <p>Total Products: {productCount}</p>
      </div>
      <div className="card">
        <h2>Order Query</h2>
        <p>Total Orders: {orderCount}</p>
      </div>
      <div className="card">
        <h2>Subscribe Email</h2>
        <p>Total Subscribed Emails: {subscribedEmailCount}</p>
      </div>
      <div className="card">
        <h2>Category Count</h2>
        <p>Total Categories: {categoryCount}</p>
      </div>
      <div className="card">
        <h2>Query Count</h2>
        <p>Total Queries: {queryCount}</p>
      </div>
    </div>
  );
};

export default Dashboard;
