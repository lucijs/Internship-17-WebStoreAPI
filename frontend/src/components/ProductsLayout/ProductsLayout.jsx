import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import classes from "./index.module.css";
import logo from "../../assets/logo.png";
import { Outlet } from "react-router";
import { Link, useSearchParams, useNavigate } from "react-router-dom";

const ProductsLayout = () => {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClikck = (e) => {
    e.preventDefault();
    setSearchParams({ search: searchInput });
    navigate(`/products?search=${encodeURIComponent(searchInput)}`);
  };

  return (
    <>
      <div className={classes.logo}>
        <img src={logo} />
      </div>
      <div className={classes.searchBar}>
        <form>
          <TextField
            label="Vrijednost po kojoj pretražujemo"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className={classes.input}
            color="warning"
          />
          <Button variant="contained" onClick={handleClikck}>
            Pretraži
          </Button>
        </form>
      </div>
      <Outlet />
    </>
  );
};

export default ProductsLayout;
