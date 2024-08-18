import React from "react";
import BlueMedicare from "../../assets/BlueMedicare.json";
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

const BlueMedicareL = () => {
  return (
    <div style={containerStyle}>
      <Lottie style={animationStyle} animationData={BlueMedicare} />
    </div>
  );
};

export default BlueMedicareL;
