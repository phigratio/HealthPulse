import React, { useState, useEffect } from "react";
import axios from "axios";
import { textToSpeech } from "./apiKeys";

const API_KEY = textToSpeech;

const TextToSpeechButton = ({ text }) => {
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (audio) {
      audio.addEventListener("ended", () => setIsPlaying(false));
    }
    return () => {
      if (audio) {
        audio.removeEventListener("ended", () => setIsPlaying(false));
      }
    };
  }, [audio]);

  const speakText = async () => {
    if (text.trim() === "") return;

    if (audio && isPlaying) {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
      return;
    }

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
      const newAudio = new Audio("data:audio/mp3;base64," + audioContent);
      newAudio.play();
      setAudio(newAudio);
      setIsPlaying(true);
    } catch (error) {
      console.error("Error converting text to speech:", error);
    }
  };

  return (
    <button onClick={speakText} style={{ fontSize: "small" }}>
      {isPlaying ? "⏹️" : "🔊"}
    </button>
  );
};

export default TextToSpeechButton;
