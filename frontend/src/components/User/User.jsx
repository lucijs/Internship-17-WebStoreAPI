import { useState } from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InfoIcon from "@mui/icons-material/Info";
import AddIcon from "@mui/icons-material/Add";

const User = () => {
  const [value, setValue] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleHistoryClick = () => {
    //samo moran izlistat sve kupljeno
    console.log("History clicked");
  };

  const handleFavoritesClick = () => {
    //samo moran izlistat sve favorite
    console.log("Favorites clicked");
  };

  const handleCartClick = () => {
    //samo moran izlistat sta je u kosarici
    //i da se moze povecat br proizvoda
    console.log("Cart clicked");
  };

  const handleUserInfoClick = () => {
    //svi podaci
    //neki podaci se mogu minjat, npr adresa
    console.log("User info clicked");
  };

  const handleAddIconClick = () => {
    //napravit da se otvori nova forma di ce se upisivat svi podaci za novi proizvod
    console.log("dodaj");
  };

  return (
    <>
      <Box sx={{ width: 500 }}>
        <BottomNavigation
          showLabels
          value={value}
          sx={{ backgroundColor: "transparent" }}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}>
          {!isAuthenticated ? (
            <BottomNavigationAction
              label="New"
              icon={<AddIcon />}
              onClick={handleAddIconClick}
            />
          ) : (
            <></>
          )}
          <BottomNavigationAction
            label="History"
            icon={<RestoreIcon />}
            onClick={handleHistoryClick}
          />
          <BottomNavigationAction
            label="Favorites"
            icon={<FavoriteIcon />}
            onClick={handleFavoritesClick}
          />
          <BottomNavigationAction
            label="Cart"
            icon={<ShoppingCartIcon />}
            onClick={handleCartClick}
          />
          <BottomNavigationAction
            label="User info"
            icon={<InfoIcon />}
            onClick={handleUserInfoClick}
          />
        </BottomNavigation>
      </Box>
    </>
  );
};

export default User;
