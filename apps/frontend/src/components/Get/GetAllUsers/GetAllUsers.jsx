import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import classes from "./index.module.css";
import { useAuthorizationBearer } from '../../../providers/AuthorizationBearerProvider';

const GetAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const {token, isAdmin, isLogedIn, login, logout} = useAuthorizationBearer();


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users',{headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }});
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>All Users</h2>
      {loading ? (
        <CircularProgress />
      ) : (
        <div>
          {users.map((user) => (
            <div key={user.id} style={{ marginBottom: '20px' }}>
              <h3>User Information</h3>
              <p>Username: {user.username}</p>
              <p>Email: {user.email}</p>
              <p>First Name: {user.firstName}</p>
              <p>Last Name: {user.lastName}</p>
              <p>City Address: {user.cityAdress}</p>
              <p>Street Address: {user.streetAdress}</p>
              <p>Number Address: {user.numberAdress}</p>
              <p>Phone: {user.phone}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GetAllUsers;
