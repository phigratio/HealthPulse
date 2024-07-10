import React from "react";
import Base from "../../components/Base";
import Background from "../../components/basicComponents/Background"; // Import the Background component
import Carousel from "../../components/basicComponents/CustomCarousel";
import ServicesBlock from "../../components/basicComponents/ServicesBlock";
import Person from "../../components/basicComponents/Person";
import NewFeedPagination from "../../components/postComponents/NewFeedPagination";

const Dashboard = () => {
  return (
    <div>
      <Background />
      <Base>
        <Carousel />
        <ServicesBlock />
        <Person />
        <NewFeedPagination />
      </Base>
    </div>
  );
};

export default Dashboard;
