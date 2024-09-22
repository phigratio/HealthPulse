import { privateAxios, myAxios } from "../../service/helper";

class AppointService {
  // Method to create a new appointment (requires authentication)
  createAppointment(appointmentData) {
    return privateAxios
      .post(`/ad/appointments/create`, appointmentData)
      .then((response) => response.data)
      .catch((error) => {
        console.error("There was an error creating the appointment!", error);
        throw error;
      });
  }

  // Method to get an appointment by ID
  getAppointmentById(appointmentId) {
    return myAxios
      .get(`/ad/appointments/${appointmentId}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error("There was an error fetching the appointment!", error);
        throw error;
      });
  }

  // Method to find available appointments by date and specialization
  getAvailableAppointments(date, specialization) {
    console.log("Method called with date:", date);
    console.log("Method called with specialization:", specialization);

    return myAxios
      .get(`/ad/appointments/available`, {
        params: { date: date, specialization: specialization },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error(
          "There was an error fetching the available appointments!",
          error
        );
        throw error;
      });
  }

  // Method to find available appointments by date (without specialization filter)
  getAvailableAppointmentsByDate(date) {
    return myAxios
      .get(`/ad/appointments/available-by-date`, {
        params: { date: date },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error(
          "There was an error fetching the available appointments by date!",
          error
        );
        throw error;
      });
  }

  // Method to find available appointments by doctorId
  getAvailableAppointmentsByDoctorId(doctorId) {
    return myAxios
      .get(`/ad/appointments/available-by-doctor`, {
        params: { doctorId: doctorId },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error(
          "There was an error fetching the available appointments by doctor!",
          error
        );
        throw error;
      });
  }

  // Method to book an appointment (requires authentication)
  bookAppointment(appointmentId, userId) {
    return privateAxios
      .post(`/ad/appointments/${appointmentId}/book`, null, {
        params: { userId: userId },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error("There was an error booking the appointment!", error);
        throw error;
      });
  }

  // Method to get all bookings made by a user (requires authentication)
  getBookingsByUserId(userId) {
    return privateAxios
      .get(`/ad/appointments/user-bookings`, {
        params: { userId: userId },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error(
          "There was an error fetching the user's bookings!",
          error
        );
        throw error;
      });
  }

  // Method to cancel a booking (requires authentication)
  cancelBooking(appointmentId, userId) {
    return privateAxios
      .post(`/ad/appointments/${appointmentId}/cancel`, null, {
        params: { userId: userId },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error("There was an error canceling the appointment!", error);
        throw error;
      });
  }

  // Method to get all unique specializations
  getAllSpecializations() {
    return myAxios
      .get(`/ad/appointments/specializations`)
      .then((response) => response.data)
      .catch((error) => {
        console.error(
          "There was an error fetching the specializations!",
          error
        );
        throw error;
      });
  }

  //get next appointment by doctorID

  getNextAppointmentByDoctorId(doctorId) {
    return myAxios
      .get(`/ad/appointments/doctor/${doctorId}/appointments`)
      .then((response) => response.data)
      .catch((error) => {
        console.error(
          "There was an error fetching the next appointment by doctor!",
          error
        );
        throw error;
      });
  }

  // Method to add a review
  addReview(reviewData) {
    return privateAxios
      .post(`/ad/reviews/add`, reviewData)
      .then((response) => response.data)
      .catch((error) => {
        console.error("There was an error adding the review!", error);
        throw error;
      });
  }

  // Method to get reviews by doctor ID
  getReviewsByDoctorId(doctorId) {
    return myAxios
      .get(`/ad/reviews/doctor/${doctorId}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error(
          "There was an error fetching reviews by doctor ID!",
          error
        );
        throw error;
      });
  }

  // Method to start a meeting for an appointment (requires authentication)
  startMeeting(appointmentId, videoCallUrl) {
    return privateAxios
      .post(
        `/ad/appointments/${appointmentId}/start-meeting?videoCallUrl=${encodeURIComponent(
          videoCallUrl
        )}`
      )
      .then((response) => response.data)
      .catch((error) => {
        console.error("There was an error starting the meeting!", error);
        throw error;
      });
  }
}

export default new AppointService();
