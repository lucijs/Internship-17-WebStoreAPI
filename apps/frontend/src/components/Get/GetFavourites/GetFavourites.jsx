import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import classes from "./index.module.css";
import { useAuthorizationBearer } from '../../../providers/AuthorizationBearerProvider';

const GetFavourites = () => {
  const [favourites, setFavourites] = useState([]);
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
    const fetchFavourites = async () => {
        const userId = decodeToken(token);
      try {
        const response = await fetch(`/api/wishlists/users/${userId}`,{headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }});
        if (!response.ok) {
          throw new Error('Failed to fetch favourites');
        }
        const data = await response.json();
        setFavourites(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching favourites:', error);
      }
    };

    fetchFavourites();
  }, []);

  return (
    <div>
      <h2>All Favourites</h2>
      {loading ? (
        <CircularProgress />
      ) : (
        <div>
          {!favourites? ("prazno"):favourites.map((favourite) => (
            <div key={favourite.id} style={{ marginBottom: '20px' }}>
              <h3>Favourites info Information</h3>
              <p>User ID: {favourite.userId}</p>
              <p>Product ID: {favourite.productId}</p>
              <p>Quantity: {favourite.amount}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GetFavourites;
