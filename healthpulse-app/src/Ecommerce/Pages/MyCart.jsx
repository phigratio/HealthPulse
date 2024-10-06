import React, { useState, useEffect } from "react";
import ProductService from "../Sercice/ProductService";
import { getUserData } from "../../service/user-service";
import "@fortawesome/fontawesome-free/css/all.min.css";

const MyCart = () => {
  const [cartData, setCartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingItems, setUpdatingItems] = useState({});
  const [productDetails, setProductDetails] = useState({});

  useEffect(() => {
    fetchCartData();
  }, []);

  const fetchCartData = async () => {
    try {
      const userData = getUserData();
      if (!userData || !userData.id) {
        throw new Error("User data not found");
      }

      const response = await ProductService.getCartByUserId(userData.id);
      setCartData(response);

      // Fetch product details for each cart item
      const productPromises = response.cartItems.map((item) =>
        ProductService.getProductById(item.productId)
      );

      const products = await Promise.all(productPromises);
      const productMap = {};
      products.forEach((product) => {
        productMap[product.productId] = product;
      });

      setProductDetails(productMap);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      console.error("Error fetching cart:", err);
    }
  };

  const handleQuantityUpdate = async (cartItemId, newQuantity) => {
    try {
      const userData = getUserData();
      if (!userData || !userData.id) {
        throw new Error("User data not found");
      }

      setUpdatingItems((prev) => ({ ...prev, [cartItemId]: true }));

      await ProductService.updateCartItemQuantity(
        userData.id,
        cartItemId,
        newQuantity
      );

      await fetchCartData();
    } catch (err) {
      setError(`Failed to update quantity: ${err.message}`);
      console.error("Error updating quantity:", err);
    } finally {
      setUpdatingItems((prev) => ({ ...prev, [cartItemId]: false }));
    }
  };

  const handleDeleteItem = async (cartItemId) => {
    try {
      const userData = getUserData();
      if (!userData || !userData.id) {
        throw new Error("User data not found");
      }

      setUpdatingItems((prev) => ({ ...prev, [cartItemId]: true }));

      await ProductService.deleteCartItem(userData.id, cartItemId);

      await fetchCartData();
    } catch (err) {
      setError(`Failed to delete item: ${err.message}`);
      console.error("Error deleting item:", err);
    } finally {
      setUpdatingItems((prev) => ({ ...prev, [cartItemId]: false }));
    }
  };

  const handleProceedToPayment = () => {
    // This is a dummy function for now
    alert("Proceeding to payment... (This is a dummy action)");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">My Cart</h2>

        {cartData && cartData.cartItems && cartData.cartItems.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {cartData.cartItems.map((item) => {
                  const product = productDetails[item.productId] || {};
                  return (
                    <tr key={item.cartItemId}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.productName || "Loading..."}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.companyName || "Loading..."}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() =>
                              handleQuantityUpdate(
                                item.cartItemId,
                                item.quantity - 1
                              )
                            }
                            disabled={
                              item.quantity <= 1 ||
                              updatingItems[item.cartItemId]
                            }
                            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() =>
                              handleQuantityUpdate(
                                item.cartItemId,
                                item.quantity + 1
                              )
                            }
                            disabled={updatingItems[item.cartItemId]}
                            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                          >
                            +
                          </button>
                          {updatingItems[item.cartItemId] && (
                            <span className="text-xs text-gray-500">
                              Updating...
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        BDT {item.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        BDT {(item.price * item.quantity).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button
                          onClick={() => handleDeleteItem(item.cartItemId)}
                          disabled={updatingItems[item.cartItemId]}
                          className="text-red-500 hover:text-red-700 disabled:opacity-50"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="mt-6 flex justify-between items-center">
              <p className="text-lg font-semibold">
                Total: BDT&nbsp;
                {cartData.cartItems
                  .reduce((sum, item) => sum + item.price * item.quantity, 0)
                  .toFixed(2)}
              </p>
              <button
                onClick={handleProceedToPayment}
                className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center py-4 text-gray-500">Your cart is empty</p>
        )}
      </div>
    </div>
  );
};

export default MyCart;
