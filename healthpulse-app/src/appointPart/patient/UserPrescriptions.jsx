import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PrescriptionService from "../service/PrescriptionService";
import { getUser } from "../../service/user-service";
import DOMPurify from "dompurify"; // Import DOMPurify for sanitizing HTML
import "./style/UserPrescriptions.css";

const UserPrescriptions = () => {
  const { userId } = useParams(); // Extract userId from URL parameters
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null); // State to store user information
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    if (userId) {
      PrescriptionService.getPrescriptionsByPatientId(userId)
        .then((data) => {
          setPrescriptions(data);
          return getUser(userId);
        })
        .then((userData) => {
          setUser(userData);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching prescriptions or user:", error);
          setError(error);
          setLoading(false);
        });
    } else {
      setError("User ID not provided.");
      setLoading(false);
    }
  }, [userId]);

  const handleRedirect = () => {
    navigate("/appoint"); // Replace with your target route
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div className="user-prescriptions">
      <h2>{user ? `${user.name}'s Prescriptions` : "Prescriptions"}</h2>
      {prescriptions.length === 0 ? (
        <p>No prescriptions found.</p>
      ) : (
        <ul>
          {prescriptions.map((prescription) => (
            <li key={prescription.id} className="prescription-card">
              <h3>Prescription ID: {prescription.id}</h3>
              <p>
                <strong>Doctor ID:</strong> {prescription.doctorId}
              </p>
              <p
                className="prescription-content"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(prescription.prescription),
                }}
              />
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(prescription.creatingTime).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
      <button onClick={handleRedirect} className="redirect-button">
        Go to Home
      </button>
    </div>
  );
};

export default UserPrescriptions;
