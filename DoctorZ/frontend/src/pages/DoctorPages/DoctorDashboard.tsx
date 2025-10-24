// import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
// import {
//   HomeIcon,
//   UserIcon,
//   ClockIcon,
//   CalendarIcon,
//   UsersIcon,
//   KeyIcon,
// } from "@heroicons/react/24/outline";
// import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

// export default function DoctorDashboard() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("doctorId");
//     localStorage.removeItem("token");
//     navigate("/");
//   };

//   const menuItems = [
//     { name: "Dashboard", path: "doctor-home-dashboard", icon: <HomeIcon className="w-5 h-5" /> },
//     { name: "Profile", path: "doctorProfile", icon: <UserIcon className="w-5 h-5" /> },
//     { name: "Add Availability", path: "time-slots", icon: <ClockIcon className="w-5 h-5" /> },
//     { name: "Appointments", path: "appointments", icon: <CalendarIcon className="w-5 h-5" /> },
//     { name: "Edit ID & Password", path: "editDoctorIdPassword", icon: <KeyIcon className="w-5 h-5" /> },
//     { name: "My Patients", path: "patients", icon: <UsersIcon className="w-5 h-5" /> },
//   ];

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <aside className="w-64 bg-gray-800 text-white flex flex-col justify-between p-6">
//         <div>
//           <div className="flex items-center justify-center gap-2 mb-10">
//             <h2 className="text-2xl font-bold">Doctor Panel</h2>
//           </div>

//           <nav className="space-y-2">
//             {menuItems.map((item) => {
//               const isActive = location.pathname.includes(item.path);
//               return (
//                 <Link
//                   key={item.path}
//                   to={item.path}
//                   className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
//                     isActive
//                       ? "bg-blue-600 text-white shadow-md"
//                       : "text-gray-300 hover:bg-gray-800 hover:text-white"
//                   }`}
//                 >
//                   {item.icon}
//                   <span className="font-medium">{item.name}</span>
//                 </Link>
//               );
//             })}
//           </nav>
//         </div>

//         {/* Logout Button */}
//         <button
//           onClick={handleLogout}
//           className="flex items-center gap-2 mt-6 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-700 transition text-white w-full justify-center"
//         >
//           <ArrowRightOnRectangleIcon className="w-5 h-5" /> Logout
//         </button>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 bg-gray-100 p-8 overflow-y-auto">
//         <Outlet />
//       </main>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  UserIcon,
  ClockIcon,
  CalendarIcon,
  UsersIcon,
  KeyIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export default function DoctorDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    <div className="flex h-screen bg-gray-100 relative">
      {/* Sidebar */}
      <aside
        className={`bg-gray-800 text-white flex flex-col justify-between transition-all duration-300 
          ${sidebarOpen ? "w-64" : "w-0"} 
          md:w-64 overflow-hidden fixed md:relative z-40 h-full`}
      >
        {/* Close Button for small screens */}
        <button
          onClick={() => setSidebarOpen(false)}
          className={`absolute top-4 right-4 p-2 bg-gray-800 rounded-md hover:bg-gray-700 transition md:hidden ${
            sidebarOpen ? "block" : "hidden"
          }`}
        >
          <XMarkIcon className="w-5 h-5 text-white" />
        </button>

       <div className={`flex-1 p-6 ${sidebarOpen || isDesktop ? "opacity-100" : "opacity-0"} transition-opacity`}>

          <div className="flex items-center justify-center mb-10">
            <h2 className="text-2xl font-bold">Doctor Dashboard</h2>
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
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  {item.icon}
                  <span className="font-medium text-sm md:text-base">{item.name}</span>

                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-6 hidden md:block">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-700 transition text-white w-full justify-center"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Small screen hamburger (collapsed line + button) */}
      <div
        className={`md:hidden fixed left-0 top-0 h-full bg-gray-800 transition-all duration-300 ${
          sidebarOpen ? "w-0" : "w-10"
        } flex items-start justify-center pt-4`}
      >
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-1 text-white hover:bg-gray-700 rounded"
          >
            <Bars3Icon className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Main Content
      <main className="flex-1 bg-gray-100 p-8 overflow-y-auto w-full">
        <Outlet />
      </main> */}
<main className="flex-1 bg-gray-100 p-8 overflow-y-auto">
  <div className="max-w-5xl  flex ">
    <Outlet />
  </div>
</main>


    </div>
  );
}
