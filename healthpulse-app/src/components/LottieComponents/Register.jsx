import React from "react";
import Register from "../../assets/Register.json";
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

const RegisterL = () => {
  return (
    <div style={containerStyle}>
      <Lottie style={animationStyle} animationData={Register} />
    </div>
  );
};

export default RegisterL;
