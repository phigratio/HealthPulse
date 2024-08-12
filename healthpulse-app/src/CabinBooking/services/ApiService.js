import { privateAxios, myAxios } from "../../service/helper";

export default class ApiService {
  /* This is the  to get user bookings by the user id */
  static async getUserBookings(userId) {
    const response = await myAxios.get(
      `/cb/users/get-user-bookings/${userId}`,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  /**ROOM */
  /* This  adds a new room room to the database */
  static async addRoom(formData) {
    const result = await privateAxios.post(`/cb/rooms/add`, formData, {
      headers: {
        ...this.getHeader(),
        "Content-Type": "multipart/form-data",
      },
    });
    return result.data;
  }

  /* This  gets all availavle rooms */
  static async getAllAvailableRooms() {
    const result = await myAxios.get(`/cb/rooms/all-available-rooms`);
    return result.data;
  }

  /* This gets available rooms by dates and room type */
  static async getAvailableRoomsByDateAndType(
    checkInDate,
    checkOutDate,
    roomType
  ) {
    const result = await myAxios.get(
      `/cb/rooms/available-rooms-by-date-and-type?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&roomType=${roomType}`
    );
    return result.data;
  }

  /* This gets all room types from the database */
  static async getRoomTypes() {
    const response = await myAxios.get(`/cb/rooms/types`);
    return response.data;
  }

  /* This gets all rooms from the database */
  static async getAllRooms() {
    const result = await myAxios.get(`/cb/rooms/all`);
    return result.data;
  }

  /* This gets a room by ID */
  static async getRoomById(roomId) {
    const result = await myAxios.get(`/cb/rooms/room-by-id/${roomId}`);
    return result.data;
  }

  /* This deletes a room by ID */
  static async deleteRoom(roomId) {
    const result = await privateAxios.delete(`/cb/rooms/delete/${roomId}`, {
      headers: this.getHeader(),
    });
    return result.data;
  }

  /* This updates a room */
  static async updateRoom(roomId, formData) {
    const result = await privateAxios.put(
      `/cb/rooms/update/${roomId}`,
      formData,
      {
        headers: {
          ...this.getHeader(),
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return result.data;
  }

  /**BOOKING */

  /* This  saves a new booking to the database */
  static async bookRoom(roomId, userId, booking) {
    const response = await privateAxios.post(
      `/cb/bookings/book-room/${roomId}/${userId}`,
      booking,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  /* This gets all bookings from the database */
  // static async getAllBookings() {
  //   const result = await myAxios.get(`/cb/bookings/all`, {
  //     headers: this.getHeader(),
  //   });
  //   return result.data;
  // }

  static async getAllBookings() {
    const result = await myAxios.get(`/cb/bookings/all`);
    return result.data;
  }

  /* This gets a booking by the confirmation code */
  static async getBookingByConfirmationCode(bookingCode) {
    const result = await myAxios.get(
      `/cb/bookings/get-by-confirmation-code/${bookingCode}`
    );
    return result.data;
  }

  /* This cancels a user booking */
  static async cancelBooking(bookingId) {
    const result = await privateAxios.delete(
      `/cb/bookings/cancel/${bookingId}`,
      {
        headers: this.getHeader(),
      }
    );
    return result.data;
  }

  /**AUTHENTICATION CHECKER */
  static logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  }

  static isAuthenticated() {
    const token = localStorage.getItem("token");
    return !!token;
  }

  static isAdmin() {
    const role = localStorage.getItem("role");
    return role === "ADMIN";
  }

  static isUser() {
    const role = localStorage.getItem("role");
    return role === "USER";
  }
}
