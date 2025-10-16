

// // // import React, { useEffect, useState } from "react";
// // // import {
// // //   FaUserMd,
// // //   FaCalendarAlt,
// // //   FaHeartbeat,
// // //   FaRupeeSign,
// // // } from "react-icons/fa";
// // // import api from "../api/client";
// // // import { useNavigate } from "react-router-dom";

// // // // 🧩 Strong Type for Doctor
// // // interface Doctor {
// // //   _id: string;
// // //   doctorId: string;
// // //   fullName: string;
// // //   email: string;
// // // }

// // // interface DoctorResponse {
// // //   message: string;
// // //   doctor: Doctor;
// // // }

// // // const DoctorDashboardHome: React.FC = () => {
// // //   const [doctor, setDoctor] = useState<Doctor | null>(null);
// // //   const [dateTime, setDateTime] = useState<string>("");
// // //   const [loading, setLoading] = useState(true);
// // //   const navigate = useNavigate();

// // //   const token = localStorage.getItem("doctorToken");
// // //   const doctorId = localStorage.getItem("doctorId");

// // //   // 🕒 Update Live Date-Time
// // //   useEffect(() => {
// // //     const updateDateTime = () => {
// // //       const now = new Date();
// // //       const formatted = now.toLocaleString("en-IN", {
// // //         weekday: "long",
// // //         year: "numeric",
// // //         month: "long",
// // //         day: "numeric",
// // //         hour: "2-digit",
// // //         minute: "2-digit",
// // //       });
// // //       setDateTime(formatted);
// // //     };
// // //     updateDateTime();
// // //     const timer = setInterval(updateDateTime, 60000);
// // //     return () => clearInterval(timer);
// // //   }, []);

// // //   // 👨‍⚕️ Fetch Doctor Details
// // //   useEffect(() => {
// // //     if (!token || !doctorId) {
// // //       navigate("/doctor/login");
// // //       return;
// // //     }

// // //     const fetchDoctor = async () => {
// // //       try {
// // //         const res = await api.get<DoctorResponse>(`/api/doctor/${doctorId}`, {
// // //           headers: { Authorization: `Bearer ${token}` },
// // //         });
// // //         setDoctor(res.data.doctor);
// // //       } catch (err) {
// // //         console.error("Error fetching doctor:", err);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchDoctor();
// // //   }, [token, doctorId, navigate]);

// // //   if (loading) {
// // //     return <p className="text-center mt-10 text-gray-500">Loading dashboard...</p>;
// // //   }

// // //   return (
// // //     <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
// // //       {/* Header Section */}
// // //       <div className="bg-gradient-to-r from-cyan-700 to-teal-600 text-white p-6 rounded-2xl shadow-lg flex justify-between items-center">
// // //         <div>
// // //           <h1 className="text-2xl font-bold">
// // //             Welcome back, Dr. {doctor?.fullName || "Doctor"}
// // //           </h1>
// // //           <p className="text-sm text-teal-100">{dateTime}</p>
// // //         </div>
// // //         <div className="flex gap-3">
// // //           <button className="bg-white text-teal-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
// // //             Export Report
// // //           </button>
// // //           <button className="bg-emerald-500 px-4 py-2 rounded-lg font-semibold hover:bg-emerald-600 transition">
// // //             Quick Actions
// // //           </button>
// // //         </div>
// // //       </div>

