// // import React, { useEffect, useState } from "react";
// // import {
// //   FaHospitalUser,
// //   FaCalendarCheck,
// //   FaRupeeSign,
// //   FaUserInjured,
// // } from "react-icons/fa";
// // import api from "../api/client";
// // import { useNavigate } from "react-router-dom";
// // import {
// //   ResponsiveContainer,
// //   AreaChart,
// //   Area,
// //   XAxis,
// //   YAxis,
// //   CartesianGrid,
// //   Tooltip,
// // } from "recharts";

// // // 🧩 Types
// // interface Clinic {
// //   _id: string;
// //   clinicId: string;
// //   name: string;
// //   email: string;
// // }

// // interface ClinicResponse {
// //   message: string;
// //   clinic: Clinic;
// // }

// // const ClinicDashboardHome: React.FC = () => {
// //   const [clinic, setClinic] = useState<Clinic | null>(null);
// //   const [dateTime, setDateTime] = useState<string>("");
// //   const [loading, setLoading] = useState(true);
// //   const navigate = useNavigate();

// //   const token = localStorage.getItem("clinicToken");
// //   const clinicId = localStorage.getItem("clinicId");

// //   console.log("clinicId:", clinicId);
// // console.log("token:", token);

// //   // 🕒 Update Live Date-Time
// //   useEffect(() => {
// //     const updateDateTime = () => {
// //       const now = new Date();
// //       const formatted = now.toLocaleString("en-IN", {
// //         weekday: "long",
// //         year: "numeric",
// //         month: "long",
// //         day: "numeric",
// //         hour: "2-digit",
// //         minute: "2-digit",
// //       });
// //       setDateTime(formatted);
// //     };
// //     updateDateTime();
// //     const timer = setInterval(updateDateTime, 60000);
// //     return () => clearInterval(timer);
// //   }, []);

// //   // 🏥 Fetch Clinic Details
// //   useEffect(() => {
// //     if (!token || !clinicId) {
// //       navigate(`/clinic-login`);
// //       return;
// //     }

// //     const fetchClinic = async () => {
// //       try {
// //         const res = await api.get<ClinicResponse>(`/api/clinic/getClinicById/${clinicId}`, {
// //           headers: { Authorization: `Bearer ${token}` },
// //         });
// //         setClinic(res.data.clinic);
// //       } catch (err) {
// //         console.error("Error fetching clinic:", err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchClinic();
// //   }, [token, clinicId, navigate]);

// //   if (loading) {
// //     return <p className="text-center mt-10 text-gray-500">Loading dashboard...</p>;
// //   }

// //   // 📊 Sample Weekly Data for Patients & Revenue
// //   const weeklyData = [
// //     { day: "Mon", patients: 40, revenue: 15000 },
// //     { day: "Tue", patients: 60, revenue: 22000 },
// //     { day: "Wed", patients: 45, revenue: 18500 },
// //     { day: "Thu", patients: 70, revenue: 25000 },
// //     { day: "Fri", patients: 55, revenue: 21000 },
// //     { day: "Sat", patients: 90, revenue: 32000 },
// //     { day: "Sun", patients: 30, revenue: 10000 },
// //   ];

// //   return (
// //     <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
// //       {/* Header Section */}
// //       <div className="bg-gradient-to-r from-purple-700 to-indigo-600 text-white p-6 rounded-2xl shadow-lg flex justify-between items-center">
// //         <div>
// //           <h1 className="text-2xl font-bold">
// //             Welcome, {clinic?.name || "Clinic Admin"}
// //           </h1>
// //           <p className="text-sm text-indigo-100">{dateTime}</p>
// //         </div>
// //         <div className="flex gap-3">
// //           <button className="bg-white text-indigo-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
// //             Export Report
// //           </button>
// //           <button className="bg-amber-500 px-4 py-2 rounded-lg font-semibold hover:bg-amber-600 transition">
// //             Add Doctor
// //           </button>
// //         </div>
// //       </div>

// //       {/* Stats Overview */}
// //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
// //         {[
// //           {
// //             title: "Total Doctors",
// //             value: "18",
// //             icon: <FaHospitalUser className="text-purple-600 text-3xl" />,
// //             change: "+2 new",
// //             note: "this week",
// //           },
// //           {
// //             title: "Today's Appointments",
// //             value: "42",
// //             icon: <FaCalendarCheck className="text-indigo-600 text-3xl" />,
// //             change: "5 pending",
// //             note: "today’s schedule",
// //           },
// //           {
// //             title: "Active Patients",
// //             value: "236",
// //             icon: <FaUserInjured className="text-rose-500 text-3xl" />,
// //             change: "12 critical",
// //             note: "under observation",
// //           },
// //           {
// //             title: "Weekly Revenue",
// //             value: "₹1.25L",
// //             icon: <FaRupeeSign className="text-emerald-600 text-3xl" />,
// //             change: "+14%",
// //             note: "growth this week",
// //           },
// //         ].map((item, i) => (
// //           <div
// //             key={i}
// //             className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
// //           >
// //             <div className="flex justify-between items-center">
// //               {item.icon}
// //               <span
// //                 className={`text-sm font-medium ${
// //                   item.title === "Active Patients"
// //                     ? "text-red-600"
// //                     : "text-green-600"
// //                 }`}
// //               >
// //                 {item.change}
// //               </span>
// //             </div>
// //             <h2 className="text-3xl font-bold mt-3">{item.value}</h2>
// //             <p className="text-gray-500 text-sm">{item.title}</p>
// //             <p className="text-gray-400 text-xs">{item.note}</p>
// //           </div>
// //         ))}
// //       </div>

