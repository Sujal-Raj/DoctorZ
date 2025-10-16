// // import React from "react";
// // import { Link, Routes,Route } from "react-router-dom";


// // function DoctorDashboard() {
  

// // return (
    
// //       <div className="flex h-screen">
// //         {/* Sidebar */}
// //         <aside className="w-64 bg-gray-900 text-white flex flex-col p-6">
// //           <h2 className="text-2xl font-bold mb-8">Doctor Dashboard</h2>
// //           <nav className="space-y-4">
// //             <Link to="/doctor/profile" className="hover:text-blue-400 block">Profile</Link>
// //             <Link to="appointments" className="hover:text-blue-400 block">Appointments</Link>
// //             <Link to="patients" className="hover:text-blue-400 block">My Patients</Link>
// //             <Link to="settings" className="hover:text-blue-400 block">Settings</Link>
// //           </nav>
// //         </aside>

// //         {/* Main Content */}
// //         <main className="flex-1 bg-gray-100 p-10 overflow-y-auto">
// //           <Routes>
// //             {/* Default blank page */}
// //             <Route
// //               path="/"
// //               element={
// //                 <p className="text-gray-500">
// //                   Welcome Doctor, choose a menu from sidebar.
// //                 </p>
// //               }
// //             />

          

// //             {/* Other Pages */}
// //             <Route path="/appointments" element={<p>Appointments Page</p>} />
// //             <Route path="/patients" element={<p>Patients Page</p>} />
// //             <Route path="/settings" element={<p>Settings Page</p>} />
// //           </Routes>
// //         </main>
// //       </div>
  
// //   );
// // }

// // export default DoctorDashboard;



// import { Link, Outlet, useParams } from "react-router-dom";
// import { FaUserMd, FaCalendarAlt, FaUsers, FaClock, FaHome, FaSignOutAlt } from "react-icons/fa";

// function DoctorDashboard() {
//   const {drId}=useParams();
//   console.log("Doctor ID from params:", drId);


//   const handleLogout=()=>{
//     try{
     
//       localStorage.removeItem("doctorId");
//       localStorage.removeItem("token");
//       window.location.href = "/";
//     }
//     catch(err){
//       console.error("Failed to logout",err);
//     }
//   }
    


    
  
//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <aside className="w-64 bg-gray-900 text-white flex flex-col p-6">
//         <h2 className="text-2xl font-bold mb-8">Doctor Dashboard</h2>
//         <nav className="space-y-4">
//           <Link to="/" className="hover:text-blue-400 block ">Home</Link>
//           <Link to="doctorProfile" className="hover:text-blue-400 block">Profile</Link>
//           <Link to="time-slots" className="hover:text-blue-400 block">Add Availability</Link>
//           <Link to="appointments" className="hover:text-blue-400 block">Appointments</Link>
//           <Link to="patients" className="hover:text-blue-400 block">My Patients</Link>
          
         
//         </nav>
//         <button onClick={handleLogout}>Logout</button>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 bg-gray-100 p-10 overflow-y-auto">
//         <Outlet />  {/* yaha par child route ka content render hoga */}
//       </main>
//     </div>
//   );
// }

// export default DoctorDashboard;


import { Link, Outlet, useLocation } from "react-router-dom";
import { FaUserMd, FaCalendarAlt, FaUsers, FaClock, FaHome, FaSignOutAlt } from "react-icons/fa";

function DoctorDashboard() {

  const location = useLocation();

  const handleLogout = async () => {
    localStorage.removeItem("doctorId");
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const menuItems = [
    { name: "Home", path: "/", icon: <FaHome /> },
    { name: "Profile", path: "doctorProfile", icon: <FaUserMd /> },
    { name: "Add Availability", path: "time-slots", icon: <FaClock /> },
    { name: "Appointments", path: "appointments", icon: <FaCalendarAlt /> },
    { name: "My Patients", path: "patients", icon: <FaUsers /> },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col justify-between p-6">
        <div>
          <h2 className="text-2xl font-bold mb-8 text-center">Doctor Dashboard</h2>
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                  location.pathname.includes(item.path)
                    ? "bg-blue-700 text-white"
                    : "hover:bg-gray-800 text-gray-200"
                }`}
              >
                {item.icon} <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Logout Button at Bottom */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 mt-6 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition text-white w-full justify-center  mb-11.5"
        >
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-10 overflow-y-auto">
        <Outlet /> {/* Child route content renders here */}
      </main>
    </div>
  );
}

export default DoctorDashboard;
