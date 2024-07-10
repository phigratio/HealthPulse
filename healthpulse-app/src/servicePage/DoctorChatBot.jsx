import React from "react";
import banner from "../images/banner/doctorChatBot.mp4";
import "../style/servicePage/DoctorChatBot.css";
import Background from "../components/basicComponents/Background";
import Base from "../components/Base";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { useState } from "react";

const DoctorChatBot = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);

  async function generateAnswer(e) {
    setGeneratingAnswer(true);
    e.preventDefault();
    setAnswer("Loading your answer... \n It might take up to 10 seconds");
    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBtbcmMGUk34mU0LGJ83pLAfKVWTUKXGIE`,
        method: "post",
        data: {
          contents: [{ parts: [{ text: question }] }],
        },
      });

      setAnswer(response.data.candidates[0].content.parts[0].text);
    } catch (error) {
      console.log(error);
      setAnswer("Sorry - Something went wrong. Please try again!");
    }

    setGeneratingAnswer(false);
  }
  return (
    <div>
      <Background />
      <Base>
        <div className="main">
          <div className="video-container">
            <video src={banner} autoPlay loop muted></video>
          </div>
          <div className="text-container">
            <form onSubmit={generateAnswer} className="form-container">
              <h1 className="form-title">Healthpulse Daily Corner</h1>
              <textarea
                required
                className="question-box"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask anything"
              ></textarea>
              <button
                type="submit"
                className={`generate-button ${
                  generatingAnswer ? "disabled-button" : ""
                }`}
                disabled={generatingAnswer}
              >
                Generate answer
              </button>
            </form>
            <div className="answer-container">
              <ReactMarkdown className="answer-box">{answer}</ReactMarkdown>
            </div>
          </div>
        </div>
      </Base>
    </div>
  );
};

export default DoctorChatBot;
