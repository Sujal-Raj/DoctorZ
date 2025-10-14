


import { Link, useNavigate } from "react-router-dom";
import { Home, User, UserPlus, LogOut } from "lucide-react";

const AdminSidebar = () => {
  const navigate = useNavigate();

 
  return (
    <div className="w-64 min-h-screen bg-gray-900 text-gray-200 flex flex-col justify-between shadow-lg">
      {/* Top section */}
      <div className="px-6 py-8">
        <h2 className="text-xl font-bold mb-8 text-white">Admin Dashboard</h2>
        <nav className="flex flex-col space-y-4">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            <Home size={18} /> Home
          </Link>
          <Link
            to="admin-lab"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            <User size={18} />Lab
          </Link>
          <Link
            to="admin-doctor"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            <UserPlus size={18} />  Doctor
          </Link>
           <Link
            to="admin-clinic"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            <UserPlus size={18} />  Clinic
          </Link>
        </nav>
      </div>

      {/* Bottom section */}
      
    </div>
  );
};

export default AdminSidebar;
