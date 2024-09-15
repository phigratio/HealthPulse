import React from "react";
import banner from "../images/banner/kidsCorner.mp4";
import "../style/servicePage/KidsCorner.css";
import Background from "../components/basicComponents/Background";
import Base from "../components/Base";
import QuizGame from "./QuizGame";

const Quiz = () => {
  return (
    <div>
      <Background />
      <Base>
        <div className="main">
          <div className="video-container">
            <video src={banner} autoPlay loop muted></video>
          </div>
          <div className="text-container">
            <QuizGame />
          </div>
        </div>
      </Base>
    </div>
  );
};

export default Quiz;
