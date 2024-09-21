import React, { useState } from "react";
import axios from "axios";
import "../style/servicePage/PetHealthCare.css";
import { geminiKey } from "./apiKeys";
import BooksL from "../components/LottieComponents/Books";
import QuizL from "../components/LottieComponents/Quiz";
import SpeechToTextApp from "./SpeechToTextButton"; // Import speech-to-text
import TextToSpeechButton from "./TextToSpeechButton"; // Import text-to-speech

const PetHealthcare = () => {
  const apiKeyGemini = geminiKey;
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
          contents: [{ parts: [{ text }] }],
        }
      );
      return response.data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error("Error generating from Gemini:", error);
      setError("Error generating content");
    }
  };

  const handleSubmit = async (type) => {
    if (!prompt) return;
    setIsLoading(true);
    setError(null);

    let queryPrompt = "";
    switch (type) {
      case "food":
        queryPrompt = `Answer in one paragraph.Suggest healthy food options for a pet based on this input: ${prompt}`;
        const foodResponse = await generateFromGemini(queryPrompt);
        setFoodSuggestions([foodResponse]);
        break;
      case "symptom":
        queryPrompt = `Answer in one paragraph.Analyze these symptoms for a pet and suggest possible issues and remedies: ${prompt}`;
        const symptomResponse = await generateFromGemini(queryPrompt);
        setSymptomAnalysis(symptomResponse);
        break;
      case "exercise":
        queryPrompt = `Answer in one paragraph.Recommend exercise routines and activities for a pet based on this input: ${prompt}`;
        const exerciseResponse = await generateFromGemini(queryPrompt);
        setExerciseRecommendations(exerciseResponse);
        break;
      default:
        break;
    }
    setIsLoading(false);
  };

  const handleImageGeneration = async () => {
    if (!prompt) return;
    setIsLoading(true);
    setError(null);
    try {
      const modifiedPrompt = `a calming image for a pet with the following situation: ${prompt}`;
      const imageResponse = await axios.post(
        "http://localhost:5555/generate-image",
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

  const handleTranscriptUpdate = (transcript) => {
    setPrompt(transcript);
  };

  return (
    <div className="pet-healthcare-container">
      <div className="pet-left-column">
        <QuizL /> {/* Left-side Lottie animation */}
      </div>

      <div className="pet-middle-column">
        <h2 className="pet-title">AI-Powered Pet Healthcare</h2>

        <form className="pet-prompt-form">
          <label htmlFor="promptInput">
            Describe your pet's symptoms, food needs, or exercise routine:
          </label>
          <div className="pet-buttons">
            <input
              type="text"
              id="promptInput"
              placeholder="e.g., My dog is limping, high-protein food for my puppy"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="pet-input-field"
            />{" "}
            <SpeechToTextApp onTranscriptUpdate={handleTranscriptUpdate} />/
          </div>
          <div className="pet-button-group">
            <button
              type="button"
              className="pet-submit-button"
              onClick={() => handleSubmit("food")}
            >
              Food Suggestions
            </button>
            <button
              type="button"
              className="pet-submit-button"
              onClick={() => handleSubmit("symptom")}
            >
              Symptom Recognition
            </button>
            <button
              type="button"
              className="pet-submit-button"
              onClick={() => handleSubmit("exercise")}
            >
              Exercise Recommendations
            </button>
            <button
              type="button"
              className="pet-submit-button"
              onClick={handleImageGeneration}
            >
              Generate Calming Image
            </button>
          </div>
        </form>

        {isLoading && <div className="pet-loading">Loading...</div>}
        {error && <div className="pet-error">{error}</div>}

        {foodSuggestions.length > 0 && (
          <div className="pet-suggestions-container">
            <h4>Food Suggestions:</h4>
            <ul>
              {foodSuggestions.map((suggestion, index) => (
                <li key={index}>
                  {suggestion}
                  <TextToSpeechButton text={suggestion} />
                </li>
              ))}
            </ul>
          </div>
        )}

        {symptomAnalysis && (
          <div className="pet-analysis-container">
            <h4>Symptom Recognition Result:</h4>
            <p>
              {symptomAnalysis} <TextToSpeechButton text={symptomAnalysis} />
            </p>
          </div>
        )}

        {exerciseRecommendations && (
          <div className="pet-recommendations-container">
            <h4>Exercise Recommendations:</h4>
            <p>
              {exerciseRecommendations}{" "}
              <TextToSpeechButton text={exerciseRecommendations} />
            </p>
          </div>
        )}

        {imageUrl && (
          <div className="pet-image-container">
            <h4>Generated Calming Pet Image:</h4>
            <img
              src={imageUrl}
              alt="Generated"
              className="pet-generated-image"
            />
          </div>
        )}
      </div>

      <div className="pet-right-column">
        <BooksL /> {/* Right-side Lottie animation */}
      </div>
    </div>
  );
};

export default PetHealthcare;
