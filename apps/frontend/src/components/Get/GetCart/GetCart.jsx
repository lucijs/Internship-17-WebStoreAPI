import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import classes from "./index.module.css";
import { useAuthorizationBearer } from '../../../providers/AuthorizationBearerProvider';

const GetCart = () => {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const {token, isAdmin, isLogedIn, login, logout} = useAuthorizationBearer();

  const decodeToken = (token) => {
    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      console.log(decodedToken.role);
      return decodedToken.id;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  useEffect(() => {
    console.log(decodeToken(token))
    const fetchCarts = async () => {
      const userId = decodeToken(token);
      console.log(userId);
      console.log(token);
      try {
        const response = await fetch(`/api/carts/users/${userId}`,{headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }});
        if (!response.ok) {
          throw new Error('Failed to fetch carts');
        }
        const data = await response.json();
        setCarts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching carts:', error);
      }
    };

    fetchCarts();
  }, []);

  return (
    <div>
      <h2>All Carts</h2>
      {loading ? (
        <CircularProgress />
      ) : (
        <div>
          {!carts? ("prazno je"):carts.map((cart) => (
            <div key={cart.id} style={{ marginBottom: '20px' }}>
              <h3>Cart Information</h3>
              <p>User ID: {cart.userId}</p>
              <p>Product ID: {cart.productId}</p>
              <p>Quantity: {cart.amount}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GetCart;
