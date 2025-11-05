
// // UserDashboard.jsx
// import { Outlet, NavLink, useParams, useNavigate } from "react-router-dom";



// // ✅ Lucide Icons
// import { User, CalendarDays, FilePlus2, Bell, LogOut } from "lucide-react";
// import { useEffect } from "react";
// import Cookies from "js-cookie";
// import {jwtDecode} from "jwt-decode";
// function UserDashboard() {
 
//   const { patientId } = useParams<{ patientId: string }>();

// const navigate=useNavigate();
// console.log("Patient ID from token:", patientId);

//  const token = Cookies.get("patientToken");
// if (token) {
//   const decoded = jwtDecode(token);
//   // const patientId = decoded.patientId || decoded._id || decoded.id;
//   console.log("Decoded Token Data:", decoded);



//   useEffect(() => {
   
//     console.log("Token in Dashboard:", token);
   
//     if (!token) {
//       navigate("/patient-login");
//       return;
//     }

//     try {
//       jwtDecode(token); // just to confirm token is valid
//     } catch (err) {
//       Cookies.remove(err+"patientToken");
//       navigate("/patient-login");
//     }
//   }, [token, navigate]);
//   return (
//     <div className="flex h-screen w-full bg-gray-100 p-6 gap-6">

//       {/* LEFT CARD */}
//       <div className="w-80 bg-white rounded-xl shadow p-6 flex flex-col items-center">
        
//         {/* Profile Image */}
//         <div className="w-24 h-24 bg-gray-300 rounded-full" />

//         {/* Name & Email */}
//         <h2 className="mt-3 text-xl font-semibold"></h2>
//         <p className="text-gray-600 text-sm"></p>

//         {/* Menu */}
//         <div className="w-full mt-8 flex flex-col gap-3">

//           {/* ✅ Profile */}
//           <NavLink
//             to="user-profile"
//             className={({ isActive }) =>
//               `py-3 px-4 rounded-lg flex items-center gap-3 ${
//                 isActive ? "bg-indigo-100 text-indigo-700" : "hover:bg-gray-100"
//               }`
//             }
//           >
//             <User size={18} /> My Profile
//           </NavLink>

//           {/* ✅ Appointment */}
//           <NavLink
//             to={`/user/appointments/${patientId}`}
//             className={({ isActive }) =>
//               `py-3 px-4 rounded-lg flex items-center gap-3 ${
//                 isActive ? "bg-indigo-100 text-indigo-700" : "hover:bg-gray-100"
//               }`
//             }
//           >
//             <CalendarDays size={18} /> Appointment
//           </NavLink>

//           {/* ✅ Add EMR */}
//           <NavLink
//             to="add-emr"
//             className={({ isActive }) =>
//               `py-3 px-4 rounded-lg flex items-center gap-3 ${
//                 isActive ? "bg-indigo-100 text-indigo-700" : "hover:bg-gray-100"
//               }`
//             }
//           >
//             <FilePlus2 size={18} /> Add EMR
//           </NavLink>

//           {/* ✅ Notifications */}
//           <NavLink
//             to={`/user/notifications/${patientId}`}
//             className={({ isActive }) =>
//               `py-3 px-4 rounded-lg flex items-center gap-3 ${
//                 isActive ? "bg-indigo-100 text-indigo-700" : "hover:bg-gray-100"
//               }`
//             }
//           >
//             <Bell size={18} /> Notifications
//           </NavLink>

//           {/* ✅ Logout */}
//           <NavLink
//             to="/logout"
//             className="py-3 px-4 rounded-lg flex items-center gap-3 text-red-600 hover:bg-red-100"
//           >
//             <LogOut size={18} /> Log Out
//           </NavLink>

//         </div>
//       </div>

//       {/* RIGHT CARD */}
//       <div className="flex-1 bg-white rounded-xl shadow p-8 overflow-auto">
//         <Outlet />
//       </div>

//     </div>
//   );
// }
// }

// export default UserDashboard;

import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { User, CalendarDays, FilePlus2, Bell, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id?: string;
  _id?: string;
  patientId?: string;
  email?: string;
  name?: string;
  exp?: number; // optional if JWT has expiry
  iat?: number; // optional if JWT has issue time
}


function UserDashboard() {
  const navigate = useNavigate();
  const [patientId, setPatientId] = useState<string | null>(null);

  // ✅ Get token and decode
  useEffect(() => {
    const token = Cookies.get("patientToken");

    if (!token) {
      navigate("/patient-login");
      return;
    }

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      const id = decoded.patientId || decoded._id || decoded.id;
      console.log("Decoded Token Data:", decoded);
      console.log("✅ Patient ID from token:", id);
      setPatientId(id ?? null);
    } catch (err) {
      console.error("Invalid token:", err);
      Cookies.remove("patientToken");
      navigate("/patient-login");
    }
  }, [navigate]);

  // Wait until patientId is decoded
  if (!patientId) {
    return <p className="text-center text-gray-600 mt-10">Loading dashboard...</p>;
  }

  return (
    <div className="flex h-screen w-full bg-gray-100 p-6 gap-6">
      {/* LEFT CARD */}
      <div className="w-80 bg-white rounded-xl shadow p-6 flex flex-col items-center">
        {/* Profile Image */}
        <div className="w-24 h-24 bg-gray-300 rounded-full" />

        {/* Name & Email (optional) */}
        <h2 className="mt-3 text-xl font-semibold">Patient</h2>
        <p className="text-gray-600 text-sm">Welcome Back</p>

        {/* Menu */}
        <div className="w-full mt-8 flex flex-col gap-3">
          {/* ✅ Profile */}
          <NavLink
            to="user-profile"
            className={({ isActive }) =>
              `py-3 px-4 rounded-lg flex items-center gap-3 ${
                isActive ? "bg-indigo-100 text-indigo-700" : "hover:bg-gray-100"
              }`
            }
          >
            <User size={18} /> My Profile
          </NavLink>

          {/* ✅ Appointment */}
          <NavLink
            to={`/user/appointments/${patientId}`}
            className={({ isActive }) =>
              `py-3 px-4 rounded-lg flex items-center gap-3 ${
                isActive ? "bg-indigo-100 text-indigo-700" : "hover:bg-gray-100"
              }`
            }
          >
            <CalendarDays size={18} /> Appointment
          </NavLink>

          {/* ✅ Add EMR */}
          <NavLink
            to={"add-emr"}
            className={({ isActive }) =>
              `py-3 px-4 rounded-lg flex items-center gap-3 ${
                isActive ? "bg-indigo-100 text-indigo-700" : "hover:bg-gray-100"
              }`
            }
          >
            <FilePlus2 size={18} /> View EMR
          </NavLink>

          {/* ✅ Notifications */}
          <NavLink
            to={`/user/notifications/${patientId}`}
            className={({ isActive }) =>
              `py-3 px-4 rounded-lg flex items-center gap-3 ${
                isActive ? "bg-indigo-100 text-indigo-700" : "hover:bg-gray-100"
              }`
            }
          >
            <Bell size={18} /> Notifications
          </NavLink>

          {/* ✅ Logout */}
          <button
            onClick={() => {
              Cookies.remove("patientToken");
              navigate("/patient-login");
            }}
            className="py-3 px-4 rounded-lg flex items-center gap-3 text-red-600 hover:bg-red-100"
          >
            <LogOut size={18} /> Log Out
          </button>
        </div>
      </div>

      {/* RIGHT CARD */}
      <div className="flex-1 bg-white rounded-xl shadow p-8 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default UserDashboard;

