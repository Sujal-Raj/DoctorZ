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
           
            <Route path="add-doctor" element={<AddDoctor />} />
            <Route path="all-clinic-doctors" element={<ClinicDoctors />} />
          </Route>
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
