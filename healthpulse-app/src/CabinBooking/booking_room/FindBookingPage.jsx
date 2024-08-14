import React, { useState } from "react";
import ApiService from "../services/ApiService";
import { getUser } from "../../service/user-service";
import "./style/FindBookingPage.css";

const FindBookingPage = () => {
  const [confirmationCode, setConfirmationCode] = useState(""); // State variable for confirmation code
  const [bookingDetails, setBookingDetails] = useState(null); // State variable for booking details
  const [error, setError] = useState(null); // Track any errors
  const [userDetail, setUserDetail] = useState(null);

  const handleSearch = async () => {
    if (!confirmationCode.trim()) {
      setError("Please Enter a booking confirmation code");
      setTimeout(() => setError(""), 5000);
      return;
    }
    try {
      // Call API to get booking details
      const response = await ApiService.getBookingByConfirmationCode(
        confirmationCode
      );
      setBookingDetails(response.booking);

      setUserDetail(getUser(bookingDetails.userId));

      console.log("User Details", userDetail);
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      setTimeout(() => setError(""), 5000);
    }
  };

  return (
    <div className="cb-find-booking-page">
      <h2>Find Booking</h2>
      <div className="cb-search-container">
        <input
          required
          type="text"
          placeholder="Enter your booking confirmation code"
          value={confirmationCode}
          onChange={(e) => setConfirmationCode(e.target.value)}
        />
        <button onClick={handleSearch}>Find</button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {bookingDetails && (
        <div className="cb-booking-details">
          <h3>Booking Details</h3>
          <p>Confirmation Code: {bookingDetails.bookingConfirmationCode}</p>
          <p>Check-in Date: {bookingDetails.checkInDate}</p>
          <p>Check-out Date: {bookingDetails.checkOutDate}</p>
          <p>Num Of Adults: {bookingDetails.numOfAdults}</p>
          <p>Num Of Children: {bookingDetails.numOfChildren}</p>

          <br />
          <hr />
          <br />
          <h3>Booker Detials</h3>
          <div>
            <p> Name: {userDetail.name}</p>
            <p> Email: {userDetail.email}</p>
            {/* <p> Phone Number: {bookingDetails.user.phoneNumber}</p>  */}
          </div>

          <br />
          <hr />
          <br />
          <h3>Room Details</h3>
          <div>
            <p>Hospital: {bookingDetails.room.hospital} </p>
            <p> Room Price: {bookingDetails.room.roomPrice} BDT</p>
            <p> Room Type: {bookingDetails.room.roomType}</p>
            <p>Address: {bookingDetails.room.address}</p>

            <img
              src={bookingDetails.room.roomPhotoUrl}
              alt=""
              sizes=""
              srcSet=""
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FindBookingPage;
