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
    </div>
  );
};

export default CabinHomePage;
