// import React, { useEffect, useState } from "react";
// import type { ChangeEvent } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import api from "../Services/mainApi";
// import { Phone, MapPin, Mail, Clock, Award, Search } from "lucide-react";

// interface Doctor {
//   _id: string;
//   fullName: string;
//   specialization: string;
//   experience: number;
//   consultationFee: number;
//   gender: "Male" | "Female";
//   photo?: string;
// }

// interface Clinic {
//   _id: string;
//   clinicName: string;
//   clinicType: string;
//   specialities: string[];
//   address: string;
//   street: string;
//   district: string;
//   state: string;
//   phone: string;
//   email: string;
//   clinicLicenseNumber: string;
//   operatingHours: string;
// }

// interface ClinicResponse {
//   clinic: Clinic;
// }

// interface DoctorsResponse {
//   doctors: Doctor[];
// }

// type TabType = "overview" | "doctors" | "services";

// interface Filters {
//   gender: string[];
//   fees: string[];
//   experience: string[];
//   search: string;
// }

// const ClinicDetails: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();

//   const [clinic, setClinic] = useState<Clinic | null>(null);
//   const [doctors, setDoctors] = useState<Doctor[]>([]);
//   const [loadingClinic, setLoadingClinic] = useState(true);
//   const [loadingDoctors, setLoadingDoctors] = useState(true);
//   const [activeTab, setActiveTab] = useState<TabType>("overview");

//   const [filters, setFilters] = useState<Filters>({
//     gender: [],
//     fees: [],
//     experience: [],
//     search: "",
//   });

//   // Fetch clinic & doctors
//   useEffect(() => {
//     const fetchClinic = async () => {
//       try {
//         const res = await api.get<ClinicResponse>(`api/clinic/getClinicById/${id}`);
//         setClinic(res.data.clinic);
//       } catch (err) {
//         console.error("Error fetching clinic:", err);
//       } finally {
//         setLoadingClinic(false);
//       }
//     };

//     const fetchDoctors = async () => {
//       try {
//         const res = await api.get<DoctorsResponse>(`api/doctor/getClinicDoctors/${id}`);
//         setDoctors(res.data.doctors || []);
//       } catch (err) {
//         console.error("Error fetching doctors:", err);
//       } finally {
//         setLoadingDoctors(false);
//       }
//     };

//     fetchClinic();
//     fetchDoctors();
//   }, [id]);

//   const handleFilterChange = (type: keyof Filters, value: string) => {
//     if (type === "search") {
//       setFilters((prev) => ({ ...prev, search: value }));
//       return;
//     }
//     setFilters((prev) => {
//       const selected = prev[type].includes(value)
//         ? prev[type].filter((v) => v !== value)
//         : [...prev[type], value];
//       return { ...prev, [type]: selected };
//     });
//   };

//   // --- Filter Logic ---
//   const filteredDoctors = doctors.filter((doc) => {
//     const { gender, fees, experience, search } = filters;

//     // gender filter
//     const genderMatch = gender.length === 0 || gender.includes(doc.gender);

//     // fee filter
//     const feeMatch =
//       fees.length === 0 ||
//       fees.some((range) => {
//         if (range === "0-500") return doc.consultationFee <= 500;
//         if (range === "500-1000") return doc.consultationFee > 500 && doc.consultationFee <= 1000;
//         if (range === "1000+") return doc.consultationFee > 1000;
//         return false;
//       });

//     // experience filter
//     const experienceMatch =
//       experience.length === 0 ||
//       experience.some((range) => {
//         if (range === "0-2") return doc.experience <= 2;
//         if (range === "3-5") return doc.experience >= 3 && doc.experience <= 5;
//         if (range === "5+") return doc.experience > 5;
//         return false;
//       });

//     // search filter (name or specialization)
//     const searchMatch =
//       search.trim() === "" ||
//       doc.fullName.toLowerCase().includes(search.toLowerCase()) ||
//       doc.specialization.toLowerCase().includes(search.toLowerCase());

//     return genderMatch && feeMatch && experienceMatch && searchMatch;
//   });

//   if (loadingClinic) return <div>Loading clinic info...</div>;
//   if (!clinic) return <div>Clinic not found</div>;

//   return (
//     <div className=" mx-auto p-6 bg-blue-50 min-h-screen w-full space-y-6">
//       {/* Clinic Header */}
//       <div className="bg-white rounded-lg shadow p-6 flex flex-col md:flex-row justify-between items-start md:items-center">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">{clinic.clinicName}</h1>
//           <p className="text-indigo-600 font-semibold">{clinic.clinicType}</p>

