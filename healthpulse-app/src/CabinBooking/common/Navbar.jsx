import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { isLoggedIn } from "../../auth";
import "./style/Navbar.css"; // Import the CSS file

function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in when the component is mounted
    setLoggedIn(isLoggedIn());
  }, []);

  return (
    <nav className="cb-navbar mt-16">
      <div className="cb-navbar-brand">
        <NavLink to="/cabin-booking/">Book Cabin</NavLink>
      </div>
      <ul className="cb-navbar-ul">
        <li>
          <NavLink to="/cabin-booking/" activeclassname="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/cabin-booking/rooms" activeclassname="active">
            Rooms
          </NavLink>
        </li>
        {loggedIn && (
          <li>
            <NavLink to="/cabin-booking/find-booking" activeclassname="active">
              Find my Booking
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
