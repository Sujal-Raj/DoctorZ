
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Stethoscope,
//   Calendar,
//   MapPin,
//   Search as SearchIcon,
//   Menu,
//   ChevronRight,
// } from "lucide-react";
// import { Helmet } from "react-helmet";

// const SPECIALTIES = [
//   "Anaesthesia",
//   "General Physician",
//   "Cardiology",
//   "Dermatology",
//   "Pediatrics",
//   "Orthopaedics",
//   "Neurology",
//   "Urology",
//   "Gastroenterology",
//   "Psychiatry",
//   "Pulmonology",
//   "Endocrinology",
//   "Nephrology",
//   "Ophthalmology",
//   "Dentist",
// ];

// const AllDoctor: React.FC = () => {
//   const navigate = useNavigate();

//   // search inputs
//   const [specialty, setSpecialty] = useState<string>("");
//   const [location, setLocation] = useState<string>("");
//   const [date, setDate] = useState<string>(""); // optional, YYYY-MM-DD
//   const [visitType, setVisitType] = useState<"hospital" | "online">("hospital");

//   // small UI-only state
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const onSearch = () => {
//     // normalize values
//     const s = specialty?.trim();
//     const l = location?.trim();

//     navigate("/search-results", {
//       state: {
//         specialty: s || "",
//         location: l || "",
//         date: date || "",
//         visitType,
//       },
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 text-slate-900">
//       <Helmet>
//         <title>Find Doctors — Search by specialty, location | DoctorZ</title>
//         <meta
//           name="description"
//           content="Find and book trusted doctors by speciality, city and date. Search online consultations or hospital visits. Fast booking and verified profiles."
//         />
//       </Helmet>

//       {/* Mobile header */}
//       <header className="lg:hidden bg-white border-b sticky top-0 z-40">
//         <div className="flex items-center justify-between px-4 py-3">
//           <div className="flex items-center gap-3">
//             <button
//               aria-label="Open menu"
//               onClick={() => setMobileMenuOpen((s) => !s)}
//               className="p-2 rounded-md bg-slate-100 text-slate-700"
//             >
//               <Menu className="w-5 h-5" />
//             </button>
//             <div className="flex items-center gap-2">
//               <div className="bg-[#106C89] text-white rounded-lg p-2">
//                 <Stethoscope className="w-5 h-5" />
//               </div>
//               <h1 className="text-lg font-semibold">Find Doctors</h1>
//             </div>
//           </div>

//           <div className="flex items-center gap-2">
//             <button
//               onClick={() =>
//                 navigate("/search-results", {
//                   state: { specialty: "", location: "", date: "", visitType },
//                 })
//               }
//               className="px-3 py-2 rounded-md bg-[#106C89] text-white text-sm font-medium"
//             >
//               Quick search
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Main container */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Hero + Search */}
//         <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 lg:p-8 items-center">
//             {/* Left: hero text */}
//             <div className="lg:col-span-5">
//               <div className="flex items-start gap-4">
//                 <div className="bg-[#e6f4f6] text-[#106C89] rounded-2xl p-3">
//                   <Stethoscope className="w-6 h-6" />
//                 </div>
//                 <div>
//                   <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
//                     Find top doctors near you
//                   </h2>
//                   <p className="mt-2 text-sm text-slate-600">
//                     Search by speciality, city or date. Book online consultations or hospital visits with verified
//                     doctors.
//                   </p>

//                   <div className="mt-4 flex flex-wrap gap-2 text-sm">
//                     <span className="inline-flex items-center gap-2 px-3 py-1 bg-sky-50 text-[#106C89] rounded-full">
//                       <Calendar className="w-4 h-4" /> Flexible dates
//                     </span>
//                     <span className="inline-flex items-center gap-2 px-3 py-1 bg-sky-50 text-[#106C89] rounded-full">
//                       <MapPin className="w-4 h-4" /> Multiple cities
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Right: sticky search controls */}
//             <div className="lg:col-span-7">
//               <div className="sticky top-6">
//                 <form
//                   onSubmit={(e) => {
//                     e.preventDefault();
//                     onSearch();
//                   }}
//                   className="bg-white border border-gray-100 rounded-xl shadow-sm p-4 sm:p-5"
//                   aria-label="Doctor search form"
//                 >
//                   <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center">
//                     {/* Speciality (typeable + datalist) */}
//                     <div className="md:col-span-2">
//                       <label className="sr-only">Speciality</label>
//                       <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-[#106C89]">
//                         <Stethoscope className="w-5 h-5 text-gray-400" />
//                         <input
//                           aria-label="Speciality"
//                           list="speciality-list"
//                           value={specialty}
//                           onChange={(e) => setSpecialty(e.target.value)}
//                           placeholder="Speciality (e.g. Cardiologist)"
//                           className="w-full text-sm outline-none text-slate-700 bg-transparent"
//                         />
//                         <datalist id="speciality-list">
//                           {SPECIALTIES.map((s) => (
//                             <option key={s} value={s} />
//                           ))}
//                         </datalist>
//                       </div>
//                     </div>

