import React from "react";
import { useNavigate } from "react-router-dom"; // Ensure react-router-dom is installed

const ProductCard = ({ product }) => {
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleSeeDetails = () => {
    navigate(`/ecommerce/product/${product.productId}`); // Navigate to ProductDetails with product ID
  };

  return (
    <div className="custom-product-card">
      <img
        src={`data:image/jpeg;base64,${product.img}`}
        alt={product.productName}
        className="product-image"
      />
      <h3 className="product-name">{product.productName}</h3>
      <p className="product-price">
        Price: ${product.discountPrice ? product.discountPrice : product.price}
      </p>
      {product.discountPrice && (
        <p className="original-price">${product.price}</p>
      )}
      <p className="product-company">Company: {product.companyName}</p>
      <p className="product-chemical">Chemical: {product.chemicalName}</p>
      <button onClick={handleSeeDetails}>See Details</button> {/* New button */}
      <button>Add to Cart</button> {/* Existing button */}
    </div>
  );
};

export default ProductCard;
