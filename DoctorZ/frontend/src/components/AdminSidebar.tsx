import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Home, User, UserPlus, LogOut, Menu, X } from "lucide-react";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const handleNavClick = () => {
    // Close sidebar on mobile after clicking a link
    if (window.innerWidth < 1024) setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Top Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-gray-900 text-white flex items-center justify-between px-4 py-3 shadow-md z-50">
        <h2 className="text-lg font-semibold">Admin Dashboard</h2>
        <button
          className="p-2 rounded-md bg-gray-800 hover:bg-gray-700 transition"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-gray-200 flex flex-col justify-between shadow-lg transform transition-transform duration-300 z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        {/* Sidebar content */}
        <div className="px-6 py-8 mt-12 lg:mt-0">
          <h2 className="hidden lg:block text-2xl font-bold mb-8 text-white text-center">
            Admin Dashboard
          </h2>

          <nav className="flex flex-col space-y-3">
            <Link
              to="/"
              onClick={handleNavClick}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                location.pathname === "/"
                  ? "bg-gray-700 text-white"
                  : "hover:bg-gray-700"
              }`}
            >
              <Home size={18} /> Home
            </Link>

            <Link
              to="admin-lab"
              onClick={handleNavClick}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                location.pathname.includes("admin-lab")
                  ? "bg-gray-700 text-white"
                  : "hover:bg-gray-700"
              }`}
            >
              <User size={18} /> Lab
            </Link>

            <Link
              to="admin-doctor"
              onClick={handleNavClick}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                location.pathname.includes("admin-doctor")
                  ? "bg-gray-700 text-white"
                  : "hover:bg-gray-700"
              }`}
            >
              <UserPlus size={18} /> Doctor
            </Link>

            <Link
              to="admin-clinic"
              onClick={handleNavClick}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                location.pathname.includes("admin-clinic")
                  ? "bg-gray-700 text-white"
                  : "hover:bg-gray-700"
              }`}
            >
              <UserPlus size={18} /> Clinic
            </Link>
          </nav>
        </div>

        {/* Bottom Logout Button */}
        <div className="px-6 py-6 border-t border-gray-700">
          <button
            onClick={() => {
              handleLogout();
              handleNavClick();
            }}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700 transition text-red-500"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Overlay when sidebar open (mobile only) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default AdminSidebar;
