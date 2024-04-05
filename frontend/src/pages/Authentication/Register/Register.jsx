import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@mui/material';
import classes from './index.module.css';
import React from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Register = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <div className={classes.container}>
      <TextField label="Username" sx={{ m: 1, width: '25ch' }} />
      <TextField label="Email" sx={{ m: 1, width: '25ch' }} />
      <TextField label="First name" sx={{ m: 1, width: '25ch' }} />
      <TextField label="Last name" sx={{ m: 1, width: '25ch' }} />
      <TextField label="City" sx={{ m: 1, width: '25ch' }} />
      <TextField label="Street name" sx={{ m: 1, width: '25ch' }} />
      <TextField label="Street number" sx={{ m: 1, width: '25ch' }} />
      <TextField label="Phone number" sx={{ m: 1, width: '25ch' }} />
      <div>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
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
    </div>
  );
};

export default Register;
