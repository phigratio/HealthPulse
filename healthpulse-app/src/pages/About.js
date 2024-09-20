import React from "react";
// Assuming you have a Base component for layout
import "../style/About.css"; // You can customize the CSS to make it look more professional
import Background from "../components/basicComponents/Background";
import Base from "../components/Base";


const About = () => {
  return (
    <div>
      <Background />
      <Base>
      <div className="about-container ">
        <h1 className="about-title">About HealthPulse</h1>
        <p className="about-description">
          Welcome to <strong>HealthPulse</strong>, your AI-powered health
          companion that aims to revolutionize the way you manage and monitor
          your health. HealthPulse leverages the latest advancements in
          artificial intelligence to provide personalized insights and
          recommendations, helping you stay on top of your well-being.
        </p>
        <h2 className="about-subtitle">Our Mission</h2>
        <p className="about-description">
          At <strong>HealthPulse</strong>, our mission is to empower individuals
          by giving them access to powerful AI tools that can monitor their
          health, provide instant feedback, and offer data-driven health
          insights. Whether you’re tracking daily activities, monitoring your
          heart rate, or keeping up with your fitness goals, HealthPulse has you
          covered.
        </p>
        <h2 className="about-subtitle">Key Features</h2>
        <ul className="about-features">
          <li>Real-time health tracking powered by AI</li>
          <li>Personalized health insights and recommendations</li>
          <li>Monitor vitals and fitness goals effortlessly</li>
          <li>Advanced AI-driven diagnostics</li>
          <li>Secure and confidential health data storage</li>
        </ul>
        <h2 className="about-subtitle">Why Choose HealthPulse?</h2>
        <p className="about-description">
          HealthPulse is designed to be your go-to health assistant, offering a
          seamless experience that integrates into your daily routine. Whether
          you're looking to improve your fitness, monitor specific health
          conditions, or simply live a healthier life, our platform offers the
          tools and support to help you achieve your goals.
        </p>
        <p className="about-description">
          Join the HealthPulse community today and take the first step towards a
          healthier, smarter lifestyle.
        </p>
      </div>
      </Base>
    </div>
  );
};

export default About;
