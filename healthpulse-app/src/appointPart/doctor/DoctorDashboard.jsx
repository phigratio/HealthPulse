import React from "react";
import { useNavigate } from "react-router-dom";
import "./style/DoctorDashboard.css"; // Import the CSS file
import { getUserData } from "../../service/user-service";

const DoctorDashboard = () => {
  const navigate = useNavigate();

  const user = getUserData();

  const handleNavigation = (path) => {
    navigate("/appoint" + path);
  };

  return (
    <div className="doctor-dashboard">
      <h2>
        Hello,{" "}
        <span style={{ color: "#36bff5", textTransform: "uppercase" }}>
          {user.name}
        </span>
      </h2>
      <h2>Doctor Dashboard</h2>
      <div className="dashboard-buttons">
        <button
          className="dashboard-button"
          onClick={() => handleNavigation("/add")}
        >
          Add Appointment
        </button>
        <button
          className="dashboard-button"
          onClick={() => handleNavigation("/create-prescription")}
        >
          Add Prescription
        </button>
        <button
          className="dashboard-button"
          onClick={() => handleNavigation("/doctor-next-appointments")}
        >
          See My Appointments
        </button>
        <button
          className="dashboard-button"
          onClick={() => handleNavigation("/patient-history")}
        >
          View Patient History
        </button>
      </div>
    </div>
  );
};

export default DoctorDashboard;
