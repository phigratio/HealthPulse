import React from "react";
import Virus from "../../assets/Virus.json";
import Lottie from "lottie-react";

const wrapperStyle = {
  display: "flex",
  justifyContent: "center", // Center horizontally
  alignItems: "center", // Center vertically
  width: "270px", // Adjust to your container size
  height: "270px", // Adjust to your container size
  margin: "0 auto", // Center the wrapper in its parent container
};

const animationStyle = {
  width: "100%", // Make the animation fill the container
  height: "100%",
};

const VirusL = () => {
  return (
    <div style={wrapperStyle}>
      <Lottie style={animationStyle} animationData={Virus} />
    </div>
  );
};

export default VirusL;
