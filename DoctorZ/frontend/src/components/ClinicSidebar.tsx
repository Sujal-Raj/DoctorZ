
// import { Link, useNavigate } from "react-router-dom";
// import { Home, User, UserPlus, LogOut } from "lucide-react";

// const ClinicSidebar = () => {
//   const navigate = useNavigate();

//   // const handleLogout = () => {
//   //   // Remove token/cookie here
//   //   localStorage.removeItem("clinic_portal_token");
//   //   navigate("/clinic-login");
//   // };

//   return (
//     <div className="w-64 min-h-screen bg-gray-900 text-gray-200 flex flex-col justify-between shadow-lg">
//       {/* Top section */}
//       <div className="px-6 py-8">
//         <h2 className="text-xl font-bold mb-8 text-white">Clinic Dashboard</h2>
//         <nav className="flex flex-col space-y-4">
//           <Link
//             to="/"
//             className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700 transition"
//           >
//             <Home size={18} /> Home
//           </Link>


//             <Link
//             to="clinic-profile"
//             className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700 transition"
//           >
//             <Home size={18} /> Profile
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
//         </nav>
//       </div>

//       {/* Bottom section */}
//       <div className="px-6 py-6 border-t border-gray-700">
//         <button
//           // onClick={handleLogout}
//           className="flex items-center gap-3 px-4 py-2 w-full rounded-lg hover:bg-red-600 transition text-red-400"
//         >
//           <LogOut size={18} /> Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ClinicSidebar;




import { Link, useNavigate } from "react-router-dom";
import { Home, User, UserPlus, LogOut } from "lucide-react";

const ClinicSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token/cookie here
    localStorage.removeItem("clinic_portal_token");
    navigate("/");
  };

  return (
    <div className="w-64 min-h-screen bg-gray-900 text-gray-200 flex flex-col justify-between shadow-lg">
      {/* Top section */}
      <div className="px-6 py-8">
        <h2 className="text-xl font-bold mb-8 text-white">Clinic Dashboard</h2>
        <nav className="flex flex-col space-y-4">
          <Link
            to="clinic-home-dashboard"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            <Home size={18} /> Dashboard
          </Link>
          <Link
            to="all-clinic-doctors"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            <User size={18} /> All Doctor Profiles
          </Link>
          <Link
            to="add-doctor"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            <UserPlus size={18} /> Add Doctor
          </Link>
          <Link to="clinic-profile" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700 transition">

            <User size={18} /> My Profile
          </Link>

          <Link to="all-clinic-patients" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700 transition">

            <User size={18} /> Patients
          </Link>


        </nav>
      </div>

      {/* Bottom section */}
      <div className="px-6 py-6 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2 w-full rounded-lg hover:bg-red-600 transition text-red-400"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </div>
  );
};

export default ClinicSidebar;
