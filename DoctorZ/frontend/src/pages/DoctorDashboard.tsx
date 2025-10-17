import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  UserIcon,
  ClockIcon,
  CalendarIcon,
  UsersIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

export default function DoctorDashboard() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("doctorId");
    localStorage.removeItem("token");
    navigate("/");
  };

  const menuItems = [
    { name: "Dashboard", path: "doctor-home-dashboard", icon: <HomeIcon className="w-5 h-5" /> },
    { name: "Profile", path: "doctorProfile", icon: <UserIcon className="w-5 h-5" /> },
    { name: "Add Availability", path: "time-slots", icon: <ClockIcon className="w-5 h-5" /> },
    { name: "Appointments", path: "appointments", icon: <CalendarIcon className="w-5 h-5" /> },
    { name: "Edit ID & Password", path: "editDoctorIdPassword", icon: <KeyIcon className="w-5 h-5" /> },
    { name: "My Patients", path: "patients", icon: <UsersIcon className="w-5 h-5" /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col justify-between p-6">
        <div>
          <div className="flex items-center justify-center gap-2 mb-10">
            <h2 className="text-2xl font-bold">Doctor Panel</h2>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const isActive = location.pathname.includes(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 mt-6 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-700 transition text-white w-full justify-center"
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5" /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
