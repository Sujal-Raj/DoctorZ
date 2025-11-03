// UserDashboard.jsx
import { Outlet, NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
function UserDashboard() {
  const token = Cookies.get("patientToken") || "";
const decoded: any = token ? jwtDecode(token) : {};

const patientId = decoded.id;
console.log("Patient ID from token:", patientId);

  return (
    <div className="flex h-screen w-full bg-gray-100 p-6 gap-6">

      {/* LEFT CARD */}
      <div className="w-80 bg-white rounded-xl shadow p-6 flex flex-col items-center">
        
        {/* Profile Image */}
        <div className="w-24 h-24 bg-gray-300 rounded-full" />

        {/* Name & Email */}
        <h2 className="mt-3 text-xl font-semibold">
          Ritika Vishwakarma
        </h2>
        <p className="text-gray-600 text-sm">
          ritika.vishwakarma29@gmail.com
        </p>

        {/* Menu */}
        <div className="w-full mt-8 flex flex-col gap-3">

          <NavLink
            to={`user-profile/${patientId}`}
            className={({ isActive }) =>
              `py-3 px-4 rounded-lg flex items-center gap-3 ${
                isActive ? "bg-indigo-100 text-indigo-700" : "hover:bg-gray-100"
              }`
            }
          >
            <span>👤</span> My Profile
          </NavLink>

          <NavLink
            to="/user/appointments"
            className={({ isActive }) =>
              `py-3 px-4 rounded-lg flex items-center gap-3 ${
                isActive ? "bg-indigo-100 text-indigo-700" : "hover:bg-gray-100"
              }`
            }
          >
            <span>📅</span> Appointment
          </NavLink>
          
           <NavLink
            to={`user/add-emr/${patientId}`}
            className={({ isActive }) =>
              `py-3 px-4 rounded-lg flex items-center gap-3 ${
                isActive ? "bg-indigo-100 text-indigo-700" : "hover:bg-gray-100"
              }`
            }
          >
            <span>🔔</span> Add EMR
          </NavLink>
          <NavLink
            to="/add-emr"
            className={({ isActive }) =>
              `py-3 px-4 rounded-lg flex items-center gap-3 ${
                isActive ? "bg-indigo-100 text-indigo-700" : "hover:bg-gray-100"
              }`
            }
          >
            <span>🔔</span> Notifications
          </NavLink>


          <NavLink
            to="/logout"
            className="py-3 px-4 rounded-lg flex items-center gap-3 text-red-600 hover:bg-red-100"
          >
            <span>🚪</span> Log Out
          </NavLink>

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
