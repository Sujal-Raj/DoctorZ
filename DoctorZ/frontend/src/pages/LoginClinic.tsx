import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Services/mainApi";

interface LoginResponse {
  message: string;
  clinic: {
    id: string;
    staffId: string;
    staffName: string;
    staffEmail: string;
    clinicName: string;
  };
  jwtToken: string;
}

export default function LoginClinic() {
  const [staffId, setStaffId] = useState("");
  const [staffPassword, setStaffPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await api.post<LoginResponse>("/api/clinic/clinicLogin", {
        staffId,
        staffPassword,
      });

      console.log("Full response data:", res.data); // Check full response object
      console.log("JWT token from response:", res.data.jwtToken); // Check the token field
      // ✅ Store token in localStorage
      localStorage.setItem("authTokenClinic", res.data.jwtToken);

      alert(res.data.message);
    navigate(`/clinicDashboard/${clinicId}`);
    localStorage.setItem("clinicId", clinicId);
    localStorage.setItem("clinicToken", res.data.jwtToken);
    } catch (err: unknown) {
      alert(err+ "Invalid login");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 mt-12">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Clinic Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Staff ID"
          className="w-full border rounded-lg p-2 mb-4"
          value={staffId}
          onChange={(e) => setStaffId(e.target.value)}
          required
          disabled={loading}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded-lg p-2 mb-4"
          value={staffPassword}
          onChange={(e) => setStaffPassword(e.target.value)}
          required
          disabled={loading}
        />
        {errorMsg && (
          <p className="text-red-600 mb-4 text-sm font-medium">{errorMsg}</p>
        )}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-700 transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
