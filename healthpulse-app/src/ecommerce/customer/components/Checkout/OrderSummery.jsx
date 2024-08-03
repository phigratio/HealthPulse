import React from "react";
import AddressCard from "../AddressCard/AddressCard";
import Cart from "../Cart/Cart";

const OrderSummery = () => {
  return (
    <div>
      <div className="p-5 shadow-lg rounded-s-md">
        <AddressCard />
        <Cart />
      </div>
    </div>
  );
};

export default OrderSummery;
