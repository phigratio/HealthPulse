import React from "react";
import Base from "../components/Base";
import Background from "../components/Background";
import { Button } from "reactstrap";
import '../style/Home.css'; 
import Carousel from "../components/CustomCarousel";

const Home = () => {
  return (
    <div className="home-container">
      <Background />
      <Base>
        <Carousel />
        <div className="intro-text">
          <h1>Welcome to Health Pulse</h1>
          <h3>Your health, our concern </h3>
          <p>
            Your comprehensive platform for online doctor services and
            health-related information. Our goal is to provide you with
            accessible and reliable healthcare solutions right at your
            fingertips.Your comprehensive platform for online doctor services
            and health-related information. Our goal is to provide you with
            accessible and reliable healthcare solutions right at your
            fingertips.Your comprehensive platform for online doctor services
            and health-related information. Our goal is to provide you with
            accessible and reliable healthcare solutions right at your
            fingertips.Your comprehensive platform for online doctor services
            and health-related information. Our goal is to provide you with
            accessible and reliable healthcare solutions right at your
            fingertips.
          </p>
          <div className="button-group">
            <Button color="primary" size="lg" href="/login" className="button">
              Login
            </Button>
            <Button
              color="secondary"
              size="lg"
              href="/signup"
              className="button"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </Base>
    </div>
  );
};

export default Home;
