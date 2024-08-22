import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getPendingDoctors,
  approveDoctor,
  rejectDoctor,
} from "../../service/user-service";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Row,
  Col,
} from "reactstrap";

const PendingDoctorsPage = () => {
  const [pendingDoctors, setPendingDoctors] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Fetch pending doctors on component mount
    getPendingDoctors()
      .then((data) => {
        setPendingDoctors(data);
      })
      .catch((error) => {
        console.error("Error fetching pending doctors:", error);
      });
  }, []);

  const handleDetails = (doctorId) => {
    navigate(`/user/my-profile/${doctorId}`); // Navigate to the doctor's profile page
  };

  return (
    <div className="container mt-5">
      <h2>Pending Doctors</h2>
      <Row>
        {pendingDoctors.map((doctor) => (
          <Col key={doctor.id} md={4} className="mb-4">
            <Card>
              <CardBody>
                <CardTitle tag="h5">{doctor.name}</CardTitle>
                <CardText>
                  <strong>Specialization:</strong> {doctor.specialization}
                  <br />
                  <strong>Email:</strong> {doctor.email}
                </CardText>
                <Button
                  color="success"
                  onClick={() => handleDetails(doctor.id)}
                >
                  See Details
                </Button>{" "}
                {/* Uncomment if you want to include the reject button */}
                {/* <Button color="danger" onClick={() => handleReject(doctor.id)}>
                  Reject
                </Button> */}
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default PendingDoctorsPage;
