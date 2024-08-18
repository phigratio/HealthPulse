import React from "react";
import PurpleBriefCase from "../../assets/PurpleBriefCase.json";
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

const PurpleBriefCaseL = () => {
  return (
    <div style={containerStyle}>
      <Lottie style={animationStyle} animationData={PurpleBriefCase} />
    </div>
  );
};

export default PurpleBriefCaseL;
