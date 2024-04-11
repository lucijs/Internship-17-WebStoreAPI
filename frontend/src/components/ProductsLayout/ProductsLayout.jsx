import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import classes from "./index.module.css";
import logo from "../../assets/logo.png";
import { Outlet } from "react-router";
import PersonIcon from "@mui/icons-material/Person";
import { useSearchParams, useNavigate, Link } from "react-router-dom";

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
        <Link className={classes.icon} to={"users/login"}>
          <PersonIcon />
        </Link>
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