// // //       {/* Stats Overview */}
// // //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
// // //         {[
// // //           {
// // //             title: "Total Patients",
// // //             value: "1,247",
// // //             icon: <FaUserMd className="text-teal-600 text-3xl" />,
// // //             change: "+10%",
// // //             note: "since last month",
// // //           },
// // //           {
// // //             title: "Today's Appointments",
// // //             value: "10",
// // //             icon: <FaCalendarAlt className="text-indigo-600 text-3xl" />,
// // //             change: "3 pending",
// // //             note: "scheduled today",
// // //           },
// // //           {
// // //             title: "Critical Patients",
// // //             value: "5",
// // //             icon: <FaHeartbeat className="text-red-500 text-3xl" />,
// // //             change: "Urgent",
// // //             note: "requires attention",
// // //           },
// // //           {
// // //             title: "Monthly Revenue",
// // //             value: "₹85,000",
// // //             icon: <FaRupeeSign className="text-emerald-600 text-3xl" />,
// // //             change: "+18%",
// // //             note: "growth this month",
// // //           },
// // //         ].map((item, i) => (
// // //           <div
// // //             key={i}
// // //             className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
// // //           >
// // //             <div className="flex justify-between items-center">
// // //               {item.icon}
// // //               <span
// // //                 className={`text-sm font-medium ${
// // //                   item.title === "Critical Patients"
// // //                     ? "text-red-600"
// // //                     : "text-green-600"
// // //                 }`}
// // //               >
// // //                 {item.change}
// // //               </span>
// // //             </div>
// // //             <h2 className="text-3xl font-bold mt-3">{item.value}</h2>
// // //             <p className="text-gray-500 text-sm">{item.title}</p>
// // //             <p className="text-gray-400 text-xs">{item.note}</p>
// // //           </div>
// // //         ))}
// // //       </div>

// // //       {/* System Overview */}
// // //       <div className="bg-white rounded-2xl shadow-md p-6">
// // //         <h2 className="text-xl font-semibold mb-6 text-gray-800">
// // //           Patient System Overview
// // //         </h2>

// // //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // //           {/* Visualization Placeholder */}
// // //           <div className="flex items-center justify-center bg-gray-50 rounded-xl h-64 text-gray-400 border border-dashed">
// // //             [ Health Mapping Visualization ]
// // //           </div>

// // //           {/* Data Overview */}
// // //           <div className="space-y-4">
// // //             <div className="grid grid-cols-2 gap-3">
// // //               {[
// // //                 { name: "Cardiovascular", count: 456 },
// // //                 { name: "Respiratory", count: 234 },
// // //                 { name: "Neurological", count: 189 },
// // //                 { name: "Gastrointestinal", count: 298 },
// // //               ].map((sys) => (
// // //                 <div key={sys.name} className="bg-teal-50 p-3 rounded-lg">
// // //                   <p className="font-semibold text-gray-700">{sys.name}</p>
// // //                   <p className="text-sm text-gray-500">{sys.count} patients</p>
// // //                 </div>
// // //               ))}
// // //             </div>

// // //             <div className="bg-red-50 border border-red-200 rounded-lg p-3">
// // //               <p className="font-semibold text-red-700">Active Alert:</p>
// // //               <p className="text-gray-700">
// // //                 Robert Wilson – Atrial Fibrillation
// // //               </p>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default DoctorDashboardHome;

// // import React, { useEffect, useState } from "react";
// // import {
// //   FaUserMd,
// //   FaCalendarAlt,
// //   FaHeartbeat,
// //   FaRupeeSign,
// // } from "react-icons/fa";
// // import api from "../api/client";
// // import { useNavigate } from "react-router-dom";
// // import {
// //   ResponsiveContainer,
// //   XAxis,
// //   YAxis,
// //   Tooltip,
// //   CartesianGrid,
// //   AreaChart,
// //   Area,
// // } from "recharts";

// // // 🧩 Strong Type for Doctor
// // interface Doctor {
// //   _id: string;
// //   doctorId: string;
// //   fullName: string;
// //   email: string;
// // }

// // interface DoctorResponse {
// //   message: string;
// //   doctor: Doctor;
// // }

// // const DoctorDashboardHome: React.FC = () => {
// //   const [doctor, setDoctor] = useState<Doctor | null>(null);
// //   const [dateTime, setDateTime] = useState<string>("");
// //   const [loading, setLoading] = useState(true);
// //   const navigate = useNavigate();

// //   const token = localStorage.getItem("doctorToken");
// //   const doctorId = localStorage.getItem("doctorId");

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

// //   // 👨‍⚕️ Fetch Doctor Details
// //   useEffect(() => {
// //     if (!token || !doctorId) {
// //       navigate("/doctor/login");
// //       return;
// //     }

// //     const fetchDoctor = async () => {
// //       try {
// //         const res = await api.get<DoctorResponse>(`/api/doctor/${doctorId}`, {
// //           headers: { Authorization: `Bearer ${token}` },
// //         });
// //         setDoctor(res.data.doctor);
// //       } catch (err) {
// //         console.error("Error fetching doctor:", err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchDoctor();
// //   }, [token, doctorId, navigate]);

