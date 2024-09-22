import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/servicePage/MlModels.css";
import { getUserInfo, getUserData } from "../service/user-service";

const DiabetesPrediction = () => {
  const [formData, setFormData] = useState({
    Pregnancies: null,
    Glucose: null,
    BloodPressure: null,
    SkinThickness: null,
    Insulin: null,
    BMI: null,
    DiabetesPedigreeFunction: null,
    Age: null,
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
            Age: userInfo.age !== undefined ? userInfo.age : null,
            BMI: userInfo.bmi !== undefined ? userInfo.bmi : null,
            // Add more fields as necessary based on userInfo
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
        <label>
          Pregnancies:
          <input
            type="number"
            name="Pregnancies"
            placeholder="Number of pregnancies"
            onChange={handleChange}
            value={formData.Pregnancies ?? ""}
          />
        </label>
        <label>
          Glucose:
          <input
            type="number"
            name="Glucose"
            placeholder="Glucose level (mg/dL)"
            onChange={handleChange}
            value={formData.Glucose ?? ""}
          />
        </label>
        <label>
          Blood Pressure:
          <input
            type="number"
            name="BloodPressure"
            placeholder="Blood pressure (mmHg)"
            onChange={handleChange}
            value={formData.BloodPressure ?? ""}
          />
        </label>
        <label>
          Skin Thickness:
          <input
            type="number"
            name="SkinThickness"
            placeholder="Skin thickness (mm)"
            onChange={handleChange}
            value={formData.SkinThickness ?? ""}
          />
        </label>
        <label>
          Insulin:
          <input
            type="number"
            name="Insulin"
            placeholder="Insulin level (μU/mL)"
            onChange={handleChange}
            value={formData.Insulin ?? ""}
          />
        </label>
        <label>
          BMI:
          <input
            type="number"
            name="BMI"
            placeholder="Body Mass Index (kg/m²)"
            step="0.1"
            onChange={handleChange}
            value={formData.BMI ?? ""}
          />
        </label>
        <label>
          Diabetes Pedigree Function:
          <input
            type="number"
            name="DiabetesPedigreeFunction"
            placeholder="Diabetes pedigree function (0.0 - 2.5)"
            step="0.01"
            onChange={handleChange}
            value={formData.DiabetesPedigreeFunction ?? ""}
          />
        </label>
        <label>
          Age:
          <input
            type="number"
            name="Age"
            placeholder="Age (years)"
            onChange={handleChange}
            value={formData.Age ?? ""}
          />
        </label>
        <button type="submit">Predict</button>
      </form>
      {prediction && (
        <div className="prediction-result">
          <h3>Your Prediction Result:</h3>
          <p className="prediction-text">{prediction}</p>
        </div>
      )}
    </div>
  );
};

export default DiabetesPrediction;
