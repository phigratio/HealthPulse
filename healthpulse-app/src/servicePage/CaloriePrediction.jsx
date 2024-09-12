import React, { useState } from "react";
import axios from "axios";
import "../style/servicePage/MlModels.css";
const CaloriePrediction = () => {
  const [formData, setFormData] = useState({
    gender: "",
    age: 0,
    height: 0,
    weight: 0,
    duration: 0,
    heart_rate: 0,
    body_temp: 0.0,
  });
  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGenderChange = (e) => {
    // Convert "male" to 1 and "female" to 0
    const genderValue = e.target.value === "male" ? 1 : 0;
    setFormData({
      ...formData,
      gender: genderValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/calorie_prediction",
        formData
      );
      setPrediction(response.data["Predicted calories burned"]);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="api-container">
      <h2>Calorie Prediction</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="gender">Gender:</label>
        <select name="gender" onChange={handleGenderChange}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <input
          type="number"
          name="age"
          placeholder="Age"
          onChange={handleChange}
        />
        <input
          type="number"
          name="height"
          placeholder="Height"
          onChange={handleChange}
        />
        <input
          type="number"
          name="weight"
          placeholder="Weight"
          onChange={handleChange}
        />
        <input
          type="number"
          name="duration"
          placeholder="Duration"
          onChange={handleChange}
        />
        <input
          type="number"
          name="heart_rate"
          placeholder="Heart Rate"
          onChange={handleChange}
        />
        <input
          type="number"
          name="body_temp"
          placeholder="Body Temperature"
          step="0.1"
          onChange={handleChange}
        />
        <button type="submit">Predict</button>
      </form>
      {prediction && <p>Calories Burned: {prediction}</p>}
    </div>
  );
};

export default CaloriePrediction;
