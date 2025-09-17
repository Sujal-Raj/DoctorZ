import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/client";

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
  };
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post<LoginResponse>("/api/auth/login", { email, password });
      localStorage.setItem("clinic_portal_token", res.data.token);
      navigate("/");
    } catch (err) {
      alert("Invalid login");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 mt-12">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          className="w-full border rounded-lg p-2 mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded-lg p-2 mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
}
