import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthForm from "../components/AuthForm";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loading } = useAuth();
  const [error, setError] = useState("");

  const handleSubmit = async (values) => {
    try {
      setError("");
      await login({
        email: values.email,
        password: values.password
      });
      navigate(location.state?.from || "/dashboard");
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  return (
    <div className="centered-page">
      <AuthForm
        mode="login"
        title="Login to book rides"
        subtitle="Access saved trips, protected booking, and your ride history."
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
      />
      <p className="switch-copy">
        No account yet? <Link to="/register">Create one here</Link>.
      </p>
    </div>
  );
}
