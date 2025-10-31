// import Lottie from "lottie-react";
// import animation from "../assets/animation1.json";
// import { useEffect, useState } from "react";
// import {
//   MapPin,
//   Clock,
//   Phone,
//   Mail,
//   Stethoscope,
//   Building2,
//   Search,
//   Filter,
//   Star,
//   Users,
//   ChevronDown,
//   X,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import api from "../Services/mainApi";

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
//   doctors: unknown[];
//   clinicLicenseNumber: string;
//   operatingHours: string;
//   staffName: string;
//   staffEmail: string;
//   aadharNumber: number;
// }

// export default function AllClinic() {
//   const navigate = useNavigate();
//   const [clinics, setClinics] = useState<Clinic[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showMobileFilters, setShowMobileFilters] = useState(false);
//   const [filters, setFilters] = useState({
//     speciality: "",
//     type: "",
//     state: "",
//     district: "",
//   });

//   useEffect(() => {
//     const fetchClinics = async () => {
//       try {
//         const response = await api.get("api/clinic/getClinic");
//         const data = response.data as { clinic: Clinic[] };
//         setClinics(data.clinic || []);
//       } catch (err) {
//         console.error("Error fetching clinics:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchClinics();
//   }, []);

//   const filteredClinics = clinics.filter((clinic) => {
//     const matchesSearch = clinic.clinicName
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase());
//     const matchesFilters =
//       (!filters.speciality ||
//         clinic.specialities.includes(filters.speciality)) &&
//       (!filters.type || clinic.clinicType === filters.type) &&
//       (!filters.state || clinic.state === filters.state) &&
//       (!filters.district || clinic.district === filters.district);
//     return matchesSearch && matchesFilters;
//   });

//   const clearFilters = () => {
//     setFilters({
//       speciality: "",
//       type: "",
//       state: "",
//       district: "",
//     });
//   };

//   const hasActiveFilters = Object.values(filters).some(
//     (filter) => filter !== ""
//   );

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-slate-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="inline-block w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
//           <p className="text-slate-600 text-lg">Finding clinics near you...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-slate-50">
//       {/* HEADER */}
//       <div className="relative w-full bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 text-white overflow-hidden">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//           <div className="flex flex-col md:flex-row items-center justify-between gap-8">
//             {/* Left Section — Text and Search */}
//             <div className="md:w-1/2 space-y-6">
//               <div>
//                 <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-3">
//                   Find the Right{" "}
//                   <span className="text-blue-300">Healthcare Clinic</span>
//                 </h1>
//                 <p className="text-blue-100 text-lg leading-relaxed">
//                   Discover trusted healthcare professionals, clinics, and
//                   services tailored to your needs. Book consultations, explore
//                   top-rated specialists, and get the care you deserve — all in
//                   one place.
//                 </p>
//               </div>

//               {/* Search Bar */}
//               <div className="relative mt-6">
//                 <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
//                 <input
//                   type="text"
//                   placeholder="Search for clinics, specialities, or locations..."
//                   className="w-full pl-12 pr-4 py-4 text-lg border border-slate-300 rounded-2xl bg-white/90 text-slate-800 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>
//             </div>

//             {/* Right Section — Lottie Animation */}
//             <div className="md:w-1/2 flex justify-center md:justify-end">
//               <Lottie
//                 animationData={animation}
//                 loop
//                 className="w-72 h-72 md:w-96 md:h-96 drop-shadow-lg"
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Filters Sidebar */}
//           <div
//             className={`lg:w-80 ${
//               showMobileFilters ? "block" : "hidden lg:block"
//             }`}
//           >
//             <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 sticky top-6">
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
//                   <Filter className="h-5 w-5 text-blue-600" />
//                   Filters
//                 </h2>
//                 {hasActiveFilters && (
//                   <button
//                     onClick={clearFilters}
//                     className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
//                   >
//                     <X className="h-4 w-4" />
//                     Clear all
//                   </button>
//                 )}
//                 {/* Mobile close button */}
//                 <button
//                   onClick={() => setShowMobileFilters(false)}
//                   className="lg:hidden text-slate-400 hover:text-slate-600"
//                 >
//                   <X className="h-6 w-6" />
//                 </button>
//               </div>

