import { Link, NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Layout() {
  const { isAuthenticated, logout, auth } = useAuth();

  return (
    <div className="app-shell">
      <header className="topbar">
        <Link to="/" className="brand">
          <span className="brand-mark">TQ</span>
          <div>
            <p>TransiQo</p>
            <span>Map-first ride sharing</span>
          </div>
        </Link>

        <nav className="nav-links">
          <NavLink to="/">Home</NavLink>
          {isAuthenticated && <NavLink to="/dashboard">Dashboard</NavLink>}
          {!isAuthenticated ? (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register" className="nav-cta">
                Get Started
              </NavLink>
            </>
          ) : (
            <button type="button" className="ghost-button" onClick={logout}>
              Log out {auth.user?.name?.split(" ")[0]}
            </button>
          )}
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
