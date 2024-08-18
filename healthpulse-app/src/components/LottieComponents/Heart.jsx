import React from "react";
import Heart from "../../assets/Heart.json";
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

const HeartL = () => {
  return (
    <div style={containerStyle}>
      <Lottie style={animationStyle} animationData={Heart} />
    </div>
  );
};

export default HeartL;