//               <div className="space-y-6">
//                 {/* Speciality Filter */}
//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-3">
//                     Medical Speciality
//                   </label>
//                   <div className="relative">
//                     <select
//                       className="w-full appearance-none bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 pr-10 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                       value={filters.speciality}
//                       onChange={(e) =>
//                         setFilters({ ...filters, speciality: e.target.value })
//                       }
//                     >
//                       <option value="">All Specialities</option>
//                       <option value="Dental">🦷 Dental</option>
//                       <option value="Dermatology">🫧 Dermatology</option>
//                       <option value="Pediatrics">👶 Pediatrics</option>
//                       <option value="Cardiology">❤️ Cardiology</option>
//                       <option value="Gynecology">👩‍⚕️ Gynecology</option>
//                       <option value="Orthopedic">🦴 Orthopedic</option>
//                       <option value="ENT">👂 ENT</option>
//                       <option value="General">🩺 General</option>
//                     </select>
//                     <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5 pointer-events-none" />
//                   </div>
//                 </div>

//                 {/* Type Filter */}
//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-3">
//                     Clinic Type
//                   </label>
//                   <div className="grid grid-cols-2 gap-3">
//                     <button
//                       onClick={() =>
//                         setFilters({
//                           ...filters,
//                           type:
//                             filters.type === "Government" ? "" : "Government",
//                         })
//                       }
//                       className={`p-3 rounded-xl border-2 transition-all duration-200 text-sm font-medium ${
//                         filters.type === "Government"
//                           ? "border-blue-500 bg-blue-50 text-blue-700"
//                           : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
//                       }`}
//                     >
//                       🏛️ Govt
//                     </button>
//                     <button
//                       onClick={() =>
//                         setFilters({
//                           ...filters,
//                           type: filters.type === "Private" ? "" : "Private",
//                         })
//                       }
//                       className={`p-3 rounded-xl border-2 transition-all duration-200 text-sm font-medium ${
//                         filters.type === "Private"
//                           ? "border-blue-500 bg-blue-50 text-blue-700"
//                           : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
//                       }`}
//                     >
//                       🏥 Private
//                     </button>
//                   </div>
//                 </div>

//                 {/* Location Filters */}
//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-3">
//                     State
//                   </label>
//                   <div className="relative">
//                     <select
//                       className="w-full appearance-none bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 pr-10 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                       value={filters.state}
//                       onChange={(e) =>
//                         setFilters({ ...filters, state: e.target.value })
//                       }
//                     >
//                       <option value="">All States</option>
//                       <option value="Madhya Pradesh">Madhya Pradesh</option>
//                       <option value="Chhattisgarh">Chhattisgarh</option>
//                       <option value="Maharashtra">Maharashtra</option>
//                       <option value="Delhi">Delhi</option>
//                       <option value="Karnataka">Karnataka</option>
//                       <option value="Uttar Pradesh">Uttar Pradesh</option>
//                     </select>
//                     <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5 pointer-events-none" />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-3">
//                     District
//                   </label>
//                   <div className="relative">
//                     <select
//                       className="w-full appearance-none bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 pr-10 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                       value={filters.district}
//                       onChange={(e) =>
//                         setFilters({ ...filters, district: e.target.value })
//                       }
//                     >
//                       <option value="">All Districts</option>
//                       <option value="Raipur">Raipur</option>
//                       <option value="Bhopal">Bhopal</option>
//                       <option value="Nagpur">Nagpur</option>
//                       <option value="Lucknow">Lucknow</option>
//                       <option value="Bengaluru">Bengaluru</option>
//                       <option value="New Delhi">New Delhi</option>
//                       <option value="Durg">Durg</option>
//                     </select>
//                     <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5 pointer-events-none" />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Results Section */}
//           <div className="flex-1">
//             {/* Results Header */}
//             <div className="mb-6">
//               <div className="flex items-center justify-between">
//                 <p className="text-slate-600">
//                   <span className="font-semibold text-slate-900">
//                     {filteredClinics.length}
//                   </span>{" "}
//                   clinics found
//                 </p>
//                 <div className="hidden sm:flex items-center gap-2 text-sm text-slate-500">
//                   <Star className="h-4 w-4 text-yellow-400 fill-current" />
//                   Quality healthcare providers
//                 </div>
//               </div>
//             </div>

