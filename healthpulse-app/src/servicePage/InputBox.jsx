import React, { useState } from "react";
import SpeechToTextApp from "./SpeechToTextButton";
import "../style/servicePage/InputBox.css";

const InputBox = ({ sendMessage, loading }) => {
  const [input, setInput] = useState("");

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey && input.trim() !== "") {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (input.trim() !== "") {
      sendMessage(input);
      setInput("");
    }
  };

  const handleTranscriptUpdate = (transcript) => {
    setInput(transcript);
  };

  return (
    <div className="input-box">
      {loading && <progress style={{ width: "100%" }} />}
      <div className="input-area">
        <textarea
          disabled={loading}
          className="form-control"
          placeholder="Type a message..."
          value={loading ? "Loading..." : input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <div className="button-group">
          <button
            onClick={handleSubmit}
            disabled={loading || input.trim() === ""}
            className="submit-button"
          >
            Send
          </button>
          <SpeechToTextApp
            onTranscriptUpdate={handleTranscriptUpdate}
            className="speech-to-text-button"
          />
        </div>
      </div>
    </div>
  );
};

export default InputBox;
