import React, { useEffect, useState, useContext } from "react";
import { NavLink as ReactLink, useNavigate } from "react-router-dom";
import logo from "../../images/logo/HealthPulseLogo3-removebg.png";
import defaultUserImage from "../../images/default/user.png";
import "../../style/CustomNavbar.css";
import { getCurrentUserDetail, isLoggedIn, doLogout } from "../../auth";
import userContext from "../../context/userContext";
import { BASE_URL } from "../../service/helper";

const CustomNavbar = () => {
  const userContextData = useContext(userContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    setLogin(isLoggedIn());
    setUser(getCurrentUserDetail());
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

        <button className="cn-navbar-toggler" onClick={toggleMenu}>
          <span className="cn-navbar-toggler-icon">&#9776;</span>
        </button>

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
              <ReactLink className="cn-nav-link-light" to="/cabin-booking">
                Cabin
              </ReactLink>
            </li>
            <li className="cn-nav-item">
              <ReactLink className="cn-nav-link-light" to="/appoint">
                Doctor
              </ReactLink>
            </li>
            {/* <li className="cn-nav-item">
              <ReactLink className="cn-nav-link-light" to="/food">
                Food Shop
              </ReactLink>
            </li> */}

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
                  <ReactLink
                    onClick={logout}
                    className="cn-nav-link-light"
                    to="/"
                  >
                    Log Out
                  </ReactLink>
                </li>

                <li className="cn-nav-item dropdown">
                  <button className="cn-dropdown-toggle">Services</button>
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
                      <ReactLink
                        className="cn-dropdown-item"
                        to="/service/book-doctor"
                      >
                        Book Doctor
                      </ReactLink>
                    </li>
                    <li className="cn-dropdown-divider"></li>
                    {/* <li>
                      <ReactLink
                        className="cn-dropdown-item"
                        to="/service/food-shop"
                      >
                        Food Shop
                      </ReactLink>
                    </li> */}
                  </ul>
                </li>
              </>
            ) : (
              <li className="cn-nav-item">
                <ReactLink className="cn-nav-link-light" to="/login">
                  Log In
                </ReactLink>
              </li>
            )}
          </ul>
        </nav>

        <div
          className="cn-navbar-user-image-container"
          onClick={handleUserImageClick}
        >
          <img
            src={user?.image ? `${BASE_URL}${user.image}` : defaultUserImage}
            alt="User"
            className="cn-navbar-user-image"
          />
        </div>
      </div>
    </header>
  );
};

export default CustomNavbar;
