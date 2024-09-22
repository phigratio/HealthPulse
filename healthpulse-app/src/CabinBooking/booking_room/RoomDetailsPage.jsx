// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import ApiService from "../services/ApiService";
// import DatePicker from "react-datepicker";
// import { getUserData } from "../../service/user-service";
// // import 'react-datepicker/dist/react-datepicker.css';
// import "./style/RoomDetailsPage.css";
// import { BASE_URL } from "../../service/helper";
// const RoomDetailsPage = () => {
//   const navigate = useNavigate(); // Access the navigate function to navigate
//   const { roomId } = useParams(); // Get room ID from URL parameters
//   const [roomDetails, setRoomDetails] = useState(null);
//   const [isLoading, setIsLoading] = useState(true); // Track loading state
//   const [error, setError] = useState(null); // Track any errors
//   const [checkInDate, setCheckInDate] = useState(null); // State variable for check-in date
//   const [checkOutDate, setCheckOutDate] = useState(null); // State variable for check-out date
//   const [numAdults, setNumAdults] = useState(1); // State variable for number of adults
//   const [numChildren, setNumChildren] = useState(0); // State variable for number of children
//   const [totalPrice, setTotalPrice] = useState(0); // State variable for total booking price
//   const [totalGuests, setTotalGuests] = useState(1); // State variable for total number of guests
//   const [showDatePicker, setShowDatePicker] = useState(false); // State variable to control date picker visibility
//   const [userId, setUserId] = useState(""); // Set user id
//   const [showMessage, setShowMessage] = useState(false); // State variable to control message visibility
//   const [confirmationCode, setConfirmationCode] = useState(""); // State variable for booking confirmation code
//   const [errorMessage, setErrorMessage] = useState(""); // State variable for error message

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setIsLoading(true); // Set loading state to true
//         const response = await ApiService.getRoomById(roomId);
//         setRoomDetails(response.room);
//         const userProfile = getUserData();
//         console.log("User Profile:", userProfile);

//         if (userProfile && userProfile.id) {
//           setUserId(userProfile.id);
//         } else {
//           throw new Error("User ID is undefined");
//         }
//       } catch (error) {
//         setError(error.response?.data?.message || error.message);
//       } finally {
//         setIsLoading(false); // Set loading state to false after fetching or error
//       }
//     };
//     fetchData();
//   }, [roomId]); // Re-run effect when roomId changes

//   const handleConfirmBooking = async () => {
//     // Check if check-in and check-out dates are selected
//     if (!checkInDate || !checkOutDate) {
//       setErrorMessage("Please select check-in and check-out dates.");
//       setTimeout(() => setErrorMessage(""), 5000); // Clear error message after 5 seconds
//       return;
//     }

//     // Check if number of adults and children are valid
//     if (
//       isNaN(numAdults) ||
//       numAdults < 1 ||
//       isNaN(numChildren) ||
//       numChildren < 0
//     ) {
//       setErrorMessage("Please enter valid numbers for adults and children.");
//       setTimeout(() => setErrorMessage(""), 5000); // Clear error message after 5 seconds
//       return;
//     }

//     // Calculate total number of days
//     const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
//     const startDate = new Date(checkInDate);
//     const endDate = new Date(checkOutDate);
//     const totalDays = Math.round(Math.abs((endDate - startDate) / oneDay)) + 1;

//     // Calculate total number of guests
//     const totalGuests = numAdults + numChildren;

//     // Calculate total price
//     const roomPricePerNight = roomDetails.roomPrice;
//     const totalPrice = roomPricePerNight * totalDays;

//     setTotalPrice(totalPrice);
//     setTotalGuests(totalGuests);
//   };

//   const acceptBooking = async () => {
//     try {
//       // Ensure checkInDate and checkOutDate are Date objects
//       const startDate = new Date(checkInDate);
//       const endDate = new Date(checkOutDate);

