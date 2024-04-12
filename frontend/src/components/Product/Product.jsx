import { Link } from "react-router-dom";
import classes from "./index.module.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Product = ({ title, image, id }) => {
  const addToCart = (e) => {
    console.log("da");
  };

  const addToWishlist = (e) => {
    console.log("daaaa");
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
