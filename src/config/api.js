const isProduction = import.meta.env.PROD;

export const API_BASE =
  import.meta.env.VITE_API_BASE ||
  (isProduction
    ? "https://interior-company-website.onrender.com/api"
    : "http://localhost:5000/api");

