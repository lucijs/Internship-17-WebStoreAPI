import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import classes from "./index.module.css";
import { useAuthorizationBearer } from '../../../providers/AuthorizationBearerProvider';

const GetHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const {token, isAdmin, isLogedIn, login, logout} = useAuthorizationBearer();

  const decodeToken = (token) => {
    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      console.log(decodedToken);
      return decodedToken.id;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchHistory = async () => {
        const userId = decodeToken(token);
      try {
        const response = await fetch(`/api/history/users/${userId}`,{headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }});
        if (!response.ok) {
          throw new Error('Failed to fetch history');
        }
        const data = await response.json();
        setHistory(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching history:', error);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div>
      <h2>History</h2>
      {loading ? (
        <CircularProgress />
      ) : (
        <div>
          {!history ? ("prazno je") : (history.map((purchase) => (
            <div key={purchase.id} style={{ marginBottom: '20px' }}>
              <h3>History Information</h3>
              <p>User ID: {purchase.userId}</p>
              <p>Product ID: {purchase.productId}</p>
              <p>Quantity: {purchase.amount}</p>
            </div>
          )))}
        </div>
      )}
    </div>
  );
};

export default GetHistory;
