//   import React from "react";
//   import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

//   // Pages
//   import RegisterPatient from "./pages/RegisterPatient";
//   import RegisterDoctor from "./pages/RegisterDoctor";
//   import RegisterClinic from "./pages/RegisterClinic";
//   import { AuthProvider } from "../src/Context/AuthContext"; // <-- adjust path as needed

// import LoginClinic from "./pages/LoginClinic";
// import Layout from "../Layout";
// import Home from "./pages/Home";
// import AllClinic from "./pages/AllClinic";
// import AllDoctors from "./pages/AllDoctors";
// import { ClinicDashboard } from "./pages/ClinicDashboard";
// import ClinicDoctors from "./pages/ClinicDoctors";
// import AddDoctor from "./pages/AddDoctor";
// import TimeSlots from "./pages/TimeSlots";
// import DoctorLogin from "./pages/DoctorLogin";
// import DoctorDashboard from "./pages/DoctorDashboard";
// import DoctorProfile from "./pages/DoctorProfile";
// import ClinicProfile from "./pages/ClinicProfile";
// import LoginPatient from "./pages/LoginPatient";
// import AllPatient from "./pages/AllPatient";
// import PatientChat from "./pages/PatientChat";
// import DoctorChat from "./pages/DoctorChat";
// import ViewDoctorProfile from "./pages/ViewDoctorProfile";
// import RegisterLab from "./pages/RegisterLab";
// import LoginLab from "./pages/LoginLab";
// import AdminLab from "./pages/AdminLab";
// import AllLabTest from "./pages/AllLabTest";
// import LabTestDetails from "./pages/LabTestDetails";
// import Patients from "./pages/LabPatients";
// import LabTests from "./pages/LabTests";
// import LabProfile from "./pages/LabProfile";
// import LabDashboard from "./pages/LabDashboard";

// import AdminDashboard from "./pages/AdminDashboard";
// import EditDoctorProfile from "./components/EditDoctorProfile";
// import AdminDoctor from "./pages/AdminDoctor";
// import AdminClinic from "./pages/AdminClinic";
// import AdminLogin from "./pages/AdminLogin";

//   import ClinicHomeDashboard from "./pages/ClinicHomeDashboard";
//   import ClinicDoctorProfile from "./pages/ClinicDoctorProfile";
//   import AllClinicPatients from "./pages/AllClinicPatients";
//   import ClinicDetails from "./pages/ClinicDetails";
//   // import DoctorDashboardHome from "./pages/DoctorHomeDashboard";
//   // import DoctorAppointments from "./pages/DoctorAppointments";
 
//   import UserProfile from "./pages/UserProfile";
//   import EMR from "./pages/EMR";
//   import { PackageDetails } from "./pages/PackageDetails";

// import AddEmr from "./pages/AddEmr";


//             <Route
//               path="/clinicDashboard/:clinicId"
//               element={<ClinicDashboard />} 
//             >
//               <Route
//                 index
//                 element={<ClinicHomeDashboard/>}
//               />
//               <Route path="clinic-profile" element={<ClinicProfile/>} />
              
//               <Route path="all-clinic-doctors/:drId/doctorProfile" element={<DoctorProfile />} />
//               <Route
//                 path="all-clinic-doctors/:drId/availability"
//                 element={<TimeSlots />}
//               />
//               <Route path="add-doctor" element={<AddDoctor />} />
//               <Route path="all-clinic-doctors" element={<ClinicDoctors />} />
//               <Route path="all-clinic-patients" element={< AllClinicPatients/>} />
//             </Route>

//   //           <Route path="/doctor/login" element={<DoctorLogin />} />

//   //           <Route path="/doctordashboard/:drId" element={<DoctorDashboard />}>
//   //            <Route index element={<DoctorHomeDashboard />} />
//   //             <Route
//   //               path="doctor-home-dashboard"
//   //               element={<DoctorHomeDashboard/>}
//   //             />
//   //             <Route path="doctorProfile" element={<DoctorProfile />} />
//   //             <Route path="time-slots" element={<TimeSlots />} />
//   //             <Route path="appointments" element={<DoctorAppointments />} />
//   //             <Route path="patients" element={<AllPatient />} />
//   //             <Route path="settings" element={<p>Settings Page</p>} />
//   //           </Route>

