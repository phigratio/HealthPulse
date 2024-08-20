import React from "react";
import MentalHealth from "../../assets/MentalHealth.json";
import Lottie from "lottie-react";

const containerStyle = {
  position: "absolute", // Positioning the element absolutely within its container
  top: "50%", // Adjust this value to move it down or up
  left: "2%", // Adjust this value to move it right or left
};

const animationStyle = {
  width: "280px",
};
const MentalHealthL = () => {
  return (
    <div style={containerStyle}>
      <Lottie style={animationStyle} animationData={MentalHealth} />
    </div>
  );
};

export default MentalHealthL;
