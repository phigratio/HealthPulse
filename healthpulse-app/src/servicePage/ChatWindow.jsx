import React, { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { GoogleGenerativeAI } from "@google/generative-ai";
import MDEditor from "@uiw/react-md-editor";
import InputBox from "./InputBox";
import TextToSpeechButton from "./TextToSpeechButton";
import "../style/servicePage/ChatWindow.css";
import { geminiKey } from "./apiKeys";

const API_KEY = geminiKey;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

// Header Component
const Header = () => {
  return (
    <div className="header">
      <h1 id="chat-header">
        <b style={{ marginLeft: 5 }}>Chatbot</b>
      </h1>
      <small>Healthpulse Chat AI to help your daily queries</small>
    </div>
  );
};

// Main ChatWindow Component
const ChatWindow = () => {
  const chatContainerRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  // Auto-scroll effect
  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [messages]);

  // Text Formatting Function
  const formatResponse = (text) => {
    // Remove ** from the text
    let formattedText = text.replace(/\*\*/g, "");

    // Split the text into paragraphs
    let paragraphs = formattedText.split("\n\n");

    // Trim each paragraph and filter out empty ones
    paragraphs = paragraphs.map((p) => p.trim()).filter((p) => p.length > 0);

    // Join paragraphs back into a single string
    return paragraphs.join("\n\n");
  };

  // Function to strip HTML tags
  const stripHtmlTags = (text) => {
    const doc = new DOMParser().parseFromString(text, "text/html");
    return doc.body.textContent || "";
  };

  // Message Sending Function
  const sendMessage = async (inputText) => {
    if (!inputText) {
      return;
    }

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        text: inputText,
        sender: "user",
        timestamp: new Date(),
        textForSpeech: inputText, // Add textForSpeech for user messages
      },
    ]);

    setLoading(true);

    try {
      const result = await model.generateContent(inputText);
      const text = result.response.text();

      const isCode = text.includes("```");
      const formattedText = isCode ? text : formatResponse(text);

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: formattedText,
          sender: "ai",
          timestamp: new Date(),
          isCode,
          textForSpeech: stripHtmlTags(formattedText), // Add stripped text for speech synthesis
        },
      ]);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("generateContent error: ", error);
    }
  };

  // Render Function
  return (
    <div className="chatbot-window">
      <Header />
      <div className="chatbot-container" ref={chatContainerRef}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender === "user" ? "user" : "ai"}`}
          >
            {message.isCode ? (
              <MDEditor.Markdown
                source={message.text}
                style={{ whiteSpace: "pre-wrap" }}
              />
            ) : (
              <>
                {message.text.split("\n\n").map((paragraph, idx) => (
                  <div key={idx} className="message-paragraph">
                    <p>{paragraph}</p>
                  </div>
                ))}
                {/* TextToSpeechButton should appear once after the entire message */}
                <TextToSpeechButton text={message.textForSpeech} />
                <span
                  className={`time ${
                    message.sender === "user" ? "user" : "ai"
                  }`}
                >
                  {message.timestamp
                    ? dayjs(message.timestamp).format("DD.MM.YYYY HH:mm:ss")
                    : ""}
                </span>
              </>
            )}
          </div>
        ))}
      </div>
      <InputBox sendMessage={sendMessage} loading={loading} />
    </div>
  );
};

export default ChatWindow;
