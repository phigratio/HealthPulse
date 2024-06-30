import "../style/ServicesBlock.css"; // Import the correct CSS file
import "../style/Button.css"; // Import the button CSS file
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom"; // Import the hook for navigation

const ServicesBlock = () => {
  const navigate = useNavigate(); // Initialize the navigation hook

  const settings = {
    className: "center",
    dots: true,
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,
  };

  const handleButtonClick = (link) => {
    navigate(link); // Use the navigate function to go to the specified link
  };

  return (
    <div className="w-3/4 m-auto">
      <div className="mt-20 text-center">
        <h1 className="text-[#09A2D6] font-sans text-5xl font-bold">
          We Provide Best Services
        </h1>
        <p className="font-sans text-lg mt-4">
          Cras dictum sit amet mi id varius. Sed mauris eros, fermentum eget
          risus vel, imperdiet suscipit diam. Sed mollis orci eget magna
          consectetur viverra.
        </p>
        <Slider {...settings} className="h-500">
          {data.map((d, index) => (
            <div key={index} className="flip-card-container">
              <div className="flip-card">
                <div className="flip-card-front bg-[#e5f3fa] h-[500px] text-black rounded-xl hover:shadow-2xl transition-shadow duration-300">
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
                <div className="flip-card-back bg-[#e5f3fa] h-[500px] text-black rounded-xl flex flex-col justify-center items-center gap-4 p-4 hover:shadow-2xl transition-shadow duration-300">
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
        </Slider>
      </div>
    </div>
  );
};

const data = [
  {
    name: "Doctor Chat Bot",
    overview: "Cardiology",
    img: require("../images/services/service1.png"),
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus ut purus rhoncus.",
    link: "/bmi",
  },
  {
    name: "Health Calculator",
    overview: "You can calculate BMI, BMR, etc.",
    img: require("../images/services/service2.png"),
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus ut purus rhoncus.",
    link: "/bmi",
  },
  {
    name: "John Smith",
    overview: "Cardiology",
    img: require("../images/doctor/doctor3.jpg"),
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus ut purus rhoncus.",
    link: "/bmi",
  },
  {
    name: "Jane Smith",
    overview: "Cardiology",
    img: require("../images/doctor/doctor4.jpg"),
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus ut purus rhoncus.",
    link: "/bmi",
  },
  {
    name: "John Doe",
    overview: "Cardiology",
    img: require("../images/doctor/doctor5.jpg"),
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus ut purus rhoncus.",
    link: "/bmi",
  },
  {
    name: "Jane Doe",
    overview: "Cardiology",
    img: require("../images/doctor/doctor6.jpg"),
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus ut purus rhoncus.",
    link: "/bmi",
  },
  {
    name: "John Smith",
    overview: "Cardiology",
    img: require("../images/doctor/doctor7.jpg"),
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus ut purus rhoncus.",
    link: "/bmi",
  },
  {
    name: "Jane Smith",
    overview: "Cardiology",
    img: require("../images/doctor/doctor8.jpg"),
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus ut purus rhoncus.",
    link: "/bmi",
  },
];

export default ServicesBlock;
