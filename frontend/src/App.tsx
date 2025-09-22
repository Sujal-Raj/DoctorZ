import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

// Import your pages
import RegisterPatient from "./pages/RegisterPatient";
import RegisterDoctor from "./pages/RegisterDoctor";
import RegisterClinic from "./pages/RegisterClinic";
import AdminDashboard from "./pages/AdminDashboard";

import Login from "./pages/Login";
import Home from "./pages/Home";
import AllClinic from "./pages/AllClinic";
import AllDoctors from "./pages/AllDoctors";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <div className="pt-20"> {/* push content below navbar */}
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/patient-register" element={<RegisterPatient />} />
          <Route path="/doctor-register" element={<RegisterDoctor />} />
          <Route path="/clinic-register" element={<RegisterClinic />} />
          <Route path="/all-clinics" element={<AllClinic />} />
          <Route path="/all-doctors" element={<AllDoctors />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
