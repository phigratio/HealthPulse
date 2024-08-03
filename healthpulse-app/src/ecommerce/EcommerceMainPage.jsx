import React from "react";
import Background from "../components/basicComponents/Background";
import Base from "../components/Base";
import EcommerceNavigation from "./customer/components/navication/Navigation";
import EcomHomePage from "./customer/Pages/HomePage/HomePage";
import Product from "./customer/components/Product/Product";
import ProductDetails from "./customer/components/ProductDetails/ProductDetails";
import Cart from "./customer/components/Cart/Cart";
import { Check } from "@mui/icons-material";
import Checkout from "./customer/components/Checkout/Checkout";

const EcommerceMainPage = () => {
  return (
    <div>
      <Background />
      <Base>
        <EcommerceNavigation />
        <div className="main">
          {/* <EcomHomePage /> */}
          {/* <Product /> */}
          {/* <ProductDetails /> */}
          {/* <Cart /> */}
          <Checkout />
        </div>
      </Base>
    </div>
  );
};

export default EcommerceMainPage;
