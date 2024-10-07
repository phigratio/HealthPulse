import React, { useEffect, useState, useContext } from "react";
import { NavLink as ReactLink, useNavigate } from "react-router-dom";
import logo from "../../images/logo/HealthPulseLogo3-removebg.png";
import defaultUserImage from "../../images/default/user.png";
import "../../style/CustomNavbar.css";
import { getCurrentUserDetail, isLoggedIn, doLogout } from "../../auth";
import userContext from "../../context/userContext";
import { BASE_URL } from "../../service/helper";
import "@fortawesome/fontawesome-free/css/all.min.css";
import NotificationPanel from "../../Notifications/Notification";

const CustomNavbar = () => {
  const userContextData = useContext(userContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false); // Initialize as null

  useEffect(() => {
    setLogin(isLoggedIn());
    const currentUser = getCurrentUserDetail();
    setUser(currentUser || {}); // Set to an empty object if null
  }, [login]);

  const logout = () => {
    doLogout(() => {
      setLogin(false);
      userContextData.setUser({
        data: null,
        login: false,
      });
      navigate("/");
    });
  };

  const isDoctor = user?.roles?.some((role) => role.id === 503);
  const isAdmin = user?.roles?.some((role) => role.id === 501);

  const handleUserImageClick = () => {
    if (login) {
      navigate(`/user/my-profile/${user.id}`);
    } else {
      navigate("/login");
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="cn-custom-navbar fixed-top">
      <div className="cn-navbar-content">
        <div className="cn-navbar-brand">
          <ReactLink
            to={login ? "/user/dashboard" : "/"}
            className="cn-navbar-brand-link"
          >
            <img
              src={logo}
              alt="Health Pulse Logo"
              className="cn-navbar-logo"
            />
            <span className="cn-brand-text">HealthPulse</span>
          </ReactLink>
        </div>

        <nav className={`cn-navbar-menu ${isOpen ? "open" : ""}`}>
          <ul className="cn-navbar-nav">
            <li className="cn-nav-item">
              <ReactLink className="cn-nav-link-light" to="/about">
                About
              </ReactLink>
            </li>
            <li className="cn-nav-item">
              <ReactLink className="cn-nav-link-light" to="/blogs">
                Blogs
              </ReactLink>
            </li>
            <li className="cn-nav-item">
              <ReactLink className="cn-nav-link-light" to="/appoint">
                Doctor
              </ReactLink>
            </li>
            <li className="cn-nav-item">
              <ReactLink className="cn-nav-link-light" to="/cabin-booking">
                Cabin
              </ReactLink>
            </li>

            <li className="cn-nav-item">
              <ReactLink className="cn-nav-link-light" to="/ecommerce">
                Medicine Shop
              </ReactLink>
            </li>

            <li className="cn-nav-item dropdown ">
              <button className="cn-dropdown-toggle services-text">
                Services
              </button>
              <ul className="cn-dropdown-menu">
                <li>
                  <ReactLink
                    className="cn-dropdown-item"
                    to="/service/doctor-chat-bot"
                  >
                    Doctor Chat Bot
                  </ReactLink>
                </li>
                <li>
                  <ReactLink
                    className="cn-dropdown-item"
                    to="/service/health-calculator"
                  >
                    Health Calculator
                  </ReactLink>
                </li>
                <li>
                  <ReactLink
                    className="cn-dropdown-item"
                    to="/service/kids-corner"
                  >
                    Kids Corner
                  </ReactLink>
                </li>
                <li>
                  <ReactLink className="cn-dropdown-item" to="/appoint">
                    Book Doctor
                  </ReactLink>
                </li>
                <li>
                  <ReactLink className="cn-dropdown-item" to="/donors">
                    Blood Donors
                  </ReactLink>
                </li>
                <li>
                  <ReactLink className="cn-dropdown-item" to="/medication">
                    Medication Reminder
                  </ReactLink>
                </li>
                <li>
                  <ReactLink className="cn-dropdown-item" to="/tracker">
                    Health Tracker
                  </ReactLink>
                </li>
                <li>
                  <ReactLink
                    className="cn-dropdown-item"
                    to="/service/prescription-analyzer"
                  >
                    Prescription Analayzer
                  </ReactLink>
                </li>
                <li>
                  <ReactLink
                    className="cn-dropdown-item"
                    to="/service/nearest-hospital"
                  >
                    Nearest Hospital
                  </ReactLink>
                </li>
                <li>
                  <ReactLink
                    className="cn-dropdown-item"
                    to="/service/ml-models"
                  >
                    Disease Recognition AI
                  </ReactLink>
                </li>
                <li>
                  <ReactLink
                    className="cn-dropdown-item"
                    to="/service/weatherapp"
                  >
                    Weather AI
                  </ReactLink>
                </li>
                <li>
                  <ReactLink className="cn-dropdown-item" to="/service/newsapp">
                    Health News
                  </ReactLink>
                </li>
                <li>
                  <ReactLink
                    className="cn-dropdown-item"
                    to="/service/mentalhealth"
                  >
                    Mental Health AI
                  </ReactLink>
                </li>
                <li>
                  <ReactLink
                    className="cn-dropdown-item"
                    to="/service/food-suggestion"
                  >
                    Food Suggestion
                  </ReactLink>
                </li>
                <li>
                  <ReactLink className="cn-dropdown-item" to="/service/pet">
                    Pet Health
                  </ReactLink>
                </li>
                <li>
                  <ReactLink className="cn-dropdown-item" to="/service/quiz">
                    Health Quiz Game
                  </ReactLink>
                </li>
              </ul>
            </li>

            {login && isDoctor && (
              <li className="cn-nav-item">
                <ReactLink className="cn-nav-link-light" to="/user/my-posts">
                  My Blogs
                </ReactLink>
              </li>
            )}

            {login && isAdmin && (
              <li className="cn-nav-item">
                <ReactLink className="cn-nav-link-light" to="/admin">
                  Admin-Dashboard
                </ReactLink>
              </li>
            )}

            {login ? (
              <>
                <li className="cn-nav-item">
                  <button
                    onClick={() =>
                      setIsNotificationPanelOpen(!isNotificationPanelOpen)
                    }
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <i className="fas fa-bell"></i>{" "}
                  </button>
                  <NotificationPanel
                    isOpen={isNotificationPanelOpen}
                    onClose={() => setIsNotificationPanelOpen(false)}
                  />
                </li>
                <li className="cn-nav-item">
                  <ReactLink
                    onClick={logout}
                    className="cn-nav-link-light"
                    to="/"
                  >
                    Log Out
                  </ReactLink>
                </li>
              </>
            ) : (
              <ul className="cn-navbar-nav">
                <li className="cn-nav-item">
                  <ReactLink className="cn-nav-link-light" to="/login">
                    Log In
                  </ReactLink>
                </li>
                <li className="cn-nav-item">
                  <ReactLink className="cn-nav-link-light" to="/signup">
                    Sign Up
                  </ReactLink>
                </li>
              </ul>
            )}
          </ul>
        </nav>

        <div
          className="cn-navbar-user-image-container"
          onClick={handleUserImageClick}
        >
          <img
            src={
              user?.imageName
                ? `${BASE_URL}/users/user/image/${user.imageName}`
                : defaultUserImage
            }
            alt="User"
            className="cn-navbar-user-image"
          />
        </div>
      </div>
    </header>
  );
};

export default CustomNavbar;
