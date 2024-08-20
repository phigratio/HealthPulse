import React, { useEffect, useState } from "react";

const YOUR_API_KEY = process.env.REACT_APP_PUBLIC_GOOGLE_MAPS_API_KEY;
const loadGoogleMapsScript = () => {
  return new Promise((resolve) => {
    if (window.google) {
      resolve(window.google);
      return;
    }
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${YOUR_API_KEY}&libraries=places`;
    script.onload = () => resolve(window.google);
    document.body.appendChild(script);
  });
};

const Places = ({ setOffice }) => {
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    const fetchHospitals = async () => {
      const google = await loadGoogleMapsScript();

      // Get current location
      const location = new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) =>
            resolve({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            }),
          (error) => reject(error)
        );
      });

      const { lat, lng } = await location;

      const map = new google.maps.Map(document.createElement("div"), {
        center: { lat, lng },
        zoom: 15,
      });

      const service = new google.maps.places.PlacesService(map);

      service.nearbySearch(
        {
          location: { lat, lng },
          radius: 5000, // Adjust radius as needed
          type: ["hospital"],
        },
        (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            setHospitals(results);
            setOffice({ lat, lng });
          }
        }
      );
    };

    fetchHospitals();
  }, [setOffice]);

  return (
    <div>
      <h2>Nearby Hospitals</h2>
      <ul>
        {hospitals.map((hospital) => (
          <li key={hospital.place_id}>
            <p>{hospital.name}</p>
            <p>{hospital.vicinity}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Places;
