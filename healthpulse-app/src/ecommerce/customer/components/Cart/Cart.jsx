import React from "react";
import CartItem from "./CartItem";
import { Divider } from "@mui/material";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();

  const handleCheckOut = () => {
    navigate("/ecommerce/checkout?step=2");
  };

  return (
    <div>
      <div className="lg:grid grid-cols-3 lg:px-16 relative  ">
        <div className="col-span-2 pt-5 ">
          {[1, 1, 1, 1].map((item) => (
            <CartItem />
          ))}
        </div>
        <div className="px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0 ">
          <div className="p-5 border rounded-md bg-white shadow-lg ">
            <p className="uppercase font-bold opacity-60 pb-4">Price details</p>
            <hr />

            <div className="space-y-3 font-semibold">
              <div className="flex justify-between pt-3 text-black">
                <span>Price</span>
                <span>$5675</span>
              </div>
              <div className="flex justify-between pt-3 ">
                <span>Discount</span>
                <span className="text-green-600">$5000</span>
              </div>
              <div className="flex justify-between pt-3 ">
                <span>Delivert Charge</span>
                <span className="text-green-600">$100</span>
              </div>
              <div className="flex justify-between pt-3  font-bold pb-10">
                <span>Total</span>
                <span className="text-green-600">$775</span>
              </div>
              <Button
                onClick={handleCheckOut}
                variant="contained"
                className="w-full text-center "
                sx={{ px: "2rem", py: "1rem" }}
              >
                Check Out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
