import React, { useState } from "react";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Button,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import classes from "./index.module.css";
import { useAuthorizationBearer } from "../../../providers/AuthorizationBearerProvider";

const steps = ["1.", "2.", "3."];

const Register = () => {
  const { token } = useAuthorizationBearer();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    city: "",
    streetName: "",
    streetNumber: "",
    phoneNumber: "",
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(value, typeof(value))
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          cityAdress: String(formData.cityAdress),
          streetAdress: String(formData.streetAdress),
          numberAdress: String(formData.numberAdress),
          phone: String(formData.phone),
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to register");
      }
      setActiveStep(steps.length);
    } catch (error) {
      console.error("Error registering:", error);
    }
  };
  

  return (
    <Box className={classes.display}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label} sx={{ fill: "#fdcd00" }}>
            <StepLabel></StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length ? (
        <div className={classes.success}>
          <p>Uspješno ste se registrirali</p>
        </div>
      ) : (
        <>
          <div className={classes.container}>
            <form>
              {activeStep === 0 ? (
                <>
                  <TextField
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    sx={{ m: 1, width: "25ch" }}
                    required 
                  />
                  <TextField
                    label="First name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    sx={{ m: 1, width: "25ch" }}
                    required 
                  />
                  <TextField
                    label="Last name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    sx={{ m: 1, width: "25ch" }}
                    required
                  />
                </>
              ) : activeStep === 1 ? (
                <>
                  <TextField
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    sx={{ m: 1, width: "25ch" }}
                    required 
                  />
                  <TextField
                    label="Street name"
                    name="streetName"
                    value={formData.streetName}
                    onChange={handleInputChange}
                    sx={{ m: 1, width: "25ch" }}
                    required 
                  />
                  <TextField
                    label="Street number"
                    name="streetNumber"
                    value={formData.streetNumber}
                    onChange={handleInputChange}
                    sx={{ m: 1, width: "25ch" }}
                    required 
                  />
                  <TextField
                    label="Phone number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    sx={{ m: 1, width: "25ch" }}
                    required 
                  />
                </>
              ) : (
                <>
                  <TextField
                    label="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    sx={{ m: 1, width: "25ch" }}
                    required 
                  />
                  <div>
                    <FormControl
                      sx={{ m: 1, width: "25ch" }}
                      variant="outlined"
                    >
                      <InputLabel htmlFor="outlined-adornment-password">
                        Password
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                        required 
                      />
                    </FormControl>
                  </div>
                </>
              )}
              <Box className={classes.buttons}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                >
                  Back
                </Button>
                <Button type="submit" onClick ={activeStep === steps.length - 1 ? handleSubmit : handleNext}>
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </Box>
            </form>
          </div>
        </>
      )}
    </Box>
  );
};

export default Register;
