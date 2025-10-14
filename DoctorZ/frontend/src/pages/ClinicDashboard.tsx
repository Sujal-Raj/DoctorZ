import { Outlet } from "react-router-dom";
import ClinicSidebar from "../components/ClinicSidebar";
// ✅ import as namespace
import { useParams } from "react-router-dom";

export const ClinicDashboard = () => {
  const { clinicId } = useParams<{ clinicId: string }>();
  console.log("Clinic ID from URL:", clinicId);

  return (
    <div className="flex">
      <ClinicSidebar />
      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        <Outlet context={{ clinicId }} />
      </div>
    </div>
  );
};