//       // Convert dates to YYYY-MM-DD format, adjusting for time zone differences
//       const formattedCheckInDate = new Date(
//         startDate.getTime() - startDate.getTimezoneOffset() * 60000
//       )
//         .toISOString()
//         .split("T")[0];
//       const formattedCheckOutDate = new Date(
//         endDate.getTime() - endDate.getTimezoneOffset() * 60000
//       )
//         .toISOString()
//         .split("T")[0];

//       // Create booking object
//       const booking = {
//         checkInDate: formattedCheckInDate,
//         checkOutDate: formattedCheckOutDate,
//         numOfAdults: numAdults,
//         numOfChildren: numChildren,
//       };
//       console.log(booking);
//       console.log(checkOutDate);

//       // Make booking
//       const response = await ApiService.bookRoom(roomId, userId, booking);
//       if (response.statusCode === 200) {
//         setConfirmationCode(response.bookingConfirmationCode); // Set booking confirmation code
//         setShowMessage(true); // Show message
//         //use toast to show message
//         toast.success(
//           "Booking successful! Confirmation code: " +
//             response.bookingConfirmationCode
//         );

//         console.log("Booking Response:", response);
//         // Hide message and navigate to homepage after 1 seconds
//         setTimeout(() => {
//           setShowMessage(false);
//           navigate("/cabin-booking/rooms"); // Navigate to rooms
//         }, 1000);
//       }
//     } catch (error) {
//       setErrorMessage(error.response?.data?.message || error.message);
//       setTimeout(() => setErrorMessage(""), 5000); // Clear error message after 5 seconds
//     }
//   };

//   if (isLoading) {
//     return <p className="cb-room-detail-loading">Loading room details...</p>;
//   }

//   if (error) {
//     return <p className="cb-room-detail-loading">{error}</p>;
//   }

//   if (!roomDetails) {
//     return <p className="cb-room-detail-loading">Room not found.</p>;
//   }

//   const {
//     roomType,
//     roomPrice,
//     roomPhotoUrl,
//     roomDescription,
//     bookings,
//     hospital,
//     address,
//   } = roomDetails;

//   return (
//     <div className="cb-room-details-booking">
//       {showMessage && (
//         <p className="cb-booking-success-message">
//           Booking successful! Confirmation code: {confirmationCode}. An SMS and
//           email of your booking details have been sent to you.
//         </p>
//       )}
//       {errorMessage && <p className="cb-error-message">{errorMessage}</p>}
//       <h2>Room Details</h2>
//       <br />
//       <img
//         src={BASE_URL + "/cb/rooms/image/" + roomPhotoUrl}
//         alt={roomType}
//         className="cb-room-details-image"
//       />
//       <div className="cb-room-details-info">
//         <h1>{hospital}</h1>
//         <h2>{roomType}</h2>
//         <p>Price: ${roomPrice} / night</p>
//         <p>{roomDescription}</p>
//         <p>Address: {address}</p>
//       </div>
//       {bookings && bookings.length > 0 && (
//         <div>
//           <h3>Existing Booking Details</h3>
//           <ul className="cb-booking-list">
//             {bookings.map((booking, index) => (
//               <li key={booking.id} className="cb-booking-item">
//                 <span className="cb-booking-number">Booking {index + 1} </span>
//                 <span className="cb-booking-text">
//                   Check-in: {booking.checkInDate}{" "}
//                 </span>
//                 <span className="cb-booking-text">
//                   Out: {booking.checkOutDate}
//                 </span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//       <div className="cb-booking-info">
//         <button
//           className="cb-book-now-button"
//           onClick={() => setShowDatePicker(true)}
//         >
//           Book Now
//         </button>
//         <button
//           className="cb-go-back-button"
//           onClick={() => setShowDatePicker(false)}
//         >
//           Go Back
//         </button>
//         {showDatePicker && (
//           <div className="cb-date-picker-container">
//             <DatePicker
//               className="cb-detail-search-field"
//               selected={checkInDate}
//               onChange={(date) => setCheckInDate(date)}
//               selectsStart
//               startDate={checkInDate}
//               endDate={checkOutDate}
//               placeholderText="Check-in Date"
//               dateFormat="dd/MM/yyyy"
//               // dateFormat="yyyy-MM-dd"
//             />
//             <DatePicker
//               className="cb-detail-search-field"
//               selected={checkOutDate}
//               onChange={(date) => setCheckOutDate(date)}
//               selectsEnd
//               startDate={checkInDate}
//               endDate={checkOutDate}
//               minDate={checkInDate}
//               placeholderText="Check-out Date"
//               // dateFormat="yyyy-MM-dd"
//               dateFormat="dd/MM/yyyy"
//             />

