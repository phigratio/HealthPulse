import React from "react";
import "../style/Cart.css";
import Background from "../components/basicComponents/Background";
import Base from "../components/Base";
import { useCartContext } from "../context/cartContext";
import CartAmountToggle from "../components/basicComponents/CartAmountToggle";
import { FaTrashAlt } from "react-icons/fa";

const Cart = () => {
  const { cart, increaseQuantity, decreaseQuantity, removeItem, totalAmount } =
    useCartContext();
  console.log("This is in my cart: ", cart);

  return (
    <div>
      <Background />
      <Base>
        <div className="cart-container">
          <h2 className="cart-title">Your Shopping Cart</h2>
          <div className="cart-heading grid grid-five-column">
            <p className="text-center">Item</p>
            <p className="cart-hide">Price</p>
            <p>Quantity</p>
            <p className="cart-hide text-center">Subtotal</p>
            <p>Remove</p>
          </div>
          {cart.length > 0 ? (
            cart.map((item) => (
              <div className="cart-item grid grid-five-column" key={item.id}>
                <div className="cart-item-info">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-image"
                  />
                  <p>{item.name}</p>
                </div>
                <p className="cart-hide">BDT {item.price?.toFixed(2) || 0.0}</p>
                <p>
                  <CartAmountToggle
                    id={item.id}
                    amount={item.quantity}
                    increaseQuantity={() => increaseQuantity(item.id)}
                    decreaseQuantity={() => decreaseQuantity(item.id)}
                  />
                </p>
                <p className="cart-hide">
                  BDT {(item.price * item.quantity)?.toFixed(2) || 0.0}
                </p>
                <button
                  className="remove-button" 
                  onClick={() => removeItem(item.id)}
                >
                  <FaTrashAlt />
                </button>
              </div>
            ))
          ) : (
            <p className="empty-cart-message">Your cart is empty.</p>
          )}
        </div>
        <div>
          <h3>Total Amount: BDT {totalAmount.toFixed(2)}</h3>
        </div>
      </Base>
    </div>
  );
};

export default Cart;
