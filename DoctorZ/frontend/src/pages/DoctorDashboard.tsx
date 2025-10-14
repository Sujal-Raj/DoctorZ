import { Link, Outlet, useNavigate, useParams } from "react-router-dom";

function DoctorDashboard() {
  const { drId } = useParams();
  const navigate = useNavigate();

  console.log("Doctor ID from params:", drId);

 const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("doctorId");
  navigate("/doctor/login");
};
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col justify-between p-6">
        <div>
          <h2 className="text-2xl font-bold mb-8">👨‍⚕️ Doctor Dashboard</h2>
          <nav className="space-y-4">
            <Link
              to="doctorProfile"
              className="block py-2 px-3 rounded hover:bg-gray-800 transition"
            >
              Profile
            </Link>
            <Link
              to="time-slots"
              className="block py-2 px-3 rounded hover:bg-gray-800 transition"
            >
              Add Availability
            </Link>
            <Link
              to="appointments"
              className="block py-2 px-3 rounded hover:bg-gray-800 transition"
            >
              Appointments
            </Link>
            <Link
              to="patients"
              className="block py-2 px-3 rounded hover:bg-gray-800 transition"
            >
              My Patients
            </Link>
          </nav>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-6 w-full py-2 bg-red-600 hover:bg-red-700 rounded text-white font-semibold transition-all"
        >
          🔒 Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-10 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default DoctorDashboard;
