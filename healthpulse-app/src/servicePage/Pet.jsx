import React from "react";
import banner from "../images/banner/kidsCorner.mp4";
import "../style/servicePage/KidsCorner.css";
import Background from "../components/basicComponents/Background";
import Base from "../components/Base";
import ImageAndPdfGenerator from "./ImageGenerator";
import PetHealthcare from "./PetHealthCare";

const Pet = () => {
  return (
    <div>
      <Background />
      <Base>
        <div className="main">
          <div className="video-container">
            <video src={banner} autoPlay loop muted></video>
          </div>
          <div className="text-container">
            <PetHealthcare />
          </div>
        </div>
      </Base>
    </div>
  );
};

export default Pet;
