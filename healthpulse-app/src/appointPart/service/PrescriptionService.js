import { privateAxios, myAxios } from "../../service/helper";

class PrescriptionService {
  // Method to create a new prescription (requires authentication)
  createPrescription(prescriptionData) {
    return privateAxios
      .post(`/ad/prescriptions`, prescriptionData)
      .then((response) => response.data)
      .catch((error) => {
        console.error("There was an error creating the prescription!", error);
        throw error;
      });
  }

  // Method to update an existing prescription (requires authentication)
  updatePrescription(id, prescriptionData) {
    return privateAxios
      .put(`/ad/prescriptions/${id}`, prescriptionData)
      .then((response) => response.data)
      .catch((error) => {
        console.error("There was an error updating the prescription!", error);
        throw error;
      });
  }

  // Method to delete a prescription (requires authentication)
  deletePrescription(id) {
    return privateAxios
      .delete(`/ad/prescriptions/${id}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error("There was an error deleting the prescription!", error);
        throw error;
      });
  }

  // Method to get a prescription by ID
  getPrescriptionById(id) {
    return myAxios
      .get(`/ad/prescriptions/${id}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error("There was an error fetching the prescription!", error);
        throw error;
      });
  }

  // Method to get all prescriptions by doctor ID
  getPrescriptionsByDoctorId(doctorId) {
    return myAxios
      .get(`/ad/prescriptions/doctor/${doctorId}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error(
          "There was an error fetching prescriptions by doctor ID!",
          error
        );
        throw error;
      });
  }

  // Method to get all prescriptions by patient ID
  getPrescriptionsByPatientId(patientId) {
    return myAxios
      .get(`/ad/prescriptions/patient/${patientId}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error(
          "There was an error fetching prescriptions by patient ID!",
          error
        );
        throw error;
      });
  }

  // Method to get all prescriptions
  getAllPrescriptions() {
    return myAxios
      .get(`/ad/prescriptions`)
      .then((response) => response.data)
      .catch((error) => {
        console.error("There was an error fetching all prescriptions!", error);
        throw error;
      });
  }
}

export default new PrescriptionService();
