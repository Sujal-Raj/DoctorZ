// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api/client";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// // ✅ Import category images
// import diabetes from "../assets/diabetes.png";
// import fever from "../assets/Fever and infections.png";
// import Pregnancy from "../assets/Pregnancy.png";
// import vitamin from "../assets/vitamin.png";
// import Liver from "../assets/Liver.png";
// import kidney from "../assets/kidney.png";
// import Heart from "../assets/Heart.png";
// import Imaging from "../assets/Imaging.png";

// interface Test {
//   _id: string;
//   testName?: string;
//   price?: number;
//   labName?: string;
//   labId?: string;
//   category?: string;
// }

// export default function AllLabTest() {
//   const [tests, setTests] = useState<Test[]>([]);
//   const scrollRef = useRef<HTMLDivElement>(null);
//   const navigate = useNavigate();

//   // ✅ Category mapping with image
//   const categoryImages: Record<string, string> = {
//     kidney,
//     fever,
//     pregnancy: Pregnancy,
//     diabetes,
//     vitamin,
//     liver: Liver,
//     heart: Heart,
//     imaging: Imaging,
//   };

//   const categories = [
//     { name: "Kidney", key: "kidney" },
//     { name: "Fever and Infection", key: "fever" },
//     { name: "Vitamin", key: "vitamin" },
//     { name: "Pregnancy", key: "pregnancy" },
//     { name: "Diabetes", key: "diabetes" },
//     { name: "Liver", key: "liver" },
//     { name: "Heart", key: "heart" },
//     { name: "Imaging", key: "imaging" },
//   ];

//   useEffect(() => {
//     const fetchTests = async () => {
//       try {
//         const response = await api.get("/api/lab/alllabtests");
//         setTests(Array.isArray(response.data) ? response.data : []);
//       } catch (error) {
//         console.error("Error fetching tests:", error);
//         setTests([]);
//       }
//     };
//     fetchTests();
//   }, []);

//   const scroll = (direction: "left" | "right") => {
//     if (scrollRef.current) {
//       const scrollAmount = 400;
//       scrollRef.current.scrollBy({
//         left: direction === "left" ? -scrollAmount : scrollAmount,
//         behavior: "smooth",
//       });
//     }
//   };

//   const handleViewDetails = (test: Test) => {
//     navigate(`/lab-test-details/${test._id}`, { state: { test } });
//   };

//   return (
//     <div className="min-h-screen bg-indigo-50 px-4 sm:px-6 lg:px-10 py-10">
//       {/* 🔹 Popular Categories */}
//       <div className="mb-12 relative">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-bold text-gray-800">
//             Popular Categories
//           </h1>
//           <button className="text-blue-600 font-semibold hover:underline">
//             View All
//           </button>
//         </div>

//         <div className="relative">
//           <button
//             onClick={() => scroll("left")}
//             className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-300 p-2 rounded-full shadow hover:bg-gray-100"
//           >
//             <ChevronLeft className="w-5 h-5 text-gray-700" />
//           </button>

//           <div
//             ref={scrollRef}
//             className="flex gap-8 overflow-x-auto scrollbar-hide scroll-smooth px-10 py-2"
//           >
//             {categories.map((cat) => (
//               <div
//                 key={cat.key}
//                 className="flex-shrink-0 flex flex-col items-center cursor-pointer"
//               >
//                 <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-indigo-100 shadow hover:shadow-lg hover:scale-105 transition-all duration-300">
//                   <img
//                     src={categoryImages[cat.key]}
//                     alt={cat.name}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//                 <p className="mt-3 font-semibold text-gray-800 text-center text-sm sm:text-base">
//                   {cat.name}
//                 </p>
//               </div>
//             ))}
//           </div>

//           <button
//             onClick={() => scroll("right")}
//             className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-300 p-2 rounded-full shadow hover:bg-gray-100"
//           >
//             <ChevronRight className="w-5 h-5 text-gray-700" />
//           </button>
//         </div>
//       </div>

//       {/* 🔹 All Tests Section */}
//       <h2 className="text-2xl font-bold text-gray-800 mb-8">Available Tests</h2>

//       {tests.length === 0 ? (
//         <p className="text-center text-gray-500">No tests available</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//           {tests.map((test) => {
//             const categoryKey = test.category?.toLowerCase() || "";
//             const imageSrc =
//               categoryImages[categoryKey] || "/placeholder-image.jpg";

//             return (
//               <div
//                 key={test._id}
//                 className="bg-white rounded-2xl p-6 flex flex-col items-center shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
//               >
//                 <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-indigo-100 shadow">
//                   <img
//                     src={imageSrc}
//                     alt={test.testName}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//                 <h2 className="font-semibold text-gray-800 text-lg mt-4 text-center">
//                   {test.testName || "Unnamed Test"}
//                 </h2>
//                 <p className="text-gray-900 font-semibold text-base mt-1">
//                   ₹{test.price ?? "N/A"}
//                 </p>
//                 {test.category && (
//                   <span className="mt-2 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold">
//                     {test.category}
//                   </span>
//                 )}
//                 <p className="text-gray-600 mt-2 text-sm text-center">
//                   Lab:{" "}
//                   <span className="font-medium">
//                     {test.labName || "Unknown"}
//                   </span>
//                 </p>
//                 <button
//                   onClick={() => handleViewDetails(test)}
//                   className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition-all duration-300"
//                 >
//                   View Details
//                 </button>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }



// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////








// import React, { useMemo, useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   TestTube,
//   Activity,
//   Droplet,
//   Heart,
//   Search as SearchIcon,
//   Calendar,
//   Clock,
//   User,
// } from "lucide-react";

