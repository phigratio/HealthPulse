import React from "react";
import Base from "../components/Base";
import Background from "../components/basicComponents/Background"; // Import the Background component
import { Container } from "reactstrap";
import { Row, Col } from "reactstrap";

import FoodFeed from "../components/foodComponents/FoodFeed";
import FoodCategorySideMenu from "../components/foodComponents/FoodCategorySideMenu";

const FoodShop = () => {
  return (
    <div>
      <Base>
        <Background />
        <Container style={{ marginTop: "10vh" }}> 
          <Row>
            <Col md={2} className="pt-4 mt-4">
              <FoodCategorySideMenu />
            </Col>
            <Col md={10}>
              <FoodFeed />
            </Col>
          </Row>
        </Container>
      </Base>
    </div>
  );
};

export default FoodShop;
