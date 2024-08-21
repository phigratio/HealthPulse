import React from "react";
import KitBox from "../../assets/KitBox.json";
import Lottie from "lottie-react";

const containerStyle = {
  position: "relative", // Change this from "absolute" to "relative"
  margin: "20px", // Add margin if needed
  width: "280px", // Ensure width is set
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
