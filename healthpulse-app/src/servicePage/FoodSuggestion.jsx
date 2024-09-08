// import React, { useState } from "react";
// import axios from "axios";
// import "../style/servicePage/FoodSuggestion.css";
// import Background from "../components/basicComponents/Background";
// import Base from "../components/Base";
// import FoodL from "../components/LottieComponents/Food";
// import DoctorL from "../components/LottieComponents/Doctor";
// import { geminiKey } from "./apiKeys";

// const apiKeyGemini = geminiKey;

// const FoodSuggestion = () => {
//   const [selectedPreferences, setSelectedPreferences] = useState([]);
//   const [customPreference, setCustomPreference] = useState("");
//   const [disease, setDisease] = useState("");
//   const [suggestion, setSuggestion] = useState("");

//   const foodPreferences = [
//     "Spicy",
//     "Sweet",
//     "Sour",
//     "Savory",
//     "Bitter",
//     "Umami",
//   ];

//   const handlePreferenceClick = (preference) => {
//     if (selectedPreferences.includes(preference)) {
//       setSelectedPreferences(
//         selectedPreferences.filter((p) => p !== preference)
//       );
//     } else {
//       setSelectedPreferences([...selectedPreferences, preference]);
//     }
//   };

//   const handleCustomPreferenceAdd = () => {
//     if (customPreference && !selectedPreferences.includes(customPreference)) {
//       setSelectedPreferences([...selectedPreferences, customPreference]);
//       setCustomPreference("");
//     }
//   };

//   const generateSuggestion = async () => {
//     const prompt = `Suggest a food suggestion that is good for health, suitable for someone with ${disease}, and is around 2000 calories. Give a calorie breakdown alongside the food. Consider the following preferences: ${selectedPreferences.join(
//       ", "
//     )}.`;

//     try {
//       // Note: This should be handled server-side in a real application
//       const response = await axios.post(
//         `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKeyGemini}`,
//         {
//           contents: [
//             {
//               parts: [
//                 {
//                   text: prompt,
//                 },
//               ],
//             },
//           ],
//         }
//       );
//       setSuggestion(response.data.candidates[0].content.parts[0].text);
//     } catch (error) {
//       console.error("Error generating suggestion:", error);
//       setSuggestion("An error occurred while generating the food suggestion.");
//     }
//   };

//   return (
//     <div>
//       <Background />
//       <Base>
//         <div className="food-suggestion-container">
//           <div className="lottie-container">
//             <FoodL />
//           </div>
//           <div className="food-suggestion-content">
//             <h2>Select Food Preferences</h2>
//             <div className="preferences-grid">
//               {foodPreferences.map((preference) => (
//                 <button
//                   key={preference}
//                   className={`preference-button ${
//                     selectedPreferences.includes(preference) ? "selected" : ""
//                   }`}
//                   onClick={() => handlePreferenceClick(preference)}
//                 >
//                   {preference}
//                 </button>
//               ))}
//             </div>
//             <div className="custom-preference">
//               <input
//                 type="text"
//                 value={customPreference}
//                 onChange={(e) => setCustomPreference(e.target.value)}
//                 placeholder="Add custom preference"
//               />
//               <button onClick={handleCustomPreferenceAdd}>Add</button>
//             </div>
//             <div className="disease-input">
//               <input
//                 type="text"
//                 value={disease}
//                 onChange={(e) => setDisease(e.target.value)}
//                 placeholder="Enter your disease (optional)"
//               />
//             </div>
//             <button className="generate-button" onClick={generateSuggestion}>
//               Generate Food Suggestion
//             </button>
//             {suggestion && (
//               <div className="suggestion">
//                 <h3>Suggested Dish:</h3>
//                 <p>{suggestion}</p>
//               </div>
//             )}
//           </div>
//           <div className="lottie-container">
//             <DoctorL />
//           </div>
//         </div>
//       </Base>
//     </div>
//   );
// };

// export default FoodSuggestion;

import React, { useState, useEffect } from "react";
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
    const prompt = `Please provide the answer in a single paragraph and contain atleast 300 words with a explanation if possible why this food.Suggest a food suggestion that is good for health, suitable for someone with ${disease}, and is around 2000 calories. Give a calorie breakdown alongside the food. Consider the following preferences: ${selectedPreferences.join(
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
    } catch (error) {
      console.error("Error generating suggestion:", error);
      setSuggestion("An error occurred while generating the food suggestion.");
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
          <div className="lottie-container">
            <FoodL />
          </div>
          <div className="food-suggestion-content">
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
              <SpeechToTextApp onTranscriptUpdate={handleCustomUpdate} />
            </div>
            <div className="disease-input">
              <input
                type="text"
                value={disease}
                onChange={(e) => setDisease(e.target.value)}
                placeholder="Enter your disease (optional)"
              />
              <SpeechToTextApp onTranscriptUpdate={handleTranscriptUpdate} />
            </div>

            <button className="generate-button" onClick={generateSuggestion}>
              Generate Food Suggestion
            </button>
            {suggestion && (
              <div className="suggestion">
                <h3>Suggested Dish:</h3>
                <p>{suggestion}</p>
                <TextToSpeechButton text={suggestion} />
              </div>
            )}
          </div>
          <div className="lottie-container">
            <DoctorL />
          </div>
        </div>
      </Base>
    </div>
  );
};

export default FoodSuggestion;
