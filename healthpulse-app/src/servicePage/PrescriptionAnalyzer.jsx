import React, { useState } from "react";
import axios from "axios";
import "../style/servicePage/PrescriptionAnalyzer.css";
import TextToSpeechButton from "./TextToSpeechButton";
import Background from "../components/basicComponents/Background";
import Base from "../components/Base";
import banner from "../images/banner/kidsCorner.mp4";

const PrescriptionAnalyzer = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [visionText, setVisionText] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const apiKeyVision = "AIzaSyCj5hRY6tg826SELZMcacxPpiCZMuY-VJ4";
  const apiKeyGemini = "AIzaSyBtbcmMGUk34mU0LGJ83pLAfKVWTUKXGIE";

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      alert("Please select an image file first!");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result.split(",")[1];

      try {
        setIsGenerating(true);

        // Google Cloud Vision API Request
        const visionResponse = await axios.post(
          `https://vision.googleapis.com/v1/images:annotate?key=${apiKeyVision}`,
          {
            requests: [
              {
                image: {
                  content: base64Image,
                },
                features: [
                  {
                    type: "DOCUMENT_TEXT_DETECTION",
                  },
                ],
              },
            ],
          }
        );

        const textAnnotations =
          visionResponse.data.responses[0]?.textAnnotations?.map(
            (annotation) => annotation.description
          ) || [];

        const combinedText = textAnnotations.join(" ");
        setVisionText(combinedText);
        console.log("Combined text:", combinedText);

        // Gemini Text API Request
        try {
          const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKeyGemini}`,
            {
              contents: [
                {
                  parts: [
                    {
                      text: `This text probably contains some medicine names. Can you guess the names and provide when these medicines are used? The text is ${combinedText}`,
                    },
                  ],
                },
              ],
            }
          );

          setResult(response.data.candidates[0].content.parts[0].text);
        } catch (error) {
          console.error("Error with Gemini API request:", error);
          setResult(
            "Sorry - Something went wrong with the Gemini API. Please try again!"
          );
        }
      } catch (error) {
        console.error("Error with Google Cloud Vision API request:", error);
        setResult(
          "Sorry - Something went wrong with the Vision API. Please try again!"
        );
      } finally {
        setIsGenerating(false);
      }
    };

    reader.readAsDataURL(selectedFile);
  };

  return (
    <div>
      <Background />
      <Base>
        <div className="main">
          <div className="video-container">
            <video src={banner} autoPlay loop muted></video>
          </div>
          <div className="image-analyzer-container">
            <h1 className="heading">Prescription Analyzer</h1>
            <form onSubmit={handleSubmit}>
              <div className="button-group">
                <input
                  type="file"
                  onChange={handleFileChange}
                  id="fileInput"
                  className="file-input"
                />
                <label htmlFor="fileInput" className="btn">
                  Choose Photo
                </label>
                <button type="submit" className="btn" disabled={isGenerating}>
                  {isGenerating ? "Processing..." : "Upload Photo"}
                </button>
              </div>
            </form>
            {visionText && (
              <div className="card">
                <h2>Extracted Text By AI</h2>
                <p>{visionText}</p>
                <TextToSpeechButton text={visionText} />
              </div>
            )}
            {result && (
              <div className="card">
                <h2>Medicines Usecases By AI</h2>
                <p>{result}</p>
                <TextToSpeechButton text={result} />
              </div>
            )}
          </div>
        </div>
      </Base>
    </div>
  );
};

export default PrescriptionAnalyzer;
