// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
// import { Menu, X, User, LogOut, LogIn, Stethoscope, Hospital, UserPlus } from "lucide-react";

// const Navbar: React.FC = () => {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const isLoggedIn = false; // 👉 Replace with real auth state

//   return (
//     <nav className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50 border-b border-gray-200">
//       <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
//         {/* Logo */}
//         <Link
//           to="/"
//           className="flex items-center gap-2 text-2xl font-bold text-blue-700"
//         >
//           🏥 <span>DoctorZ</span>
//           <span className="hidden md:inline text-sm text-gray-500 font-medium">
//             | Smart Healthcare
//           </span>
//         </Link>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex items-center gap-8">
//           <Link
//             to="/"
//             className="text-gray-700 font-medium hover:text-blue-600 transition"
//           >
//             Home
//           </Link>
//            <Link
//             to="/all-clinics"
//             className="text-gray-700 font-medium hover:text-blue-600 transition"
//           >
//             Clinic
//           </Link>
//            <Link
//             to="/all-doctors"
//             className="text-gray-700 font-medium hover:text-blue-600 transition"
//           >
//             Doctor
//           </Link>

//           {/* Registration Dropdown (Patient + Doctor + Clinic) */}
//           <DropdownMenu.Root>
//             <DropdownMenu.Trigger asChild>
//               <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition flex items-center gap-2">
//                 Registration
//               </button>
//             </DropdownMenu.Trigger>

//             <DropdownMenu.Content
//               sideOffset={8}
//               className="bg-white rounded-lg shadow-xl border border-gray-100 w-56 overflow-hidden"
//             >
//               <DropdownMenu.Item asChild>
//                 <Link
//                   to="/patient-register"
//                   className="flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-blue-50 transition"
//                 >
//                   <UserPlus size={18} className="text-indigo-600" /> Patient Registration
//                 </Link>
//               </DropdownMenu.Item>

//               <DropdownMenu.Item asChild>
//                 <Link
//                   to="/doctor-register"
//                   className="flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-blue-50 transition"
//                 >
//                   <Stethoscope size={18} className="text-blue-600" /> Doctor Registration
//                 </Link>
//               </DropdownMenu.Item>

//               <DropdownMenu.Item asChild>
//                 <Link
//                   to="/clinic-register"
//                   className="flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-blue-50 transition"
//                 >
//                   <Hospital size={18} className="text-green-600" /> Clinic Registration
//                 </Link>
//               </DropdownMenu.Item>
//             </DropdownMenu.Content>
//           </DropdownMenu.Root>

//           {/* Auth */}
//           <div>
//             {isLoggedIn ? (
//               <DropdownMenu.Root>
//                 <DropdownMenu.Trigger asChild>
//                   <button className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-full hover:bg-gray-200 transition">
//                     <User size={18} /> Profile
//                   </button>
//                 </DropdownMenu.Trigger>
//                 <DropdownMenu.Content
//                   sideOffset={8}
//                   className="bg-white rounded-lg shadow-xl border border-gray-100 w-48 overflow-hidden"
//                 >
//                   <DropdownMenu.Item asChild>
//                     <button className="w-full text-left flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-red-50 transition">
//                       <LogOut size={18} className="text-red-500" /> Logout
//                     </button>
//                   </DropdownMenu.Item>
//                 </DropdownMenu.Content>
//               </DropdownMenu.Root>
//             ) : (
//               <DropdownMenu.Root>
//   <DropdownMenu.Trigger asChild>
//     <button className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition flex items-center gap-2">
//       <LogIn size={18} /> Login
//     </button>
//   </DropdownMenu.Trigger>

//   <DropdownMenu.Content
//     sideOffset={8}
//     className="bg-white rounded-lg shadow-xl border border-gray-100 w-56 overflow-hidden"
//   >
//     {/* Patient */}
//     <DropdownMenu.Item asChild>
//       <Link
//         to="/patient-login"
//         className="flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-green-50 transition"
//       >
//         <User size={18} className="text-indigo-600" /> Patient Login
//       </Link>
//     </DropdownMenu.Item>

//     {/* Doctor */}
//     <DropdownMenu.Item asChild>
//       <Link
//         to="/doctor-login"
//         className="flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-green-50 transition"
//       >
//         <Stethoscope size={18} className="text-blue-600" /> Doctor Login
//       </Link>
//     </DropdownMenu.Item>

