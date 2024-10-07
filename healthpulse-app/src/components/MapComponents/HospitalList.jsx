// import React from "react";
// import "./HospitalList.css"; // Import the CSS file

// const HospitalList = ({ hospitals, onHospitalClick }) => {
//   return (
//     <div className="hospital-list">
//       {hospitals.map((hospital) => (
//         <div
//           key={hospital.place_id}
//           className="hospital-card"
//           onClick={() => onHospitalClick(hospital.geometry.location)}
//         >
//           <h2>{hospital.name}</h2>
//           <p>{hospital.vicinity}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default HospitalList;

import React from "react";
import "./HospitalList.css";

const HospitalList = ({ hospitals, onHospitalClick }) => {
  const handleHospitalClick = (location) => {
    // Scroll to the top of the page
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // Call the original onHospitalClick function
    onHospitalClick(location);
  };

  return (
    <div className="hospital-list">
      <h2>Nearest Hospitals</h2>
      {hospitals.map((hospital) => (
        <div
          key={hospital.place_id}
          className="hospital-card"
          onClick={() => handleHospitalClick(hospital.geometry.location)}
        >
          <h2>{hospital.name}</h2>
          <p>{hospital.vicinity}</p>
        </div>
      ))}
    </div>
  );
};

export default HospitalList;
