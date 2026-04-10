import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthForm from "../components/AuthForm";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register, loading } = useAuth();
  const [error, setError] = useState("");

  const handleSubmit = async (values) => {
    try {
      setError("");
      await register(values);
      navigate("/dashboard");
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  return (
    <div className="centered-page">
      <AuthForm
        mode="register"
        title="Create your TransiQo account"
        subtitle="Set up secure access to ride booking, fare estimates, and saved trip history."
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
      />
      <p className="switch-copy">
        Already registered? <Link to="/login">Login here</Link>.
      </p>
    </div>
  );
}
