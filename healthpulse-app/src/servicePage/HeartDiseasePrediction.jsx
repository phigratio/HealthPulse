import React, { useState } from "react";
import axios from "axios";
import "../style/servicePage/MlModels.css";

const HeartDiseasePrediction = () => {
  const [formData, setFormData] = useState({
    age: 0,
    sex: 0,
    cp: 0,
    trestbps: 0,
    chol: 0,
    fbs: 0,
    restecg: 0,
    thalach: 0,
    exang: 0,
    oldpeak: 0.0,
    slope: 0,
    ca: 0,
    thal: 0,
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
        "http://127.0.0.1:8000/heart_disease_prediction",
        formData
      );
      setPrediction(response.data);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="api-container">
      <h2>Heart Disease Prediction</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="age"
          placeholder="Age"
          onChange={handleChange}
        />
        <input
          type="number"
          name="sex"
          placeholder="Sex"
          onChange={handleChange}
        />
        <input
          type="number"
          name="cp"
          placeholder="Chest Pain Type"
          onChange={handleChange}
        />
        <input
          type="number"
          name="trestbps"
          placeholder="Resting Blood Pressure"
          onChange={handleChange}
        />
        <input
          type="number"
          name="chol"
          placeholder="Cholesterol"
          onChange={handleChange}
        />
        <input
          type="number"
          name="fbs"
          placeholder="Fasting Blood Sugar"
          onChange={handleChange}
        />
        <input
          type="number"
          name="restecg"
          placeholder="Rest ECG"
          onChange={handleChange}
        />
        <input
          type="number"
          name="thalach"
          placeholder="Max Heart Rate Achieved"
          onChange={handleChange}
        />
        <input
          type="number"
          name="exang"
          placeholder="Exercise Induced Angina"
          onChange={handleChange}
        />
        <input
          type="number"
          name="oldpeak"
          placeholder="Oldpeak"
          step="0.1"
          onChange={handleChange}
        />
        <input
          type="number"
          name="slope"
          placeholder="Slope"
          onChange={handleChange}
        />
        <input
          type="number"
          name="ca"
          placeholder="CA"
          onChange={handleChange}
        />
        <input
          type="number"
          name="thal"
          placeholder="Thal"
          onChange={handleChange}
        />
        <button type="submit">Predict</button>
      </form>
      {prediction && <p>Prediction: {prediction}</p>}
    </div>
  );
};

export default HeartDiseasePrediction;
