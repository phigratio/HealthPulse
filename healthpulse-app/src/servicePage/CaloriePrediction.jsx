import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/servicePage/MlModels.css";
import { getUserInfo, getUserData } from "../service/user-service";

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

  // Fetch user data and set default values
  useEffect(() => {
    const user = getUserData();
    if (user && user.id) {
      getUserInfo(user.id)
        .then((userInfo) => {
          setFormData((prevFormData) => ({
            ...prevFormData,
            age: userInfo.age !== undefined ? userInfo.age : 0,
            height: userInfo.height !== undefined ? userInfo.height : 0,
            weight: userInfo.weight !== undefined ? userInfo.weight : 0,
          }));
        })
        .catch((err) => {
          console.error("Error fetching user info:", err);
        });
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGenderChange = (e) => {
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
        <select name="gender" onChange={handleGenderChange} required>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <label htmlFor="age">Age:</label>
        <input
          type="number"
          name="age"
          placeholder="Enter your age in years"
          value={formData.age}
          onChange={handleChange}
          required
        />

        <label htmlFor="height">Height:</label>
        <input
          type="number"
          name="height"
          placeholder="Enter your height in cm"
          value={formData.height}
          onChange={handleChange}
          required
        />

        <label htmlFor="weight">Weight:</label>
        <input
          type="number"
          name="weight"
          placeholder="Enter your weight in kg"
          value={formData.weight}
          onChange={handleChange}
          required
        />

        <label htmlFor="duration">Activity Duration:</label>
        <input
          type="number"
          name="duration"
          placeholder="Enter duration of activity in minutes"
          onChange={handleChange}
          required
        />

        <label htmlFor="heart_rate">Heart Rate:</label>
        <input
          type="number"
          name="heart_rate"
          placeholder="Enter your heart rate"
          onChange={handleChange}
          required
        />

        <label htmlFor="body_temp">Body Temperature:</label>
        <input
          type="number"
          name="body_temp"
          placeholder="Enter your body temperature in °C"
          step="0.1"
          onChange={handleChange}
          required
        />

        <button type="submit">Predict</button>
      </form>
      {prediction && (
        <div className="prediction-result">
          <h3>Calories Burned: </h3>
          <p className="prediction-text">{prediction}</p>
        </div>
      )}
    </div>
  );
};

export default CaloriePrediction;
