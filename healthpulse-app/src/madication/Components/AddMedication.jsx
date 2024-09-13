import React, { useState } from "react";
import { createMedication } from "../Service/MedicationService";
import { getCurrentUserDetail } from "../../auth";
import { useNavigate } from "react-router-dom";
import "../Styles/AddMedication.css";

const AddMedication = () => {
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

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMedication({ ...medication, [name]: value });
  };

  const handleTimeChange = (index, value) => {
    const newTimes = [...medication.times];
    newTimes[index] = value;
    setMedication({ ...medication, times: newTimes });
  };

  const addTimeInput = () => {
    setMedication({ ...medication, times: [...medication.times, ""] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const currentUser = getCurrentUserDetail();
    const medicationData = { ...medication, userId: currentUser.id };

    createMedication(medicationData)
      .then((response) => {
        console.log("Medication created successfully:", response);
        navigate("/medication"); // Navigate to medications list after success
      })
      .catch((error) => {
        console.error("Error creating medication:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="am-container">
      <h2 className="am-heading">Add Medication</h2>
      <form className="am-form" onSubmit={handleSubmit}>
        {/* Form fields */}
        <div className="am-form-group">
          <label className="am-label">Name</label>
          <input
            type="text"
            name="name"
            value={medication.name}
            onChange={handleInputChange}
            required
            className="am-input"
          />
        </div>
        <div className="am-form-group">
          <label className="am-label">Dosage</label>
          <input
            type="text"
            name="dosage"
            value={medication.dosage}
            onChange={handleInputChange}
            required
            className="am-input"
          />
        </div>
        <div className="am-form-group">
          <label className="am-label">Unit</label>
          <input
            type="text"
            name="unit"
            value={medication.unit}
            onChange={handleInputChange}
            required
            className="am-input"
          />
        </div>
        <div className="am-form-group">
          <label className="am-label">Medication Type</label>
          <input
            type="text"
            name="medicationType"
            value={medication.medicationType}
            onChange={handleInputChange}
            required
            className="am-input"
          />
        </div>
        <div className="am-form-group">
          <label className="am-label">Amount</label>
          <input
            type="text"
            name="amount"
            value={medication.amount}
            onChange={handleInputChange}
            required
            className="am-input"
          />
        </div>
        <div className="am-form-group">
          <label className="am-label">Frequency Per Day</label>
          <input
            type="number"
            name="frequencyPerDay"
            value={medication.frequencyPerDay}
            onChange={handleInputChange}
            required
            className="am-input"
          />
        </div>
        <div className="am-form-group">
          <label className="am-label">Times</label>
          {medication.times.map((time, index) => (
            <input
              key={index}
              type="time"
              value={time}
              onChange={(e) => handleTimeChange(index, e.target.value)}
              className="am-input"
            />
          ))}
          <button
            type="button"
            onClick={addTimeInput}
            className="am-add-time-button"
          >
            Add Time
          </button>
        </div>
        <div className="am-form-group">
          <label className="am-label">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={medication.startDate}
            onChange={handleInputChange}
            required
            className="am-input"
          />
        </div>
        <div className="am-form-group">
          <label className="am-label">Duration (Days)</label>
          <input
            type="number"
            name="durationDays"
            value={medication.durationDays}
            onChange={handleInputChange}
            required
            className="am-input"
          />
        </div>
        <div className="am-form-group">
          <label className="am-label">Instructions</label>
          <input
            type="text"
            name="instructions"
            value={medication.instructions}
            onChange={handleInputChange}
            className="am-input"
          />
        </div>
        <button type="submit" disabled={loading} className="am-button">
          {loading ? "Adding..." : "Add Medication"}
        </button>
      </form>
    </div>
  );
};

export default AddMedication;
