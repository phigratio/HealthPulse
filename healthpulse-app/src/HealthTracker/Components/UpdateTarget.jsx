import React, { useState, useEffect } from "react";
import { getCurrentUserDetail } from "../../auth";
import {
  getTrackerTarget,
  createTrackerTarget,
} from "../Service/HealthTrackerService";
import { toast } from "react-toastify"; // Import toastify for notifications
import "../Styles/UpdateTarget.css"; // Import the CSS file

const UpdateTarget = () => {
  const [targetData, setTargetData] = useState(null);
  const [formData, setFormData] = useState({
    steps: "",
    weight: "",
    waterIntake: "",
    caloriesIntake: "",
    caloriesBurned: "",
    sleepHours: "",
    screenTime: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const user = getCurrentUserDetail();
      if (user) {
        try {
          const data = await getTrackerTarget(user.id);
          if (data) {
            setTargetData(data);
            setFormData({
              steps: data.steps,
              weight: data.weight,
              waterIntake: data.waterIntake,
              caloriesIntake: data.caloriesIntake,
              caloriesBurned: data.caloriesBurned,
              sleepHours: data.sleepHours,
              screenTime: data.screenTime,
            });
          }
        } catch (error) {
          toast.error("No existing target data found.");
          console.error("Error fetching tracker target:", error);
        }
      }
    };

    fetchData();
  }, []);

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
        await createTrackerTarget({
          ...formData,
          userId: user.id,
        });
        toast.success("Target data updated successfully!");
      } catch (error) {
        toast.error("Error updating target data.");
        console.error("Error creating or updating tracker target:", error);
      }
    }
  };

  return (
    <div className="target-container">
      <h1 className="target-title text-center">Update Target Data</h1>
      <form className="target-form" onSubmit={handleSubmit}>
        <label className="target-label">
          Steps:
          <input
            type="number"
            name="steps"
            value={formData.steps}
            onChange={handleChange}
            className="target-input"
          />
        </label>
        <label className="target-label">
          Weight:
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className="target-input"
          />
        </label>
        <label className="target-label">
          Water Intake:
          <input
            type="number"
            name="waterIntake"
            value={formData.waterIntake}
            onChange={handleChange}
            className="target-input"
          />
        </label>
        <label className="target-label">
          Calories Intake:
          <input
            type="number"
            name="caloriesIntake"
            value={formData.caloriesIntake}
            onChange={handleChange}
            className="target-input"
          />
        </label>
        <label className="target-label">
          Calories Burned:
          <input
            type="number"
            name="caloriesBurned"
            value={formData.caloriesBurned}
            onChange={handleChange}
            className="target-input"
          />
        </label>
        <label className="target-label">
          Sleep Hours:
          <input
            type="number"
            name="sleepHours"
            value={formData.sleepHours}
            onChange={handleChange}
            className="target-input"
          />
        </label>
        <label className="target-label">
          Screen Time:
          <input
            type="number"
            name="screenTime"
            value={formData.screenTime}
            onChange={handleChange}
            className="target-input"
          />
        </label>
        <button type="submit" className="target-button">
          Update Target
        </button>
      </form>
    </div>
  );
};

export default UpdateTarget;
