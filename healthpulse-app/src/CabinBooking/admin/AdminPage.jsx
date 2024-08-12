import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../services/ApiService";
import { getUserData } from "../../service/user-service";
import "./style/AdminPage.css";

const AdminPage = () => {
  const [adminName, setAdminName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminName = async () => {
      try {
        const response = getUserData();
        // console.log(response);
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
          onClick={() => navigate("/admin/manage-rooms")}
        >
          Manage Rooms
        </button>
        <button
          className="cb-admin-button"
          onClick={() => navigate("/admin/manage-bookings")}
        >
          Manage Bookings
        </button>
      </div>
    </div>
  );
};

export default AdminPage;
