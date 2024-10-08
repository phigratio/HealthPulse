import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import AppointService from "../service/AppointService";
import { getUser, getUserData } from "../../service/user-service";
import "./style/AppointmentDetailsPage.css";

// Load Stripe with your public key
const stripePromise = loadStripe(
  "pk_test_51PLlWk04ex3Ui1JlZAO8ZRN2sBG7k7Oqag4GFBPKZGmL5T5tLF9OVwTBtsPbeZiJ2uyh5vtz63KnerVuGujmGFf0004JWFWuMp"
);

// Main Stripe Payment Form Component
const StripePaymentForm = ({ amount, onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.error(error);
      setIsLoading(false);
      return;
    }

    // Create the PaymentIntent
    const response = await fetch(
      "http://localhost:8081/apiserver/stripe/charge",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parseFloat(amount) * 100, // Convert to cents
        }),
      }
    );

    const result = await response.json();

    if (result.error) {
      console.error("Payment failed:", result.error);
      setIsLoading(false);
      return;
    }

    const { clientSecret } = result;

    const confirmResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod.id,
    });

    if (confirmResult.error) {
      console.error("Payment failed:", confirmResult.error.message);
    } else if (
      confirmResult.paymentIntent &&
      confirmResult.paymentIntent.status === "succeeded"
    ) {
      console.log("Payment successful!");
      onSuccess();
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="payment-form">
        <div className="form-group">
          <label>Consultation Fee</label>
          <input
            type="number"
            value={amount}
            readOnly
            style={{ backgroundColor: "#f0f0f0" }}
          />
        </div>
        <div className="form-group">
          <CardElement
            style={{
              padding: "10px",
              border: "1px solid #E5E7EB",
              borderRadius: "8px",
            }}
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </form>
  );
};

const AppointmentDetailsPage = () => {
  const { appointmentId } = useParams();
  const [appointment, setAppointment] = useState(null);
  const [doctorDetails, setDoctorDetails] = useState({});
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointmentAndDoctor = async () => {
      try {
        const appointmentData = await AppointService.getAppointmentById(
          appointmentId
        );
        setAppointment(appointmentData);

        if (appointmentData.doctorId) {
          const doctor = await getUser(appointmentData.doctorId);
          setDoctorDetails(doctor);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setDoctorDetails({ name: "Unknown Doctor" });
      }
    };

    fetchAppointmentAndDoctor();
  }, [appointmentId]);

  const handleBookNow = () => {
    setShowPaymentForm(true);
  };

  const handlePaymentSuccess = async () => {
    const user = getUserData();
    if (!user) {
      console.error("User not found");
      return;
    }

    try {
      await AppointService.bookAppointment(appointmentId, user.id);
      toast.success("Appointment booked successfully!");
      setPaymentSuccess(true);

      setTimeout(() => {
        navigate("/appoint");
      }, 3000);
    } catch (error) {
      toast.error("Error booking appointment. Please try again.");
      console.error("Error booking appointment:", error);
    }
  };

  if (!appointment) {
    return <div>Loading...</div>;
  }

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
          <p>Consultation Fee: BDT {appointment.consultationFee}</p>
          {appointment.status === "AVAILABLE" && !showPaymentForm && (
            <button onClick={handleBookNow} className="book-now-button">
              Book Now
            </button>
          )}

          {showPaymentForm && (
            <Elements stripe={stripePromise}>
              <StripePaymentForm
                amount={appointment.consultationFee}
                onSuccess={handlePaymentSuccess}
              />
            </Elements>
          )}

          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetailsPage;
