import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

// Pages
import RegisterPatient from "./pages/RegisterPatient";
import RegisterDoctor from "./pages/RegisterDoctor";
import RegisterClinic from "./pages/RegisterClinic";
import { AuthProvider } from "../src/Context/AuthContext"; // <-- adjust path as needed

import LoginClinic from "./pages/LoginClinic";
import Layout from "../Layout";
import Home from "./pages/Home";
import AllClinic from "./pages/AllClinic";
import AllDoctors from "./pages/AllDoctors";
import { ClinicDashboard } from "./pages/ClinicDashboard";
import ClinicDoctors from "./pages/ClinicDoctors";
import AddDoctor from "./pages/AddDoctor";
import TimeSlots from "./pages/TimeSlots";
import DoctorLogin from "./pages/DoctorLogin";
import DoctorDashboard from "./pages/DoctorDashboard";
import DoctorProfile from "./pages/DoctorProfile";
import ClinicProfile from "./pages/ClinicProfile";
import LoginPatient from "./pages/LoginPatient";
import AllPatient from "./pages/AllPatient";
import PatientChat from "./pages/PatientChat";
import DoctorChat from "./pages/DoctorChat";
import ViewDoctorProfile from "./pages/ViewDoctorProfile";
import RegisterLab from "./pages/RegisterLab";
import LoginLab from "./pages/LoginLab";
import AdminLab from "./pages/AdminLab";
import AllLabTest from "./pages/AllLabTest";
import Patients from "./pages/LabPatients";
import LabTests from "./pages/LabTests";
import LabProfile from "./pages/LabProfile";
import LabDashboard from "./pages/LabDashboard";
// import AppointmentForm from "./pages/AppointmentForm";
// import DoctorAppointments from "./pages/DoctorAppointments";
// import AllClinicPatients from "./pages/AllClinicPatients";
// import DoctorHomeDashboard from "./pages/DoctorHomeDashboard";
// import ClinicHomeDashboard from "./pages/ClinicHomeDashboard";
// import ClinicDoctorProfile from "./pages/ClinicDoctorProfile";
import AdminDashboard from "./pages/AdminDashboard";
import EditDoctorProfile from "./components/EditDoctorProfile";
import AdminDoctor from "./pages/AdminDoctor";
import AdminClinic from "./pages/AdminClinic";
import AdminLogin from "./pages/AdminLogin";
import LabTestDetails from "./pages/LabTestDetails";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";

// Wrapper component to conditionally render Navbar
// const AppWrapper: React.FC = () => {
//   const location = useLocation();

//   const showNavbar = !location.pathname.startsWith("/clinicDashboard") &&
//                        !location.pathname.startsWith("/doctorDashboard");

//   return (
//     <>
//       {showNavbar && <Navbar />}
//       <div className="">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/lab-dashboard" element={<LabDashboard />}>
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
//           <Route path="/patient-register" element={<RegisterPatient />} />
//           <Route path="/doctor-register" element={<RegisterDoctor />} />
//           <Route path="/clinic-register" element={<RegisterClinic />} />
//           <Route path="/all-clinics" element={<AllClinic />} />
//           <Route path="/all-doctors" element={<AllDoctors />} />
//           <Route path="/clinic-login" element={<LoginClinic />} />
//           <Route path="/admin" element={<AdminDashboard />} />

          <Route
            path="/clinicDashboard/:clinicId"
            element={<ClinicDashboard />} 
          >
             <Route
              index
              element={<ClinicHomeDashboard/>}
            />
            <Route path="clinic-profile" element={<ClinicProfile/>} />
            
            <Route path="all-clinic-doctors/:drId/doctorProfile" element={<DoctorProfile />} />
            <Route
              path="all-clinic-doctors/:drId/availability"
              element={<TimeSlots />}
            />
            <Route path="add-doctor" element={<AddDoctor />} />
            <Route path="all-clinic-doctors" element={<ClinicDoctors />} />
            <Route path="all-clinic-patients" element={< AllClinicPatients/>} />
          </Route>

//           <Route path="/doctor/login" element={<DoctorLogin />} />

//           <Route path="/doctordashboard/:drId" element={<DoctorDashboard />}>
//            <Route index element={<DoctorHomeDashboard />} />
//             <Route
//               path="doctor-home-dashboard"
//               element={<DoctorHomeDashboard/>}
//             />
//             <Route path="doctorProfile" element={<DoctorProfile />} />
//             <Route path="time-slots" element={<TimeSlots />} />
//             <Route path="appointments" element={<DoctorAppointments />} />
//             <Route path="patients" element={<AllPatient />} />
//             <Route path="settings" element={<p>Settings Page</p>} />
//           </Route>

