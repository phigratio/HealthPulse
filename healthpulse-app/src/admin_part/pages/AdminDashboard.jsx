import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserData } from "../../service/user-service";

const AdminDashboard = () => {
  const [adminName, setAdminName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminName = async () => {
      try {
        const response = getUserData();
        setAdminName(response.name);
      } catch (error) {
        console.error("Error fetching admin details:", error.message);
      }
    };

    fetchAdminName();
  }, []);

  return (
    <div className="cb-admin-page">
      <h1 className="cb-welcome-message">Welcome, {adminName}</h1>
      <div className="cb-admin-actions">
        <button
          className="cb-admin-button"
          onClick={() => navigate("/cabin-booking/admin")}
        >
          Manage Cabin
        </button>
        <button className="cb-admin-button" onClick={() => navigate("/admin")}>
          Manage Users
        </button>
        <button
          className="cb-admin-button"
          onClick={() => navigate("/cabin-booking/admin/manage-bookings")}
        >
          Manage Doctors
        </button>
        <button
          className="cb-admin-button"
          onClick={() => navigate("/cabin-booking/admin/manage-bookings")}
        >
          Manage Blogs
        </button>

        <button
          className="cb-admin-button"
          onClick={() => navigate("/cabin-booking/admin/manage-bookings")}
        >
          Manage Ecommerce
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
