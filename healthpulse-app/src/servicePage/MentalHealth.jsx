import React, { useState } from "react";
import axios from "axios";
import "../style/servicePage/MentalHealth.css";
import DoctorL from "../components/LottieComponents/Doctor"; // Reuse the doctor icon
import MentalHealthL from "../components/LottieComponents/MentalHealth";
import Background from "../components/basicComponents/Background";
import Base from "../components/Base";
import PurpleBriefCaseL from "../components/LottieComponents/PurpleBriefCase";

const apiKeyGemini = "AIzaSyCSlDKg-ZCMGgC3v4TQ1D8626oawLVCPhA";

const Mentalhealth = () => {
  const [selectedIssues, setSelectedIssues] = useState([]);
  const [customIssue, setCustomIssue] = useState("");
  const [recommendation, setRecommendation] = useState("");

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
    const prompt = `Provide sleep cycle recommendations and tips to avoid the following mental health issues: ${selectedIssues.join(
      ", "
    )}`;

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
      setRecommendation(response.data.candidates[0].content.parts[0].text);
    } catch (error) {
      console.error("Error generating recommendation:", error);
      setRecommendation(
        "An error occurred while generating the recommendation."
      );
    }
  };

  return (
    <div>
      <Background />
      <Base>
        <div className="mental-health-page">
          <div className="lottie-container">
            <PurpleBriefCaseL />
          </div>
          <div className="mental-health-container">
            <h2>Select Mental Health Issues</h2>
            <div className="issues-grid">
              {mentalHealthIssues.map((issue) => (
                <button
                  key={issue}
                  className={`issue-button ${
                    selectedIssues.includes(issue) ? "selected" : ""
                  }`}
                  onClick={() => handleIssueClick(issue)}
                >
                  {issue}
                </button>
              ))}
            </div>
            <div className="custom-issue">
              <input
                type="text"
                value={customIssue}
                onChange={(e) => setCustomIssue(e.target.value)}
                placeholder="Add custom issue"
              />
              <button onClick={handleCustomIssueAdd}>Add</button>
            </div>
            <button
              className="generate-button"
              onClick={generateRecommendation}
            >
              Generate Recommendation
            </button>
            {recommendation && (
              <div className="recommendation">
                <h3>Recommendation:</h3>
                <p>{recommendation}</p>
              </div>
            )}
          </div>

          <div className="lottie-container">
            <MentalHealthL />
          </div>
        </div>
      </Base>
    </div>
  );
};

export default Mentalhealth;
