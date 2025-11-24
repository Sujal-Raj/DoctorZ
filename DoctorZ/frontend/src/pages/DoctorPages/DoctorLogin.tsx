import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { Eye, EyeOff } from "lucide-react";
import { loginDoctor } from "../../Services/doctorApi";

export default function DoctorLogin() {
  const [doctorId, setDoctorId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!doctorId || !password) {
      Swal.fire({
        title: "Missing Information!",
        text: "Please enter both Doctor ID and Password.",
        icon: "warning",
        confirmButtonText: "Ok",
      });
      return;
    }

    try {
      setLoading(true);

      const res = await loginDoctor(doctorId, password);

      // ✅ Save token in cookies
      Cookies.set("doctorToken", res.token, { expires: 7 });

      // ✅ Save info in localStorage (optional)
      localStorage.setItem("doctorId", res.doctor._id);

      Swal.fire({
        title: "Login Successful!",
        text: `Welcome Dr. ${res.doctor.fullName}`,
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      setTimeout(() => {
        navigate(`/doctorDashboard/${res.doctor._id}`);
      }, 1500);
    } catch (err: any) {
      Swal.fire({
        title: "Login Failed!",
        text: err?.message || "Invalid Doctor ID or Password.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ✅ SEO Optimization */}
      <Helmet>
        <title>Doctor Login | DoctorZ Healthcare</title>
        <meta
          name="description"
          content="Login to your DoctorZ doctor account to manage appointments, schedules, prescriptions, and consultations."
        />
        <meta
          name="keywords"
          content="Doctor Login, Healthcare Portal, DoctorZ, Medical Dashboard"
        />
        <meta name="robots" content="index, follow" />
      </Helmet>

      {/* ✅ Center Layout */}
      <div className="fixed inset-0 flex items-center justify-center bg-white z-10">
        <div className="w-[90%] max-w-md bg-white rounded-2xl shadow-lg border border-[#dfe3f7] p-8 sm:p-10 text-center">
          <h1 className="text-3xl font-bold text-black mb-3">Doctor Login</h1>
          <p className="text-gray-500 text-sm sm:text-base mb-6">
            Access your{" "}
            <span className="font-semibold text-[#0c213e]">
              appointments and dashboard
            </span>
            .
          </p>

          <form onSubmit={handleSubmit} className="space-y-5 text-left">
            {/* Doctor ID */}
            <div>
              <label
                htmlFor="doctorId"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Doctor ID
              </label>
              <input
                id="doctorId"
                type="text"
                placeholder="Enter your Doctor ID"
                value={doctorId}
                onChange={(e) => setDoctorId(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#0c213e] bg-gray-50 text-gray-800 placeholder-gray-400"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-[#0c213e] bg-gray-50 text-gray-800 placeholder-gray-400"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 inset-y-0 flex items-center text-gray-500 hover:text-[#0c213e]"
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
              className={`w-full bg-[#0c213e] hover:bg-[#1f2870] text-white font-semibold py-3 rounded-lg shadow-md transition-all duration-300 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center text-gray-600 mt-6 text-sm">
            Don’t have an account?{" "}
            <a
              href="/doctor-register"
              className="text-[#0c213e] font-medium hover:underline"
            >
              Register
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