//     {/* Clinic */}
//     <DropdownMenu.Item asChild>
//       {isLoggedIn ? (
//         <Link
//           to="/clinic-dashboard"
//           className="flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-green-50 transition"
//         >
//           <Hospital size={18} className="text-green-600" /> Clinic Dashboard
//         </Link>
//       ) : (
//         <Link
//           to="/clinic-login"
//           className="flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-green-50 transition"
//         >
//           <Hospital size={18} className="text-green-600" /> Clinic Login
//         </Link>
//       )}
//     </DropdownMenu.Item>
//   </DropdownMenu.Content>
// </DropdownMenu.Root>

//             )}
//           </div>
//         </div>

//         {/* Mobile Menu Button */}
//         <button
//           className="md:hidden text-gray-700"
//           onClick={() => setMobileOpen(!mobileOpen)}
//         >
//           {mobileOpen ? <X size={28} /> : <Menu size={28} />}
//         </button>
//       </div>

//       {/* Mobile Dropdown */}
//      {mobileOpen && (
//   <div className="md:hidden bg-white shadow-md border-t border-gray-200">
//     <div className="flex flex-col px-6 py-4 space-y-4">
//       <Link
//         to="/"
//         className="text-gray-700 font-medium hover:text-blue-600 transition"
//         onClick={() => setMobileOpen(false)}
//       >
//         Home
//       </Link>
//       <Link
//         to="/all-clinics"
//         className="text-gray-700 font-medium hover:text-blue-600 transition"
//         onClick={() => setMobileOpen(false)}
//       >
//         Clinic
//       </Link>
//       <Link
//         to="/all-doctors"
//         className="text-gray-700 font-medium hover:text-blue-600 transition"
//         onClick={() => setMobileOpen(false)}
//       >
//         Doctor
//       </Link>

//       {/* Registration Section */}
//       <div className="border-t pt-3">
//         <p className="text-gray-500 text-sm mb-2">Registration</p>
//         <Link
//           to="/patient-register"
//           className="text-gray-700 font-medium hover:text-blue-600 transition block"
//           onClick={() => setMobileOpen(false)}
//         >
//           👤 Patient Registration
//         </Link>
//         <Link
//           to="/doctor-register"
//           className="text-gray-700 font-medium hover:text-blue-600 transition block"
//           onClick={() => setMobileOpen(false)}
//         >
//           👨‍⚕️ Doctor Registration
//         </Link>
//         <Link
//           to="/clinic-register"
//           className="text-gray-700 font-medium hover:text-blue-600 transition block"
//           onClick={() => setMobileOpen(false)}
//         >
//           🏥 Clinic Registration
//         </Link>
//       </div>

//       {/* Login Section */}
//       <div className="border-t pt-3">
//         <p className="text-gray-500 text-sm mb-2">Login</p>
//         <Link
//           to="/patient-login"
//           className="flex items-center gap-2 text-gray-700 font-medium hover:text-blue-600 transition"
//           onClick={() => setMobileOpen(false)}
//         >
//           <User size={18} className="text-indigo-600" /> Patient Login
//         </Link>
//         <Link
//           to="/doctor-login"
//           className="flex items-center gap-2 text-gray-700 font-medium hover:text-blue-600 transition"
//           onClick={() => setMobileOpen(false)}
//         >
//           <Stethoscope size={18} className="text-blue-600" /> Doctor Login
//         </Link>
//         {isLoggedIn ? (
//           <Link
//             to="/clinic-dashboard"
//             className="flex items-center gap-2 text-gray-700 font-medium hover:text-blue-600 transition"
//             onClick={() => setMobileOpen(false)}
//           >
//             <Hospital size={18} className="text-green-600" /> Clinic Dashboard
//           </Link>
//         ) : (
//           <Link
//             to="/clinic-login"
//             className="flex items-center gap-2 text-gray-700 font-medium hover:text-blue-600 transition"
//             onClick={() => setMobileOpen(false)}
//           >
//             <Hospital size={18} className="text-green-600" /> Clinic Login
//           </Link>
//         )}
//       </div>

//       {/* Logout */}
//       {isLoggedIn && (
//         <button
//           className="flex items-center gap-2 text-red-600 font-medium hover:text-red-700 transition"
//           onClick={() => setMobileOpen(false)}
//         >
//           <LogOut size={18} /> Logout
//         </button>
//       )}
//     </div>
//   </div>
// )}

//     </nav>
//   );
// };

// export default Navbar;



