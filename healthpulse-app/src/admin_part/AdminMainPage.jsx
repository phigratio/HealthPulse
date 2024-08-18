import React from "react";
import Background from "../components/basicComponents/Background";
import Base from "../components/Base";
import { Route, Routes } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";

const AdminMainPage = () => {
  return (
    <div>
      <Background />
      <Base>
        <div className="main mt-24">
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
          </Routes>
        </div>
      </Base>
    </div>
  );
};

export default AdminMainPage;
