import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { apiRequest } from "../lib/api";

const AuthContext = createContext(null);

const STORAGE_KEY = "transiqo-auth";

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    const savedAuth = localStorage.getItem(STORAGE_KEY);
    return savedAuth ? JSON.parse(savedAuth) : { token: "", user: null };
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(auth));
  }, [auth]);

  const register = async (payload) => {
    setLoading(true);
    try {
      const data = await apiRequest("/auth/register", {
        method: "POST",
        body: payload
      });
      setAuth(data);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const login = async (payload) => {
    setLoading(true);
    try {
      const data = await apiRequest("/auth/login", {
        method: "POST",
        body: payload
      });
      setAuth(data);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setAuth({ token: "", user: null });
  };

  const value = useMemo(
    () => ({
      auth,
      loading,
      isAuthenticated: Boolean(auth.token),
      register,
      login,
      logout
    }),
    [auth, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
