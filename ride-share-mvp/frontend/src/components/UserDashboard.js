import { useEffect, useState } from "react";
import {
  initializeSocket,
  registerUserSocket,
  onEvent,
  offEvent,
} from "../services/socket";
import { requestRide } from "../api/api";
import MapPicker from "./MapPicker";

export default function UserDashboard({ user }) {
  const [pickup, setPickup] = useState(null);
  const [destination, setDestination] = useState(null);
  const [rideInfo, setRideInfo] = useState(null);
  const [message, setMessage] = useState(
    "Select pickup and destination on the map.",
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const socket = initializeSocket(localStorage.getItem("token"));
    registerUserSocket(user.id);
    onEvent("ride-accepted", (payload) => {
      setRideInfo((prev) => ({
        ...prev,
        status: "accepted",
        acceptedBy: payload.driverId,
      }));
      setMessage("Your ride was accepted!");
    });
    return () => {
      offEvent("ride-accepted");
    };
  }, [user.id]);

  const handleLocationSelect = (location) => {
    if (!pickup) {
      setPickup(location);
      setMessage("Pickup set. Now choose your destination.");
      return;
    }
    setDestination(location);
    setMessage("Destination set. Request your ride when ready.");
  };

  const handleRequestRide = async () => {
    if (!pickup || !destination) {
      setMessage("Please set both pickup and destination.");
      return;
    }
    setLoading(true);
    try {
      const data = await requestRide({ pickup, destination });
      setRideInfo({ ...data.ride, status: data.ride.status });
      setMessage(
        `Ride requested. Notifying ${data.nearbyDrivers} nearby drivers.`,
      );
    } catch (err) {
      setMessage(err.response?.data?.message || "Unable to request ride");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-grid">
      <section className="dashboard-panel">
        <h2>Request a Ride</h2>
        <p>{message}</p>
        <div className="ride-details">
          <div>
            <strong>Pickup:</strong>{" "}
            {pickup
              ? `${pickup.lat.toFixed(4)}, ${pickup.lng.toFixed(4)}`
              : "Not set"}
          </div>
          <div>
            <strong>Destination:</strong>{" "}
            {destination
              ? `${destination.lat.toFixed(4)}, ${destination.lng.toFixed(4)}`
              : "Not set"}
          </div>
          {rideInfo && (
            <div>
              <strong>Fare:</strong> ${rideInfo.fare}
              <br />
              <strong>Status:</strong> {rideInfo.status}
            </div>
          )}
        </div>
        <button
          className="button"
          onClick={handleRequestRide}
          disabled={loading}
        >
          {loading ? "Requesting..." : "Request Ride"}
        </button>
      </section>

      <section className="map-panel">
        <MapPicker
          pickup={pickup}
          destination={destination}
          drivers={[]}
          onSelectLocation={handleLocationSelect}
        />
      </section>
    </div>
  );
}
