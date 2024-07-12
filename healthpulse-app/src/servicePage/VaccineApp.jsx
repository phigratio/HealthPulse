import React from "react";
import banner from "../images/banner/kidsCorner.mp4";
import Background from "../components/basicComponents/Background";
import Base from "../components/Base";
import VaccineHeader from "./VaccineHeader";
import Home from "./Home";
import AllVaccine from "./AllVaccines";
import AddVaccineItem from "./AddVaccineItem";

const VaccineApp = () => {
  return (
    <div>
      <Background />
      <Base>
        <div className="main">
          <div className="video-container">
            <video src={banner} autoPlay loop muted></video>
          </div>
          <div>
            <VaccineHeader />
            <Home />
            <AllVaccine />
            <AddVaccineItem />
          </div>
        </div>
      </Base>
    </div>
  );
};

export default VaccineApp;
