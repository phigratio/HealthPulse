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
import NextAppointments from "./doctor/NextAppointments";
import FindBooking from "./patient/FindBooking";
import CreatePrescription from "./doctor/CreatePrescription";
import UserPrescriptions from "./patient/UserPrescriptions";
import PatientHistory from "./doctor/PatientHistory";
import MyVideoChat from "./components/MyVideoChat";
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
            <Route
              path="/doctor-next-appointments"
              element={<NextAppointments />}
            />
            <Route path="/patient-bookings" element={<FindBooking />} />
            <Route
              path="/create-prescription"
              element={<CreatePrescription />}
            />

            <Route
              path="/user-prescriptions/:userId"
              element={<UserPrescriptions />}
            />
            <Route path="/patient-history" element={<PatientHistory />} />
            <Route path="/video-chat" element={<MyVideoChat />} />
          </Routes>
        </div>
      </Base>
    </div>
  );
};

export default AppointMainPage;
