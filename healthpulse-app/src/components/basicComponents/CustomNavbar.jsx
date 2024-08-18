import React, { useEffect, useState, useContext } from "react";
import { NavLink as ReactLink, useNavigate } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";
import logo from "../../images/logo/HealthPulseLogo3-removebg.png";
import defaultUserImage from "../../images/default/user.png"; // Add a default user image
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
  const toggle = () => setIsOpen(!isOpen);

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

  return (
    <div>
      <Navbar className="custom-navbar fixed-top" expand="md">
        {login ? (
          <NavbarBrand
            tag={ReactLink}
            to="/user/dashboard"
            className="d-flex align-items-center"
          >
            <img src={logo} alt="Health Pulse Logo" className="navbar-logo" />
            <span className="brand-text">HealthPulse</span>
          </NavbarBrand>
        ) : (
          <NavbarBrand
            tag={ReactLink}
            to="/"
            className="d-flex align-items-center"
          >
            <img src={logo} alt="Health Pulse Logo" className="navbar-logo" />
            <span className="brand-text">HealthPulse</span>
          </NavbarBrand>
        )}
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink className="nav-link-light" tag={ReactLink} to="/about">
                About
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="nav-link-light" tag={ReactLink} to="/blogs">
                Blogs
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                className="nav-link-light"
                tag={ReactLink}
                to="/cabin-booking"
              >
                Cabin
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink className="nav-link-light" tag={ReactLink} to="/appoint">
                Doctor
              </NavLink>
            </NavItem>

            {/* <NavItem>
              <NavLink className="nav-link-light" tag={ReactLink} to="/food">
                Food Shop
              </NavLink>
            </NavItem> */}

            {login && isDoctor && (
              <NavItem>
                <NavLink
                  className="nav-link-light"
                  tag={ReactLink}
                  to="/user/my-posts"
                >
                  My Blogs
                </NavLink>
              </NavItem>
            )}

            {login && isAdmin && (
              <NavItem>
                <NavLink className="nav-link-light" tag={ReactLink} to="/admin">
                  Admin-Dashboard
                </NavLink>
              </NavItem>
            )}

            {login ? (
              <>
                {/* <NavItem>
                  <NavLink
                    className="nav-link-light"
                    tag={ReactLink}
                    to="/cart"
                  >
                    Cart
                  </NavLink>
                </NavItem> */}

                <NavItem>
                  <NavLink
                    onClick={logout}
                    className="nav-link-light"
                    tag={ReactLink}
                    to="/"
                  >
                    Log Out
                  </NavLink>
                </NavItem>

                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret className="nav-link-light">
                    Services
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem tag={ReactLink} to="/service/doctor-chat-bot">
                      Doctor Chat Bot
                    </DropdownItem>
                    <DropdownItem
                      tag={ReactLink}
                      to="/service/health-calculator"
                    >
                      Health Calculator
                    </DropdownItem>
                    <DropdownItem tag={ReactLink} to="/service/kids-corner">
                      Kids Corner
                    </DropdownItem>
                    <DropdownItem tag={ReactLink} to="/service/book-doctor">
                      Book Doctor
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>Reset</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </>
            ) : (
              <>
                <NavItem>
                  <NavLink
                    className="nav-link-light"
                    tag={ReactLink}
                    to="/login"
                  >
                    LogIn
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink
                    className="nav-link-light"
                    tag={ReactLink}
                    to="/signup"
                  >
                    Sign Up
                  </NavLink>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
        <div className="navbar-user-image-container">
          <img
            src={
              login && user?.imageName
                ? BASE_URL + "/users/user/image/" + user.imageName
                : defaultUserImage
            }
            alt="User"
            className="navbar-user-image"
            onClick={handleUserImageClick}
          />
        </div>
      </Navbar>
    </div>
  );
};

export default CustomNavbar;
