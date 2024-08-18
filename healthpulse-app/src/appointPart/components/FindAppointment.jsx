import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AppointService from "../service/AppointService";
import "./style/FindAppointment.css";

const FindAppointment = ({ handleSearchResult }) => {
  const [date, setDate] = useState(null);
  const [specialization, setSpecialization] = useState("");
  const [specializations, setSpecializations] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSpecializations = async () => {
      try {
        const specs = await AppointService.getAllSpecializations();
        setSpecializations(specs);
      } catch (error) {
        console.error("Error fetching specializations:", error.message);
      }
    };
    fetchSpecializations();
  }, []);

  const showError = (message, timeout = 5000) => {
    setError(message);
    setTimeout(() => {
      setError("");
    }, timeout);
  };

  const formatDateWithoutTimezone = (date) => {
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2); // Months are 0-based
    const day = `0${date.getDate()}`.slice(-2);
    return `${year}-${month}-${day}`;
  };

  const handleSearch = async () => {
    if (!date || !specialization) {
      showError("Please select both date and specialization.");
      return;
    }
    try {
      const formattedDate = formatDateWithoutTimezone(date);
      console.log("calling the service");

      const response = await AppointService.getAvailableAppointments(
        formattedDate,
        specialization
      );
      handleSearchResult(response);
      console.log(response);
      setError("");
    } catch (error) {
      showError("An error occurred: " + error.message);
    }
  };

  return (
    <section>
      <div className="cb-search-container">
        <div className="cb-search-field">
          <label>Date</label>
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select Date"
          />
        </div>

        <div className="cb-search-field">
          <label>Specialization</label>
          <select
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
          >
            <option disabled value="">
              Select Specialization
            </option>
            {specializations.map((spec) => (
              <option key={spec} value={spec}>
                {spec}
              </option>
            ))}
          </select>
        </div>

        <button className="cb-home-search-button" onClick={handleSearch}>
          Search Appointments
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
    </section>
  );
};

export default FindAppointment;
