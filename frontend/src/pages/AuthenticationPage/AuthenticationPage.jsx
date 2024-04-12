import LogIn from "../../components/Authentication/LogIn";
import Register from "../../components/Authentication/Register";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import classes from "./index.module.css";

const AuthenticationPage = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.box}>
      <Box>
        <Box
          sx={{ borderBottom: 1, borderColor: "divider" }}
          className={classes.label}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="authentication tabs"
            sx={{
              "& .MuiTabs-indicator": {
                backgroundColor: "#fdcd00",
              },
            }}>
            <Tab
              label="Log in"
              sx={{
                "&.Mui-selected": {
                  color: "#fdcd00",
                },
              }}
            />
            <Tab
              label="Register"
              sx={{
                "&.Mui-selected": {
                  color: "#fdcd00",
                },
              }}
            />
          </Tabs>
        </Box>
        {value === 0 && (
          <Box sx={{ p: 3 }}>
            <LogIn />
          </Box>
        )}
        {value === 1 && (
          <Box sx={{ p: 3 }}>
            <Register />
          </Box>
        )}
      </Box>
    </div>
  );
};

export default AuthenticationPage;
