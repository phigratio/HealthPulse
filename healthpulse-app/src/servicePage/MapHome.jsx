import React, { useState, useEffect } from "react";
import { useLoadScript } from "@react-google-maps/api";
import Map from "../components/MapComponents/Map";
import HeartRate from "../components/LottieComponents/HeartRate";
import Background from "../components/basicComponents/Background";
import Base from "../components/Base";

const MapHome = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });
  if (!isLoaded)
    return (
      <div>
        <HeartRate />
      </div>
    );

  return (
    <div>
      <Background />
      <Base>
        <Map />
      </Base>
    </div>
  );
};

export default MapHome;
