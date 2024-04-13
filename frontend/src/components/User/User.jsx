import { useState } from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InfoIcon from "@mui/icons-material/Info";
import AddIcon from "@mui/icons-material/Add";
import ListIcon from "@mui/icons-material/List";
import Add from "../Add/Add";

const User = () => {
  const [value, setValue] = useState(5);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showForm, setShowForm] = useState(5);

  const handleHistoryClick = () => {
    setShowForm(2);
  };

  const handleFavoritesClick = () => {
    setShowForm(3);
  };

  const handleCartClick = () => {
    setShowForm(4);
  };

  const handleUserInfoClick = () => {
    setShowForm(5);
  };

  const handleAddIconClick = () => {
    //napravit da se otvori nova forma di ce se upisivat svi podaci za novi proizvod
    setShowForm(0);
  };

  const handleListAllUsersClick = () => {
    setShowForm(1);
  };

  const display = () => {
    switch (showForm) {
      case 0:
        return <Add />;
      case 1:
        return <p>useri</p>;
      case 2:
        return <p>povijest</p>;
      case 3:
        return <p>favoriti</p>;
      case 4:
        return <p>kosarica</p>;
      case 5:
        return <p>user info</p>;
      default:
        return null;
    }
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
            [
              <BottomNavigationAction
                label="New"
                key="new"
                icon={<AddIcon />}
                onClick={handleAddIconClick}
              />,
              <BottomNavigationAction
                label="Users"
                key="users"
                icon={<ListIcon />}
                onClick={handleListAllUsersClick}
              />,
            ]
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
      <Box>{display()}</Box>
    </>
  );
};

export default User;
