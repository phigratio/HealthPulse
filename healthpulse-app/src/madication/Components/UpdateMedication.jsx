import React, { useState, useEffect } from "react";
import {
  updateMedication,
  getMedicationById,
} from "../Service/MedicationService";
import { useParams, useNavigate } from "react-router-dom";

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
    userId: 302, // Example userId, replace with the actual user ID as needed
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the existing medication details and populate the form
    getMedicationById(id)
      .then((data) => {
        setMedication(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching medication:", error);
      });
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
    <div>
      <h2>Update Medication</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={medication.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Dosage</label>
          <input
            type="text"
            name="dosage"
            value={medication.dosage}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Unit</label>
          <input
            type="text"
            name="unit"
            value={medication.unit}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Medication Type</label>
          <input
            type="text"
            name="medicationType"
            value={medication.medicationType}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Amount</label>
          <input
            type="text"
            name="amount"
            value={medication.amount}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Frequency Per Day</label>
          <input
            type="number"
            name="frequencyPerDay"
            value={medication.frequencyPerDay}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Times</label>
          {medication.times.map((time, index) => (
            <input
              key={index}
              type="time"
              value={time}
              onChange={(e) => handleTimeChange(index, e.target.value)}
            />
          ))}
        </div>
        <div>
          <label>Start Date</label>
          <input
            type="date"
            name="startDate"
            value={medication.startDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Duration (Days)</label>
          <input
            type="number"
            name="durationDays"
            value={medication.durationDays}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Instructions</label>
          <input
            type="text"
            name="instructions"
            value={medication.instructions}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Update Medication</button>
      </form>
    </div>
  );
};

export default UpdateMedication;
