// src/Layout.tsx
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../frontend/src/components/Navbar";

const Layout: React.FC = () => {
  const location = useLocation();

  const hideNavbarRoutes = [
    "/clinicDashboard",
    "/doctordashboard",
    "/admin",
    
    "/admin-lab"
  ];

  const showNavbar = !hideNavbarRoutes.some(path =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      {showNavbar && <Navbar />}
      <div className="pt-4">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
