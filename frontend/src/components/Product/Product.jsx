import { Link } from "react-router-dom";
import classes from "./index.module.css";

const Product = ({ title, image, id }) => {
  return (
    <Link className={classes.container} to={`/products/${id}`}>
      <h4>{title}</h4>
      <img className={classes.image} src={image} />
    </Link>
  );
};

export default Product;
