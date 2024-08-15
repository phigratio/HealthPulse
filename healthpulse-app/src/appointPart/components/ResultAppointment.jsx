import React from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../service/helper"; // Adjust if needed
import "./style/ResultAppointment.css";

const ResultAppointment = ({ appointmentResults }) => {
  const navigate = useNavigate();

  const handleBookAppointment = (appointmentId) => {
    // Navigate to the booking page or handle booking logic
    navigate(`/appointments/book/${appointmentId}`);
  };

  return (
    <section className="appointment-results">
      {appointmentResults && appointmentResults.length > 0 ? (
        <div className="appointment-list">
          {appointmentResults.map((appointment) => (
            <div
              key={appointment.id}
              className="appointment-list-item bg-white"
            >
              <div className="appointment-details">
                <h3>
                  Doctor Specialization: {appointment.doctorSpecialization}
                </h3>
                <p>Date: {appointment.appointmentDate}</p>
                <p>Time: {appointment.appointmentTime}</p>
                <p>Status: {appointment.status}</p>
                <p>Consultation Fee: {appointment.consultationFee} BDT</p>
              </div>

              {appointment.status === "AVAILABLE" && (
                <button
                  className="book-now-button"
                  onClick={() => handleBookAppointment(appointment.id)}
                >
                  Book Now
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
