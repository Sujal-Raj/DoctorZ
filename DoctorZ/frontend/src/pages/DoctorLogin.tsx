import React, { useState } from "react";
import axios from "axios";


import { useNavigate } from "react-router-dom";


interface LoginResponse {
  message: string;
  token: string;
  doctor: {
    _id: string;  // mongodb id
    doctorId: string;
    fullName: string;
    email: string;
  };
}

const DoctorLogin: React.FC = () => {
  const [doctorId, setDoctorId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post<LoginResponse>(
        "http://localhost:3000/api/doctor/login",
        { doctorId, password }
      );

      console.log("Login Response:", res.data); // 👈 Debug line
     const drId=res.data.doctor._id;



      // Save token + doctorId in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("doctorId", res.data.doctor._id);

      // Redirect to profile page
      navigate(`/doctorDashboard/${drId}`);
    } catch (err: unknown) {
  const error = err as { response?: { data?: { message?: string } } };
  setError(error.response?.data?.message || "Login failed. Please try again.");
} finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4">Doctor Login</h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <input
          type="text"
          placeholder="Doctor ID"
          value={doctorId}
          onChange={(e) => setDoctorId(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default DoctorLogin;