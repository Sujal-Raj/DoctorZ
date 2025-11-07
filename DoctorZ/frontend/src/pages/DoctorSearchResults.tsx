// import React, { useEffect, useMemo, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   MapPin,
//   Calendar,
//   Stethoscope,
//   Search as SearchIcon,
//   Filter,
//   Languages,
// } from "lucide-react";
// import { Helmet } from "react-helmet";
// import DoctorCard from "../components/DoctorCard";
// import BookingDrawer from "../components/BookingDrawer";

// type Doctor = {
//   _id: string;
//   fullName: string;
//   specialization: string;
//   consultationFee: number;
//   location: string;
//   city?: string;
//   languages?: string[];
//   slots?: { date: string }[];
//   photo?: string;
// };

// type SearchState = {
//   location?: string;
//   specialty?: string;
//   date?: string;
// };

// const DoctorSearchResults: React.FC = () => {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const searchState = (state || {}) as SearchState;

//   const [doctors, setDoctors] = useState<Doctor[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const doctorsPerPage = 6;

//   const [specialty, setSpecialty] = useState(searchState.specialty || "");
//   const [locationValue, setLocationValue] = useState(searchState.location || "");
//   const [date, setDate] = useState(searchState.date || "");
//   const [languages, setLanguages] = useState<string[]>([]);

//   const availableLanguages = [
//     "English",
//     "Hindi",
//     "Telugu",
//     "Tamil",
//     "Malayalam",
//     "Marathi",
//     "Bengali",
//   ];

//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const res = await axios.get("http://localhost:3000/api/doctor/allDoctors");
//         const data = Array.isArray(res.data)
//           ? res.data
//           : res.data?.doctors ?? res.data;
//         setDoctors(data);
//       } catch (e) {
//         console.error("Error fetching doctors:", e);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchDoctors();
//   }, []);

//   const hasSlotForDate = (doc: Doctor, date?: string) => {
//     if (!date) return true;
//     if (!Array.isArray(doc?.slots)) return false;
//     return doc.slots.some((s) => s.date === date);
//   };

//   const filtered = useMemo(() => {
//     const loc = (locationValue || "").trim().toLowerCase();
//     const spec = (specialty || "").trim().toLowerCase();
//     const dateVal = (date || "").trim();

//     return doctors.filter((d) => {
//       const matchesSpec =
//         !spec ||
//         d.specialization?.toLowerCase().includes(spec) ||
//         d.fullName?.toLowerCase().includes(spec);

//       const matchesLocation =
//         !loc ||
//         d.location?.toLowerCase().includes(loc) ||
//         d.city?.toLowerCase().includes(loc);

//       const matchesLanguage =
//         languages.length === 0 ||
//         languages.some((lang) =>
//           d.languages?.map((l) => l.toLowerCase()).includes(lang.toLowerCase())
//         );

//       const matchesDate = hasSlotForDate(d, dateVal);

//       return matchesSpec && matchesLocation && matchesLanguage && matchesDate;
//     });
//   }, [doctors, specialty, locationValue, date, languages]);

//   const indexOfLastDoctor = currentPage * doctorsPerPage;
//   const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
//   const currentDoctors = filtered.slice(indexOfFirstDoctor, indexOfLastDoctor);
//   const totalPages = Math.ceil(filtered.length / doctorsPerPage);

//   const toggleLanguage = (lang: string) => {
//     setLanguages((prev) =>
//       prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
//     );
//   };

//   const openBooking = (doc: Doctor) => {
//     setSelectedDoctor(doc);
//     setDrawerOpen(true);
//   };

//   const handleSearch = () => {
//     setCurrentPage(1);
//     navigate("/search-results", {
//       state: { location: locationValue, specialty, date },
//       replace: true,
//     });
//   };

//   const clearFilters = () => {
//     setSpecialty("");
//     setLocationValue("");
//     setDate("");
//     setLanguages([]);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-10">
//       <Helmet>
//         <title>Consult Doctors Online | DoctorZ</title>
//         <meta
//           name="description"
//           content="Find and consult top doctors online by specialization, experience, and language on DoctorZ."
//         />
//       </Helmet>

//       <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 px-4 sm:px-6 lg:px-8">
//         {/* Sidebar Filters */}
//         <aside className="w-full lg:w-1/4 bg-white rounded-2xl border border-gray-200 shadow-sm p-6 h-fit sticky top-8 self-start">
//           <div className="flex items-center justify-between mb-5">
//             <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
//               <Filter className="w-5 h-5 text-[#106C89]" /> Filters
//             </h2>
//             <button
//               onClick={clearFilters}
//               className="text-[#106C89] text-sm font-medium hover:underline"
//             >
//               Clear
//             </button>
//           </div>

//           <div className="space-y-6 overflow-y-auto max-h-[70vh] pr-1">
//             <div>
//               <label className="text-sm font-semibold text-gray-700">
//                 Mode of Consult
//               </label>
//               <div className="mt-2 space-y-2 text-sm text-gray-600">
//                 <label className="flex items-center gap-2">
//                   <input type="checkbox" className="accent-[#106C89]" /> Hospital Visit
//                 </label>
//                 <label className="flex items-center gap-2">
//                   <input type="checkbox" className="accent-[#106C89]" /> Online Consult
//                 </label>
//               </div>
//             </div>

//             <div>
//               <label className="text-sm font-semibold text-gray-700">
//                 Experience (Years)
//               </label>
//               <div className="mt-2 space-y-2 text-sm text-gray-600">
//                 {["0-5", "6-10", "11-15", "15+"].map((exp) => (
//                   <label key={exp} className="flex items-center gap-2">
//                     <input type="checkbox" className="accent-[#106C89]" /> {exp}
//                   </label>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <label className="text-sm font-semibold text-gray-700">
//                 Fee Range
//               </label>
//               <div className="mt-2 space-y-2 text-sm text-gray-600">
//                 {["100-500", "500-1000", "1000+"].map((fee) => (
//                   <label key={fee} className="flex items-center gap-2">
//                     <input type="checkbox" className="accent-[#106C89]" /> ₹{fee}
//                   </label>
//                 ))}
//               </div>
//             </div>

//             {/* Language Filter */}
//             <div>
//               <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
//                 <Languages className="w-4 h-4 text-[#106C89]" /> Languages
//               </label>
//               <div className="mt-2 space-y-2 text-sm text-gray-600">
//                 {availableLanguages.map((lang) => (
//                   <label key={lang} className="flex items-center gap-2">
//                     <input
//                       type="checkbox"
//                       className="accent-[#106C89]"
//                       checked={languages.includes(lang)}
//                       onChange={() => toggleLanguage(lang)}
//                     />
//                     {lang}
//                   </label>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </aside>

//         {/* Results Section */}
//         <section className="flex-1">
//           {/* Top header */}
//           <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 flex flex-col md:flex-row justify-between items-center mb-6">
//             <h1 className="text-xl md:text-2xl font-semibold text-gray-800 text-center md:text-left">
//               {specialty ? `Consult ${specialty}s Online` : "Available Doctors"}
//             </h1>
//             <span className="text-sm text-gray-600 mt-3 md:mt-0">
//               {filtered.length} doctors found
//             </span>
//           </div>

//           {/* Search Inputs */}
//           <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-8">
//             <div className="flex flex-col md:flex-row gap-4">
//               <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 w-full md:w-1/3">
//                 <Stethoscope className="w-5 h-5 text-gray-500" />
//                 <input
//                   type="text"
//                   placeholder="Specialty"
//                   className="w-full outline-none text-gray-700"
//                   value={specialty}
//                   onChange={(e) => setSpecialty(e.target.value)}
//                 />
//               </div>

//               <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 w-full md:w-1/3">
//                 <MapPin className="w-5 h-5 text-gray-500" />
//                 <input
//                   type="text"
//                   placeholder="Location"
//                   className="w-full outline-none text-gray-700"
//                   value={locationValue}
//                   onChange={(e) => setLocationValue(e.target.value)}
//                 />
//               </div>

//               <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 w-full md:w-1/3">
//                 <Calendar className="w-5 h-5 text-gray-500" />
//                 <input
//                   type="date"
//                   className="w-full outline-none text-gray-700"
//                   value={date}
//                   onChange={(e) => setDate(e.target.value)}
//                 />
//               </div>

//               <button
//                 onClick={handleSearch}
//                 className="flex items-center justify-center gap-2 w-full md:w-auto bg-[#106C89] hover:bg-[#0d5a70] text-white font-medium px-6 py-2.5 rounded-lg shadow-md transition"
//               >
//                 <SearchIcon className="w-5 h-5" /> Search
//               </button>
//             </div>
//           </div>

