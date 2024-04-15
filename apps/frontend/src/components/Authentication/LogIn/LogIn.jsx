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
  const [b,setB]=useState("");
  const {token, isAdmin, isLogedIn, login, logout} = useAuthorizationBearer();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleUsernameChange=(event)=>{
    setUsername(event.target.value)
  };

  const handlePasswordChanged = (event)=>{
    setB(typeof(event.target.value));
    if(!username){
      //DODAT error handeling da user ovo ne može napravit
    }
    fetchLogin(username,event.target.value);
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
      console.log(json.toke);
      console.log(json);
      login(json.token);
      setB(json.token);
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
        <p>{b}</p>
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