//           <div className="flex items-center text-gray-700 mt-3 space-x-2">
//             <MapPin size={18} />
//             <span>
//               {clinic.address}, {clinic.district}, {clinic.state}
//             </span>
//           </div>

//           <div className="flex items-center text-gray-700 mt-2 space-x-2">
//             <Mail size={18} />
//             <span>{clinic.email}</span>
//           </div>

//           <div className="flex items-center text-gray-700 mt-2 space-x-2">
//             <Award size={18} />
//             <span>License No: {clinic.clinicLicenseNumber}</span>
//           </div>

//           <div className="flex items-center text-gray-700 mt-2 space-x-2">
//             <Clock size={18} />
//             <span>Hours: {clinic.operatingHours}</span>
//           </div>
//         </div>

//         <a
//           href={`tel:${clinic.phone}`}
//           className="mt-4 md:mt-0 inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-md transition space-x-2"
//         >
//           <Phone size={18} />
//           <span>Call Now</span>
//         </a>
//       </div>

//       {/* Tabs */}
//       <div className="flex border-b border-gray-300 space-x-6">
//         {(["overview", "doctors", "services"] as TabType[]).map((tab) => (
//           <button
//             key={tab}
//             className={`pb-2 text-lg font-medium capitalize transition-colors ${
//               activeTab === tab
//                 ? "border-b-2 border-blue-600 text-blue-600"
//                 : "text-gray-600 hover:text-blue-500"
//             }`}
//             onClick={() => setActiveTab(tab)}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {/* Overview */}
// {activeTab === "overview" && (
//   <div className="space-y-6">
//     {/* Clinic Info */}
//     <div className="bg-white rounded-lg shadow p-6">
//       <h2 className="text-xl font-semibold mb-4">About {clinic.clinicName}</h2>
//       <p className="text-gray-800">
//         {clinic.clinicType} clinic specializing in{" "}
//         <span className="font-medium">{clinic.specialities.join(", ")}</span>. Operating hours:{" "}
//         <span className="font-semibold">{clinic.operatingHours}</span>.
//       </p>
//     </div>

//     {/* Doctor List */}
//     <div className="bg-white rounded-lg shadow p-6">
//       <h2 className="text-xl font-semibold mb-4">Our Doctors</h2>
//       {loadingDoctors ? (
//         <p>Loading doctors...</p>
//       ) : doctors.length === 0 ? (
//         <p>No doctors found.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//           {doctors.map((doc) => (
//             <div
//               key={doc._id}
//               onClick={() => navigate(`/view-doctor-profile/${doc._id}`)}
//               className="cursor-pointer flex space-x-4 items-center border border-gray-200 rounded-md p-4 hover:shadow-md transition"
//             >
//               {doc.photo ? (
//                 <img
//                   src={`http://localhost:3000/uploads/${doc.photo}`}
//                   alt={doc.fullName}
//                   className="w-20 h-20 rounded-full object-cover border"
//                 />
//               ) : (
//                 <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
//                   No Image
//                 </div>
//               )}
//               <div>
//                 <h3 className="text-lg font-semibold">{doc.fullName}</h3>
//                 <p className="text-indigo-600 font-medium">{doc.specialization}</p>
//                 <p className="text-gray-600 text-sm">{doc.experience} years experience</p>
//                 <p className="text-gray-700 text-sm font-medium">
//                   ₹{doc.consultationFee} / consultation
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   </div>
// )}

//       {/* Doctors Tab */}
//       {activeTab === "doctors" && (
//         <div className="flex flex-col md:flex-row gap-6">
//           {/* Filters Sidebar */}
//           <div className="bg-white rounded-lg shadow p-5 md:w-1/3 lg:w-1/4">
//             <h3 className="text-lg font-semibold mb-3">Filters</h3>

//             <div className="space-y-4">
//               {/* Gender */}
//               <div>
//                 <h4 className="font-medium text-gray-800">Gender</h4>
//                 {["Male", "Female"].map((g) => (
//                   <label key={g} className="flex items-center space-x-2 mt-1">
//                     <input
//                       type="checkbox"
//                       checked={filters.gender.includes(g)}
//                       onChange={() => handleFilterChange("gender", g)}
//                     />
//                     <span>{g}</span>
//                   </label>
//                 ))}
//               </div>

//               {/* Fees */}
//               <div>
//                 <h4 className="font-medium text-gray-800">Fees</h4>
//                 {["0-500", "500-1000", "1000+"].map((range) => (
//                   <label key={range} className="flex items-center space-x-2 mt-1">
//                     <input
//                       type="checkbox"
//                       checked={filters.fees.includes(range)}
//                       onChange={() => handleFilterChange("fees", range)}
//                     />
//                     <span>{range}</span>
//                   </label>
//                 ))}
//               </div>