//             {/* Clinics Grid */}
//             <div className="space-y-6  ">
//               {filteredClinics.length === 0 ? (
//                 <div className="text-center py-16 ">
//                   <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
//                     <Building2 className="h-12 w-12 text-slate-400" />
//                   </div>
//                   <h3 className="text-xl font-semibold text-slate-900 mb-2">
//                     No clinics found
//                   </h3>
//                   <p className="text-slate-600 mb-6">
//                     Try adjusting your search criteria or filters
//                   </p>
//                   {hasActiveFilters && (
//                     <button
//                       onClick={clearFilters}
//                       className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium shadow-sm hover:bg-blue-700 transition-colors duration-200"
//                     >
//                       <X className="h-5 w-5" />
//                       Clear all filters
//                     </button>
//                   )}
//                 </div>
//               ) : (
//                 filteredClinics.map((clinic) => (
//                   <div
//                     key={clinic._id}
//                     className="bg-white rounded-3xl shadow-sm border border-slate-200 hover:shadow-md hover:border-blue-200 transition-all duration-300 overflow-hidden group "
//                   >
//                     <div className="p-8">
//                       {/* Header */}
//                       <div className="flex items-start justify-between mb-6">
//                         <div className="flex-1">
//                           <h3
//                             onClick={() => navigate(`/clinic/${clinic._id}`)}
//                             className="text-2xl font-bold text-slate-900 hover:text-blue-600 cursor-pointer transition-colors duration-200 flex items-center gap-3 group-hover:text-blue-600"
//                           >
//                             <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-200">
//                               <Building2 className="h-6 w-6 text-blue-600" />
//                             </div>
//                             {clinic.clinicName}
//                           </h3>
//                           <div className="flex items-center gap-4 mt-3">
//                             <span
//                               className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
//                                 clinic.clinicType === "Government"
//                                   ? "bg-green-100 text-green-700"
//                                   : "bg-blue-100 text-blue-700"
//                               }`}
//                             >
//                               {clinic.clinicType === "Government" ? "🏛️" : "🏥"}{" "}
//                               {clinic.clinicType}
//                             </span>
//                             <div className="flex items-center gap-1 text-slate-500">
//                               <Users className="h-4 w-4" />
//                               <span className="text-sm">
//                                 {clinic.doctors.length} doctors
//                               </span>
//                             </div>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Contact Info Grid */}
//                       <div className="grid sm:grid-cols-2 gap-4 mb-6">
//                         <div className="flex items-center gap-3 text-slate-600">
//                           <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
//                             <MapPin className="h-5 w-5 text-slate-500" />
//                           </div>
//                           <div>
//                             <p className="font-medium text-slate-900">
//                               {clinic.district}, {clinic.state}
//                             </p>
//                             <p className="text-sm text-slate-500">
//                               {clinic.street}
//                             </p>
//                           </div>
//                         </div>

//                         <div className="flex items-center gap-3 text-slate-600">
//                           <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
//                             <Clock className="h-5 w-5 text-slate-500" />
//                           </div>
//                           <div>
//                             <p className="font-medium text-slate-900">
//                               {clinic.operatingHours || "24/7 Available"}
//                             </p>
//                             <p className="text-sm text-slate-500">
//                               Operating Hours
//                             </p>
//                           </div>
//                         </div>

//                         <div className="flex items-center gap-3 text-slate-600">
//                           <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
//                             <Phone className="h-5 w-5 text-slate-500" />
//                           </div>
//                           <div>
//                             <p className="font-medium text-slate-900">
//                               {clinic.phone || "Contact Available"}
//                             </p>
//                             <p className="text-sm text-slate-500">
//                               Phone Number
//                             </p>
//                           </div>
//                         </div>

