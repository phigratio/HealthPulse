import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"; // Import toast components
import "react-toastify/dist/ReactToastify.css"; // Import toastify CSS
import "./style/ProductCard.css";
import { getUserData } from "../../service/user-service";
import ProductService from "../Sercice/ProductService";

const ProductCard = ({ product }) => {
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Function to handle adding the product to the cart
  const handleAddToCart = () => {
    const user = getUserData(); // Get the current user data
    if (!user) {
      toast.error("Please log in to add items to the cart."); // Show error toast
      return;
    }

    const userId = user.id; // Retrieve the user ID
    const productId = product.productId; // Get the current product ID
    const quantity = 1; // Default quantity to add

    // Call the ProductService to add the product to the cart
    ProductService.addProductToCart(userId, productId, quantity)
      .then(() => {
        toast.success("Product added to cart successfully!"); // Show success toast
      })
      .catch((error) => {
        console.error("Error adding product to cart:", error);
        toast.error("Failed to add product to cart. Please try again."); // Show error toast
      });
  };

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
      {product.discountPrice && (
        <p className="original-price">BDT {product.price}</p>
      )}
      <p className="product-price">
        Discounted Price: BDT{" "}
        {product.discountPrice ? product.discountPrice : product.price}
      </p>
      <p className="product-company">Company: {product.companyName}</p>
      <p className="product-chemical">Chemical: {product.chemicalName}</p>
      <button className="prod-button" onClick={handleSeeDetails}>
        See Details
      </button>
      <button className="prod-button" onClick={handleAddToCart}>
        Add to Cart
      </button>

      {/* Add the ToastContainer here */}
      <ToastContainer />
    </div>
  );
};

export default ProductCard;
