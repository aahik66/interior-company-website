import { useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MotionBackground from "./components/MotionBackground";
import FloatingContact from "./components/FloatingContact";
import Preloader from "./components/Preloader";

// Lazy-loaded pages for mobile speed optimization & smaller JS bundle size
const Home = lazy(() => import("./pages/Home"));
const Projects = lazy(() => import("./pages/Projects"));
const About = lazy(() => import("./pages/About"));
const CostCalculator = lazy(() => import("./pages/CostCalculator"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogSingle = lazy(() => import("./pages/BlogSingle"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));

// Admin Components (Lazy Loaded)
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));
const AdminRoute = lazy(() => import("./components/admin/AdminRoute"));

const PageFallback = () => (
  <div className="flex min-h-[60vh] w-full items-center justify-center p-8">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-500 border-t-transparent" />
  </div>
);

// Public Layout Wrapper
function PublicLayout() {
  return (
    <div className="relative w-full min-h-screen bg-white text-gray-800 overflow-x-hidden">
      {/* Luxury Cinematic Brand Reveal Preloader on initial load and refresh */}
      <Preloader />

      {/* Subtle Ambient Background */}
      <MotionBackground />

      {/* Foreground Page Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1">
          <Suspense fallback={<PageFallback />}>
            <Outlet />
          </Suspense>
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
      <Suspense fallback={<PageFallback />}>
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
            <Route path="/projects/category/:categorySlug" element={<Projects />} />
            <Route path="/portfolio" element={<Projects />} />
            <Route path="/portfolio/category/:categorySlug" element={<Projects />} />
            <Route path="/cost-calculator" element={<CostCalculator />} />
            <Route path="/about" element={<About />} />
            <Route path="/about/:section" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/category/:categorySlug" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogSingle />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
