import React, { useState, useEffect } from "react";
import { getCurrentUserDetail } from "../../auth";
import {
  loadTrackerDataByUserIdAndDate,
  updateTrackerData,
} from "../Service/HealthTrackerService";
import "../Styles/UpdateTrackerData.css"; // Import the CSS file
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import default styles

const UpdateTrackerData = () => {
  const [trackerData, setTrackerData] = useState(null);
  const [formData, setFormData] = useState({
    steps: "",
    weight: "",
    waterIntake: "",
    caloriesIntake: "",
    caloriesBurned: "",
    sleepHours: "",
    screenTime: "",
  });
  const [date, setDate] = useState(""); // Assuming you will set the date or provide a way to select it

  useEffect(() => {
    const fetchData = async () => {
      const user = getCurrentUserDetail();
      if (user) {
        try {
          const data = await loadTrackerDataByUserIdAndDate(user.id, date);
          if (data.length > 0) {
            setTrackerData(data[0]); // Assuming you get a list and take the first one
            setFormData({
              steps: data[0].steps,
              weight: data[0].weight,
              waterIntake: data[0].waterIntake,
              caloriesIntake: data[0].caloriesIntake,
              caloriesBurned: data[0].caloriesBurned,
              sleepHours: data[0].sleepHours,
              screenTime: data[0].screenTime,
            });
          }
        } catch (error) {
          console.error("Error fetching tracker data:", error);
          toast.error("Error fetching tracker data."); // Show error message with toast
        }
      }
    };

    fetchData();
  }, [date]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = getCurrentUserDetail();
    if (user) {
      try {
        await updateTrackerData({
          ...formData,
          userId: user.id,
          date,
        });
        toast.success("Tracker data updated successfully!"); // Show success message with toast
      } catch (error) {
        console.error("Error updating tracker data:", error);
        toast.error("Error updating tracker data."); // Show error message with toast
      }
    }
  };

  return (
    <div className="ht-container">
      <h1 className="ht-title">Update Tracker Data</h1>
      <form className="ht-form" onSubmit={handleSubmit}>
        <label className="ht-label">
          Steps:
          <input
            type="number"
            name="steps"
            value={formData.steps}
            onChange={handleChange}
            className="ht-input"
          />
        </label>
        <label className="ht-label">
          Weight:
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className="ht-input"
          />
        </label>
        <label className="ht-label">
          Water Intake:
          <input
            type="number"
            name="waterIntake"
            value={formData.waterIntake}
            onChange={handleChange}
            className="ht-input"
          />
        </label>
        <label className="ht-label">
          Calories Intake:
          <input
            type="number"
            name="caloriesIntake"
            value={formData.caloriesIntake}
            onChange={handleChange}
            className="ht-input"
          />
        </label>
        <label className="ht-label">
          Calories Burned:
          <input
            type="number"
            name="caloriesBurned"
            value={formData.caloriesBurned}
            onChange={handleChange}
            className="ht-input"
          />
        </label>
        <label className="ht-label">
          Sleep Hours:
          <input
            type="number"
            name="sleepHours"
            value={formData.sleepHours}
            onChange={handleChange}
            className="ht-input"
          />
        </label>
        <label className="ht-label">
          Screen Time:
          <input
            type="number"
            name="screenTime"
            value={formData.screenTime}
            onChange={handleChange}
            className="ht-input"
          />
        </label>
        <label className="ht-label">
          Date:
          <input
            type="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="ht-input"
          />
        </label>
        <button type="submit" className="ht-button">
          Update Data
        </button>
      </form>
      <ToastContainer /> {/* Display toast notifications */}
    </div>
  );
};

export default UpdateTrackerData;
