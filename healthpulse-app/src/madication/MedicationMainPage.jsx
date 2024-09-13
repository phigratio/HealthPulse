import React from "react";
import { Route, Routes } from "react-router-dom";
import Background from "../components/basicComponents/Background";
import Base from "../components/Base";
import MedicationHomePage from "./Pages/MedicationHomePage";
import UpdateMedication from "./Components/UpdateMedication";
import AddMedication from "./Components/AddMedication";

const MedicationMainPage = () => {
  return (
    <div>
      <Background />
      <Base>
        <div className="mt-10">
          <Routes>
            <Route path="/" element={<MedicationHomePage />} />
            <Route path="/update/:id" element={<UpdateMedication />} />
            <Route path="/add" element={<AddMedication />} />
          </Routes>
        </div>
      </Base>
    </div>
  );
};

export default MedicationMainPage;
