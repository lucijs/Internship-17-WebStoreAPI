import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useAuthorizationBearer } from '../../../providers/AuthorizationBearerProvider';

const AddCategory = () => {
  const {token, isAdmin, isLogedIn, login, logout} = useAuthorizationBearer();
  const [categoryName, setCategoryName] = useState('');

  const handleChange = (event) => {
    setCategoryName(event.target.value);
  };

  const fetchCategory = ({categoryName}) => {
    fetch("/api/categories", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, 
      },
      body: JSON.stringify({categoryName}), 
    })
    .then((res) => res.json())
    .catch((error) => {
      console.error('Error adding category:', error);
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchCategory(categoryName);
    setCategoryName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Category Name"
        value={categoryName}
        onChange={handleChange}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <Button type="submit" variant="contained" color="primary">
        Add Category
      </Button>
    </form>
  );
};

export default AddCategory;
