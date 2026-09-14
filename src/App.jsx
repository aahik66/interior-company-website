import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MotionBackground from "./components/MotionBackground";
import FloatingContact from "./components/FloatingContact";

import Home from "./pages/Home";
import Projects from "./pages/Projects";
import About from "./pages/About";
import CostCalculator from "./pages/CostCalculator";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Admin Components
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminRoute from "./components/admin/AdminRoute";

// Public Layout Wrapper
function PublicLayout() {
  return (
    <div className="relative w-full min-h-screen bg-transparent text-gray-800 overflow-x-hidden">
      {/* Subtle Ambient Background */}
      <MotionBackground />

      {/* Foreground Page Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1">
          <Outlet />
        </div>
        <Footer />

        {/* Floating WhatsApp & Direct Consultation Action Button */}
        <FloatingContact />
      </div>
    </div>
  );
}

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out",
      once: true,
      offset: 80,
    });
  }, []);

  return (
    <Router>
      <Routes>
        {/* Admin Console Routes (No Navbar/Footer overlap) */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/*"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        />

        {/* Public Website Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/portfolio" element={<Projects />} />
          <Route path="/cost-calculator" element={<CostCalculator />} />
          <Route path="/about" element={<About />} />
          <Route path="/about/:section" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