//           {/* Doctor Cards */}
//           {loading ? (
//             <div className="bg-white p-8 rounded-2xl shadow text-center">
//               <div className="animate-spin w-8 h-8 border-b-2 border-[#106C89] mx-auto rounded-full mb-3"></div>
//               <p>Loading doctors...</p>
//             </div>
//           ) : filtered.length === 0 ? (
//             <div className="bg-white p-10 rounded-2xl shadow text-center text-gray-700">
//               No doctors found matching your filters.
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 place-items-center gap-8">
//               {currentDoctors.map((doc) => (
//                 <div key={doc._id} className="w-full max-w-3xl transition-transform hover:scale-[1.01]">
//                   <DoctorCard doctor={doc} onConsult={(d) => openBooking(d)} />
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <div className="flex justify-center mt-10 gap-2">
//               {Array.from({ length: totalPages }).map((_, i) => (
//                 <button
//                   key={i}
//                   onClick={() => setCurrentPage(i + 1)}
//                   className={`px-4 py-2 rounded-lg border text-sm font-medium transition ${
//                     currentPage === i + 1
//                       ? "bg-[#106C89] text-white border-[#106C89]"
//                       : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
//                   }`}
//                 >
//                   {i + 1}
//                 </button>
//               ))}
//             </div>
//           )}
//         </section>
//       </div>

//       {/* Booking Drawer */}
//       <BookingDrawer
//         open={drawerOpen}
//         doctor={
//           selectedDoctor
//             ? {
//                 _id: selectedDoctor._id,
//                 fullName: selectedDoctor.fullName,
//                 photo: selectedDoctor.photo,
//                 specialization: selectedDoctor.specialization,
//                 fees: selectedDoctor.consultationFee,
//               }
//             : null
//         }
//         onClose={() => {
//           setDrawerOpen(false);
//           setSelectedDoctor(null);
//         }}
//         onBooked={() => {
//           setDrawerOpen(false);
//           setSelectedDoctor(null);
//         }}
//         variant="modal"
//       />
//     </div>
//   );
// };

// export default DoctorSearchResults;

// // pages/DoctorSearchResults.tsx
// import React, { useEffect, useMemo, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   MapPin,
//   Calendar,
//   Stethoscope,
//   Search as SearchIcon,
//   Filter,
// } from "lucide-react";
// import { Helmet } from "react-helmet";
// import DoctorCard from "../components/DoctorCard";
// import BookingDrawer from "../components/BookingDrawer"; // keep your drawer, or replace as required

// type SearchState = {
//   location?: string;
//   specialty?: string;
//   date?: string;
// };

// const API = "http://localhost:3000/api/doctor/allDoctors";

// const DoctorSearchResults: React.FC = () => {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const searchState = (state || {}) as SearchState;

//   const [doctors, setDoctors] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [selectedDoctor, setSelectedDoctor] = useState<any | null>(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const doctorsPerPage = 6;

//   const [specialty, setSpecialty] = useState(searchState.specialty || "");
//   const [locationValue, setLocationValue] = useState(searchState.location || "");
//   const [date, setDate] = useState(searchState.date || "");

//   // Filter UI states (checkboxes)
//   const [modeHospital, setModeHospital] = useState(true);
//   const [modeOnline, setModeOnline] = useState(true);
//   const [expFilters, setExpFilters] = useState<string[]>([]);
//   const [feeFilters, setFeeFilters] = useState<string[]>([]);
//   const [languageFilters, setLanguageFilters] = useState<string[]>([]);

//   useEffect(() => {
//     const fetchDoctors = async () => {
//       setLoading(true);
//       try {
//         const res = await axios.get(API);
//         const data = Array.isArray(res.data)
//           ? res.data
//           : res.data?.doctors ?? res.data;
//         setDoctors(data || []);
//       } catch (e) {
//         console.error("Error fetching doctors:", e);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchDoctors();
//   }, []);

//   const hasSlotForDate = (doc: any, date?: string) => {
//     if (!date) return true;
//     if (!Array.isArray(doc?.slots)) return false;
//     return doc.slots.some((s: { date: string }) => s.date === date);
//   };

//   // client-side "near me" filtering using simple distance calc if doctor has lat/lng
//   const showNearMe = async () => {
//     if (!navigator.geolocation) {
//       alert("Geolocation not supported by your browser.");
//       return;
//     }
//     setLoading(true);
//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         const { latitude: lat, longitude: lng } = pos.coords;
//         // simple approximate: filter doctors whose distance < 50 km if they have coords
//         const approx = doctors.filter((d) => {
//           if (!d.lat || !d.lng) return false;
//           const R = 6371; // km
//           const dLat = ((d.lat - lat) * Math.PI) / 180;
//           const dLon = ((d.lng - lng) * Math.PI) / 180;
//           const a =
//             Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//             Math.cos((lat * Math.PI) / 180) *
//               Math.cos((d.lat * Math.PI) / 180) *
//               Math.sin(dLon / 2) *
//               Math.sin(dLon / 2);
//           const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//           const dist = R * c;
//           return dist <= 50;
//         });
//         setDoctors(approx);
//         setLoading(false);
//       },
//       (err) => {
//         setLoading(false);
//         console.error(err);
//         alert("Unable to get your location.");
//       }
//     );
//   };

//   const filtered = useMemo(() => {
//     const loc = (locationValue || "").trim().toLowerCase();
//     const spec = (specialty || "").trim().toLowerCase();
//     const dateVal = (date || "").trim();

//     return doctors.filter((d: any) => {
//       const matchesSpec =
//         !spec ||
//         (d.specialization && d.specialization.toLowerCase().includes(spec)) ||
//         (d.fullName && d.fullName.toLowerCase().includes(spec));

//       const matchesLocation =
//         !loc ||
//         (d.location && d.location.toLowerCase().includes(loc)) ||
//         (d.city && d.city.toLowerCase().includes(loc));

//       const matchesDate = hasSlotForDate(d, dateVal);

//       // Mode filter - if both checked, allow; if only one checked then filter
//       const supportsHospital = d.modeOfConsult?.includes("hospital") ?? true;
//       const supportsOnline = d.modeOfConsult?.includes("online") ?? true;
//       if (!((modeHospital && supportsHospital) || (modeOnline && supportsOnline))) {
//         return false;
//       }

//       // Experience filter: each expFilter like "0-5" or "15+"
//       if (expFilters.length > 0) {
//         const exp = d.experience ?? 0;
//         const matchesExp = expFilters.some((ef) => {
//           if (ef === "15+") return exp >= 15;
//           const [min, max] = ef.split("-").map(Number);
//           return exp >= min && exp <= max;
//         });
//         if (!matchesExp) return false;
//       }

//       // Fee filter: "100-500", "500-1000", "1000+"
//       if (feeFilters.length > 0) {
//         const fee = d.consultationFee ?? 0;
//         const matchesFee = feeFilters.some((ff) => {
//           if (ff === "1000+") return fee >= 1000;
//           const [min, max] = ff.split("-").map(Number);
//           return fee >= min && fee <= max;
//         });
//         if (!matchesFee) return false;
//       }

//       // Language filters
//       if (languageFilters.length > 0) {
//         const langs: string[] = d.languages ?? [];
//         const matchesLang = languageFilters.every((lf) =>
//           langs.map((x) => x.toLowerCase()).includes(lf.toLowerCase())
//         );
//         if (!matchesLang) return false;
//       }

//       return matchesSpec && matchesLocation && matchesDate;
//     });
//   }, [
//     doctors,
//     specialty,
//     locationValue,
//     date,
//     modeHospital,
//     modeOnline,
//     expFilters,
//     feeFilters,
//     languageFilters,
//   ]);

//   const indexOfLastDoctor = currentPage * doctorsPerPage;
//   const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
//   const currentDoctors = filtered.slice(indexOfFirstDoctor, indexOfLastDoctor);
//   const totalPages = Math.ceil(filtered.length / doctorsPerPage);

//   const toggleExp = (val: string) => {
//     setExpFilters((s) => (s.includes(val) ? s.filter((x) => x !== val) : [...s, val]));
//     setCurrentPage(1);
//   };
//   const toggleFee = (val: string) => {
//     setFeeFilters((s) => (s.includes(val) ? s.filter((x) => x !== val) : [...s, val]));
//     setCurrentPage(1);
//   };
//   const toggleLang = (val: string) => {
//     setLanguageFilters((s) => (s.includes(val) ? s.filter((x) => x !== val) : [...s, val]));
//     setCurrentPage(1);
//   };

//   const openBooking = (doc: any) => {
//     setSelectedDoctor(doc);
//     setDrawerOpen(true);
//   };

//   const handleSearch = () => {
//     setCurrentPage(1);
//     navigate("/search-results", {
//       state: { location: locationValue, specialty, date },
//       replace: true,
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Helmet>
//         <title>Consult Doctors Online | DoctorZ</title>
//         <meta
//           name="description"
//           content="Find and consult top doctors online by specialization, experience, and location on DoctorZ."
//         />
//       </Helmet>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
//         {/* left filter column */}
//         <aside className="lg:col-span-3 bg-white rounded-lg border border-gray-200 shadow-sm p-6 sticky top-6 h-fit">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
//             <button
//               onClick={() => {
//                 setSpecialty("");
//                 setLocationValue("");
//                 setDate("");
//                 setModeHospital(true);
//                 setModeOnline(true);
//                 setExpFilters([]);
//                 setFeeFilters([]);
//                 setLanguageFilters([]);
//               }}
//               className="text-sm text-teal-700 hover:underline"
//             >
//               Clear All
//             </button>
//           </div>

//           <div className="space-y-4">
//             <button
//               onClick={showNearMe}
//               className="w-full border border-teal-500 text-teal-700 text-sm font-medium rounded-md py-2 hover:bg-teal-50"
//             >
//               Show Doctors Near Me
//             </button>

