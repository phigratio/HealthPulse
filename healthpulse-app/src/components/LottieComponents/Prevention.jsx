import React from "react";
import Prevention from "../../assets/Prevention.json";
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

const PreventionL = () => {
  return (
    <div style={containerStyle}>
      <Lottie style={animationStyle} animationData={Prevention} />
    </div>
  );
};

export default PreventionL;
