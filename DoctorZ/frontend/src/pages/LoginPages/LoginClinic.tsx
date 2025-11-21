// 📁 src/pages/LoginClinic.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import { Eye, EyeOff } from "lucide-react";
import api from "../../Services/mainApi";

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
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!staffId || !staffPassword) {
      Swal.fire({
        title: "Missing Info!",
        text: "Please enter both Staff ID and Password.",
        icon: "warning",
        confirmButtonText: "Ok",
      });
      return;
    }

    try {
      setLoading(true);

      const res = await api.post<LoginResponse>("/api/clinic/clinicLogin", {
        staffId,
        staffPassword,
      });

      console.log("Full response:", res.data);

      // ✅ Store token & clinic info
      localStorage.setItem("clinicToken", res.data.jwtToken);
      localStorage.setItem("authTokenClinic", res.data.jwtToken);
      localStorage.setItem("clinicId", res.data.clinic.id);

      Swal.fire({
        title: "Login Successful!",
        text: `Welcome ${res.data.clinic.staffName}! Redirecting...`,
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      setTimeout(() => navigate(`/clinicDashboard/${res.data.clinic.id}`), 1500);
    } catch (err: unknown) {
      console.error("Login error:", err);
      Swal.fire({
        title: "Login Failed!",
        text: "Invalid credentials or unauthorized access.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ✅ SEO Meta Tags */}
      <Helmet>
        <title>Clinic Login | DoctorZ Healthcare</title>
        <meta
          name="description"
          content="Login to your DoctorZ Clinic account to manage staff, appointments, and patient records."
        />
        <meta
          name="keywords"
          content="Clinic Login, DoctorZ, Healthcare Portal, Clinic Management"
        />
        <meta name="robots" content="index, follow" />
      </Helmet>

      {/* ✅ Centered Layout */}
      <div className="fixed inset-0 flex items-center justify-center bg-white z-40">
        <div className="w-[90%] max-w-md bg-white rounded-2xl shadow-lg border border-[#dfe3f7] p-8 sm:p-10 text-center transition-all duration-300">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#000000] mb-3">
            Clinic Login
          </h1>
          <p className="text-gray-500 text-sm sm:text-base mb-6">
            Sign in to access your{" "}
            <span className="font-semibold text-[#28328C]">
              clinic dashboard and records
            </span>
            .
          </p>

          <form onSubmit={handleSubmit} className="space-y-5 text-left">
            {/* Staff ID */}
            <div>
              <label
                htmlFor="staffId"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Staff ID
              </label>
              <input
                id="staffId"
                type="text"
                placeholder="Enter your Staff ID"
                value={staffId}
                onChange={(e) => setStaffId(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#28328C] bg-gray-50 text-gray-800 placeholder-gray-400 transition"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="staffPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="staffPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={staffPassword}
                  onChange={(e) => setStaffPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-[#28328C] bg-gray-50 text-gray-800 placeholder-gray-400 transition"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-[#28328C] focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff size={20} strokeWidth={1.8} />
                  ) : (
                    <Eye size={20} strokeWidth={1.8} />
                  )}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-[#28328C] hover:bg-[#1f2870] text-white font-semibold py-3 rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-0.5 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center text-gray-600 mt-6 text-sm sm:text-base">
            Don’t have an account?{" "}
            <a
              href="/clinic-register"
              className="text-[#28328C] font-medium hover:underline hover:text-[#1f2870]"
            >
              Register
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