import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Menu, X, User, LogOut, LogIn, Stethoscope, Hospital, UserPlus, Search } from "lucide-react";
import { AuthContext } from "../Context/AuthContext";

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isLoggedIn, user, logout } = useContext(AuthContext);
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const showSearch = location.pathname === "/all-doctors" || location.pathname === "/all-clinics";

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-md sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-blue-700 hover:text-blue-800 transition">
          🏥 <span>DoctorZ</span>
          <span className="hidden md:inline text-sm text-gray-500 font-medium">| Smart Healthcare</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className={`font-medium transition ${location.pathname === "/" ? "text-blue-600" : "text-gray-700 hover:text-blue-600"}`}>Home</Link>
          <Link to="/all-doctors" className={`font-medium transition ${location.pathname === "/all-doctors" ? "text-blue-600" : "text-gray-700 hover:text-blue-600"}`}>Find Doctors</Link>
          <Link to="/all-clinics" className={`font-medium transition ${location.pathname === "/all-clinics" ? "text-blue-600" : "text-gray-700 hover:text-blue-600"}`}>Find Clinics</Link>

          {/* Registration Dropdown */}
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:from-blue-700 hover:to-indigo-700 transition flex items-center gap-2">
                Registration
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content sideOffset={8} className="bg-white rounded-xl shadow-xl border border-gray-100 w-56 overflow-hidden">
              <DropdownMenu.Item asChild>
                <Link to="/patient-register" className="flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-blue-50 transition">
                  <UserPlus size={18} className="text-indigo-600" /> Patient
                </Link>
              </DropdownMenu.Item>
              <DropdownMenu.Item asChild>
                <Link to="/doctor-register" className="flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-blue-50 transition">
                  <Stethoscope size={18} className="text-blue-600" /> Doctor
                </Link>
              </DropdownMenu.Item>
              <DropdownMenu.Item asChild>
                <Link to="/clinic-register" className="flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-blue-50 transition">
                  <Hospital size={18} className="text-green-600" /> Clinic
                </Link>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>

          {/* Auth */}
          <div>
            {isLoggedIn ? (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <button className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-full hover:bg-gray-200 transition">
                    <User size={18} /> {user?.email || "Profile"}
                  </button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content sideOffset={8} className="bg-white rounded-xl shadow-xl border border-gray-100 w-48 overflow-hidden">
                  <DropdownMenu.Item asChild>
                    <button onClick={logout} className="w-full text-left flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-red-50 transition">
                      <LogOut size={18} className="text-red-500" /> Logout
                    </button>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            ) : (
              <Link to="/login" className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition flex items-center gap-2">
                <LogIn size={18} /> Login
              </Link>
            )}
          </div>
        </div>

        {showSearch && (
          <div className="hidden md:flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg ml-6 w-80 border border-gray-300">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder={location.pathname === "/all-doctors" ? "Search doctors by name or specialty..." : "Search clinics by name or location..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent outline-none flex-1 text-sm"
            />
          </div>
        )}

        <button className="md:hidden text-gray-700" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white shadow-md border-t border-gray-200">
          <div className="flex flex-col px-6 py-4 space-y-4">
            <Link to="/" className="text-gray-700 font-medium hover:text-blue-600 transition" onClick={() => setMobileOpen(false)}>Home</Link>
            <Link to="/all-doctors" className="text-gray-700 font-medium hover:text-blue-600 transition" onClick={() => setMobileOpen(false)}>Find Doctors</Link>
            <Link to="/all-clinics" className="text-gray-700 font-medium hover:text-blue-600 transition" onClick={() => setMobileOpen(false)}>Find Clinics</Link>
            <Link to="/patient-register" className="text-gray-700 font-medium hover:text-blue-600 transition" onClick={() => setMobileOpen(false)}>👤 Patient Registration</Link>
            <Link to="/doctor-register" className="text-gray-700 font-medium hover:text-blue-600 transition" onClick={() => setMobileOpen(false)}>👨‍⚕️ Doctor Registration</Link>
            <Link to="/clinic-register" className="text-gray-700 font-medium hover:text-blue-600 transition" onClick={() => setMobileOpen(false)}>🏥 Clinic Registration</Link>
            {isLoggedIn ? (
              <button onClick={logout} className="flex items-center gap-2 text-red-600 font-medium hover:text-red-700 transition"><LogOut size={18} /> Logout</button>
            ) : (
              <Link to="/login" className="flex items-center gap-2 text-green-600 font-medium hover:text-green-700 transition" onClick={() => setMobileOpen(false)}><LogIn size={18} /> Login</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
