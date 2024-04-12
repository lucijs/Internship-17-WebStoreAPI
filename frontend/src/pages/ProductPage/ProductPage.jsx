import { useEffect, useState } from "react";
import { useParams } from "react-router";
import classes from "./index.module.css";
import ProductsDisplay from "../../components/ProductsDisplay";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((response) => response.json())
      .then((json) => setProduct(json));
  }, [id]);

  useEffect(() => {
    if (product) {
      fetch(`https://fakestoreapi.com/products/category/${product.category}`)
        .then((res) => res.json())
        .then((json) => setProducts(json));
    }
  }, [product]);

  const addToCart = (e) => {
    console.log("da");
  };

  const addToWishlist = (e) => {
    console.log("daaaa");
  };

  const editProduct = (e) => {
    console.log("editireaj");
  };

  const deleteProduct = (e) => {
    console.log("brisssi");
  };

  return (
    <>
      <div className={classes.container}>
        {product ? (
          <>
            <div className={classes.product}>
              <h2>{product.title}</h2>
              <img src={product.image} alt={product.title} />
              <p>{product.description}</p>
              <p>{product.category}</p>
              <div className={classes.icons}>
                {!isAuthenticated ? (
                  <>
                    <EditIcon onClick={editProduct} />
                    <DeleteIcon onClick={deleteProduct} />
                  </>
                ) : (
                  <></>
                )}
                <ShoppingCartIcon onClick={addToCart} />
                <FavoriteIcon onClick={addToWishlist} />
              </div>
            </div>
            <h2 className={classes.youMightAlsoLike}>
              Moglo bi vam se svidjeti
            </h2>
            <ProductsDisplay
              products={products}
              searchTerm=""
              selectedCategory={product.category}
            />
          </>
        ) : (
          <div className={classes.loader}></div>
        )}
      </div>
    </>
  );
};

export default ProductPage;
