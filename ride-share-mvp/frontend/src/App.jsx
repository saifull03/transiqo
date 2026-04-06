import { useEffect, useState } from "react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserDashboard from "./components/UserDashboard";
import DriverDashboard from "./components/DriverDashboard";
import { setAuthToken } from "./api/api";

const storedToken = localStorage.getItem("token");
const storedUser = localStorage.getItem("user");

function App() {
  const [token, setToken] = useState(storedToken || "");
  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);
  const [view, setView] = useState("login");
  const [mapsLoaded, setMapsLoaded] = useState(false);

  useEffect(() => {
    if (!token) {
      setAuthToken(null);
    } else {
      setAuthToken(token);
    }
  }, [token]);

  useEffect(() => {
    if (window.google?.maps) {
      setMapsLoaded(true);
      return;
    }
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`;
    script.async = true;
    script.defer = true;
    script.onload = () => setMapsLoaded(true);
    script.onerror = () => console.error("Google Maps failed to load");
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleLogin = ({ token: newToken, user: newUser }) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const handleLogout = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  if (!token || !user) {
    return (
      <div className="app-shell">
        <div className="auth-switch">
          <button
            onClick={() => setView("login")}
            className={view === "login" ? "active" : ""}
          >
            Login
          </button>
          <button
            onClick={() => setView("register")}
            className={view === "register" ? "active" : ""}
          >
            Register
          </button>
        </div>
        {view === "login" ? (
          <LoginPage onLogin={handleLogin} />
        ) : (
          <RegisterPage onRegister={handleLogin} />
        )}
      </div>
    );
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <h1>Ride Share MVP</h1>
          <p>
            Signed in as {user.name} ({user.role})
          </p>
        </div>
        <button className="button button-secondary" onClick={handleLogout}>
          Logout
        </button>
      </header>
      {!mapsLoaded ? (
        <div className="loading-panel">Loading map assets...</div>
      ) : user.role === "driver" ? (
        <DriverDashboard user={user} />
      ) : (
        <UserDashboard user={user} />
      )}
    </div>
  );
}

export default App;
