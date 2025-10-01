import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";

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

// Wrapper component to conditionally render Navbar
const AppWrapper: React.FC = () => {
  const location = useLocation();

  const showNavbar = !location.pathname.startsWith("/clinicDashboard");


  return (
    <>
      {showNavbar && <Navbar />}
      <div className="">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/patient-register" element={<RegisterPatient />} />
          <Route path="/doctor-register" element={<RegisterDoctor />} />
          <Route path="/clinic-register" element={<RegisterClinic />} />
          <Route path="/all-clinics" element={<AllClinic />} />
          <Route path="/all-doctors" element={<AllDoctors />} />
          <Route path="/clinic-login" element={<LoginClinic />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/clinicDashboard/:clinicId" element={<ClinicDashboard />}>
           <Route path="clinic-profile" element={<ClinicProfile />} />
          <Route path="doctorProfile" element={ <DoctorProfile />} />
          <Route path="all-clinic-doctors/:drId/availability" element={ <TimeSlots/>} />
            <Route path="add-doctor" element={<AddDoctor />} />
            <Route path="all-clinic-doctors" element={<ClinicDoctors />} />
          </Route>
         
            <Route path="/doctor/login" element={<DoctorLogin />} />


               <Route path="/doctordashboard/:drId" element={<DoctorDashboard />}>
            <Route index element={<p>Welcome Doctor, choose a menu from sidebar.</p>} />
            <Route path="doctorProfile" element={ <DoctorProfile />} />
             <Route path="time-slots" element={<TimeSlots />} />
            <Route path="appointments" element={<p>Appointments Page</p>} />
            <Route path="patients" element={<AllPatient/>} />
            <Route path="settings" element={<p>Settings Page</p>} />
          </Route>
          <Route path="/patient-login" element={<LoginPatient />} />
        </Routes>
      </div>
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
};

export default App;
