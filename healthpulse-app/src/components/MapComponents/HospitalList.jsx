import React from "react";
import "./HospitalList.css"; // Import the CSS file

const HospitalList = ({ hospitals, onHospitalClick }) => {
  return (
    <div className="hospital-list">
      {hospitals.map((hospital) => (
        <div
          key={hospital.place_id}
          className="hospital-card"
          onClick={() => onHospitalClick(hospital.geometry.location)}
        >
          <h2>{hospital.name}</h2>
          <p>{hospital.vicinity}</p>
        </div>
      ))}
    </div>
  );
};

export default HospitalList;
