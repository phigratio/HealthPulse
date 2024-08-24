import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
} from "@react-google-maps/api";
import markerHospital from "./hospital-marker-48.png";
import "./Map.css";
import Distance from "./Distance";
import HospitalList from "./HospitalList";
import { mapsApi } from "../../servicePage/apiKeys";
import AmbulanceServices from "./AmbulanceServices";
//b181cac70f27f5e6
const YOUR_API_KEY = mapsApi;
const Map = () => {
  const [office, setOffice] = useState(null);
  const [directions, setDirections] = useState(null);
  const [calculatedCost, setCalculatedCost] = useState(0);
  const [hospitals, setHospitals] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const mapRef = useRef(null);
  const options = useMemo(
    () => ({
      mapId: "e103b58ca6729d88",
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );
  const handleCostCalculated = useCallback((cost) => {
    setCalculatedCost(cost);
  }, []);
  const onLoad = useCallback((map) => (mapRef.current = map), []);

  const fetchDirections = (house) => {
    if (!office) return;

    const service = new window.google.maps.DirectionsService();
    service.route(
      {
        origin: house,
        destination: office,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK" && result) {
          setDirections(result);
        }
      }
    );
  };

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
      setCurrentLocation({ lat, lng });
      setOffice({ lat, lng });

      const map = new google.maps.Map(document.createElement("div"), {
        center: { lat, lng },
        zoom: 15,
      });

      const service = new google.maps.places.PlacesService(map);

      service.nearbySearch(
        {
          location: { lat, lng },
          radius: 5000,
          type: ["hospital"],
        },
        (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            setHospitals(results);
          }
        }
      );
    };

    fetchHospitals();
  }, []);

  if (!window.google) return <div>Loading...</div>;

  return (
    <div>
      <div className="container">
        <div className="map">
          <GoogleMap
            zoom={15}
            center={currentLocation}
            mapContainerClassName="map-container"
            options={options}
            onLoad={onLoad}
          >
            {directions && (
              <DirectionsRenderer
                directions={directions}
                options={{
                  polylineOptions: {
                    zIndex: 50,
                    strokeColor: "#1976D2",
                    strokeWeight: 5,
                  },
                }}
              />
            )}

            {office && (
              <>
                <Marker
                  position={office}
                  icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
                />

                <MarkerClusterer>
                  {(clusterer) =>
                    hospitals.map((hospital) => (
                      <Marker
                        key={hospital.place_id}
                        position={{
                          lat: hospital.geometry.location.lat(),
                          lng: hospital.geometry.location.lng(),
                        }}
                        icon={markerHospital}
                        clusterer={clusterer}
                        onClick={() => {
                          fetchDirections(hospital.geometry.location);
                        }}
                      />
                    ))
                  }
                </MarkerClusterer>

                <Circle center={office} radius={1500} options={closeOptions} />
                <Circle center={office} radius={3000} options={middleOptions} />
                <Circle center={office} radius={4500} options={farOptions} />
              </>
            )}
            {directions && directions.routes && directions.routes[0] && (
              <Distance
                leg={directions.routes[0].legs[0]}
                onCostCalculated={handleCostCalculated}
              />
            )}
          </GoogleMap>
        </div>
      </div>

      <AmbulanceServices calculatedCost={calculatedCost} />
      <HospitalList hospitals={hospitals} onHospitalClick={fetchDirections} />
    </div>
  );
};

const defaultOptions = {
  strokeOpacity: 0.5,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
};
const closeOptions = {
  ...defaultOptions,
  zIndex: 3,
  fillOpacity: 0.05,
  strokeColor: "#8BC34A",
  fillColor: "#8BC34A",
};
const middleOptions = {
  ...defaultOptions,
  zIndex: 2,
  fillOpacity: 0.05,
  strokeColor: "#FBC02D",
  fillColor: "#FBC02D",
};
const farOptions = {
  ...defaultOptions,
  zIndex: 1,
  fillOpacity: 0.05,
  strokeColor: "#FF5252",
  fillColor: "#FF5252",
};

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

export default Map;
