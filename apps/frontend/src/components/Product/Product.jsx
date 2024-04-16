import { Link } from "react-router-dom";
import classes from "./index.module.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAuthorizationBearer } from "../../providers/AuthorizationBearerProvider";

const Product = ({ title, image, id }) => {
  const {token, isAdmin, isLogedIn, login, logout} = useAuthorizationBearer();

  const decodeToken = (token) => {
    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      return decodedToken.id;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  const addToCart = (e) => {
    console.log(token);
    fetchCart(Number(decodeToken(token)),Number(id))
  };

  const addToWishlist = (e) => {
    console.log(token);
    fetchWishlist(Number(decodeToken(token)),Number(id));
 };

  const fetchCart= (userId, productId) => {
    fetch("/api/carts", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({userId, productId, amount:1}), 
    })
    .then((res) => res.json())
    .catch((error) => {
      console.error('Error adding cart:', error);
    });
  };

  const fetchWishlist = (userId, productId) => {
    fetch("/api/wishlists", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({userId, productId}), 
    })
    .then((res) => res.json())
    .catch((error) => {
      console.error('Error adding product to wishlist:', error);
    });
  };

  return (
    <div className={classes.container}>
      <Link className={classes.container} to={`/products/${id}`}>
        <h4>{title}</h4>
        <img className={classes.image} src={image} />
      </Link>
      <div className={classes.icons}>
        <ShoppingCartIcon onClick={addToCart} />
        <FavoriteIcon onClick={addToWishlist} />
      </div>
    </div>
  );
};

export default Product;
