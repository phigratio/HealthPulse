import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import ApiService from "../services/ApiService";
import DatePicker from "react-datepicker";
import { getUserData } from "../../service/user-service";
// import 'react-datepicker/dist/react-datepicker.css';
import "./style/RoomDetailsPage.css";
import { BASE_URL } from "../../service/helper";
const RoomDetailsPage = () => {
  const navigate = useNavigate(); // Access the navigate function to navigate
  const { roomId } = useParams(); // Get room ID from URL parameters
  const [roomDetails, setRoomDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track any errors
  const [checkInDate, setCheckInDate] = useState(null); // State variable for check-in date
  const [checkOutDate, setCheckOutDate] = useState(null); // State variable for check-out date
  const [numAdults, setNumAdults] = useState(1); // State variable for number of adults
  const [numChildren, setNumChildren] = useState(0); // State variable for number of children
  const [totalPrice, setTotalPrice] = useState(0); // State variable for total booking price
  const [totalGuests, setTotalGuests] = useState(1); // State variable for total number of guests
  const [showDatePicker, setShowDatePicker] = useState(false); // State variable to control date picker visibility
  const [userId, setUserId] = useState(""); // Set user id
  const [showMessage, setShowMessage] = useState(false); // State variable to control message visibility
  const [confirmationCode, setConfirmationCode] = useState(""); // State variable for booking confirmation code
  const [errorMessage, setErrorMessage] = useState(""); // State variable for error message

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); // Set loading state to true
        const response = await ApiService.getRoomById(roomId);
        setRoomDetails(response.room);
        const userProfile = getUserData();
        console.log("User Profile:", userProfile);

        if (userProfile && userProfile.id) {
          setUserId(userProfile.id);
        } else {
          throw new Error("User ID is undefined");
        }
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      } finally {
        setIsLoading(false); // Set loading state to false after fetching or error
      }
    };
    fetchData();
  }, [roomId]); // Re-run effect when roomId changes

  const handleConfirmBooking = async () => {
    // Check if check-in and check-out dates are selected
    if (!checkInDate || !checkOutDate) {
      setErrorMessage("Please select check-in and check-out dates.");
      setTimeout(() => setErrorMessage(""), 5000); // Clear error message after 5 seconds
      return;
    }

    // Check if number of adults and children are valid
    if (
      isNaN(numAdults) ||
      numAdults < 1 ||
      isNaN(numChildren) ||
      numChildren < 0
    ) {
      setErrorMessage("Please enter valid numbers for adults and children.");
      setTimeout(() => setErrorMessage(""), 5000); // Clear error message after 5 seconds
      return;
    }

    // Calculate total number of days
    const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
    const startDate = new Date(checkInDate);
    const endDate = new Date(checkOutDate);
    const totalDays = Math.round(Math.abs((endDate - startDate) / oneDay)) + 1;

    // Calculate total number of guests
    const totalGuests = numAdults + numChildren;

    // Calculate total price
    const roomPricePerNight = roomDetails.roomPrice;
    const totalPrice = roomPricePerNight * totalDays;

    setTotalPrice(totalPrice);
    setTotalGuests(totalGuests);
  };

  const acceptBooking = async () => {
    try {
      // Ensure checkInDate and checkOutDate are Date objects
      const startDate = new Date(checkInDate);
      const endDate = new Date(checkOutDate);

      // Log the original dates for debugging
      console.log("Original Check-in Date:", startDate);
      console.log("Original Check-out Date:", endDate);

      // Convert dates to YYYY-MM-DD format, adjusting for time zone differences
      const formattedCheckInDate = new Date(
        startDate.getTime() - startDate.getTimezoneOffset() * 60000
      )
        .toISOString()
        .split("T")[0];
      const formattedCheckOutDate = new Date(
        endDate.getTime() - endDate.getTimezoneOffset() * 60000
      )
        .toISOString()
        .split("T")[0];

      // Log the original dates for debugging
      console.log("Formated Check-in Date:", formattedCheckInDate);
      console.log("Formated Check-out Date:", formattedCheckOutDate);

      // Create booking object
      const booking = {
        checkInDate: formattedCheckInDate,
        checkOutDate: formattedCheckOutDate,
        numOfAdults: numAdults,
        numOfChildren: numChildren,
      };
      console.log(booking);
      console.log(checkOutDate);

      // Make booking
      const response = await ApiService.bookRoom(roomId, userId, booking);
      if (response.statusCode === 200) {
        setConfirmationCode(response.bookingConfirmationCode); // Set booking confirmation code
        setShowMessage(true); // Show message
        //use toast to show message
        toast.success(
          "Booking successful! Confirmation code: " +
            response.bookingConfirmationCode
        );

        console.log("Booking Response:", response);
        // Hide message and navigate to homepage after 1 seconds
        setTimeout(() => {
          setShowMessage(false);
          navigate("/cabin-booking/rooms"); // Navigate to rooms
        }, 1000);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || error.message);
      setTimeout(() => setErrorMessage(""), 5000); // Clear error message after 5 seconds
    }
  };

  // const acceptBooking = async () => {
  //   try {
  //     // Ensure checkInDate and checkOutDate are Date objects
  //     const startDate = new Date(checkInDate);
  //     const endDate = new Date(checkOutDate);

  //     // Convert dates to YYYY-MM-DD format, adjusting for time zone differences
  //     const formattedCheckInDate = new Date(
  //       startDate.getTime() - startDate.getTimezoneOffset() * 60000
  //     )
  //       .toISOString()
  //       .split("T")[0];
  //     const formattedCheckOutDate = new Date(
  //       endDate.getTime() - endDate.getTimezoneOffset() * 60000
  //     )
  //       .toISOString()
  //       .split("T")[0];

  //     // Create booking object
  //     const booking = {
  //       checkInDate: formattedCheckInDate,
  //       checkOutDate: formattedCheckOutDate,
  //       numOfAdults: numAdults,
  //       numOfChildren: numChildren,
  //     };

  //     // Make booking
  //     const response = await ApiService.bookRoom(roomId, userId, booking);
  //     if (response.statusCode === 200) {
  //       setConfirmationCode(response.bookingConfirmationCode); // Set booking confirmation code
  //       // console.log("Booking Confirmation Code:", confirmationCode);
  //       // console.log("Booking Response:", response);
  //       setShowMessage(true); // Show message

  //       // Add a delay to ensure the message is displayed before redirecting
  //       setTimeout(() => {
  //         navigate("/cabin-booking/rooms"); // Navigate to rooms
  //       }, 3000); // Delay of 3 seconds
  //     }
  //   } catch (error) {
  //     setErrorMessage(error.response?.data?.message || error.message);
  //     setTimeout(() => setErrorMessage(""), 5000); // Clear error message after 5 seconds
  //   }
  // };

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
      {showMessage && (
        <p className="cb-booking-success-message">
          Booking successful! Confirmation code: {confirmationCode}. An SMS and
          email of your booking details have been sent to you.
        </p>
      )}
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
      {bookings && bookings.length > 0 && (
        <div>
          <h3>Existing Booking Details</h3>
          <ul className="cb-booking-list">
            {bookings.map((booking, index) => (
              <li key={booking.id} className="cb-booking-item">
                <span className="cb-booking-number">Booking {index + 1} </span>
                <span className="cb-booking-text">
                  Check-in: {booking.checkInDate}{" "}
                </span>
                <span className="cb-booking-text">
                  Out: {booking.checkOutDate}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="cb-booking-info">
        <button
          className="cb-book-now-button"
          onClick={() => setShowDatePicker(true)}
        >
          Book Now
        </button>
        <button
          className="cb-go-back-button"
          onClick={() => setShowDatePicker(false)}
        >
          Go Back
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
              dateFormat="dd/MM/yyyy"
              // dateFormat="yyyy-MM-dd"
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
              // dateFormat="yyyy-MM-dd"
              dateFormat="dd/MM/yyyy"
            />

            <div className="cb-guest-container">
              <div className="guest-div">
                <label>Adults:</label>
                <input
                  type="number"
                  min="1"
                  value={numAdults}
                  onChange={(e) => setNumAdults(parseInt(e.target.value))}
                />
              </div>
              <div className="guest-div">
                <label>Children:</label>
                <input
                  type="number"
                  min="0"
                  value={numChildren}
                  onChange={(e) => setNumChildren(parseInt(e.target.value))}
                />
              </div>
              <button
                className="cb-confirm-booking"
                onClick={handleConfirmBooking}
              >
                Confirm Booking
              </button>
            </div>
          </div>
        )}
        {totalPrice > 0 && (
          <div className="cb-total-price">
            <p>Total Price: ${totalPrice}</p>
            <p>Total Guests: {totalGuests}</p>
            <button onClick={acceptBooking} className="cb-accept-booking">
              Accept Booking
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomDetailsPage;
