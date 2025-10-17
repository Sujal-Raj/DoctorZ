import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Services/client";

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
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post<LoginResponse>("/api/clinic/clinicLogin", { staffId, staffPassword },
      { withCredentials: true }
      );

      // ✅ Save JWT in cookie
      document.cookie = `authToken=${res.data.jwtToken}; path=/; max-age=86400; samesite=lax`;

      console.log("Login Response:", res.data); 
      const clinicId=res.data.clinic.id;
      // ✅ Redirect to dashboarda
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
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded-lg p-2 mb-4"
          value={staffPassword}
          onChange={(e) => setStaffPassword(e.target.value)}
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
