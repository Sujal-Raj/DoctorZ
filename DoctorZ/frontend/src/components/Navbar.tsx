import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  Menu,
  X,
  User,
  LogOut,
  LogIn,
  Stethoscope,
  Hospital,
  UserPlus,
  ChevronDown,
} from "lucide-react";
import { AuthContext } from "../Context/AuthContext.js";

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isLoggedIn, user, logout } = useContext(AuthContext);
  const location = useLocation();

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Find Doctors", path: "/all-doctors" },
    { label: "Find Clinics", path: "/all-clinics" },
    { label: "Lab Tests", path: "/all-lab-test" },
  ];

  return (
    <nav
      className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-200"
      aria-label="Main Navigation"
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-[#28328C] hover:text-[#1f2673] transition-colors"
        >
          DoctorZ
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`font-medium transition-colors ${
                location.pathname === item.path
                  ? "text-[#28328C]"
                  : "text-gray-700 hover:text-[#28328C]"
              }`}
            >
              {item.label}
            </Link>
          ))}

          {/* Registration Dropdown */}
          {!isLoggedIn && (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button className="bg-[#28328C] text-white px-4 py-2 rounded-lg shadow hover:shadow-md transition flex items-center gap-2">
                  <UserPlus size={18} />
                  Register
                  <ChevronDown size={16} className="opacity-80" />
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content
                sideOffset={8}
                className="bg-white rounded-xl shadow-2xl border border-gray-100 w-56 overflow-hidden animate-fadeIn"
              >
                {[
                  { label: "Patient", icon: <UserPlus size={18} className="text-indigo-600" />, path: "/patient-register" },
                  { label: "Doctor", icon: <Stethoscope size={18} className="text-blue-600" />, path: "/doctor-register" },
                  { label: "Clinic", icon: <Hospital size={18} className="text-green-600" />, path: "/clinic-register" },
                  { label: "Lab", icon: <Hospital size={18} className="text-purple-600" />, path: "/lab-register" },
                ].map((item) => (
                  <DropdownMenu.Item asChild key={item.path}>
                    <Link
                      to={item.path}
                      className="flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-indigo-50 transition"
                    >
                      {item.icon} {item.label}
                    </Link>
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          )}

          {/* Login / Logout */}
          <div>
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-full text-gray-800">
                  <User size={18} /> {user?.email || "Profile"}
                </div>
                <button
                  onClick={() => {
                    logout();
                    alert("You have been logged out.");
                  }}
                  className="flex items-center gap-2 px-3 py-2 rounded-full text-red-600 bg-red-50 hover:bg-red-100 transition"
                >
                  <LogOut size={18} /> Logout
                </button>
              </div>
            ) : (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition flex items-center gap-2">
                    <LogIn size={18} />
                    Login
                    <ChevronDown size={16} className="opacity-80" />
                  </button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content
                  sideOffset={8}
                  className="bg-white rounded-xl shadow-2xl border border-gray-100 w-56 overflow-hidden animate-fadeIn"
                >
                  {[
                    { label: "Patient Login", icon: <User size={18} className="text-indigo-600" />, path: "/patient-login" },
                    { label: "Doctor Login", icon: <Stethoscope size={18} className="text-blue-600" />, path: "/doctor/login" },
                    { label: "Clinic Login", icon: <Hospital size={18} className="text-green-600" />, path: "/clinic-login" },
                    { label: "Lab Login", icon: <Hospital size={18} className="text-purple-600" />, path: "/lab-login" },
                  ].map((item) => (
                    <DropdownMenu.Item asChild key={item.path}>
                      <Link
                        to={item.path}
                        className="flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-green-50 transition"
                      >
                        {item.icon} {item.label}
                      </Link>
                    </DropdownMenu.Item>
                  ))}
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 hover:text-[#28328C] transition"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle Menu"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg animate-slideDown">
          <div className="flex flex-col px-6 py-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className="text-gray-700 font-medium hover:text-[#28328C] transition"
              >
                {item.label}
              </Link>
            ))}

            {!isLoggedIn && (
              <>
                <Link to="/patient-register" onClick={() => setMobileOpen(false)}>
                  Patient Registration
                </Link>
                <Link to="/doctor-register" onClick={() => setMobileOpen(false)}>
                  Doctor Registration
                </Link>
                <Link to="/clinic-register" onClick={() => setMobileOpen(false)}>
                  Clinic Registration
                </Link>
                <Link to="/lab-register" onClick={() => setMobileOpen(false)}>
                  Lab Registration
                </Link>
              </>
            )}

            {isLoggedIn ? (
              <button
                onClick={() => {
                  logout();
                  setMobileOpen(false);
                }}
                className="text-red-600 font-medium hover:text-red-700 transition flex items-center gap-2"
              >
                <LogOut size={18} /> Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="text-green-600 font-medium hover:text-green-700 transition flex items-center gap-2"
              >
                <LogIn size={18} /> Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
