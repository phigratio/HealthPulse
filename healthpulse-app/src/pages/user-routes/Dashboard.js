import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Base from "../../components/Base";
import Background from "../../components/basicComponents/Background";
import Carousel from "../../components/basicComponents/CustomCarousel";
import ServicesBlock from "../../components/basicComponents/ServicesBlock";
import Person from "../../components/basicComponents/Person";
import NewFeedPagination from "../../components/postComponents/NewFeedPagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import { isLoggedIn } from "../../auth";
import "../../style/Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is not logged in
    if (!isLoggedIn()) {
      navigate("/login");
    }
  }, [navigate]);

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
        {/* <Person /> */}
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
