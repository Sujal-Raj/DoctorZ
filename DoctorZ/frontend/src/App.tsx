
import React from "react";
import { AuthProvider } from "../src/Context/AuthContext";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Layout from "../Layout";

// Pages
import RegisterPatient from "./pages/RegisterPatient";
import RegisterDoctor from "./pages/RegisterDoctor";
import RegisterClinic from "./pages/RegisterClinic";
import AdminDashboard from "./pages/AdminDashboard";
import LoginClinic from "./pages/LoginClinic";
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
// import ProtectedRoute from "../middleware/ProtectedRoute";

const App: React.FC = () => {
  return (
  <AuthProvider>  {/* <-- Wrap the app here */}
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
            <Route path="/view-doctor-profile/:drId" element={<ViewDoctorProfile />} />
            <Route path="/lab-register" element={<RegisterLab />} />
            <Route path="/lab-login" element={<LoginLab />} />
            <Route path="/admin-lab" element={<AdminLab />} />
            <Route path="/all-lab-test" element={<AllLabTest />} />
          </Route>

          {/* Routes without navbar */}
          <Route path="/admin" element={<AdminDashboard />} />

          <Route path="/clinicDashboard/:clinicId" element={<ClinicDashboard />}>
            <Route path="clinic-profile" element={<ClinicProfile />} />
            <Route path="doctorProfile" element={<DoctorProfile />} />
            <Route path="all-clinic-doctors/:drId/availability" element={<TimeSlots />} />
            <Route path="add-doctor" element={<AddDoctor />} />
            <Route path="all-clinic-doctors" element={<ClinicDoctors />} />
          </Route>

          <Route path="/doctordashboard/:drId" element={ 
  <DoctorDashboard />
}>
            <Route index element={<p>Welcome Doctor, choose a menu from sidebar.</p>} />
            <Route path="doctorProfile" element={<DoctorProfile />} />
            <Route path="time-slots" element={<TimeSlots />} />
            <Route path="appointments" element={<p>Appointments Page</p>} />
            <Route path="patients" element={<AllPatient />} />
            <Route path="settings" element={<p>Settings Page</p>} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
