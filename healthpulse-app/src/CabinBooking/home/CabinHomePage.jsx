import React from "react";
import { useState } from "react";

import RoomResult from "../common/RoomResult";
import RoomSearch from "../common/RoomSearch";

import banner from "../assects/images/banner.jpeg";
import room from "../assects/images/privateroom.jpeg";
import nurse from "../assects/images/nurse.png";
import meal from "../assects/images/meal.png";
import call from "../assects/images/call.jpeg";
import "./CabinHomePage.css";
const CabinHomePage = () => {
  const [roomSearchResults, setRoomSearchResults] = useState([]);

  // Function to handle search results
  const handleSearchResult = (results) => {
    setRoomSearchResults(results);
  };

  return (
    <div className="cb-home">
      {/* HEADER / BANNER ROOM SECTION */}
      <section>
        <header className="cb-header-banner">
          <div className="cb-header-image-container">
            <img src={banner} alt="Phegon Hotel" className="cb-header-image" />
            <div className="cb-overlay-content">
              <h1 className="text-center">
                Book Cabin with{" "}
                <span className="cb-phegon-color">Health Pulse </span>
              </h1>
              <br />
              <h3 className="text-center">
                Step into a haven of comfort and care
              </h3>
            </div>
          </div>
        </header>
      </section>

      {/* SEARCH/FIND AVAILABLE ROOM SECTION */}
      <RoomSearch handleSearchResult={handleSearchResult} />
      <RoomResult roomSearchResults={roomSearchResults} />
      <h4>
        <a className="cb-view-rooms-home" href="/cabin-booking/rooms">
          All Rooms
        </a>
      </h4>

      <h2 className="cb-home-services">
        <span className="cb-phegon-color">Health Pulse</span> Ensures Services
      </h2>

      <section className="cb-service-section">
        <div className="cb-service-card">
          <img src={room} alt="Private Room" />
          <div className="cb-service-details">
            <h3 className="cb-service-title">Private Room</h3>
            <p className="cb-service-description">
              Experience the privacy and comfort of our hospital cabins,
              designed to provide a quiet and restful environment for recovery.
            </p>
          </div>
        </div>
        <div className="cb-service-card">
          <img src={nurse} alt="24/7 Nursing Care" />
          <div className="cb-service-details">
            <h3 className="cb-service-title">24/7 Nursing Care</h3>
            <p className="cb-service-description">
              Our dedicated nursing staff is available around the clock to
              ensure you receive the care and attention you need at any hour.
            </p>
          </div>
        </div>
        <div className="cb-service-card">
          <img src={call} alt="Emergency Call Button" />
          <div className="cb-service-details">
            <h3 className="cb-service-title">Emergency Call Button</h3>
            <p className="cb-service-description">
              Each cabin is equipped with an emergency call button, providing
              instant access to medical assistance whenever required.
            </p>
          </div>
        </div>
        <div className="cb-service-card">
          <img src={meal} alt="Customized Meal Service" />
          <div className="cb-service-details">
            <h3 className="cb-service-title">Customized Meal Service</h3>
            <p className="cb-service-description">
              Enjoy nutritious meals tailored to your dietary needs, delivered
              directly to your cabin to support your recovery journey.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CabinHomePage;
