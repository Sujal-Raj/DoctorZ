import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE || "http://localhost:4000";

const api = axios.create({ baseURL });

api.interceptors.request.use((cfg) => {
  const token = localStorage.getItem("clinic_portal_token");
  if (token && cfg.headers) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export default api;
