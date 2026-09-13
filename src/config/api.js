const isProduction = import.meta.env.PROD;

export const API_BASE =
  import.meta.env.VITE_API_BASE ||
  (isProduction ? "/api" : "http://localhost:5000/api");
