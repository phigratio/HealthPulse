import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import userContext from "../context/userContext";
import {
  login,
  addUserInfo,
  getUserInfo,
  forgotPassword,
} from "../service/user-service";
import { doLogin } from "../auth";
import LoginL from "../components/LottieComponents/Login"; // Right Lottie Component
import "../style/login.css"; // Import custom styles for login card

import Background from "../components/basicComponents/Background";
import Base from "../components/Base";

import { toast } from "react-toastify";

import MentalHealthL from "../components/LottieComponents/MentalHealth";

const Login = () => {
  const userContxtData = useContext(userContext);
  const navigate = useNavigate();

  const [loginDetail, setLoginDetail] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event, field) => {
    let actualValue = event.target.value;
    setLoginDetail({
      ...loginDetail,
      [field]: actualValue,
    });
  };

  const handleReset = () => {
    setLoginDetail({
      username: "",
      password: "",
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Check if both fields are filled
    if (
      loginDetail.username.trim() === "" ||
      loginDetail.password.trim() === ""
    ) {
      toast.error("Please fill all the fields !!!");
      return;
    }

    // Attempt to log in
    login(loginDetail)
      .then((data) => {
        doLogin(data, () => {
          // Attempt to fetch user info after successful login
          getUserInfo(data.user.id)
            .then((userInfo) => {
              if (!userInfo) {
                // This case might not trigger if userInfo is `null` or `undefined`, instead, handle the 404 error
                toast.error("User info not found!");
              }
            })
            .catch((error) => {
              // Check for a 404 error specifically
              if (error.response && error.response.status === 404) {
                // If user info does not exist, create an empty one
                addUserInfo({}, data.user.id)
                  .then(() => {
                    toast.success("User info initialized successfully!");
                  })
                  .catch((error) => {
                    toast.error("Failed to initialize user info!");
                    console.error(error);
                  });
              } else {
                // Handle other errors
                toast.error("Failed to fetch user info!");
                console.error(error);
              }
            });

          // Save the username and password to local storage
          localStorage.setItem("username", loginDetail.username);
          localStorage.setItem("password", loginDetail.password);

          // Set user context and navigate to user dashboard
          userContxtData.setUser({
            data: data.user,
            login: true,
          });
          navigate("/user/dashboard");
        });
        toast.success("Logged in successfully !!!");
      })
      .catch((error) => {
        if (
          error.response &&
          (error.response.status === 400 || error.response.status === 404)
        ) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Something went wrong !!!");
        }
      });
  };

  const handleForgotPassword = () => {
    if (!loginDetail.username.trim()) {
      toast.error("Please enter your email!");
      return;
    }
    console.log("Email sent to:" + loginDetail.username.trim());

    forgotPassword(loginDetail.username)
      .then((response) => {
        toast.success("Password reset email sent to your email !!!");
      })
      .catch((error) => {
        toast.error(
          error.response?.data?.message || "Error sending reset email!"
        );
      });
  };

  return (
    <div>
      <Background />
      <Base>
        <div className="login-container">
          {/* Left Lottie Container */}
          <div className="lottie-container left">
            <MentalHealthL />
          </div>

          {/* Login Card */}
          <div className="login-card-container">
            <div className="login-card">
              <h3>Fill Information to Log In</h3>

              <form onSubmit={handleFormSubmit}>
                <div className="login-form-group">
                  <label htmlFor="username">Email: </label>
                  <input
                    type="username"
                    placeholder="Enter your email"
                    id="username"
                    value={loginDetail.username}
                    onChange={(e) => handleChange(e, "username")}
                  />
                </div>

                <div className="login-form-group">
                  <label htmlFor="password">Password: </label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    id="password"
                    value={loginDetail.password}
                    onChange={(e) => handleChange(e, "password")}
                  />
                </div>

                <div className="forgot-password-container">
                  <button
                    type="button"
                    className="forgot-password-link"
                    onClick={handleForgotPassword}
                    // disabled={!loginDetail.username.trim()}
                  >
                    Forgot Password?
                  </button>
                </div>

                <div className="login-button-container">
                  <button className="login-button" type="submit">
                    Log In
                  </button>
                  <button
                    className="login-reset-button"
                    type="button"
                    onClick={handleReset}
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Lottie Container */}
          <div className="lottie-container right">
            <LoginL />
          </div>
        </div>
      </Base>
    </div>
  );
};

export default Login;
