import React, { useState } from "react";
import axios from "axios";
import "./FoodSuggestion.css";

const apiKeyGemini = "AIzaSyCSlDKg-ZCMGgC3v4TQ1D8626oawLVCPhA";

const FoodSuggestionComponent = () => {
  const [selectedPreferences, setSelectedPreferences] = useState([]);
  const [customPreference, setCustomPreference] = useState("");
  const [suggestion, setSuggestion] = useState("");

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
    const prompt = `Suggest a food suggestion that is good for health and of 2000 calories give calorie description alongside food.Generate in a paragraph but give enough spaces ${selectedPreferences.join(
      ", "
    )}.`;

    try {
      // Note: This should be handled server-side in a real application
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
    } catch (error) {
      console.error("Error generating suggestion:", error);
      setSuggestion("An error occurred while generating the food suggestion.");
    }
  };

  return (
    <div className="food-suggestion-container">
      <h2>Select Food Preferences</h2>
      <div className="preferences-grid">
        {foodPreferences.map((preference) => (
          <button
            key={preference}
            className={`preference-button ${
              selectedPreferences.includes(preference) ? "selected" : ""
            }`}
            onClick={() => handlePreferenceClick(preference)}
          >
            {preference}
          </button>
        ))}
      </div>
      <div className="custom-preference">
        <input
          type="text"
          value={customPreference}
          onChange={(e) => setCustomPreference(e.target.value)}
          placeholder="Add custom preference"
        />
        <button onClick={handleCustomPreferenceAdd}>Add</button>
      </div>
      <button className="generate-button" onClick={generateSuggestion}>
        Generate Food Suggestion
      </button>
      {suggestion && (
        <div className="suggestion">
          <h3>Suggested Dish:</h3>
          <p>{suggestion}</p>
        </div>
      )}
    </div>
  );
};

export default FoodSuggestionComponent;
