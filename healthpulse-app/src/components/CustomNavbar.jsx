import React, { useState } from "react";
import { NavLink as ReactLink } from "react-router-dom";
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
import logo from "../images/logo/HealthPulseLogo3-removebg.png";
import "../style/CustomNavbar.css";

const CustomNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar className="custom-navbar fixed-top " expand="md">
        <NavbarBrand
          tag={ReactLink}
          to="/"
          className="d-flex align-items-center"
        >
          <img src={logo} alt="Health Pulse Logo" className="navbar-logo" />
          <span className="brand-text">HealthPulse</span>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink className="nav-link-light" tag={ReactLink} to="/about">
                About
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="nav-link-light" tag={ReactLink} to="/login">
                Login
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="nav-link-light" tag={ReactLink} to="/signup">
                Sign Up
              </NavLink>
            </NavItem>
            <NavItem></NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret className="nav-link-light">
                Services
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem tag={ReactLink} to="/service/doctor-chat-bot">
                  Doctor Chat Bot
                </DropdownItem>
                <DropdownItem tag={ReactLink} to="/service/health-calculator">
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
          </Nav>
        </Collapse>
        <NavbarText className="navbar-text">Simple Text</NavbarText>
      </Navbar>
    </div>
  );
};

export default CustomNavbar;
