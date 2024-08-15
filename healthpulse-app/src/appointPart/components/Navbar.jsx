import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="cb-navbar mt-16">
      <div className="cb-navbar-brand">
        <NavLink to="/appoint/">Appoint Doctor</NavLink>
      </div>
      <ul className="cb-navbar-ul">
        <li>
          <NavLink to="/appoint/" activeclassname="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/cabin-booking/rooms" activeclassname="active">
            Rooms
          </NavLink>
        </li>
        <li>
          <NavLink to="/cabin-booking/find-booking" activeclassname="active">
            Find my Booking
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
