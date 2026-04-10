import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { apiRequest } from "../lib/api";
import { getDrivingRoute } from "../lib/routing";
import MapSelector from "./MapSelector";

export default function RidePlanner() {
  const baseFare = 100;
  const perKmRate = 60;
  const navigate = useNavigate();
  const { auth, isAuthenticated } = useAuth();
  const [pickup, setPickup] = useState(null);
  const [destination, setDestination] = useState(null);
  const [routeData, setRouteData] = useState(null);
  const [estimate, setEstimate] = useState(null);
  const [activeRideId, setActiveRideId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loadingEstimate, setLoadingEstimate] = useState(false);
  const [bookingRide, setBookingRide] = useState(false);
  const [rideHistory, setRideHistory] = useState([]);

  const loadRideHistory = async () => {
    if (!auth.token) {
      return;
    }

    try {
      const data = await apiRequest("/rides/my-rides", {
        token: auth.token
      });
      setRideHistory(data.rides);
    } catch (_error) {
      setRideHistory([]);
    }
  };

  useEffect(() => {
    loadRideHistory();
  }, [auth.token]);

  useEffect(() => {
    const loadRoute = async () => {
      if (!pickup || !destination) {
        setRouteData(null);
        return;
      }

      try {
        setError("");
        const route = await getDrivingRoute(pickup, destination);
        setRouteData(route);
      } catch (requestError) {
        setRouteData(null);
        setError(requestError.message);
      }
    };

    loadRoute();
  }, [pickup, destination]);

  const getEstimate = async () => {
    if (!pickup || !destination) {
      setError("Please select both pickup and destination on the map.");
      return;
    }

    setLoadingEstimate(true);
    setError("");
    setMessage("");

    try {
      const activeRoute = routeData ?? (await getDrivingRoute(pickup, destination));
      const data = await apiRequest("/rides/estimate", {
        method: "POST",
        body: {
          pickup,
          destination,
          distanceKm: activeRoute.distanceKm
        }
      });
      setEstimate(data);
      setRouteData(activeRoute);
      setActiveRideId(data.rideOptions[0]?.id ?? "");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoadingEstimate(false);
    }
  };

  const handleBooking = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (!activeRideId) {
      setError("Select a ride type before booking.");
      return;
    }

    setBookingRide(true);
    setError("");
    setMessage("");

    try {
      const data = await apiRequest("/rides/book", {
        method: "POST",
        token: auth.token,
        body: {
          pickup,
          destination,
          rideType: activeRideId,
          distanceKm: routeData?.distanceKm
        }
      });
      setMessage(`${data.ride.rideType} ride confirmed for ৳${data.ride.fare}.`);
      await loadRideHistory();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setBookingRide(false);
    }
  };

  return (
    <section className="planner-grid">
      <div className="panel">
        <div className="panel-head">
          <div>
            <p className="eyebrow">Ride planner</p>
            <h2>Choose your trip directly on the map</h2>
          </div>
          <button
            type="button"
            className="ghost-button"
            onClick={() => {
              setPickup(null);
              setDestination(null);
              setRouteData(null);
              setEstimate(null);
              setActiveRideId("");
              setError("");
              setMessage("");
            }}
          >
            Reset
          </button>
        </div>

        <MapSelector
          pickup={pickup}
          destination={destination}
          routePath={routeData?.coordinates}
          setPickup={setPickup}
          setDestination={setDestination}
        />

        <div className="location-summary">
          <div>
            <span>Pickup</span>
            <strong>{pickup?.label || "Tap the map to set pickup"}</strong>
          </div>
          <div>
            <span>Destination</span>
            <strong>{destination?.label || "Tap the map to set destination"}</strong>
          </div>
        </div>

        {routeData && (
          <div className="route-summary">
            <div>
              <span>Road distance</span>
              <strong>{routeData.distanceKm} km</strong>
            </div>
            <div>
              <span>Estimated drive time</span>
              <strong>{routeData.durationMinutes} min</strong>
            </div>
          </div>
        )}

        {routeData && (
          <p className="muted-text">
            Fare calculation: {baseFare} TK + ({routeData.distanceKm} km x {perKmRate} TK) ={" "}
            {baseFare + routeData.distanceKm * perKmRate} TK
          </p>
        )}

        <button type="button" className="primary-button" onClick={getEstimate} disabled={loadingEstimate}>
          {loadingEstimate ? "Calculating fare..." : "Show ride options"}
        </button>

        {error && <p className="status error">{error}</p>}
        {message && <p className="status success">{message}</p>}
      </div>

      <div className="sidebar-stack">
        <div className="panel">
          <p className="eyebrow">Ride types</p>
          <h3>Estimated options</h3>
          {estimate ? (
            <>
              <p className="muted-text">Distance: {estimate.distanceKm} km</p>
              <div className="ride-option-list">
                {estimate.rideOptions.map((ride) => (
                  <button
                    key={ride.id}
                    type="button"
                    className={`ride-card ${activeRideId === ride.id ? "active" : ""}`}
                    onClick={() => setActiveRideId(ride.id)}
                  >
                    <div>
                      <strong>{ride.name}</strong>
                      <p>{ride.description}</p>
                    </div>
                    <div className="ride-meta">
                      <span>{ride.etaMinutes} min away</span>
                      <strong>৳{ride.fare}</strong>
                    </div>
                  </button>
                ))}
              </div>

              <button type="button" className="primary-button" onClick={handleBooking} disabled={bookingRide}>
                {bookingRide
                  ? "Booking ride..."
                  : isAuthenticated
                    ? "Confirm booking"
                    : "Login to book your ride"}
              </button>
            </>
          ) : (
            <p className="muted-text">
              Select pickup and destination on the map, then calculate fares to see ride choices.
            </p>
          )}
        </div>

        <div className="panel">
          <p className="eyebrow">Recent rides</p>
          <h3>Your booking history</h3>
          {isAuthenticated ? (
            rideHistory.length > 0 ? (
              <div className="history-list">
                {rideHistory.map((ride) => (
                  <article key={ride._id} className="history-item">
                    <div>
                      <strong>{ride.rideType}</strong>
                      <p>
                        {ride.pickup.label} to {ride.destination.label}
                      </p>
                    </div>
                    <div className="ride-meta">
                      <span>{ride.distanceKm} km</span>
                      <strong>৳{ride.fare}</strong>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <p className="muted-text">No rides booked yet. Your next trip will show up here.</p>
            )
          ) : (
            <p className="muted-text">Log in to store bookings and view your ride history.</p>
          )}
        </div>
      </div>
    </section>
  );
}
