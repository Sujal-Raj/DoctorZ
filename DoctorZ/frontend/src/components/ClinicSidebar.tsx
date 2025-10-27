
// import { Link, useNavigate } from "react-router-dom";
// import {  User, UserPlus, LogOut,Home } from "lucide-react";

// const ClinicSidebar = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // Remove token/cookie here
//     localStorage.removeItem("clinic_portal_token");
//     navigate("/");
//   };

//   return (
//     <div className="w-64 min-h-screen bg-gray-900 text-gray-200 flex flex-col justify-between shadow-lg">
//       {/* Top section */}
//       <div className="px-6 py-8">
//         <h2 className="text-xl font-bold mb-8 text-white">Clinic Dashboard</h2>
//         <nav className="flex flex-col space-y-4">
//           <Link
//             to="clinic-home-dashboard"
//             className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700 transition"
//           >
//             <Home size={18} /> Dashboard
//           </Link>
//           <Link
//             to="all-clinic-doctors"
//             className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700 transition"
//           >
//             <User size={18} /> All Doctor Profiles
//           </Link>
//           <Link
//             to="add-doctor"
//             className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700 transition"
//           >
//             <UserPlus size={18} /> Add Doctor
//           </Link>
//           <Link to="clinic-profile" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700 transition">

//             <User size={18} /> My Profile
//           </Link>

//           <Link to="all-clinic-patients" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700 transition">

//             <User size={18} /> Patients
//           </Link>


//         </nav>
//       </div>

//       {/* Bottom section */}
//       <div className="px-6 py-6 border-t border-gray-700">
//         <button
//           onClick={handleLogout}
//           className="flex items-center gap-3 px-4 py-2 w-full rounded-lg hover:bg-red-600 transition text-red-400"
//         >
//           <LogOut size={18} /> Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ClinicSidebar;


import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { User, UserPlus, LogOut, Home, Users, Menu, X } from "lucide-react";

const ClinicSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("clinic_portal_token");
    navigate("/");
  };

  const menuItems = [
    { name: "Dashboard", path: "clinic-home-dashboard", icon: <Home size={18} /> },
    { name: "All Doctor Profiles", path: "all-clinic-doctors", icon: <User size={18} /> },
    { name: "Add Doctor", path: "add-doctor", icon: <UserPlus size={18} /> },
    { name: "My Profile", path: "clinic-profile", icon: <User size={18} /> },
    { name: "Patients", path: "all-clinic-patients", icon: <Users size={18} /> },
  ];

  return (
    <div className="relative">
      {/* Sidebar */}
      <aside
        className={` bg-gray-900 text-gray-200 flex flex-col justify-between shadow-lg transition-all duration-300
          ${sidebarOpen ? "w-64" : "w-0"} 
          md:w-64 overflow-hidden fixed md:relative z-40 h-full`}
      >
        {/* Close button for mobile */}
        <button
          onClick={() => setSidebarOpen(false)}
          className={`absolute top-4 right-4 text-gray-300 hover:text-white md:hidden ${
            sidebarOpen ? "block" : "hidden"
          }`}
        >
          <X size={22} />
        </button>

        {/* Top Section */}
        <div className={`px-6 py-8 ${sidebarOpen || isDesktop ? "opacity-100" : "opacity-0"} transition-opacity`}>
          <h2 className="text-xl font-bold mb-8 text-white text-center">Clinic Dashboard</h2>
          <nav className="flex flex-col space-y-4">
            {menuItems.map((item) => {
              const isActive = location.pathname.includes(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-700 text-gray-300 hover:text-white"
                  }`}
                >
                  {item.icon} {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="px-6 py-6 border-t border-gray-700 hidden md:block">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2 w-full rounded-lg hover:bg-red-600 transition text-red-400"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Hamburger button for small screens */}
      <div
        className={`md:hidden fixed left-0 top-0 h-full bg-gray-900 transition-all duration-300 ${
          sidebarOpen ? "w-0" : "w-10"
        } flex items-start justify-center pt-4`}
      >
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-1 text-white hover:bg-gray-700 rounded"
          >
            <Menu size={22} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ClinicSidebar;