//                         <div className="flex items-center gap-3 text-slate-600">
//                           <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
//                             <Mail className="h-5 w-5 text-slate-500" />
//                           </div>
//                           <div>
//                             <p className="font-medium text-slate-900">
//                               {clinic.email || "Email Available"}
//                             </p>
//                             <p className="text-sm text-slate-500">
//                               Email Address
//                             </p>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Specialities */}
//                       <div className="border-t border-slate-100 pt-6">
//                         <div className="flex items-center gap-2 mb-4">
//                           <Stethoscope className="h-5 w-5 text-blue-600" />
//                           <span className="font-semibold text-slate-900">
//                             Medical Specialities
//                           </span>
//                         </div>
//                         <div className="flex flex-wrap gap-2">
//                           {clinic.specialities?.length > 0 ? (
//                             clinic.specialities.map((spec, idx) => (
//                               <span
//                                 key={idx}
//                                 className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200"
//                               >
//                                 {spec}
//                               </span>
//                             ))
//                           ) : (
//                             <span className="text-slate-400 text-sm italic">
//                               No specialities listed
//                             </span>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import Lottie from "lottie-react";
import animation from "../assets/animation1.json";
import { useEffect, useState, useMemo } from "react";
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Stethoscope,
  Building2,
  Search,
  Filter,
  Star,
  Users,
  ChevronDown,
  X,
  Shield,
  Award,
  Calendar,
  Navigation,
  Menu,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../Services/mainApi";

interface Clinic {
  _id: string;
  clinicName: string;
  clinicType: string;
  specialities: string[];
  address: string;
  street: string;
  district: string;
  state: string;
  phone: string;
  email: string;
  doctors: unknown[];
  clinicLicenseNumber: string;
  operatingHours: string;
  staffName: string;
  staffEmail: string;
  aadharNumber: number;
  rating?: number;
  patientCount?: number;
  establishedYear?: number;
}

interface Filters {
  speciality: string;
  type: string;
  state: string;
  district: string;
  rating: string;
}

