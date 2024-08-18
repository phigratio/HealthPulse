import React from "react";
import Login from "../../assets/Login.json";
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

const LoginL = () => {
  return (
    <div style={containerStyle}>
      <Lottie style={animationStyle} animationData={Login} />
    </div>
  );
};

export default LoginL;