//                     {/* Location */}
//                     <div>
//                       <label className="sr-only">Location</label>
//                       <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-[#106C89]">
//                         <MapPin className="w-5 h-5 text-gray-400" />
//                         <input
//                           aria-label="Location or pincode"
//                           value={location}
//                           onChange={(e) => setLocation(e.target.value)}
//                           placeholder="City or pincode"
//                           className="w-full text-sm outline-none text-slate-700 bg-transparent"
//                         />
//                         <button
//                           type="button"
//                           title="Use current location"
//                           onClick={() => {
//                             if (!navigator.geolocation) return;
//                             navigator.geolocation.getCurrentPosition(
//                               (pos) => {
//                                 // optionally convert coords to city using reverse-geocoding later
//                                 // small UX notification could be added here
//                               },
//                               () => {
//                                 // ignore failure silently
//                               }
//                             );
//                           }}
//                           className="p-1 rounded-md"
//                         >
//                           <MapPin className="w-4 h-4 text-gray-300" />
//                         </button>
//                       </div>
//                     </div>

//                     {/* Date */}
//                     <div>
//                       <label className="sr-only">Date</label>
//                       <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-[#106C89]">
//                         <Calendar className="w-5 h-5 text-gray-400" />
//                         <input
//                           aria-label="Select date (optional)"
//                           type="date"
//                           value={date}
//                           onChange={(e) => setDate(e.target.value)}
//                           className="w-full text-sm outline-none text-slate-700 bg-transparent"
//                         />
//                       </div>
//                     </div>

//                     {/* Search button */}
//                     <div>
//                       <button
//                         aria-label="Search doctors"
//                         type="submit"
//                         className="w-full inline-flex items-center justify-center gap-2 bg-[#28328C] hover:bg-[#0d5a70] text-white font-semibold px-4 py-2 rounded-lg shadow-sm transition"
//                       >
//                         <SearchIcon className="w-4 h-4" /> Search
//                       </button>
//                     </div>
//                   </div>

//                   {/* Visit type toggle */}
//                   <div className="mt-3 flex items-center gap-3">
//                     <div className="text-sm text-gray-600">Visit type:</div>
//                     <div className="flex gap-2">
//                       <button
//                         type="button"
//                         onClick={() => setVisitType("hospital")}
//                         className={`px-3 py-1.5 rounded-full text-sm border ${
//                           visitType === "hospital"
//                             ? "bg-[#e6f4f6] border-[#bfe6eb] text-[#106C89]"
//                             : "bg-white border-gray-200 text-slate-700"
//                         }`}
//                       >
//                         Hospital Visit
//                       </button>
//                       <button
//                         type="button"
//                         onClick={() => setVisitType("online")}
//                         className={`px-3 py-1.5 rounded-full text-sm border ${
//                           visitType === "online"
//                             ? "bg-[#e6f4f6] border-[#bfe6eb] text-[#106C89]"
//                             : "bg-white border-gray-200 text-slate-700"
//                         }`}
//                       >
//                         Consult Online
//                       </button>
//                     </div>
//                   </div>
//                 </form>

//                 {/* small helper row */}
//                 <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
//                   <div>Tip: You can type a speciality if it's not in the list.</div>
//                   <div className="hidden sm:flex items-center gap-2">
//                     <span className="px-2 py-0.5 bg-sky-50 rounded-full text-[#106C89]">Verified</span>
//                     <span className="px-2 py-0.5 bg-slate-50 rounded-full">Secure booking</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Browse by specialties */}
//         <section className="mt-8">
//           <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-xl font-semibold text-slate-900">Browse by Specialities</h3>
//               <button
//                 onClick={() =>
//                   navigate("/search-results", {
//                     state: { specialty: "", location: "", date: "", visitType },
//                   })
//                 }
//                 className="text-sm text-[#106C89] inline-flex items-center gap-2"
//               >
//                 View all <ChevronRight className="w-4 h-4" />
//               </button>
//             </div>

//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
//               {SPECIALTIES.map((s) => (
//                 <button
//                   key={s}
//                   onClick={() =>
//                     navigate("/search-results", {
//                       state: { specialty: s, location: location || "", date: date || "", visitType },
//                     })
//                   }
//                   className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-white hover:shadow-md transition text-left"
//                   aria-label={`Search ${s}`}
//                 >
//                   <div className="bg-[#f1fbfc] text-[#106C89] p-2 rounded-lg">
//                     <Stethoscope className="w-5 h-5" />
//                   </div>
//                   <div className="flex-1">
//                     <div className="text-sm font-medium text-slate-900">{s}</div>
//                     <div className="text-xs text-gray-500 mt-0.5">Expert care</div>
//                   </div>
//                 </button>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Optional promotional / info row */}
//         <section className="mt-6">
//           <div className="rounded-2xl bg-gradient-to-r from-[#f7fdfd] to-white p-6 border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
//             <div>
//               <h4 className="text-lg font-semibold text-slate-900">Trusted healthcare, at your convenience</h4>
//               <p className="text-sm text-gray-600 mt-1">Verified doctors · Secure payments · Easy rescheduling</p>
//             </div>
//             <div className="flex gap-3">
//               <button
//                 onClick={() => navigate("/about")}
//                 className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm"
//               >
//                 Learn more
//               </button>
//               <button
//                 onClick={() =>
//                   navigate("/search-results", {
//                     state: { specialty: "", location: "", date: "", visitType },
//                   })
//                 }
//                 className="px-4 py-2 rounded-lg bg-[#28328C] text-white text-sm"
//               >
//                 Start searching
//               </button>
//             </div>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default AllDoctor;
