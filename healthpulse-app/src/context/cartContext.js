import { createContext, useReducer, useContext } from "react";
import reducer from "./cartReducer";

const CartContext = createContext();

const initialState = {
  cart: [],
  totalAmount: "",
  totalItems: "",
  shippingFee: 5000,
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (medicine) => {
    dispatch({ type: "ADD_TO_CART", payload: { medicine } });
  };

  const increaseQuantity = (id) => {
    dispatch({ type: "INCREASE_QUANTITY", payload: id });
  };

  const decreaseQuantity = (id) => {
    dispatch({ type: "DECREASE_QUANTITY", payload: id });
  };

  return (
    <CartContext.Provider
      value={{ ...state, addToCart, increaseQuantity, decreaseQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => {
  return useContext(CartContext);
};

export { CartProvider, useCartContext };
