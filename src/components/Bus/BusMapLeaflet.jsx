import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { ref, onValue } from "firebase/database";
import { db } from "../../firebase";
import "leaflet/dist/leaflet.css";

const center = [11.368868, 77.793071];

function BusMapLeaflet() {
  const [userLocation, setUserLocation] = useState(null);
  const [buses, setBuses] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation([pos.coords.latitude, pos.coords.longitude]);
      },
      () => alert("Location permission denied")
    );
  }, []);

  useEffect(() => {
    const busRef = ref(db, "buses");
    onValue(busRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        setBuses([]);
        return;
      }
      setBuses(Object.values(data));
    });
  }, []);

  return (
    <MapContainer
      center={userLocation || center}
      zoom={14}
      style={{ height: "580px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />

      {userLocation && (
        <Marker position={userLocation}>
          <Popup>You are here</Popup>
        </Marker>
      )}

      {buses.map((bus, index) => (
        <Marker key={index} position={[bus.lat, bus.lng]}>
          <Popup>
            <b>{bus.name || "Bus"}</b><br />
            Route: {bus.route || "Unknown"}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default BusMapLeaflet;
