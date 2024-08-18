import React from "react";
import Bacteria from "../../assets/Bacteria.json";
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

const BacteriaL = () => {
  return (
    <div style={containerStyle}>
      <Lottie style={animationStyle} animationData={Bacteria} />
    </div>
  );
};

export default BacteriaL;
