import { useEffect, useState } from "react";
import {
  initializeSocket,
  driverOnline,
  updateDriverLocation,
  onEvent,
  offEvent,
  acceptRide,
} from "../services/socket";

export default function DriverDashboard({ user }) {
  const [isOnline, setIsOnline] = useState(false);
  const [incomingRide, setIncomingRide] = useState(null);
  const [status, setStatus] = useState("Go online and wait for ride requests.");

  useEffect(() => {
    initializeSocket(localStorage.getItem("token"));
    onEvent("new-ride", (payload) => {
      setIncomingRide(payload.ride);
      setStatus("New ride request received.");
    });
    onEvent("ride-accepted", () => {
      setStatus("Ride accepted.");
    });
    return () => {
      offEvent("new-ride");
      offEvent("ride-accepted");
    };
  }, []);

  const handleGoOnline = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is required to go online.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        driverOnline(user.id);
        updateDriverLocation(user.id, latitude, longitude);
        setIsOnline(true);
        setStatus("Online. Waiting for nearby ride requests.");
      },
      () => setStatus("Unable to read location. Please allow location access."),
    );
  };

  const handleAcceptRide = () => {
    if (incomingRide) {
      acceptRide(user.id, incomingRide._id);
      setStatus("Ride accepted. Notifying rider.");
      setIncomingRide(null);
    }
  };

  return (
    <div className="dashboard-grid">
      <section className="dashboard-panel">
        <h2>Driver Dashboard</h2>
        <p>{status}</p>
        <button className="button" onClick={handleGoOnline} disabled={isOnline}>
          {isOnline ? "Online" : "Go Online"}
        </button>
        {incomingRide && (
          <div className="ride-card">
            <h3>Incoming Ride</h3>
            <div>
              <strong>Pickup:</strong> {incomingRide.pickup.lat.toFixed(4)},{" "}
              {incomingRide.pickup.lng.toFixed(4)}
            </div>
            <div>
              <strong>Destination:</strong>{" "}
              {incomingRide.destination.lat.toFixed(4)},{" "}
              {incomingRide.destination.lng.toFixed(4)}
            </div>
            <div>
              <strong>Fare:</strong> ${incomingRide.fare}
            </div>
            <button
              className="button button-primary"
              onClick={handleAcceptRide}
            >
              Accept Ride
            </button>
          </div>
        )}
      </section>
      <section className="map-panel">
        <div className="placeholder-panel">
          <h3>Driver Status</h3>
          <p>
            Your driver socket is connected and will receive requests when
            online.
          </p>
          <p>
            Use browser geolocation to share your location with the backend.
          </p>
        </div>
      </section>
    </div>
  );
}
