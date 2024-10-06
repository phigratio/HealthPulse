import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/servicePage/FoodSuggestion.css";
import "../style/servicePage/RecordingButtons.css";
import Background from "../components/basicComponents/Background";
import Base from "../components/Base";
import FoodL from "../components/LottieComponents/Food";
import DoctorL from "../components/LottieComponents/Doctor";
import { getCurrentUserDetail } from "../auth";
import { geminiKey, visionApi } from "./apiKeys";
import SpeechToTextApp from "./SpeechToTextButton";
import TextToSpeechButton from "./TextToSpeechButton";
import banner from "../images/banner/Food.mp4";
import { getUserInfo } from "../service/user-service";

const apiKeyGemini = geminiKey;
const apiKeyVision = visionApi;

const FoodSuggestion = () => {
  const [selectedPreferences, setSelectedPreferences] = useState([]);
  const [customPreference, setCustomPreference] = useState("");
  const [disease, setDisease] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [visionLabels, setVisionLabels] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewURL, setPreviewURL] = useState(null);
  const [foodCalorieTable, setFoodCalorieTable] = useState([]);
  const [foodReview, setFoodReview] = useState("");
  const [foodSuggestion, setFoodSuggestion] = useState("");
  const [selectedNationalities, setSelectedNationalities] = useState([]);

  // Add these new state variables
  const [userAge, setUserAge] = useState("");
  const [userCalorieNeeds, setUserCalorieNeeds] = useState("");
  const [userDiseases, setUserDiseases] = useState([]);
  const [userGender, setUserGender] = useState("");
  const [userWeight, setUserWeight] = useState("");
  // Add this useEffect for fetching user data
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userId = getCurrentUserDetail().id;
        const user = await getUserInfo(userId);

        if (user) {
          setUserAge(user.age > 0 ? user.age : "");
          setUserCalorieNeeds(
            user.calorieNeeds > 0 ? user.calorieNeeds : "2000"
          );
          setUserGender(user.gender ? user.gender : "");
          setUserWeight(user.weight > 0 ? user.weight : "");

          // Combine chronic and genetic diseases
          const diseases = [];
          if (user.chronicDisease) diseases.push(user.chronicDisease);
          if (user.geneticDisease) diseases.push(user.geneticDisease);
          if (user.allergies) diseases.push(user.allergies);
          setUserDiseases(diseases.join(", "));
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
        setError("Failed to fetch user information.");
      }
    };

    fetchUserInfo();
  }, []);

  const handleDiseaseInputChange = (e) => {
    setDisease(e.target.value); // For manual disease input
  };

  const handleCalorieInputChange = (e) => {
    setUserCalorieNeeds(e.target.value); // Manually input calorie needs
  };

  useEffect(() => {
    if (visionLabels.length > 0) {
      generateFoodSuggestion();
    }
  }, [visionLabels]);

  const generateFoodSuggestion = async () => {
    setIsGenerating(true);

    const foodLabelsString = visionLabels.join(", ");

    try {
      // Gemini API request to get calories and review for the detected food items
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKeyGemini}`,
        {
          contents: [
            {
              parts: [
                {
                  text: `The following food items were detected: ${foodLabelsString}. For each food, provide the approximate calorie content per 100 grams and a brief review about its nutritional benefits and health impacts. Write the answer in a single paragraph without asterisk.`,
                },
              ],
            },
          ],
        }
      );

      // Set the generated text from Gemini API
      const generatedText = response.data.candidates[0].content.parts[0].text;
      setFoodSuggestion(generatedText);
    } catch (error) {
      console.error("Error generating food suggestion and review:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const foodPreferences = [
    "Spicy",
    "Sweet",
    "Sour",
    "Savory",
    "Bitter",
    "Umami",
  ];

  const nationalityPreferences = [
    "Chinese",
    "Japanese",
    "Indian",
    "Bangladeshi",
    "Italian",
    "Mexican",
    "Thai",
  ];

  const handleNationalityClick = (nationality) => {
    if (selectedNationalities.includes(nationality)) {
      setSelectedNationalities(
        selectedNationalities.filter((n) => n !== nationality)
      );
    } else {
      setSelectedNationalities([...selectedNationalities, nationality]);
    }
  };

  const handlePreferenceClick = (preference) => {
    if (selectedPreferences.includes(preference)) {
      setSelectedPreferences(
        selectedPreferences.filter((p) => p !== preference)
      );
    } else {
      setSelectedPreferences([...selectedPreferences, preference]);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPreviewURL(URL.createObjectURL(file));
      analyzeFoodLabels(file); // Call the Vision API for food label detection
    } else {
      setPreviewURL(null);
      setVisionLabels([]);
    }
  };

  const analyzeFoodLabels = async (file) => {
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result.split(",")[1];

      try {
        setIsGenerating(true);

        // Google Cloud Vision API Request for LABEL_DETECTION
        const visionResponse = await axios.post(
          `https://vision.googleapis.com/v1/images:annotate?key=${apiKeyVision}`,
          {
            requests: [
              {
                image: {
                  content: base64Image,
                },
                features: [{ type: "LABEL_DETECTION", maxResults: 10 }],
              },
            ],
          }
        );

        const detectedLabels =
          visionResponse.data.responses[0]?.labelAnnotations || [];
        setVisionLabels(detectedLabels.map((label) => label.description)); // Extract detected food labels
        console.log("Detected food labels:", detectedLabels);
      } catch (error) {
        console.error("Error with Google Cloud Vision API request:", error);
      } finally {
        setIsGenerating(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCustomPreferenceAdd = () => {
    if (customPreference && !selectedPreferences.includes(customPreference)) {
      setSelectedPreferences([...selectedPreferences, customPreference]);
      setCustomPreference("");
    }
  };

  const generateSuggestion = async () => {
    // Combine user diseases with any disease entered in the input
    const allDiseases = [...userDiseases];
    if (disease && !allDiseases.includes(disease)) {
      allDiseases.push(disease);
    }
    const prompt = `Please provide the answer in a single paragraph and contain at least 300 words with an explanation if possible why this food. 
    Suggest a food suggestion for a ${userAge}-year-old ${userGender} weighing ${userWeight}kg, 
    who needs approximately ${userCalorieNeeds} calories per day. 
    ${
      allDiseases.length > 0
        ? `They have the following health conditions: ${allDiseases.join(
            ", "
          )}. `
        : ""
    }
    Consider the following taste preferences: ${selectedPreferences.join(", ")} 
    and cuisine preferences: ${selectedNationalities.join(", ")}. 
    Give a calorie breakdown alongside the food suggestions.`;

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
        "http://localhost:8095/generate-image",
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
        <div className="video-container">
          <video src={banner} autoPlay loop muted></video>
        </div>
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
            {/* Nationality Preferences Section */}
            <h2>Choose Your Favorite Cuisine</h2>
            <div className="food-nation-grid">
              {nationalityPreferences.map((nationality) => (
                <button
                  key={nationality}
                  className={`food-nation-button ${
                    selectedNationalities.includes(nationality)
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => handleNationalityClick(nationality)} // <-- Using handleNationalityClick here
                >
                  {nationality}
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
                value={userDiseases ? `${userDiseases}, ${disease}` : disease}
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
            <h2>Upload Food Image for Analysis</h2>
            <div>
              <label className="custom-file-upload">
                Upload Photo
                <input type="file" onChange={handleFileChange} />
              </label>
            </div>
            {previewURL && (
              <div className="food-image-preview">
                <img src={previewURL} alt="Food Preview" />
              </div>
            )}

            {isGenerating ? (
              <p>Generating calorie information and review...</p>
            ) : (
              <>
                {foodCalorieTable.length > 0 && (
                  <div className="food-suggestion-table">
                    <h3>Food Items and Calories:</h3>
                    <table>
                      <thead>
                        <tr>
                          <th>Food Item</th>
                          <th>Calories (kcal)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {foodCalorieTable.map((item, index) => (
                          <tr key={index}>
                            <td>{item.food}</td>
                            <td>{item.calories}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {foodReview && (
                  <div className="food-review">
                    <h3>Review of the Food Items:</h3>
                    <p>{foodReview}</p>
                  </div>
                )}
              </>
            )}
            <h3>Detected Food Items:</h3>
            <ul>
              {visionLabels.map((label, index) => (
                <li key={index}>{label}</li>
              ))}
            </ul>

            {isGenerating ? (
              <p>Generating food suggestions and review...</p>
            ) : (
              foodSuggestion && (
                <div className="food-review">
                  <h3>Food Calorie Information and Review:</h3>
                  <p>{foodSuggestion}</p>
                </div>
              )
            )}
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