// // Mock data types
// type Test = {
//   id: string;
//   name: string;
//   category: string;
//   price: number;
//   durationMinutes: number;
//   short: string;
//   icon: React.ReactNode;
// };

// const MOCK_TESTS: Test[] = [
//   {
//     id: "t1",
//     name: "Complete Blood Count (CBC)",
//     category: "General",
//     price: 299,
//     durationMinutes: 15,
//     short: "Blood cell counts and indices.",
//     icon: <TestTube className="w-6 h-6" />,
//   },
//   {
//     id: "t2",
//     name: "Liver Function Test (LFT)",
//     category: "Liver",
//     price: 499,
//     durationMinutes: 20,
//     short: "Panel for liver enzymes and proteins.",
//     icon: <Activity className="w-6 h-6" />,
//   },
//   {
//     id: "t3",
//     name: "Kidney Profile (KFT)",
//     category: "Kidney",
//     price: 449,
//     durationMinutes: 18,
//     short: "Kidney filtration and electrolytes.",
//     icon: <Droplet className="w-6 h-6" />,
//   },
//   {
//     id: "t4",
//     name: "HbA1c (Diabetes)",
//     category: "Diabetes",
//     price: 399,
//     durationMinutes: 10,
//     short: "Glycated haemoglobin (3 months avg glucose).",
//     icon: <Heart className="w-6 h-6" />,
//   },
//   // add more tests as needed
// ];

// const CATEGORIES = [
//   { key: "Kidney", icon: <Droplet className="w-6 h-6" /> },
//   { key: "Diabetes", icon: <Heart className="w-6 h-6" /> },
//   { key: "Liver", icon: <Activity className="w-6 h-6" /> },
//   { key: "General", icon: <TestTube className="w-6 h-6" /> },
// ];



// export default function LabTestsPage() {
//   const [query, setQuery] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
//   const [drawerTest, setDrawerTest] = useState<Test | null>(null);
//   const [selectedDate, setSelectedDate] = useState<string>("");
//   const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
//   const [paymentMode, setPaymentMode] = useState<"online" | "offline">("online");

//   const filtered = useMemo(() => {
//     const q = query.trim().toLowerCase();
//     return MOCK_TESTS.filter((t) => {
//       const matchesQuery = q === "" || t.name.toLowerCase().includes(q) || t.short.toLowerCase().includes(q);
//       const matchesCat = !selectedCategory || t.category === selectedCategory;
//       return matchesQuery && matchesCat;
//     });
//   }, [query, selectedCategory]);

//   const timeslots = ["08:00 AM", "10:00 AM", "12:30 PM", "03:00 PM", "05:30 PM"];

//   function openBooking(test: Test) {
//     setDrawerTest(test);
//     setSelectedDate("");
//     setSelectedSlot(null);
//     setPaymentMode("online");
//   }

//   function confirmBooking() {
//     if (!drawerTest) return;
//     // In real app: call API to create booking
//     alert(
//       `Booking confirmed for ${drawerTest.name} on ${selectedDate || "(no date)"} at ${selectedSlot || "(no slot)"} - Payment: ${paymentMode}`
//     );
//     setDrawerTest(null);
//   }

//   return (
//     <div className="min-h-screen p-6 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
//       {/* subtle SVG background shapes for a lab theme */}
//       <svg className="pointer-events-none absolute right-0 top-0 opacity-10 w-96 h-96 transform translate-x-24 -translate-y-24" viewBox="0 0 200 200">
//         <defs>
//           <linearGradient id="g1" x1="0" x2="1">
//             <stop offset="0%" stopColor="#bde0fe" />
//             <stop offset="100%" stopColor="#dbeafe" />
//           </linearGradient>
//         </defs>
//         <circle cx="40" cy="40" r="80" fill="url(#g1)" />
//       </svg>

//       <header className="max-w-7xl mx-auto">
//         <div className="flex items-center justify-between">
//           <h1 className="text-3xl font-semibold text-slate-800">Lab Tests</h1>
//           <div className="flex items-center gap-3">
//             <Link to="/profile" className="flex items-center gap-2 text-sm px-3 py-2 rounded-full hover:shadow-lg transition">
//               <User className="w-5 h-5" />
//               <span className="hidden sm:inline">View profile</span>
//             </Link>
//           </div>
//         </div>

//         {/* Search bar */}
//         <div className="mt-6">
//           <div className="max-w-3xl mx-auto">
//             <label htmlFor="search" className="sr-only">Search lab tests</label>
//             <div className="relative">
//               <span className="absolute left-4 top-1/2 -translate-y-1/2 opacity-60">
//                 <SearchIcon className="w-5 h-5" />
//               </span>
//               <input
//                 id="search"
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//                 placeholder="Search tests, e.g. 'Liver function', 'HbA1c', 'CBC'"
//                 className="w-full pl-12 pr-4 py-4 rounded-2xl shadow-sm bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[rgba(59,130,246,0.12)] focus:border-[rgba(59,130,246,0.28)] text-slate-700 placeholder-slate-400 text-lg"
//               />
//               {/* decorative pill suggestions */}
//               <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2">
//                 <button
//                   onClick={() => setQuery('')}
//                   className="text-sm px-3 py-1 rounded-full border border-blue-100 bg-[rgba(59,130,246,0.06)] text-[#0f766e]"
//                 >
//                   Clear
//                 </button>
//               </div>
//             </div>

