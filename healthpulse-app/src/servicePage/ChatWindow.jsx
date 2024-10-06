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
        <b style={{ marginLeft: 5 }}>HealthPulse AI Assistant</b>
      </h1>
      <small>
        Your personal health assistant - Ask any health-related questions
      </small>
    </div>
  );
};

// Main ChatWindow Component
const ChatWindow = () => {
  const chatContainerRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Welcome to HealthPulse chatbot. I can help you with health-related questions. What would you like to know? Always consult a doctor for professional advice.",
      sender: "ai",
      timestamp: new Date(),
      textForSpeech:
        "Welcome to HealthPulse chatbot. I can help you with health-related questions. What would you like to know? Always consult a doctor for professional advice.",
    },
  ]);

  // Auto-scroll effect
  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [messages]);

  // Text Formatting Function
  const formatResponse = (text) => {
    let formattedText = text.replace(/\*\*/g, "");
    let paragraphs = formattedText.split("\n\n");
    paragraphs = paragraphs.map((p) => p.trim()).filter((p) => p.length > 0);
    return paragraphs.join("\n\n");
  };

  // Function to strip HTML tags
  const stripHtmlTags = (text) => {
    const doc = new DOMParser().parseFromString(text, "text/html");
    return doc.body.textContent || "";
  };

  // Function to check if query is health-related
  const isHealthRelated = async (query) => {
    try {
      const checkPrompt = `Determine if the following query is health-related. Only respond with 'true' or 'false'. Query: ${query}`;
      const result = await model.generateContent(checkPrompt);
      const response = result.response.text().toLowerCase().trim();
      return response === "true";
    } catch (error) {
      console.error("Error checking health relevance:", error);
      return false;
    }
  };

  // Message Sending Function
  const sendMessage = async (inputText) => {
    if (!inputText) return;

    // Add user message
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        text: inputText,
        sender: "user",
        timestamp: new Date(),
        textForSpeech: inputText,
      },
    ]);

    setLoading(true);

    try {
      // Check if the query is health-related
      const healthRelated = await isHealthRelated(inputText);

      if (!healthRelated) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: "I apologize, but I can only answer health-related questions. Please feel free to ask any health, medical, wellness, or fitness questions.",
            sender: "ai",
            timestamp: new Date(),
            textForSpeech:
              "I apologize, but I can only answer health-related questions. Please feel free to ask any health, medical, wellness, or fitness questions.",
          },
        ]);
        setLoading(false);
        return;
      }

      // If health-related, proceed with the enhanced health-specific prompt
      const healthPrompt = `As a health assistant, please provide accurate and helpful information about the following health-related query: ${inputText}. Remember to provide general information and advise consulting healthcare professionals for specific medical advice.`;

      const result = await model.generateContent(healthPrompt);
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
          textForSpeech: stripHtmlTags(formattedText),
        },
      ]);
    } catch (error) {
      console.error("generateContent error: ", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: "I apologize, but I encountered an error processing your request. Please try again.",
          sender: "ai",
          timestamp: new Date(),
          textForSpeech:
            "I apologize, but I encountered an error processing your request. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
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
      <InputBox
        sendMessage={sendMessage}
        loading={loading}
        placeholder="Ask your health-related question..."
      />
    </div>
  );
};

export default ChatWindow;
