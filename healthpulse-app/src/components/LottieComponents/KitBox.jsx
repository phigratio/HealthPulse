import React from "react";
import KitBox from "../../assets/KitBox.json";
import Lottie from "lottie-react";

const containerStyle = {
  position: "absolute", // Positioning the element absolutely within its container
  top: "50%", // Adjust this value to move it down or up
  left: "2%", // Adjust this value to move it right or left
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
