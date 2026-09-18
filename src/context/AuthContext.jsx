import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { API_BASE } from "../config/api";

const AuthContext = createContext(null);

const STORAGE_KEY = "dc_auth";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    // Check dc_auth or fallback to elora_auth
    const stored = localStorage.getItem(STORAGE_KEY) || localStorage.getItem("elora_auth");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUser(parsed.user || null);
        setToken(parsed.token || null);
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setInitialLoading(false);
  }, []);

  const persist = (payload) => {
    if (payload?.token) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } else {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem("elora_auth");
    }
  };

  const login = async (credentials) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      let data = {};
      try {
        data = await res.json();
      } catch (e) {
        throw new Error("কানেকশন আপডেট হয়েছে। দয়া করে পেজটি Hard Refresh (Ctrl + F5) দিন।");
      }
      if (!res.ok) throw new Error(data.message || "Unable to login");
      setUser(data.user);
      setToken(data.token);
      persist({ user: data.user, token: data.token });
      return data;
    } finally {
      setLoading(false);
    }
  };

  const register = async (details) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(details),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Unable to register");
      setUser(data.user);
      setToken(data.token);
      persist({ user: data.user, token: data.token });
      return data;
    } finally {
      setLoading(false);
    }
  };

  const setupAdmin = async (details) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/setup-admin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(details),
      });
      let data = {};
      try {
        data = await res.json();
      } catch (e) {
        throw new Error("কানেকশন আপডেট হয়েছে। দয়া করে পেজটি Hard Refresh (Ctrl + F5) দিন।");
      }
      if (!res.ok) throw new Error(data.message || "Unable to setup admin account");
      setUser(data.user);
      setToken(data.token);
      persist({ user: data.user, token: data.token });
      return data;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    persist(null);
  };

  const authFetch = async (url, options = {}) => {
    const headers = {
      ...(options.headers || {}),
      Authorization: token ? `Bearer ${token}` : undefined,
      "Content-Type": options.body ? "application/json" : options.headers?.["Content-Type"],
    };
    const res = await fetch(url, { ...options, headers });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.message || "Request failed");
    return data;
  };

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      initialLoading,
      isAuthenticated: Boolean(token),
      isAdmin: user?.role === "admin",
      login,
      register,
      setupAdmin,
      logout,
      authFetch,
    }),
    [user, token, loading, initialLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
