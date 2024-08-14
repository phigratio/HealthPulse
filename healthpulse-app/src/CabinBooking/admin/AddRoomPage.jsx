import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../services/ApiService";
import "./style/AddRoomPage.css";

const AddRoomPage = () => {
  const navigate = useNavigate();
  const [roomDetails, setRoomDetails] = useState({
    roomPhotoUrl: "",
    roomType: "",
    hospital: "",
    roomPrice: "",
    address: "",
    roomDescription: "",
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [roomTypes, setRoomTypes] = useState([]);
  const [newRoomType, setNewRoomType] = useState(false);
  const [hospitals, setHospitals] = useState([]);
  const [newHospital, setNewHospital] = useState(false);

  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        const types = await ApiService.getRoomTypes();
        setRoomTypes(types);
      } catch (error) {
        console.error("Error fetching room types:", error.message);
      }
    };
    fetchRoomTypes();
  }, []);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const hospitals = await ApiService.getHospitals();
        setHospitals(hospitals);
      } catch (error) {
        console.error("Error fetching hospitals:", error.message);
      }
    };
    fetchHospitals();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRoomTypeChange = (e) => {
    if (e.target.value === "new") {
      setNewRoomType(true);
      setRoomDetails((prevState) => ({ ...prevState, roomType: "" }));
    } else {
      setNewRoomType(false);
      setRoomDetails((prevState) => ({
        ...prevState,
        roomType: e.target.value,
      }));
    }
  };

  const handleHospitalChange = (e) => {
    if (e.target.value === "new") {
      setNewHospital(true);
      setRoomDetails((prevState) => ({ ...prevState, hospital: "" }));
    } else {
      setNewHospital(false);
      setRoomDetails((prevState) => ({
        ...prevState,
        hospital: e.target.value,
      }));
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      setFile(null);
      setPreview(null);
    }
  };

  // const addRoom = async () => {
  //   if (
  //     !roomDetails.roomType ||
  //     !roomDetails.roomPrice ||
  //     !roomDetails.roomDescription
  //   ) {
  //     setError("All room details must be provided.");
  //     setTimeout(() => setError(""), 5000);
  //     return;
  //   }

  //   if (!window.confirm("Do you want to add this room?")) {
  //     return;
  //   }

  //   try {
  //     const formData = new FormData();
  //     formData.append("roomType", roomDetails.roomType);
  //     formData.append("roomPrice", roomDetails.roomPrice);
  //     formData.append("roomDescription", roomDetails.roomDescription);

  //     if (file) {
  //       formData.append("photo", file);
  //     }

  //     const result = await ApiService.addRoom(formData);
  //     if (result.statusCode === 200) {
  //       setSuccess("Room Added successfully.");

  //       setTimeout(() => {
  //         setSuccess("");
  //         navigate("/cabin-booking/admin/manage-rooms");
  //       }, 3000);
  //     }
  //   } catch (error) {
  //     setError(error.response?.data?.message || error.message);
  //     setTimeout(() => setError(""), 5000);
  //   }
  // };

  const addRoom = async () => {
    console.log("Add room called");
    if (
      !roomDetails.roomType ||
      !roomDetails.roomPrice ||
      !roomDetails.roomDescription
    ) {
      setError("All room details must be provided.");
      setTimeout(() => setError(""), 5000);
      return;
    }

    if (!window.confirm("Do you want to add this room?")) {
      return;
    }

    try {
      console.log("Making API call");
      const formData = new FormData();
      formData.append("roomType", roomDetails.roomType);
      formData.append("roomPrice", roomDetails.roomPrice);
      formData.append("roomDescription", roomDetails.roomDescription);
      formData.append("hospital", roomDetails.hospital);
      formData.append("address", roomDetails.address);

      if (file) {
        formData.append("photo", file);
      }

      const result = await ApiService.addRoom(formData);
      console.log("API response", result);
      if (result.statusCode === 200) {
        console.log("Room added successfully");
        setSuccess("Room Added successfully.");

        setTimeout(() => {
          setSuccess("");
          navigate("/cabin-booking/admin/manage-rooms");
        }, 3000);
      } else {
        console.log("Room addition failed", result);
      }
    } catch (error) {
      console.log("Error occurred:", error);
      setError(error.response?.data?.message || error.message);
      setTimeout(() => setError(""), 5000);
    }
  };

  return (
    <div className="cb-edit-room-container mt-24">
      <h2>Add New Room</h2>
      {error && <p className="cb-error-message">{error}</p>}
      {success && <p className="cb-success-message">{success}</p>}
      <div className="cb-edit-room-form">
        <div className="cb-form-group">
          {preview && (
            <img
              src={preview}
              alt="Room Preview"
              className="cb-room-photo-preview"
            />
          )}
          <input type="file" name="roomPhoto" onChange={handleFileChange} />
        </div>

        <div className="cb-form-group">
          <label>Room Type</label>
          <select value={roomDetails.roomType} onChange={handleRoomTypeChange}>
            <option value="">Select a room type</option>
            {roomTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
            <option value="new">Other (please specify)</option>
          </select>
          {newRoomType && (
            <input
              type="text"
              name="roomType"
              placeholder="Enter new room type"
              value={roomDetails.roomType}
              onChange={handleChange}
            />
          )}
        </div>

        <div className="cb-form-group">
          <label>Hospital</label>
          <select value={roomDetails.hospital} onChange={handleHospitalChange}>
            <option value="">Select a hospital</option>
            {hospitals.map((hospital) => (
              <option key={hospital} value={hospital}>
                {hospital}
              </option>
            ))}
            <option value="new">Other (please specify)</option>
          </select>
          {newHospital && (
            <input
              type="text"
              name="hospital"
              placeholder="Enter new hospital"
              value={roomDetails.hospital}
              onChange={handleChange}
            />
          )}
        </div>
        <div className="cb-form-group">
          <label>Room Price</label>
          <input
            type="text"
            name="roomPrice"
            value={roomDetails.roomPrice}
            onChange={handleChange}
          />
        </div>

        <div className="cb-form-group">
          <label>Cabin Location</label>
          <textarea
            name="address"
            value={roomDetails.address}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="cb-form-group">
          <label>Room Description</label>
          <textarea
            name="roomDescription"
            value={roomDetails.roomDescription}
            onChange={handleChange}
          ></textarea>
        </div>
        <button className="cb-update-button" onClick={addRoom}>
          Add Room
        </button>
      </div>
    </div>
  );
};

export default AddRoomPage;
