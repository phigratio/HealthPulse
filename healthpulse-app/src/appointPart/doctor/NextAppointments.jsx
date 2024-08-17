import React, { useState, useEffect } from "react";
import AppointService from "../service/AppointService"; // Import the default AppointService
import { getUserData } from "../../service/user-service";
import ResultAppointment from "../components/ResultAppointment";

const NextAppointments = () => {
  const [appointmentResults, setAppointmentResults] = useState([]);
  const user = getUserData(); // Get user data from local storage

  useEffect(() => {
    const fetchNextAppointments = async () => {
      try {
        if (user && user.id) {
          const response = await AppointService.getNextAppointmentByDoctorId(
            user.id
          ); // Call the method on the AppointService instance
          setAppointmentResults(response); // Set the fetched appointments in state
        }
      } catch (error) {
        console.error("Error fetching next appointments:", error);
      }
    };

    fetchNextAppointments();
  }, [user]);

  return (
    <div>
      <h2>Next Appointments</h2>
      <ResultAppointment appointmentResults={appointmentResults} />{" "}
      {/* Pass results to ResultAppointment */}
    </div>
  );
};

export default NextAppointments;
