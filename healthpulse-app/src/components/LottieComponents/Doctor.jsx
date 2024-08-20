import React from "react";
import Doctor from "../../assets/Doctor.json";
import Lottie from "lottie-react";

const containerStyle = {
  position: "absolute", // Positioning the element absolutely within its container
  bottom: "10%", // Adjust this value to move it up or down
  right: "2%", // Adjust this value to move it left or right
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