// //   if (loading) {
// //     return <p className="text-center mt-10 text-gray-500">Loading dashboard...</p>;
// //   }

// //   // 📊 Example Health Trend Data
// //   const healthTrends = [
// //     { day: "Mon", heartRate: 80, bp: 120 },
// //     { day: "Tue", heartRate: 76, bp: 118 },
// //     { day: "Wed", heartRate: 85, bp: 122 },
// //     { day: "Thu", heartRate: 90, bp: 130 },
// //     { day: "Fri", heartRate: 88, bp: 125 },
// //     { day: "Sat", heartRate: 78, bp: 119 },
// //     { day: "Sun", heartRate: 82, bp: 121 },
// //   ];

// //   return (
// //     <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
// //       {/* Header Section */}
// //       <div className="bg-gradient-to-r from-cyan-700 to-teal-600 text-white p-6 rounded-2xl shadow-lg flex justify-between items-center">
// //         <div>
// //           <h1 className="text-2xl font-bold">
// //             Welcome back, Dr. {doctor?.fullName || "Doctor"}
// //           </h1>
// //           <p className="text-sm text-teal-100">{dateTime}</p>
// //         </div>
// //         <div className="flex gap-3">
// //           <button className="bg-white text-teal-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
// //             Export Report
// //           </button>
// //           <button className="bg-emerald-500 px-4 py-2 rounded-lg font-semibold hover:bg-emerald-600 transition">
// //             Quick Actions
// //           </button>
// //         </div>
// //       </div>

// //       {/* Stats Overview */}
// //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
// //         {[
// //           {
// //             title: "Total Patients",
// //             value: "1,247",
// //             icon: <FaUserMd className="text-teal-600 text-3xl" />,
// //             change: "+10%",
// //             note: "since last month",
// //           },
// //           {
// //             title: "Today's Appointments",
// //             value: "10",
// //             icon: <FaCalendarAlt className="text-indigo-600 text-3xl" />,
// //             change: "3 pending",
// //             note: "scheduled today",
// //           },
// //           {
// //             title: "Critical Patients",
// //             value: "5",
// //             icon: <FaHeartbeat className="text-red-500 text-3xl" />,
// //             change: "Urgent",
// //             note: "requires attention",
// //           },
// //           {
// //             title: "Monthly Revenue",
// //             value: "₹85,000",
// //             icon: <FaRupeeSign className="text-emerald-600 text-3xl" />,
// //             change: "+18%",
// //             note: "growth this month",
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
// //                   item.title === "Critical Patients"
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

// //       {/* System Overview */}
// //       <div className="bg-white rounded-2xl shadow-md p-6">
// //         <h2 className="text-xl font-semibold mb-6 text-gray-800">
// //           Patient System Overview
// //         </h2>

// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //           {/* Visualization Chart */}
// //           <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
// //             <h3 className="text-gray-700 mb-2 font-semibold">
// //               Health Mapping Visualization
// //             </h3>
// //             <ResponsiveContainer width="100%" height={260}>
// //               <AreaChart data={healthTrends}>
// //                 <defs>
// //                   <linearGradient id="colorHeart" x1="0" y1="0" x2="0" y2="1">
// //                     <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
// //                     <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
// //                   </linearGradient>
// //                   <linearGradient id="colorBP" x1="0" y1="0" x2="0" y2="1">
// //                     <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
// //                     <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
// //                   </linearGradient>
// //                 </defs>
// //                 <XAxis dataKey="day" stroke="#888" />
// //                 <YAxis />
// //                 <CartesianGrid strokeDasharray="3 3" />
// //                 <Tooltip />
// //                 <Area
// //                   type="monotone"
// //                   dataKey="heartRate"
// //                   stroke="#10B981"
// //                   fillOpacity={1}
// //                   fill="url(#colorHeart)"
// //                 />
// //                 <Area
// //                   type="monotone"
// //                   dataKey="bp"
// //                   stroke="#3B82F6"
// //                   fillOpacity={1}
// //                   fill="url(#colorBP)"
// //                 />
// //               </AreaChart>
// //             </ResponsiveContainer>
// //           </div>

