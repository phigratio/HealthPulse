import React from "react";

const CartAmountToggle = ({
  id,
  amount,
  increaseQuantity,
  decreaseQuantity,
}) => {
  return (
    <div className="amount-toggle">
      <button onClick={() => decreaseQuantity(id)}>-</button>
      <span>{amount}</span>
      <button onClick={() => increaseQuantity(id)}>+</button>
    </div>
  );
};

export default CartAmountToggle;
