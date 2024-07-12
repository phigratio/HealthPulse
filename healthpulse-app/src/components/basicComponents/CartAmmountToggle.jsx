import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import "../../style/CartAmountToggle.css";
import { useCartContext } from "../../context/cartContext";

function CartAmountToggle({ id, amount }) {
  const { increaseQuantity, decreaseQuantity } = useCartContext();

  const setDecrease = () => {
    decreaseQuantity(id);
  };

  const setIncrease = () => {
    increaseQuantity(id);
  };

  return (
    <div className="cart-button">
      <div className="amount-toggle">
        <button onClick={setDecrease} className="amount-toggle-button">
          <FaMinus />
        </button>
        <span className="amount-style">{amount}</span>
        <button onClick={setIncrease} className="amount-toggle-button">
          <FaPlus />
        </button>
      </div>
    </div>
  );
}

export default CartAmountToggle;
