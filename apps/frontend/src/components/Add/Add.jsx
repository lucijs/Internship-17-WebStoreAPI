import LogIn from "../../components/Authentication/LogIn";
import Register from "../../components/Authentication/Register";
import User from "../../components/User";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import classes from "./index.module.css";
import { useState } from "react";
import AddCategory from "./AddCategory/AddCategory";
import AddProduct from "./AddProduct/AddProduct";

const Add = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
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
              label="Add category"
              sx={{
                "&.Mui-selected": {
                  color: "#fdcd00",
                },
              }}
            />
            <Tab
              label="Add product"
              sx={{
                "&.Mui-selected": {
                  color: "#fdcd00",
                },
              }}
            />
          </Tabs>
        </Box>
        <>
          {value === 0 && (
            <Box sx={{ p: 3 }}>
              <AddCategory/>
            </Box>
          )}
          {value === 1 && (
            <Box sx={{ p: 3 }}>
              <AddProduct />
            </Box>
          )}
        </>
      </Box>
    </div>
  );
};

export default Add;
