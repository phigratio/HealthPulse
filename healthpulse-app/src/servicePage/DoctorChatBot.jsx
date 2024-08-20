import React from "react";
import banner from "../images/banner/doctorChatBot.mp4";
import "../style/servicePage/DoctorChatBot.css";
import Background from "../components/basicComponents/Background";
import Base from "../components/Base";
import ChatWindow from "./ChatWindow";
import KitBoxL from "../components/LottieComponents/KitBox";
import VirusL from "../components/LottieComponents/Virus";
import PreventionL from "../components/LottieComponents/Prevention";

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

          {/* Layout with Lottie animations and ChatWindow */}
          <div className="chat-layout">
            <div className="lottie-container">
              <KitBoxL />
            </div>
            <div className="chat-container">
              <ChatWindow />
            </div>
            <div className="lottie-container">
              <PreventionL />
            </div>
          </div>
        </div>
      </Base>
    </div>
  );
};

export default DoctorChatBot;
