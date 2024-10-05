import React, { useEffect, useState } from "react";
import Base from "../components/Base";
import Background from "../components/basicComponents/Background";
import {
  getNotificationsByUserId,
  deleteNotification,
} from "./Service/NotificationService";
import { getUserData } from "../service/user-service"; // Import getUserData function
import "./NotificationsPage.css";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Import font awesome for icons

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null); // Set userId dynamically

  useEffect(() => {
    // Retrieve user data
    const userData = getUserData();
    if (userData) {
      setUserId(userData.id); // Assuming userData contains an 'id' field for userId
    } else {
      setError("Failed to load user data.");
      setLoading(false);
      return;
    }

    // Fetch notifications once userId is set
    getNotificationsByUserId(userData.id)
      .then((data) => {
        setNotifications(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching notifications:", err);
        setError("Failed to load notifications.");
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    deleteNotification(id)
      .then(() => {
        // Remove the deleted notification from the state
        setNotifications(
          notifications.filter((notification) => notification.id !== id)
        );
      })
      .catch((err) => {
        console.error("Error deleting notification:", err);
        setError("Failed to delete notification.");
      });
  };

  if (loading) {
    return <div>Loading notifications...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Background />
      <Base>
        <div className="mt-28">
          <div className="notifications-page">
            <h2>Your Notifications</h2>
            {notifications.length === 0 ? (
              <p>No notifications available</p>
            ) : (
              <ul className="notifications-list">
                {notifications.map((notification) => (
                  <li key={notification.id} className="notification-item">
                    <div className="notification-header">
                      <h4>{notification.title}</h4>
                      <small>
                        {new Date(notification.createdAt).toLocaleString()}
                      </small>
                    </div>
                    <p>{notification.data}</p>

                    {/* Delete button */}
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(notification.id)}
                    >
                      <i className="fas fa-trash"></i>
                      {/* Font Awesome trash icon */}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Base>
    </div>
  );
};

export default Notification;
