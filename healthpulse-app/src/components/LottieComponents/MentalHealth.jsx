import React from "react";
import MentalHealth from "../../assets/MentalHealth.json";
import Lottie from "lottie-react";

const containerStyle = {
  display: "flex",
  justifyContent: "left",
  alignItems: "left",
  height: "100vh",
};

const animationStyle = {
  width: "280px",
};

const MentalHealthL = () => {
  return (
    <div style={containerStyle}>
      <Lottie style={animationStyle} animationData={MentalHealth} />
    </div>
  );
};

export default MentalHealthL;
