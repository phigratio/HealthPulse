import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppointService from "../service/AppointService";
import { getUser, getUserData } from "../../service/user-service";
import "./style/AppointmentDetailsPage.css";
import { FaStar } from "react-icons/fa"; // Import star icon

const AppointmentDetailsPage = () => {
  const { appointmentId } = useParams(); // Extract the appointment ID from the URL
  const [appointment, setAppointment] = useState(null); // State to hold the appointment details
  const [doctorDetails, setDoctorDetails] = useState({}); // State to hold the doctor's details
  const [reviews, setReviews] = useState([]); // State to hold the reviews
  const [users, setUsers] = useState({}); // State to hold user details
  const navigate = useNavigate(); // Hook to programmatically navigate

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

          // Fetch reviews for the doctor
          const reviewsData = await AppointService.getReviewsByDoctorId(
            appointmentData.doctorId
          );
          setReviews(reviewsData || []);

          // Fetch user details for each review
          const userIds = reviewsData.map((review) => review.userId);
          const uniqueUserIds = [...new Set(userIds)]; // Remove duplicate userIds

          const userPromises = uniqueUserIds.map((id) => getUser(id));
          const usersData = await Promise.all(userPromises);

          const usersMap = usersData.reduce((acc, user) => {
            acc[user.id] = user;
            return acc;
          }, {});

          setUsers(usersMap);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setDoctorDetails({ name: "Unknown Doctor" }); // Fallback if there's an error
      }
    };

    fetchAppointmentAndDoctor();
  }, [appointmentId]);

  const bookAppointment = async () => {
    const user = getUserData();
    if (!user) {
      console.error("User not found");
      return;
    }

    try {
      await AppointService.bookAppointment(appointmentId, user.id);
      toast.success("Appointment booked successfully!");

      // Delay navigation by 3 seconds
      setTimeout(() => {
        navigate("/appoint");
      }, 3000);
    } catch (error) {
      toast.error("Error booking appointment. Please try again.");
      console.error("Error booking appointment:", error);
    }
  };

  // Function to calculate average rating
  const calculateAverageRating = (reviews = []) => {
    if (reviews.length === 0) return { avg: 0, count: 0 };
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return {
      avg: parseFloat((total / reviews.length).toFixed(1)),
      count: reviews.length,
    };
  };

  if (!appointment) {
    return <div>Loading...</div>; // Display a loading message until the data is fetched
  }

  const { avg, count } = calculateAverageRating(reviews);

  return (
    <div className="ad-details-page">
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
          {appointment.status === "AVAILABLE" && (
            <button onClick={bookAppointment} className="book-now-button">
              Book Now
            </button>
          )}
          <div className="reviews-section">
            <h3>Doctor Reviews</h3>
            <div className="rating-summary">
              <p>Average Rating: {avg} / 5</p>
              <div className="stars">
                {
                  // Display the star rating, filling stars up to the average rating and empty stars for the rest
                  [...Array(5)].map((_, index) => {
                    const filledStars = Math.floor(avg); // Number of full stars
                    const isHalfStar =
                      avg - filledStars > 0 && index === filledStars; // Check for half-star

                    return (
                      <FaStar
                        key={index}
                        className={`star ${
                          index < filledStars ? "filled" : ""
                        } ${isHalfStar ? "half-filled" : ""}`}
                      />
                    );
                  })
                }
              </div>

              <p>({count} reviews)</p>
            </div>
            <div className="reviews-list">
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <div key={review.id} className="review-card">
                    <div className="review-header">
                      <p className="review-username">
                        <strong>User Name:</strong>{" "}
                        {users[review.userId]?.name || "Unknown User"}
                      </p>
                      <div className="review-rating">
                        {[...Array(review.rating)].map((_, index) => (
                          <FaStar key={index} className="star filled" />
                        ))}
                      </div>
                    </div>
                    <p className="review-text">
                      <strong>Review:</strong> {review.reviewText}
                    </p>
                  </div>
                ))
              ) : (
                <p>No reviews available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AppointmentDetailsPage;
