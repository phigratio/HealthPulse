import React from "react";
import Background from "../components/basicComponents/Background";
import Base from "../components/Base";
import EcommerceNavigation from "./customer/components/navication/Navigation";
import EcomHomePage from "./customer/components/Pages/HomePage/HomePage";
import Product from "./customer/components/Product/Product";

const EcommerceMainPage = () => {
  return (
    <div>
      <Background />
      <Base>
        <EcommerceNavigation />
        <div className="main">
          {/* <EcomHomePage /> */}
          <Product />
        </div>
      </Base>
    </div>
  );
};

export default EcommerceMainPage;
