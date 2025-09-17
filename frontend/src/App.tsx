import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

// Import your pages
import RegisterPatient from "./pages/RegisterPatient";
import RegisterDoctor from "./pages/RegisterDoctor";
import RegisterClinic from "./pages/RegisterClinic";

import Login from "./pages/Login";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <div className="pt-20"> {/* push content below navbar */}
        <Routes>
          <Route path="/" element={<h1 className="text-center text-3xl mt-10">Welcome to DoctorZ</h1>} />
          <Route path="/patient-register" element={<RegisterPatient />} />
          <Route path="/doctor-register" element={<RegisterDoctor />} />
          <Route path="/clinic-register" element={<RegisterClinic />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
