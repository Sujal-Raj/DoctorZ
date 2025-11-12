



// import  { useState, useContext } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import {
//   Menu,
//   X,
//   User,
//   LogOut,
//   LogIn,
 
// } from "lucide-react";
// import Cookies from "js-cookie";
// import { jwtDecode, type JwtPayload } from "jwt-decode";
// import { AuthContext } from "../Context/AuthContext";
// import RightSidebar from "./RightSidebar";


// const Navbar = () => {
//   interface MyTokenPayload extends JwtPayload {
//   id: string;     // ✅ your custom field
//   name?: string;  // (optional)
//   email?: string; // (optional)
// }

//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const { isLoggedIn, logout } = useContext(AuthContext);
//   const location = useLocation();
//   const navigate = useNavigate();

//   const token = Cookies.get("patientToken") || "";
//   const decoded = token ? jwtDecode<MyTokenPayload>(token) : null;
//   const patientId = decoded?.id;

//   return (
//     <>
//       {/* NAVBAR */}
//       <nav className="bg-white/90 backdrop-blur-md shadow-md sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

//           {/* Logo */}
//           <Link
//             to="/"
//             className="flex items-center gap-2 text-2xl font-bold text-blue-700 hover:text-blue-800"
//           >
//             🏥 <span>DoctorZ</span>
//             <span className="hidden md:inline text-sm text-gray-500 font-medium">
//               | Smart Healthcare
//             </span>
//           </Link>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex items-center gap-8">

//             <Link to="/" className={`${location.pathname === "/" ? "text-blue-600" : "text-gray-700 hover:text-blue-600"} font-medium`}>
//               Home
//             </Link>

//             <Link to="/search-results" className={`${location.pathname === "/all-doctors" ? "text-blue-600" : "text-gray-700 hover:text-blue-600"} font-medium`}>
//               Find Doctors
//             </Link>

//             <Link to="/all-clinics" className={`${location.pathname === "/all-clinics" ? "text-blue-600" : "text-gray-700 hover:text-blue-600"} font-medium`}>
//               Find Clinics
//             </Link>

//             <Link to="/all-lab-test" className={`${location.pathname === "/all-lab-test" ? "text-blue-600" : "text-gray-700 hover:text-blue-600"} font-medium`}>
//               Lab Tests
//             </Link>

//             {/* If Not Logged In */}
//             {!isLoggedIn && (
//               <Link
//                 to="/patient-register"
//                 className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:from-blue-700 hover:to-indigo-700"
//               >
//                 Registration
//               </Link>
//             )}

//             {/* Login / Profile */}
//             {isLoggedIn ? (
//               <div className="flex items-center gap-4">

//                 {/* ✅ PROFILE → Opens Sidebar */}
//                 <button
//                   onClick={() => setSidebarOpen(true)}
//                   className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-full hover:bg-gray-200"
//                 >
//                   <User size={18} /> Profile
//                 </button>

//                 {/* ✅ LOGOUT */}
//                 <button
//                   onClick={() => {
//                     logout();
//                     Cookies.remove("patientToken");
//                     navigate("/patient-login");
//                   }}
//                   className="flex items-center gap-2 px-3 py-2 rounded-full text-red-600 bg-red-50 hover:bg-red-100"
//                 >
//                   <LogOut size={18} /> Logout
//                 </button>
//               </div>
//             ) : (
//               <Link
//                 to="/patient-login"
//                 className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 flex items-center gap-2"
//               >
//                 <LogIn size={18} /> Login
//               </Link>
//             )}
//           </div>

//           {/* Mobile Menu Icon */}
//           <button className="md:hidden text-gray-700" onClick={() => setMobileOpen(!mobileOpen)}>
//             {mobileOpen ? <X size={28} /> : <Menu size={28} />}
//           </button>
//         </div>

//         {/* MOBILE MENU */}
//         {mobileOpen && (
//           <div className="md:hidden bg-white shadow-md border-t">
//             <div className="flex flex-col px-6 py-4 space-y-4">

