import React, { useState, useEffect } from "react";
import AppointService from "../service/AppointService"; // Import the default AppointService
import { getUserData } from "../../service/user-service";
import ResultAppointment from "../components/ResultAppointment";

const FindBooking = () => {
  const [bookingResults, setBookingResults] = useState([]);
  const user = getUserData(); // Get user data from local storage

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        if (user && user.id) {
          const response = await AppointService.getBookingsByUserId(user.id); // Fetch bookings by user ID
          setBookingResults(response); // Set the fetched bookings in state
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, [user]);

  return (
    <div>
      <h2>Your Bookings</h2>
      <ResultAppointment appointmentResults={bookingResults} />{" "}
      {/* Pass results to ResultAppointment */}
    </div>
  );
};

export default FindBooking;
