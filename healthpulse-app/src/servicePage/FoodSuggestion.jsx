import React, { useState } from "react";
import axios from "axios";
import "../style/servicePage/FoodSuggestion.css";
import "../style/servicePage/RecordingButtons.css";
import Background from "../components/basicComponents/Background";
import Base from "../components/Base";
import FoodL from "../components/LottieComponents/Food";
import DoctorL from "../components/LottieComponents/Doctor";
import { geminiKey } from "./apiKeys";
import SpeechToTextApp from "./SpeechToTextButton";
import TextToSpeechButton from "./TextToSpeechButton";

const apiKeyGemini = geminiKey;

const FoodSuggestion = () => {
  const [selectedPreferences, setSelectedPreferences] = useState([]);
  const [customPreference, setCustomPreference] = useState("");
  const [disease, setDisease] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const foodPreferences = [
    "Spicy",
    "Sweet",
    "Sour",
    "Savory",
    "Bitter",
    "Umami",
  ];

  const handlePreferenceClick = (preference) => {
    if (selectedPreferences.includes(preference)) {
      setSelectedPreferences(
        selectedPreferences.filter((p) => p !== preference)
      );
    } else {
      setSelectedPreferences([...selectedPreferences, preference]);
    }
  };

  const handleCustomPreferenceAdd = () => {
    if (customPreference && !selectedPreferences.includes(customPreference)) {
      setSelectedPreferences([...selectedPreferences, customPreference]);
      setCustomPreference("");
    }
  };

  const generateSuggestion = async () => {
    const prompt = `Please provide the answer in a single paragraph and contain at least 300 words with an explanation if possible why this food. Suggest a food suggestion that is good for health, suitable for someone with ${disease}, and is around 2000 calories. Give a calorie breakdown alongside the food. Consider the following preferences: ${selectedPreferences.join(
      ", "
    )}.`;

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKeyGemini}`,
        {
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }
      );
      setSuggestion(response.data.candidates[0].content.parts[0].text);
      generateImage(response.data.candidates[0].content.parts[0].text);
    } catch (error) {
      console.error("Error generating suggestion:", error);
      setSuggestion("An error occurred while generating the food suggestion.");
    }
  };

  const generateImage = async (modifiedPrompt) => {
    setIsLoading(true);
    try {
      const imageResponse = await axios.post(
        "http://localhost:5555/generate-image",
        { prompt: `Generate an image of the dish: ${modifiedPrompt}` },
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
      console.error("Error:", error);
      setError("Error generating content");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTranscriptUpdate = (transcript) => {
    setDisease(transcript);
  };

  const handleCustomUpdate = (transcript) => {
    setCustomPreference(transcript);
  };

  return (
    <div>
      <Background />
      <Base>
        <div className="food-suggestion-container">
          <div className="food-lottie-container">
            <FoodL />
          </div>
          <div className="food-suggestion-content">
            <h2>Select Food Preferences</h2>
            <div className="food-preferences-grid">
              {foodPreferences.map((preference) => (
                <button
                  key={preference}
                  className={`food-preference-button ${
                    selectedPreferences.includes(preference) ? "selected" : ""
                  }`}
                  onClick={() => handlePreferenceClick(preference)}
                >
                  {preference}
                </button>
              ))}
            </div>
            <div className="food-custom-preference">
              <input
                type="text"
                value={customPreference}
                onChange={(e) => setCustomPreference(e.target.value)}
                placeholder="Add custom preference"
              />
              <button onClick={handleCustomPreferenceAdd}>Add</button>
              <SpeechToTextApp onTranscriptUpdate={handleCustomUpdate} />
            </div>
            <div className="food-disease-input">
              <input
                type="text"
                value={disease}
                onChange={(e) => setDisease(e.target.value)}
                placeholder="Enter your disease (optional)"
              />
              <SpeechToTextApp onTranscriptUpdate={handleTranscriptUpdate} />
            </div>

            <button
              className="food-generate-button"
              onClick={generateSuggestion}
            >
              Generate Food Suggestion
            </button>
            {suggestion && (
              <div className="food-suggestion">
                <h3>Suggested Dish:</h3>
                <p>{suggestion}</p>
                <TextToSpeechButton text={suggestion} />
              </div>
            )}
            {imageUrl && (
              <div className="food-image-preview">
                <h3>Image of Suggested Dish:</h3>
                <img src={imageUrl} alt="Generated Food" />
              </div>
            )}
            {error && <p className="food-error-message">{error}</p>}
            {isLoading && <p>Loading image...</p>}
          </div>
          <div className="food-lottie-container">
            <DoctorL />
          </div>
        </div>
      </Base>
    </div>
  );
};

export default FoodSuggestion;
