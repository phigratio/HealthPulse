import React from "react";
import Prevention from "../../assets/Prevention.json";
import Lottie from "lottie-react";

const containerStyle = {
  position: "relative", // Change this from "absolute" to "relative"
  margin: "20px", // Add margin if needed
  width: "280px", // Ensure width is set
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
