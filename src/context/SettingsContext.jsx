import { createContext, useContext, useEffect, useState } from "react";
import { API_BASE } from "../config/api";

const SettingsContext = createContext(null);

const DEFAULT_SETTINGS = {
  companyName: "Dimension Composition",
  tagline: "Luxury Interior Architecture & Turnkey Design Studio",
  phoneNumber: "+8801700000000",
  whatsappNumber: "8801700000000",
  email: "contact@dimensioncomposition.com",
  address: "House #42, Road #11, Block D, Banani, Dhaka-1213, Bangladesh",
  facebookUrl: "https://facebook.com",
  instagramUrl: "https://instagram.com",
  youtubeUrl: "https://youtube.com",
  linkedinUrl: "https://linkedin.com",
  officeHours: "Sat - Thu: 9:30 AM - 7:30 PM (Friday Closed)",
  heroVideoUrl: "https://bdinterior.com/wp-content/uploads/2025/09/homepage-Video-3.mp4",
  heroPosterUrl: "/assets/hero.jpg",
  heroTitle: "Leading Interior Design Company in Bangladesh",
  heroSubtitle:
    "Award-winning interior architecture and turnkey design studio in Bangladesh. 15+ years experience, 700+ successful projects. Get expert design consultation for your dream home & corporate office.",
};

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const res = await fetch(`${API_BASE}/settings`);
      if (res.ok) {
        const data = await res.json();
        setSettings((prev) => ({ ...prev, ...data }));
      }
    } catch (err) {
      console.warn("Could not fetch settings, using defaults", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        settings,
        loading,
        refreshSettings: fetchSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  return context || { settings: DEFAULT_SETTINGS, loading: false, refreshSettings: () => {} };
}
