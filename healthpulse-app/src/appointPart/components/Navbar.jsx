import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { isDoctor, getUserData } from "../../service/user-service";

function Navbar() {
  const [userId, setUserId] = useState(null);
  const userIsDoctor = isDoctor();

  useEffect(() => {
    // Retrieve user data from local storage
    const user = getUserData();
    if (user) {
      setUserId(user.id);
    }
  }, []);

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
        {userIsDoctor && (
          <>
            <li>
              <NavLink to="/appoint/doctor-dashboard" activeclassname="active">
                Doctor Dashboard
              </NavLink>
            </li>
            {/* <li>
              <NavLink to="/appoint/patient-history" activeclassname="active">
                Patient History
              </NavLink>
            </li> */}
          </>
        )}
        <li>
          <NavLink to="/appoint/patient-bookings" activeclassname="active">
            Find my Booking
          </NavLink>
        </li>
        {userId && (
          <li>
            <NavLink
              to={`/appoint/user-prescriptions/${userId}`}
              activeclassname="active"
            >
              My Prescriptions
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