// //           {/* Data Overview */}
// //           <div className="space-y-4">
// //             <div className="grid grid-cols-2 gap-3">
// //               {[
// //                 { name: "Cardiovascular", count: 456 },
// //                 { name: "Respiratory", count: 234 },
// //                 { name: "Neurological", count: 189 },
// //                 { name: "Gastrointestinal", count: 298 },
// //               ].map((sys) => (
// //                 <div key={sys.name} className="bg-teal-50 p-3 rounded-lg">
// //                   <p className="font-semibold text-gray-700">{sys.name}</p>
// //                   <p className="text-sm text-gray-500">{sys.count} patients</p>
// //                 </div>
// //               ))}
// //             </div>

// //             <div className="bg-red-50 border border-red-200 rounded-lg p-3">
// //               <p className="font-semibold text-red-700">Active Alert:</p>
// //               <p className="text-gray-700">
// //                 Robert Wilson – Atrial Fibrillation
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default DoctorDashboardHome;


// import React, { useEffect, useState } from "react";
// import {
//   FaUserMd,
//   FaCalendarAlt,
//   FaHeartbeat,
//   FaRupeeSign,
// } from "react-icons/fa";
// import api from "../api/client";
// import { useNavigate } from "react-router-dom";
// import {
//   ResponsiveContainer,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   AreaChart,
//   Area,
// } from "recharts";

// // Doctor Type
// interface Doctor {
//   _id: string;
//   doctorId: string;
//   fullName: string;
//   email: string;
// }

// interface DoctorResponse {
//   message: string;
//   doctor: Doctor;
// }

// const DoctorDashboardHome: React.FC = () => {
//   const [doctor, setDoctor] = useState<Doctor | null>(null);
//   const [dateTime, setDateTime] = useState<string>("");
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   const token = localStorage.getItem("doctorToken");
//   const doctorId = localStorage.getItem("doctorId");

//   // Time Updater
//   useEffect(() => {
//     const updateDateTime = () => {
//       const now = new Date();
//       const formatted = now.toLocaleString("en-IN", {
//         weekday: "long",
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//         hour: "2-digit",
//         minute: "2-digit",
//       });
//       setDateTime(formatted);
//     };
//     updateDateTime();
//     const timer = setInterval(updateDateTime, 60000);
//     return () => clearInterval(timer);
//   }, []);

//   // Fetch doctor
//   useEffect(() => {
//     if (!token || !doctorId) {
//       navigate("/doctor/login");
//       return;
//     }

//     const fetchDoctor = async () => {
//       try {
//         const res = await api.get<DoctorResponse>(`/api/doctor/${doctorId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setDoctor(res.data.doctor);
//       } catch (err) {
//         console.error("Error fetching doctor:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDoctor();
//   }, [token, doctorId, navigate]);

//   if (loading) {
//     return <p className="text-center mt-10 text-gray-400">Loading dashboard...</p>;
//   }

//   const healthTrends = [
//     { day: "Mon", heartRate: 80, bp: 120 },
//     { day: "Tue", heartRate: 76, bp: 118 },
//     { day: "Wed", heartRate: 85, bp: 122 },
//     { day: "Thu", heartRate: 90, bp: 130 },
//     { day: "Fri", heartRate: 88, bp: 125 },
//     { day: "Sat", heartRate: 78, bp: 119 },
//     { day: "Sun", heartRate: 82, bp: 121 },
//   ];

//   return (
//     <div className="bg-gray-50 min-h-screen p-6 text-gray-800">
//   {/* Header */}
//   <div className="bg-white shadow-sm rounded-xl p-6 flex justify-between items-center mb-6">
//     <div>
//       <h1 className="text-2xl font-bold text-gray-900">
//         Welcome back, Dr. {doctor?.fullName}
//       </h1>
//       <p className="text-sm text-gray-500">{dateTime}</p>
//     </div>
//     <div className="space-x-3">
//       <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition text-sm font-medium">
//         Export Report
//       </button>
//       <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-medium shadow">
//         Quick Actions
//       </button>
//     </div>
//   </div>

