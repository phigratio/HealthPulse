import React, { useState } from "react";
import banner from "../images/banner/doctorChatBot.mp4";
import "../style/servicePage/DoctorChatBot.css";
import Background from "../components/basicComponents/Background";
import Base from "../components/Base";
import ChatWindow from "./ChatWindow"; // Assuming you want to include a chat window component

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
          {/* Chat Window */}
          <div className="text-container">
            <ChatWindow />
          </div>
        </div>
      </Base>
    </div>
  );
};

export default DoctorChatBot;
