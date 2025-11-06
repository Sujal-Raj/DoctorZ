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
     <nav
      className="
        sticky top-0 z-50 
        backdrop-blur-lg bg-white/60 
     
        shadow-sm transition-all duration-300
      "
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-blue-700 hover:text-blue-800 transition"
        >
          🏥<span
  className="
    text-transparent bg-clip-text 
    bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600
    font-extrabold tracking-wide
    animate-gradient
    bg-[length:200%_200%]
  "
>
  DoctorZ
</span>


          <span className="hidden md:inline text-sm text-gray-700 font-medium">
            | Smart Healthcare
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-12">
          {[
            { to: "/", label: "Home" },
            { to: "/all-doctors", label: "Find Doctors" },
            { to: "/all-clinics", label: "Find Clinics" },
            { to: "/all-lab-test", label: "Lab Tests" },
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`font-semibold transition relative group ${
                location.pathname === to
                  ? "text-[#0c213e]"
                  : "text-black hover:text-[#0c213e]"
              }`}
            >
              {label}
              <span
                className={`absolute bottom-0 left-0 h-0.5 bg-[#0c213e] transition-all duration-300 ${
                  location.pathname === to ? "w-full" : "w-0 group-hover:w-full"
                }`}
              ></span>
            </Link>
          ))}

          {/* Registration Dropdown */}
          {!isLoggedIn && (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
              <button
  className="
    relative overflow-hidden
    bg-[#0c213e]
    text-white font-medium
    px-5 py-2.5
    rounded-lg shadow-md
    flex items-center gap-2 justify-center
    transition-all duration-300 ease-out
    hover:cursor-pointer
    hover:scale-[1.03] hover:shadow-lg
    focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1
    group
  "
>
  <span className="relative z-10 flex items-center gap-2">
    Registration
  </span>

  {/* gradient shine overlay */}
  <span
    className="
      absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent
      translate-x-[-100%]
      group-hover:translate-x-[100%]
      transition-transform duration-700 ease-out
    "
  ></span>
</button>

              </DropdownMenu.Trigger>
              <DropdownMenu.Content
                sideOffset={8}
                className="bg-white/80 backdrop-blur-md rounded-xl shadow-xl border border-gray-100 w-56 overflow-hidden"
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

          {/* Login / Profile */}
          <div>
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-full hover:bg-gray-200 transition">
                  <User size={18} /> {user?.email || "Profile"}
                </button>
               <button
  onClick={() => {
    logout();
    alert("You have been logged out.");
  }}
  className="
    relative overflow-hidden
    flex items-center justify-center gap-2
    px-5 py-2.5 rounded-lg
    font-medium text-white
    bg-gradient-to-r from-red-600 to-rose-600
    shadow-md
    transition-all duration-300 ease-out
    hover:scale-[1.03] hover:shadow-lg
    focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-1
    active:scale-95
    group
  "
>
  <span className="relative z-10 flex items-center gap-2">
    <LogOut size={18} className="text-white/90" /> Logout
  </span>

  {/* animated shine overlay */}
  <span
    className="
      absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
      translate-x-[-100%] group-hover:translate-x-[100%]
      transition-transform duration-700 ease-out
    "
  ></span>
</button>

              </div>
            ) : (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                <button
  className="
    relative overflow-hidden
    flex items-center justify-center 
    px-6 py-2.5 rounded-lg
    font-medium text-[#0c213e]
    bg-white border border-[#0c213e]
    shadow-sm
    transition-all duration-300 ease-out
    hover:bg-blue-50 hover:shadow-md
    hover:scale-[1.03]
    active:scale-95
    hover:cursor-pointer
    focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1
    group
  "
>
  <span className="relative z-10 flex items-center gap-2">
    <LogIn size={18} className="text-[#0c213e]" /> Login
  </span>

  {/* soft shine on hover */}
  <span
    className="
      absolute inset-0 bg-gradient-to-r from-transparent via-blue-100/60 to-transparent
      translate-x-[-100%] group-hover:translate-x-[100%]
      transition-transform duration-700 ease-out
    "
  ></span>
</button>

                </DropdownMenu.Trigger>
                <DropdownMenu.Content
                  sideOffset={8}
                  className="bg-white/80 backdrop-blur-md rounded-xl shadow-xl border border-gray-100 w-56 overflow-hidden"
                >
                  <DropdownMenu.Item asChild>
                    <Link
                      to="/patient-login"
                      className="flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-green-50 transition"
                    >
                      <User size={18} className="text-indigo-600" /> Patient Login
                    </Link>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item asChild>
                    <Link
                      to="/doctor/login"
                      className="flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-green-50 transition"
                    >
                      <Stethoscope size={18} className="text-blue-600" /> Doctor Login
                    </Link>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item asChild>
                    <Link
                      to="/clinic-login"
                      className="flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-green-50 transition"
                    >
                      <Hospital size={18} className="text-green-600" /> Clinic Login
                    </Link>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item asChild>
                    <Link
                      to="/lab-login"
                      className="flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-green-50 transition"
                    >
                      <Hospital size={18} className="text-green-600" /> Lab Login
                    </Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white/70 backdrop-blur-md shadow-md border-t border-gray-200">
  <div className="grid grid-cols-2 font-medium text-black gap-2 px-4 py-3 text-start">
    <Link to="/" onClick={() => setMobileOpen(false)} className="px-2 py-2 rounded-md hover:bg-gray-100 transition">
      Home
    </Link>
    <Link to="/all-doctors" onClick={() => setMobileOpen(false)} className="px-2 py-2 rounded-md hover:bg-gray-100 transition">
      Find Doctors
    </Link>

    <Link to="/all-clinics" onClick={() => setMobileOpen(false)} className="px-2 py-2 rounded-md hover:bg-gray-100 transition">
      Find Clinics
    </Link>
    <Link to="/all-lab-test" onClick={() => setMobileOpen(false)} className="px-2 py-2 rounded-md hover:bg-gray-100 transition">
      Lab Tests
    </Link>

    {!isLoggedIn && (
      <>
        <Link to="/patient-register" onClick={() => setMobileOpen(false)} className="px-2 py-2 rounded-md hover:bg-gray-100 transition">
          Patient Registration
        </Link>
        <Link to="/doctor-register" onClick={() => setMobileOpen(false)} className="px-2 py-2 rounded-md hover:bg-gray-100 transition">
          Doctor Registration
        </Link>

        <Link to="/clinic-register" onClick={() => setMobileOpen(false)} className="px-2 py-2 rounded-md hover:bg-gray-100 transition">
          Clinic Registration
        </Link>
        <Link to="/lab-register" onClick={() => setMobileOpen(false)} className="px-2 py-2 rounded-md hover:bg-gray-100 transition">
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
        className="px-2 py-2 rounded-md text-red-600 font-medium hover:text-red-700 hover:bg-red-50 transition col-span-2"
      >
        <LogOut size={18} /> Logout
      </button>
    ) : (
      <Link
        to="/login"
        onClick={() => setMobileOpen(false)}
        className="px-2 py-2 rounded-md text-green-600 font-medium hover:text-green-700 hover:bg-green-50 transition col-span-2"
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

