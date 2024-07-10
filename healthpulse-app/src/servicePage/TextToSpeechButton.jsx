import React from "react";
import axios from "axios";

const API_KEY = "AIzaSyCBks9NXTg4i-Ie_fRRIOIamvS-cFFBejs"; // Replace with your actual API key

const TextToSpeechButton = ({ text }) => {
  const speakText = async () => {
    if (text.trim() === "") return;

    const requestBody = {
      input: { text },
      voice: { languageCode: "en-US", ssmlGender: "NEUTRAL" },
      audioConfig: { audioEncoding: "MP3" },
    };

    try {
      const response = await axios.post(
        `https://texttospeech.googleapis.com/v1/text:synthesize?key=${API_KEY}`,
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const audioContent = response.data.audioContent;
      const audio = new Audio("data:audio/mp3;base64," + audioContent);
      audio.play();
    } catch (error) {
      console.error("Error converting text to speech:", error);
    }
  };

  return <button onClick={speakText}>🔊</button>;
};

export default TextToSpeechButton;
