import React, { useState, useEffect } from "react";
import AppointService from "../service/AppointService";
import { getUserData } from "../../service/user-service";
import ResultAppointment from "../components/ResultAppointment";

const SeeAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch user data to get the user ID
    const fetchAppointments = async () => {
      try {
        const userData = getUserData();
        const userId = userData?.id;

        if (userId) {
          // Fetch appointments by user ID
          const appointments = await AppointService.getBookingsByUserId(userId);
          setAppointments(appointments);
        } else {
          setError("User ID not found.");
        }
      } catch (error) {
        setError("There was an error fetching the appointments.");
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) return <p>Loading appointments...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Your Appointments</h2>
      <ResultAppointment appointmentResults={appointments} />
    </div>
  );
};

export default SeeAppointments;