//             <div className="pt-2 border-t">
//               <h4 className="text-sm font-medium text-gray-700 mb-2">Mode of Consult</h4>
//               <label className="flex items-center gap-2 text-sm text-gray-600 mb-1">
//                 <input
//                   type="checkbox"
//                   checked={modeHospital}
//                   onChange={() => setModeHospital((s) => !s)}
//                   className="accent-teal-600"
//                 />
//                 Hospital Visit
//               </label>
//               <label className="flex items-center gap-2 text-sm text-gray-600">
//                 <input
//                   type="checkbox"
//                   checked={modeOnline}
//                   onChange={() => setModeOnline((s) => !s)}
//                   className="accent-teal-600"
//                 />
//                 Online Consult
//               </label>
//             </div>

//             <div>
//               <h4 className="text-sm font-medium text-gray-700 mb-2">Experience (In Years)</h4>
//               {["0-5", "6-10", "11-15", "15+"].map((exp) => (
//                 <label key={exp} className="flex items-center gap-2 text-sm text-gray-600 mb-1">
//                   <input
//                     type="checkbox"
//                     checked={expFilters.includes(exp)}
//                     onChange={() => toggleExp(exp)}
//                     className="accent-teal-600"
//                   />
//                   {exp}
//                 </label>
//               ))}
//             </div>

//             <div>
//               <h4 className="text-sm font-medium text-gray-700 mb-2">Fees (In Rupees)</h4>
//               {["100-500", "500-1000", "1000+"].map((fee) => (
//                 <label key={fee} className="flex items-center gap-2 text-sm text-gray-600 mb-1">
//                   <input
//                     type="checkbox"
//                     checked={feeFilters.includes(fee)}
//                     onChange={() => toggleFee(fee)}
//                     className="accent-teal-600"
//                   />
//                   ₹ {fee}
//                 </label>
//               ))}
//             </div>

//             <div>
//               <h4 className="text-sm font-medium text-gray-700 mb-2">Language</h4>
//               {["English", "Hindi", "Marathi", "Bengali"].map((lang) => (
//                 <label key={lang} className="flex items-center gap-2 text-sm text-gray-600 mb-1">
//                   <input
//                     type="checkbox"
//                     checked={languageFilters.includes(lang)}
//                     onChange={() => toggleLang(lang)}
//                     className="accent-teal-600"
//                   />
//                   {lang}
//                 </label>
//               ))}
//             </div>
//           </div>
//         </aside>

//         {/* center results column */}
//         <main className="lg:col-span-7">
//           <div className="flex items-center justify-between mb-6">
//             <div>
//               <nav className="text-sm text-gray-500 mb-2">
//                 Home &gt; Doctors &gt; <span className="text-gray-700">Cardiologists</span>
//               </nav>
//               <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
//                 {specialty ? `Consult ${specialty}s Online` : "Available Doctors"}
//               </h1>
//               <p className="text-sm text-gray-600 mt-1">{filtered.length} doctors</p>
//             </div>

//             {/* sort / controls (kept minimal to match screenshot) */}
//             <div className="flex items-center gap-3">
//               <div className="border rounded-lg px-4 py-2 text-sm text-gray-700">Relevance ▾</div>
//             </div>
//           </div>

//           {/* search bar inline like practo */}
//           <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6 shadow-sm">
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
//               <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2">
//                 <Stethoscope className="w-5 h-5 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Specialty"
//                   className="w-full outline-none text-gray-700"
//                   value={specialty}
//                   onChange={(e) => setSpecialty(e.target.value)}
//                 />
//               </div>

//               <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2">
//                 <MapPin className="w-5 h-5 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Location"
//                   className="w-full outline-none text-gray-700"
//                   value={locationValue}
//                   onChange={(e) => setLocationValue(e.target.value)}
//                 />
//               </div>

//               <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2">
//                 <Calendar className="w-5 h-5 text-gray-400" />
//                 <input
//                   type="date"
//                   className="w-full outline-none text-gray-700"
//                   value={date}
//                   onChange={(e) => setDate(e.target.value)}
//                 />
//               </div>

//               <button
//                 onClick={handleSearch}
//                 className="flex items-center justify-center gap-2 bg-teal-700 hover:bg-teal-800 text-white font-medium rounded-lg px-4"
//               >
//                 <SearchIcon className="w-4 h-4" />
//                 Search
//               </button>
//             </div>
//           </div>

//           {/* cards */}
//           {loading ? (
//             <div className="bg-white rounded-lg p-8 shadow-sm text-center">
//               <div className="inline-block w-10 h-10 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mb-3" />
//               <div className="text-gray-600">Loading doctors...</div>
//             </div>
//           ) : filtered.length === 0 ? (
//             <div className="bg-white rounded-lg p-8 shadow-sm text-center">
//               <div className="text-gray-700">No doctors found matching your filters.</div>
//             </div>
//           ) : (
//             <div className="space-y-6">
//               {currentDoctors.map((doc) => (
//                 <DoctorCard key={doc._id} doctor={doc} onConsult={openBooking} />
//               ))}
//             </div>
//           )}

//           {/* pagination */}
//           {totalPages > 1 && (
//             <div className="flex justify-center mt-6">
//               <div className="inline-flex gap-2">
//                 {Array.from({ length: totalPages }).map((_, i) => (
//                   <button
//                     key={i}
//                     onClick={() => setCurrentPage(i + 1)}
//                     className={`px-4 py-2 rounded-md border ${
//                       currentPage === i + 1
//                         ? "bg-teal-700 text-white border-teal-700"
//                         : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
//                     }`}
//                   >
//                     {i + 1}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}
//         </main>

//         {/* right help card */}
//         <aside className="lg:col-span-2 hidden lg:block">
//           <div className="bg-[#08263a] text-white rounded-lg p-5 shadow-md">
//             <div className="flex items-center gap-3 mb-4">
//               {/* Very small circular avatars like screenshot */}
//               <div className="w-10 h-10 rounded-full bg-white/10"></div>
//               <div className="w-10 h-10 rounded-full bg-white/10"></div>
//               <div className="w-10 h-10 rounded-full bg-white/10"></div>
//             </div>
//             <h3 className="font-semibold text-lg">Need help consult the right doctor?</h3>
//             <p className="text-sm mt-3 leading-snug">Call <span className="font-medium">+91-8040245807</span> to book instantly</p>
//             <a
//               href="tel:+918040245807"
//               className="inline-block mt-4 bg-white text-[#08263a] font-medium px-4 py-2 rounded"
//             >
//               Call Now
//             </a>
//           </div>
//         </aside>
//       </div>

//       {/* keep your BookingDrawer; three props used below */}
//       <BookingDrawer
//         open={drawerOpen}
//         doctor={
//           selectedDoctor
//             ? {
//                 _id: selectedDoctor._id,
//                 fullName: selectedDoctor.fullName,
//                 photo: selectedDoctor.photo,
//                 specialization: selectedDoctor.specialization,
//                 fees: selectedDoctor.consultationFee,
//               }
//             : null
//         }
//         onClose={() => {
//           setDrawerOpen(false);
//           setSelectedDoctor(null);
//         }}
//         onBooked={() => {
//           setDrawerOpen(false);
//           setSelectedDoctor(null);
//         }}
//         variant="modal"
//       />
//     </div>
//   );
// };

// export default DoctorSearchResults;

// // pages/DoctorSearchResults.tsximport React, { useEffect, useMemo, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   MapPin,
//   Calendar,
//   Stethoscope,
//   Search as SearchIcon,
//   Filter,
//   X,
// } from "lucide-react";
// import { Helmet } from "react-helmet";
// import DoctorCard from "../components/DoctorCard";
// import BookingDrawer from "../components/BookingDrawer";
// import { useEffect, useMemo, useState } from "react";

// type SearchState = {
//   location?: string;
//   specialty?: string;
//   date?: string;
// };

// const API = "http://localhost:3000/api/doctor/allDoctors";

// const DoctorSearchResults: React.FC = () => {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const searchState = (state || {}) as SearchState;

//   const [doctors, setDoctors] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [selectedDoctor, setSelectedDoctor] = useState<any | null>(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const doctorsPerPage = 6;

//   const [specialty, setSpecialty] = useState(searchState.specialty || "");
//   const [locationValue, setLocationValue] = useState(
//     searchState.location || ""
//   );
//   const [date, setDate] = useState(searchState.date || "");

//   const [modeHospital, setModeHospital] = useState(true);
//   const [modeOnline, setModeOnline] = useState(true);
//   const [expFilters, setExpFilters] = useState<string[]>([]);
//   const [feeFilters, setFeeFilters] = useState<string[]>([]);
//   const [languageFilters, setLanguageFilters] = useState<string[]>([]);

//   const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

//   // ✅ Fetch Doctors
//   useEffect(() => {
//     const fetchDoctors = async () => {
//       setLoading(true);
//       try {
//         const res = await axios.get(API);
//         const data = Array.isArray(res.data)
//           ? res.data
//           : res.data?.doctors ?? res.data;
//         setDoctors(data || []);
//       } catch (e) {
//         console.error("Error fetching doctors:", e);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchDoctors();
//   }, []);

