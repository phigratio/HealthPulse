import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../service/user-service";
import AppointService from "../service/AppointService";
import "./style/ResultAppointment.css";
import { FaStar } from "react-icons/fa"; // Import star icon

const ResultAppointment = ({ appointmentResults }) => {
  const navigate = useNavigate();
  const [doctorNames, setDoctorNames] = useState({});
  const [doctorReviews, setDoctorReviews] = useState({});

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

  // Function to calculate average rating
  const calculateAverageRating = (reviews = []) => {
    if (reviews.length === 0) return { avg: 0, count: 0 };
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return {
      avg: (total / reviews.length).toFixed(1),
      count: reviews.length,
    };
  };

  useEffect(() => {
    const fetchDoctorData = async () => {
      const names = {};
      const reviews = {};
      for (const appointment of appointmentResults) {
        try {
          const doctor = await getUser(appointment.doctorId);
          names[appointment.doctorId] = doctor.name;

          // Fetch reviews for each doctor
          const reviewsData = await AppointService.getReviewsByDoctorId(
            appointment.doctorId
          );
          reviews[appointment.doctorId] = reviewsData || [];
        } catch (error) {
          console.error(
            `Error fetching data for doctor with ID ${appointment.doctorId}:`,
            error
          );
          names[appointment.doctorId] = "Unknown Doctor"; // Fallback if there's an error
          reviews[appointment.doctorId] = [];
        }
      }
      setDoctorNames(names);
      setDoctorReviews(reviews);
    };

    if (appointmentResults && appointmentResults.length > 0) {
      fetchDoctorData();
    }
  }, [appointmentResults]);

  const handleBookAppointment = (appointmentId) => {
    navigate(`/appoint/details/${appointmentId}`);
  };

  return (
    <section className="result-appointment-container">
      {appointmentResults && appointmentResults.length > 0 ? (
        <div className="result-appointment-list">
          {appointmentResults.map((appointment) => {
            const { avg, count } = calculateAverageRating(
              doctorReviews[appointment.doctorId]
            );
            return (
              <div key={appointment.id} className="result-appointment-item">
                <div className="result-appointment-details">
                  <h3>
                    Doctor Specialization: {appointment.doctorSpecialization}
                  </h3>
                  <p>
                    Date:{" "}
                    {formatDateForBackend(
                      new Date(appointment.appointmentDate)
                    )}
                  </p>
                  <p>
                    Doctor Name:{" "}
                    {doctorNames[appointment.doctorId] || "Loading..."}
                  </p>
                  <p>Time: {formatTime(appointment.appointmentTime)}</p>
                  <p>Consultation Fee: {appointment.consultationFee} BDT</p>
                  <p className="result-appointment-rating">
                    Average Rating:{" "}
                    <span className="result-appointment-star-rating">
                      {[...Array(5)].map((_, index) => (
                        <FaStar
                          key={index}
                          className={`result-appointment-star ${
                            index < avg ? "filled" : ""
                          }`}
                        />
                      ))}
                    </span>{" "}
                    ({count} reviews)
                  </p>
                </div>

                {appointment.status === "AVAILABLE" ? (
                  <button
                    className="result-appointment-book-button"
                    onClick={() => handleBookAppointment(appointment.id)}
                  >
                    Book Now
                  </button>
                ) : (
                  <button
                    className="result-appointment-book-button"
                    onClick={() => handleBookAppointment(appointment.id)}
                  >
                    See Details
                  </button>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <p>No available appointments for the selected criteria.</p>
      )}
    </section>
  );
};

export default ResultAppointment;
