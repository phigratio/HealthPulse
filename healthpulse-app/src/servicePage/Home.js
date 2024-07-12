import React from "react";
import { Card, CardBody, CardText } from "reactstrap";

const Home = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem" /* Add some padding around the container */,
      }}
    >
      <Card
        style={{
          width: "65%",
          backgroundColor: "#87cefa" /* Light Blue Background */,
          color: "#003366" /* Dark Blue Text for contrast */,
          borderRadius: "12px" /* Slightly rounded corners */,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)" /* Subtle shadow */,
          padding: "2rem" /* Add padding inside the card */,
        }}
      >
        <CardBody>
          <CardText
            style={{
              fontSize: "1.2em",
              lineHeight: "1.5",
              color: "#003366" /* Dark Blue Text for readability */,
            }}
          >
            Vaccines are essential for protecting individuals and communities
            from various infectious diseases. By stimulating the immune system,
            vaccines help the body recognize and fight off pathogens more
            effectively. This not only prevents the vaccinated person from
            getting sick but also helps achieve herd immunity, protecting those
            who cannot be vaccinated. Vaccination is a crucial public health
            tool that has eradicated diseases like smallpox and significantly
            reduced the prevalence of others such as polio and measles.
          </CardText>
        </CardBody>
      </Card>
    </div>
  );
};

export default Home;
