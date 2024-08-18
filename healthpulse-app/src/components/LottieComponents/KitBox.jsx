import React from "react";
import KitBox from "../../assets/KitBox.json";
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

const KitBoxL = () => {
  return (
    <div style={containerStyle}>
      <Lottie style={animationStyle} animationData={KitBox} />
    </div>
  );
};

export default KitBoxL;
