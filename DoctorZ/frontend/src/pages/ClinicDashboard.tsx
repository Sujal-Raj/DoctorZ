
import { Outlet } from "react-router-dom";
import ClinicSidebar from "../components/ClinicSidebar";
import { useParams } from "react-router-dom";

export const ClinicDashboard = () => {
  const { clinicId } = useParams<{ clinicId: string }>();
  console.log("Clinic ID from URL:", clinicId);

  return (
    <div className="flex justify-center min-h-screen bg-gray-100 gap-10">
      {/* Sidebar */}
       
        <ClinicSidebar />
    

      {/* Main Content */}
   <main className="flex-1 md:ml-64 p-4 sm:p-6 md:p-8 transition-all duration-300 overflow-x-hidden">

        <Outlet context={{ clinicId }} />
      </main>
    </div>
  );
};
