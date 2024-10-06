import React from "react";
import Background from "../components/basicComponents/Background";
import Base from "../components/Base";
import { Route, Routes } from "react-router-dom";
import { Nav } from "reactstrap";
import Navbar from "./Components/Navbar";
import MyCart from "./Pages/MyCart";

import EcommerceDashboard from "./Pages/EcommerceDashboard";
import ProductDetails from "./Pages/ProductDetails";

const EcommerceMainPage = () => {
  return (
    <div>
      <Background />
      <Base>
        <Navbar />
        <div className="main">
          <Routes>
            <Route path="/" element={<EcommerceDashboard />} />
            <Route path="/product/:productId" element={<ProductDetails />} />
            <Route path="/mycart" element={<MyCart />} />
          </Routes>
        </div>
      </Base>
    </div>
  );
};

export default EcommerceMainPage;
