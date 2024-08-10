import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./style/Navbar.css"; // Import the CSS file

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="cb-navbar mt-16">
      <div className="cb-navbar-brand">
        <NavLink to="/home">Phegon Hotel</NavLink>
      </div>
      <ul className="cb-navbar-ul">
        <li>
          <NavLink to="/home" activeclassname="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/rooms" activeclassname="active">
            Rooms
          </NavLink>
        </li>
        <li>
          <NavLink to="/find-booking" activeclassname="active">
            Find my Booking
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