export default function AllClinic() {
  const navigate = useNavigate();
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    speciality: "",
    type: "",
    state: "",
    district: "",
    rating: "",
  });

  // Mock data for demonstration - remove in production
  const enhanceClinicsWithMockData = (clinics: Clinic[]): Clinic[] => {
    return clinics.map(clinic => ({
      ...clinic,
      rating: Math.random() * 2 + 3, // Random rating between 3-5
      patientCount: Math.floor(Math.random() * 5000) + 1000,
      establishedYear: Math.floor(Math.random() * 30) + 1990,
    }));
  };

  useEffect(() => {
    const fetchClinics = async () => {
      try {
        setLoading(true);
        const response = await api.get("api/clinic/getClinic");
        const data = response.data as { clinic: Clinic[] };
        const enhancedClinics = enhanceClinicsWithMockData(data.clinic || []);
        setClinics(enhancedClinics);
      } catch (err) {
        console.error("Error fetching clinics:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchClinics();
  }, []);

  const filteredClinics = useMemo(() => {
    return clinics.filter((clinic) => {
      const matchesSearch = clinic.clinicName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
        clinic.specialities.some(spec => 
          spec.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        clinic.district.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilters =
        (!filters.speciality ||
          clinic.specialities.includes(filters.speciality)) &&
        (!filters.type || clinic.clinicType === filters.type) &&
        (!filters.state || clinic.state === filters.state) &&
        (!filters.district || clinic.district === filters.district) &&
        (!filters.rating || (clinic.rating && clinic.rating >= parseFloat(filters.rating)));

      return matchesSearch && matchesFilters;
    });
  }, [clinics, searchTerm, filters]);

  const clearFilters = () => {
    setFilters({
      speciality: "",
      type: "",
      state: "",
      district: "",
      rating: "",
    });
  };

  const hasActiveFilters = Object.values(filters).some(
    (filter) => filter !== ""
  );

  const specialityOptions = [
    { value: "Dental", label: "🦷 Dental", color: "text-green-600" },
    { value: "Dermatology", label: "🫧 Dermatology", color: "text-pink-600" },
    { value: "Pediatrics", label: "👶 Pediatrics", color: "text-blue-600" },
    { value: "Cardiology", label: "❤️ Cardiology", color: "text-red-600" },
    { value: "Gynecology", label: "👩‍⚕️ Gynecology", color: "text-purple-600" },
    { value: "Orthopedic", label: "🦴 Orthopedic", color: "text-orange-600" },
    { value: "ENT", label: "👂 ENT", color: "text-cyan-600" },
    { value: "General", label: "🩺 General", color: "text-gray-600" },
  ];

  const ratingOptions = [
    { value: "4.5", label: "4.5★ & above" },
    { value: "4.0", label: "4.0★ & above" },
    { value: "3.5", label: "3.5★ & above" },
    { value: "3.0", label: "3.0★ & above" },
  ];

  // Close mobile filters when clicking on overlay
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setShowMobileFilters(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-slate-700 text-lg font-medium mb-2">Finding the best clinics for you...</p>
          <p className="text-slate-500 text-sm">Loading quality healthcare providers</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Enhanced Header */}
      <div className="relative w-full  text-white overflow-hidden">
        {/* <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-blue-600 rounded-full -translate-y-32 translate-x-32 md:-translate-y-48 md:translate-x-48 opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-56 h-56 md:w-80 md:h-80 bg-blue-500 rounded-full -translate-x-28 translate-y-28 md:-translate-x-40 md:translate-y-40 opacity-30"></div> */}
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            {/* Left Section */}
            <div className="w-full lg:w-1/2 space-y-6 md:space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                  <Award className="h-3 w-3 md:h-4 md:w-4" />
                  <span className="text-xs md:text-sm font-medium">Trusted Healthcare Platform</span>
                </div>
                
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-black font-bold leading-tight">
                  Find Your{" "}
                  <span className="text-blue-600 ">
                    Perfect Clinic
                  </span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-black leading-relaxed max-w-2xl">
                  Discover certified healthcare providers with verified credentials. 
                  Book appointments, read reviews, and get quality care tailored to your needs.
                </p>
              </div>

              {/* Enhanced Search Bar */}
              <div className="relative max-w-2xl">
                <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-xl md:rounded-2xl -m-1"></div>
                <div className="relative">
                  <Search className="absolute left-3 sm:left-4 md:left-6 top-1/2 transform -translate-y-1/2 text-blue-500 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 z-10" />
                  <input
                    type="text"
                    placeholder="Search clinics, specialities, locations..."
                    className="w-full pl-10 sm:pl-12 md:pl-16 pr-4 py-3 sm:py-4 md:py-5 text-sm sm:text-base md:text-lg border-0 rounded-xl md:rounded-2xl bg-white/95 backdrop-blur-sm text-slate-800 shadow-xl focus:outline-none focus:ring-2 sm:focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 placeholder-slate-400"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Quick Stats */}
              <div className="flex items-center gap-4 sm:gap-6 md:gap-8 pt-2 md:pt-4">
                <div className="text-center">
                  <div className="text-lg sm:text-xl md:text-2xl font-bold text-black">{clinics.length}+</div>
                  <div className="text-blue-600 text-xs sm:text-sm">Verified Clinics</div>
                </div>
                <div className="w-px h-6 sm:h-8 bg-blue-600"></div>
                <div className="text-center">
                  <div className="text-lg sm:text-xl md:text-2xl font-bold text-black">24/7</div>
                  <div className="text-blue-600 text-xs sm:text-sm">Available</div>
                </div>
                <div className="w-px h-6 sm:h-8 bg-blue-600"></div>
                <div className="text-center">
                  <div className="text-lg sm:text-xl md:text-2xl font-bold text-black">100%</div>
                  <div className="text-blue-600 text-xs sm:text-sm">Certified</div>
                </div>
              </div>
            </div>

            {/* Right Section - Animation */}
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end mt-4 lg:mt-0">
              <div className="relative">
                <div className="absolute -inset-2 sm:-inset-3 md:-inset-4 rounded-2xl sm:rounded-3xl blur-xl"></div>
                <Lottie
                  animationData={animation}
                  loop
                  className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 relative drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
          {/* Mobile Filter Button */}
          <div className="lg:hidden flex items-center justify-between mb-2">
            <button
              onClick={() => setShowMobileFilters(true)}
              className="inline-flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-xl font-medium shadow-lg hover:bg-blue-700 transition-colors duration-200 flex-1 mr-3"
            >
              <Filter className="h-5 w-5" />
              Filters & Search
              {hasActiveFilters && (
                <span className="ml-auto bg-white text-blue-600 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {Object.values(filters).filter(f => f !== "").length}
                </span>
              )}
            </button>
            
            <div className="flex items-center gap-2 text-slate-600 bg-white px-3 py-2 rounded-xl border border-slate-200 min-w-fit">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="text-sm font-medium whitespace-nowrap">Verified</span>
            </div>
          </div>

          {/* Enhanced Filters Sidebar */}
          <div 
            className={` transition-transform duration-300 ${
              showMobileFilters ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
            }`}
            onClick={handleOverlayClick}
          >
            <div 
              className={`bg-white h-full lg:h-auto w-full max-w-sm lg:max-w-none lg:w-80 rounded-none lg:rounded-3xl shadow-2xl lg:shadow-xl border-0 lg:border border-slate-200/60 backdrop-blur-sm overflow-y-auto ${
                showMobileFilters ? "animate-in slide-in-from-left-8" : ""
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 sm:p-6 border-b border-slate-100 bg-white">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Filter className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                    </div>
                    Filters
                  </h2>
                  <div className="flex items-center gap-2">
                    {hasActiveFilters && (
                      <button
                        onClick={clearFilters}
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2 px-2 sm:px-3 py-1 rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        <X className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="hidden sm:inline">Clear</span>
                      </button>
                    )}
                    <button
                      onClick={() => setShowMobileFilters(false)}
                      className="lg:hidden text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
                    >
                      <X className="h-5 w-5 sm:h-6 sm:w-6" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-6 space-y-6 md:space-y-8 pb-32 lg:pb-6">
                {/* Rating Filter */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    Minimum Rating
                  </label>
                  <div className="space-y-2">
                    {ratingOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setFilters({ ...filters, rating: filters.rating === option.value ? "" : option.value })}
                        className={`w-full text-left px-3 sm:px-4 py-2 sm:py-3 rounded-xl border-2 transition-all duration-200 text-sm font-medium ${
                          filters.rating === option.value
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Speciality Filter */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-3">Medical Speciality</label>
                  <div className="space-y-2">
                    {specialityOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setFilters({ ...filters, speciality: filters.speciality === option.value ? "" : option.value })}
                        className={`w-full text-left px-3 sm:px-4 py-2 sm:py-3 rounded-xl border-2 transition-all duration-200 text-sm font-medium flex items-center gap-3 ${
                          filters.speciality === option.value
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        <span className={option.color}>{option.label.split(' ')[0]}</span>
                        <span className="truncate">{option.label.split(' ').slice(1).join(' ')}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Type Filter */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-3">Clinic Type</label>
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <button
                      onClick={() => setFilters({ ...filters, type: filters.type === "Government" ? "" : "Government" })}
                      className={`p-3 sm:p-4 rounded-xl border-2 transition-all duration-200 font-medium flex flex-col items-center gap-1 sm:gap-2 ${
                        filters.type === "Government"
                          ? "border-green-500 bg-green-50 text-green-700"
                          : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                      }`}
                    >
                      <Building2 className="h-5 w-5 sm:h-6 sm:w-6" />
                      <span className="text-xs sm:text-sm">Govt</span>
                    </button>
                    <button
                      onClick={() => setFilters({ ...filters, type: filters.type === "Private" ? "" : "Private" })}
                      className={`p-3 sm:p-4 rounded-xl border-2 transition-all duration-200 font-medium flex flex-col items-center gap-1 sm:gap-2 ${
                        filters.type === "Private"
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                      }`}
                    >
                      <Shield className="h-5 w-5 sm:h-6 sm:w-6" />
                      <span className="text-xs sm:text-sm">Private</span>
                    </button>
                  </div>
                </div>

                {/* Location Filters */}
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-3">Location</label>
                    <div className="relative">
                      <Navigation className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-3 w-3 sm:h-4 sm:w-4" />
                      <select
                        className="w-full appearance-none bg-slate-50 border border-slate-300 rounded-xl pl-8 sm:pl-10 pr-8 py-2 sm:py-3 text-sm sm:text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        value={filters.state}
                        onChange={(e) => setFilters({ ...filters, state: e.target.value })}
                      >
                        <option value="">All States</option>
                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                        <option value="Chhattisgarh">Chhattisgarh</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-3 w-3 sm:h-4 sm:w-4 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-3 w-3 sm:h-4 sm:w-4" />
                      <select
                        className="w-full appearance-none bg-slate-50 border border-slate-300 rounded-xl pl-8 sm:pl-10 pr-8 py-2 sm:py-3 text-sm sm:text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        value={filters.district}
                        onChange={(e) => setFilters({ ...filters, district: e.target.value })}
                      >
                        <option value="">All Districts</option>
                        <option value="Raipur">Raipur</option>
                        <option value="Bhopal">Bhopal</option>
                        <option value="Nagpur">Nagpur</option>
                        <option value="Lucknow">Lucknow</option>
                        <option value="Bengaluru">Bengaluru</option>
                        <option value="New Delhi">New Delhi</option>
                        <option value="Durg">Durg</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-3 w-3 sm:h-4 sm:w-4 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="flex-1 min-w-0">
            {/* Enhanced Results Header */}
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-slate-200/60 p-4 sm:p-6 mb-4 sm:mb-6 lg:mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 truncate">
                    Available Clinics
                  </h2>
                  <p className="text-slate-600 mt-1 text-sm sm:text-base">
                    <span className="font-semibold text-blue-600">{filteredClinics.length}</span>{" "}
                    clinics match your criteria
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex items-center gap-2 text-slate-600 bg-slate-100 px-3 py-2 rounded-xl text-sm">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="font-medium">Quality Verified</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Clinics Grid */}
            <div className="space-y-4 sm:space-y-6">
              {filteredClinics.length === 0 ? (
                <div className="text-center py-12 sm:py-16 md:py-20 bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-slate-200/60">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                    <Building2 className="h-8 w-8 sm:h-10 sm:w-10 md:h-16 md:w-16 text-slate-400" />
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 mb-2 sm:mb-3">
                    No clinics found
                  </h3>
                  <p className="text-slate-600 mb-6 sm:mb-8 max-w-md mx-auto text-sm sm:text-base px-4">
                    We couldn't find any clinics matching your search criteria. 
                    Try adjusting your filters or search terms.
                  </p>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 md:px-8 md:py-4 bg-blue-600 text-white rounded-xl sm:rounded-2xl font-semibold shadow-lg hover:bg-blue-700 transition-all duration-200 hover:shadow-xl text-sm sm:text-base"
                    >
                      <X className="h-4 w-4 sm:h-5 sm:w-5" />
                      Clear all filters
                    </button>
                  )}
                </div>
              ) : (
                filteredClinics.map((clinic) => (
                  <div
                    key={clinic._id}
                    className="group cursor-pointer transform hover:-translate-y-1 transition-all duration-300"
                    onClick={() => navigate(`/clinic/${clinic._id}`)}
                  >
                    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border-2 border-slate-200/60 hover:shadow-lg sm:hover:shadow-xl hover:border-blue-300 transition-all duration-300 overflow-hidden">
                      <div className="p-4 sm:p-6 md:p-8">
                        {/* Header with Rating */}
                        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 sm:gap-6 mb-4 sm:mb-6">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start gap-3 sm:gap-4">
                              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
                                <Building2 className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-200 mb-1 sm:mb-2 truncate">
                                  {clinic.clinicName}
                                </h3>
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${
                                    clinic.clinicType === "Government"
                                      ? "bg-green-100 text-green-700 border border-green-200"
                                      : "bg-blue-100 text-blue-700 border border-blue-200"
                                  }`}>
                                    {clinic.clinicType === "Government" ? "🏛️ Govt" : "🏥 Private"}
                                  </span>
                                  {clinic.rating && (
                                    <div className="flex items-center gap-1 bg-yellow-50 text-yellow-700 px-2 sm:px-3 py-1 rounded-full border border-yellow-200">
                                      <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-current" />
                                      <span className="text-xs sm:text-sm font-semibold">{clinic.rating.toFixed(1)}</span>
                                    </div>
                                  )}
                                  <div className="flex items-center gap-1 text-slate-500 bg-slate-100 px-2 sm:px-3 py-1 rounded-full">
                                    <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                                    <span className="text-xs sm:text-sm font-medium">{clinic.doctors.length} doctors</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Quick Stats */}
                          <div className="flex items-center gap-4 sm:gap-6 bg-slate-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 self-start">
                            {clinic.establishedYear && (
                              <div className="text-center">
                                <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 mx-auto mb-1" />
                                <div className="text-xs sm:text-sm font-semibold text-slate-900">{clinic.establishedYear}</div>
                                <div className="text-xs text-slate-500">Est.</div>
                              </div>
                            )}
                            {clinic.patientCount && (
                              <div className="text-center">
                                <Users className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 mx-auto mb-1" />
                                <div className="text-xs sm:text-sm font-semibold text-slate-900">
                                  {(clinic.patientCount / 1000).toFixed(1)}k+
                                </div>
                                <div className="text-xs text-slate-500">Patients</div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Contact Info Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6">
                          <div className="flex items-center gap-3 p-3 sm:p-4 bg-slate-50 rounded-xl sm:rounded-2xl hover:bg-slate-100 transition-colors duration-200">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white rounded-lg sm:rounded-xl flex items-center justify-center shadow-sm border border-slate-200 flex-shrink-0">
                              <MapPin className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-blue-600" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="font-semibold text-slate-900 text-sm sm:text-base truncate">{clinic.district}, {clinic.state}</p>
                              <p className="text-xs sm:text-sm text-slate-600 mt-1 truncate">{clinic.street}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 p-3 sm:p-4 bg-slate-50 rounded-xl sm:rounded-2xl hover:bg-slate-100 transition-colors duration-200">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white rounded-lg sm:rounded-xl flex items-center justify-center shadow-sm border border-slate-200 flex-shrink-0">
                              <Clock className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-purple-600" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="font-semibold text-slate-900 text-sm sm:text-base truncate">{clinic.operatingHours || "24/7 Available"}</p>
                              <p className="text-xs sm:text-sm text-slate-600 mt-1">Operating Hours</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 p-3 sm:p-4 bg-slate-50 rounded-xl sm:rounded-2xl hover:bg-slate-100 transition-colors duration-200">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white rounded-lg sm:rounded-xl flex items-center justify-center shadow-sm border border-slate-200 flex-shrink-0">
                              <Phone className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-green-600" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="font-semibold text-slate-900 text-sm sm:text-base truncate">{clinic.phone || "Contact Available"}</p>
                              <p className="text-xs sm:text-sm text-slate-600 mt-1">Phone Number</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 p-3 sm:p-4 bg-slate-50 rounded-xl sm:rounded-2xl hover:bg-slate-100 transition-colors duration-200">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white rounded-lg sm:rounded-xl flex items-center justify-center shadow-sm border border-slate-200 flex-shrink-0">
                              <Mail className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-red-600" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="font-semibold text-slate-900 text-sm sm:text-base truncate">{clinic.email || "Email Available"}</p>
                              <p className="text-xs sm:text-sm text-slate-600 mt-1">Email Address</p>
                            </div>
                          </div>
                        </div>

                        {/* Specialities */}
                        <div className="border-t border-slate-100 pt-4 sm:pt-6">
                          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                              <Stethoscope className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                            </div>
                            <span className="font-bold text-slate-900 text-base sm:text-lg">Medical Specialities</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {clinic.specialities?.length > 0 ? (
                              clinic.specialities.map((spec, idx) => {
                                const speciality = specialityOptions.find(s => s.value === spec);
                                return (
                                  <span
                                    key={idx}
                                    className="inline-flex items-center px-2 sm:px-3 py-1 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors duration-200 max-w-full truncate"
                                  >
                                    {speciality?.label.split(' ')[0]} {spec}
                                  </span>
                                );
                              })
                            ) : (
                              <span className="text-slate-400 text-sm italic">
                                No specialities listed
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}