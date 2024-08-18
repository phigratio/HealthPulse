import React from "react";
import Food from "../../assets/Food.json";
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

const FoodL = () => {
  return (
    <div style={containerStyle}>
      <Lottie style={animationStyle} animationData={Food} />
    </div>
  );
};

export default FoodL;
