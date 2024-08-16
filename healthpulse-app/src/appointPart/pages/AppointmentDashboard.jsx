import React, { useState } from "react";
import banner from "../assects/image/banner.webp";
import doctor from "../assects/image/online-doctor.png";
import appointment from "../assects/image/booking.png";
import report from "../assects/image/medical-record.png";
import reminder from "../assects/image/notification.png";
import FindAppointment from "../components/FindAppointment";
import ResultAppointment from "../components/ResultAppointment";

const AppointmentDashboard = () => {
  const [appointmentResults, setAppointmentResults] = useState([]);

  const handleSearchResult = (results) => {
    setAppointmentResults(results);
  };

  return (
    <div className="cb-home">
      {/* HEADER / BANNER ROOM SECTION */}
      <section>
        <header className="cb-header-banner">
          <div className="cb-header-image-container">
            <img src={banner} alt="Phegon Hotel" className="cb-header-image" />
            <div className="cb-overlay-content">
              <h1 className="text-center">
                Appoint Doctor with{" "}
                <span className="cb-phegon-color">Health Pulse </span>
              </h1>
              <br />
              <h3 className="text-center">
                Best Doctors in the world are here to help you
              </h3>
            </div>
          </div>
        </header>
      </section>

      <FindAppointment handleSearchResult={handleSearchResult} />
      <ResultAppointment appointmentResults={appointmentResults} />

      <h2 className="cb-home-services">
        <span className="cb-phegon-color">Health Pulse</span> Ensures Services
      </h2>

      <section className="cb-service-section">
        <div className="cb-service-card">
          <img src={doctor} alt="Virtual Doctor Consultations" />
          <div className="cb-service-details">
            <h3 className="cb-service-title">Virtual Doctor Consultations</h3>
            <p className="cb-service-description">
              Connect with experienced healthcare professionals from the comfort
              of your home. Our virtual consultations are designed to provide
              expert medical advice without the need to visit a clinic.
            </p>
          </div>
        </div>
        <div className="cb-service-card">
          <img src={appointment} alt="Easy Online Appointment Booking" />
          <div className="cb-service-details">
            <h3 className="cb-service-title">
              Easy Online Appointment Booking
            </h3>
            <p className="cb-service-description">
              Schedule your appointments online with just a few clicks. Choose
              your preferred doctor and time slot, and manage your bookings
              effortlessly.
            </p>
          </div>
        </div>
        <div className="cb-service-card">
          <img src={report} alt="Digital Health Records" />
          <div className="cb-service-details">
            <h3 className="cb-service-title">Digital Health Records</h3>
            <p className="cb-service-description">
              Access and manage your medical records securely online. Our
              platform ensures that your health information is easily available
              whenever you need it.
            </p>
          </div>
        </div>
        <div className="cb-service-card">
          <img src={reminder} alt="Appointment Reminders" />
          <div className="cb-service-details">
            <h3 className="cb-service-title">Appointment Reminders</h3>
            <p className="cb-service-description">
              Receive timely reminders for your upcoming appointments. Never
              miss a consultation with our automatic reminder system.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AppointmentDashboard;
