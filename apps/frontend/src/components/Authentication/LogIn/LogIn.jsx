import {
  FormControl,
  IconButton,
  Button,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@mui/material';
import classes from './index.module.css';
import React, { useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useAuthorizationBearer } from '../../../providers/AuthorizationBearerProvider';
import { Link } from 'react-router-dom';

const LogIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const {token, isAdmin, isLogedIn, login, logout} = useAuthorizationBearer();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleUsernameChange=(event)=>{
    setUsername(event.target.value)
  };

  const handlePasswordChanged = (event)=>{
    if(!username){
      //DODAT error handeling da user ovo ne može napravit
    }
    fetchLogin(username,event.target.value);
  };

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

  const fetchLogin = (username, password) => {
    fetch("/api/users/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }), 
    })
    .then((res) => res.json())
    .then((json) => {
      const decodedToken = decodeToken(json.token);
      console.log(json.token)
      login(json.token, decodedToken);
    })
    .catch((error) => {
      console.error('Error logging in:', error);
    });
  };

  return (
    <div className={classes.container}>
      <TextField label="Username" sx={{ m: 1, width: '25ch' }}  onChange={handleUsernameChange}/>
      <div>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            onBlur={handlePasswordChanged}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
      </div>
      <Link to="/">
        <Button variant="contained">
            Log in
        </Button>
      </Link>
    </div>
  );
};

export default LogIn;
