import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUserDetail } from "../../auth";
import {
  getMedicationsByUser,
  deleteMedication,
} from "../Service/MedicationService";
import MedicationCard from "./MedicationCard";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Styles/Pagination.css";

const GetAllMedication = () => {
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const medicationsPerPage = 5;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMedications = async () => {
      const user = getCurrentUserDetail();
      if (user) {
        try {
          const meds = await getMedicationsByUser(user.id);
          setMedications(meds);
        } catch (error) {
          toast.error("Error fetching medications");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchMedications();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteMedication(id);
      toast.success("Medication deleted successfully!");
      setMedications(medications.filter((med) => med.id !== id));
    } catch (error) {
      toast.error("Error deleting medication");
    }
  };

  const handleUpdate = (id) => {
    navigate(`/medication/update/${id}`); // Navigate to update page with medication id
  };

  // Pagination logic
  const indexOfLastMedication = currentPage * medicationsPerPage;
  const indexOfFirstMedication = indexOfLastMedication - medicationsPerPage;
  const currentMedications = medications.slice(
    indexOfFirstMedication,
    indexOfLastMedication
  );
  const totalPages = Math.ceil(medications.length / medicationsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>All Medications</h2>
      <div className="medication-list">
        {currentMedications.length > 0 ? (
          currentMedications.map((med) => (
            <MedicationCard
              key={med.id}
              medication={med}
              onDelete={() => handleDelete(med.id)}
              onUpdate={() => handleUpdate(med.id)}
            />
          ))
        ) : (
          <p>No medications found.</p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="pagination-controls">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default GetAllMedication;