//             <p className="mt-2 text-sm text-slate-500">Try searching by test name, condition or category — results update instantly.</p>
//           </div>
//         </div>

//         {/* Popular Categories */}
//         <section className="mt-8">
//           <h3 className="text-lg font-medium text-slate-700 mb-3">Popular Categories</h3>
//           <div className="flex gap-4 flex-wrap">
//             {CATEGORIES.map((c) => {
//               const active = selectedCategory === c.key;
//               return (
//                 <button
//                   key={c.key}
//                   onClick={() => setSelectedCategory(active ? null : c.key)}
//                   className={`flex flex-col items-center gap-2 p-3 rounded-full transition transform hover:-translate-y-1 hover:scale-105 ${
//                     active ? "ring-2 ring-blue-200 bg-[rgba(59,130,246,0.06)]" : "bg-white"
//                   }`}
//                 >
//                   <div className={`rounded-full p-3 shadow-sm ${active ? "bg-blue-50" : "bg-white"}`}>
//                     <div className="w-9 h-9 text-slate-700">{c.icon}</div>
//                   </div>
//                   <span className="text-sm text-slate-700">{c.key}</span>
//                 </button>
//               );
//             })}
//           </div>
//         </section>
//       </header>

//       {/* Available tests grid */}
//       <main className="max-w-7xl mx-auto mt-8">
//         <h2 className="text-2xl font-semibold mb-4">Available Tests</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filtered.map((t) => (
//             <article key={t.id} className="relative bg-white rounded-2xl p-5 shadow-md hover:shadow-lg transition">
//               <div className="flex items-start justify-between gap-4">
//                 <div className="flex items-center gap-4">
//                   <div className="rounded-xl p-3 bg-[rgba(59,130,246,0.06)] border border-[rgba(59,130,246,0.18)]">
//                     {t.icon}
//                   </div>
//                   <div>
//                     <h3 className="text-lg font-medium text-slate-800">{t.name}</h3>
//                     <p className="text-sm text-slate-500">{t.short}</p>
//                     <div className="mt-2 text-sm text-slate-600 flex items-center gap-3">
//                       <Calendar className="w-4 h-4" />
//                       <span>{t.durationMinutes} mins</span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex flex-col items-end gap-3">
//                   <Link to={`/profile/${t.id}`} className="text-sm px-3 py-1 rounded-full hover:shadow hover:bg-slate-50">
//                     View profile
//                   </Link>

//                   <div className="text-right">
//                     <div className="text-xl font-semibold text-slate-800">₹{t.price}</div>

//                     {/* Book Now button with requested style: green-blue text, blue border and very light blue transparent background */}
//                     <button
//                       onClick={() => openBooking(t)}
//                       className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[rgba(59,130,246,0.28)] bg-[rgba(59,130,246,0.06)] text-[#0f766e] font-medium shadow-sm hover:shadow-md transition"
//                     >
//                       Book now
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </article>
//           ))}
//         </div>

//         {filtered.length === 0 && (
//           <div className="mt-8 text-center text-slate-500">No tests found. Try a different search or clear filters.</div>
//         )}
//       </main>

//       {/* Booking Sidebar / Drawer */}
//       <aside
//         className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white shadow-xl transform transition-transform z-50 ${
//           drawerTest ? "translate-x-0" : "translate-x-full"
//         }`}
//         aria-hidden={!drawerTest}
//       >
//         <div className="p-6 h-full flex flex-col">
//           <div className="flex items-center justify-between">
//             <div>
//               <h3 className="text-xl font-semibold">{drawerTest?.name}</h3>
//               <p className="text-sm text-slate-500">Select date, slot & payment</p>
//             </div>
//             <button onClick={() => setDrawerTest(null)} className="text-slate-500 hover:text-slate-700">
//               Close
//             </button>
//           </div>

//           <div className="mt-6 space-y-4 flex-1 overflow-auto">
//             <div>
//               <label className="block text-sm font-medium text-slate-700">Date</label>
//               <input
//                 type="date"
//                 value={selectedDate}
//                 onChange={(e) => setSelectedDate(e.target.value)}
//                 className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-slate-700">Available time slots</label>
//               <div className="mt-3 flex flex-wrap gap-2">
//                 {timeslots.map((s) => (
//                   <button
//                     key={s}
//                     onClick={() => setSelectedSlot(s)}
//                     className={`px-3 py-2 rounded-md border ${
//                       selectedSlot === s ? "border-blue-300 bg-[rgba(59,130,246,0.08)]" : "border-slate-200 bg-white"
//                     }`}
//                   >
//                     {s}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-slate-700">Mode</label>
//               <div className="mt-2 flex gap-3">
//                 <button
//                   onClick={() => setPaymentMode('online')}
//                   className={`px-3 py-2 rounded-md border ${paymentMode === 'online' ? 'border-blue-300 bg-[rgba(59,130,246,0.06)]' : 'border-slate-200'}`}
//                 >
//                   Online
//                 </button>
//                 <button
//                   onClick={() => setPaymentMode('offline')}
//                   className={`px-3 py-2 rounded-md border ${paymentMode === 'offline' ? 'border-blue-300 bg-[rgba(59,130,246,0.06)]' : 'border-slate-200'}`}
//                 >
//                   Offline
//                 </button>
//               </div>
//             </div>

//             <div className="pt-4 border-t border-slate-100">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <div className="text-sm text-slate-500">Total</div>
//                   <div className="text-lg font-semibold">₹{drawerTest?.price}</div>
//                 </div>
//                 <div>
//                   <button
//                     onClick={confirmBooking}
//                     className="px-4 py-2 rounded-lg bg-[#0f766e] text-white font-semibold"
//                   >
//                     Confirm & Pay
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </aside>
//     </div>
//   );
// }


