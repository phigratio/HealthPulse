import React, { useState } from "react";
import axios from "axios";
import "../style/servicePage/PetHealthCare.css";
import { geminiKey } from "./apiKeys";
// Import your Lottie component here
import BooksL from "../components/LottieComponents/Books";
import QuizL from "../components/LottieComponents/Quiz";

const PetHealthcare = () => {
  const apiKeyGemini = geminiKey; // Use your API Key here
  const [foodSuggestions, setFoodSuggestions] = useState([]);
  const [symptomAnalysis, setSymptomAnalysis] = useState("");
  const [exerciseRecommendations, setExerciseRecommendations] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateFromGemini = async (text) => {
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKeyGemini}`,
        {
          contents: [
            {
              parts: [
                {
                  text: text,
                },
              ],
            },
          ],
        }
      );
      return response.data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error("Error generating from Gemini:", error);
      setError("Error generating content");
    }
  };

  const handleFoodSubmit = async (e) => {
    e.preventDefault();
    if (!prompt) return;
    setIsLoading(true);
    setError(null);
    const foodPrompt = `Suggest healthy food options for a pet based on this input: ${prompt}`;
    const foodSuggestionsResponse = await generateFromGemini(foodPrompt);
    setFoodSuggestions([foodSuggestionsResponse]);
    setIsLoading(false);
  };

  const handleSymptomSubmit = async (e) => {
    e.preventDefault();
    if (!prompt) return;
    setIsLoading(true);
    setError(null);
    const symptomPrompt = `Analyze these symptoms for a pet and suggest possible issues and remedies: ${prompt}`;
    const symptomAnalysisResponse = await generateFromGemini(symptomPrompt);
    setSymptomAnalysis(symptomAnalysisResponse);
    setIsLoading(false);
  };

  const handleExerciseSubmit = async (e) => {
    e.preventDefault();
    if (!prompt) return;
    setIsLoading(true);
    setError(null);
    const exercisePrompt = `Recommend exercise routines and activities for a pet based on this input: ${prompt}`;
    const exerciseRecommendationsResponse = await generateFromGemini(
      exercisePrompt
    );
    setExerciseRecommendations(exerciseRecommendationsResponse);
    setIsLoading(false);
  };

  const handleImageGeneration = async () => {
    if (!prompt) return;
    setIsLoading(true);
    setError(null);
    try {
      const modifiedPrompt = `a calming image for a pet with the following situation: ${prompt}`;
      const imageResponse = await axios.post(
        "http://localhost:8095/generate-image",
        { prompt: modifiedPrompt },
        { responseType: "blob" }
      );
      if (imageResponse.status === 200) {
        const imageBlob = new Blob([imageResponse.data], { type: "image/png" });
        const imageUrl = URL.createObjectURL(imageBlob);
        setImageUrl(imageUrl);
      } else {
        setError("Error generating image");
      }
    } catch (error) {
      console.error("Error generating image:", error);
      setError("Error generating content");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pet-healthcare-container">
      <div className="left-column">
        <QuizL /> {/* Left-side Lottie animation */}
      </div>

      <div className="middle-column">
        <h2 className="title">AI-Powered Pet Healthcare</h2>

        <form className="prompt-form">
          <label htmlFor="promptInput">
            Describe your pet's symptoms, food needs, or exercise routine:
          </label>
          <input
            type="text"
            id="promptInput"
            placeholder="e.g., My dog is limping, high-protein food for my puppy"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="input-field"
          />
          <div className="button-group">
            <button
              type="button"
              className="submit-button"
              onClick={handleFoodSubmit}
            >
              Food Suggestions
            </button>
            <button
              type="button"
              className="submit-button"
              onClick={handleSymptomSubmit}
            >
              Symptom Recognition
            </button>
            <button
              type="button"
              className="submit-button"
              onClick={handleExerciseSubmit}
            >
              Exercise Recommendations
            </button>
            <button
              type="button"
              className="submit-button"
              onClick={handleImageGeneration}
            >
              Generate Calming Image
            </button>
          </div>
        </form>

        {isLoading && <div className="loading">Loading...</div>}
        {error && <div className="error">{error}</div>}

        {foodSuggestions.length > 0 && (
          <div className="suggestions-container">
            <h4>Food Suggestions:</h4>
            <ul>
              {foodSuggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          </div>
        )}

        {symptomAnalysis && (
          <div className="analysis-container">
            <h4>Symptom Recognition Result:</h4>
            <p>{symptomAnalysis}</p>
          </div>
        )}

        {exerciseRecommendations && (
          <div className="recommendations-container">
            <h4>Exercise Recommendations:</h4>
            <p>{exerciseRecommendations}</p>
          </div>
        )}

        {imageUrl && (
          <div className="image-container">
            <h4>Generated Calming Pet Image:</h4>
            <img src={imageUrl} alt="Generated" className="generated-image" />
          </div>
        )}
      </div>

      <div className="right-column">
        <BooksL /> {/* Right-side Lottie animation */}
      </div>
    </div>
  );
};

export default PetHealthcare;
