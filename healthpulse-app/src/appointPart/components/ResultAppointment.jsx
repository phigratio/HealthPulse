import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../service/user-service";
import "./style/ResultAppointment.css";

const ResultAppointment = ({ appointmentResults }) => {
  const navigate = useNavigate();
  const [doctorNames, setDoctorNames] = useState({});

  // Function to format the date for backend
  const formatDateForBackend = (date) => {
    const utcDate = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );
    return utcDate.toISOString().split("T")[0]; // Get the date part only (YYYY-MM-DD)
  };

  // Function to extract the time part from the appointment time
  const formatTime = (dateTime) => {
    const timePart = new Date(dateTime).toLocaleTimeString("en-US", {
      hour12: false,
    });
    return timePart;
  };

  useEffect(() => {
    const fetchDoctorNames = async () => {
      const names = {};
      for (const appointment of appointmentResults) {
        try {
          const doctor = await getUser(appointment.doctorId);
          names[appointment.doctorId] = doctor.name;
        } catch (error) {
          console.error(
            `Error fetching doctor with ID ${appointment.doctorId}:`,
            error
          );
          names[appointment.doctorId] = "Unknown Doctor"; // Fallback if there's an error
        }
      }
      setDoctorNames(names);
    };

    if (appointmentResults && appointmentResults.length > 0) {
      fetchDoctorNames();
    }
  }, [appointmentResults]);

  const handleBookAppointment = (appointmentId) => {
    navigate(`/appoint/details/${appointmentId}`);
  };

  return (
    <section className="cb-room-results">
      {appointmentResults && appointmentResults.length > 0 ? (
        <div className="cb-room-list">
          {appointmentResults.map((appointment) => (
            <div key={appointment.id} className="cb-room-list-item bg-white ">
              <div className="cb-room-details">
                <h3>
                  Doctor Specialization: {appointment.doctorSpecialization}
                </h3>
                <p>
                  Date:{" "}
                  {formatDateForBackend(new Date(appointment.appointmentDate))}
                </p>
                <p>
                  Doctor Name:{" "}
                  {doctorNames[appointment.doctorId] || "Loading..."}
                </p>
                <p>Time: {formatTime(appointment.appointmentTime)}</p>
                <p>Consultation Fee: {appointment.consultationFee} BDT</p>
              </div>

              {appointment.status === "AVAILABLE" ? (
                <button
                  className="cb-book-now-button"
                  onClick={() => handleBookAppointment(appointment.id)}
                >
                  Book Now
                </button>
              ) : (
                <button
                  className="cb-book-now-button"
                  onClick={() => handleBookAppointment(appointment.id)}
                >
                  See Details
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No available appointments for the selected criteria.</p>
      )}
    </section>
  );
};

export default ResultAppointment;
