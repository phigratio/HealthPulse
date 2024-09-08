import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
// import "./style/Navbar.css"; // Import the CSS file

function TrackerNavbar() {
  const navigate = useNavigate();

  return (
    <nav className="cb-navbar mt-16">
      <div className="cb-navbar-brand">
        <NavLink to="/tracker/">Health Tracker</NavLink>
      </div>
      <ul className="cb-navbar-ul">
        <li>
          <NavLink to="/tracker/" activeclassname="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/tracker/update" activeclassname="active">
            Update
          </NavLink>
        </li>
        <li>
          <NavLink to="/tracker/update-target" activeclassname="active">
            Target
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default TrackerNavbar;
