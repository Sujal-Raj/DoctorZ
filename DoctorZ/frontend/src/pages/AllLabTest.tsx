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