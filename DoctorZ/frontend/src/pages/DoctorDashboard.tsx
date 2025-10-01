// import React from "react";
// import { Link, Routes,Route } from "react-router-dom";


// function DoctorDashboard() {
  

// return (
    
//       <div className="flex h-screen">
//         {/* Sidebar */}
//         <aside className="w-64 bg-gray-900 text-white flex flex-col p-6">
//           <h2 className="text-2xl font-bold mb-8">Doctor Dashboard</h2>
//           <nav className="space-y-4">
//             <Link to="/doctor/profile" className="hover:text-blue-400 block">Profile</Link>
//             <Link to="appointments" className="hover:text-blue-400 block">Appointments</Link>
//             <Link to="patients" className="hover:text-blue-400 block">My Patients</Link>
//             <Link to="settings" className="hover:text-blue-400 block">Settings</Link>
//           </nav>
//         </aside>

//         {/* Main Content */}
//         <main className="flex-1 bg-gray-100 p-10 overflow-y-auto">
//           <Routes>
//             {/* Default blank page */}
//             <Route
//               path="/"
//               element={
//                 <p className="text-gray-500">
//                   Welcome Doctor, choose a menu from sidebar.
//                 </p>
//               }
//             />

          

//             {/* Other Pages */}
//             <Route path="/appointments" element={<p>Appointments Page</p>} />
//             <Route path="/patients" element={<p>Patients Page</p>} />
//             <Route path="/settings" element={<p>Settings Page</p>} />
//           </Routes>
//         </main>
//       </div>
  
//   );
// }

// export default DoctorDashboard;



import { Link, Outlet, useParams } from "react-router-dom";

function DoctorDashboard() {
  const {drId}=useParams();
  console.log("Doctor ID from params:", drId);
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col p-6">
        <h2 className="text-2xl font-bold mb-8">Doctor Dashboard</h2>
        <nav className="space-y-4">

          <Link to="doctorProfile" className="hover:text-blue-400 block">Profile</Link>
            <Link to="time-slots" className="hover:text-blue-400 block">Add Availability</Link>
          <Link to="appointments" className="hover:text-blue-400 block">Appointments</Link>
          <Link to="patients" className="hover:text-blue-400 block">My Patients</Link>
          <Link to="settings" className="hover:text-blue-400 block">Settings</Link>
          <Link to="/" className="hover:text-blue-400 block">Home</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-10 overflow-y-auto">
        <Outlet />  {/* yaha par child route ka content render hoga */}
      </main>
    </div>
  );
}

export default DoctorDashboard;