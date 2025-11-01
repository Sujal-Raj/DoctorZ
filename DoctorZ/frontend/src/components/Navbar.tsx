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
} from "lucide-react";
import { AuthContext } from "../Context/AuthContext.js";

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isLoggedIn, user, logout } = useContext(AuthContext);
  const location = useLocation();
  console.log("Navbar Rendered — isLoggedIn:", isLoggedIn, "user:", user);

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-md sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-blue-700 hover:text-blue-800 transition"
        >
          🏥 <span>DoctorZ</span>
          <span className="hidden md:inline text-sm text-gray-500 font-medium">
            | Smart Healthcare
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className={`font-medium transition ${
              location.pathname === "/"
                ? "text-blue-600"
                : "text-gray-700 hover:text-blue-600"
            }`}
          >
            Home
          </Link>
          <Link
            to="/all-doctors"
            className={`font-medium transition ${
              location.pathname === "/all-doctors"
                ? "text-blue-600"
                : "text-gray-700 hover:text-blue-600"
            }`}
          >
            Find Doctors
          </Link>
          <Link
            to="/all-clinics"
            className={`font-medium transition ${
              location.pathname === "/all-clinics"
                ? "text-blue-600"
                : "text-gray-700 hover:text-blue-600"
            }`}
          >
            Find Clinics
          </Link>
          <Link
            to="/all-lab-test"
            className={`font-medium transition ${
              location.pathname === "/all-lab-test"
                ? "text-blue-600"
                : "text-gray-700 hover:text-blue-600"
            }`}
          >
            Lab Tests
          </Link>

          {/* Show Registration only if not logged in */}
          {!isLoggedIn && (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:from-blue-700 hover:to-indigo-700 transition flex items-center gap-2">
                  Registration
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content
                sideOffset={8}
                className="bg-white rounded-xl shadow-xl border border-gray-100 w-56 overflow-hidden"
              >
                <DropdownMenu.Item asChild>
                  <Link
                    to="/patient-register"
                    className="flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-blue-50 transition"
                  >
                    <UserPlus size={18} className="text-indigo-600" /> Patient
                  </Link>
                </DropdownMenu.Item>
                <DropdownMenu.Item asChild>
                  <Link
                    to="/doctor-register"
                    className="flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-blue-50 transition"
                  >
                    <Stethoscope size={18} className="text-blue-600" /> Doctor
                  </Link>
                </DropdownMenu.Item>
                <DropdownMenu.Item asChild>
                  <Link
                    to="/clinic-register"
                    className="flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-blue-50 transition"
                  >
                    <Hospital size={18} className="text-green-600" /> Clinic
                  </Link>
                </DropdownMenu.Item>
                <DropdownMenu.Item asChild>
                  <Link
                    to="/lab-register"
                    className="flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-blue-50 transition"
                  >
                    <Hospital size={18} className="text-green-600" /> Lab
                  </Link>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          )}

          {/* Login or Logout */}
          <div>
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                {/* ✅ Profile Link */}
                <Link
                  to={`/user-profile/${
                    user?.id || localStorage.getItem("userId")
                  }`}
                  className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-full hover:bg-gray-200 transition"
                >
                  <User size={18} /> Profile
                </Link>

                {/* ✅ Logout Button */}
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
                    <LogIn size={18} /> Login
                  </button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content
                  sideOffset={8}
                  className="bg-white rounded-xl shadow-xl border border-gray-100 w-56 overflow-hidden"
                >
                  <DropdownMenu.Item asChild>
                    <Link
                      to="/patient-login"
                      className="flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-green-50 transition"
                    >
                      <User size={18} className="text-indigo-600" /> Patient
                      Login
                    </Link>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item asChild>
                    <Link
                      to="/doctor/login"
                      className="flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-green-50 transition"
                    >
                      <Stethoscope size={18} className="text-blue-600" /> Doctor
                      Login
                    </Link>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item asChild>
                    <Link
                      to="/clinic-login"
                      className="flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-green-50 transition"
                    >
                      <Hospital size={18} className="text-green-600" /> Clinic
                      Login
                    </Link>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item asChild>
                    <Link
                      to="/lab-login"
                      className="flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-green-50 transition"
                    >
                      <Hospital size={18} className="text-green-600" /> Lab
                      Login
                    </Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}
          </div>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white shadow-md border-t border-gray-200">
          <div className="flex flex-col px-6 py-4 space-y-4">
            <Link to="/" onClick={() => setMobileOpen(false)}>
              Home
            </Link>
            <Link to="/all-doctors" onClick={() => setMobileOpen(false)}>
              Find Doctors
            </Link>
            <Link to="/all-clinics" onClick={() => setMobileOpen(false)}>
              Find Clinics
            </Link>
            <Link to="/all-lab-test" onClick={() => setMobileOpen(false)}>
              Lab Tests
            </Link>

            {!isLoggedIn && (
              <>
                <Link
                  to="/patient-register"
                  onClick={() => setMobileOpen(false)}
                >
                  Patient Registration
                </Link>
                <Link
                  to="/doctor-register"
                  onClick={() => setMobileOpen(false)}
                >
                  Doctor Registration
                </Link>
                <Link
                  to="/clinic-register"
                  onClick={() => setMobileOpen(false)}
                >
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
                className="text-green-600 font-medium hover:text-green-700 transition flex items-center gap-2"
                onClick={() => setMobileOpen(false)}
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
