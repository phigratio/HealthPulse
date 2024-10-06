import React, { useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "../style/servicePage/ImageGenerator.css";
import { geminiKey } from "./apiKeys";
import BacteriaL from "../components/LottieComponents/Bacteria";
import ChildrenL from "../components/LottieComponents/Children";
import TextToSpeechButton from "./TextToSpeechButton"; // Import the TTS component

const ImageAndPdfGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [age, setAge] = useState(""); // State to store child's age
  const [imageUrl, setImageUrl] = useState(null);
  const [story, setStory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiKeyGemini = geminiKey;

  const handleGenerate = async () => {
    if (!prompt || !age) return; // Ensure both prompt and age are provided

    setIsLoading(true);
    setError(null);

    try {
      // Modify the prompt to include the child's age
      const storyPrompt = `Generate a story based on the prompt: "${prompt}", tailored for a child who is ${age} years old. Include how to maintain and prevent this disease for a child of this age. The story should be at least 2000 words.`;

      // Generate the story
      const storyResponse = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKeyGemini}`,
        {
          contents: [
            {
              parts: [
                {
                  text: storyPrompt,
                },
              ],
            },
          ],
        }
      );
      setStory(storyResponse.data.candidates[0].content.parts[0].text);

      const modifiedPrompt = `${prompt} cartoon images of doctor treating this for a ${age} year old child`;

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

    // Add the image on the first page
    if (imageUrl) {
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => {
        doc.addImage(img, "PNG", 10, 10, 180, 160); // Adjust the size and position

        // Add a new page for the story
        doc.addPage();
        const lines = doc.splitTextToSize(story, 180);
        doc.text(lines, 10, 10);

        doc.save(`${prompt}_story.pdf`);
      };
    } else {
      // If no image, just add the story
      const lines = doc.splitTextToSize(story, 180);
      doc.text(lines, 10, 10);
      doc.save(`${prompt}_story.pdf`);
    }
  };

  return (
    <div className="pdf-main-container">
      <div className="pdf-left-column">
        <ChildrenL />
      </div>
      <div className="pdf-middle-column">
        <h2>Image and Story Generator</h2>

        {/* Input for prompt */}
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter prompt"
          className="input-field"
        />

        {/* Input for age */}
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Enter child's age"
          className="input-field"
          min="1"
        />

        {/* Generate button */}
        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className="pdf-generate-button"
        >
          {isLoading ? "Generating..." : "Generate Content"}
        </button>

        {error && <p className="error-message">{error}</p>}

        {/* Story Display */}
        {story && (
          <div className="pdf-story-container">
            <h3>Story:</h3>
            <p>{story}</p>

            <TextToSpeechButton text={story} />
          </div>
        )}

        {/* Image Display */}
        {imageUrl && (
          <img src={imageUrl} alt="Generated" className="pdf-generated-image" />
        )}

        {/* PDF Download Button */}
        {story && imageUrl && (
          <button onClick={handleGeneratePdf} className="pdf-download-button">
            Download PDF
          </button>
        )}
      </div>

      <div className="pdf-right-column">
        <BacteriaL />
      </div>
    </div>
  );
};

export default ImageAndPdfGenerator;