// import React, { useEffect, useMemo, useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   TestTube,
//   Activity,
//   Droplet,
//   Heart,
//   Search as SearchIcon,
//   Calendar,
//   User,
// } from "lucide-react";
// import api from "../api/client"; // ✅ Backend API client

// // Type definition
// type Test = {
//   _id: string;
//   testName: string;
//   category: string;
//   price: number;
//   durationMinutes?: number;
//   short?: string;
// };

// // Category list for filtering
// const CATEGORIES = [
//   { key: "Kidney", icon: <Droplet className="w-6 h-6" /> },
//   { key: "Diabetes", icon: <Heart className="w-6 h-6" /> },
//   { key: "Liver", icon: <Activity className="w-6 h-6" /> },
//   { key: "General", icon: <TestTube className="w-6 h-6" /> },
// ];

// // Helper to show icon per category
// function getCategoryIcon(category: string) {
//   switch (category.toLowerCase()) {
//     case "kidney":
//       return <Droplet className="w-6 h-6" />;
//     case "diabetes":
//       return <Heart className="w-6 h-6" />;
//     case "liver":
//       return <Activity className="w-6 h-6" />;
//     default:
//       return <TestTube className="w-6 h-6" />;
//   }
// }

// export default function LabTestsPage() {
//   const [tests, setTests] = useState<Test[]>([]);
//   const [query, setQuery] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
//   const [drawerTest, setDrawerTest] = useState<Test | null>(null);
//   const [selectedDate, setSelectedDate] = useState<string>("");
//   const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
//   const [paymentMode, setPaymentMode] = useState<"online" | "offline">("online");
//   const [loading, setLoading] = useState(true);

//   const timeslots = ["08:00 AM", "10:00 AM", "12:30 PM", "03:00 PM", "05:30 PM"];

//   // ✅ Fetch tests from backend
//   useEffect(() => {
//     const fetchTests = async () => {
//       try {
//         const res = await api.get("/api/lab/alllabtests");
//         setTests(Array.isArray(res.data) ? res.data : []);
//       } catch (err) {
//         console.error("Error fetching tests:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchTests();
//   }, []);

//   // ✅ Filter logic
//   const filtered = useMemo(() => {
//     const q = query.trim().toLowerCase();
//     return tests.filter((t) => {
//       const name = t.testName?.toLowerCase() || "";
//       const cat = t.category?.toLowerCase() || "";
//       const matchesQuery = q === "" || name.includes(q) || cat.includes(q);
//       const matchesCat = !selectedCategory || cat === selectedCategory.toLowerCase();
//       return matchesQuery && matchesCat;
//     });
//   }, [query, selectedCategory, tests]);

//   // ✅ Open booking drawer
//   function openBooking(test: Test) {
//     setDrawerTest(test);
//     setSelectedDate("");
//     setSelectedSlot(null);
//     setPaymentMode("online");
//   }

//   // ✅ Confirm booking (POST to backend)
//   async function confirmBooking() {
//     if (!drawerTest || !selectedDate || !selectedSlot) {
//       alert("Please select a date and time slot before confirming.");
//       return;
//     }

//     try {
//       const response = await api.post("/api/lab/book", {
//         testId: drawerTest._id,
//         date: selectedDate,
//         timeSlot: selectedSlot,
//         paymentMode,
//       });

//       alert(`✅ Booking confirmed: ${response.data.message || "Success"}`);
//       setDrawerTest(null);
//     } catch (error) {
//       console.error("Booking failed:", error);
//       alert("❌ Booking failed. Please try again.");
//     }
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-slate-600">
//         Loading lab tests...
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen p-6 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
//       {/* Background shape */}
//       <svg
//         className="pointer-events-none absolute right-0 top-0 opacity-10 w-96 h-96 transform translate-x-24 -translate-y-24"
//         viewBox="0 0 200 200"
//       >
//         <defs>
//           <linearGradient id="g1" x1="0" x2="1">
//             <stop offset="0%" stopColor="#bde0fe" />
//             <stop offset="100%" stopColor="#dbeafe" />
//           </linearGradient>
//         </defs>
//         <circle cx="40" cy="40" r="80" fill="url(#g1)" />
//       </svg>

//       {/* Header */}
//       <header className="max-w-7xl mx-auto">
//         <div className="flex items-center justify-between">
//           <h1 className="text-3xl font-semibold text-slate-800">Lab Tests</h1>
//           <Link
//             to="/profile"
//             className="flex items-center gap-2 text-sm px-3 py-2 rounded-full hover:shadow-lg transition"
//           >
//             <User className="w-5 h-5" />
//             <span className="hidden sm:inline">View profile</span>
//           </Link>
//         </div>

//         {/* Search bar */}
//         <div className="mt-6 max-w-3xl mx-auto">
//           <div className="relative">
//             <span className="absolute left-4 top-1/2 -translate-y-1/2 opacity-60">
//               <SearchIcon className="w-5 h-5" />
//             </span>
//             <input
//               id="search"
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//               placeholder="Search tests, e.g. 'Liver function', 'HbA1c', 'CBC'"
//               className="w-full pl-12 pr-4 py-4 rounded-2xl shadow-sm bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[rgba(59,130,246,0.12)] focus:border-[rgba(59,130,246,0.28)] text-slate-700 placeholder-slate-400 text-lg"
//             />
//             <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2">
//               <button
//                 onClick={() => setQuery("")}
//                 className="text-sm px-3 py-1 rounded-full border border-blue-100 bg-[rgba(59,130,246,0.06)] text-[#0f766e]"
//               >
//                 Clear
//               </button>
//             </div>
//           </div>
//           <p className="mt-2 text-sm text-slate-500">
//             Try searching by test name, condition, or category — results update instantly.
//           </p>
//         </div>

