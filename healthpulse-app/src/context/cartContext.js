import { createContext } from "react";
import { useReducer , useContext } from "react";
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
    dispatch({ type: "ADD_TO_CART", payload: medicine });
  };

  return (
    <CartContext.Provider value={{ ...state, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => {
  return useContext(CartContext);
};


export { CartProvider , useCartContext };
