import React, { useState } from "react";
import axios from "axios";
import "../style/servicePage/MlModels.css";
const DiabetesPrediction = () => {
  const [formData, setFormData] = useState({
    Pregnancies: 0,
    Glucose: 0,
    BloodPressure: 0,
    SkinThickness: 0,
    Insulin: 0,
    BMI: 0.0,
    DiabetesPedigreeFunction: 0.0,
    Age: 0,
  });
  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/diabetes_prediction",
        formData
      );
      setPrediction(response.data);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="api-container">
      <h2>Diabetes Prediction</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="Pregnancies"
          placeholder="Pregnancies"
          onChange={handleChange}
        />
        <input
          type="number"
          name="Glucose"
          placeholder="Glucose"
          onChange={handleChange}
        />
        <input
          type="number"
          name="BloodPressure"
          placeholder="Blood Pressure"
          onChange={handleChange}
        />
        <input
          type="number"
          name="SkinThickness"
          placeholder="Skin Thickness"
          onChange={handleChange}
        />
        <input
          type="number"
          name="Insulin"
          placeholder="Insulin"
          onChange={handleChange}
        />
        <input
          type="number"
          name="BMI"
          placeholder="BMI"
          step="0.1"
          onChange={handleChange}
        />
        <input
          type="number"
          name="DiabetesPedigreeFunction"
          placeholder="Diabetes Pedigree Function"
          step="0.01"
          onChange={handleChange}
        />
        <input
          type="number"
          name="Age"
          placeholder="Age"
          onChange={handleChange}
        />
        <button type="submit">Predict</button>
      </form>
      {prediction && <p>Prediction: {prediction}</p>}
    </div>
  );
};

export default DiabetesPrediction;
