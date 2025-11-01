import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { UserCircle, FileText, LogOut, Menu } from "lucide-react";
import { useState, useEffect } from "react";

export default function UserDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId"); // you can store this after login
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/patient-login");
  };

  // Responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsSidebarOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 text-gray-900 overflow-hidden">
      {/* SEO Header */}
      <header>
        <title>User Dashboard | Manage Profile & EMR</title>
        <meta
          name="description"
          content="Access your user dashboard to manage your profile and view your EMR (Electronic Medical Records)."
        />
      </header>

      {/* Mobile Navbar */}
      <nav className="lg:hidden bg-gray-900 text-white flex items-center justify-between px-4 py-3 shadow-md fixed top-0 left-0 w-full z-50">
        <h1 className="text-lg font-semibold tracking-wide">User Dashboard</h1>
        <button
          aria-label="Toggle menu"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="focus:outline-none"
        >
          <Menu size={24} />
        </button>
      </nav>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 bg-gray-900 text-white w-64 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out z-40 flex flex-col justify-between shadow-lg
        h-screen lg:h-auto pt-16 lg:pt-0 overflow-y-auto`}
      >
        <div className="p-4 flex flex-col">
          <h2 className="text-2xl font-bold mb-6 hidden lg:block tracking-wide">
            User Dashboard
          </h2>

          <ul className="space-y-2">
            {[
              { path: "user-profile", label: "Profile", icon: <UserCircle className="mr-2" /> },
              { path: "emr", label: "EMR", icon: <FileText className="mr-2" /> },
            ].map((item) => (
              <li key={item.path}>
                <Link
                  to={`/user-dashboard/${userId}/${item.path}`}
                  className={`flex items-center p-2 rounded-md text-sm font-medium transition-all ${
                    location.pathname.includes(item.path)
                      ? "bg-gray-700 text-white"
                      : "hover:bg-gray-800 text-gray-300"
                  }`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Logout */}
        <div className="border-t border-gray-700 p-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 p-2 w-full text-red-400 hover:bg-red-600 hover:text-white transition-all rounded-md"
            aria-label="Logout"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm lg:hidden z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 lg:p-6 mt-14 lg:mt-0">
        <section
          aria-label="User Dashboard Content"
          className="bg-white rounded-2xl shadow-sm p-4 lg:p-6 min-h-[80vh] transition-all"
        >
          <Outlet context={{ userId }} />
        </section>
      </main>
    </div>
  );
}
