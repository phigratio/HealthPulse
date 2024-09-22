import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUser, getUserData } from "../../service/user-service";
import AppointService from "../service/AppointService";
import "./style/ResultAppointment.css";
import { FaStar } from "react-icons/fa";

const ResultAppointment = ({ appointmentResults }) => {
  const navigate = useNavigate();
  const [doctorNames, setDoctorNames] = useState({});
  const [doctorReviews, setDoctorReviews] = useState({});
  const [loading, setLoading] = useState(true);
  const currentUser = getUserData();

  const formatDateForBackend = (date) => {
    const utcDate = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );
    return utcDate.toISOString().split("T")[0];
  };

  const formatTime = (dateTime) => {
    const timePart = new Date(dateTime).toLocaleTimeString("en-US", {
      hour12: false,
    });
    return timePart;
  };

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
      setLoading(true);
      try {
        const names = {};
        const reviews = {};

        const fetchPromises = appointmentResults.map(async (appointment) => {
          try {
            const doctor = await getUser(appointment.doctorId);
            names[appointment.doctorId] = doctor.name;

            const reviewsData = await AppointService.getReviewsByDoctorId(
              appointment.doctorId
            );
            reviews[appointment.doctorId] = reviewsData || [];
          } catch (error) {
            console.error(
              `Error fetching data for doctor with ID ${appointment.doctorId}:`,
              error
            );
            names[appointment.doctorId] = "Unknown Doctor";
            reviews[appointment.doctorId] = [];
          }
        });

        await Promise.all(fetchPromises);
        setDoctorNames(names);
        setDoctorReviews(reviews);
      } catch (error) {
        console.error("Error fetching doctor data", error);
      } finally {
        setLoading(false);
      }
    };

    if (appointmentResults && appointmentResults.length > 0) {
      fetchDoctorData();
    }
  }, [appointmentResults]);

  const handleBookAppointment = (appointmentId) => {
    navigate(`/appoint/details/${appointmentId}`);
  };

  const handleJoinMeeting = (videoCallUrl) => {
    window.open(videoCallUrl, "_blank"); // Open the video call URL in a new tab
  };

  const handleStartMeeting = (appointmentId) => {
    navigate(`/appoint/video-chat?appointmentId=${appointmentId}`);
  };

  return (
    <section className="result-appointment-container">
      {loading ? (
        <p>Loading appointments...</p>
      ) : appointmentResults && appointmentResults.length > 0 ? (
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
                            index < Math.floor(avg) ? "filled" : ""
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

                {appointment.status === "BOOKED" &&
                  appointment.doctorId === currentUser.id && (
                    <button
                      className="result-appointment-start-meeting-button"
                      onClick={() => handleStartMeeting(appointment.id)}
                    >
                      Start Meeting
                    </button>
                  )}

                {appointment.status === "BOOKED" &&
                  appointment.patientId === currentUser.id &&
                  appointment.videoCallUrl && ( // Ensure videoCallUrl is truthy
                    <button
                      className="result-appointment-start-meeting-button"
                      onClick={() =>
                        handleJoinMeeting(appointment.videoCallUrl)
                      }
                    >
                      Join Meeting
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
