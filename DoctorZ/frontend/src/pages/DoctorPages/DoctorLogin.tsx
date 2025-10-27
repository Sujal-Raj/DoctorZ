import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginDoctor } from "../../Services/doctorApi"; // 👈 import API function

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
      const data = await loginDoctor(doctorId, password ); // 👈 use API
      console.log("Login Response:", data);

      localStorage.setItem("token", data.token);
      localStorage.setItem("doctorId", data.doctor._id);

      navigate(`/doctorDashboard/${data.doctor._id}`);
    } catch (err: any) {
      setError(err?.message || "Login failed. Please try again.");
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
// import React, { useState, useContext, useEffect } from "react";
// import { loginDoctor } from "../api/doctorApi";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../Context/AuthContext"; // ✅ Import AuthContext

// const DoctorLogin: React.FC = () => {
//   const [doctorId, setDoctorId] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();
//   const { isLoggedIn, login, user } = useContext(AuthContext); // ✅ Access login from context

//   useEffect(() => {
//     if (isLoggedIn && user?.id) {
//       navigate(`/doctordashboard/${user.id}`);
//     }
//   }, [isLoggedIn, user, navigate]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       const data = await loginDoctor(doctorId, password);
//       console.log("Login Response:", data);

//       // ✅ Save token and user in context + localStorage
//       login(data.token, {
//         id: data.doctor._id,
//         email: data.doctor.email, // assuming email exists
//       });

//       // ✅ Navigate to protected doctor dashboard
//       navigate(`/doctordashboard/${data.doctor._id}`);
//     } catch (err: unknown) {
//       const error = err as { response?: { data?: { message?: string } } };
//       setError(error.response?.data?.message || "Login failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded shadow-md w-96"
//       >
//         <h2 className="text-2xl font-bold mb-4 text-center">Doctor Login</h2>

//         {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

//         <input
//           type="text"
//           placeholder="Doctor ID"
//           value={doctorId}
//           onChange={(e) => setDoctorId(e.target.value)}
//           className="w-full mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//           required
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//           required
//         />

//         <button
//           type="submit"
//           disabled={loading}
//           className={`w-full py-3 rounded text-white font-semibold ${
//             loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
//           }`}
//         >
//           {loading ? "Logging in..." : "Login"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default DoctorLogin;
