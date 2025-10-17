


import React, { useEffect, useState } from "react";
import {
  UserGroupIcon,
  CalendarDaysIcon,
  CurrencyRupeeIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import api from "../Services/mainApi";
import { useNavigate } from "react-router-dom";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

interface Clinic {
  _id: string;
  clinicId: string;
  clinicName: string;
  email: string;
}

interface ClinicStats {
  totalDoctors: number;
  totalDepartments: number;
}

interface ClinicResponse {
  clinic: Clinic;
  message: string;
}

// Type for stats response
interface StatsResponse {
  stats: ClinicStats;
  message: string;
}

const ClinicHomeDashboard: React.FC = () => {
  const [clinic, setClinic] = useState<Clinic | null>(null);
  const [clinicStats, setClinicStats] = useState<ClinicStats>({
    totalDoctors: 0,
    totalDepartments: 0,
  });
  const [dateTime, setDateTime] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("clinicToken");
  const clinicId = localStorage.getItem("clinicId");

  // Update date & time every minute
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleString("en-IN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
      setDateTime(formatted);
    };
    updateDateTime();
    const timer = setInterval(updateDateTime, 60000);
    return () => clearInterval(timer);
  }, []);

  // Fetch clinic info
  useEffect(() => {
    if (!token || !clinicId) {
      navigate(`/clinicDashboard/${clinicId}`);
      return;
    }

    const fetchClinic = async () => {
      try {
        const res = await api.get<ClinicResponse>(
          `/api/clinic/getClinicById/${clinicId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setClinic(res.data.clinic);
      } catch (err) {
        console.error("Error fetching clinic:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchClinic();
  }, [token, clinicId, navigate]);

  // Fetch clinic stats (doctors & departments)
  useEffect(() => {
    if (!token || !clinicId) return;
    

    const fetchClinicStats = async () => {
      try {
        const res = await api.get<StatsResponse>(`/api/clinic/getClinicStats/${clinicId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setClinicStats(res.data.stats);
      } catch (err) {
        console.error("Error fetching clinic stats:", err);
      }
    };

    fetchClinicStats();
  }, [token, clinicId]);

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading dashboard...</p>;
  }

  const weeklyData = [
    { day: "Mon", patients: 40, revenue: 15000 },
    { day: "Tue", patients: 60, revenue: 22000 },
    { day: "Wed", patients: 45, revenue: 18500 },
    { day: "Thu", patients: 70, revenue: 25000 },
    { day: "Fri", patients: 55, revenue: 21000 },
    { day: "Sat", patients: 90, revenue: 28000 },
    { day: "Sun", patients: 30, revenue: 10000 },
  ];

  return (
    <div className="p-8 bg-[#F9FAFB] min-h-screen space-y-8">
      {/* Header */}
      <div className="bg-[#0B1D3B] text-white p-6 rounded-2xl shadow-md flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Welcome, {clinic?.clinicName}</h1>
          <p className="text-sm opacity-80">{dateTime}</p>
        </div>
        <button className="bg-[#00D09C] hover:bg-[#00b58a] text-white px-4 py-2 rounded-lg transition">
          Edit Clinic Info
        </button>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Add Doctor", color: "bg-[#00D09C]", onclick: () => navigate("add-doctor") },
          { label: "View Patients", color: "bg-indigo-600", onclick: () => navigate("all-clinic-patients") },
          { label: "Manage Slots", color: "bg-amber-500" },
          { label: "Export Report", color: "bg-gray-700" },
        ].map((btn, i) => (
          <button
            key={i}
            onClick={btn.onclick}
            className={`${btn.color} hover:opacity-90 text-white py-2 rounded-lg font-semibold transition`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          {
            title: "Total Doctors",
            value: clinicStats.totalDoctors,
            icon: <UserGroupIcon className="w-7 h-7 text-[#00D09C] text-2xl" />,
          },
          {
            title: "Weekly Revenue",
            value: "₹1.3L",
            icon: <CurrencyRupeeIcon className="w-7 h-7 text-green-500" />,
          },
          {
            title: "Active Patients",
            value: 210,
            icon: <UserIcon className="w-7 h-7 text-rose-500" />,
          },
          {
            title: "Departments",
            value: clinicStats.totalDepartments,
            icon: <CalendarDaysIcon className="text-indigo-500 w-7 h-7" />,
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-white p-5 rounded-xl shadow hover:shadow-md transition"
          >
            <div className="flex justify-between items-center">
              <div className="text-gray-700 text-sm">{item.title}</div>
              {item.icon}
            </div>
            <div className="text-2xl font-bold mt-2 text-gray-900">{item.value}</div>
          </div>
        ))}
      </div>

      {/* Charts & Notices */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Chart */}
        <div className="bg-white rounded-xl p-6 shadow-lg lg:col-span-2">
          <h2 className="font-semibold text-gray-800 mb-4">
            📈 Weekly Patients & Revenue
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={weeklyData}>
              <defs>
                <linearGradient id="colorPatients" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00D09C" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#00D09C" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" stroke="#888" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="patients"
                stroke="#00D09C"
                fillOpacity={1}
                fill="url(#colorPatients)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Right Panel */}
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-semibold text-gray-800 mb-2">Top Active Doctors</h3>
            {[
              { name: "Dr. Meena Sharma", status: "Online" },
              { name: "Dr. Rajiv Singh", status: "Busy" },
              { name: "Dr. Asha Nair", status: "Offline" },
            ].map((doc, i) => (
              <div
                key={i}
                className="flex justify-between py-2 border-b last:border-none text-sm"
              >
                <span>{doc.name}</span>
                <span
                  className={`${
                    doc.status === "Online"
                      ? "text-green-600"
                      : doc.status === "Busy"
                      ? "text-yellow-600"
                      : "text-gray-500"
                  } font-medium`}
                >
                  {doc.status}
                </span>
              </div>
            ))}
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-xl shadow">
            <h4 className="font-semibold text-yellow-800">Clinic Notices</h4>
            <ul className="list-disc ml-6 text-yellow-700 text-sm mt-2 space-y-1">
              <li>🛠 Power backup maintenance on Friday</li>
              <li>💸 Lab pricing updates from next week</li>
              <li>📋 Staff review on Monday</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicHomeDashboard;

