import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { Eye, EyeOff } from "lucide-react";
import { loginPatient } from "../../Services/patientApi";
import { AuthContext } from "../../Context/AuthContext";

export default function LoginPatient() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      Swal.fire({
        title: "Missing Info!",
        text: "Please enter both Email and Password.",
        icon: "warning",
        confirmButtonText: "Ok",
      });
      return;
    }

    try {
      setLoading(true);
      const res = await loginPatient({ email, password });
 login(res.token);
     if (res.user) {
      localStorage.setItem("user", JSON.stringify(res.user));
      console.log("👤 Logged-in user:", res.user);
      localStorage.setItem("userId", res.user._id);
    }

      // ✅ Store token in cookie
      Cookies.set("patientToken", res.token, { expires: 7 });
      
      // ✅ Update Auth Context
      login(res.token);

      Swal.fire({
        title: "Login Successful!",
        text: `Welcome ${res.user.email || "Patient"}! Redirecting...`,
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      console.error("Login failed:", err);
      Swal.fire({
        title: "Login Failed!",
        text: "Invalid Email or Password.",
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
        <title>Patient Login | DoctorZ Healthcare</title>
        <meta
          name="description"
          content="Login to your DoctorZ patient account to manage appointments, health records, and consultations securely."
        />
        <meta
          name="keywords"
          content="Patient Login, DoctorZ, Healthcare Portal, Online Consultation"
        />
        <meta name="robots" content="index, follow" />
      </Helmet>

      {/* ✅ Centered layout */}
      <div className="fixed inset-0 flex items-center justify-center bg-white z-10">
        <div className="w-[90%] max-w-md bg-white rounded-2xl shadow-lg border border-[#dfe3f7] p-8 sm:p-10 text-center transition-all duration-300">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#000000] mb-3">
            Patient Login
          </h1>
          <p className="text-gray-500 text-sm sm:text-base mb-6">
            Sign in to manage your{" "}
            <span className="font-semibold text-[#28328C]">
              health records and appointments
            </span>
            .
          </p>

          <form onSubmit={handleSubmit} className="space-y-5 text-left">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#28328C] bg-gray-50 text-gray-800 placeholder-gray-400 transition"
                required
              />
            </div>

            {/* Password Field */}
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
              href="/patient-register"
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
function setLoading(arg0: boolean) {
  throw new Error("Function not implemented.");
}

