import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/servicePage/MlModels.css";
import { getUserInfo, getUserData } from "../service/user-service";

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

  // Fetch user age from previous data
  useEffect(() => {
    const user = getUserData();
    if (user && user.id) {
      getUserInfo(user.id)
        .then((userInfo) => {
          setFormData((prevFormData) => ({
            ...prevFormData,
            age: userInfo.age !== undefined ? userInfo.age : 0,
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
        <label htmlFor="age">Age:</label>
        <input
          type="number"
          name="age"
          placeholder="Enter your age"
          value={formData.age}
          readOnly
        />

        <label htmlFor="sex">Sex:</label>
        <select name="sex" onChange={handleChange} required>
          <option value="">Select Sex</option>
          <option value="0">Female</option>
          <option value="1">Male</option>
        </select>

        <label htmlFor="cp">Chest Pain Type:</label>
        <input
          type="number"
          name="cp"
          placeholder="Enter chest pain type (0-3)"
          onChange={handleChange}
          required
        />

        <label htmlFor="trestbps">Resting Blood Pressure:</label>
        <input
          type="number"
          name="trestbps"
          placeholder="Enter resting blood pressure"
          onChange={handleChange}
          required
        />

        <label htmlFor="chol">Cholesterol:</label>
        <input
          type="number"
          name="chol"
          placeholder="Enter cholesterol level"
          onChange={handleChange}
          required
        />

        <label htmlFor="fbs">Fasting Blood Sugar:</label>
        <input
          type="number"
          name="fbs"
          placeholder="Enter fasting blood sugar mmol/L"
          onChange={handleChange}
          required
        />

        <label htmlFor="restecg">Rest ECG:</label>
        <input
          type="number"
          name="restecg"
          placeholder="Enter resting ECG result (0-2)"
          onChange={handleChange}
          required
        />

        <label htmlFor="thalach">Max Heart Rate Achieved:</label>
        <input
          type="number"
          name="thalach"
          placeholder="Enter max heart rate"
          onChange={handleChange}
          required
        />

        <label htmlFor="exang">Exercise Induced Angina:</label>
        <select name="exang" onChange={handleChange} required>
          <option value="">Select Option</option>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>

        <label htmlFor="oldpeak">Oldpeak:</label>
        <input
          type="number"
          name="oldpeak"
          placeholder="Enter oldpeak"
          step="0.1"
          onChange={handleChange}
          required
        />

        <label htmlFor="slope">Slope:</label>
        <input
          type="number"
          name="slope"
          placeholder="Enter slope value (0-2)"
          onChange={handleChange}
          required
        />

        <label htmlFor="ca">CA:</label>
        <input
          type="number"
          name="ca"
          placeholder="Enter number of major vessels (0-3)"
          onChange={handleChange}
          required
        />

        <label htmlFor="thal">Thal:</label>
        <input
          type="number"
          name="thal"
          placeholder="Enter thalassemia (1-3)"
          onChange={handleChange}
          required
        />

        <button type="submit">Predict</button>
      </form>
      {prediction && (
        <div className="prediction-result">
          <h3>Prediction Result:</h3>
          <p className="prediction-text">{prediction}</p>
        </div>
      )}
    </div>
  );
};

export default HeartDiseasePrediction;
