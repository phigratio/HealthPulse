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
import logo from "../logo.jpeg";
import "./CustomNavbar.css";

const CustomNavbar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <div>
      <Navbar className="custom-navbar" expand="md">
        <NavbarBrand className="nav-link-medium" tag={ReactLink} to="/">
          <img src={logo} alt="Logo" className="navbar-logo" />
          HealthPulse{" "}
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
              <NavLink
                className="nav-link-light
              "
                tag={ReactLink}
                to="/login"
              >
                Login
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className="nav-link-light
              "
                tag={ReactLink}
                to="/signup"
              >
                Sign Up
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className="nav-link-light
              "
                tag={ReactLink}
                to="/bmi"
              >
                BMI Calculator
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Option 1</DropdownItem>
                <DropdownItem>Option 2</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
        <NavbarText>Simple Text</NavbarText>
      </Navbar>
    </div>
  );
};

export default CustomNavbar;
