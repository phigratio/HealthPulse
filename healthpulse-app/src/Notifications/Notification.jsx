// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Base from "../components/Base";
// import Background from "../components/basicComponents/Background";
// import {
//   getNotificationsByUserId,
//   deleteNotification,
// } from "./Service/NotificationService";
// import { getUserData } from "../service/user-service"; // Import getUserData function
// import "./NotificationsPage.css";
// import "@fortawesome/fontawesome-free/css/all.min.css"; // Import font awesome for icons
// import { isLoggedIn } from "../auth";
// const Notification = () => {
//   const navigate = useNavigate();
//   const [notifications, setNotifications] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [userId, setUserId] = useState(null); // Set userId dynamically

//   useEffect(() => {
//     // Check if user is not logged in
//     if (!isLoggedIn()) {
//       navigate("/login");
//     }

//     // Retrieve user data
//     const userData = getUserData();
//     if (userData) {
//       setUserId(userData.id); // Assuming userData contains an 'id' field for userId
//     } else {
//       setError("Failed to load user data.");
//       setLoading(false);
//       return;
//     }

//     // Fetch notifications once userId is set
//     getNotificationsByUserId(userData.id)
//       .then((data) => {
//         setNotifications(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching notifications:", err);
//         setError("Failed to load notifications.");
//         setLoading(false);
//       });
//   }, []);

//   const handleDelete = (id) => {
//     deleteNotification(id)
//       .then(() => {
//         // Remove the deleted notification from the state
//         setNotifications(
//           notifications.filter((notification) => notification.id !== id)
//         );
//       })
//       .catch((err) => {
//         console.error("Error deleting notification:", err);
//         setError("Failed to delete notification.");
//       });
//   };

//   if (loading) {
//     return <div>Loading notifications...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div>
//       <Background />
//       <Base>
//         <div className="mt-28">
//           <div className="notifications-page">
//             <h2>Your Notifications</h2>
//             {notifications.length === 0 ? (
//               <p>No notifications available</p>
//             ) : (
//               <ul className="notifications-list">
//                 {notifications.map((notification) => (
//                   <li key={notification.id} className="notification-item">
//                     <div className="notification-header">
//                       <h4>{notification.title}</h4>
//                       <small>
//                         {new Date(notification.createdAt).toLocaleString()}
//                       </small>
//                     </div>
//                     <p>{notification.data}</p>

//                     {/* Delete button */}
//                     <button
//                       className="delete-button"
//                       onClick={() => handleDelete(notification.id)}
//                     >
//                       <i className="fas fa-trash"></i>
//                       {/* Font Awesome trash icon */}
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         </div>
//       </Base>
//     </div>
//   );
// };

// export default Notification;

import React, { useEffect, useState } from "react";
import {
  getNotificationsByUserId,
  deleteNotification,
} from "./Service/NotificationService";
import { getUserData } from "../service/user-service";
import { X } from "lucide-react";

const NotificationPanel = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      const userData = getUserData();
      if (userData) {
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
      }
    }
  }, [isOpen]);

  const handleDelete = (id) => {
    deleteNotification(id)
      .then(() => {
        setNotifications(
          notifications.filter((notification) => notification.id !== id)
        );
      })
      .catch((err) => {
        console.error("Error deleting notification:", err);
        setError("Failed to delete notification.");
      });
  };

  return (
    <div
      className={`fixed inset-y-0 right-0 w-[30%] bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="h-full flex flex-col">
        {/* Header - Fixed */}
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Notifications</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          {loading && <p className="p-4">Loading notifications...</p>}
          {error && <p className="p-4 text-red-500">{error}</p>}
          {!loading && !error && notifications.length === 0 && (
            <p className="p-4">No notifications available</p>
          )}
          <ul className="divide-y">
            {notifications.map((notification) => (
              <li key={notification.id} className="p-4 hover:bg-gray-50">
                <div className="flex justify-between">
                  <h4 className="font-medium">{notification.title}</h4>
                  <button
                    onClick={() => handleDelete(notification.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <p className="mt-1 text-sm text-gray-600">
                  {notification.data}
                </p>
                <small className="text-gray-400">
                  {new Date(notification.createdAt).toLocaleString()}
                </small>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NotificationPanel;