//               {/* Experience */}
//               <div>
//                 <h4 className="font-medium text-gray-800">Experience (years)</h4>
//                 {["0-2", "3-5", "5+"].map((exp) => (
//                   <label key={exp} className="flex items-center space-x-2 mt-1">
//                     <input
//                       type="checkbox"
//                       checked={filters.experience.includes(exp)}
//                       onChange={() => handleFilterChange("experience", exp)}
//                     />
//                     <span>{exp}</span>
//                   </label>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Doctor List */}
//           <div className="flex-1 bg-white rounded-lg shadow p-6">
//             {/* Search bar */}
//             <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 mb-5">
//               <Search size={18} className="text-gray-500 mr-2" />
//               <input
//                 type="text"
//                 placeholder="Search by name or specialization..."
//                 value={filters.search}
//                 onChange={(e: ChangeEvent<HTMLInputElement>) =>
//                   handleFilterChange("search", e.target.value)
//                 }
//                 className="w-full outline-none text-gray-700"
//               />
//             </div>

//             {loadingDoctors ? (
//               <p>Loading doctors...</p>
//             ) : filteredDoctors.length === 0 ? (
//               <p>No doctors found.</p>
//             ) : (
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                 {filteredDoctors.map((doc) => (
//                   <div
//                     key={doc._id}
//                     onClick={() => navigate(`/view-doctor-profile/${doc._id}`)}
//                     className="cursor-pointer flex space-x-4 items-center border border-gray-200 rounded-md p-4 hover:shadow-md transition"
//                   >
//                     {doc.photo ? (
//                       <img
//                         src={`http://localhost:3000/uploads/${doc.photo}`}
//                         alt={doc.fullName}
//                         className="w-20 h-20 rounded-full object-cover border"
//                       />
//                     ) : (
//                       <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
//                         No Image
//                       </div>
//                     )}
//                     <div>
//                       <h3 className="text-lg font-semibold">{doc.fullName}</h3>
//                       <p className="text-indigo-600 font-medium">{doc.specialization}</p>
//                       <p className="text-gray-600 text-sm">{doc.experience} years experience</p>
//                       <p className="text-gray-700 text-sm font-medium">
//                         ₹{doc.consultationFee} / consultation
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Services Tab */}
//       {activeTab === "services" && (
//         <div className="bg-white rounded-lg shadow p-6 text-gray-700">
//           <p>No Services Available</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ClinicDetails;

// import React, { useEffect, useState } from "react";
// import type { ChangeEvent } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import api from "../Services/mainApi";
// import { Phone, MapPin, Mail, Clock, Award, Search } from "lucide-react";
// import  clinicImage from "../assets/clinic.jpg";

// interface Doctor {
//   _id: string;
//   fullName: string;
//   specialization: string;
//   experience: number;
//   consultationFee: number;
//   gender: "Male" | "Female";
//   photo?: string;
// }

// interface Clinic {
//   _id: string;
//   clinicName: string;
//   clinicType: string;
//   specialities: string[];
//   address: string;
//   street: string;
//   district: string;
//   state: string;
//   phone: string;
//   email: string;
//   clinicLicenseNumber: string;
//   operatingHours: string;
// }

// interface ClinicResponse {
//   clinic: Clinic;
// }

// interface DoctorsResponse {
//   doctors: Doctor[];
// }

// type TabType = "overview" | "doctors" | "services";

// interface Filters {
//   gender: string[];
//   fees: string[];
//   experience: string[];
//   search: string;
// }

// const ClinicDetails: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();

//   const [clinic, setClinic] = useState<Clinic | null>(null);
//   const [doctors, setDoctors] = useState<Doctor[]>([]);
//   const [loadingClinic, setLoadingClinic] = useState(true);
//   const [loadingDoctors, setLoadingDoctors] = useState(true);
//   const [activeTab, setActiveTab] = useState<TabType>("overview");

//   const [filters, setFilters] = useState<Filters>({
//     gender: [],
//     fees: [],
//     experience: [],
//     search: "",
//   });

//   const [showFilters, setShowFilters] = useState(false);

//   useEffect(() => {
//     const fetchClinic = async () => {
//       try {
//         const res = await api.get<ClinicResponse>(`api/clinic/getClinicById/${id}`);
//         setClinic(res.data.clinic);
//       } catch (err) {
//         console.error("Error fetching clinic:", err);
//       } finally {
//         setLoadingClinic(false);
//       }
//     };

//     const fetchDoctors = async () => {
//       try {
//         const res = await api.get<DoctorsResponse>(`api/doctor/getClinicDoctors/${id}`);
//         setDoctors(res.data.doctors || []);
//       } catch (err) {
//         console.error("Error fetching doctors:", err);
//       } finally {
//         setLoadingDoctors(false);
//       }
//     };

//     fetchClinic();
//     fetchDoctors();
//   }, [id]);

//   const handleFilterChange = (type: keyof Filters, value: string) => {
//     if (type === "search") {
//       setFilters((prev) => ({ ...prev, search: value }));
//       return;
//     }
//     setFilters((prev) => {
//       const selected = prev[type].includes(value)
//         ? prev[type].filter((v) => v !== value)
//         : [...prev[type], value];
//       return { ...prev, [type]: selected };
//     });
//   };

//   const filteredDoctors = doctors.filter((doc) => {
//     const { gender, fees, experience, search } = filters;

//     const genderMatch = gender.length === 0 || gender.includes(doc.gender);
//     const feeMatch =
//       fees.length === 0 ||
//       fees.some((range) => {
//         if (range === "0-500") return doc.consultationFee <= 500;
//         if (range === "500-1000")
//           return doc.consultationFee > 500 && doc.consultationFee <= 1000;
//         if (range === "1000+") return doc.consultationFee > 1000;
//         return false;
//       });
//     const experienceMatch =
//       experience.length === 0 ||
//       experience.some((range) => {
//         if (range === "0-2") return doc.experience <= 2;
//         if (range === "3-5") return doc.experience >= 3 && doc.experience <= 5;
//         if (range === "5+") return doc.experience > 5;
//         return false;
//       });
//     const searchMatch =
//       search.trim() === "" ||
//       doc.fullName.toLowerCase().includes(search.toLowerCase()) ||
//       doc.specialization.toLowerCase().includes(search.toLowerCase());

//     return genderMatch && feeMatch && experienceMatch && searchMatch;
//   });

//   if (loadingClinic) {
//     return (
//       <div className="flex items-center justify-center h-40">
//         <div className="animate-spin h-8 w-8 border-4 border-indigo-600 border-t-transparent rounded-full"></div>
//       </div>
//     );
//   }

//   if (!clinic) {
//     return <div className="text-center py-10 text-gray-600 text-xl">Clinic not found</div>;
//   }

//   return (
//     <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-8 bg-gray-50 min-h-screen">
//       {/* Hero Header */}
//       <div className="relative bg-gradient-to-r from-indigo-700 to-blue-600 text-white rounded-xl shadow-lg overflow-hidden mb-10">
//         <div className="sm:flex items-center">
//           <div className="p-8 sm:w-2/3">
//             <h1 className="text-4xl sm:text-5xl font-extrabold tracking-wide">{clinic.clinicName}</h1>
//             <p className="text-xl sm:text-2xl mt-3 font-medium">{clinic.clinicType}</p>

//             <div className="mt-6 space-y-3 text-indigo-200 text-base sm:text-lg leading-relaxed">
//               <p className="flex items-center gap-3">
//                 <MapPin size={22} /> {clinic.address}, {clinic.district}, {clinic.state}
//               </p>
//               <p className="flex items-center gap-3">
//                 <Mail size={22} /> {clinic.email}
//               </p>
//               <p className="flex items-center gap-3">
//                 <Clock size={22} /> Hours: {clinic.operatingHours}
//               </p>
//               <p className="flex items-center gap-3">
//                 <Award size={22} /> License No: {clinic.clinicLicenseNumber}
//               </p>
//             </div>
//           </div>
//           <div className="sm:w-1/3 hidden sm:block">
//             <img
//               src={clinicImage}

//               className="w-full h-full object-cover rounded-r-xl"
//               loading="lazy"
//             />
//           </div>
//         </div>

//         <div className="absolute bottom-6 right-6">
//           <a
//             href={`tel:${clinic.phone}`}
//             className="bg-white text-indigo-700 hover:text-white hover:bg-indigo-700 px-7 py-3 rounded-full font-semibold shadow-lg flex items-center gap-3 transition"
//           >
//             <Phone size={20} />
//             Call Now
//           </a>
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className="flex space-x-10 border-b border-gray-300 mb-8">
//         {(["overview", "doctors", "services"] as TabType[]).map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`relative pb-3 text-xl font-semibold capitalize tracking-wide transition-all duration-300 ${
//               activeTab === tab
//                 ? "text-indigo-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-indigo-600"
//                 : "text-gray-500 hover:text-indigo-600"
//             }`}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {/* Tab Content */}
//       {activeTab === "overview" && (
//         <div className="space-y-10">
//           <div className="bg-white rounded-2xl shadow-md p-8">
//             <h2 className="text-3xl font-semibold mb-6 text-indigo-700">About {clinic.clinicName}</h2>
//             <p className="text-gray-700 text-lg leading-relaxed">
//               {clinic.clinicType} clinic specializing in{" "}
//               <span className="font-semibold text-indigo-600">{clinic.specialities.join(", ")}</span>. Operating hours:{" "}
//               <span className="font-semibold">{clinic.operatingHours}</span>.
//             </p>
//           </div>

//           <div className="bg-white rounded-2xl shadow-md p-8">
//             <h2 className="text-3xl font-semibold mb-6 text-indigo-700">Our Doctors</h2>
//             {loadingDoctors ? (
//               <div className="flex items-center justify-center h-28">
//                 <div className="animate-spin h-8 w-8 border-4 border-indigo-600 border-t-transparent rounded-full"></div>
//               </div>
//             ) : doctors.length === 0 ? (
//               <p className="text-gray-600 text-lg">No doctors found.</p>
//             ) : (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//                 {doctors.map((doc) => (
//                   <div
//                     key={doc._id}
//                     onClick={() => navigate(`/view-doctor-profile/${doc._id}`)}
//                     className="group cursor-pointer border border-gray-300 rounded-2xl p-6 bg-white shadow-sm hover:shadow-lg hover:scale-[1.04] transition-transform duration-300"
//                     title={`View profile of Dr. ${doc.fullName}`}
//                   >
//                     <div className="flex items-center space-x-6">
//                       <div className="w-24 h-24 rounded-full border-4 border-indigo-600 overflow-hidden flex-shrink-0 bg-gray-100 flex items-center justify-center text-gray-400 text-sm font-semibold">
//                         {doc.photo ? (
//                           <img
//                             src={`http://localhost:3000/uploads/${doc.photo}`}
//                             alt={doc.fullName}
//                             className="w-full h-full object-cover"
//                           />
//                         ) : (
//                           "No Image"
//                         )}
//                       </div>
//                       <div className="flex-1">
//                         <h3 className="text-xl font-bold text-gray-900">{doc.fullName}</h3>
//                         <p className="text-indigo-600 font-semibold">{doc.specialization}</p>
//                         <p className="text-gray-600 mt-1">{doc.experience} years experience</p>
//                         <p className="text-gray-800 font-semibold mt-2">₹{doc.consultationFee} / consultation</p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {activeTab === "doctors" && (
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Filters Sidebar */}
//           <div className="lg:w-1/4 w-full">
//             <button
//               className="lg:hidden w-full bg-indigo-700 text-white font-semibold px-5 py-3 rounded-lg mb-6 shadow-lg"
//               onClick={() => setShowFilters(!showFilters)}
//             >
//               {showFilters ? "Hide Filters" : "Show Filters"}
//             </button>

//             {(showFilters || window.innerWidth >= 1024) && (
//               <div className="bg-white rounded-2xl shadow-md p-6 sticky top-4">
//                 <h3 className="text-2xl font-semibold mb-6 text-indigo-700">Filters</h3>
//                 <div className="space-y-6">
//                   {/* Gender */}
//                   <div>
//                     <h4 className="font-semibold text-gray-800 mb-3">Gender</h4>
//                     {["Male", "Female"].map((g) => (
//                       <label key={g} className="flex items-center space-x-3 cursor-pointer">
//                         <input
//                           type="checkbox"
//                           checked={filters.gender.includes(g)}
//                           onChange={() => handleFilterChange("gender", g)}
//                           className="form-checkbox h-5 w-5 text-indigo-600"
//                         />
//                         <span className="text-gray-700">{g}</span>
//                       </label>
//                     ))}
//                   </div>

//                   {/* Fees */}
//                   <div>
//                     <h4 className="font-semibold text-gray-800 mb-3">Consultation Fee</h4>
//                     {[
//                       { label: "₹0 - ₹500", value: "0-500" },
//                       { label: "₹500 - ₹1000", value: "500-1000" },
//                       { label: "₹1000+", value: "1000+" },
//                     ].map(({ label, value }) => (
//                       <label key={value} className="flex items-center space-x-3 cursor-pointer">
//                         <input
//                           type="checkbox"
//                           checked={filters.fees.includes(value)}
//                           onChange={() => handleFilterChange("fees", value)}
//                           className="form-checkbox h-5 w-5 text-indigo-600"
//                         />
//                         <span className="text-gray-700">{label}</span>
//                       </label>
//                     ))}
//                   </div>

//                   {/* Experience */}
//                   <div>
//                     <h4 className="font-semibold text-gray-800 mb-3">Experience</h4>
//                     {[
//                       { label: "0 - 2 years", value: "0-2" },
//                       { label: "3 - 5 years", value: "3-5" },
//                       { label: "5+ years", value: "5+" },
//                     ].map(({ label, value }) => (
//                       <label key={value} className="flex items-center space-x-3 cursor-pointer">
//                         <input
//                           type="checkbox"
//                           checked={filters.experience.includes(value)}
//                           onChange={() => handleFilterChange("experience", value)}
//                           className="form-checkbox h-5 w-5 text-indigo-600"
//                         />
//                         <span className="text-gray-700">{label}</span>
//                       </label>
//                     ))}
//                   </div>

//                   {/* Search */}
//                   <div>
//                     <label htmlFor="search" className="block text-gray-800 font-semibold mb-2">
//                       Search Doctor
//                     </label>
//                     <div className="relative text-gray-600 focus-within:text-indigo-600">
//                       <input
//                         id="search"
//                         type="search"
//                         placeholder="Search by name or specialization..."
//                         className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
//                         value={filters.search}
//                         onChange={(e: ChangeEvent<HTMLInputElement>) =>
//                           handleFilterChange("search", e.target.value)
//                         }
//                       />
//                       <Search className="absolute left-3 top-2.5" size={20} />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Doctor List */}
//           <div className="flex-1">
//             {loadingDoctors ? (
//               <div className="flex items-center justify-center h-32">
//                 <div className="animate-spin h-10 w-10 border-4 border-indigo-600 border-t-transparent rounded-full"></div>
//               </div>
//             ) : filteredDoctors.length === 0 ? (
//               <p className="text-gray-600 text-center text-lg">No doctors match your filters.</p>
//             ) : (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//                 {filteredDoctors.map((doc) => (
//                   <div
//                     key={doc._id}
//                     onClick={() => navigate(`/view-doctor-profile/${doc._id}`)}
//                     className="group cursor-pointer border border-gray-300 rounded-2xl p-6 bg-white shadow-sm hover:shadow-lg hover:scale-[1.04] transition-transform duration-300"
//                     title={`View profile of Dr. ${doc.fullName}`}
//                   >
//                     <div className="flex items-center space-x-6">
//                       <div className="w-24 h-24 rounded-full border-4 border-indigo-600 overflow-hidden flex-shrink-0 bg-gray-100 flex items-center justify-center text-gray-400 text-sm font-semibold">
//                         {doc.photo ? (
//                           <img
//                             src={`http://localhost:3000/uploads/${doc.photo}`}
//                             alt={doc.fullName}
//                             className="w-full h-full object-cover"
//                           />
//                         ) : (
//                           "No Image"
//                         )}
//                       </div>
//                       <div className="flex-1">
//                         <h3 className="text-xl font-bold text-gray-900">{doc.fullName}</h3>
//                         <p className="text-indigo-600 font-semibold">{doc.specialization}</p>
//                         <p className="text-gray-600 mt-1">{doc.experience} years experience</p>
//                         <p className="text-gray-800 font-semibold mt-2">₹{doc.consultationFee} / consultation</p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {activeTab === "services" && (
//         <div className="bg-white rounded-2xl shadow-md p-8 text-gray-700">
//           <h2 className="text-3xl font-semibold mb-6 text-indigo-700">Services</h2>
//           <p>This section can be updated with clinic services details.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ClinicDetails;

import React, { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../Services/mainApi";
import { Phone, MapPin, Mail, Clock, Award, Search } from "lucide-react";
// import api from "../Services/mainApi";
// import { Phone, MapPin, Mail, Clock, Search } from "lucide-react";
import clinicImage from "../assets/clinic.jpg";

// ---------- Types ----------
interface Doctor {
  _id: string;
  fullName: string;
  specialization: string;
  experience: number;
  consultationFee: number;
  gender: "Male" | "Female";
  photo?: string;
}

interface Clinic {
  _id: string;
  clinicName: string;
  clinicType: string;
  specialities: string[];
  address: string;
  district: string;
  state: string;
  phone: string;
  email: string;
  operatingHours: string;
}

interface ClinicResponse {
  clinic: Clinic;
}

interface DoctorsResponse {
  doctors: Doctor[];
}

type TabType = "overview" | "doctors" | "services";

interface Filters {
  gender: string[];
  fees: string[];
  experience: string[];
  search: string;
}

// ---------- Component ----------
const ClinicDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [clinic, setClinic] = useState<Clinic | null>(null);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  const [filters, setFilters] = useState<Filters>({
    gender: [],
    fees: [],
    experience: [],
    search: "",
  });

  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clinicRes, doctorRes] = await Promise.all([
          api.get<ClinicResponse>(`api/clinic/getClinicById/${id}`),
          api.get<DoctorsResponse>(`api/doctor/getClinicDoctors/${id}`),
        ]);

        setClinic(clinicRes.data.clinic);
        setDoctors(doctorRes.data.doctors || []);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleFilterChange = (type: keyof Filters, value: string) => {
    if (type === "search") {
      setFilters((prev) => ({ ...prev, search: value }));
      return;
    }

    setFilters((prev) => {
      const selected = prev[type].includes(value)
        ? prev[type].filter((v) => v !== value)
        : [...prev[type], value];
      return { ...prev, [type]: selected };
    });
  };

  const filteredDoctors = doctors.filter((doc) => {
    const { gender, fees, experience, search } = filters;

    const genderMatch = gender.length === 0 || gender.includes(doc.gender);
    const feeMatch =
      fees.length === 0 ||
      fees.some((range) => {
        if (range === "0-500") return doc.consultationFee <= 500;
        if (range === "500-1000")
          return doc.consultationFee > 500 && doc.consultationFee <= 1000;
        if (range === "1000+") return doc.consultationFee > 1000;
        return false;
      });
    const experienceMatch =
      experience.length === 0 ||
      experience.some((range) => {
        if (range === "0-2") return doc.experience <= 2;
        if (range === "3-5") return doc.experience >= 3 && doc.experience <= 5;
        if (range === "5+") return doc.experience > 5;
        return false;
      });
    const searchMatch =
      search.trim() === "" ||
      doc.fullName.toLowerCase().includes(search.toLowerCase()) ||
      doc.specialization.toLowerCase().includes(search.toLowerCase());

    return genderMatch && feeMatch && experienceMatch && searchMatch;
  });

  if (loading)
    return (
      <div className="flex items-center justify-center h-60">
        <div className="animate-spin h-8 w-8 border-4 border-indigo-600 border-t-transparent rounded-full"></div>
      </div>
    );

  if (!clinic)
    return (
      <div className="text-center text-gray-500 text-xl mt-20">
        Clinic not found
      </div>
    );

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* ---------- Hero Section ---------- */}
      <div className="relative h-[400px]  overflow-hidden shadow-md mt-0 ">
        <img
          src={clinicImage}
          alt="Clinic banner"
          className="absolute inset-0 w-full h-full object-cover "
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <h1 className="text-5xl font-bold">{clinic.clinicName}</h1>
          <p className="text-xl font-medium mt-2">{clinic.clinicType}</p>

          <div className="flex flex-wrap justify-center gap-6 mt-6 text-base text-gray-200">
            <p className="flex items-center gap-2">
              <MapPin size={18} /> {clinic.district}
            </p>
            <p className="flex items-center gap-2">
              <Mail size={18} /> {clinic.email}
            </p>
            <p className="flex items-center gap-2">
              <Clock size={18} /> {clinic.operatingHours}
            </p>
          </div>

          <a
            href={`tel:${clinic.phone}`}
            className="mt-8 bg-white text-indigo-700 hover:bg-indigo-700 hover:text-white px-8 py-3 rounded-full font-semibold shadow-md transition"
          >
            <Phone size={18} className="inline mr-2" />
            Call Now
          </a>
        </div>
      </div>

      {/* ---------- Tabs ---------- */}
      <div className="flex justify-center gap-10 border-b border-gray-200 mt-10">
        {(["overview", "doctors", "services"] as TabType[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-lg font-semibold capitalize relative transition-all duration-300 ${
              activeTab === tab
                ? "text-indigo-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-indigo-600"
                : "text-gray-500 hover:text-indigo-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ---------- Tab Content ---------- */}
      <div className="container mx-auto px-4 sm:px-8 mt-10 ">
        {/* Overview */}
        {activeTab === "overview" && (
          <div className="bg-white rounded-xl shadow-md p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-indigo-700 mb-3">
              About {clinic.clinicName}
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Welcome to{" "}
              <span className="font-semibold">{clinic.clinicName}</span> — a{" "}
              <span className="capitalize">{clinic.clinicType}</span> clinic
              specializing in{" "}
              <span className="text-indigo-600 font-semibold">
                {clinic.specialities.join(", ")}
              </span>
              , we are committed to delivering world-class medical care backed by
              a team of highly experienced neurologists and healthcare
              professionals. Our focus is on providing personalized,
              patient-centered treatment that prioritizes your health, comfort,
              and overall well-being.
            </p>
          </div>
        )}

        {/* Doctors */}
        {activeTab === "doctors" && (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <aside className="lg:w-1/4 w-full">
              <button
                className="lg:hidden w-full bg-indigo-700 text-white font-semibold px-5 py-3 rounded-lg mb-6 shadow-lg"
                onClick={() => setShowFilters(!showFilters)}
              >
                {showFilters ? "Hide Filters" : "Show Filters"}
              </button>

              {(showFilters || window.innerWidth >= 1024) && (
                <section className="bg-white rounded-2xl shadow-md p-6 sticky top-4">
                  <h3 className="text-2xl font-semibold mb-6 text-indigo-700">
                    Filters
                  </h3>
                  <div className="space-y-6">
                    {/* Gender */}
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">
                        Gender
                      </h4>
                      {["Male", "Female"].map((g) => (
                        <label
                          key={g}
                          className="flex items-center space-x-3 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={filters.gender.includes(g)}
                            onChange={() => handleFilterChange("gender", g)}
                            className="form-checkbox h-5 w-5 text-indigo-600"
                          />
                          <span className="text-gray-700">{g}</span>
                        </label>
                      ))}
                    </div>

                    {/* Fees */}
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">
                        Consultation Fee
                      </h4>
                      {[
                        { label: "₹0 - ₹500", value: "0-500" },
                        { label: "₹500 - ₹1000", value: "500-1000" },
                        { label: "₹1000+", value: "1000+" },
                      ].map(({ label, value }) => (
                        <label
                          key={value}
                          className="flex items-center space-x-3 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={filters.fees.includes(value)}
                            onChange={() => handleFilterChange("fees", value)}
                            className="form-checkbox h-5 w-5 text-indigo-600"
                          />
                          <span className="text-gray-700">{label}</span>
                        </label>
                      ))}
                    </div>

                    {/* Experience */}
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">
                        Experience
                      </h4>
                      {[
                        { label: "0 - 2 years", value: "0-2" },
                        { label: "3 - 5 years", value: "3-5" },
                        { label: "5+ years", value: "5+" },
                      ].map(({ label, value }) => (
                        <label
                          key={value}
                          className="flex items-center space-x-3 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={filters.experience.includes(value)}
                            onChange={() =>
                              handleFilterChange("experience", value)
                            }
                            className="form-checkbox h-5 w-5 text-indigo-600"
                          />
                          <span className="text-gray-700">{label}</span>
                        </label>
                      ))}
                    </div>

                    {/* Search */}
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">
                        Search
                      </h4>
                      <div className="relative text-gray-600 focus-within:text-indigo-600">
                        <input
                          type="search"
                          placeholder="Search doctors..."
                          value={filters.search}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            handleFilterChange("search", e.target.value)
                          }
                          className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <Search
                          size={20}
                          className="absolute left-3 top-2.5 pointer-events-none"
                        />
                      </div>
                    </div>
                  </div>
                </section>
              )}
            </aside>

            {/* Doctors Grid */}
            <main className="flex-1">
              {filteredDoctors.length === 0 ? (
                <p className="text-gray-600 text-lg text-center">
                  No doctors match your filters.
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredDoctors.map((doc) => (
                    <div
                      key={doc._id}
                      onClick={() =>
                        navigate(`/view-doctor-profile/${doc._id}`)
                      }
                      className="cursor-pointer bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition"
                    >
                      <div className="flex items-center gap-5">
                        <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center border-2 border-indigo-500">
                          {doc.photo ? (
                            <img
                              src={`http://localhost:3000/uploads/${doc.photo}`}
                              alt={doc.fullName}
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <span className="text-gray-400 text-sm">
                              No Image
                            </span>
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">
                            {doc.fullName}
                          </h3>
                          <p className="text-indigo-600 text-sm font-medium">
                            {doc.specialization}
                          </p>
                          <p className="text-gray-500 text-sm">
                            {doc.experience} years exp
                          </p>
                          <p className="text-gray-800 font-semibold mt-1">
                            ₹{doc.consultationFee}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </main>
          </div>
        )}

        {/* Services */}
        {activeTab === "services" && (
          <div className="text-center text-gray-600 bg-white rounded-xl shadow-md p-8 max-w-3xl mx-auto">
            <p>Services details are coming soon. Stay tuned!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClinicDetails;
