import { privateAxios, myAxios } from "../../service/helper";

export const getAllNotifications = () => {
  console.log("Fetching all Notifications");
  return privateAxios
    .get(`/notifications`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching all Notifications:", error);
      throw error;
    });
};

// Get Notification by ID function
export const getNotificationById = (id) => {
  console.log("Fetching Notification by ID: ", id);
  return privateAxios
    .get(`/notifications/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching Notification by ID:", error);
      throw error;
    });
};

// Get Notifications by User ID function
export const getNotificationsByUserId = (userId) => {
  console.log("Fetching Notifications for User ID: ", userId);
  return privateAxios
    .get(`/notifications/user/${userId}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching Notifications by User ID:", error);
      throw error;
    });
};

// Delete Notification function
export const deleteNotification = (id) => {
  console.log("Deleting Notification ID: ", id);
  return privateAxios
    .delete(`/notifications/${id}`)
    .then(() => {})
    .catch((error) => {
      console.error("Error deleting Notification:", error);
      throw error;
    });
};
