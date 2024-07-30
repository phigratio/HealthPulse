import React from "react";
import Loading from "../../assets/Loading.json";
import Lottie from "lottie-react";

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "15vh",
};

const animationStyle = {
  width: "300px",
};

const HeartRate = () => {
  return (
    <div style={containerStyle}>
      <Lottie style={animationStyle} animationData={Loading} />
    </div>
  );
};

export default HeartRate;
