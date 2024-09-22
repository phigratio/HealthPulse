import React from "react";
import ProductCard from "./ProductCard";
import "./style/ProductResult.css";

const ProductResult = ({ products }) => {
  return (
    <div className="custom-product-result">
      {products.map((product) => (
        <ProductCard key={product.productId} product={product} />
      ))}
    </div>
  );
};

export default ProductResult;
