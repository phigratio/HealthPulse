import React from "react";
import { Route, Routes } from "react-router-dom";
import Background from "../components/basicComponents/Background";
import Base from "../components/Base";
import TrackerNavbar from "./Components/TrackerNavbar";
import TrackerHomePage from "./Pages/TrackerHomePage";
import UpdateTrackerData from "./Components/UpdateTrakerData";
import UpdateTarget from "./Components/UpdateTarget";

const HealthTrackerMainPage = () => {
  return (
    <div>
      <Background />
      <Base>
        <div className="mt-10">
          <TrackerNavbar />

          <Routes>
            <Route path="/" element={<TrackerHomePage />} />
            <Route path="/update" element={<UpdateTrackerData />} />
            <Route path="/update-target" element={<UpdateTarget />} />
          </Routes>
        </div>
      </Base>
    </div>
  );
};

export default HealthTrackerMainPage;