//   //           <Route path="/patient-login" element={<LoginPatient />} />
//   //           <Route path="/patient-chat" element={<PatientChat />} />
//   //           <Route path="/doctor-chat" element={<DoctorChat />} />
//   //           <Route
//   //             path="/view-doctor-profile/:drId"
//   //             element={<ViewDoctorProfile />}
//   //           />
//   //           <Route path="clinic-doctor-profile/:drId" element={<ClinicDoctorProfile />} />
//   //           <Route path="/lab-register" element={<RegisterLab />} />
//   //           <Route path="/lab-login" element={<LoginLab />} />
//   //           <Route path="/admin-lab" element={<AdminLab />} />
//   //           <Route path="all-lab-test" element={<AllLabTest />} />
//   //           <Route path="/lab-test-details/:id" element={<LabTestDetails />} />
              
//   //         </Routes>
//   //       </div>
//   //     </>
//   //   );
//   // };

//   const App: React.FC = () => {
//     return (
//       <AuthProvider>
//         {" "}
//         {/* <-- Wrap the app here */}
//         <Router>
//           <Routes>
//             {/* Layout route that conditionally shows Navbar */}
//             <Route element={<Layout />}>
//               <Route path="/" element={<Home />} />
//               <Route path="/patient-register" element={<RegisterPatient />} />
//               <Route path="/doctor-register" element={<RegisterDoctor />} />
//               <Route path="/clinic-register" element={<RegisterClinic />} />
//               <Route path="/all-clinics" element={<AllClinic />} />
//               <Route path="/all-doctors" element={<AllDoctors />} />
//               <Route path="/clinic-login" element={<LoginClinic />} />
//               <Route path="/patient-login" element={<LoginPatient />} />
//               <Route path="/patient-chat" element={<PatientChat />} />
//               <Route path="/doctor-chat" element={<DoctorChat />} />
//               <Route path="/doctor/login" element={<DoctorLogin />} />
//               <Route path="/clinic/:id" element={<ClinicDetails/>}/>
              
//               <Route
//                 path="/view-doctor-profile/:drId"
//                 element={<ViewDoctorProfile />}
//               />
//               <Route path="/lab-register" element={<RegisterLab />} />
//               <Route path="/lab-login" element={<LoginLab />} />
//               <Route path="/admin-lab" element={<AdminLab />} />
//               <Route path="/all-lab-test" element={<AllLabTest />} />
//               <Route path="/lab-test-details/:id" element={<LabTestDetails />} />
//               <Route path="/lab-package-details/:packageId" element={<PackageDetails />} />
//             </Route>

            
           
              
//               <Route path="/user-profile/:id" element={<UserProfile />} />
//               <Route path="/emr/:id" element={<EMR />} />
              
           

//             {/* Routes without navbar */}

//             <Route
//               path="/clinicDashboard/:clinicId"
//               element={<ClinicDashboard />}
//             >
//               <Route
//                 index
//                 element={<ClinicHomeDashboard/>}
//               />
//               <Route
//                 path="clinic-home-dashboard"
//                 element={<ClinicHomeDashboard/>}/>
        
//               <Route path="clinic-profile" element={<ClinicProfile />} />
//               <Route path="doctorProfile" element={<DoctorProfile />} />
//               <Route
//                 path="all-clinic-doctors/:drId/availability"
//                 element={<TimeSlots />}
//               />
//               <Route path="add-doctor" element={<AddDoctor />} />
//               <Route path="all-clinic-doctors" element={<ClinicDoctors />} />
//               <Route path="all-clinic-doctors/clinic-doctor-profile/:drId" element={<ClinicDoctorProfile />} />
              
//               <Route path="all-clinic-patients" element={< AllClinicPatients/>} />
//             </Route>
            
//             <Route path="/doctordashboard/:drId" element={<DoctorDashboard />}>
//             <Route
//               index
//               element={<ClinicHomeDashboard/>}
//             />
//             <Route path="clinic-profile" element={<ClinicProfile/>} />
            
//             <Route path="all-clinic-doctors/:drId/doctorProfile" element={<DoctorProfile />} />
//             <Route
//               path="all-clinic-doctors/:drId/availability"
//               element={<TimeSlots />}
//             />
//             <Route path="add-doctor" element={<AddDoctor />} />
//             <Route path="all-clinic-doctors" element={<ClinicDoctors />} />
//             <Route path="all-clinic-patients" element={< AllClinicPatients/>} />
//           </Route>



// const App: React.FC = () => {
//   return (
//     <AuthProvider>
//       {" "}
//       {/* <-- Wrap the app here */}
//       <Router>
//         <Routes>
//           {/* Layout route that conditionally shows Navbar */}
//           <Route element={<Layout />}>
        
