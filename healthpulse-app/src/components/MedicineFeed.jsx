import React, { useState, useEffect } from "react";
import { loadAllMedicines, deleteMedicine } from "../service/medicine_service";
import { toast } from "react-toastify";
import Medicine from "./Medicine";
import { Row, Col, Container } from "reactstrap";

const MedicineFeed = () => {
  const [medicineContent, setMedicineContent] = useState([]);

  useEffect(() => {
    loadMedicines();
  }, []);

  const loadMedicines = () => {
    loadAllMedicines()
      .then((data) => {
        setMedicineContent(data);
      })
      .catch((error) => {
        toast.error("Error in loading medicines");
        console.error("Error loading medicines:", error);
      });
  };

  const doDeleteMedicine = (medicineId) => {
    deleteMedicine(medicineId)
      .then((data) => {
        toast.success("Medicine deleted successfully");
        setMedicineContent((prevContent) =>
          prevContent.filter((med) => med.medicineId !== medicineId)
        );
      })
      .catch((error) => {
        toast.error("Error in deleting medicine");
        console.error("Error deleting medicine:", error);
      });
  };

  const containerStyle = {
    padding: "20px",
  };

  const rowStyle = {
    marginBottom: "20px",
  };

  return (
    <div >
      <Container style={containerStyle} >
        <Row style={rowStyle}>
          {medicineContent.map((medicine, index) => (
            <Col key={index} sm="6" md="4" lg="3">
              <Medicine
                medicine={medicine}
                deleteMedicine={() => doDeleteMedicine(medicine.medicineId)}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default MedicineFeed;
