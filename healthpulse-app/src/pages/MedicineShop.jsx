import React from "react";
import Base from "../components/Base";
import Background from "../components/basicComponents/Background"; // Import the Background component
import { Container } from "reactstrap";
import { Row, Col } from "reactstrap";

import MedicineFeed from "../components/medicineComponents/MedicineFeed";
import MedicineCategorySideMenu from "../components/medicineComponents/MedicineCategorySideMenu";

const MedicineShop = () => {
  return (
    <div>
      <Base>
        <Background />
        <Container className="mt-40">
          <Row>
            <Col md={2} className="pt-4">
              <MedicineCategorySideMenu />
            </Col>
            <Col md={10}>
              <MedicineFeed />
            </Col>
          </Row>
        </Container>
      </Base>
    </div>
  );
};

export default MedicineShop;