//           <Route path="/patient-login" element={<LoginPatient />} />
//           <Route path="/patient-chat" element={<PatientChat />} />
//           <Route path="/doctor-chat" element={<DoctorChat />} />
//           <Route
//             path="/view-doctor-profile/:drId"
//             element={<ViewDoctorProfile />}
//           />
//           <Route path="clinic-doctor-profile/:drId" element={<ClinicDoctorProfile />} />
//           <Route path="/lab-register" element={<RegisterLab />} />
//           <Route path="/lab-login" element={<LoginLab />} />
//           <Route path="/admin-lab" element={<AdminLab />} />
//           <Route path="all-lab-test" element={<AllLabTest />} />
//           <Route path="/lab-test-details/:id" element={<LabTestDetails />} />
            
//         </Routes>
//       </div>
//     </>
//   );
// };

const App: React.FC = () => {
  return (
    <AuthProvider>
      {" "}
      {/* <-- Wrap the app here */}
      <Router>
        <Routes>
          {/* Layout route that conditionally shows Navbar */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/patient-register" element={<RegisterPatient />} />
            <Route path="/doctor-register" element={<RegisterDoctor />} />
            <Route path="/clinic-register" element={<RegisterClinic />} />
            <Route path="/all-clinics" element={<AllClinic />} />
            <Route path="/all-doctors" element={<AllDoctors />} />
            <Route path="/clinic-login" element={<LoginClinic />} />
            <Route path="/patient-login" element={<LoginPatient />} />
            <Route path="/patient-chat" element={<PatientChat />} />
            <Route path="/doctor-chat" element={<DoctorChat />} />
            <Route path="/doctor/login" element={<DoctorLogin />} />
             <Route path="/clinic/:id" element={<ClinicDetails/>}/>
            <Route
              path="/view-doctor-profile/:drId"
              element={<ViewDoctorProfile />}
            />
            <Route path="/lab-register" element={<RegisterLab />} />
            <Route path="/lab-login" element={<LoginLab />} />
            <Route path="/admin-lab" element={<AdminLab />} />
            <Route path="/all-lab-test" element={<AllLabTest />} />
          </Route>

          {/* Routes without navbar */}

          <Route
            path="/clinicDashboard/:clinicId"
            element={<ClinicDashboard />}
          >
             <Route
              index
              element={<ClinicHomeDashboard/>}
            />
             <Route
              path="clinic-home-dashboard"
               element={<ClinicHomeDashboard/>}/>
               <Route path="clinic-doctor-profile/:drid" element={<ClinicDoctorProfile/>}/>
            <Route path="clinic-profile" element={<ClinicProfile />} />
            <Route path="doctorProfile" element={<DoctorProfile />} />
            <Route
              path="all-clinic-doctors/:drId/availability"
              element={<TimeSlots />}
            />
            <Route path="add-doctor" element={<AddDoctor />} />
            <Route path="all-clinic-doctors" element={<ClinicDoctors />} />
            <Route path="all-clinic-patients" element={< AllClinicPatients/>} />
          </Route>
          
          <Route path="/doctordashboard/:drId" element={<DoctorDashboard />}>
            <Route
              index
              element={<p>Welcome Doctor, choose a menu from sidebar.</p>}
            />
            <Route path="doctorProfile" element={<DoctorProfile />} />
            <Route path="time-slots" element={<TimeSlots />} />
            <Route path="appointments" element={<p>Appointments Page</p>} />
            <Route path="patients" element={<AllPatient />} />
            <Route path="settings" element={<p>Settings Page</p>} />
              <Route path="editDoctorIdPassword" element={<EditDoctorProfile />} />
          </Route>
          <Route path="/adminDashboard" element={<AdminDashboard />}>
            <Route path="admin-lab" element={<AdminLab />} />
            <Route path="admin-doctor" element={<AdminDoctor />} />
            
            <Route path="admin-clinic" element={<AdminClinic />} />
          </Route>

          <Route path="/lab-dashboard" element={<LabDashboard />}>
            {" "}
            <Route
              index
              element={
                <h1 className="text-2xl font-bold">Welcome to Dashboard</h1>
              }
            />
            <Route path="patients" element={<Patients />} />
            <Route path="tests" element={<LabTests />} />
            <Route path="profile" element={<LabProfile />} />
          </Route>

          <Route path="/admin/login" element={<AdminLogin />}></Route>
        
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;