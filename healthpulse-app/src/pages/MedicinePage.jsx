import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardText,
  Col,
  Container,
  Input,
  Row,
} from "reactstrap";
import Base from "../components/Base";
import { toast } from "react-toastify";
import { BASE_URL } from "../service/helper";
import { loadMedicine } from "../service/medicine_service";

const MedicinePage = () => {
  const { medicineId } = useParams();
  const [medicine, setMedicine] = useState(null);

  useEffect(() => {
    // load medicine of medicineId
    loadMedicine(medicineId)
      .then((data) => {
        console.log(data);
        setMedicine(data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in loading medicine");
      });
  }, [medicineId]);

  return (
    <Base>
      <Container className="mt-32">
        <Row>
          <Col md={8}>
            <Card>
              <CardBody>
                <CardText>
                  <h2>{medicine?.name}</h2>
                  <p>{medicine?.description}</p>
                  {medicine?.medicineCategory && (
                    <p>
                      <small>
                        <strong>Category:</strong>{" "}
                        <Link
                          to={`/medicineCategories/${medicine.medicineCategory.medicine_categoryId}`}
                        >
                          {medicine.medicineCategory.medicine_categoryTitle}
                        </Link>
                      </small>
                    </p>
                  )}
                </CardText>
              </CardBody>
            </Card>
          </Col>

          <Col md={4}>
            <Card>
              <CardBody>
                <CardText>
                  {medicine?.imageName && (
                    <div
                      className="image-container mt-4 shadow"
                      style={{ maxWidth: "100%" }}
                    >
                      <img
                        className="img-fluid"
                        src={ BASE_URL + "/users/user/image/" +medicine.imageName}
                        alt=""
                      />
                    </div>
                  )}
                </CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Base>
  );
};

export default MedicinePage;
