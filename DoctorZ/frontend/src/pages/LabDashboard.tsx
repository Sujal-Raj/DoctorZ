
import { Outlet, Link, useLocation } from "react-router-dom";
import { FlaskConical, Users, UserCircle } from "lucide-react";

const LabDashboard = () => {
  const location = useLocation();
  const labId = localStorage.getItem("labId");
  console.log(labId) // ✅ get from localStorage or context

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-4 fixed h-screen">
        <h2 className="text-xl font-bold mb-6">Lab Dashboard</h2>
        <ul className="space-y-3">
          <li>
            <Link
              to="/lab-dashboard/patients"
              className={`flex items-center p-2 rounded ${
                location.pathname.includes("patients")
                  ? "bg-gray-700"
                  : "hover:bg-gray-800"
              }`}
            >
              <Users className="mr-2" /> Patients
            </Link>
          </li>
          <li>
            <Link
              to="/lab-dashboard/tests"
              className={`flex items-center p-2 rounded ${
                location.pathname.includes("tests")
                  ? "bg-gray-700"
                  : "hover:bg-gray-800"
              }`}
            >
              <FlaskConical className="mr-2" /> Lab Tests
            </Link>
          </li>
          <li>
            <Link
              to="/lab-dashboard/profile"
              className={`flex items-center p-2 rounded ${
                location.pathname.includes("profile")
                  ? "bg-gray-700"
                  : "hover:bg-gray-800"
              }`}
            >
              <UserCircle className="mr-2" /> Profile
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1 overflow-y-auto p-6">
        {/* ✅ Pass labId via Outlet context */}
        <Outlet context={{ labId }} />
      </div>
    </div>
  );
};

export default LabDashboard;