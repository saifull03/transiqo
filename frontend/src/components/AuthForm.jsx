import { useState } from "react";

const initialValues = {
  name: "",
  email: "",
  password: ""
};

export default function AuthForm({
  mode = "login",
  title,
  subtitle,
  onSubmit,
  loading,
  error
}) {
  const [form, setForm] = useState(initialValues);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(form);
  };

  return (
    <section className="auth-card">
      <div>
        <p className="eyebrow">{mode === "login" ? "Welcome back" : "Create account"}</p>
        <h1>{title}</h1>
        <p className="muted-text">{subtitle}</p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        {mode === "register" && (
          <label>
            Full name
            <input
              name="name"
              type="text"
              placeholder="Saiful Islam"
              value={form.name}
              onChange={handleChange}
              required
            />
          </label>
        )}

        <label>
          Email
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Password
          <input
            name="password"
            type="password"
            placeholder="Minimum 6 characters"
            value={form.password}
            onChange={handleChange}
            minLength={6}
            required
          />
        </label>

        <button type="submit" className="primary-button" disabled={loading}>
          {loading ? "Please wait..." : mode === "login" ? "Login" : "Create Account"}
        </button>

        {error && <p className="status error">{error}</p>}
      </form>
    </section>
  );
}
