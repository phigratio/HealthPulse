import React from "react";
import axios from "axios";
import apiKeys from "./apiKeys";
import Clock from "react-live-clock";
import ReactAnimatedWeather from "react-animated-weather";
import "../style/servicePage/Weather.css";
import TextToSpeechButton from "./TextToSpeechButton"; // Make sure you have this component

import banner from "../images/banner/kidsCorner.mp4";
import Background from "../components/basicComponents/Background";
import Base from "../components/Base";
import HeartRate from "../components/LottieComponents/HeartRate";
import Briefcase from "../components/LottieComponents/Breifcase";
import DoctorImg from "../components/LottieComponents/Doctor";

const geminiKey = "AIzaSyBtbcmMGUk34mU0LGJ83pLAfKVWTUKXGIE";
const dateBuilder = (d) => {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
};

const defaults = {
  color: "white",
  size: 112,
  animate: true,
};

class Weather extends React.Component {
  state = {
    lat: undefined,
    lon: undefined,
    errorMessage: undefined,
    temperatureC: undefined,
    temperatureF: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    icon: "CLEAR_DAY",
    main: undefined,
    errorMsg: undefined,
    healthRecommendation: "", // State for health recommendation
  };

  componentDidMount() {
    if (navigator.geolocation) {
      this.getPosition()
        .then((position) => {
          this.getWeather(position.coords.latitude, position.coords.longitude);
        })
        .catch((err) => {
          this.getWeather(28.67, 77.22);
          alert(
            "You have disabled location service. Allow 'This APP' to access your location. Your current location will be used for calculating Real-time weather."
          );
        });
    } else {
      alert("Geolocation not available");
    }

    this.timerID = setInterval(
      () => this.getWeather(this.state.lat, this.state.lon),
      600000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  getPosition = (options) => {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  };

  getWeather = async (lat, lon) => {
    try {
      const api_call = await fetch(
        `${apiKeys.base}weather?lat=${lat}&lon=${lon}&units=metric&APPID=${apiKeys.key}`
      );
      const data = await api_call.json();
      this.setState({
        lat: lat,
        lon: lon,
        city: data.name,
        temperatureC: Math.round(data.main.temp),
        temperatureF: Math.round(data.main.temp * 1.8 + 32),
        humidity: data.main.humidity,
        main: data.weather[0].main,
        country: data.sys.country,
      });
      this.setIcon(data.weather[0].main);
      this.fetchHealthRecommendation(data.weather[0].main, data.main.temp);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      this.setState({
        errorMsg: "Unable to fetch weather data. Please try again later.",
      });
    }
  };

  setIcon = (main) => {
    switch (main) {
      case "Haze":
        this.setState({ icon: "CLEAR_DAY" });
        break;
      case "Clouds":
        this.setState({ icon: "CLOUDY" });
        break;
      case "Rain":
        this.setState({ icon: "RAIN" });
        break;
      case "Snow":
        this.setState({ icon: "SNOW" });
        break;
      case "Dust":
        this.setState({ icon: "WIND" });
        break;
      case "Drizzle":
        this.setState({ icon: "SLEET" });
        break;
      case "Fog":
        this.setState({ icon: "FOG" });
        break;
      case "Smoke":
        this.setState({ icon: "FOG" });
        break;
      case "Tornado":
        this.setState({ icon: "WIND" });
        break;
      default:
        this.setState({ icon: "CLEAR_DAY" });
    }
  };

  fetchHealthRecommendation = async (weatherCondition, temperature) => {
    const combinedText = `Weather is ${weatherCondition} with temperature ${temperature}°C.`;

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiKey}`,
        {
          contents: [
            {
              parts: [
                {
                  text: ` Give me health tips based on this weather: ${combinedText} .Try to ans in one single paragraph and within 500 words`,
                },
              ],
            },
          ],
        }
      );

      this.setState({
        healthRecommendation: response.data.candidates[0].content.parts[0].text,
      });
    } catch (error) {
      console.error("Error with Gemini API request:", error);
      this.setState({
        healthRecommendation:
          "Sorry - Something went wrong with the Gemini API. Please try again!",
      });
    }
  };

  render() {
    return (
      <div>
        <Background />
        <Base>
          <div className="main">
            <div className="video-container">
              <video src={banner} autoPlay loop muted></video>
            </div>
            <React.Fragment>
              {this.state.temperatureC ? (
                <div className="content-container">
                  <div className="left-side">
                    <Briefcase /> {/* Positioned top-left */}
                  </div>
                  <div className="middle-side">
                    <div className="weather-container">
                      {/* Current Weather Card */}
                      <div className="weather-card">
                        <div className="city-info">
                          <div className="title">
                            <h2>{this.state.city}</h2>
                            <h3>{this.state.country}</h3>
                          </div>
                          <div className="mb-icon">
                            <ReactAnimatedWeather
                              icon={this.state.icon}
                              color={defaults.color}
                              size={defaults.size}
                              animate={defaults.animate}
                            />
                            <p>{this.state.main}</p>
                          </div>
                          <div className="date-time">
                            <div className="dmy">
                              <div id="txt"></div>
                              <div className="current-time">
                                <Clock
                                  format="HH:mm:ss"
                                  interval={1000}
                                  ticking={true}
                                />
                              </div>
                              <div className="current-date">
                                {dateBuilder(new Date())}
                              </div>
                            </div>
                            <div className="temperature">
                              <p>
                                {this.state.temperatureC}°<span>C</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Health Recommendation Card */}
                      <div className="health-card">
                        <h3>Health Recommendation</h3>
                        <p>{this.state.healthRecommendation}</p>
                        <TextToSpeechButton
                          text={this.state.healthRecommendation}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="right-side">
                    <DoctorImg /> {/* Positioned bottom-right */}
                  </div>
                </div>
              ) : (
                <React.Fragment>
                  <div className="loading-container">
                    <h3
                      style={{
                        color: "white",
                        fontSize: "22px",
                        fontWeight: "600",
                      }}
                    >
                      Detecting your location
                      <HeartRate />
                    </h3>
                    <h3 style={{ color: "white", marginTop: "10px" }}>
                      Your current location will be displayed on the App{" "}
                      <br></br> & used for calculating Real-time weather.
                    </h3>
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
          </div>
        </Base>
      </div>
    );
  }
}

export default Weather;
