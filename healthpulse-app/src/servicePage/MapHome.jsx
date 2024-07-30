import React, { useState, useEffect } from "react";
import { useLoadScript } from "@react-google-maps/api";
import Map from "../components/MapComponents/Map";
import HeartRate from "../components/LottieComponents/HeartRate";

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
      <Map />
    </div>
  );
};

export default MapHome;
