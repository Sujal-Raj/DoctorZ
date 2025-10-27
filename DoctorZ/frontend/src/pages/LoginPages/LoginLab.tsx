// 📁 src/pages/LoginLab.tsx
import { useState } from "react";
import Swal from "sweetalert2";
import { loginLab } from "../../Services/labApi"; // ✅ import from labApi

export default function LoginLab() {
  const [labId, setLabId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!labId || !password) {
      Swal.fire({
        title: "Missing Info!",
        text: "Please enter both Login ID and Password.",
        icon: "warning",
        confirmButtonText: "Ok",
      });
      return;
    }

    try {
      setLoading(true);

      const response = await loginLab(labId, password); // ✅ using API function

      if (response.status === 200 && response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("labId", response.data.lab._id);
        localStorage.setItem("labName", response.data.lab.name);

        Swal.fire({
          title: "Login Successful!",
          text: `Welcome ${response.data.lab.name}! Redirecting to your dashboard...`,
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });

        setTimeout(() => {
          window.location.href = "/lab-dashboard";
        }, 1500);
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Login Failed!",
        text: "Invalid credentials or your lab is not approved yet.",
        icon: "error",
        confirmButtonText: "Ok",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 py-10">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Lab Login
        </h1>

        <p className="text-center text-gray-500 mb-6 text-sm">
          Use your{" "}
          <span className="font-semibold text-blue-600">Login ID</span> provided
          after admin approval.
        </p>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Login ID"
            value={labId}
            onChange={(e) => setLabId(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition bg-gray-50"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition bg-gray-50"
          />
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className={`mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <a href="/lab-register" className="text-blue-500 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
