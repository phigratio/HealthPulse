import React from "react";
import banner from "../images/banner/doctorChatBot.mp4";
import "../style/servicePage/DoctorChatBot.css";
import Background from "../components/basicComponents/Background";
import Base from "../components/Base";
import ChatWindow from "./ChatWindow";
import PreventionL from "../components/LottieComponents/Prevention";
import BacteriaL from "../components/LottieComponents/Bacteria";

// DoctorChatBot Component
const DoctorChatBot = () => {
  return (
    <div>
      <Background />
      <Base>
        <div className="main">
          {/* Video Banner */}
          <div className="video-container">
            <video src={banner} autoPlay loop muted></video>
          </div>

          <div className="chatbot-layout">
            <div className="chatbot-lottie-container">
              <PreventionL />
            </div>
            <div className="chatbot-container">
              <ChatWindow />
            </div>
            <div className="chatbot-lottie-container">
              <BacteriaL />
            </div>
          </div>
        </div>
      </Base>
    </div>
  );
};

export default DoctorChatBot;
