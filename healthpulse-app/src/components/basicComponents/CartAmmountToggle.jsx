import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

function CartAmountToggle() {
  const [amount, setAmount] = useState(1);

  const setDecrease = () => {
    if (amount > 1) {
      setAmount(amount - 1);
    }
  };

  const setIncrease = () => {
    setAmount(amount + 1);
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