//             <Route path="/" element={<Home />} />
//             <Route path="/patient-register" element={<RegisterPatient />} />
//             <Route path="/doctor-register" element={<RegisterDoctor />} />
//             <Route path="/clinic-register" element={<RegisterClinic />} />
//             <Route path="/all-clinics" element={<AllClinic />} />
//             <Route path="/all-doctors" element={<AllDoctors />} />
//             <Route path="/clinic-login" element={<LoginClinic />} />
//             <Route path="/patient-login" element={<LoginPatient />} />
//             <Route path="/patient-chat" element={<PatientChat />} />
//             <Route path="/doctor-chat" element={<DoctorChat />} />
//             <Route path="/doctor/login" element={<DoctorLogin />} />
//              <Route path="/clinic/:id" element={<ClinicDetails/>}/>
//             <Route
//               path="/view-doctor-profile/:drId"
//               element={<ViewDoctorProfile />}
//             />
//             <Route path="/lab-register" element={<RegisterLab />} />
//             <Route path="/lab-login" element={<LoginLab />} />
//             <Route path="/admin-lab" element={<AdminLab />} />
//             <Route path="/all-lab-test" element={<AllLabTest />} />
//             <Route path="/lab-test-details/:id" element={<LabTestDetails />} />
//             <Route path="/lab-package-details/:packageId" element={<PackageDetails />} />
//             <Route path="/add-emr" element={<AddEmr />} />
//           </Route>

//           {/* Routes without navbar */}

//           <Route
//             path="/clinicDashboard/:clinicId"
//             element={<ClinicDashboard />}
//           >
//              <Route
//               index
//               element={<ClinicHomeDashboard/>}
//             />
//              <Route
//               path="clinic-home-dashboard"
//                element={<ClinicHomeDashboard/>}/>
       
//             <Route path="clinic-profile" element={<ClinicProfile />} />
//             <Route path="doctorProfile" element={<DoctorProfile />} />
//             <Route
//               path="all-clinic-doctors/:drId/availability"
//               element={<TimeSlots />}
//             />
//             <Route path="add-doctor" element={<AddDoctor />} />
//             <Route path="all-clinic-doctors" element={<ClinicDoctors />} />
//              <Route path="all-clinic-doctors/clinic-doctor-profile/:drId" element={<ClinicDoctorProfile />} />
            
//             <Route path="all-clinic-patients" element={< AllClinicPatients/>} />
//           </Route>
          
//               <Route path="patients" element={<AllPatient />} />
              
//                 <Route path="editDoctorIdPassword" element={<EditDoctorProfile />} />
//             </Route>
//             <Route path="/adminDashboard" element={<AdminDashboard />}>
//               <Route path="admin-lab" element={<AdminLab />} />
//               <Route path="admin-doctor" element={<AdminDoctor />} />
              
//               <Route path="admin-clinic" element={<AdminClinic />} />
//             </Route>

//           <Route path="/lab-dashboard" element={<LabDashboard />}>
//             {" "}
//             <Route
//               index
//               element={
//                 <h1 className="text-2xl font-bold">Welcome to Dashboard</h1>
//               }
//             />
//             <Route path="patients" element={<Patients />} />
//             <Route path="tests" element={<LabTests />} />
//             <Route path="profile" element={<LabProfile />} />
//           </Route>
        
//           <Route path="/admin/login" element={<AdminLogin />}></Route>
          
        
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// };

//   export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Context
import { AuthProvider } from "./Context/AuthContext";

// Layout & Pages
import Layout from "../Layout";
import Home from "./pages/Home";
import RegisterPatient from "./pages/RegisterPatient";
import RegisterDoctor from "./pages/RegisterDoctor";
import RegisterClinic from "./pages/RegisterClinic";
import LoginClinic from "./pages/LoginClinic";
import LoginPatient from "./pages/LoginPatient";
import DoctorLogin from "./pages/DoctorLogin";
import RegisterLab from "./pages/RegisterLab";
import LoginLab from "./pages/LoginLab";
import AdminLogin from "./pages/AdminLogin";

// Common
import AllClinic from "./pages/AllClinic";
import AllDoctors from "./pages/AllDoctors";
import ViewDoctorProfile from "./pages/ViewDoctorProfile";
import ClinicDetails from "./pages/ClinicDetails";
import UserProfile from "./pages/UserProfile";
import EMR from "./pages/EMR";
import AddEmr from "./pages/AddEmr";
import PatientChat from "./pages/PatientChat";
import DoctorChat from "./pages/DoctorChat";

