import React from "react";
import AppointmentDashboard from "./pages/AppointmentDashboard";
import Background from "../components/basicComponents/Background";
import Base from "../components/Base";
import { Route, Routes } from "react-router-dom";
import { Nav } from "reactstrap";
import Navbar from "./components/Navbar";
import AppointmentDetailsPage from "./pages/AppointmentDetailsPage";
import AddAppointmentPage from "./pages/AddAppointmentPage";
import DoctorDashboard from "./doctor/DoctorDashboard";
import SeeAppointments from "./patient/SeeAppointments";

const AppointMainPage = () => {
  return (
    <div>
      <Background />
      <Base>
        <Navbar className="mt-24" />
        <div className="main">
          <Routes>
            <Route path="/" element={<AppointmentDashboard />} />
            <Route
              path="/details/:appointmentId"
              element={<AppointmentDetailsPage />}
            />
            <Route path="/add" element={<AddAppointmentPage />} />
            <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
            <Route path="/doctor-bookings" element={<SeeAppointments />} />
          </Routes>
        </div>
      </Base>
    </div>
  );
};

export default AppointMainPage;
