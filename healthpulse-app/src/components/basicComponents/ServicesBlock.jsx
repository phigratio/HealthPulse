import "../../style/ServicesBlock.css"; // Import the correct CSS file
import "../../style/Button.css"; // Import the button CSS file
import React from "react";
import { useNavigate } from "react-router-dom"; // Import the hook for navigation

const ServicesBlock = () => {
  const navigate = useNavigate(); // Initialize the navigation hook

  const handleButtonClick = (link) => {
    navigate(link); // Use the navigate function to go to the specified link
  };

  return (
    <div className="w-3/4 m-auto rounded-xl">
      <div className="mt-20 text-center rounded-xl">
        <h1 className="text-[#09A2D6] font-sans text-5xl font-bold">
          We Provide Best Services
        </h1>
        <p className="font-sans text-lg mt-4"></p>
        <div className="grid-container rounded-xl">
          {data.map((d, index) => (
            <div key={index} className="flip-card-container">
              <div className="flip-card">
                <div className="flip-card-front bg-[#e5f3fa] h-[500px] text-black rounded-xl transition-shadow duration-300">
                  <div className="h-90 bg-[#11a2d7] flex justify-center items-center overflow-hidden">
                    <img
                      src={d.img}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-center items-center gap-4 p-4">
                    <p className="text-xl font-bold">{d.name}</p>
                    <p className="text-sm font-semibold">{d.overview}</p>
                  </div>
                </div>
                <div className="flip-card-back bg-[#e5f3fa] h-[500px] text-black rounded-xl flex flex-col justify-center items-center gap-4 p-4 transition-shadow duration-300">
                  <p>{d.review}</p>
                  <button
                    onClick={() => handleButtonClick(d.link)}
                    className="button" // Apply the button class
                  >
                    See Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const data = [
  {
    name: "Doctor Chat Bot",
    overview: "Chat with our AI-powered doctor bot for quick advice.",
    img: require("../../images/services/service1.png"),
    review:
      "Our AI-powered chatbot provides quick medical advice based on your symptoms.",
    link: "/service/doctor-chat-bot",
  },
  {
    name: "Health Calculator",
    overview: "Calculate your BMI, BMR, and other health metrics.",
    img: require("../../images/services/service2.png"),
    review:
      "Use our health calculator to determine your BMI, BMR, and other health metrics.",
    link: "/service/health-calculator",
  },
  {
    name: "Kids Corner",
    overview: "Explore Health with KidsCorner AI Stories!",
    img: require("../../images/services/service3.png"),
    review:
      "KidsCorner is a fantastic way for children to learn about health in a fun and engaging manner. The AI-generated stories are both educational and entertaining, making healthcare concepts easy to understand for young minds.",
    link: "/service/kids-corner",
  },
  {
    name: "Book Doctor Appointment",
    overview: "Get your prescriptions refilled online.",
    img: require("../../images/services/service4.png"),
    review: "Easily request prescription refills through our online platform.",
    link: "/appoint",
  },
  {
    name: "Medicine Reminder",
    overview: "Set reminders for your medications.",
    img: require("../../images/services/Reminder.png"),
    review:
      "Use our medicine reminder tool to help you remember to take your medications on time.",

    link: "/medication",
  },
  {
    name: "Pet",
    overview: "Check Your Pet health using AI.",
    img: require("../../images/services/Pets.jpg"),
    review:
      "Use our Ai tools to get your pet health in a good condition and ailing your pet.",
    link: "/service/pet",
  },
  {
    name: "Mental Health Support",
    overview: "Access mental health resources.",
    img: require("../../images/services/MentalHealth.jpg"),
    review:
      "Find mental health resources and support to help you manage your well-being.",
    link: "/service/mentalhealth",
  },
  {
    name: "Food Suggestion",
    overview: "Get personalized nutrition advice.",
    img: require("../../images/services/Food.jpg"),
    review:
      "Receive personalized nutrition advice to help you maintain a healthy diet.",
    link: "/service/food-suggestion",
  },
  {
    name: "Weather Ai Assistant",
    overview: "Access AI Assistance for health based on weather.",
    img: require("../../images/services/Weather.jpg"),
    review:
      "Get Ai assistance tailored to your health goals and needs based on wether.",
    link: "/service/weatherapp",
  },
  {
    name: "Prescription Analyzer",
    overview: "Check the prescription written by doctor and analyse the data .",
    img: require("../../images/services/Prescription.jpg"),
    review: ".",
    link: "/service/prescription-analyzer",
  },
  {
    name: "Health News",
    overview: "Monitor your health based on recent updates.",
    img: require("../../images/services/News.jpg"),
    review:
      "Help to view recent news highlights and get updated with recent health updates.",
    link: "/service/newsapp",
  },
  {
    name: "Nearest Hospital",
    overview: "Get quick access to nearest hospital.",
    img: require("../../images/services/Map.jpg"),
    review:
      "Find quick access to hospital services and support in case of urgent health issues.",
    link: "/service/nearest-hospital",
  },
  {
    name: "MachineLearning Models",
    overview: "Get Assistance of trained models.",
    img: require("../../images/services/MlModel.jpg"),
    review:
      "Get Machine Learning Models trained to recognize diseases with maximum accuracy rates.",
    link: "/service/ml-models",
  },
  {
    name: "Health Quiz Game",
    overview:
      "Play a health quiz game to obtain health knowledge in an entertaining game",
    img: require("../../images/services/Health.jpg"),
    review:
      "Receive personalized nutrition advice to help you maintain a healthy diet.",
    link: "/service/quiz",
  },
];

export default ServicesBlock;
