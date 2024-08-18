import { createContext, useReducer, useContext , useEffect } from "react";
import cartReducer from "./cartReducer";


const CartContext = createContext();

const getLocalStorageData = () => {
  let localSotorageCart = localStorage.getItem("medicineCart");
  if (localSotorageCart) {
    return JSON.parse(localSotorageCart);
  } else {
    return [];
  }
}

const initialState = {
  //cart: [],
  cart: getLocalStorageData(),
  totalAmount: 0,
  totalItems: 0,
  shippingFee: 5000,
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (medicine) => {
    dispatch({ type: "ADD_TO_CART", payload: { medicine } });
  };

  const increaseQuantity = (id) => {
    dispatch({ type: "INCREASE_QUANTITY", payload: id });
  };

  const decreaseQuantity = (id) => {
    dispatch({ type: "DECREASE_QUANTITY", payload: id });
  };

  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  useEffect(() => {
    dispatch({ type: "CALCULATE_TOTALS" });
  }, [state.cart]);

  //add the data to the local storage
  useEffect(()=> {
    localStorage.setItem("medicineCart", JSON.stringify(state.cart))
  }, [state.cart]
  )

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => {
  return useContext(CartContext);
};

export { CartProvider, useCartContext };
