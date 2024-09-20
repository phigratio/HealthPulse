import React, { useState } from "react";
import axios from "axios";
import "../style/servicePage/MentalHealth.css";
import MentalHealthL from "../components/LottieComponents/MentalHealth";
import Background from "../components/basicComponents/Background";
import Base from "../components/Base";
import PurpleBriefCaseL from "../components/LottieComponents/PurpleBriefCase";
import { geminiKey } from "./apiKeys";
import TextToSpeechButton from "./TextToSpeechButton";
import SpeechToTextApp from "./SpeechToTextButton";
import banner from "../images/banner/MentalHealth.mp4";

const apiKeyGemini = geminiKey;

const Mentalhealth = () => {
  const [selectedIssues, setSelectedIssues] = useState([]);
  const [customIssue, setCustomIssue] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [imageUrl, setImageUrl] = useState(""); // For storing the generated image URL
  const [error, setError] = useState(""); // For handling image generation error
  const [isLoading, setIsLoading] = useState(false); // For loading state

  const mentalHealthIssues = [
    "Anxiety",
    "Depression",
    "Insomnia",
    "ADHD",
    "OCD",
    "PTSD",
  ];

  const handleIssueClick = (issue) => {
    if (selectedIssues.includes(issue)) {
      setSelectedIssues(selectedIssues.filter((i) => i !== issue));
    } else {
      setSelectedIssues([...selectedIssues, issue]);
    }
  };

  const handleCustomIssueAdd = () => {
    if (customIssue && !selectedIssues.includes(customIssue)) {
      setSelectedIssues([...selectedIssues, customIssue]);
      setCustomIssue("");
    }
  };

  const generateRecommendation = async () => {
    const prompt = `Please provide in a single paragraph no matter how long it is. Provide sleep cycle recommendations and tips to avoid the following mental health issues: ${selectedIssues.join(
      ", "
    )}`;

    try {
      // Set loading state
      setIsLoading(true);
      setError(""); // Reset error message

      // Generate the recommendation
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
      setRecommendation(response.data.candidates[0].content.parts[0].text);

      // Modify the prompt for image generation
      const modifiedPrompt = `Generate a mentally soothing image for the following mental health issues: ${selectedIssues.join(
        ", "
      )}`;

      // Generate the image
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
      console.error("Error:", error);
      setError("Error generating content or image.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Background />
      <Base>
        <div className="video-container">
          <video src={banner} autoPlay loop muted></video>
        </div>
        <div className="mental-health-page">
          <div className="mental-lottie-container">
            <PurpleBriefCaseL />
          </div>
          <div className="mental-health-container">
            <h2>Select Mental Health Issues</h2>
            <div className="mental-issues-grid">
              {mentalHealthIssues.map((issue) => (
                <button
                  key={issue}
                  className={`mental-issue-button ${
                    selectedIssues.includes(issue) ? "selected" : ""
                  }`}
                  onClick={() => handleIssueClick(issue)}
                >
                  {issue}
                </button>
              ))}
            </div>
            <div className="mental-custom-issue">
              <input
                type="text"
                value={customIssue}
                onChange={(e) => setCustomIssue(e.target.value)}
                placeholder="Add custom issue"
                className="mental-custom-issue-input" // Add class for styling
              />
              <button
                onClick={handleCustomIssueAdd}
                className="mental-add-button"
              >
                Add
              </button>
              <SpeechToTextApp onTranscriptUpdate={setCustomIssue} />{" "}
              {/* Speech-to-Text Button */}
            </div>
            <button
              className="mental-generate-button"
              onClick={generateRecommendation}
              disabled={isLoading} // Disable button during loading
            >
              {isLoading ? "Generating..." : "Generate Recommendation"}
            </button>
            {recommendation && (
              <div className="recommendation">
                <h3>Recommendation:</h3>
                <p>{recommendation}</p>
                <TextToSpeechButton text={recommendation} />{" "}
                {/* Text-to-Speech Button */}
              </div>
            )}
            {imageUrl && (
              <div className="image-container">
                <h3>Generated Soothing Image:</h3>
                <img src={imageUrl} alt="Soothing Mental Health Image" />
              </div>
            )}
            {error && <p className="error-message">{error}</p>}
          </div>

          <div className="mental-lottie-container">
            <MentalHealthL />
          </div>
        </div>
      </Base>
    </div>
  );
};

export default Mentalhealth;
