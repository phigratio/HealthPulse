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
        <NavLink to="/ecommerce/">Medicine</NavLink>
      </div>
      <ul className="cb-navbar-ul">
        <li>
          <NavLink to="/ecommerce/" activeclassname="active">
            Home
          </NavLink>
        </li>
        {userIsDoctor && (
          <>
            <li>
              <NavLink to="/appoint/doctor-dashboard" activeclassname="active">
                Address & Payment
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
            My orders
          </NavLink>
        </li>
        {userId && (
          <li>
            <NavLink
              to={`/appoint/user-prescriptions/${userId}`}
              activeclassname="active"
            >
              Cart
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
