import React, { useState, useEffect } from "react";
import {
  updateMedication,
  getMedicationById,
} from "../Service/MedicationService";
import { getCurrentUserDetail } from "../../auth";
import { useParams, useNavigate } from "react-router-dom";
import "../Styles/UpdateMedication.css"; // Import the new CSS file

const UpdateMedication = () => {
  const { id } = useParams(); // Get medication ID from the URL params
  const navigate = useNavigate();

  const [medication, setMedication] = useState({
    name: "",
    dosage: "",
    unit: "",
    medicationType: "",
    amount: "",
    frequencyPerDay: "",
    times: [],
    startDate: "",
    durationDays: "",
    instructions: "",
    reminderSent: false,
    userId: 0, // Initial default value, will be set by getCurrentUserDetail()
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedicationAndUser = async () => {
      try {
        const currentUser = getCurrentUserDetail(); // Fetch current user details
        const medicationData = await getMedicationById(id); // Fetch medication details by ID

        setMedication({
          ...medicationData,
          userId: currentUser.id, // Set the userId automatically
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching medication or user details:", error);
      }
    };

    fetchMedicationAndUser();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMedication({ ...medication, [name]: value });
  };

  const handleTimeChange = (index, value) => {
    const newTimes = [...medication.times];
    newTimes[index] = value;
    setMedication({ ...medication, times: newTimes });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMedication(id, medication)
      .then((response) => {
        console.log("Medication updated successfully:", response);
        navigate("/medication"); // Navigate to medications list after success
      })
      .catch((error) => {
        console.error("Error updating medication:", error);
      });
  };

  if (loading) {
    return <p>Loading medication details...</p>;
  }

  return (
    <div className="um-container">
      <h2 className="um-heading">Update Medication</h2>
      <form className="um-form" onSubmit={handleSubmit}>
        {/* Form fields */}
        <div className="um-form-group">
          <label className="um-label">Name</label>
          <input
            type="text"
            name="name"
            value={medication.name}
            onChange={handleInputChange}
            required
            className="um-input"
          />
        </div>
        <div className="um-form-group">
          <label className="um-label">Dosage</label>
          <input
            type="text"
            name="dosage"
            value={medication.dosage}
            onChange={handleInputChange}
            required
            className="um-input"
          />
        </div>
        <div className="um-form-group">
          <label className="um-label">Unit</label>
          <input
            type="text"
            name="unit"
            value={medication.unit}
            onChange={handleInputChange}
            required
            className="um-input"
          />
        </div>
        <div className="um-form-group">
          <label className="um-label">Medication Type</label>
          <input
            type="text"
            name="medicationType"
            value={medication.medicationType}
            onChange={handleInputChange}
            required
            className="um-input"
          />
        </div>
        <div className="um-form-group">
          <label className="um-label">Amount</label>
          <input
            type="text"
            name="amount"
            value={medication.amount}
            onChange={handleInputChange}
            required
            className="um-input"
          />
        </div>
        <div className="um-form-group">
          <label className="um-label">Frequency Per Day</label>
          <input
            type="number"
            name="frequencyPerDay"
            value={medication.frequencyPerDay}
            onChange={handleInputChange}
            required
            className="um-input"
          />
        </div>
        <div className="um-form-group">
          <label className="um-label">Times</label>
          {medication.times.map((time, index) => (
            <input
              key={index}
              type="time"
              value={time}
              onChange={(e) => handleTimeChange(index, e.target.value)}
              className="um-input"
            />
          ))}
        </div>
        <div className="um-form-group">
          <label className="um-label">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={medication.startDate}
            onChange={handleInputChange}
            required
            className="um-input"
          />
        </div>
        <div className="um-form-group">
          <label className="um-label">Duration (Days)</label>
          <input
            type="number"
            name="durationDays"
            value={medication.durationDays}
            onChange={handleInputChange}
            required
            className="um-input"
          />
        </div>
        <div className="um-form-group">
          <label className="um-label">Instructions</label>
          <input
            type="text"
            name="instructions"
            value={medication.instructions}
            onChange={handleInputChange}
            className="um-input"
          />
        </div>
        <button type="submit" className="um-button">
          Update Medication
        </button>
      </form>
    </div>
  );
};

export default UpdateMedication;
