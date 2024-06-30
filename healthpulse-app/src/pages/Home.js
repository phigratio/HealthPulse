import React from "react";
import Base from "../components/Base";
import Background from "../components/Background"; // Import the Background component
import Carousel from "../components/CustomCarousel";
import ServicesBlock from "../components/ServicesBlock";
import Person from "../components/Person";

const Home = () => {
  return (
    <div>
      <Background />
      <Base>
        <Carousel />
        <ServicesBlock />
        <Person />
      </Base>
    </div>
  );
};

export default Home;
