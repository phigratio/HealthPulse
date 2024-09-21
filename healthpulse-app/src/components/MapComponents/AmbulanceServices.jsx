import React from "react";
import "./AmbulanceServices.css";
import ambulance1 from "./ambulance1.jpeg";
import ambulanceWebp from "./ambulance.webp";
import ambu from "./am.jpeg";
import ambul from "./ambu.jpeg";
import ambulancee from "./ambul.jpeg";

const AmbulanceServiceCard = ({ name, phoneNumber, imageUrl, price }) => (
  <div className="ambulance-card">
    <img src={imageUrl} alt={name} className="ambulance-image" />
    <h3>{name}</h3>
    <p>Phone: {phoneNumber}</p>
    <p>Estimated Price: Tk {price}</p>
  </div>
);

const AmbulanceServices = ({ calculatedCost }) => {
  const basePrice = 0; // Base price for ambulance service

  const services = [
    {
      name: "Five Pillars Ambulance",
      phoneNumber: "01726922760",
      imageUrl: ambulance1,
      priceMultiplier: 1.5,
    },
    {
      name: "Zaman Ambulance Services",
      phoneNumber: "01799999999",
      imageUrl: ambulanceWebp,
      priceMultiplier: 1.8,
    },
    {
      name: "Impulse Ambulances",
      phoneNumber: "01708104161",
      imageUrl: ambu,
      priceMultiplier: 2.0,
    },
    {
      name: "Shaheen Emergency",
      phoneNumber: "01533680671",
      imageUrl: ambul,
      priceMultiplier: 1.7,
    },
    {
      name: "Kamleshwar Ambulances",
      phoneNumber: "01712078699",
      imageUrl: ambulancee,
      priceMultiplier: 1.6,
    },
  ];

  return (
    <div className="ambulance-services">
      <h2>Ambulance Services</h2>
      <div className="ambulance-card-container">
        {services.map((service, index) => (
          <AmbulanceServiceCard
            key={index}
            {...service}
            price={Math.round(
              basePrice + calculatedCost * service.priceMultiplier
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default AmbulanceServices;
