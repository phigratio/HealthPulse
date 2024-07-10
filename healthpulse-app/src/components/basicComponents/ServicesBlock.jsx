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
        <p className="font-sans text-lg mt-4">
          Cras dictum sit amet mi id varius. Sed mauris eros, fermentum eget
          risus vel, imperdiet suscipit diam. Sed mollis orci eget magna
          consectetur viverra.
        </p>
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
    link: "/service/book-doctor",
  },
  {
    name: "Health Articles",
    overview: "Read articles written by our doctors.",
    img: require("../../images/services/service5.png"),
    review:
      "Stay informed with articles on various health topics written by our expert doctors.",
    link: "/articles",
  },
  {
    name: "Symptom Checker",
    overview: "Check your symptoms online.",
    img: require("../../images/services/service6.png"),
    review:
      "Use our symptom checker tool to get an idea of what might be ailing you.",
    link: "/symptom-checker",
  },
  {
    name: "Mental Health Support",
    overview: "Access mental health resources.",
    img: require("../../images/services/service7.png"),
    review:
      "Find mental health resources and support to help you manage your well-being.",
    link: "/mental-health",
  },
  {
    name: "Nutrition Advice",
    overview: "Get personalized nutrition advice.",
    img: require("../../images/services/service8.png"),
    review:
      "Receive personalized nutrition advice to help you maintain a healthy diet.",
    link: "/nutrition",
  },
  {
    name: "Fitness Plans",
    overview: "Access customized fitness plans.",
    img: require("../../images/services/service9.png"),
    review:
      "Get customized fitness plans tailored to your health goals and needs.",
    link: "/fitness-plans",
  },
  {
    name: "Vaccination Schedules",
    overview: "Check recommended vaccination schedules.",
    img: require("../../images/services/service10.png"),
    review:
      "Keep track of recommended vaccinations and schedules for you and your family.",
    link: "/vaccinations",
  },
  {
    name: "Health Monitoring",
    overview: "Monitor your health metrics.",
    img: require("../../images/services/service11.png"),
    review: "Use our tools to monitor and track your health metrics over time.",
    link: "/health-monitoring",
  },
  {
    name: "Emergency Services",
    overview: "Get quick access to emergency services.",
    img: require("../../images/services/service12.png"),
    review:
      "Find quick access to emergency services and support in case of urgent health issues.",
    link: "/emergency-services",
  },
];

export default ServicesBlock;
