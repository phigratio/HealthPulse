import "../style/Person.css";
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
  };

  return (
    <div className="w-3/4 m-auto">
      <div className="mt-20">
        <Slider {...settings}>
          {data.map((d, index) => (
            <div
              key={index}
              className="bg-orange-200 h-[500px] text-black rounded-xl"
            >
              <div className=" h-56 rounded-t-xl bg-indigo-500 flex justify-center items-center ">
                <img src={d.img} alt="" className="h-44 w-44 rounded-full" />
              </div>
              <div className="flex flex-col justify-center items-center gap-4 p-4">
                <p className=" text-xl font-semibold">{d.name}</p>
                <p>{d.review}</p>
                <button className="bg-indigo-400 text-white text-lg px-6 py-1 rounded-xl">
                  Read more
                </button>
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
    img: require("../images/doctor/doctor1.jpg"),
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus ut purus rhoncus.",
  },
  {
    name: "Jane Doe",
    img: require("../images/doctor/doctor2.jpg"),
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus ut purus rhoncus.",
  },
  {
    name: "John Smith",
    img: require("../images/doctor/doctor3.jpg"),
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus ut purus rhoncus.",
  },
  {
    name: "Jane Smith",
    img: require("../images/doctor/doctor4.jpg"),
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus ut purus rhoncus.",
  },
  {
    name: "John Doe",
    img: require("../images/doctor/doctor5.jpg"), // Corrected the image path and used require
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus ut purus rhoncus.",
  },
  {
    name: "Jane Doe",
    img: require("../images/doctor/doctor6.jpg"),
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus ut purus rhoncus.",
  },
  {
    name: "John Smith",
    img: require("../images/doctor/doctor7.jpg"),
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus ut purus rhoncus.",
  },
  {
    name: "Jane Smith",
    img: require("../images/doctor/doctor8.jpg"),
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus ut purus rhoncus.",
  },
];

export default Person;
