import React from "react";
import AppointmentDashboard from "./pages/AppointmentDashboard";
import Background from "../components/basicComponents/Background";
import Base from "../components/Base";
import { Route, Routes } from "react-router-dom";
import { Nav } from "reactstrap";
import Navbar from "./components/Navbar";

const AppointMainPage = () => {
  return (
    <div>
      <Background />
      <Base>
        <Navbar className="mt-24" />
        <div className="main">
          <Routes>
            <Route path="/" element={<AppointmentDashboard />} />
          </Routes>
        </div>
      </Base>
    </div>
  );
};

export default AppointMainPage;
