import React from "react";
import Virus from "../../assets/Virus.json";
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

const VirusL = () => {
  return (
    <div style={containerStyle}>
      <Lottie style={animationStyle} animationData={Virus} />
    </div>
  );
};

export default VirusL;