//   // ✅ Utility for date filter
//   const hasSlotForDate = (doc: any, date?: string) => {
//     if (!date) return true;
//     if (!Array.isArray(doc?.slots)) return false;
//     return doc.slots.some((s: { date: string }) => s.date === date);
//   };

//   // ✅ Geolocation “Near Me”
//   const showNearMe = async () => {
//     if (!navigator.geolocation) {
//       alert("Geolocation not supported by your browser.");
//       return;
//     }
//     setLoading(true);
//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         const { latitude: lat, longitude: lng } = pos.coords;
//         const approx = doctors.filter((d) => {
//           if (!d.lat || !d.lng) return false;
//           const R = 6371;
//           const dLat = ((d.lat - lat) * Math.PI) / 180;
//           const dLon = ((d.lng - lng) * Math.PI) / 180;
//           const a =
//             Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//             Math.cos((lat * Math.PI) / 180) *
//               Math.cos((d.lat * Math.PI) / 180) *
//               Math.sin(dLon / 2) *
//               Math.sin(dLon / 2);
//           const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//           const dist = R * c;
//           return dist <= 50;
//         });
//         setDoctors(approx);
//         setLoading(false);
//       },
//       (err) => {
//         setLoading(false);
//         console.error(err);
//         alert("Unable to get your location.");
//       }
//     );
//   };

//   // ✅ Filtering Logic
//   const filtered = useMemo(() => {
//     const loc = (locationValue || "").trim().toLowerCase();
//     const spec = (specialty || "").trim().toLowerCase();
//     const dateVal = (date || "").trim();

//     return doctors.filter((d: any) => {
//       const matchesSpec =
//         !spec ||
//         (d.specialization && d.specialization.toLowerCase().includes(spec)) ||
//         (d.fullName && d.fullName.toLowerCase().includes(spec));

//       const matchesLocation =
//         !loc ||
//         (d.location && d.location.toLowerCase().includes(loc)) ||
//         (d.city && d.city.toLowerCase().includes(loc));

//       const matchesDate = hasSlotForDate(d, dateVal);

//       const supportsHospital = d.modeOfConsult?.includes("hospital") ?? true;
//       const supportsOnline = d.modeOfConsult?.includes("online") ?? true;
//       if (
//         !((modeHospital && supportsHospital) || (modeOnline && supportsOnline))
//       )
//         return false;

//       if (expFilters.length > 0) {
//         const exp = d.experience ?? 0;
//         const matchesExp = expFilters.some((ef) => {
//           if (ef === "15+") return exp >= 15;
//           const [min, max] = ef.split("-").map(Number);
//           return exp >= min && exp <= max;
//         });
//         if (!matchesExp) return false;
//       }

//       if (feeFilters.length > 0) {
//         const fee = d.consultationFee ?? 0;
//         const matchesFee = feeFilters.some((ff) => {
//           if (ff === "1000+") return fee >= 1000;
//           const [min, max] = ff.split("-").map(Number);
//           return fee >= min && fee <= max;
//         });
//         if (!matchesFee) return false;
//       }

//       if (languageFilters.length > 0) {
//         const langs: string[] = d.languages ?? [];
//         const matchesLang = languageFilters.every((lf) =>
//           langs.map((x) => x.toLowerCase()).includes(lf.toLowerCase())
//         );
//         if (!matchesLang) return false;
//       }

//       return matchesSpec && matchesLocation && matchesDate;
//     });
//   }, [
//     doctors,
//     specialty,
//     locationValue,
//     date,
//     modeHospital,
//     modeOnline,
//     expFilters,
//     feeFilters,
//     languageFilters,
//   ]);

//   const indexOfLastDoctor = currentPage * doctorsPerPage;
//   const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
//   const currentDoctors = filtered.slice(indexOfFirstDoctor, indexOfLastDoctor);
//   const totalPages = Math.ceil(filtered.length / doctorsPerPage);

//   const toggleExp = (val: string) =>
//     setExpFilters((s) =>
//       s.includes(val) ? s.filter((x) => x !== val) : [...s, val]
//     );
//   const toggleFee = (val: string) =>
//     setFeeFilters((s) =>
//       s.includes(val) ? s.filter((x) => x !== val) : [...s, val]
//     );
//   const toggleLang = (val: string) =>
//     setLanguageFilters((s) =>
//       s.includes(val) ? s.filter((x) => x !== val) : [...s, val]
//     );

//   const openBooking = (doc: any) => {
//     setSelectedDoctor(doc);
//     setDrawerOpen(true);
//   };

//   const handleSearch = () => {
//     setCurrentPage(1);
//     navigate("/search-results", {
//       state: { location: locationValue, specialty, date },
//       replace: true,
//     });
//   };

//   const clearFilters = () => {
//     setSpecialty("");
//     setLocationValue("");
//     setDate("");
//     setModeHospital(true);
//     setModeOnline(true);
//     setExpFilters([]);
//     setFeeFilters([]);
//     setLanguageFilters([]);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Helmet>
//         <title>Consult Doctors Online | DoctorZ</title>
//         <meta
//           name="description"
//           content="Find and consult top doctors online by specialization, experience, and location on DoctorZ."
//         />
//       </Helmet>

//       <div className="max-w-[1500px] mx-auto px-3 sm:px-4 py-5 grid grid-cols-1 lg:grid-cols-12 gap-6">
//         {/* Sidebar Filters (Desktop) */}
//         <aside className="lg:col-span-3 hidden lg:block sticky top-24 self-start">
//           <FilterPanel
//             showNearMe={showNearMe}
//             clearFilters={clearFilters}
//             modeHospital={modeHospital}
//             setModeHospital={setModeHospital}
//             modeOnline={modeOnline}
//             setModeOnline={setModeOnline}
//             expFilters={expFilters}
//             toggleExp={toggleExp}
//             feeFilters={feeFilters}
//             toggleFee={toggleFee}
//             languageFilters={languageFilters}
//             toggleLang={toggleLang}
//           />
//         </aside>

//         {/* Main Content */}
//         <main className="lg:col-span-7">
//           {/* Breadcrumb + Title */}
//           <div className="flex items-center justify-between mb-4">
//             <div>
//               <nav className="text-sm text-gray-500 mb-1">
//                 Home &gt; Doctors &gt;{" "}
//                 <span className="text-gray-700">{specialty || "All"}</span>
//               </nav>
//               <h1 className="text-2xl font-bold text-gray-900">
//                 {specialty ? `Consult ${specialty}s Online` : "Available Doctors"}
//               </h1>
//               <p className="text-sm text-gray-600 mt-0.5">
//                 {filtered.length} doctors found
//               </p>
//             </div>
//             <button
//               onClick={() => setMobileFilterOpen(true)}
//               className="lg:hidden flex items-center gap-2 px-3 py-2 border border-teal-700 text-teal-700 rounded-md text-sm font-medium"
//             >
//               <Filter size={16} />
//               Filters
//             </button>
//           </div>

//           {/* Search Bar */}
//           <div className="bg-white border border-gray-100 rounded-lg p-3 mb-4 shadow-sm">
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
//               <SearchInput
//                 icon={<Stethoscope className="w-4 h-4 text-gray-400" />}
//                 placeholder="Specialty"
//                 value={specialty}
//                 onChange={setSpecialty}
//               />
//               <SearchInput
//                 icon={<MapPin className="w-4 h-4 text-gray-400" />}
//                 placeholder="Location"
//                 value={locationValue}
//                 onChange={setLocationValue}
//               />
//               <SearchInput
//                 icon={<Calendar className="w-4 h-4 text-gray-400" />}
//                 type="date"
//                 value={date}
//                 onChange={setDate}
//               />
//               <button
//                 onClick={handleSearch}
//                 className="flex items-center justify-center gap-2 bg-[#28328C] hover:bg-[#1f286f] text-white font-medium rounded-lg px-4 py-1.5 border border-[#1f286f] transition-all duration-200"

//               >
//                 <SearchIcon className="w-4 h-4" />
//                 Search
//               </button>
//             </div>
//           </div>

//           {/* Doctor Cards */}
//           {loading ? (
//             <div className="bg-white rounded-lg p-6 shadow-sm text-center">
//               <div className="inline-block w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mb-2" />
//               <div className="text-gray-600">Loading doctors...</div>
//             </div>
//           ) : filtered.length === 0 ? (
//             <div className="bg-white rounded-lg p-6 shadow-sm text-center">
//               <div className="text-gray-700">
//                 No doctors found matching your filters.
//               </div>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {currentDoctors.map((doc) => (
//                 <DoctorCard key={doc._id} doctor={doc} onConsult={openBooking} />
//               ))}
//             </div>
//           )}

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <div className="flex justify-center mt-5">
//               <div className="inline-flex gap-1.5">
//                 {Array.from({ length: totalPages }).map((_, i) => (
//                   <button
//                     key={i}
//                     onClick={() => setCurrentPage(i + 1)}
//                     className={`px-3 py-1.5 rounded-md border text-sm ${
//                       currentPage === i + 1
//                         ? "bg-teal-700 text-white border-teal-700"
//                         : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
//                     }`}
//                   >
//                     {i + 1}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}
//         </main>

