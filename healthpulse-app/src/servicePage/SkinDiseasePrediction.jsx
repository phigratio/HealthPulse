import React, { useState } from "react";
import axios from "axios";
import "../style/servicePage/MlModels.css";

const SkinDiseasePrediction = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null); // State for image preview
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  // Handle file change and set preview
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Generate a preview of the selected image
    if (selectedFile) {
      const previewUrl = URL.createObjectURL(selectedFile);
      setPreview(previewUrl);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please upload an image before submitting.");
      return;
    }

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
        <label htmlFor="file-upload" className="file-label  ">
          Choose an image to upload:
        </label>
        <input
          type="file"
          id="file-upload"
          accept="image/*"
          onChange={handleFileChange}
          className="file-input"
        />

        {preview && (
          <div className="image-preview-container">
            <h4>Preview:</h4>
            <img
              src={preview}
              alt="Selected file preview"
              className="image-preview"
            />
          </div>
        )}

        <button type="submit" className="submit-button">
          Predict
        </button>
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
