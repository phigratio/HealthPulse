import React from "react";
import { useState } from "react";

import RoomResult from "../common/RoomResult";
import RoomSearch from "../common/RoomSearch";

import banner from "../assects/images/banner.jpeg";
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
        Services at <span className="cb-phegon-color">Phegon Hotel</span>
      </h2>

      <section className="cb-service-section">
        <div className="cb-service-card">
          <img src="./assets/images/ac.png" alt="Air Conditioning" />
          <div className="cb-service-details">
            <h3 className="cb-service-title">Air Conditioning</h3>
            <p className="cb-service-description">
              Stay cool and comfortable throughout your stay with our
              individually controlled in-room air conditioning.
            </p>
          </div>
        </div>
        <div className="cb-service-card">
          <img src="./assets/images/mini-bar.png" alt="Mini Bar" />
          <div className="cb-service-details">
            <h3 className="cb-service-title">Mini Bar</h3>
            <p className="cb-service-description">
              Enjoy a convenient selection of beverages and snacks stocked in
              your room's mini bar with no additional cost.
            </p>
          </div>
        </div>
        <div className="cb-service-card">
          <img src="./assets/images/parking.png" alt="Parking" />
          <div className="cb-service-details">
            <h3 className="cb-service-title">Parking</h3>
            <p className="cb-service-description">
              We offer on-site parking for your convenience . Please inquire
              about valet parking options if available.
            </p>
          </div>
        </div>
        <div className="cb-service-card">
          <img src="./assets/images/wifi.png" alt="WiFi" />
          <div className="cb-service-details">
            <h3 className="cb-service-title">WiFi</h3>
            <p className="cb-service-description">
              Stay connected throughout your stay with complimentary high-speed
              Wi-Fi access available in all guest rooms and public areas.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CabinHomePage;
