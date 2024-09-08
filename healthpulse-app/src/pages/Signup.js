

import React, { useState, useEffect } from "react";
import { signUp } from "../service/user-service";
import { toast } from "react-toastify";
import Background from "../components/basicComponents/Background";

import "../style/Signup.css"; // Import the custom CSS
import Base from "../components/Base";
import KitBoxL from "../components/LottieComponents/KitBox";
import RegisterL from "../components/LottieComponents/Register";

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    about: "",
    role: "502", // Default role set to User
  });

  const [error, setError] = useState({
    error: {},
    isError: false,
  });

  useEffect(() => {
    document.title = "Signup";
  }, []);

  const handleChange = (e, property) => {
    setData({
      ...data,
      [property]: e.target.value,
    });
  };

  const resetData = () => {
    setData({
      name: "",
      email: "",
      password: "",
      about: "",
      role: "502", // Reset role to default User
    });
  };

  const submitForm = (e) => {
    e.preventDefault();

    if (error.isError) {
      toast.error("Please fill the form correctly !!!");
      setError({
        error: {},
        isError: false,
      });
      return;
    }

    signUp(data, data.role)
      .then((resp) => {
        console.log("User Registered Successfully");
        toast.success(
          "User Registered Successfully with user id: " + resp.id + " !!!"
        );
        resetData();
        window.location.href = "/login";
      })
      .catch((err) => {
        console.log("User Registration Failed");

        setError({
          error: err,
          isError: true,
        });
      });
  };

  return (
    <div>
      <Background />
      <Base>
        <div className="signup-page">
          <div className="signup-container">
            <div className="lottie-container">
              <KitBoxL />
            </div>
            <div className="signup-form">
              <h3 className="signup-header">Fill Information to Register</h3>
              <form onSubmit={submitForm}>
                <div className="form-group">
                  <label>Name:</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    onChange={(e) => handleChange(e, "name")}
                    value={data.name}
                    className={
                      error.error?.response?.data?.name ? "invalid" : ""
                    }
                  />
                  {error.error?.response?.data?.name && (
                    <div className="form-error">
                      {error.error?.response?.data?.name}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    onChange={(e) => handleChange(e, "email")}
                    value={data.email}
                    className={
                      error.error?.response?.data?.email ? "invalid" : ""
                    }
                  />
                  {error.error?.response?.data?.email && (
                    <div className="form-error">
                      {error.error?.response?.data?.email}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label>Password:</label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    onChange={(e) => handleChange(e, "password")}
                    value={data.password}
                    className={
                      error.error?.response?.data?.password ? "invalid" : ""
                    }
                  />
                  {error.error?.response?.data?.password && (
                    <div className="form-error">
                      {error.error?.response?.data?.password}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label>About:</label>
                  <textarea
                    placeholder="Write about yourself"
                    style={{ height: "10vh" }}
                    onChange={(e) => handleChange(e, "about")}
                    value={data.about}
                    className={
                      error.error?.response?.data?.about ? "invalid" : ""
                    }
                  />
                  {error.error?.response?.data?.about && (
                    <div className="form-error">
                      {error.error?.response?.data?.about}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="role">Role:</label>
                  <select
                    id="role"
                    onChange={(e) => handleChange(e, "role")}
                    value={data.role}
                  >
                    <option value="501">Admin</option>
                    <option value="502">User</option>
                    <option value="503">Doctor</option>
                  </select>
                </div>

                <div className="button-container">
                  <button type="submit" className="signup-button">
                    Register
                  </button>
                  <button
                    type="button"
                    className="reset-button"
                    onClick={resetData}
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>
            <div className="lottie-container">
              <RegisterL />
            </div>
          </div>
        </div>
      </Base>
    </div>
  );
};

export default Signup;
