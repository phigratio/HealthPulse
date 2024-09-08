import { privateAxios, myAxios } from "../../service/helper";

// Create Medication function
export const createMedication = (medication) => {
  console.log("Creating Medication: ", medication);
  return privateAxios
    .post(`/reminder/medications/add`, medication)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error creating Medication:", error);
      throw error;
    });
};

// Get Medications by User function
export const getMedicationsByUser = (userId) => {
  console.log("Getting Medications for User ID:", userId);
  return privateAxios
    .get(`/reminder/medications/user/${userId}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error getting Medications by User ID:", error);
      throw error;
    });
};

// Update Medication function
export const updateMedication = (id, medication) => {
  console.log("Updating Medication ID:", id);
  return privateAxios
    .put(`/reminder/medications/update/${id}`, medication)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error updating Medication:", error);
      throw error;
    });
};

// Delete Medication function
export const deleteMedication = (id) => {
  console.log("Deleting Medication ID:", id);
  return privateAxios
    .delete(`/reminder/medications/delete/${id}`)
    .then(() => {})
    .catch((error) => {
      console.error("Error deleting Medication:", error);
      throw error;
    });
};

// Get Medication by ID function
export const getMedicationById = (id) => {
  console.log("Getting Medication by ID:", id);
  return privateAxios
    .get(`/reminder/medications/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error getting Medication by ID:", error);
      throw error;
    });
};

// Get Current Medications by User function
export const getCurrentMedicationsByUser = (userId) => {
  console.log("Getting Current Medications for User ID:", userId);
  return privateAxios
    .get(`/reminder/medications/current/user/${userId}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error getting Current Medications by User ID:", error);
      throw error;
    });
};
