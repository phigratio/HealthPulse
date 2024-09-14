import React, { useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import Lottie from "lottie-react";
import "../style/servicePage/ImageGenerator.css";
import LoginL from "../components/LottieComponents/Login";
import { geminiKey } from "./apiKeys";
import BacteriaL from "../components/LottieComponents/Bacteria";
import ChildrenL from "../components/LottieComponents/Children";

const ImageAndPdfGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [story, setStory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiKeyGemini = geminiKey;

  const handleGenerate = async () => {
    if (!prompt) return;

    setIsLoading(true);
    setError(null);

    try {
      // Generate the story
      const storyResponse = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKeyGemini}`,
        {
          contents: [
            {
              parts: [
                {
                  text: `Generate a story based on the prompt and show how we can maintain and prevent this disease in the story for a five year child: ${prompt}.Answer in one single paragraph no matter how long it is`,
                },
              ],
            },
          ],
        }
      );
      setStory(storyResponse.data.candidates[0].content.parts[0].text);

      // Modify the prompt for generating cartoon images
      // const modifiedPrompt = `${prompt} cartoon images of people doctor treating this `;
      const modifiedPrompt = `image of a flying elephant `;

      // Generate the image
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
      console.error("Error:", error);
      setError("Error generating content");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGeneratePdf = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);

    // Add the story on the first page
    doc.text(story, 10, 10, { maxWidth: 180 });

    // Add a new page for the image
    doc.addPage();

    // Add the image on the second page
    if (imageUrl) {
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => {
        doc.addImage(img, "PNG", 10, 10, 180, 160); // Adjust the size and position
        doc.save(`${prompt}_story.pdf`);
      };
    } else {
      doc.save(`${prompt}_story.pdf`);
    }
  };

  return (
    <div className="main-container">
      <div className="left-column">
        <ChildrenL />
      </div>
      <div className="middle-column">
        <h2>Image and Story Generator</h2>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter prompt"
          className="input-field"
        />
        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className="generate-button"
        >
          {isLoading ? "Generating..." : "Generate Content"}
        </button>
        {error && <p className="error-message">{error}</p>}
        {story && (
          <div className="story-container">
            <h3>Story:</h3>
            <p>{story}</p>
          </div>
        )}
        {imageUrl && (
          <img src={imageUrl} alt="Generated" className="generated-image" />
        )}
        {story && imageUrl && (
          <button onClick={handleGeneratePdf} className="download-button">
            Download PDF
          </button>
        )}
      </div>
      <div className="right-column">
        <BacteriaL />
      </div>
    </div>
  );
};

export default ImageAndPdfGenerator;
