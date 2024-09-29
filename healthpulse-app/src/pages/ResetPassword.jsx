import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { resetPassword } from "../service/user-service";
import { toast } from "react-toastify";
import Background from "../components/basicComponents/Background";
import Base from "../components/Base";
import "../style/login.css";

import LoginL from "../components/LottieComponents/Login"; // Right Lottie Component
import MentalHealthL from "../components/LottieComponents/MentalHealth";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract the token from the URL
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const [passwordDetails, setPasswordDetails] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  // Handle input change
  const handleChange = (event, field) => {
    const value = event.target.value;
    setPasswordDetails({
      ...passwordDetails,
      [field]: value,
    });
  };

  // Handle form submission
  const handleFormSubmit = (event) => {
    event.preventDefault();

    const { newPassword, confirmPassword } = passwordDetails;

    // Check if both passwords match
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (newPassword.trim() === "" || confirmPassword.trim() === "") {
      toast.error("Please fill both password fields!");
      return;
    }

    // Send request to reset password
    resetPassword(token, newPassword)
      .then(() => {
        toast.success("Password reset successfully!");
        navigate("/login"); // Redirect to login page
      })
      .catch((error) => {
        toast.error(
          error.response?.data?.message || "Error resetting password!"
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

          {/* Reset Password Card */}
          <div className="login-card-container">
            <div className="login-card">
              <h3>Reset Your Password</h3>

              <form onSubmit={handleFormSubmit}>
                <div className="login-form-group">
                  <label htmlFor="newPassword">New Password: </label>
                  <input
                    type="password"
                    placeholder="Enter new password"
                    id="newPassword"
                    value={passwordDetails.newPassword}
                    onChange={(e) => handleChange(e, "newPassword")}
                  />
                </div>

                <div className="login-form-group">
                  <label htmlFor="confirmPassword">Confirm Password: </label>
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    id="confirmPassword"
                    value={passwordDetails.confirmPassword}
                    onChange={(e) => handleChange(e, "confirmPassword")}
                  />
                </div>

                <div className="login-button-container">
                  <button className="login-button" type="submit">
                    Reset Password
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

export default ResetPassword;
