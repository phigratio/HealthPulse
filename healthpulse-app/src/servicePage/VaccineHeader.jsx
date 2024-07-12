import React from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import "../style/servicePage/VaccineHeader.css";

const VaccineHeader = () => {
  return (
    <Card
      className="vaccine-header-card"
      style={{ backgroundColor: "#2c3e50", color: "white" }} // Inline styles
    >
      <CardBody>
        <CardTitle className="vaccine-header-title">
          Welcome to Vaccine Corner
        </CardTitle>
      </CardBody>
    </Card>
  );
};

export default VaccineHeader;
