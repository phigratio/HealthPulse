import React from "react";
import Background from "../components/basicComponents/Background";
import Base from "../components/Base";

import CabinHomePage from "./home/CabinHomePage";
import Navbar from "./common/Navbar";
import { Route, Routes } from "react-router-dom";

const CabinMainPage = () => {
  return (
    <div>
      <Background />
      <Base>
        <Navbar className="mt-24" />
        <div className="main">
          <Routes>
            <Route path="/" element={<CabinHomePage />} />
          </Routes>
        </div>
      </Base>
    </div>
  );
};

export default CabinMainPage;
