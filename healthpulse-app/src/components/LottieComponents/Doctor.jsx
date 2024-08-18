import React from "react";
import Doctor from "../../assets/Doctor.json";
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

const DoctorImg = () => {
  return (
    <div style={containerStyle}>
      <Lottie style={animationStyle} animationData={Doctor} />
    </div>
  );
};

export default DoctorImg;
