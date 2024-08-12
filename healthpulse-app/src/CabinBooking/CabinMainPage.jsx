import React from "react";
import Background from "../components/basicComponents/Background";
import Base from "../components/Base";

import CabinHomePage from "./home/CabinHomePage";
import Navbar from "./common/Navbar";
import { Route, Routes } from "react-router-dom";
import AllRoomsPage from "./booking_room/AllRoomsPage";
import FindBookingPage from "./booking_room/FindBookingPage";
import RoomDetailsPage from "./booking_room/RoomDetailsPage";
import AdminPage from "./admin/AdminPage";

const CabinMainPage = () => {
  return (
    <div>
      <Background />
      <Base>
        <Navbar className="mt-24" />
        <div className="main">
          <Routes>
            <Route path="/" element={<CabinHomePage />} />
            <Route path="/rooms" element={<AllRoomsPage />} />
            <Route path="/find-booking" element={<FindBookingPage />} />
            <Route
              path="/room-details-book/:roomId"
              element={<RoomDetailsPage />}
            />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </div>
      </Base>
    </div>
  );
};

export default CabinMainPage;
