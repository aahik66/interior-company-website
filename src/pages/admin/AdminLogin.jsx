import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { API_BASE } from "../../config/api";
import { HiOutlineShieldCheck, HiOutlineLockClosed, HiOutlineMail, HiOutlineUser, HiOutlineArrowRight } from "react-icons/hi";
import Logo from "../../components/Logo";

export default function AdminLogin() {
  const { login, setupAdmin, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isSetupMode, setIsSetupMode] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    setupKey: "",
  });

  const from = location.state?.from?.pathname || "/admin";

  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, isAdmin, navigate, from]);

  // Check if system already has an admin
  useEffect(() => {
    async function checkAdminStatus() {
      try {
        const res = await fetch(`${API_BASE}/auth/admin-status`);
        if (res.ok) {
          const data = await res.json();
          if (!data.hasAdmin) {
            setIsSetupMode(true);
          }
        }
      } catch (err) {
        console.warn("Could not check admin status:", err);
      } finally {
        setCheckingStatus(false);
      }
    }
    checkAdminStatus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setLoading(true);

    try {
      if (isSetupMode) {
        const res = await setupAdmin({
          name: form.name,
          email: form.email,
          password: form.password,
          setupKey: form.setupKey,
        });
        setSuccessMsg("Admin account initialized successfully! Redirecting...");
        setTimeout(() => {
          navigate("/admin", { replace: true });
        }, 800);
      } else {
        const res = await login({ email: form.email, password: form.password });
        if (res.user?.role !== "admin") {
          setError("Access Denied: This user account does not have Admin privileges.");
          return;
        }
        navigate(from, { replace: true });
      }
    } catch (err) {
      setError(err.message || "Authentication failed. Please verify credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      {/* Background Decorative Blur Gradients */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-500/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        {/* Brand Header */}
        <div className="text-center">
          <Logo className="h-16 w-16 mx-auto mb-4" rounded="rounded-2xl" imgClassName="p-1.5" />
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Dimension Composition
          </h2>
          <p className="mt-1 text-xs sm:text-sm font-medium tracking-wide uppercase text-brand-400">
            {isSetupMode ? "Initial System Administration Setup" : "Content Management Portal"}
          </p>
        </div>

        {/* Login Box */}
        <div className="mt-8 bg-slate-900/90 border border-slate-800 backdrop-blur-xl py-8 px-5 sm:px-10 shadow-2xl rounded-3xl sm:rounded-2xl">
          {error && (
            <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 p-3.5 text-xs sm:text-sm text-red-400">
              {error}
            </div>
          )}

          {successMsg && (
            <div className="mb-5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3.5 text-xs sm:text-sm text-emerald-400">
              {successMsg}
            </div>
          )}

          {isSetupMode && (
            <div className="mb-5 rounded-xl border border-amber-500/20 bg-amber-500/10 p-3.5 text-xs text-amber-300">
              <strong>First Time Setup:</strong> No admin account currently exists. Complete this form to create the primary administrator account for this website.
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            {isSetupMode && (
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Admin Full Name
                </label>
                <div className="relative rounded-xl border border-slate-700 bg-slate-800/60 focus-within:border-brand-500 focus-within:ring-1 focus-within:ring-brand-500">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <HiOutlineUser className="h-5 w-5" />
                  </div>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Master Admin"
                    className="block w-full pl-10 pr-3 py-3 text-sm text-white placeholder-slate-500 bg-transparent rounded-xl focus:outline-none"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Admin Email Address
              </label>
              <div className="relative rounded-xl border border-slate-700 bg-slate-800/60 focus-within:border-brand-500 focus-within:ring-1 focus-within:ring-brand-500">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <HiOutlineMail className="h-5 w-5" />
                </div>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="admin@dimensioncomposition.com"
                  className="block w-full pl-10 pr-3 py-3 text-sm text-white placeholder-slate-500 bg-transparent rounded-xl focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative rounded-xl border border-slate-700 bg-slate-800/60 focus-within:border-brand-500 focus-within:ring-1 focus-within:ring-brand-500">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <HiOutlineLockClosed className="h-5 w-5" />
                </div>
                <input
                  type="password"
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••••••"
                  className="block w-full pl-10 pr-3 py-3 text-sm text-white placeholder-slate-500 bg-transparent rounded-xl focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 flex items-center justify-center gap-2 rounded-xl bg-brand-500 hover:bg-brand-600 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-500/20 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span>Verifying...</span>
              ) : (
                <>
                  <span>{isSetupMode ? "Create Admin & Launch Portal" : "Enter Admin Panel"}</span>
                  <HiOutlineArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Switch mode option */}
          <div className="mt-6 border-t border-slate-800/80 pt-4 text-center">
            <button
              type="button"
              onClick={() => {
                setIsSetupMode(!isSetupMode);
                setError("");
              }}
              className="text-xs text-slate-400 hover:text-brand-400 transition"
            >
              {isSetupMode ? "Already have an Admin account? Sign In" : "Need to set up new Admin credentials?"}
            </button>
          </div>
        </div>

        {/* Back to Website */}
        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-xs font-semibold text-slate-400 hover:text-white transition inline-flex items-center gap-1"
          >
            ← Return to Dimension Composition Website
          </Link>
        </div>
      </div>
    </div>
  );
}
