import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { FlaskConical, Users, UserCircle, LogOut, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function LabDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const labId = localStorage.getItem("labId");

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  // Resize detection
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Desktop = sidebar always open
  useEffect(() => {
    if (isDesktop) setSidebarOpen(true);
    else setSidebarOpen(false);
  }, [isDesktop]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("labId");
    navigate("/lab-login");
  };

  // Menu items
  const menuItems = [
    { name: "Patients", path: "patients", icon: <Users size={18} /> },
    { name: "Lab Tests", path: "tests", icon: <FlaskConical size={18} /> },
    { name: "Profile", path: "profile", icon: <UserCircle size={18} /> },
  ];

  return (
    <div className="flex bg-gray-100 min-h-screen overflow-hidden">

      {/* ---------- Mobile Top Bar ---------- */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-[#0c213e] text-white 
        flex items-center justify-between px-4 py-3 z-50 shadow-lg">
        <h1 className="text-lg font-semibold tracking-wide">Lab Dashboard</h1>

        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded hover:bg-[#0a1a32] active:scale-95 transition"
        >
          <Menu size={26} className="text-white" />
        </button>
      </div>

      {/* ---------- Sidebar ---------- */}
      <aside
        className={`bg-[#0c213e] text-white 
          flex flex-col 
          fixed md:relative top-0 left-0 
          h-screen w-72
          z-40
          transform transition-transform duration-300 ease-in-out shadow-xl
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >

        {/* Mobile close button */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 p-2 bg-[#0c213e] rounded-md 
            hover:bg-[#0a1a32] active:scale-95 transition md:hidden"
        >
          <X size={20} />
        </button>

        {/* -------- Sidebar Body -------- */}
        <div className="flex-1 flex flex-col p-6 overflow-y-auto">

          {/* Desktop title */}
          <div className="hidden md:flex items-center justify-center mb-10">
            <h2 className="text-2xl font-bold tracking-wide">Lab Dashboard</h2>
          </div>

          {/* Navigation */}
          <nav className="space-y-3">
            {menuItems.map((item) => {
              const isActive = location.pathname.includes(item.path);

              return (
                <Link
                  key={item.path}
                  to={`/lab-dashboard/${item.path}`}
                  onClick={() => !isDesktop && setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all 
                    ${isActive
                      ? "bg-white/20 shadow-md text-white scale-[1.02]"
                      : "hover:bg-white/10 text-gray-300"
                    }
                  `}
                >
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* ---------- Logout Button (Always Bottom) ---------- */}
        <div className="p-6 border-t border-[#0a1a32] mt-auto">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg 
              bg-red-500 hover:bg-red-600 active:scale-95 transition 
              text-white w-full justify-center font-medium shadow-md"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 mt-14 md:mt-0 overflow-y-auto">
        <section className="bg-white rounded-2xl shadow-sm p-4 md:p-6 min-h-[85vh]">
          <Outlet context={{ labId }} />
        </section>
      </main>
    </div>
  );
}
