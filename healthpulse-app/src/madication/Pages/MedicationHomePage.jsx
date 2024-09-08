import React, { useState } from "react";
import GetCurrentMedication from "../Components/GetCurrentMedication";
import GetAllMedication from "../Components/GetAllMedication";
import "../Styles/MedicationHomePage.css";

const MedicationHomePage = () => {
  const [selectedTab, setSelectedTab] = useState("current"); // default to current medications

  return (
    <div>
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
    </div>
  );
};

export default MedicationHomePage;
