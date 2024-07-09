import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Base from "./Base";
import { Container, Row, Col } from "reactstrap";
import MedicineCategorySideMenu from "./MedicineCategorySideMenu";
import {
  loadMedicinesCategoryWise,
  deleteMedicine,
} from "../service/medicine_service";
import { toast } from "react-toastify";
import Medicine from "./Medicine";
import Background from "./Background";

const containerStyle = { marginTop: "40px" };
const rowStyle = { display: "flex", flexWrap: "wrap" };

function MedicineCategories() {
  const [medicines, setMedicines] = useState([]);
  const { categoryId } = useParams();

  useEffect(() => {
    console.log(categoryId);
    loadMedicinesCategoryWise(categoryId)
      .then((data) => {
        setMedicines([...data]);
      })
      .catch((error) => {
        console.log(error);
        toast.error("error in loading medicines");
      });
  }, [categoryId]);

  function deleteMed(med) {
    //going to delete post
    console.log(med);
    deleteMedicine(med.medicineId)
      .then((res) => {
        console.log(res);
        toast.success("medicine is deleled..");
        let newMedicines = medicines.filter(
          (m) => m.medicineId !== med.medicineId
        );
        setMedicines([...newMedicines]);
      })
      .catch((error) => {
        console.log(error);
        toast.error("error in deleting medicine");
      });
  }

  return (
    <div>
      <Background />
      <Base>
        <Container>
          <Row>
            <Col md={2}>
              <div className="mt-56">
                <MedicineCategorySideMenu />
              </div>
            </Col>
            <Col md={10}>
              <div className="mt-32">
                <h1>Medicines Count ( {medicines.length} )</h1>
                <Container style={containerStyle} className="mt-32">
                  <Row style={rowStyle}>
                    {medicines &&
                      medicines.map((medicine, index) => (
                        <Col key={index} sm="6" md="4" lg="3">
                          <Medicine
                            medicine={medicine}
                            deleteMedicine={() =>
                              deleteMed(medicine.medicineId)
                            }
                          />
                        </Col>
                      ))}
                  </Row>
                </Container>
              </div>
            </Col>
          </Row>
        </Container>
      </Base>
    </div>
  );
}

export default MedicineCategories;
