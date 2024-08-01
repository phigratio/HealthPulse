import React from "react";
import EcommerceMainCarousel from "../../HomeCarousel/EcommerceMainCarousel";
import { Home } from "@mui/icons-material";
import HomeSectionProduct from "../../HomeProdect/HomeSectionProduct";

const EcomHomePage = () => {
  return (
    <div>
      <EcommerceMainCarousel />
      <div>
        <HomeSectionProduct />
      </div>
    </div>
  );
};

export default EcomHomePage;
