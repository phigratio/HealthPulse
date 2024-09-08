import React from "react";
import PropTypes from "prop-types";
import "../Styles/MedicationCard.css";

const MedicationCard = ({ medication, onDelete, onUpdate }) => {
  return (
    <div className="medication-card">
      <h3>{medication.name}</h3>
      <p>
        Dosage: {medication.dosage} {medication.unit}
      </p>
      <p>Type: {medication.medicationType}</p>
      <p>Frequency: {medication.frequencyPerDay} times per day</p>
      <p>Start Date: {new Date(medication.startDate).toLocaleDateString()}</p>
      <p>Duration: {medication.durationDays} days</p>
      <p>Instructions: {medication.instructions}</p>

      {/* Display Medication Times */}
      {medication.times && medication.times.length > 0 && (
        <div>
          <p>Times to take:</p>
          <ul>
            {medication.times.map((time, index) => (
              <li key={index}>{time}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="medication-card-actions">
        <button onClick={onUpdate} className="btn-update">
          Update
        </button>
        <button onClick={onDelete} className="btn-delete">
          Delete
        </button>
      </div>
    </div>
  );
};

MedicationCard.propTypes = {
  medication: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default MedicationCard;