// Clinic
import { ClinicDashboard } from "./pages/ClinicDashboard";
import ClinicHomeDashboard from "./pages/ClinicHomeDashboard";
import ClinicProfile from "./pages/ClinicProfile";
import ClinicDoctors from "./pages/ClinicDoctors";
import AddDoctor from "./pages/AddDoctor";
import TimeSlots from "./pages/TimeSlots";
import AllClinicPatients from "./pages/AllClinicPatients";
import ClinicDoctorProfile from "./pages/ClinicDoctorProfile";

// Doctor
import DoctorDashboard from "./pages/DoctorDashboard";
import DoctorProfile from "./pages/DoctorProfile";
import EditDoctorProfile from "./components/EditDoctorProfile";
import AllPatient from "./pages/AllPatient";

// Lab
import LabDashboard from "./pages/LabDashboard";
import Patients from "./pages/LabPatients";
import LabTests from "./pages/LabTests";
import LabProfile from "./pages/LabProfile";
import AllLabTest from "./pages/AllLabTest";
import LabTestDetails from "./pages/LabTestDetails";
import { PackageDetails } from "./pages/PackageDetails";

// Admin
import AdminDashboard from "./pages/AdminDashboard";
import AdminDoctor from "./pages/AdminDoctor";
import AdminClinic from "./pages/AdminClinic";
import AdminLab from "./pages/AdminLab";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Layout routes (with navbar) */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/patient-register" element={<RegisterPatient />} />
            <Route path="/doctor-register" element={<RegisterDoctor />} />
            <Route path="/clinic-register" element={<RegisterClinic />} />
            <Route path="/all-clinics" element={<AllClinic />} />
            <Route path="/all-doctors" element={<AllDoctors />} />
            <Route path="/clinic-login" element={<LoginClinic />} />
            <Route path="/patient-login" element={<LoginPatient />} />
            <Route path="/doctor/login" element={<DoctorLogin />} />
            <Route path="/lab-register" element={<RegisterLab />} />
            <Route path="/lab-login" element={<LoginLab />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/clinic/:id" element={<ClinicDetails />} />
            <Route path="/view-doctor-profile/:drId" element={<ViewDoctorProfile />} />
            <Route path="/patient-chat" element={<PatientChat />} />
            <Route path="/doctor-chat" element={<DoctorChat />} />
            <Route path="/lab-package-details/:packageId" element={<PackageDetails />} />
            <Route path="/lab-test-details/:id" element={<LabTestDetails />} />
            <Route path="/all-lab-test" element={<AllLabTest />} />
            <Route path="/add-emr" element={<AddEmr />} />
          </Route>

          {/* Clinic Dashboard */}
          <Route path="/clinicDashboard/:clinicId" element={<ClinicDashboard />}>
            <Route index element={<ClinicHomeDashboard />} />
            <Route path="clinic-home-dashboard" element={<ClinicHomeDashboard />} />
            <Route path="clinic-profile" element={<ClinicProfile />} />
            <Route path="doctorProfile" element={<DoctorProfile />} />
            <Route path="all-clinic-doctors/:drId/availability" element={<TimeSlots />} />
            <Route path="add-doctor" element={<AddDoctor />} />
            <Route path="all-clinic-doctors" element={<ClinicDoctors />} />
            <Route path="all-clinic-doctors/clinic-doctor-profile/:drId" element={<ClinicDoctorProfile />} />
            <Route path="all-clinic-patients" element={<AllClinicPatients />} />
          </Route>

          {/* Doctor Dashboard */}
          <Route path="/doctordashboard/:drId" element={<DoctorDashboard />}>
            <Route path="patients" element={<AllPatient />} />
            <Route path="editDoctorIdPassword" element={<EditDoctorProfile />} />
            <Route path="doctorProfile" element={<DoctorProfile />} />
          </Route>

          {/* Admin Dashboard */}
          <Route path="/adminDashboard" element={<AdminDashboard />}>
            <Route path="admin-lab" element={<AdminLab />} />
            <Route path="admin-doctor" element={<AdminDoctor />} />
            <Route path="admin-clinic" element={<AdminClinic />} />
          </Route>

          {/* Lab Dashboard */}
          <Route path="/lab-dashboard" element={<LabDashboard />}>
            <Route index element={<h1 className="text-2xl font-bold">Welcome to Dashboard</h1>} />
            <Route path="patients" element={<Patients />} />
            <Route path="tests" element={<LabTests />} />
            <Route path="profile" element={<LabProfile />} />
          </Route>

          {/* User & EMR */}
          <Route path="/user-profile/:id" element={<UserProfile />} />
          <Route path="/emr/:id" element={<EMR />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
