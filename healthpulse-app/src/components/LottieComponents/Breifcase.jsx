import React from "react";
import Briefcase from "../../assets/Briefcase.json";
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

const BriefCase = () => {
  return (
    <div style={containerStyle}>
      <Lottie style={animationStyle} animationData={Briefcase} />
    </div>
  );
};

export default BriefCase;
