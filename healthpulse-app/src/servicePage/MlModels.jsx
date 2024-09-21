import React, { useState } from "react";
import banner from "../images/banner/MlModel.mp4";
import "../style/servicePage/MlModels.css";
import Background from "../components/basicComponents/Background";
import Base from "../components/Base";
import DiabetesPrediction from "./DiabetesPrediction";
import CaloriePrediction from "./CaloriePrediction";
import HeartDiseasePrediction from "./HeartDiseasePrediction";
import SkinDiseasePrediction from "./SkinDiseasePrediction";

const MlModels = () => {
  const [activeModel, setActiveModel] = useState(null);

  const renderModel = () => {
    switch (activeModel) {
      case "diabetes":
        return <DiabetesPrediction />;
      case "calorie":
        return <CaloriePrediction />;
      case "heart":
        return <HeartDiseasePrediction />;
      case "skin":
        return <SkinDiseasePrediction />;
      default:
        return <p>Select a model to get started.</p>;
    }
  };

  return (
    <div>
      <Background />
      <Base>
        <div className="ml-main">
          <div className="ml-video-container">
            <video src={banner} autoPlay loop muted></video>
          </div>
          <div className="ml-button-container">
            <button
              className="ml-button"
              onClick={() => setActiveModel("diabetes")}
            >
              Diabetes Prediction
            </button>
            <button
              className="ml-button"
              onClick={() => setActiveModel("calorie")}
            >
              Calorie Prediction
            </button>
            <button
              className="ml-button"
              onClick={() => setActiveModel("heart")}
            >
              Heart Disease Prediction
            </button>
            <button
              className="ml-button"
              onClick={() => setActiveModel("skin")}
            >
              Skin Disease Prediction
            </button>
          </div>
          <div className="ml-model-container">{renderModel()}</div>
        </div>
      </Base>
    </div>
  );
};

export default MlModels;
