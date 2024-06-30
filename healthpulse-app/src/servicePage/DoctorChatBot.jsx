import React from "react";
import banner from "../images/banner/doctorChatBot.mp4";
import "../style/servicePage/DoctorChatBot.css";
import Background from "../components/Background";
import Base from "../components/Base";

const DoctorChatBot = () => {
  return (
    <div>
      <Background />
      <Base>
        <div className="main">
          <div className="video-container">
            <video src={banner} autoPlay loop muted></video>
          </div>
          <div className="text-container">
            <h1>Hello hi i</h1>
            <h1>Hello hi i</h1>
            <h1>Hello hi i</h1>
            <h1>Hello hi i</h1>
            <h1>Hello hi i</h1>
            <h1>Hello hi i</h1>
            <h1>Hello hi i</h1>
            <h1>Hello hi i</h1>
            <h1>Hello hi i</h1>
            <h1>Hello hi i</h1>
            <h1>Hello hi i</h1>
            <h1>Hello hi i</h1>
          </div>
        </div>
      </Base>
    </div>
  );
};

export default DoctorChatBot;
