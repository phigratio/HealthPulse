import React, { useState } from "react";
import axios from "axios";
import "../style/servicePage/MlModels.css";
const SkinDiseasePrediction = () => {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/skin_disease_prediction",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setPrediction(response.data["Predicted skin disease"]);
      setError(null);
    } catch (err) {
      setError("Error predicting skin disease");
      setPrediction(null);
    }
  };

  return (
    <div className="api-container">
      <h2>Skin Disease Prediction</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Predict</button>
      </form>
      {error && <p className="error">{error}</p>}
      {prediction && (
        <div className="prediction-result">
          <h3>Prediction Result:</h3>
          <p className="prediction-text">{prediction}</p>
        </div>
      )}
    </div>
  );
};

export default SkinDiseasePrediction;
