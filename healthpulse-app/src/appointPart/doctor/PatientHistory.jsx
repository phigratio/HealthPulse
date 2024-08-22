import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style/PatientHistory.css";

const PatientHistory = () => {
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (userId.trim()) {
      // Navigate to the UserPrescriptions page with the userId
      navigate(`/appoint/user-prescriptions/${userId}`);
    } else {
      setError("User ID cannot be empty.");
    }
  };

  return (
    <div className="patient-history">
      <h2>Enter User ID</h2>
      <form onSubmit={handleSubmit} className="patient-history-form">
        <label htmlFor="userId">
          User ID:
          <input
            type="text"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter user ID"
          />
        </label>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="submit-button">
          View Prescriptions
        </button>
      </form>
    </div>
  );
};

export default PatientHistory;
