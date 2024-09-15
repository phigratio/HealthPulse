import React from "react";
import Quiz from "../../assets/Quiz.json";
import Lottie from "lottie-react";

const wrapperStyle = {
  display: "flex",
  justifyContent: "center", // Center horizontally
  alignItems: "center", // Center vertically
  width: "200px", // Adjust to your container size
  height: "200px", // Adjust to your container size
  margin: "0 auto", // Center the wrapper in its parent container
};

const animationStyle = {
  width: "100%", // Make the animation fill the container
  height: "100%",
};

const QuizL = () => {
  return (
    <div style={wrapperStyle}>
      <Lottie style={animationStyle} animationData={Quiz} />
    </div>
  );
};

export default QuizL;
