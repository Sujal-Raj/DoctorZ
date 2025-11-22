import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Home, User, UserPlus, Users, LogOut, Menu, X } from "lucide-react";

const ClinicSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  // Detect window size
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fix sidebar behavior for desktop vs mobile
  useEffect(() => {
    if (isDesktop) setSidebarOpen(true); // Always visible on desktop
    else setSidebarOpen(false);         // Closed by default on mobile
  }, [isDesktop]);

  const handleLogout = () => {
    localStorage.removeItem("clinic_portal_token");
    navigate("/");
  };

  // Menu Items
  const menuItems = [
    { name: "Dashboard", path: "clinic-home-dashboard", icon: <Home size={18} /> },
    { name: "All Doctor Profiles", path: "all-clinic-doctors", icon: <User size={18} /> },
    { name: "Add Doctor", path: "add-doctor", icon: <UserPlus size={18} /> },
    { name: "My Profile", path: "clinic-profile", icon: <User size={18} /> },
    { name: "Patients", path: "all-clinic-patients", icon: <Users size={18} /> },
  ];

  return (
    <>

      {/* ---------- Mobile Top Bar ---------- */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-[#0c213e] text-white 
        flex items-center justify-between px-4 py-3 z-50 shadow-lg">
        <h1 className="text-lg font-semibold">Clinic Dashboard</h1>

        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded hover:bg-[#0a1a32] transition"
        >
          <Menu size={26} className="text-white" />
        </button>
      </div>

      {/* ---------- Sidebar ---------- */}
      <aside
        className={`
          bg-[#0c213e] text-white flex flex-col justify-between
          fixed md:relative top-0 left-0 h-full z-40 w-64
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >

        {/* Close button for mobile */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 p-2 bg-[#0c213e] rounded-md hover:bg-[#0a1a32] transition md:hidden"
        >
          <X size={20} className="text-white" />
        </button>

        <div className="flex-1 p-6 overflow-y-auto">
          <div className="hidden md:flex items-center justify-center mb-10">
            <h2 className="text-2xl font-bold">Clinic Dashboard</h2>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const isActive = location.pathname.includes(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => !isDesktop && setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all
                    ${isActive ? "bg-gray-700 text-white" : "hover:bg-gray-800 text-gray-300"}
                  `}
                >
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Logout Button */}
        <div className="p-6 border-t border-[#0a1a32]">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-700 transition text-white w-full justify-center"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

    </>
  );
};

export default ClinicSidebar;
