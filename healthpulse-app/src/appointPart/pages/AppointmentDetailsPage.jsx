import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AppointService from "../service/AppointService";
import { getUser } from "../../service/user-service";
import "./style/AppointmentDetailsPage.css";

const AppointmentDetailsPage = () => {
  const { appointmentId } = useParams(); // Extract the appointment ID from the URL
  const [appointment, setAppointment] = useState(null); // State to hold the appointment details
  const [doctorDetails, setDoctorDetails] = useState({}); // State to hold the doctor's details

  useEffect(() => {
    const fetchAppointmentAndDoctor = async () => {
      try {
        // Fetch the appointment details
        const appointmentData = await AppointService.getAppointmentById(
          appointmentId
        );
        setAppointment(appointmentData);

        // Fetch the doctor details if doctorId is available
        if (appointmentData.doctorId) {
          const doctor = await getUser(appointmentData.doctorId);
          setDoctorDetails(doctor);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // Optionally, you can set default values or handle errors here
        setDoctorDetails({ name: "Unknown Doctor" }); // Fallback if there's an error
      }
    };

    fetchAppointmentAndDoctor();
  }, [appointmentId]);

  if (!appointment) {
    return <div>Loading...</div>; // Display a loading message until the data is fetched
  }

  return (
    <div className="ad-details-page">
      {" "}
      <h1>Appointment Details</h1>
      <div className="ad-details-container">
        <div className="ad-details">
          <h2>Doctor Specialization: {appointment.doctorSpecialization}</h2>
          <p>Doctor Name: {doctorDetails.name}</p>
          <p>Doctor Email: {doctorDetails.email}</p>
          <p>Appointment Date: {appointment.appointmentDate}</p>
          <p>Appointment Time: {appointment.appointmentTime}</p>
          <p>Status: {appointment.status}</p>
          <p>Consultation Fee: ${appointment.consultationFee}</p>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetailsPage;
