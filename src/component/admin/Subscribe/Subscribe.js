import React, { useState, useEffect } from 'react';
import axios from 'axios';
import axiosInstance from '../axiousInstance';
import API_BASE_URL from '../../../config';

export default function EmailSubscription() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const response = await axiosInstance.get(`${API_BASE_URL}/api/email`);
      setSubscriptions(response.data);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch email subscriptions. Please try again later.');
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      <h2>Email Subscriptions</h2>
      {subscriptions.length === 0 ? (
        <div>No subscriptions found.</div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((subscription) => (
              <tr key={subscription.id}>
                <td>{subscription.id}</td>
                <td>{subscription.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
