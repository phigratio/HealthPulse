import React from "react";
import image1 from "../../../data/images/medicine/HerbalTeaTablet.webp";
import image2 from "../../../data/images/medicine/MultivitaminTablet.webp";
import image4 from "../../../data/images/medicine/Paracetamol-Tablet.jpg";
import { IconButton } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Button } from "react-bootstrap";

const CartItem = () => {
  return (
    <div className="p-3 shadow-lg border rounded-md bg-white mb-2">
      <div className="flex items-center">
        <div className="w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem]">
          <img
            className="w-full h-full object-cover object-top"
            src={image1}
            alt=""
          />
        </div>
        <div className="ml-5 space-y-1">
          <p className="font-semibold">Lorem ipsum dolor sit amet.</p>
          <p className="opacity-70">Size: L , White</p>
          <p className="opacity-70 mt-2">Seller: Bexsimco </p>
          <div className="flex space-x-5 items-center  text-gray-900 pt-6">
            <p className="font-semibold">$99</p>
            <p className="opacity-50 line-through">&199</p>
            <p className="text-green-600 font-semibold">50% off</p>
          </div>
        </div>
      </div>
      <div className="lf:flex items-center lg:space-x-10 pt-4">
        <div className="flex items-center space-x-2">
          <IconButton sx={{ color: "RGB(145 85 253)" }}>
            <RemoveCircleOutlineIcon />
          </IconButton>
          <span className="py-1 px-7 border rounded-sm"> 3 </span>
          <IconButton sx={{ color: "RGB(145 85 253)" }}>
            <AddCircleOutlineIcon />
          </IconButton>
          <div>
            <Button sx={{ color: "RGB(145 85 253)" }}> Remove </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