//         {/* Popular Categories */}
//         <section className="mt-8">
//           <h3 className="text-lg font-medium text-slate-700 mb-3">Popular Categories</h3>
//           <div className="flex gap-4 flex-wrap">
//             {CATEGORIES.map((c) => {
//               const active = selectedCategory === c.key;
//               return (
//                 <button
//                   key={c.key}
//                   onClick={() => setSelectedCategory(active ? null : c.key)}
//                   className={`flex flex-col items-center gap-2 p-3 rounded-full transition transform hover:-translate-y-1 hover:scale-105 ${
//                     active ? "ring-2 ring-blue-200 bg-[rgba(59,130,246,0.06)]" : "bg-white"
//                   }`}
//                 >
//                   <div className={`rounded-full p-3 shadow-sm ${active ? "bg-blue-50" : "bg-white"}`}>
//                     <div className="w-9 h-9 text-slate-700">{c.icon}</div>
//                   </div>
//                   <span className="text-sm text-slate-700">{c.key}</span>
//                 </button>
//               );
//             })}
//           </div>
//         </section>
//       </header>

//       {/* Tests Grid */}
//       <main className="max-w-7xl mx-auto mt-8">
//         <h2 className="text-2xl font-semibold mb-4">Available Tests</h2>

//         {filtered.length === 0 ? (
//           <div className="mt-8 text-center text-slate-500">
//             No tests found. Try a different search or clear filters.
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filtered.map((t) => (
//               <article
//                 key={t._id}
//                 className="relative bg-white rounded-2xl p-5 shadow-md hover:shadow-lg transition"
//               >
//                 <div className="flex items-start justify-between gap-4">
//                   <div className="flex items-center gap-4">
//                     <div className="rounded-xl p-3 bg-[rgba(59,130,246,0.06)] border border-[rgba(59,130,246,0.18)]">
//                       {getCategoryIcon(t.category)}
//                     </div>
//                     <div>
//                       <h3 className="text-lg font-medium text-slate-800">
//                         {t.testName}
//                       </h3>
//                       <p className="text-sm text-slate-500">
//                         {t.short || "Comprehensive test for health insights."}
//                       </p>
//                       <div className="mt-2 text-sm text-slate-600 flex items-center gap-3">
//                         <Calendar className="w-4 h-4" />
//                         <span>{t.durationMinutes || 15} mins</span>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex flex-col items-end gap-3">
//                     <div className="text-right">
//                       <div className="text-xl font-semibold text-slate-800">
//                         ₹{t.price}
//                       </div>
//                       <button
//                         onClick={() => openBooking(t)}
//                         className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[rgba(59,130,246,0.28)] bg-[rgba(59,130,246,0.06)] text-[#0f766e] font-medium shadow-sm hover:shadow-md transition"
//                       >
//                         Book now
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </article>
//             ))}
//           </div>
//         )}
//       </main>

//       {/* Booking Drawer */}
//       <aside
//         className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white shadow-xl transform transition-transform z-50 ${
//           drawerTest ? "translate-x-0" : "translate-x-full"
//         }`}
//         aria-hidden={!drawerTest}
//       >
//         <div className="p-6 h-full flex flex-col">
//           <div className="flex items-center justify-between">
//             <div>
//               <h3 className="text-xl font-semibold">{drawerTest?.testName}</h3>
//               <p className="text-sm text-slate-500">
//                 Select date, slot & payment
//               </p>
//             </div>
//             <button
//               onClick={() => setDrawerTest(null)}
//               className="text-slate-500 hover:text-slate-700"
//             >
//               Close
//             </button>
//           </div>

//           <div className="mt-6 space-y-4 flex-1 overflow-auto">
//             <div>
//               <label className="block text-sm font-medium text-slate-700">
//                 Date
//               </label>
//               <input
//                 type="date"
//                 value={selectedDate}
//                 onChange={(e) => setSelectedDate(e.target.value)}
//                 className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-slate-700">
//                 Available time slots
//               </label>
//               <div className="mt-3 flex flex-wrap gap-2">
//                 {timeslots.map((s) => (
//                   <button
//                     key={s}
//                     onClick={() => setSelectedSlot(s)}
//                     className={`px-3 py-2 rounded-md border ${
//                       selectedSlot === s
//                         ? "border-blue-300 bg-[rgba(59,130,246,0.08)]"
//                         : "border-slate-200 bg-white"
//                     }`}
//                   >
//                     {s}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-slate-700">
//                 Mode
//               </label>
//               <div className="mt-2 flex gap-3">
//                 <button
//                   onClick={() => setPaymentMode("online")}
//                   className={`px-3 py-2 rounded-md border ${
//                     paymentMode === "online"
//                       ? "border-blue-300 bg-[rgba(59,130,246,0.06)]"
//                       : "border-slate-200"
//                   }`}
//                 >
//                   Online
//                 </button>
//                 <button
//                   onClick={() => setPaymentMode("offline")}
//                   className={`px-3 py-2 rounded-md border ${
//                     paymentMode === "offline"
//                       ? "border-blue-300 bg-[rgba(59,130,246,0.06)]"
//                       : "border-slate-200"
//                   }`}
//                 >
//                   Offline
//                 </button>
//               </div>
//             </div>

//             <div className="pt-4 border-t border-slate-100">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <div className="text-sm text-slate-500">Total</div>
//                   <div className="text-lg font-semibold">
//                     ₹{drawerTest?.price}
//                   </div>
//                 </div>
//                 <div>
//                   <button
//                     onClick={confirmBooking}
//                     className="px-4 py-2 rounded-lg bg-[#0f766e] text-white font-semibold"
//                   >
//                     Confirm & Pay
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </aside>
//     </div>
//   );
// }



// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Search } from "lucide-react";

// interface LabTest {
//   id: number;
//   name: string;
//   category: string;
//   price: number;
//   image: string;
// }

// const dummyTests: LabTest[] = [
//   {
//     id: 1,
//     name: "Liver Function Test",
//     category: "Liver",
//     price: 699,
//     image: "https://cdn-icons-png.flaticon.com/512/616/616408.png",
//   },
//   {
//     id: 2,
//     name: "Kidney Profile",
//     category: "Kidney",
//     price: 799,
//     image: "https://cdn-icons-png.flaticon.com/512/615/615075.png",
//   },
//   {
//     id: 3,
//     name: "Blood Sugar Test",
//     category: "Diabetes",
//     price: 299,
//     image: "https://cdn-icons-png.flaticon.com/512/2777/2777135.png",
//   },
//   {
//     id: 4,
//     name: "Heart Checkup",
//     category: "Heart",
//     price: 999,
//     image: "https://cdn-icons-png.flaticon.com/512/1048/1048948.png",
//   },
//   {
//     id: 5,
//     name: "Thyroid Test",
//     category: "Thyroid",
//     price: 599,
//     image: "https://cdn-icons-png.flaticon.com/512/2966/2966327.png",
//   },
// ];

// const popularCategories = [
//   {
//     name: "Heart",
//     icon: "https://cdn-icons-png.flaticon.com/512/1048/1048948.png",
//   },
//   {
//     name: "Kidney",
//     icon: "https://cdn-icons-png.flaticon.com/512/615/615075.png",
//   },
//   {
//     name: "Diabetes",
//     icon: "https://cdn-icons-png.flaticon.com/512/2777/2777135.png",
//   },
//   {
//     name: "Liver",
//     icon: "https://cdn-icons-png.flaticon.com/512/616/616408.png",
//   },
//   {
//     name: "Thyroid",
//     icon: "https://cdn-icons-png.flaticon.com/512/2966/2966327.png",
//   },
// ];

// const LabTestsPage: React.FC = () => {
//   const [search, setSearch] = useState("");
//   const [filteredTests, setFilteredTests] = useState<LabTest[]>(dummyTests);
//   const [selectedTest, setSelectedTest] = useState<LabTest | null>(null);

//   useEffect(() => {
//     setFilteredTests(
//       dummyTests.filter((test) =>
//         test.name.toLowerCase().includes(search.toLowerCase())
//       )
//     );
//   }, [search]);

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
//       {/* Decorative background */}
//       <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
//         <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50" />
//         <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-40" />
//       </div>

//       <div className="relative z-10 p-6 max-w-7xl mx-auto">
//         {/* Search Bar */}
//         <div className="flex justify-center mb-10">
//           <div className="relative w-full max-w-2xl">
//             <input
//               type="text"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="🔍 Search for lab tests..."
//               className="w-full px-5 py-3 rounded-full border border-blue-300 shadow-md focus:ring-2 focus:ring-blue-400 outline-none text-gray-700 text-lg bg-white/80 backdrop-blur"
//             />
//             <Search className="absolute right-5 top-3.5 text-blue-400" size={24} />
//           </div>
//         </div>

//         {/* Popular Categories */}
//         <h2 className="text-2xl font-semibold text-blue-800 mb-5 text-center">
//           Popular Categories
//         </h2>
//         <div className="flex flex-wrap justify-center gap-8 mb-12">
//           {popularCategories.map((cat, i) => (
//             <motion.div
//               key={i}
//               whileHover={{ scale: 1.1 }}
//               className="flex flex-col items-center cursor-pointer"
//             >
//               <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center shadow-md hover:bg-blue-200 transition-all duration-300">
//                 <img src={cat.icon} alt={cat.name} className="w-14 h-14" />
//               </div>
//               <p className="mt-2 text-blue-700 font-medium">{cat.name}</p>
//             </motion.div>
//           ))}
//         </div>

//         {/* Available Tests */}
//         <h2 className="text-2xl font-semibold text-blue-800 mb-5 text-center">
//           Available Tests
//         </h2>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {filteredTests.map((test) => (
//             <motion.div
//               key={test.id}
//               whileHover={{ scale: 1.03 }}
//               className="relative bg-white/90 backdrop-blur-lg border border-blue-100 rounded-2xl p-5 shadow-lg hover:shadow-xl transition"
//             >
//               <div className="absolute top-3 right-3">
//                 <button className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-lg hover:bg-blue-200 transition">
//                   View Profile
//                 </button>
//               </div>
//               <img
//                 src={test.image}
//                 alt={test.name}
//                 className="w-24 h-24 mx-auto mb-4"
//               />
//               <h3 className="text-xl font-semibold text-blue-900 text-center mb-2">
//                 {test.name}
//               </h3>
//               <p className="text-gray-600 text-center mb-3">
//                 Category: {test.category}
//               </p>
//               <p className="text-blue-700 text-center font-bold text-lg mb-4">
//                 ₹{test.price}
//               </p>
//               <div className="flex justify-center">
//                 <button
//                   onClick={() => setSelectedTest(test)}
//                   className="px-5 py-2 border border-blue-400 text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-full transition font-semibold"
//                 >
//                   Book Now
//                 </button>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>

//       {/* Booking Sidebar */}
//       <AnimatePresence>
//         {selectedTest && (
//           <motion.div
//             initial={{ x: "100%" }}
//             animate={{ x: 0 }}
//             exit={{ x: "100%" }}
//             transition={{ type: "tween" }}
//             className="fixed top-0 right-0 w-full sm:w-[400px] h-full bg-white shadow-2xl z-50 p-6 overflow-y-auto"
//           >
//             <h2 className="text-2xl font-bold text-blue-800 mb-4">
//               Book Test: {selectedTest.name}
//             </h2>
//             <p className="text-gray-600 mb-6">
//               Choose your preferred date, time slot, and payment method.
//             </p>

//             <div className="space-y-4">
//               <label className="block text-blue-700 font-medium">Select Date:</label>
//               <input
//                 type="date"
//                 className="w-full border border-blue-300 rounded-lg px-3 py-2"
//               />

//               <label className="block text-blue-700 font-medium">
//                 Select Time Slot:
//               </label>
//               <select className="w-full border border-blue-300 rounded-lg px-3 py-2">
//                 <option>9:00 AM - 11:00 AM</option>
//                 <option>11:00 AM - 1:00 PM</option>
//                 <option>2:00 PM - 4:00 PM</option>
//                 <option>5:00 PM - 7:00 PM</option>
//               </select>

//               <label className="block text-blue-700 font-medium">
//                 Payment Method:
//               </label>
//               <select className="w-full border border-blue-300 rounded-lg px-3 py-2">
//                 <option>Online</option>
//                 <option>Offline</option>
//               </select>
//             </div>

//             <div className="flex justify-between mt-8">
//               <button
//                 onClick={() => setSelectedTest(null)}
//                 className="px-5 py-2 border border-gray-400 rounded-full hover:bg-gray-100"
//               >
//                 Cancel
//               </button>
//               <button className="px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
//                 Confirm Booking
//               </button>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default LabTestsPage;import React, { useEffect, useMemo, useState } from "react";import React, { useEffect, useMemo, useState } from "react";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, type TargetAndTransition } from "framer-motion";

import api from "../api/client";
import {
  Search as SearchIcon,
  FlaskConical,
  Microscope,
  TestTube2,
  Heart,
  Activity,
  Droplet,
  Baby,
  Pill,
} from "lucide-react";

export default function LabTestsPage() {
  const [tests, setTests] = useState<any[]>([]);
  const [packages, setPackages] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [selectedHealthCheck, setSelectedHealthCheck] = useState<string | null>(null);
  const [showAllTests, setShowAllTests] = useState(false);
  const [showAllPackages, setShowAllPackages] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get("/api/lab/alllabtests");
        if (Array.isArray(res.data)) {
          setTests(res.data);
          setPackages(res.data.slice(0, 8));
        }
      } catch (err) {
        console.error("Error loading tests:", err);
      }
    };
    fetch();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tests.filter((t) => {
      const matchesQuery =
        q === "" ||
        t.testName?.toLowerCase().includes(q) ||
        t.shortDescription?.toLowerCase().includes(q);
      const matchesHealth =
        !selectedHealthCheck || t.healthCheckCategory === selectedHealthCheck;
      return matchesQuery && matchesHealth;
    });
  }, [tests, query, selectedHealthCheck]);

  const healthChecks = [
    { key: "Full Body Checkup", icon: <Activity className="text-blue-500" /> },
    { key: "Diabetes", icon: <Heart className="text-pink-500" /> },
    { key: "Women’s Health", icon: <Droplet className="text-purple-500" /> },
    { key: "Thyroid", icon: <Activity className="text-orange-500" /> },
    { key: "Vitamin", icon: <TestTube2 className="text-green-500" /> },
    { key: "Blood Studies", icon: <FlaskConical className="text-amber-500" /> },
    { key: "Heart", icon: <Heart className="text-red-500" /> },
    { key: "Kidney", icon: <Droplet className="text-blue-400" /> },
    { key: "Liver", icon: <Activity className="text-yellow-500" /> },
    { key: "Hairfall", icon: <Microscope className="text-teal-500" /> },
    { key: "Fever", icon: <TestTube2 className="text-pink-600" /> },
    { key: "Senior Citizen", icon: <Heart className="text-gray-500" /> },
  ];

  const womenCare = [
    { key: "PCOD Screening", icon: <Activity className="text-pink-500" /> },
    { key: "Blood Studies", icon: <FlaskConical className="text-amber-500" /> },
    { key: "Pregnancy", icon: <Baby className="text-purple-500" /> },
    { key: "Iron Studies", icon: <Microscope className="text-orange-500" /> },
    { key: "Vitamin", icon: <Pill className="text-green-500" /> },
  ];

  // ✅ Properly typed animation definition
 const floatAnim: TargetAndTransition = {
  x: [0, 10, 0, -10, 0],
  y: [0, -15, 0, 10, 0],
  opacity: [0.6, 1, 0.6],
  transition: { duration: 10, repeat: Infinity, ease: "easeInOut" },
};

  return (
    <div className="relative min-h-screen bg-white font-[Inter,sans-serif] overflow-hidden">
      {/* Floating Icons */}
      <motion.div className="absolute top-20 left-10 opacity-10" animate={floatAnim}>
        <FlaskConical className="w-24 h-24 text-blue-300" />
      </motion.div>
      <motion.div className="absolute bottom-20 right-10 opacity-10" animate={floatAnim}>
        <Microscope className="w-28 h-28 text-pink-300" />
      </motion.div>
      <motion.div className="absolute bottom-40 left-1/2 opacity-10" animate={floatAnim}>
        <TestTube2 className="w-20 h-20 text-green-300" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 py-10 relative z-10">
        {/* Search Bar */}
        <div className="max-w-xl mx-auto relative mb-10">
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <SearchIcon className="text-gray-400 w-5 h-5" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="🔍 Search for lab tests or health packages..."
            className="w-full py-3 pl-12 pr-5 rounded-full shadow-md border border-gray-200 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-[#106C89] focus:outline-none text-sm bg-gradient-to-r from-white to-blue-50"
          />
        </div>

        {/* Doctor-Created Health Checks */}
        <section>
          <h2 className="text-xl font-semibold mb-5 text-[#121414] border-l-4 border-[#106C89] pl-3">
            Doctor-Created Health Checks
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {healthChecks.map((hc) => {
              const active = selectedHealthCheck === hc.key;
              return (
                <button
                  key={hc.key}
                  onClick={() => setSelectedHealthCheck(active ? null : hc.key)}
                  className={`flex items-center justify-start border border-gray-200 rounded-md bg-white hover:shadow-sm transition-all duration-200 ${
                    active ? "ring-1 ring-[#106C89]" : ""
                  }`}
                  style={{
                    height: "64px",
                    padding: "6px 8px",
                    gap: "8px",
                  }}
                >
                  <div className="p-2 border border-gray-200 rounded-md bg-gray-50">{hc.icon}</div>
                  <span className="text-[13px] text-gray-800 font-medium text-left">
                    {hc.key}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Available Tests */}
        <section className="mt-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-[#121414] border-l-4 border-[#106C89] pl-3">
              Available Tests
            </h2>
            <button
              onClick={() => setShowAllTests(!showAllTests)}
              className="text-[#106C89] text-sm font-medium hover:underline"
            >
              {showAllTests ? "Show Less" : "View All"}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {filtered
              .slice(0, showAllTests ? filtered.length : 8)
              .map((t) => (
                <motion.div
                  key={t._id}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="border border-gray-200 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-4 flex flex-col justify-between"
                  style={{ height: "160px" }}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 border border-gray-200 rounded-md bg-gray-50">
                      <TestTube2 className="text-[#106C89]" />
                    </div>
                    <div>
                      <h3 className="text-[14px] font-semibold text-[#121414]">{t.testName}</h3>
                      <p className="text-[12px] text-gray-500 mt-1 line-clamp-2">
                        {t.shortDescription || "Detailed diagnostic test."}
                      </p>
                      <p className="text-sm font-semibold text-gray-800 mt-1">₹{t.price ?? "N/A"}</p>
                    </div>
                  </div>
                  <div className="flex justify-end mt-2">
                    <button
                      onClick={() => navigate(`/lab-test-details/${t._id}`, { state: { test: t } })}
                      className="px-3 py-1 text-[12px] text-white bg-[#106C89] rounded-sm hover:bg-[#0E5A72] transition"
                    >
                      View Details
                    </button>
                  </div>
                </motion.div>
              ))}
          </div>
        </section>

        {/* Available Packages */}
        <section className="mt-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-[#121414] border-l-4 border-[#106C89] pl-3">
              Available Packages
            </h2>
            <button
              onClick={() => setShowAllPackages(!showAllPackages)}
              className="text-[#106C89] text-sm font-medium hover:underline"
            >
              {showAllPackages ? "Show Less" : "View All"}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {packages
              .slice(0, showAllPackages ? packages.length : 8)
              .map((p) => (
                <motion.div
                  key={p._id}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="border border-gray-200 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-4 flex flex-col justify-between"
                  style={{ height: "160px" }}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 border border-gray-200 rounded-md bg-gray-50">
                      <FlaskConical className="text-[#106C89]" />
                    </div>
                    <div>
                      <h3 className="text-[14px] font-semibold text-[#121414]">{p.testName}</h3>
                      <p className="text-[12px] text-gray-500 mt-1 line-clamp-2">
                        {p.shortDescription || "Comprehensive health package."}
                      </p>
                      <p className="text-sm font-semibold text-gray-800 mt-1">₹{p.price ?? "N/A"}</p>
                    </div>
                  </div>
                  <div className="flex justify-end mt-2">
                    <button
                      onClick={() => navigate(`/lab-test-details/${p._id}`, { state: { test: p } })}
                      className="px-3 py-1 text-[12px] text-white bg-[#106C89] rounded-sm hover:bg-[#0E5A72] transition"
                    >
                      View Details
                    </button>
                  </div>
                </motion.div>
              ))}
          </div>
        </section>

        {/* Women Care Section */}
        <section className="mt-10 mb-16">
          <h2 className="text-xl font-semibold mb-5 text-[#121414] border-l-4 border-[#106C89] pl-3">
            Women Care
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {womenCare.map((w) => (
              <div
                key={w.key}
                className="flex items-center justify-start border border-gray-200 rounded-md bg-white hover:shadow-sm transition-all duration-200"
                style={{
                  height: "64px",
                  padding: "6px 8px",
                  gap: "8px",
                }}
              >
                <div className="p-2 border border-gray-200 rounded-md bg-gray-50">{w.icon}</div>
                <span className="text-[13px] text-gray-800 font-medium text-left">{w.key}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
