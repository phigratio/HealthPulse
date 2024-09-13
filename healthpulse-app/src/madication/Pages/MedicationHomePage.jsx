import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import GetCurrentMedication from "../Components/GetCurrentMedication";
import GetAllMedication from "../Components/GetAllMedication";
import "../Styles/MedicationHomePage.css";
import banner from "../../images/banner/Reminder.mp4"; 

const MedicationHomePage = () => {
  const [selectedTab, setSelectedTab] = useState("current"); // default to current medications
  const navigate = useNavigate(); // Initialize navigate

  const handleAddMedicationClick = () => {
    navigate("/medication/add"); // Navigate to the add medication page
  };

  return (
    <div>
      <div className="reminder-video-container">
        <video src={banner} autoPlay loop muted></video>
      </div>
      <h1>Medication Tracker</h1>

      {/* Buttons for selecting view */}
      <div>
        <button
          onClick={() => setSelectedTab("current")}
          className={`medicationButton ${
            selectedTab === "current" ? "active-tab" : ""
          }`}
        >
          View Current Medications
        </button>
        <button
          onClick={() => setSelectedTab("all")}
          className={`medicationButton ${
            selectedTab === "all" ? "active-tab" : ""
          }`}
        >
          View All Medications
        </button>
      </div>

      {/* Conditionally render the selected component */}
      <div>
        {selectedTab === "current" ? (
          <GetCurrentMedication />
        ) : (
          <GetAllMedication />
        )}
      </div>

      {/* Floating button */}
      <button className="floatingButton" onClick={handleAddMedicationClick}>
        +
      </button>
    </div>
  );
};

export default MedicationHomePage;