//         {/* Right Help Card */}
//         <aside className="lg:col-span-2 hidden lg:block">
//           <div className="bg-[#08263a] text-white rounded-lg p-4 shadow-md">
//             <h3 className="font-semibold text-base">
//               Need help consulting the right doctor?
//             </h3>
//             <p className="text-sm mt-2 leading-snug">
//               Call <span className="font-medium">+91-8040245807</span> to book
//               instantly
//             </p>
//             <a
//               href="tel:+918040245807"
//               className="inline-block mt-3 bg-white text-[#08263a] font-medium px-3 py-1.5 rounded"
//             >
//               Call Now
//             </a>
//           </div>
//         </aside>
//       </div>

//       {/* Mobile Filter Drawer */}
//       {mobileFilterOpen && (
//         <div className="fixed inset-0 bg-black/40 z-50 flex justify-end">
//           <div className="bg-white w-80 max-w-full h-full p-5 overflow-y-auto shadow-lg">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
//               <button
//                 onClick={() => setMobileFilterOpen(false)}
//                 className="p-1 rounded-full hover:bg-gray-100"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </div>

//             <FilterPanel
//               showNearMe={showNearMe}
//               clearFilters={clearFilters}
//               modeHospital={modeHospital}
//               setModeHospital={setModeHospital}
//               modeOnline={modeOnline}
//               setModeOnline={setModeOnline}
//               expFilters={expFilters}
//               toggleExp={toggleExp}
//               feeFilters={feeFilters}
//               toggleFee={toggleFee}
//               languageFilters={languageFilters}
//               toggleLang={toggleLang}
//             />

//             <button
//               onClick={() => setMobileFilterOpen(false)}
//               className="mt-5 w-full bg-teal-700 text-white py-2 rounded-md font-medium hover:bg-teal-800"
//             >
//               Apply Filters
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Booking Drawer */}
//       <BookingDrawer
//         open={drawerOpen}
//         doctor={
//           selectedDoctor
//             ? {
//                 _id: selectedDoctor._id,
//                 fullName: selectedDoctor.fullName,
//                 photo: selectedDoctor.photo,
//                 specialization: selectedDoctor.specialization,
//                 fees: selectedDoctor.consultationFee,
//               }
//             : null
//         }
//         onClose={() => {
//           setDrawerOpen(false);
//           setSelectedDoctor(null);
//         }}
//         onBooked={() => {
//           setDrawerOpen(false);
//           setSelectedDoctor(null);
//         }}
//         variant="modal"
//       />
//     </div>
//   );
// };

// /* 🔹 Reusable Components */

// const SearchInput = ({
//   icon,
//   placeholder,
//   value,
//   onChange,
//   type = "text",
// }: any) => (
//   <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-1.5">
//     {icon}
//     <input
//       type={type}
//       placeholder={placeholder}
//       className="w-full outline-none text-gray-700"
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//     />
//   </div>
// );

// const FilterPanel = ({
//   showNearMe,
//   clearFilters,
//   modeHospital,
//   setModeHospital,
//   modeOnline,
//   setModeOnline,
//   expFilters,
//   toggleExp,
//   feeFilters,
//   toggleFee,
//   languageFilters,
//   toggleLang,
// }: any) => (
//   <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-5 hover:shadow-lg transition-all duration-300">
//     <div className="flex items-center justify-between mb-4">
//       <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
//       <button
//         onClick={clearFilters}
//         className="text-sm text-teal-700 hover:underline"
//       >
//         Clear All
//       </button>
//     </div>

//     <div className="space-y-4">
//       <button
//         onClick={showNearMe}
//         className="w-full border border-[#28328C] text-[#28328C] text-sm font-medium rounded-md py-2 hover:bg-[#28328C]/10"
//       >
//         Show Doctors Near Me
//       </button>

//       {/* Mode */}
//       <div className="pt-2 border-t">
//         <h4 className="text-sm font-medium text-gray-700 mb-2">
//           Mode of Consult
//         </h4>
//         <label className="flex items-center gap-2 text-sm text-gray-600 mb-1">
//           <input
//             type="checkbox"
//             checked={modeHospital}
//             onChange={() => setModeHospital((s: boolean) => !s)}
//             className="accent-teal-600"
//           />
//           Hospital Visit
//         </label>
//         <label className="flex items-center gap-2 text-sm text-gray-600">
//           <input
//             type="checkbox"
//             checked={modeOnline}
//             onChange={() => setModeOnline((s: boolean) => !s)}
//             className="accent-teal-600"
//           />
//           Online Consult
//         </label>
//       </div>

//       {/* Experience */}
//       <div>
//         <h4 className="text-sm font-medium text-gray-700 mb-2">
//           Experience (Years)
//         </h4>
//         {["0-5", "6-10", "11-15", "15+"].map((exp) => (
//           <label
//             key={exp}
//             className="flex items-center gap-2 text-sm text-gray-600 mb-1"
//           >
//             <input
//               type="checkbox"
//               checked={expFilters.includes(exp)}
//               onChange={() => toggleExp(exp)}
//               className="accent-teal-600"
//             />
//             {exp}
//           </label>
//         ))}
//       </div>

//       {/* Fees */}
//       <div>
//         <h4 className="text-sm font-medium text-gray-700 mb-2">Fees (₹)</h4>
//         {["100-500", "500-1000", "1000+"].map((fee) => (
//           <label
//             key={fee}
//             className="flex items-center gap-2 text-sm text-gray-600 mb-1"
//           >
//             <input
//               type="checkbox"
//               checked={feeFilters.includes(fee)}
//               onChange={() => toggleFee(fee)}
//               className="accent-teal-600"
//             />
//             ₹ {fee}
//           </label>
//         ))}
//       </div>

//       {/* Language */}
//       <div>
//         <h4 className="text-sm font-medium text-gray-700 mb-2">Language</h4>
//         {["English", "Hindi", "Marathi", "Bengali"].map((lang) => (
//           <label
//             key={lang}
//             className="flex items-center gap-2 text-sm text-gray-600 mb-1"
//           >
//             <input
//               type="checkbox"
//               checked={languageFilters.includes(lang)}
//               onChange={() => toggleLang(lang)}
//               className="accent-teal-600"
//             />
//             {lang}
//           </label>
//         ))}
//       </div>
//     </div>
//   </div>
// );

// export default DoctorSearchResults;












// // pages/DoctorSearchResults.tsx
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   MapPin,
//   Calendar,
//   Stethoscope,
//   Search as SearchIcon,
//   SlidersHorizontal,
//   X,
// } from "lucide-react";
// import { Helmet } from "react-helmet";
// import DoctorCard from "../components/DoctorCard";
// import BookingDrawer from "../components/BookingDrawer";
// import { useEffect, useMemo, useState } from "react";

// type SearchState = {
//   location?: string;
//   specialty?: string;
//   date?: string;
// };

// const API = "http://localhost:3000/api/doctor/allDoctors";

// const DoctorSearchResults: React.FC = () => {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const searchState = (state || {}) as SearchState;

//   const [doctors, setDoctors] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [selectedDoctor, setSelectedDoctor] = useState<any | null>(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const doctorsPerPage = 6;

//   const [specialty, setSpecialty] = useState(searchState.specialty || "");
//   const [locationValue, setLocationValue] = useState(searchState.location || "");
//   const [date, setDate] = useState(searchState.date || "");

//   const [modeHospital, setModeHospital] = useState(true);
//   const [modeOnline, setModeOnline] = useState(true);
//   const [expFilters, setExpFilters] = useState<string[]>([]);
//   const [feeFilters, setFeeFilters] = useState<string[]>([]);
//   const [languageFilters, setLanguageFilters] = useState<string[]>([]);
//   const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

//   // ✅ Fetch Doctors
//   useEffect(() => {
//     const fetchDoctors = async () => {
//       setLoading(true);
//       try {
//         const res = await axios.get(API);
//         const data = Array.isArray(res.data)
//           ? res.data
//           : res.data?.doctors ?? res.data;
//         setDoctors(data || []);
//       } catch (e) {
//         console.error("Error fetching doctors:", e);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchDoctors();
//   }, []);

//   // ✅ Utility for date filter
//   const hasSlotForDate = (doc: any, date?: string) => {
//     if (!date) return true;
//     if (!Array.isArray(doc?.slots)) return false;
//     return doc.slots.some((s: { date: string }) => s.date === date);
//   };

//   // ✅ Geolocation “Near Me”
//   const showNearMe = async () => {
//     if (!navigator.geolocation) {
//       alert("Geolocation not supported by your browser.");
//       return;
//     }
//     setLoading(true);
//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         const { latitude: lat, longitude: lng } = pos.coords;
//         const approx = doctors.filter((d) => {
//           if (!d.lat || !d.lng) return false;
//           const R = 6371;
//           const dLat = ((d.lat - lat) * Math.PI) / 180;
//           const dLon = ((d.lng - lng) * Math.PI) / 180;
//           const a =
//             Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//             Math.cos((lat * Math.PI) / 180) *
//               Math.cos((d.lat * Math.PI) / 180) *
//               Math.sin(dLon / 2) *
//               Math.sin(dLon / 2);
//           const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//           const dist = R * c;
//           return dist <= 50;
//         });
//         setDoctors(approx);
//         setLoading(false);
//       },
//       (err) => {
//         setLoading(false);
//         console.error(err);
//         alert("Unable to get your location.");
//       }
//     );
//   };

