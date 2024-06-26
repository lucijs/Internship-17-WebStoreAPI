import { useEffect, useState } from "react";
import { useParams } from "react-router";
import classes from "./index.module.css";
import ProductsDisplay from "../../components/ProductsDisplay";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAuthorizationBearer } from "../../providers/AuthorizationBearerProvider";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const {token, isAdmin, isLogedIn} = useAuthorizationBearer();

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((response) => response.json())
      .then((json) => setProduct(json));
  }, [id]);

  useEffect(() => {
    if (product) {
      fetch(`/api/products/categories/${product.category}`)
        .then((res) => res.json())
        .then((json) => setProducts(json));
    }
  }, [product]);

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
              selectedCategory={product.categoryId}
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