// //       {/* Clinic Performance Overview */}
// //       <div className="bg-white rounded-2xl shadow-md p-6">
// //         <h2 className="text-xl font-semibold mb-6 text-gray-800">
// //           Clinic Performance Overview
// //         </h2>

// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //           {/* Chart Section */}
// //           <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
// //             <h3 className="text-gray-700 mb-2 font-semibold">
// //               Weekly Patients & Revenue
// //             </h3>
// //             <ResponsiveContainer width="100%" height={260}>
// //               <AreaChart data={weeklyData}>
// //                 <defs>
// //                   <linearGradient id="colorPatients" x1="0" y1="0" x2="0" y2="1">
// //                     <stop offset="5%" stopColor="#6366F1" stopOpacity={0.8} />
// //                     <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
// //                   </linearGradient>
// //                   <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
// //                     <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
// //                     <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
// //                   </linearGradient>
// //                 </defs>
// //                 <XAxis dataKey="day" stroke="#888" />
// //                 <YAxis />
// //                 <CartesianGrid strokeDasharray="3 3" />
// //                 <Tooltip />
// //                 <Area
// //                   type="monotone"
// //                   dataKey="patients"
// //                   stroke="#6366F1"
// //                   fillOpacity={1}
// //                   fill="url(#colorPatients)"
// //                 />
// //                 <Area
// //                   type="monotone"
// //                   dataKey="revenue"
// //                   stroke="#10B981"
// //                   fillOpacity={1}
// //                   fill="url(#colorRevenue)"
// //                 />
// //               </AreaChart>
// //             </ResponsiveContainer>
// //           </div>

// //           {/* Summary & Alerts */}
// //           <div className="space-y-4">
// //             <div className="grid grid-cols-2 gap-3">
// //               {[
// //                 { name: "Cardiology", count: 120 },
// //                 { name: "Orthopedics", count: 75 },
// //                 { name: "Dermatology", count: 45 },
// //                 { name: "General OPD", count: 160 },
// //               ].map((dept) => (
// //                 <div key={dept.name} className="bg-indigo-50 p-3 rounded-lg">
// //                   <p className="font-semibold text-gray-700">{dept.name}</p>
// //                   <p className="text-sm text-gray-500">{dept.count} patients</p>
// //                 </div>
// //               ))}
// //             </div>

// //             <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
// //               <p className="font-semibold text-yellow-700">Notice:</p>
// //               <p className="text-gray-700">
// //                 MRI machine maintenance scheduled on Friday.
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ClinicDashboardHome;

import React, { useEffect, useState } from "react";
import {
  FaHospitalUser,
  FaCalendarCheck,
  FaRupeeSign,
  FaUserInjured,
} from "react-icons/fa";
import api from "../api/client";
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

interface ClinicResponse {
  message: string;
  clinic: Clinic;
}

const ClinicHomeDashboard: React.FC = () => {
  const [clinic, setClinic] = useState<Clinic | null>(null);
  const [dateTime, setDateTime] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("clinicToken");
  const clinicId = localStorage.getItem("clinicId");

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

  useEffect(() => {
    if (!token || !clinicId) {
      navigate(`/clinicDashboard/${clinicId}`);
      return;
    }

    const fetchClinic = async () => {
      try {
        const res = await api.get<ClinicResponse>(`/api/clinic/getClinicById/${clinicId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setClinic(res.data.clinic);
      } catch (err) {
        console.error("Error fetching clinic:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchClinic();
  }, [token, clinicId, navigate]);

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
          <h1 className="text-2xl font-semibold">Welcome, {clinic?. clinicName}</h1>
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
          { label: "View Patients", color: "bg-indigo-600" ,onclick: () => navigate("all-clinic-patients") },
          { label: "Manage Slots", color: "bg-amber-500" },
          { label: "Export Report", color: "bg-gray-700" },
        ].map((btn, i) => (
          <button  onClick={btn.onclick}
            key={i}
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
            value: 18,
            icon: <FaHospitalUser className="text-[#00D09C] text-2xl" />,
          },
          {
            title: "Weekly Revenue",
            value: "₹1.3L",
            icon: <FaRupeeSign className="text-green-500 text-2xl" />,
          },
          {
            title: "Active Patients",
            value: 210,
            icon: <FaUserInjured className="text-rose-500 text-2xl" />,
          },
          {
            title: "Departments",
            value: 6,
            icon: <FaCalendarCheck className="text-indigo-500 text-2xl" />,
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
          <h2 className="font-semibold text-gray-800 mb-4">📈 Weekly Patients & Revenue</h2>
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
