import { privateAxios, myAxios } from "../../service/helper";

// Create TrackerData function
export const createTrackerData = (trackerData) => {
  console.log("Creating TrackerData: ", trackerData);
  return privateAxios
    .post(`/tracker`, trackerData)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error creating TrackerData:", error);
      throw error;
    });
};

// create Tracker Target function
export const createTrackerTarget = (trackerTarget) => {
  console.log("Creating TrackerTarget: ", trackerTarget);
  return privateAxios
    .post(`/tracker/target`, trackerTarget)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error creating TrackerTarget:", error);
      throw error;
    });
};

//get Tracker Target function
export const getTrackerTarget = (userId) => {
  console.log("Getting TrackerTarget for User ID:", userId);
  return privateAxios
    .get(`/tracker/target/user/${userId}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error getting TrackerTarget:", error);
      throw error;
    });
};

// // Update TrackerData function
// export const updateTrackerData = (trackerDataId, trackerData) => {
//   console.log("Updating TrackerData with ID:", trackerDataId);
//   console.log("Updated data:", trackerData);
//   return privateAxios
//     .put(`/tracker/${trackerDataId}`, trackerData)
//     .then((response) => response.data)
//     .catch((error) => {
//       console.error("Error updating TrackerData:", error);
//       throw error;
//     });
// };

// Update TrackerData function from HealthTrackerService
export const updateTrackerData = (trackerData) => {
  console.log("Updating TrackerData with data:", trackerData);
  return privateAxios
    .put(`/tracker`, trackerData)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error updating TrackerData:", error);
      throw error;
    });
};

// Delete TrackerData function
export const deleteTrackerData = (trackerDataId) => {
  console.log("Deleting TrackerData with ID:", trackerDataId);
  return privateAxios
    .delete(`/tracker/${trackerDataId}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error deleting TrackerData:", error);
      throw error;
    });
};

// Load single TrackerData by ID
export const loadTrackerDataById = (trackerDataId) => {
  console.log("Loading TrackerData with ID:", trackerDataId);
  return myAxios
    .get(`/tracker/${trackerDataId}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error loading TrackerData by ID:", error);
      throw error;
    });
};

// Load TrackerData by User ID
export const loadTrackerDataByUserId = (userId) => {
  console.log("Loading TrackerData for User ID:", userId);
  return myAxios
    .get(`/tracker/user/${userId}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error loading TrackerData by User ID:", error);
      throw error;
    });
};

// Load TrackerData by Date
export const loadTrackerDataByDate = (date) => {
  console.log("Loading TrackerData for Date:", date);
  return myAxios
    .get(`/tracker/date/${date}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error loading TrackerData by Date:", error);
      throw error;
    });
};

// Load TrackerData by User ID and Date
export const loadTrackerDataByUserIdAndDate = (userId, date) => {
  console.log("Loading TrackerData for User ID:", userId, " and Date:", date);
  return myAxios
    .get(`/tracker/user/${userId}/date/${date}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error loading TrackerData by User ID and Date:", error);
      throw error;
    });
};

// Get tracker data for the last 7 days
export const loadTrackerDataLast7Days = (userId) => {
  console.log(
    "Loading TrackerData for User ID:",
    userId,
    " for the last 7 days"
  );
  return privateAxios
    .get(`/tracker/user/${userId}/last7days`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error loading TrackerData for the last 7 days:", error);
      throw error;
    });
};

// Get tracker data for the last 30 days
export const loadTrackerDataLast30Days = (userId) => {
  console.log(
    "Loading TrackerData for User ID:",
    userId,
    " for the last 30 days"
  );
  return privateAxios
    .get(`/tracker/user/${userId}/last30days`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error loading TrackerData for the last 30 days:", error);
      throw error;
    });
};

// Get tracker data for the last 365 days
export const loadTrackerDataLast365Days = (userId) => {
  console.log(
    "Loading TrackerData for User ID:",
    userId,
    " for the last 365 days"
  );
  return privateAxios
    .get(`/tracker/user/${userId}/last365days`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error loading TrackerData for the last 365 days:", error);
      throw error;
    });
};
