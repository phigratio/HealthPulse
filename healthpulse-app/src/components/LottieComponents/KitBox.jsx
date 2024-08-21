import React from "react";
import KitBox from "../../assets/KitBox.json";
import Lottie from "lottie-react";

const wrapperStyle = {
  display: "flex",
  justifyContent: "center", // Center horizontally
  alignItems: "center", // Center vertically
  width: "300px", // Adjust to your container size
  height: "300px", // Adjust to your container size
  margin: "0 auto", // Center the wrapper in its parent container
};

const animationStyle = {
  width: "100%", // Make the animation fill the container
  height: "100%",
};

const KitBoxL = () => {
  return (
    <div style={wrapperStyle}>
      <Lottie style={animationStyle} animationData={KitBox} />
    </div>
  );
};

export default KitBoxL;
