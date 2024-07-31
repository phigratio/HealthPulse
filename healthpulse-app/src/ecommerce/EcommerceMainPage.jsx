import React from "react";
import Background from "../components/basicComponents/Background";
import Base from "../components/Base";
import EcommerceNavigation from "./customer/components/navication/Navigation";
import EcomHomePage from "./customer/components/Pages/HomePage/HomePage";

const EcommerceMainPage = () => {
  return (
    <div>
      <Background />
      <Base>
        <EcommerceNavigation />
        <div className="main">
          <EcomHomePage />
        </div>
      </Base>
    </div>
  );
};

export default EcommerceMainPage;
