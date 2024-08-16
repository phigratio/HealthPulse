import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppointService from "../service/AppointService";
import { getUserData } from "../../service/user-service";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for Toastify
import "./style/AddAppointmentPage.css"; // Create this CSS file for styling

const AddAppointmentPage = () => {
  const navigate = useNavigate();
  const [appointmentDetails, setAppointmentDetails] = useState({
    doctorSpecialization: "",
    appointmentDate: "",
    appointmentTime: "",
    consultationFee: "",
  });
  const [specializations, setSpecializations] = useState([]);
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [newSpecialization, setNewSpecialization] = useState("");

  useEffect(() => {
    const fetchSpecializations = async () => {
      try {
        const specializations = await AppointService.getAllSpecializations();
        setSpecializations(specializations);
      } catch (error) {
        console.error("Error fetching specializations:", error.message);
      }
    };
    fetchSpecializations();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "doctorSpecialization") {
      setIsOtherSelected(value === "Other");
    }

    setAppointmentDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleNewSpecializationChange = (e) => {
    setNewSpecialization(e.target.value);
  };

  const formatDateTime = (date, time) => {
    return `${date}T${time}:00`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = getUserData();
      if (!user) {
        throw new Error("User not logged in");
      }
      console.log("User data from AddAppointPage:", user);

      const doctorId = user.id; // Assuming user.id is the doctorId
      const specialization = isOtherSelected
        ? newSpecialization
        : appointmentDetails.doctorSpecialization;
      const formattedDateTime = formatDateTime(
        appointmentDetails.appointmentDate,
        appointmentDetails.appointmentTime
      );

      const appointmentData = {
        ...appointmentDetails,
        doctorSpecialization: specialization,
        doctorId,
        appointmentTime: formattedDateTime, // Add formatted datetime
      };

      console.log("Appointment data:", appointmentData);

      await AppointService.createAppointment(appointmentData);
      toast.success("Appointment added successfully!");

      setTimeout(() => {
        navigate("/appoint"); // Redirect to the appointments page or any other relevant page
      }, 2000); // Wait for 2 seconds before redirecting
    } catch (error) {
      console.error("Error adding appointment:", error.message);
      toast.error("Failed to add appointment. Please try again.");
    }
  };

  return (
    <div className="cb-add-appointment-page">
      <h2>Add Appointment</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="doctorSpecialization">Specialization:</label>
          <select
            id="doctorSpecialization"
            name="doctorSpecialization"
            value={appointmentDetails.doctorSpecialization}
            onChange={handleChange}
          >
            <option value="">Select Specialization</option>
            {specializations.map((spec) => (
              <option key={spec} value={spec}>
                {spec}
              </option>
            ))}
            <option value="Other">Other</option>
          </select>
        </div>

        {isOtherSelected && (
          <div className="form-group">
            <label htmlFor="newSpecialization">New Specialization:</label>
            <input
              type="text"
              id="newSpecialization"
              name="newSpecialization"
              value={newSpecialization}
              onChange={handleNewSpecializationChange}
              required={isOtherSelected}
            />
          </div>
        )}

        <div className="form-group">
          <label htmlFor="appointmentDate">Date:</label>
          <input
            type="date"
            id="appointmentDate"
            name="appointmentDate"
            value={appointmentDetails.appointmentDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="appointmentTime">Time:</label>
          <input
            type="time"
            id="appointmentTime"
            name="appointmentTime"
            value={appointmentDetails.appointmentTime}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="consultationFee">Consultation Fee:</label>
          <input
            type="number"
            id="consultationFee"
            name="consultationFee"
            value={appointmentDetails.consultationFee}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Add Appointment</button>
      </form>
      <ToastContainer /> {/* Add this line to display toast notifications */}
    </div>
  );
};

export default AddAppointmentPage;
