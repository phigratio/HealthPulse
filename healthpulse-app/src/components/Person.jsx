import "../style/Person.css"; // Import the correct CSS file
import "../style/Button.css"; // Import the button CSS file
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Person = () => {
  const settings = {
    className: "center",
    dots: true,
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="w-3/4 m-auto">
      <div className="mt-20 text-center">
        <h1 className="text-[#09A2D6] font-sans text-5xl font-bold">
          Our Top Doctors
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
                  <img
                    src={d.img}
                    alt=""
                    className="h-full w-full object-cover rounded-xl"
                  />
                  <div className="overlay flex flex-col justify-center items-center absolute top-0 left-0 w-full h-full text-center text-white rounded-xl">
                    <p className="text-xl font-bold">{d.name}</p>
                    <p className="text-sm font-semibold">{d.department}</p>
                  </div>
                </div>
                <div className="flip-card-back bg-[#e5f3fa] h-[500px] text-black rounded-xl flex flex-col justify-center items-center gap-4 p-4 hover:shadow-2xl transition-shadow duration-300">
                  <p>{d.review}</p>
                  <button className="button">See Details</button>
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
    name: "John Doe",
    department: "Cardiology",
    img: require("../images/doctor/doctor1.jpg"),
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus ut purus rhoncus.",
  },
  {
    name: "Jane Doe",
    department: "Cardiology",
    img: require("../images/doctor/doctor2.jpg"),
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus ut purus rhoncus.",
  },
  {
    name: "John Smith",
    department: "Cardiology",
    img: require("../images/doctor/doctor3.jpg"),
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus ut purus rhoncus.",
  },
  {
    name: "Jane Smith",
    department: "Cardiology",
    img: require("../images/doctor/doctor4.jpg"),
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus ut purus rhoncus.",
  },
  {
    name: "John Doe",
    department: "Cardiology",
    img: require("../images/doctor/doctor5.jpg"),
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus ut purus rhoncus.",
  },
  {
    name: "Jane Doe",
    department: "Cardiology",
    img: require("../images/doctor/doctor6.jpg"),
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus ut purus rhoncus.",
  },
  {
    name: "John Smith",
    department: "Cardiology",
    img: require("../images/doctor/doctor7.jpg"),
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus ut purus rhoncus.",
  },
  {
    name: "Jane Smith",
    department: "Cardiology",
    img: require("../images/doctor/doctor8.jpg"),
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus ut purus rhoncus.",
  },
];

export default Person;
