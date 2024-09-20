import React from "react";
import banner from "../images/banner/MlModel.mp4";
import "../style/servicePage/KidsCorner.css";
import Background from "../components/basicComponents/Background";
import Base from "../components/Base";
import DiabetesPrediction from "./DiabetesPrediction";
import CaloriePrediction from "./CaloriePrediction";
import HeartDiseasePrediction from "./HeartDiseasePrediction";
import SkinDiseasePrediction from "./SkinDiseasePrediction";

const MlModels = () => {
  return (
    <div>
      <Background />
      <Base>
        <div className="main">
          <div className="video-container">
            <video src={banner} autoPlay loop muted></video>
          </div>
          <div className="text-container">
            <DiabetesPrediction />
            <CaloriePrediction />
            <HeartDiseasePrediction />
            <SkinDiseasePrediction />
          </div>
        </div>
      </Base>
    </div>
  );
};

export default MlModels;
