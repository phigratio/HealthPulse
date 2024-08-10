import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import ApiService from "../services/ApiService";

const RoomResult = ({ roomSearchResults }) => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const isAdmin = ApiService.isAdmin();
  return (
    <section className="cb-room-results">
      {roomSearchResults && roomSearchResults.length > 0 && (
        <div className="cb-room-list">
          {roomSearchResults.map((room) => (
            <div key={room.id} className="cb-room-list-item">
              <img
                className="cb-room-list-item-image"
                src={room.roomPhotoUrl}
                alt={room.roomType}
              />
              <div className="cb-room-details">
                <h3>{room.roomType}</h3>
                <p>Price: ${room.roomPrice} / night</p>
                <p>Description: {room.roomDescription}</p>
              </div>

              <div className="cb-book-now-div">
                {isAdmin ? (
                  <button
                    className="cb-edit-room-button"
                    onClick={() => navigate(`/admin/edit-room/${room.id}`)} // Navigate to edit room with room ID
                  >
                    Edit Room
                  </button>
                ) : (
                  <button
                    className="cb-book-now-button"
                    onClick={() => navigate(`/room-details-book/${room.id}`)} // Navigate to book room with room ID
                  >
                    View/Book Now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default RoomResult;
