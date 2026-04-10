import { Link } from "react-router-dom";
import RidePlanner from "../components/RidePlanner";
import { useAuth } from "../context/AuthContext";

export default function HomePage() {
  const { isAuthenticated, auth } = useAuth();

  return (
    <div className="page">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">MERN Ride Sharing Platform</p>
          <h1>Build trips from the map, compare ride types, and book in seconds.</h1>
          <p className="hero-text">
            TransiQo is a full-stack starter for a ride sharing website with React, Node,
            Express, MongoDB, JWT authentication, and map-based pickup and destination
            selection.
          </p>

          <div className="hero-actions">
            <Link to={isAuthenticated ? "/dashboard" : "/register"} className="primary-button">
              {isAuthenticated ? `Continue as ${auth.user?.name?.split(" ")[0]}` : "Create an account"}
            </Link>
            <a href="#planner" className="secondary-link">
              Explore the planner
            </a>
          </div>

          <div className="stats-grid">
            <article>
              <strong>3 ride tiers</strong>
              <span>Moto, Economy, Premium</span>
            </article>
            <article>
              <strong>JWT auth</strong>
              <span>Register, login, protected bookings</span>
            </article>
            <article>
              <strong>Map-first UX</strong>
              <span>Pickup and destination directly on the map</span>
            </article>
          </div>
        </div>

        <div className="hero-card">
          <p className="eyebrow">Why this setup works</p>
          <ul className="feature-list">
            <li>Frontend in React with client-side routing and protected pages.</li>
            <li>Backend in Express with MongoDB models for users and ride bookings.</li>
            <li>Fare estimation API that turns selected coordinates into ride options.</li>
            <li>Reusable foundation for driver matching, payments, and live tracking.</li>
          </ul>
        </div>
      </section>

      <div id="planner">
        <RidePlanner />
      </div>
    </div>
  );
}
