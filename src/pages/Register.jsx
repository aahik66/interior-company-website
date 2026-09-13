import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await register(form);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="w-full bg-gray-50 min-h-screen flex items-center">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="mx-auto w-full max-w-lg rounded-2xl sm:rounded-3xl border border-gray-100 bg-white p-5 sm:p-8 shadow-[0_14px_40px_-30px_rgba(0,0,0,0.35)]">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-500">Register</p>
          <h1 className="mt-1 sm:mt-2 text-2xl sm:text-3xl font-bold text-gray-900">Join Dimension Composition</h1>
          <p className="mt-1 text-xs sm:text-sm text-gray-600">Create an account to submit real reviews.</p>

          <form className="mt-5 sm:mt-6 space-y-4" onSubmit={handleSubmit}>
            <label className="flex flex-col gap-2 text-sm text-gray-700" htmlFor="register-name">
              Full name
              <input
                required
                type="text"
                id="register-name"
                name="name"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm text-gray-800 focus:border-brand-500 focus:outline-none"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-gray-700" htmlFor="register-email">
              Email
              <input
                required
                type="email"
                id="register-email"
                name="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className="rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm text-gray-800 focus:border-brand-500 focus:outline-none"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-gray-700" htmlFor="register-password">
              Password
              <input
                required
                type="password"
                id="register-password"
                name="password"
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                className="rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm text-gray-800 focus:border-brand-500 focus:outline-none"
              />
            </label>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-gray-900 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-brand-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Register"}
            </button>
          </form>

          <p className="mt-4 text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-brand-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

