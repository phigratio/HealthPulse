import React from "react";
import Children from "../../assets/Children.json";
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

const ChildrenL = () => {
  return (
    <div style={containerStyle}>
      <Lottie style={animationStyle} animationData={Children} />
    </div>
  );
};

export default ChildrenL;
