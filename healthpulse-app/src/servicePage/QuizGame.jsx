import React, { useState, useEffect } from "react";
import axios from "axios";
import { geminiKey } from "./apiKeys";
import "../style/servicePage/quiz.css";
import Lottie from "lottie-react";
import Session from "../assets/Session.json";
import Doctor from "../assets/Doctor.json";

const SessionL = () => {
  const wrapperStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  };

  const animationStyle = {
    width: "100%",
    height: "100%",
  };

  return (
    <div style={wrapperStyle}>
      <Lottie style={animationStyle} animationData={Session} />
    </div>
  );
};

const DoctorL = () => {
  const wrapperStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  };

  const animationStyle = {
    width: "100%",
    height: "100%",
  };

  return (
    <div style={wrapperStyle}>
      <Lottie style={animationStyle} animationData={Doctor} />
    </div>
  );
};

const QuizGame = () => {
  const apiKeyGemini = geminiKey;
  const [quiz, setQuiz] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [error, setError] = useState(null);
  const [topic, setTopic] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [answered, setAnswered] = useState(false);

  const generateQuizFromGemini = async (
    topic = "random healthcare questions"
  ) => {
    const prompt = `Generate 10 quiz questions related to ${topic}. Each question should have 4 possible answers, with one correct answer. The format should be JSON with 'question', 'options', and 'correctAnswer' keys.`;

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKeyGemini}`,
        {
          contents: [{ parts: [{ text: prompt }] }],
        }
      );

      const quizDataString =
        response.data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (quizDataString) {
        const cleanedDataString = quizDataString
          .replace(/```json\s?|\s?```/g, "")
          .trim();
        const quizData = JSON.parse(cleanedDataString);
        return quizData;
      } else {
        throw new Error("Invalid response structure from Gemini API.");
      }
    } catch (error) {
      console.error("Error generating quiz from Gemini:", error);
      throw error;
    }
  };

  const fetchQuiz = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const quizData = await generateQuizFromGemini(
        topic || "random healthcare questions"
      );
      if (quizData && quizData.length > 0) {
        setQuiz(quizData);
        setCurrentQuestion(0);
        setScore(0);
        setShowResults(false);
      } else {
        setError("Quiz generation failed. Please try again.");
      }
    } catch (error) {
      setError("Error fetching quiz questions");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (option) => {
    setSelectedAnswer(option);
    setCorrectAnswer(quiz[currentQuestion].correctAnswer);
    setAnswered(true);
  };

  const handleNext = () => {
    if (selectedAnswer === correctAnswer) {
      setScore(score + 1);
    }
    setSelectedAnswer(null);
    setCorrectAnswer(null);
    setAnswered(false);
    if (currentQuestion < quiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResults(false);
    setScore(0);
    setAnswered(false);
    fetchQuiz();
  };

  useEffect(() => {
    fetchQuiz();
  }, []);

  return (
    <div style={{ display: "flex", width: "100%" }}>
      <div style={{ width: "20%" }}>
        <SessionL />
      </div>
      <div style={{ width: "60%" }} className="quiz-container">
        <h1>Healthcare Quiz Game</h1>
        <input
          type="text"
          placeholder="Enter topic for quiz (leave blank for random)"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="input-field"
        />
        <button onClick={fetchQuiz} className="start-button">
          Start New Quiz
        </button>

        {isLoading && <p className="loading">Loading quiz...</p>}
        {error && <p className="error">{error}</p>}

        {!showResults && quiz.length > 0 && (
          <div className="question-container">
            <h2>
              Question {currentQuestion + 1} of {quiz.length}
            </h2>
            <p className="question">{quiz[currentQuestion].question}</p>
            <ul className="options-list">
              {quiz[currentQuestion].options.map((option, index) => (
                <li
                  key={index}
                  className={`option ${
                    answered && option === correctAnswer ? "correct" : ""
                  } 
                    ${
                      answered &&
                      option === selectedAnswer &&
                      option !== correctAnswer
                        ? "incorrect"
                        : ""
                    }`}
                  onClick={() => !answered && handleSelect(option)}
                >
                  {option}
                </li>
              ))}
            </ul>
            {answered && (
              <button onClick={handleNext} className="next-button">
                {currentQuestion === quiz.length - 1 ? "Finish" : "Next"}
              </button>
            )}
          </div>
        )}

        {showResults && (
          <div className="results">
            <h2>Quiz Results</h2>
            <p>
              You scored {score} out of {quiz.length}
            </p>
            <button onClick={handleRestart} className="restart-button">
              Restart Quiz
            </button>
          </div>
        )}
      </div>
      <div style={{ width: "20%" }}>
        <DoctorL />
      </div>
    </div>
  );
};

export default QuizGame;
