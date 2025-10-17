// import { useEffect, useState } from "react";
import {  Outlet } from "react-router-dom";
import ClinicSidebar from "../components/ClinicSidebar";
// import Cookies from "js-cookie";
// import * as jwt_decode from "jwt-decode"; // ✅ import as namespace
import { useParams } from "react-router-dom";
// interface JwtPayload {
//   id: string;
//   iat: number;
//   exp: number;
// }

export const ClinicDashboard = () => {
  // const navigate = useNavigate();
  // const [clinicId, setClinicId] = useState<string | null>(null);



const { clinicId } = useParams<{ clinicId: string }>();
console.log("Clinic ID from URL:", clinicId);

  // useEffect(() => {
  //   const token = Cookies.get("authToken");
  //   if (!token) {
  //     navigate("/clinic-login");
  //     return;
  //   }

  //   try {
  //     const decoded = (jwt_decode as any)(token) as JwtPayload; // ✅ call as function
  //     setClinicId(decoded.id);
  //   } catch (err) {
  //     navigate("/clinicLogin");
  //   }
  // }, [navigate]);

  // if (!clinicId) return <div>Loading...</div>;

  return (
    <div className="flex">
      <ClinicSidebar />
      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        <Outlet context={{ clinicId }} />
      </div>
    </div>
  );
};
