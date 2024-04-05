import Product from "../Product/Product";
import classes from "./index.module.css";

const ProductDisplay = ({ products, searchTerm, selectedCategory }) => {
  return (
    <div className={classes.products}>
      {products
        .filter((product) => {
          const titleMatches = product.title
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
          const categoryMatches = selectedCategory
            ? product.category === selectedCategory
            : true;
          return titleMatches && categoryMatches;
        })
        .map((product) => (
          <Product
            title={product.title}
            image={product.image}
            key={product.id}
            id={product.id}
          />
        ))}
    </div>
  );
};

export default ProductDisplay;