//   {/* Stats Overview */}
//   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
//     {[
//       {
//         title: "Total Patients",
//         value: "1,247",
//         icon: <FaUserMd size={26} className="text-cyan-600" />,
//         change: "+10%",
//         note: "since last month",
//       },
//       {
//         title: "Today's Appointments",
//         value: "10",
//         icon: <FaCalendarAlt size={26} className="text-indigo-600" />,
//         change: "3 pending",
//         note: "scheduled today",
//       },
//       {
//         title: "Critical Patients",
//         value: "5",
//         icon: <FaHeartbeat size={26} className="text-red-500" />,
//         change: "Urgent",
//         note: "requires attention",
//       },
//       {
//         title: "Monthly Revenue",
//         value: "₹85,000",
//         icon: <FaRupeeSign size={26} className="text-green-600" />,
//         change: "+18%",
//         note: "growth this month",
//       },
//     ].map((card, index) => (
//       <div
//         key={index}
//         className="bg-white p-5 rounded-xl shadow hover:shadow-md transition"
//       >
//         <div className="flex justify-between items-center">
//           {card.icon}
//           <span
//             className={`text-sm font-medium ${
//               card.change.includes("+") ? "text-green-600" : "text-red-600"
//             }`}
//           >
//             {card.change}
//           </span>
//         </div>
//         <h2 className="text-2xl font-bold mt-3">{card.value}</h2>
//         <p className="text-gray-600 text-sm">{card.title}</p>
//         <p className="text-gray-400 text-xs">{card.note}</p>
//       </div>
//     ))}
//   </div>

//   {/* Patient System Overview */}
//   <div className="bg-white p-6 rounded-xl shadow">
//     <h2 className="text-xl font-semibold mb-6 text-gray-800">
//       Patient System Overview
//     </h2>

//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//       {/* Chart */}
//       <div className="bg-gray-50 p-4 rounded-lg border">
//         <h3 className="text-gray-700 mb-2 font-semibold">
//           Health Mapping Visualization
//         </h3>
//         <ResponsiveContainer width="100%" height={260}>
//           <AreaChart data={healthTrends}>
//             <defs>
//               <linearGradient id="colorHeart" x1="0" y1="0" x2="0" y2="1">
//                 <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
//                 <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
//               </linearGradient>
//               <linearGradient id="colorBP" x1="0" y1="0" x2="0" y2="1">
//                 <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
//                 <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
//               </linearGradient>
//             </defs>
//             <XAxis dataKey="day" stroke="#888" />
//             <YAxis />
//             <CartesianGrid strokeDasharray="3 3" />
//             <Tooltip />
//             <Area
//               type="monotone"
//               dataKey="heartRate"
//               stroke="#10B981"
//               fillOpacity={1}
//               fill="url(#colorHeart)"
//             />
//             <Area
//               type="monotone"
//               dataKey="bp"
//               stroke="#3B82F6"
//               fillOpacity={1}
//               fill="url(#colorBP)"
//             />
//           </AreaChart>
//         </ResponsiveContainer>
//       </div>

//       {/* System Conditions */}
//       <div className="space-y-4">
//         <div className="grid grid-cols-2 gap-3">
//           {[
//             { name: "Cardiovascular", count: 456 },
//             { name: "Respiratory", count: 234 },
//             { name: "Neurological", count: 189 },
//             { name: "Gastrointestinal", count: 298 },
//           ].map((sys) => (
//             <div
//               key={sys.name}
//               className="bg-gray-100 p-3 rounded-md hover:bg-gray-200 transition"
//             >
//               <p className="font-semibold text-gray-700">{sys.name}</p>
//               <p className="text-sm text-gray-500">{sys.count} patients</p>
//             </div>
//           ))}
//         </div>

//         <div className="bg-red-100 border border-red-300 rounded-md p-4">
//           <p className="font-semibold text-red-600">Active Alert:</p>
//           <p className="text-gray-700">Robert Wilson – Atrial Fibrillation</p>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>

//   );
// };

// export default DoctorDashboardHome;


import React, { useEffect, useState } from "react";
import {
  FaUserMd,
  FaCalendarAlt,
  FaHeartbeat,
  FaRupeeSign,
} from "react-icons/fa";
import api from "../api/client";
import { useNavigate } from "react-router-dom";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";

interface Doctor {
  _id: string;
  doctorId: string;
  fullName: string;
  email: string;
}

interface DoctorResponse {
  message: string;
  doctor: Doctor;
}