//             <div className="cb-guest-container">
//               <div className="guest-div">
//                 <label>Adults:</label>
//                 <input
//                   type="number"
//                   min="1"
//                   value={numAdults}
//                   onChange={(e) => setNumAdults(parseInt(e.target.value))}
//                 />
//               </div>
//               <div className="guest-div">
//                 <label>Children:</label>
//                 <input
//                   type="number"
//                   min="0"
//                   value={numChildren}
//                   onChange={(e) => setNumChildren(parseInt(e.target.value))}
//                 />
//               </div>
//               <button
//                 className="cb-confirm-booking"
//                 onClick={handleConfirmBooking}
//               >
//                 Confirm Booking
//               </button>
//             </div>
//           </div>
//         )}
//         {totalPrice > 0 && (
//           <div className="cb-total-price">
//             <p>Total Price: ${totalPrice}</p>
//             <p>Total Guests: {totalGuests}</p>
//             <button onClick={acceptBooking} className="cb-accept-booking">
//               Accept Booking
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RoomDetailsPage;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import ApiService from "../services/ApiService";
import DatePicker from "react-datepicker";
import { getUserData } from "../../service/user-service";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import "./style/RoomDetailsPage.css";
import { BASE_URL } from "../../service/helper";

const stripePromise = loadStripe(
  "pk_test_51PLlWk04ex3Ui1JlZAO8ZRN2sBG7k7Oqag4GFBPKZGmL5T5tLF9OVwTBtsPbeZiJ2uyh5vtz63KnerVuGujmGFf0004JWFWuMp"
);

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

    const response = await fetch(
      "http://localhost:8081/apiserver/stripe/charge",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parseFloat(amount) * 100,
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
            style={{ backgroundColor: "#f0f0f0" }} // Read-only styling
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

const RoomDetailsPage = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [roomDetails, setRoomDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [numAdults, setNumAdults] = useState(1);
  const [numChildren, setNumChildren] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalGuests, setTotalGuests] = useState(1);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [userId, setUserId] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPaymentForm, setShowPaymentForm] = useState(false); // To display payment form

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await ApiService.getRoomById(roomId);
        setRoomDetails(response.room);
        const userProfile = getUserData();
        if (userProfile && userProfile.id) {
          setUserId(userProfile.id);
        } else {
          throw new Error("User ID is undefined");
        }
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [roomId]);

  const handleConfirmBooking = () => {
    if (!checkInDate || !checkOutDate) {
      setErrorMessage("Please select check-in and check-out dates.");
      setTimeout(() => setErrorMessage(""), 5000);
      return;
    }
    const oneDay = 24 * 60 * 60 * 1000;
    const totalDays =
      Math.round(
        Math.abs((new Date(checkOutDate) - new Date(checkInDate)) / oneDay)
      ) + 1;
    const totalGuests = numAdults + numChildren;
    const totalPrice = roomDetails.roomPrice * totalDays;

    setTotalPrice(totalPrice);
    setTotalGuests(totalGuests);
  };

  const acceptBooking = async () => {
    try {
      const formattedCheckInDate = new Date(checkInDate)
        .toISOString()
        .split("T")[0];
      const formattedCheckOutDate = new Date(checkOutDate)
        .toISOString()
        .split("T")[0];
      const booking = {
        checkInDate: formattedCheckInDate,
        checkOutDate: formattedCheckOutDate,
        numOfAdults: numAdults,
        numOfChildren: numChildren,
      };
      const response = await ApiService.bookRoom(roomId, userId, booking);
      if (response.statusCode === 200) {
        setConfirmationCode(response.bookingConfirmationCode);
        setShowPaymentForm(true); // Show payment form after successful booking
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || error.message);
      setTimeout(() => setErrorMessage(""), 5000);
    }
  };

  if (isLoading) {
    return <p className="cb-room-detail-loading">Loading room details...</p>;
  }

  if (error) {
    return <p className="cb-room-detail-loading">{error}</p>;
  }

  if (!roomDetails) {
    return <p className="cb-room-detail-loading">Room not found.</p>;
  }

  const {
    roomType,
    roomPrice,
    roomPhotoUrl,
    roomDescription,
    bookings,
    hospital,
    address,
  } = roomDetails;

  return (
    <div className="cb-room-details-booking">
      {errorMessage && <p className="cb-error-message">{errorMessage}</p>}
      <h2>Room Details</h2>
      <br />
      <img
        src={BASE_URL + "/cb/rooms/image/" + roomPhotoUrl}
        alt={roomType}
        className="cb-room-details-image"
      />
      <div className="cb-room-details-info">
        <h1>{hospital}</h1>
        <h2>{roomType}</h2>
        <p>Price: ${roomPrice} / night</p>
        <p>{roomDescription}</p>
        <p>Address: {address}</p>
      </div>
      <div className="cb-booking-info">
        <button
          className="cb-book-now-button"
          onClick={() => setShowDatePicker(true)}
        >
          Book Now
        </button>
        {showDatePicker && (
          <div className="cb-date-picker-container">
            <DatePicker
              className="cb-detail-search-field"
              selected={checkInDate}
              onChange={(date) => setCheckInDate(date)}
              selectsStart
              startDate={checkInDate}
              endDate={checkOutDate}
              placeholderText="Check-in Date"
            />
            <DatePicker
              className="cb-detail-search-field"
              selected={checkOutDate}
              onChange={(date) => setCheckOutDate(date)}
              selectsEnd
              startDate={checkInDate}
              endDate={checkOutDate}
              minDate={checkInDate}
              placeholderText="Check-out Date"
            />
            <input
              type="number"
              value={numAdults}
              onChange={(e) => setNumAdults(e.target.value)}
              className="cb-detail-search-field"
              placeholder="Number of adults"
            />
            <input
              type="number"
              value={numChildren}
              onChange={(e) => setNumChildren(e.target.value)}
              className="cb-detail-search-field"
              placeholder="Number of children"
            />
            <button
              className="cb-confirm-booking"
              onClick={handleConfirmBooking}
            >
              Confirm Booking
            </button>
            <br />
            {totalPrice > 0 && (
              <div className="cb-booking-summary">
                <h2>Booking Summary</h2>
                <p>Room Price: ${roomPrice}</p>
                <p>Total Guests: {totalGuests}</p>
                <p>Total Price: ${totalPrice}</p>
                <button className="cb-book-now-button" onClick={acceptBooking}>
                  Proceed to Payment
                </button>
              </div>
            )}
          </div>
        )}
        {showPaymentForm && (
          <div className="cb-payment-section">
            <h2>Total Price: ${totalPrice}</h2>
            <Elements stripe={stripePromise}>
              <StripePaymentForm
                amount={totalPrice}
                onSuccess={() => {
                  toast.success(
                    "Room booking confirmed! You can now check your email for confirmation."
                  );
                  setTimeout(() => navigate("/"), 5000);
                }}
              />
            </Elements>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default RoomDetailsPage;
