import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function EmailSubscription() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/email');
      setSubscriptions(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
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
    </div>
  );
}
