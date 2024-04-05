import { useEffect, useState } from "react";
import classes from "./index.module.css";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import ProductsDisplay from "../../components/ProductsDisplay";
import { useSearchParams } from "react-router-dom";

const ProductsPage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search");

  useEffect(() => {
    fetchCategories();
    fetchProducts();
    setSelectedCategory("");
  }, []);

  const fetchCategories = () => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((json) => {
        setCategories(json);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  };

  const fetchProducts = () => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        setProducts(json);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  };

  return (
    <div className={classes.container}>
      {isLoading ? (
        <div className={classes.loader}></div>
      ) : (
        <>
          <div className={classes.select}>
            <FormControl className={classes.form} color="warning">
              <InputLabel id="demo-simple-select-label">Kategorije</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Kategorije"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}>
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <ProductsDisplay
            products={products}
            searchTerm={searchTerm}
            selectedCategory={selectedCategory}
          />
        </>
      )}
    </div>
  );
};

export default ProductsPage;