//               <Link to="/" onClick={() => setMobileOpen(false)}>Home</Link>
//               <Link to="/all-doctors" onClick={() => setMobileOpen(false)}>Find Doctors</Link>
//               <Link to="/all-clinics" onClick={() => setMobileOpen(false)}>Find Clinics</Link>
//               <Link to="/all-lab-test" onClick={() => setMobileOpen(false)}>Lab Tests</Link>

//               {!isLoggedIn && (
//                 <>
//                   <Link to="/patient-register" onClick={() => setMobileOpen(false)}>
//                     Patient Registration
//                   </Link>
//                   <Link to="/doctor-register" onClick={() => setMobileOpen(false)}>
//                     Doctor Registration
//                   </Link>
//                   <Link to="/clinic-register" onClick={() => setMobileOpen(false)}>
//                     Clinic Registration
//                   </Link>
//                   <Link to="/lab-register" onClick={() => setMobileOpen(false)}>
//                     Lab Registration
//                   </Link>
//                 </>
//               )}

//               {/* ✅ MOBILE PROFILE BUTTON */}
//               {isLoggedIn && (
//                 <button
//                   onClick={() => {
//                     setSidebarOpen(true);
//                     setMobileOpen(false);
//                   }}
//                   className="flex items-center gap-2"
//                 >
//                   <User size={18} /> Profile
//                 </button>
//               )}

//               {/* ✅ MOBILE LOGOUT */}
//               {isLoggedIn ? (
//                 <button
//                   onClick={() => {
//                     logout();
//                     setMobileOpen(false);
//                   }}
//                   className="text-red-600 flex items-center gap-2"
//                 >
//                   <LogOut size={18} /> Logout
//                 </button>
//               ) : (
//                 <Link
//                   to="/patient-login"
//                   onClick={() => setMobileOpen(false)}
//                   className="text-green-600 flex items-center gap-2"
//                 >
//                   <LogIn size={18} /> Login
//                 </Link>
//               )}

//             </div>
//           </div>
//         )}
//       </nav>

//       {/* ✅ RIGHT SIDEBAR */}
//       <RightSidebar
//         open={sidebarOpen}
//         onClose={() => setSidebarOpen(false)}
//         patientId={patientId}
//       />
//     </>
//   );
// };

// export default Navbar;




import { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  User,
  LogOut,
  LogIn,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Cookies from "js-cookie";
import { jwtDecode, type JwtPayload } from "jwt-decode";
import { AuthContext } from "../Context/AuthContext";
import RightSidebar from "./RightSidebar";

const Navbar = () => {
  interface MyTokenPayload extends JwtPayload {
    id: string;
  }

  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const { isLoggedIn, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const token = Cookies.get("patientToken") || "";
  const decoded = token ? jwtDecode<MyTokenPayload>(token) : null;
  const patientId = decoded?.id;

  return (
    <>
      {/* NAVBAR */}
      <nav className="bg-white/90 backdrop-blur-md shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold text-blue-700 hover:text-blue-800"
          >
            🏥 <span>DoctorZ</span>
            <span className="hidden md:inline text-sm text-gray-500 font-medium">
              | Smart Healthcare
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={`${
                location.pathname === "/"
                  ? "text-blue-600"
                  : "text-gray-700 hover:text-blue-600"
              } font-medium`}
            >
              Home
            </Link>

            <Link
              to="/search-results"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Find Doctors
            </Link>

            <Link
              to="/all-clinics"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Find Clinics
            </Link>

            <Link
              to="/all-lab-test"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Lab Tests
            </Link>

            {/* ✅ NOT LOGGED IN → REGISTER DROPDOWN */}
            {!isLoggedIn && (
              <div
                className="relative"
                onMouseEnter={() => setShowRegister(true)}
                onMouseLeave={() => setShowRegister(false)}
              >
                <button className="bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                  Register{" "}
                  {showRegister ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </button>

                <div
                  className={`absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-xl py-3 transition-all ${
                    showRegister
                      ? "opacity-100 visible"
                      : "opacity-0 invisible"
                  }`}
                >
                  <Link
                    to="/patient-register"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                  >
                    <User size={16} className="text-blue-600" /> Patient
                  </Link>
                  <Link
                    to="/doctor-register"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                  >
                    🩺 Doctor
                  </Link>
                  <Link
                    to="/clinic-register"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                  >
                    🏥 Clinic
                  </Link>
                  <Link
                    to="/lab-register"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                  >
                    🔬 Lab
                  </Link>
                </div>
              </div>
            )}

            {/* ✅ NOT LOGGED IN → LOGIN DROPDOWN */}
            {!isLoggedIn && (
              <div
                className="relative"
                onMouseEnter={() => setShowLogin(true)}
                onMouseLeave={() => setShowLogin(false)}
              >
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                  Login{" "}
                  {showLogin ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </button>

                <div
                  className={`absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-xl py-3 transition-all ${
                    showLogin ? "opacity-100 visible" : "opacity-0 invisible"
                  }`}
                >
                  <Link
                    to="/patient-login"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                  >
                    <LogIn size={16} className="text-green-600" /> Patient Login
                  </Link>

                  <Link
                    to="/doctor-login"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                  >
                    🩺 Doctor Login
                  </Link>

                  <Link
                    to="/clinic-login"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                  >
                    🏥 Clinic Login
                  </Link>

                  <Link
                    to="/lab-login"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                  >
                    🔬 Lab Login
                  </Link>
                </div>
              </div>
            )}

            {/* ✅ LOGGED IN → PROFILE + LOGOUT */}
            {isLoggedIn && (
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-full hover:bg-gray-200"
                >
                  <User size={18} /> Profile
                </button>

                <button
                  onClick={() => {
                    logout();
                    Cookies.remove("patientToken");
                    navigate("/patient-login");
                  }}
                  className="flex items-center gap-2 px-3 py-2 rounded-full text-red-600 bg-red-50 hover:bg-red-100"
                >
                  <LogOut size={18} /> Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Icon */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* ✅ MOBILE MENU */}
{mobileOpen && (
  <div className="md:hidden bg-white shadow-md border-t">
    <div className="flex flex-col px-6 py-4 space-y-4">

      <Link to="/" onClick={() => setMobileOpen(false)}>
        Home
      </Link>

      <Link to="/search-results" onClick={() => setMobileOpen(false)}>
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
          {/* ✅ REGISTER OPTIONS */}
          <p className="mt-2 font-semibold text-gray-700">Register</p>

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

          {/* ✅ LOGIN OPTIONS */}
          <p className="mt-4 font-semibold text-gray-700">Login</p>

          <Link to="/patient-login" onClick={() => setMobileOpen(false)}>
            Patient Login
          </Link>

          <Link to="/doctor-login" onClick={() => setMobileOpen(false)}>
            Doctor Login
          </Link>

          <Link to="/clinic-login" onClick={() => setMobileOpen(false)}>
            Clinic Login
          </Link>

          <Link to="/lab-login" onClick={() => setMobileOpen(false)}>
            Lab Login
          </Link>
        </>
      )}

      {/* ✅ IF LOGGED IN → SHOW PROFILE + LOGOUT */}
      {isLoggedIn && (
        <>
          <button
            onClick={() => {
              setSidebarOpen(true);
              setMobileOpen(false);
            }}
            className="flex items-center gap-2"
          >
            <User size={18} /> Profile
          </button>

          <button
            onClick={() => {
              logout();
              setMobileOpen(false);
            }}
            className="text-red-600 flex items-center gap-2"
          >
            <LogOut size={18} /> Logout
          </button>
        </>
      )}
    </div>
  </div>
)}

      </nav>

      {/* ✅ RIGHT SIDEBAR */}
      <RightSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        patientId={patientId}
      />
    </>
  );
};

export default Navbar;
