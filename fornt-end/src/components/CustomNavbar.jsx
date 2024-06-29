import React, { useState } from "react";
import { NavLink as ReactLink } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";

const CustomNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar color="dark" dark expand="md" fixed="top">
      <NavbarBrand tag={ReactLink} to="/home">
        Health Pulse
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="me-auto" navbar>
          <NavItem>
            <NavLink tag={ReactLink} to="/about">
              About
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={ReactLink} to="/login">
              Log In
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={ReactLink} to="/signup">
              Sign Up
            </NavLink>
          </NavItem>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              More
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem tag={ReactLink} to="/services">
                Services
              </DropdownItem>
              <DropdownItem>Contact us</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Youtube</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        <NavbarText>Youtube</NavbarText>
      </Collapse>
    </Navbar>
  );
};

export default CustomNavbar;
