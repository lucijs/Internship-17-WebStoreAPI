import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useAuthorizationBearer } from '../../../providers/AuthorizationBearerProvider';

const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const {token, isAdmin, isLogedIn, login, logout} = useAuthorizationBearer();

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'productName':
        setProductName(value);
        break;
      case 'price':
        setPrice(value);
        break;
      case 'description':
        setDescription(value);
        break;
      case 'image':
        setImage(value);
        break;
      case 'categoryId':
        setCategoryId(value);
        break;
      default:
        break;
    }
  };

  const fetchProduct= ({productName, price, description, image, categoryId}) => {
    fetch("/api/products", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, 
      },
      body: JSON.stringify({productName, price, description, image, categoryId}), 
    })
    .then((res) => res.json())
    .catch((error) => {
      console.error('Error adding products', error);
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Product name:', productName);
    console.log('Price:', price);
    console.log('Description:', description);
    console.log('Image:', image);
    console.log('Category ID:', categoryId);
    fetchProduct(productName, price, description, image, categoryId);
    setProductName('');
    setPrice('');
    setDescription('');
    setImage('');
    setCategoryId('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="productName"
        label="Product Name"
        value={productName}
        onChange={handleChange}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <TextField
        name="price"
        label="Price"
        value={price}
        onChange={handleChange}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handleChange}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <TextField
        name="image"
        label="Image"
        value={image}
        onChange={handleChange}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <TextField
        name="categoryId"
        label="Category ID"
        value={categoryId}
        onChange={handleChange}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <Button type="submit" variant="contained" color="primary">
        Add Product
      </Button>
    </form>
  );
};

export default AddProduct;
