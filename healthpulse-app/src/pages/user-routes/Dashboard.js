import React from "react";
import { useNavigate } from "react-router-dom";
import Base from "../../components/Base";
import Background from "../../components/basicComponents/Background";
import Carousel from "../../components/basicComponents/CustomCarousel";
import ServicesBlock from "../../components/basicComponents/ServicesBlock";
import Person from "../../components/basicComponents/Person";
import NewFeedPagination from "../../components/postComponents/NewFeedPagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import "../../style/Dashboard.css"; // Import custom CSS for the floating button

const Dashboard = () => {
  const navigate = useNavigate();

  // Handle click on the floating button
  const handleChatClick = () => {
    navigate("/chat"); // Redirect to /chat
  };

  return (
    <div>
      <Background />
      <Base>
        <Carousel />
        <ServicesBlock />
        <Person />
        <NewFeedPagination />

        {/* Floating button */}
        <div className="dashboard-floating-button" onClick={handleChatClick}>
          <FontAwesomeIcon icon={faComments} />
        </div>
      </Base>
    </div>
  );
};

export default Dashboard;
