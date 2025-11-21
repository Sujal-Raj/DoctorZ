import { Outlet } from "react-router-dom";
import ClinicSidebar from "../../components/ClinicSidebar";
import { useParams } from "react-router-dom";

export const ClinicDashboard = () => {
  const { clinicId } = useParams<{ clinicId: string }>();
  console.log("Clinic ID from URL:", clinicId);

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <ClinicSidebar />

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto pt-20 md:pt-8">
        <Outlet context={{ clinicId }} />
      </main>

    </div>
  );
};
