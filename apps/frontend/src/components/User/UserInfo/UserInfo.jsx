import React, { useState, useEffect, useMemo } from 'react';
import classes from "./index.module.css"; 
import { useAuthorizationBearer } from '../../../providers/AuthorizationBearerProvider';

const UserInfo = () => {
  const { token } = useAuthorizationBearer();
  const [user, setUser] = useState(null);

  const decodeToken = (token) => {
    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      return decodedToken.id;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  const userId = useMemo(() => decodeToken(token), [token]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/users/${userId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (userId && token) {
      fetchUserData();
    }
  }, [userId, token]);

  return (
    <div>
      {!user || !token ? (
        <div className={classes.container}>
        <div className={classes.loader}></div>
        </div>
      ) : (
        <div className={classes.container}>
          <h2>User Information</h2>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>First Name: {user.firstName}</p>
          <p>Last Name: {user.lastName}</p>
          <p>City Address: {user.cityAdress}</p>
          <p>Street Address: {user.streetAdress}</p>
          <p>Number Address: {user.numberAdress}</p>
          <p>Phone: {user.phone}</p>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
