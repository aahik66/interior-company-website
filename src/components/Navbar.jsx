import { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiOutlineMenuAlt3, HiX, HiChevronDown } from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import Logo from "./Logo";

const aboutDropdownItems = [
  { label: "Overview", href: "/about#overview" },
  { label: "Our Team", href: "/about#team" },
  { label: "Quality Policy", href: "/about#quality-policy" },
  { label: "Career", href: "/about#career" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownTimeoutRef = useRef(null);

  useEffect(() => {
    // Track scroll to toggle background/blur for readability
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setAboutDropdownOpen(false);
    setMenuOpen(false);
  }, [location.pathname]);

  const navStyles =
    scrolled || menuOpen
      ? "header-texture-bar shadow-[0_10px_35px_-8px_rgba(0,0,0,0.1)]"
      : "header-texture-bar shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]";

  // Handles anchor scrolls and route navigation
  const handleAnchor = (href) => {
    setMenuOpen(false);
    setAboutDropdownOpen(false);

    if (href.includes("#")) {
      const [path, id] = href.split("#");
      const targetPath = path || "/";

      if (location.pathname !== targetPath) {
        navigate(href);
      } else {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    } else {
      navigate(href);
    }
  };

  const handleMouseEnterAbout = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setAboutDropdownOpen(true);
  };

  const handleMouseLeaveAbout = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setAboutDropdownOpen(false);
    }, 150);
  };

  const isAboutActive = location.pathname.startsWith("/about");

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${navStyles}`}>
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 text-gray-900 group"
            onClick={() => setMenuOpen(false)}
          >
            <Logo className="h-11 w-11" rounded="rounded-full" />
            <div className="leading-tight">
              <p className="text-[13px] sm:text-base font-bold uppercase tracking-[0.16em] text-black">
                Dimension
              </p>
              <p className="text-xs sm:text-sm font-semibold tracking-wider text-gray-800">
                Composition
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex flex-1 items-center justify-center gap-7">
            <Link
              to="/"
              onClick={() => handleAnchor("/")}
              className={`text-sm font-semibold transition ${
                location.pathname === "/" && !location.hash
                  ? "text-brand-500"
                  : "text-gray-700 hover:text-brand-500"
              }`}
            >
              Home
            </Link>

            <Link
              to="/portfolio"
              onClick={() => handleAnchor("/portfolio")}
              className={`text-sm font-semibold transition ${
                location.pathname === "/portfolio" || location.pathname === "/projects"
                  ? "text-brand-500"
                  : "text-gray-700 hover:text-brand-500"
              }`}
            >
              Portfolio
            </Link>

            <Link
              to="/cost-calculator"
              onClick={() => handleAnchor("/cost-calculator")}
              className={`text-sm font-semibold transition ${
                location.pathname === "/cost-calculator"
                  ? "text-brand-500"
                  : "text-gray-700 hover:text-brand-500"
              }`}
            >
              Cost Calculator
            </Link>

            <Link
              to="/#process"
              onClick={() => handleAnchor("/#process")}
              className="text-sm font-semibold text-gray-700 hover:text-brand-500 transition"
            >
              Process
            </Link>

            <Link
              to="/#testimonials"
              onClick={() => handleAnchor("/#testimonials")}
              className="text-sm font-semibold text-gray-700 hover:text-brand-500 transition"
            >
              Testimonials
            </Link>

            {/* ABOUT DROPDOWN (Exact match to bdinterior.com screenshot) */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnterAbout}
              onMouseLeave={handleMouseLeaveAbout}
            >
              <button
                type="button"
                onClick={() => setAboutDropdownOpen((prev) => !prev)}
                className={`inline-flex items-center gap-1 text-sm font-semibold transition py-2 ${
                  isAboutActive || aboutDropdownOpen
                    ? "text-brand-500"
                    : "text-gray-700 hover:text-brand-500"
                }`}
                aria-expanded={aboutDropdownOpen}
              >
                <span>About</span>
                <HiChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    aboutDropdownOpen ? "rotate-180 text-brand-500" : "text-gray-500"
                  }`}
                />
              </button>

              {/* Dropdown Menu Panel */}
              {aboutDropdownOpen && (
                <div className="absolute left-0 top-full mt-1 w-48 rounded-xl bg-white py-2 shadow-xl border border-gray-100 ring-1 ring-black/5 animate-fadeIn z-50">
                  {aboutDropdownItems.map((item) => (
                    <Link
                      key={item.label}
                      to={item.href}
                      onClick={() => handleAnchor(item.href)}
                      className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-orange-50/60 hover:text-brand-500 transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/#contact"
              onClick={() => handleAnchor("/#contact")}
              className="text-sm font-semibold text-gray-700 hover:text-brand-500 transition"
            >
              Contact
            </Link>
          </nav>

          {/* Right Action / Auth Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-700 hover:text-brand-500 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-orange-100 transition hover:-translate-y-0.5 hover:bg-brand-500"
                  onClick={() => setMenuOpen(false)}
                >
                  Join
                </Link>
              </>
            ) : (
              <>
                <span className="text-sm font-semibold text-gray-900">
                  Hi, {user?.name?.split(" ")[0] || "Guest"}
                </span>
                <button
                  type="button"
                  onClick={logout}
                  className="rounded-full border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-700 transition hover:border-brand-400 hover:text-brand-500"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            aria-label="Toggle navigation"
            className="lg:hidden text-gray-800 hover:text-brand-500 transition"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? <HiX className="h-7 w-7" /> : <HiOutlineMenuAlt3 className="h-7 w-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {menuOpen && (
        <div className="lg:hidden w-full header-texture-bar shadow-2xl border-t border-slate-200/80 max-h-[calc(100vh-4rem)] overflow-y-auto overscroll-contain relative z-10">
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 pb-8 pt-3 flex flex-col gap-1.5 relative z-10">
            <Link
              to="/"
              onClick={() => handleAnchor("/")}
              className={`rounded-xl px-3.5 py-2.5 text-base font-semibold transition ${
                location.pathname === "/" && !location.hash
                  ? "bg-brand-50 text-brand-600 font-bold"
                  : "text-gray-800 hover:bg-gray-50 hover:text-brand-500"
              }`}
            >
              Home
            </Link>

            <Link
              to="/portfolio"
              onClick={() => handleAnchor("/portfolio")}
              className={`rounded-xl px-3.5 py-2.5 text-base font-semibold transition ${
                location.pathname === "/portfolio" || location.pathname === "/projects"
                  ? "bg-brand-50 text-brand-600 font-bold"
                  : "text-gray-800 hover:bg-gray-50 hover:text-brand-500"
              }`}
            >
              Portfolio
            </Link>

            <Link
              to="/cost-calculator"
              onClick={() => handleAnchor("/cost-calculator")}
              className={`rounded-xl px-3.5 py-2.5 text-base font-semibold transition flex items-center justify-between ${
                location.pathname === "/cost-calculator"
                  ? "bg-brand-50 text-brand-600 font-bold"
                  : "text-gray-800 hover:bg-gray-50 hover:text-brand-500"
              }`}
            >
              <span>Cost Calculator</span>
              <span className="rounded-full bg-brand-100 px-2 py-0.5 text-[10px] font-bold text-brand-700">
                Instant
              </span>
            </Link>

            {/* Mobile About Accordion */}
            <div className="rounded-xl bg-gray-50/90 p-2.5">
              <button
                type="button"
                onClick={() => setMobileAboutOpen((prev) => !prev)}
                className="w-full flex items-center justify-between px-2 py-1.5 text-base font-semibold text-gray-900 hover:text-brand-500"
              >
                <span className={isAboutActive ? "text-brand-600 font-bold" : ""}>About</span>
                <HiChevronDown
                  className={`h-5 w-5 transition-transform duration-200 ${
                    mobileAboutOpen ? "rotate-180 text-brand-500" : "text-gray-500"
                  }`}
                />
              </button>

              {mobileAboutOpen && (
                <div className="mt-2 pl-3 space-y-1 border-l-2 border-brand-500/40">
                  {aboutDropdownItems.map((item) => (
                    <Link
                      key={item.label}
                      to={item.href}
                      onClick={() => handleAnchor(item.href)}
                      className="block py-2 px-2 text-sm font-medium text-gray-700 hover:text-brand-500 rounded-lg hover:bg-white transition"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/#process"
              onClick={() => handleAnchor("/#process")}
              className="rounded-xl px-3.5 py-2.5 text-base font-semibold text-gray-800 transition hover:bg-gray-50 hover:text-brand-500"
            >
              Process
            </Link>

            <Link
              to="/#testimonials"
              onClick={() => handleAnchor("/#testimonials")}
              className="rounded-xl px-3.5 py-2.5 text-base font-semibold text-gray-800 transition hover:bg-gray-50 hover:text-brand-500"
            >
              Testimonials
            </Link>

            <Link
              to="/#contact"
              onClick={() => handleAnchor("/#contact")}
              className="rounded-xl px-3.5 py-2.5 text-base font-semibold text-gray-800 transition hover:bg-gray-50 hover:text-brand-500"
            >
              Contact
            </Link>

            {/* Mobile Quick WhatsApp CTA */}
            <a
              href="https://wa.me/8801739835017?text=Hello%20Dimension%20Composition!%20I%20want%20to%20get%20a%20free%20interior%20design%20consultation."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-bold text-white shadow-md shadow-green-500/20 transition hover:bg-[#20bd5a]"
            >
              <FaWhatsapp className="h-4 w-4" />
              <span>Chat on WhatsApp</span>
            </a>

            {!isAuthenticated ? (
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100 mt-1">
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl border border-gray-200 px-3 py-2.5 text-sm font-semibold text-center text-gray-800 transition hover:border-brand-400 hover:text-brand-500"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-3 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-brand-500"
                >
                  Join
                </Link>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-3 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-brand-500"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
