import React from "react";
import banner from "../images/banner/bookDoctor.mp4";
import "../style/servicePage/BookDoctor.css";
import Background from "../components/Background";
import Base from "../components/Base";

const BookDoctor = () => {
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

export default BookDoctor;