//   // ✅ Filtering Logic
//   const filtered = useMemo(() => {
//     const loc = (locationValue || "").trim().toLowerCase();
//     const spec = (specialty || "").trim().toLowerCase();
//     const dateVal = (date || "").trim();

//     return doctors.filter((d: any) => {
//       const matchesSpec =
//         !spec ||
//         (d.specialization && d.specialization.toLowerCase().includes(spec)) ||
//         (d.fullName && d.fullName.toLowerCase().includes(spec));

//       const matchesLocation =
//         !loc ||
//         (d.location && d.location.toLowerCase().includes(loc)) ||
//         (d.city && d.city.toLowerCase().includes(loc));

//       const matchesDate = hasSlotForDate(d, dateVal);

//       const supportsHospital = d.modeOfConsult?.includes("hospital") ?? true;
//       const supportsOnline = d.modeOfConsult?.includes("online") ?? true;
//       if (
//         !((modeHospital && supportsHospital) || (modeOnline && supportsOnline))
//       )
//         return false;

//       if (expFilters.length > 0) {
//         const exp = d.experience ?? 0;
//         const matchesExp = expFilters.some((ef) => {
//           if (ef === "15+") return exp >= 15;
//           const [min, max] = ef.split("-").map(Number);
//           return exp >= min && exp <= max;
//         });
//         if (!matchesExp) return false;
//       }

//       if (feeFilters.length > 0) {
//         const fee = d.consultationFee ?? 0;
//         const matchesFee = feeFilters.some((ff) => {
//           if (ff === "1000+") return fee >= 1000;
//           const [min, max] = ff.split("-").map(Number);
//           return fee >= min && fee <= max;
//         });
//         if (!matchesFee) return false;
//       }

//       if (languageFilters.length > 0) {
//         const langs: string[] = d.languages ?? [];
//         const matchesLang = languageFilters.every((lf) =>
//           langs.map((x) => x.toLowerCase()).includes(lf.toLowerCase())
//         );
//         if (!matchesLang) return false;
//       }

//       return matchesSpec && matchesLocation && matchesDate;
//     });
//   }, [
//     doctors,
//     specialty,
//     locationValue,
//     date,
//     modeHospital,
//     modeOnline,
//     expFilters,
//     feeFilters,
//     languageFilters,
//   ]);

//   const indexOfLastDoctor = currentPage * doctorsPerPage;
//   const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
//   const currentDoctors = filtered.slice(indexOfFirstDoctor, indexOfLastDoctor);
//   const totalPages = Math.ceil(filtered.length / doctorsPerPage);

//   const toggleExp = (val: string) =>
//     setExpFilters((s) =>
//       s.includes(val) ? s.filter((x) => x !== val) : [...s, val]
//     );
//   const toggleFee = (val: string) =>
//     setFeeFilters((s) =>
//       s.includes(val) ? s.filter((x) => x !== val) : [...s, val]
//     );
//   const toggleLang = (val: string) =>
//     setLanguageFilters((s) =>
//       s.includes(val) ? s.filter((x) => x !== val) : [...s, val]
//     );

//   const openBooking = (doc: any) => {
//     setSelectedDoctor(doc);
//     setDrawerOpen(true);
//   };

//   const handleSearch = () => {
//     setCurrentPage(1);
//     navigate("/search-results", {
//       state: { location: locationValue, specialty, date },
//       replace: true,
//     });
//   };

//   const clearFilters = () => {
//     setSpecialty("");
//     setLocationValue("");
//     setDate("");
//     setModeHospital(true);
//     setModeOnline(true);
//     setExpFilters([]);
//     setFeeFilters([]);
//     setLanguageFilters([]);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Helmet>
//         <title>Consult Doctors Online | DoctorZ</title>
//         <meta
//           name="description"
//           content="Find and consult top doctors online by specialization, experience, and location on DoctorZ."
//         />
//       </Helmet>

//       <div className="max-w-[1500px] mx-auto px-3 sm:px-4 py-5 grid grid-cols-1 lg:grid-cols-12 gap-6">
//         {/* Sidebar Filters (Desktop) */}
//         <aside className="lg:col-span-3 hidden lg:block sticky top-24 self-start">
//           <FilterPanel
//             showNearMe={showNearMe}
//             clearFilters={clearFilters}
//             modeHospital={modeHospital}
//             setModeHospital={setModeHospital}
//             modeOnline={modeOnline}
//             setModeOnline={setModeOnline}
//             expFilters={expFilters}
//             toggleExp={toggleExp}
//             feeFilters={feeFilters}
//             toggleFee={toggleFee}
//             languageFilters={languageFilters}
//             toggleLang={toggleLang}
//           />
//         </aside>

//         {/* Main Content */}
//         <main className="lg:col-span-7">
//           {/* Breadcrumb + Title */}
//           <div className="flex items-center justify-between mb-4">
//             <div>
//               <nav className="text-sm text-gray-500 mb-1">
//                 Home &gt; Doctors &gt;{" "}
//                 <span className="text-gray-700">{specialty || "All"}</span>
//               </nav>
//               <h1 className="text-2xl font-bold text-gray-900">
//                 {specialty ? `Consult ${specialty}s Online` : "Available Doctors"}
//               </h1>
//               <p className="text-sm text-gray-600 mt-0.5">
//                 {filtered.length} doctors found
//               </p>
//             </div>
//             <button
//               onClick={() => setMobileFilterOpen(true)}
//               className="lg:hidden flex items-center gap-2 px-3 py-2 border border-teal-700 text-teal-700 rounded-md text-sm font-medium"
//             >
//               <SlidersHorizontal size={16} />
//               Filters
//             </button>
//           </div>

//           {/* Search Bar */}
//           <div className="bg-white border border-gray-400 rounded-lg p-3 mb-4 shadow-sm">
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
//               <SearchInput
                
//                 icon={<Stethoscope className="w-4 h-4  text-gray-400" />}
//                 placeholder="Specialty"
//                 value={specialty}
//                 onChange={setSpecialty}
//               />
//               <SearchInput
//                 icon={<MapPin className="w-4 h-4 text-gray-400" />}
//                 placeholder="Location"
//                 value={locationValue}
//                 onChange={setLocationValue}
//               />
//               <SearchInput
//                 icon={<Calendar className="w-4 h-4 text-gray-400" />}
//                 type="date"
//                 value={date}
//                 onChange={setDate}
//               />
//               <button
//                 onClick={handleSearch}
//                 className="flex items-center justify-center gap-2 bg-[#28328C] hover:bg-[#1f286f] text-white font-medium rounded-lg px-4 py-1.5 border border-[#1f286f] transition-all duration-200"
//               >
//                 <SearchIcon className="w-4 h-4" />
//                 Search
//               </button>
//             </div>
//           </div>

//           {/* Doctor Cards */}
//           {loading ? (
//             <div className="bg-white rounded-lg p-6 shadow-sm text-center border border-gray-200">
//               <div className="inline-block w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mb-2" />
//               <div className="text-gray-600">Loading doctors...</div>
//             </div>
//           ) : filtered.length === 0 ? (
//             <div className="bg-white rounded-lg p-6 shadow-sm text-center border border-gray-200">
//               <div className="text-gray-700">
//                 No doctors found matching your filters.
//               </div>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {currentDoctors.map((doc) => (
//                 <DoctorCard
//                   key={doc._id}
//                   doctor={doc}
//                   onConsult={openBooking}
//                 />
//               ))}
//             </div>
//           )}

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <div className="flex justify-center mt-5">
//               <div className="inline-flex gap-1.5">
//                 {Array.from({ length: totalPages }).map((_, i) => (
//                   <button
//                     key={i}
//                     onClick={() => setCurrentPage(i + 1)}
//                     className={`px-3 py-1.5 rounded-md border text-sm ${
//                       currentPage === i + 1
//                         ? "bg-teal-700 text-white border-teal-700"
//                         : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
//                     }`}
//                   >
//                     {i + 1}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}
//         </main>

//         {/* Right Help Card */}
//         <aside className="lg:col-span-2 hidden lg:block">
//           <div className="bg-[#08263a] text-white rounded-lg p-4 shadow-md border border-gray-200">
//             <h3 className="font-semibold text-base">
//               Need help consulting the right doctor?
//             </h3>
//             <p className="text-sm mt-2 leading-snug">
//               Call <span className="font-medium">+91-8040245807</span> to book
//               instantly
//             </p>
//             <a
//               href="tel:+918040245807"
//               className="inline-block mt-3 bg-white text-[#08263a] font-medium px-3 py-1.5 rounded"
//             >
//               Call Now
//             </a>
//           </div>
//         </aside>
//       </div>

//       {/* Mobile Filter Drawer */}
//       {mobileFilterOpen && (
//         <div className="fixed inset-0 bg-black/40 z-50 flex justify-end">
//           <div className="bg-white w-80 max-w-full h-full p-5 overflow-y-auto shadow-lg">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
//               <button
//                 onClick={() => setMobileFilterOpen(false)}
//                 className="p-1 rounded-full hover:bg-gray-100"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </div>

