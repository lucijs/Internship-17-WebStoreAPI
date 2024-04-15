import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import classes from "./index.module.css";
import React from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";

const steps = ["1.", "2.", "3."];

const Register = () => {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <Box className={classes.display}>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={label} {...stepProps} sx={{ fill: "#fdcd00" }}>
                <StepLabel {...labelProps}> </StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <div className={classes.success}>
            <p>Uspješno ste se registrirali</p>
          </div>
        ) : (
          <>
            <div className={classes.container}>
              {activeStep === 0 ? (
                <>
                  <TextField label="Email" sx={{ m: 1, width: "25ch" }} />
                  <TextField label="First name" sx={{ m: 1, width: "25ch" }} />
                  <TextField label="Last name" sx={{ m: 1, width: "25ch" }} />
                </>
              ) : activeStep === 1 ? (
                <>
                  <TextField label="City" sx={{ m: 1, width: "25ch" }} />
                  <TextField label="Street name" sx={{ m: 1, width: "25ch" }} />
                  <TextField
                    label="Street number"
                    sx={{ m: 1, width: "25ch" }}
                  />
                  <TextField
                    label="Phone number"
                    sx={{ m: 1, width: "25ch" }}
                  />
                </>
              ) : (
                <>
                  <TextField label="Username" sx={{ m: 1, width: "25ch" }} />
                  <div>
                    <FormControl
                      sx={{ m: 1, width: "25ch" }}
                      variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password">
                        Password
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? "text" : "password"}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end">
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                      />
                    </FormControl>
                  </div>
                </>
              )}
            </div>
            <Box className={classes.buttons}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}>
                Back
              </Button>
              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default Register;