const DoctorDashboardHome: React.FC = () => {
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [dateTime, setDateTime] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("doctorToken");
  const doctorId = localStorage.getItem("doctorId");

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
    if (!token || !doctorId) {
      navigate("/doctor/login");
      return;
    }

    const fetchDoctor = async () => {
      try {
        const res = await api.get<DoctorResponse>(`/api/doctor/${doctorId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDoctor(res.data.doctor);
      } catch (err) {
        console.error("Error fetching doctor:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [token, doctorId, navigate]);

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading dashboard...</p>;
  }

  const healthTrends = [
    { day: "Mon", heartRate: 80, bp: 120 },
    { day: "Tue", heartRate: 76, bp: 118 },
    { day: "Wed", heartRate: 85, bp: 122 },
    { day: "Thu", heartRate: 90, bp: 130 },
    { day: "Fri", heartRate: 88, bp: 125 },
    { day: "Sat", heartRate: 78, bp: 119 },
    { day: "Sun", heartRate: 82, bp: 121 },
  ];

  return (
    <div className="bg-white min-h-screen p-6 text-gray-800">
      {/* Header */}
      <div className="bg-[#0F172A] shadow rounded-xl p-6 flex justify-between items-center mb-6 text-white">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, Dr. {doctor?.fullName}</h1>
          <p className="text-sm text-gray-500">{dateTime}</p>
        </div>
        <div className="space-x-3">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition text-sm font-medium">
            Export Report
          </button>
          <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-medium shadow">
            Quick Actions
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {[
          {
            title: "Total Patients",
            value: "1,247",
            icon: <FaUserMd className="text-cyan-600 text-2xl" />,
            change: "+10%",
            note: "since last month",
          },
          {
            title: "Today's Appointments",
            value: "10",
            icon: <FaCalendarAlt className="text-indigo-600 text-2xl" />,
            change: "3 pending",
            note: "scheduled today",
          },
          {
            title: "Critical Patients",
            value: "5",
            icon: <FaHeartbeat className="text-red-500 text-2xl" />,
            change: "Urgent",
            note: "requires attention",
          },
          {
            title: "Monthly Revenue",
            value: "₹85,000",
            icon: <FaRupeeSign className="text-green-600 text-2xl" />,
            change: "+18%",
            note: "growth this month",
          },
        ].map((item, i) => (
          <div key={i} className="bg-gray-50 p-5 rounded-xl shadow hover:shadow-md transition">
            <div className="flex justify-between items-center">
              {item.icon}
              <span className={`text-sm font-medium ${item.title === "Critical Patients" ? "text-red-600" : "text-green-600"}`}>
                {item.change}
              </span>
            </div>
            <h2 className="text-2xl font-bold mt-3">{item.value}</h2>
            <p className="text-gray-600 text-sm">{item.title}</p>
            <p className="text-gray-400 text-xs">{item.note}</p>
          </div>
        ))}
      </div>

      {/* Overview */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">Patient System Overview</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Chart */}
          <div className="bg-gray-50 p-4 rounded-lg border">
            <h3 className="text-gray-700 mb-2 font-semibold">Health Mapping Visualization</h3>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={healthTrends}>
                <defs>
                  <linearGradient id="colorHeart" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorBP" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#888" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="heartRate"
                  stroke="#10B981"
                  fillOpacity={1}
                  fill="url(#colorHeart)"
                />
                <Area
                  type="monotone"
                  dataKey="bp"
                  stroke="#3B82F6"
                  fillOpacity={1}
                  fill="url(#colorBP)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* System Summary */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: "Cardiovascular", count: 456 },
                { name: "Respiratory", count: 234 },
                { name: "Neurological", count: 189 },
                { name: "Gastrointestinal", count: 298 },
              ].map((sys) => (
                <div key={sys.name} className="bg-gray-100 p-3 rounded-md hover:bg-gray-200 transition">
                  <p className="font-semibold text-gray-700">{sys.name}</p>
                  <p className="text-sm text-gray-500">{sys.count} patients</p>
                </div>
              ))}
            </div>
            <div className="bg-red-100 border border-red-300 rounded-md p-4">
              <p className="font-semibold text-red-600">Active Alert:</p>
              <p className="text-gray-700">Robert Wilson – Atrial Fibrillation</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboardHome;