//             <FilterPanel
//               showNearMe={showNearMe}
//               clearFilters={clearFilters}
//               modeHospital={modeHospital}
//               setModeHospital={setModeHospital}
//               modeOnline={modeOnline}
//               setModeOnline={setModeOnline}
//               expFilters={expFilters}
//               toggleExp={toggleExp}
//               feeFilters={feeFilters}
//               toggleFee={toggleFee}
//               languageFilters={languageFilters}
//               toggleLang={toggleLang}
//             />

//             <button
//               onClick={() => setMobileFilterOpen(false)}
//               className="mt-5 w-full bg-teal-700 text-white py-2 rounded-md font-medium hover:bg-teal-800"
//             >
//               Apply Filters
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Booking Drawer */}
//       <BookingDrawer
//         open={drawerOpen}
//         doctor={
//           selectedDoctor
//             ? {
//                 _id: selectedDoctor._id,
//                 fullName: selectedDoctor.fullName,
//                 photo: selectedDoctor.photo,
//                 specialization: selectedDoctor.specialization,
//                 fees: selectedDoctor.consultationFee,
//               }
//             : null
//         }
//         onClose={() => {
//           setDrawerOpen(false);
//           setSelectedDoctor(null);
//         }}
//         onBooked={() => {
//           setDrawerOpen(false);
//           setSelectedDoctor(null);
//         }}
//         variant="modal"
//       />
//     </div>
//   );
// };

// /* 🔹 Reusable Components */

// const SearchInput = ({ icon, placeholder, value, onChange, type = "text" }: any) => (
//   <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-1.5 bg-white">
//     {icon}
//     <input
//       type={type}
//       placeholder={placeholder}
//       className="w-full outline-none text-gray-700"
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//     />
//   </div>
// );

// const FilterPanel = ({
//   showNearMe,
//   clearFilters,
//   modeHospital,
//   setModeHospital,
//   modeOnline,
//   setModeOnline,
//   expFilters,
//   toggleExp,
//   feeFilters,
//   toggleFee,
//   languageFilters,
//   toggleLang,
// }: any) => (
//   <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-5 hover:shadow-lg transition-all duration-300">
//     <div className="flex items-center justify-between mb-4">
//       <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
//       <button onClick={clearFilters} className="text-sm text-teal-700 hover:underline">
//         Clear All
//       </button>
//     </div>

//     <div className="space-y-4">
//       <button
//         onClick={showNearMe}
//         className="w-full border border-[#28328C] text-[#28328C] text-sm font-medium rounded-md py-2 hover:bg-[#28328C]/10"
//       >
//         Show Doctors Near Me
//       </button>

//       {/* Mode */}
//       <div className="pt-2 border-t">
//         <h4 className="text-sm font-medium text-gray-700 mb-2">Mode of Consult</h4>
//         <label className="flex items-center gap-2 text-sm text-gray-600 mb-1">
//           <input
//             type="checkbox"
//             checked={modeHospital}
//             onChange={() => setModeHospital((s: boolean) => !s)}
//             className="accent-teal-600"
//           />
//           Hospital Visit
//         </label>
//         <label className="flex items-center gap-2 text-sm text-gray-600">
//           <input
//             type="checkbox"
//             checked={modeOnline}
//             onChange={() => setModeOnline((s: boolean) => !s)}
//             className="accent-teal-600"
//           />
//           Online Consult
//         </label>
//       </div>

//       {/* Experience */}
//       <FilterSection
//         title="Experience"
//         options={["0-5", "6-10", "11-15", "15+"]}
//         selected={expFilters}
//         toggle={toggleExp}
//       />

//       {/* Fee */}
//       <FilterSection
//         title="Consultation Fee (₹)"
//         options={["0-500", "501-1000", "1000+"]}
//         selected={feeFilters}
//         toggle={toggleFee}
//       />

//       {/* Language */}
//       <FilterSection
//         title="Languages Spoken"
//         options={["English", "Hindi", "Tamil", "Telugu", "Kannada"]}
//         selected={languageFilters}
//         toggle={toggleLang}
//       />
//     </div>
//   </div>
// );

// const FilterSection = ({ title, options, selected, toggle }: any) => (
//   <div className="pt-2 border-t">
//     <h4 className="text-sm font-medium text-gray-700 mb-2">{title}</h4>
//     {options.map((opt: string) => (
//       <label key={opt} className="flex items-center gap-2 text-sm text-gray-600 mb-1">
//         <input
//           type="checkbox"
//           checked={selected.includes(opt)}
//           onChange={() => toggle(opt)}
//           className="accent-teal-600"
//         />
//         {opt}
//       </label>
//     ))}
//   </div>
// );

// export default DoctorSearchResults;



// pages/DoctorSearchResults.tsx
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  MapPin,
  Calendar,
  Stethoscope,
  Search as SearchIcon,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { Helmet } from "react-helmet";
import DoctorCard from "../components/DoctorCard";
import BookingDrawer from "../components/BookingDrawer";
import { useEffect, useMemo, useState } from "react";

type SearchState = {
  location?: string;
  specialty?: string;
  date?: string;
};

const API = "http://localhost:3000/api/doctor/allDoctors";

const DoctorSearchResults: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const searchState = (state || {}) as SearchState;

  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<any | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 6;

  const [specialty, setSpecialty] = useState(searchState.specialty || "");
  const [locationValue, setLocationValue] = useState(searchState.location || "");
  const [date, setDate] = useState(searchState.date || "");

  const [modeHospital, setModeHospital] = useState(true);
  const [modeOnline, setModeOnline] = useState(true);
  const [expFilters, setExpFilters] = useState<string[]>([]);
  const [feeFilters, setFeeFilters] = useState<string[]>([]);
  const [languageFilters, setLanguageFilters] = useState<string[]>([]);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // ✅ Fetch Doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const res = await axios.get(API);
        const data = Array.isArray(res.data)
          ? res.data
          : res.data?.doctors ?? res.data;
        setDoctors(data || []);
      } catch (e) {
        console.error("Error fetching doctors:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  // ✅ Utility for date filter
  const hasSlotForDate = (doc: any, date?: string) => {
    if (!date) return true;
    if (!Array.isArray(doc?.slots)) return false;
    return doc.slots.some((s: { date: string }) => s.date === date);
  };

  // ✅ Geolocation “Near Me”
  const showNearMe = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported by your browser.");
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        const approx = doctors.filter((d) => {
          if (!d.lat || !d.lng) return false;
          const R = 6371;
          const dLat = ((d.lat - lat) * Math.PI) / 180;
          const dLon = ((d.lng - lng) * Math.PI) / 180;
          const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos((lat * Math.PI) / 180) *
              Math.cos((d.lat * Math.PI) / 180) *
              Math.sin(dLon / 2) *
              Math.sin(dLon / 2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          const dist = R * c;
          return dist <= 50;
        });
        setDoctors(approx);
        setLoading(false);
      },
      (err) => {
        setLoading(false);
        console.error(err);
        alert("Unable to get your location.");
      }
    );
  };

  // ✅ Filtering Logic
  const filtered = useMemo(() => {
    const loc = (locationValue || "").trim().toLowerCase();
    const spec = (specialty || "").trim().toLowerCase();
    const dateVal = (date || "").trim();

    return doctors.filter((d: any) => {
      const matchesSpec =
        !spec ||
        (d.specialization && d.specialization.toLowerCase().includes(spec)) ||
        (d.fullName && d.fullName.toLowerCase().includes(spec));

      const matchesLocation =
        !loc ||
        (d.location && d.location.toLowerCase().includes(loc)) ||
        (d.city && d.city.toLowerCase().includes(loc));

      const matchesDate = hasSlotForDate(d, dateVal);

      const supportsHospital = d.modeOfConsult?.includes("hospital") ?? true;
      const supportsOnline = d.modeOfConsult?.includes("online") ?? true;
      if (
        !((modeHospital && supportsHospital) || (modeOnline && supportsOnline))
      )
        return false;

      if (expFilters.length > 0) {
        const exp = d.experience ?? 0;
        const matchesExp = expFilters.some((ef) => {
          if (ef === "15+") return exp >= 15;
          const [min, max] = ef.split("-").map(Number);
          return exp >= min && exp <= max;
        });
        if (!matchesExp) return false;
      }

      if (feeFilters.length > 0) {
        const fee = d.consultationFee ?? 0;
        const matchesFee = feeFilters.some((ff) => {
          if (ff === "1000+") return fee >= 1000;
          const [min, max] = ff.split("-").map(Number);
          return fee >= min && fee <= max;
        });
        if (!matchesFee) return false;
      }

      if (languageFilters.length > 0) {
        const langs: string[] = d.languages ?? [];
        const matchesLang = languageFilters.every((lf) =>
          langs.map((x) => x.toLowerCase()).includes(lf.toLowerCase())
        );
        if (!matchesLang) return false;
      }

      return matchesSpec && matchesLocation && matchesDate;
    });
  }, [
    doctors,
    specialty,
    locationValue,
    date,
    modeHospital,
    modeOnline,
    expFilters,
    feeFilters,
    languageFilters,
  ]);

  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = filtered.slice(indexOfFirstDoctor, indexOfLastDoctor);
  const totalPages = Math.ceil(filtered.length / doctorsPerPage);

  const toggleExp = (val: string) =>
    setExpFilters((s) =>
      s.includes(val) ? s.filter((x) => x !== val) : [...s, val]
    );
  const toggleFee = (val: string) =>
    setFeeFilters((s) =>
      s.includes(val) ? s.filter((x) => x !== val) : [...s, val]
    );
  const toggleLang = (val: string) =>
    setLanguageFilters((s) =>
      s.includes(val) ? s.filter((x) => x !== val) : [...s, val]
    );

  const openBooking = (doc: any) => {
    setSelectedDoctor(doc);
    setDrawerOpen(true);
  };

  const handleSearch = () => {
    setCurrentPage(1);
    navigate("/search-results", {
      state: { location: locationValue, specialty, date },
      replace: true,
    });
  };

  const clearFilters = () => {
    setSpecialty("");
    setLocationValue("");
    setDate("");
    setModeHospital(true);
    setModeOnline(true);
    setExpFilters([]);
    setFeeFilters([]);
    setLanguageFilters([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 scale-[0.9] origin-top mx-auto">
      <Helmet>
        <title>Consult Doctors Online | DoctorZ</title>
        <meta
          name="description"
          content="Find and consult top doctors online by specialization, experience, and location on DoctorZ."
        />
      </Helmet>

      <div className="max-w-[1500px] mx-auto px-3 sm:px-4 py-5 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sidebar Filters (Desktop) */}
        

        <aside className="lg:col-span-3 hidden lg:block sticky top-24 self-start">
          <FilterPanel
            showNearMe={showNearMe}
            clearFilters={clearFilters}
            modeHospital={modeHospital}
            setModeHospital={setModeHospital}
            modeOnline={modeOnline}
            setModeOnline={setModeOnline}
            expFilters={expFilters}
            toggleExp={toggleExp}
            feeFilters={feeFilters}
            toggleFee={toggleFee}
            languageFilters={languageFilters}
            toggleLang={toggleLang}
          />
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-7">
          {/* Breadcrumb + Title */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <nav className="text-sm text-gray-500 mb-1">
                Home &gt; Doctors &gt;{" "}
                <span className="text-gray-700">{specialty || "All"}</span>
              </nav>
              <h1 className="text-2xl font-bold text-gray-900">
                {specialty ? `Consult ${specialty}s Online` : "Available Doctors"}
              </h1>
              <p className="text-sm text-gray-600 mt-0.5">
                {filtered.length} doctors found
              </p>
            </div>
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-3 py-2 border border-teal-700 text-teal-700 rounded-md text-sm font-medium"
            >
              <SlidersHorizontal size={16} />
              Filters
            </button>
          </div>

          {/* Search Bar */}
          <div className="bg-white border border-gray-400 rounded-lg p-3 mb-4 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
              <SearchInput
                icon={<Stethoscope className="w-4 h-4  text-gray-400" />}
                placeholder="Specialty"
                value={specialty}
                onChange={setSpecialty}
              />
              <SearchInput
                icon={<MapPin className="w-4 h-4 text-gray-400" />}
                placeholder="Location"
                value={locationValue}
                onChange={setLocationValue}
              />
              <SearchInput
                icon={<Calendar className="w-4 h-4 text-gray-400" />}
                type="date"
                value={date}
                onChange={setDate}
              />
              <button
                onClick={handleSearch}
                className="flex items-center justify-center gap-2 bg-[#28328C] hover:bg-[#1f286f] text-white font-medium rounded-lg px-4 py-1.5 border border-[#1f286f] transition-all duration-200"
              >
                <SearchIcon className="w-4 h-4" />
                Search
              </button>
            </div>
          </div>

          {/* Doctor Cards */}
          {loading ? (
            <div className="bg-white rounded-lg p-6 shadow-sm text-center border border-gray-200">
              <div className="inline-block w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mb-2" />
              <div className="text-gray-600">Loading doctors...</div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="bg-white rounded-lg p-6 shadow-sm text-center border border-gray-200">
              <div className="text-gray-700">
                No doctors found matching your filters.
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {currentDoctors.map((doc) => (
                <DoctorCard key={doc._id} doctor={doc} onConsult={openBooking} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-5">
              <div className="inline-flex gap-1.5">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1.5 rounded-md border text-sm ${
                      currentPage === i + 1
                        ? "bg-teal-700 text-white border-teal-700"
                        : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          )}
        </main>

        {/* Right Help Card */}
        <aside className="lg:col-span-2 hidden lg:block">
          <div className="bg-[#08263a] text-white rounded-lg p-4 shadow-md border border-gray-200">
            <h3 className="font-semibold text-base">
              Need help consulting the right doctor?
            </h3>
            <p className="text-sm mt-2 leading-snug">
              Call <span className="font-medium">+91-8040245807</span> to book
              instantly
            </p>
            <a
              href="tel:+918040245807"
              className="inline-block mt-3 bg-white text-[#08263a] font-medium px-3 py-1.5 rounded"
            >
              Call Now
            </a>
          </div>
        </aside>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-end">
          <div className="bg-white w-80 max-w-full h-full p-5 overflow-y-auto shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <FilterPanel
              showNearMe={showNearMe}
              clearFilters={clearFilters}
              modeHospital={modeHospital}
              setModeHospital={setModeHospital}
              modeOnline={modeOnline}
              setModeOnline={setModeOnline}
              expFilters={expFilters}
              toggleExp={toggleExp}
              feeFilters={feeFilters}
              toggleFee={toggleFee}
              languageFilters={languageFilters}
              toggleLang={toggleLang}
            />

            <button
              onClick={() => setMobileFilterOpen(false)}
              className="mt-5 w-full bg-teal-700 text-white py-2 rounded-md font-medium hover:bg-teal-800"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Booking Drawer */}
      <BookingDrawer
        open={drawerOpen}
        doctor={
          selectedDoctor
            ? {
                _id: selectedDoctor._id,
                fullName: selectedDoctor.fullName,
                photo: selectedDoctor.photo,
                specialization: selectedDoctor.specialization,
                fees: selectedDoctor.consultationFee,
              }
            : null
        }
        onClose={() => {
          setDrawerOpen(false);
          setSelectedDoctor(null);
        }}
        onBooked={() => {
          setDrawerOpen(false);
          setSelectedDoctor(null);
        }}
        variant="modal"
      />
    </div>
  );
};

/* 🔹 Reusable Components */

const SearchInput = ({ icon, placeholder, value, onChange, type = "text" }: any) => (
  <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-1.5 bg-white">
    {icon}
    <input
      type={type}
      placeholder={placeholder}
      className="w-full outline-none text-gray-700"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

const FilterPanel = ({
  showNearMe,
  clearFilters,
  modeHospital,
  setModeHospital,
  modeOnline,
  setModeOnline,
  expFilters,
  toggleExp,
  feeFilters,
  toggleFee,
  languageFilters,
  toggleLang,
}: any) => (
  <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-5 hover:shadow-lg transition-all duration-300">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
      <button onClick={clearFilters} className="text-sm text-teal-700 hover:underline">
        Clear All
      </button>
    </div>

    <div className="space-y-4">
      <button
        onClick={showNearMe}
        className="w-full border border-[#28328C] text-[#28328C] text-sm font-medium rounded-md py-2 hover:bg-[#28328C]/10"
      >
        Show Doctors Near Me
      </button>

      {/* Mode */}
      <div className="pt-2 border-t">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Mode of Consult</h4>
        <label className="flex items-center gap-2 text-sm text-gray-600 mb-1">
          <input
            type="checkbox"
            checked={modeHospital}
            onChange={() => setModeHospital((s: boolean) => !s)}
            className="accent-teal-600"
          />
          Hospital Visit
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={modeOnline}
            onChange={() => setModeOnline((s: boolean) => !s)}
            className="accent-teal-600"
          />
          Online Consult
        </label>
      </div>

      {/* Experience */}
      <div className="pt-2 border-t">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Experience</h4>
        {["0-5", "5-10", "10-15", "15+"].map((v) => (
          <label key={v} className="flex items-center gap-2 text-sm text-gray-600 mb-1">
            <input
              type="checkbox"
              checked={expFilters.includes(v)}
              onChange={() => toggleExp(v)}
              className="accent-teal-600"
            />
            {v} years
          </label>
        ))}
      </div>

      {/* Fee */}
      <div className="pt-2 border-t">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Consultation Fee</h4>
        {["0-500", "500-1000", "1000+"].map((v) => (
          <label key={v} className="flex items-center gap-2 text-sm text-gray-600 mb-1">
            <input
              type="checkbox"
              checked={feeFilters.includes(v)}
              onChange={() => toggleFee(v)}
              className="accent-teal-600"
            />
            ₹{v}
          </label>
        ))}
      </div>

      {/* Language */}
      <div className="pt-2 border-t">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Languages</h4>
        {["English", "Hindi", "Tamil", "Telugu", "Marathi"].map((v) => (
          <label key={v} className="flex items-center gap-2 text-sm text-gray-600 mb-1">
            <input
              type="checkbox"
              checked={languageFilters.includes(v)}
              onChange={() => toggleLang(v)}
              className="accent-teal-600"
            />
            {v}
          </label>
        ))}
      </div>
    </div>
  </div>
);

export default DoctorSearchResults;
