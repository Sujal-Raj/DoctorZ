

// import React, { useEffect, useMemo, useState } from "react";
// import DoctorCard from "../components/DoctorCard.js";
// import type { Doctor } from "../components/DoctorCard.js";
// import BookingDrawer from "../components/BookingDrawer.jsx";
// import { Stethoscope, Filter } from "lucide-react";

// // 🔹 BookingDrawer को fees:number चाहिए
// interface DoctorForBooking {
//   _id: string;
//   fullName: string;
//   photo?: string;
//   specialization: string;
//   fees: number; // ✅ number (not string)
//   availability?: Record<string, string[]>; // optional
// }

// // 🔹 Helper: Doctor (UI वाला) → DoctorForBooking (BookingDrawer वाला)
// const mapToBookingDoctor = (doc: Doctor): DoctorForBooking => ({
//   _id: doc._id,
//   fullName: doc.fullName,
//   photo: doc.photo,
//   specialization: doc.specialization,
//   fees: doc.consultationFee, 
//   availability: undefined, // अगर backend से आए तो यहाँ map करना
// });

// const AllDoctor: React.FC = () => {
//    const token = document.cookie
//       .split("; ")
//       .find((row) => row.startsWith("patientToken="))
//       ?.split("=")[1];
//     const payloadBase64 = token?.split(".")[1];
//     const pay = payloadBase64 ? JSON.parse(atob(payloadBase64)) : null;
//     const patientId = pay?.id;
//    console.log(token);
//    console.log(patientId);
//   const [doctors, setDoctors] = useState<Doctor[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null); // Doctor रखा हुआ है
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [search, setSearch] = useState("");
//   const [filterSpec, setFilterSpec] = useState<string | null>(null);


//   const [filterGender, setFilterGender] = useState<string[]>([]); // e.g., ["Male", "Female"]
// const [filterFees, setFilterFees] = useState<string[]>([]); // e.g., ["0-500", "500-1000", "1000+"]
// const [filterExperience, setFilterExperience] = useState<string[]>([]); // e.g., ["0-2", "3-5", "5+"]

//   // ✅ Backend से doctors fetch
//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const response = await fetch("http://localhost:3000/api/doctor/allDoctors");
//         console.log("Raw Response:", response);
//         const data = await response.json();
//         console.log("API Response:", data);

//         if (Array.isArray(data.doctors)) {
//           const validDoctors = data.doctors.filter((doc: unknown) => (doc as Doctor).fullName);
//           setDoctors(validDoctors as Doctor[]);
//         } else {
//           setDoctors([]);
//         }
//       } catch (err) {
//         console.error("Error fetching doctors:", err);
//         setDoctors([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDoctors();
//   }, []);

  
// //filter logic
//   const filtered = useMemo(() => {
//   return doctors.filter((d) => {
    
//  const matchesSearch =
//       search.trim() === "" ||
//       d.fullName?.toLowerCase().includes(search.toLowerCase()) ||
//       d.specialization?.toLowerCase().includes(search.toLowerCase());

//     const matchesSpec =
//       !filterSpec || d.specialization?.trim().toLowerCase() === filterSpec.toLowerCase();

//     const matchesGender =
//       filterGender.length === 0 || (d.gender != null && filterGender.includes(d.gender));

//     const matchesFees =
//       filterFees.length === 0 ||
//       filterFees.some((range) => {
//         const fee = d.consultationFee;
//         if (range === "0-500") return fee >= 0 && fee <= 500;
//         if (range === "500-1000") return fee > 500 && fee <= 1000;
//         if (range === "1000+") return fee > 1000;
//         return false;
//       });

//     const matchesExperience =
//       filterExperience.length === 0 ||
//       filterExperience.some((range) => {
//         const exp = Number(d.experience); // ensure number of years
//         if (range === "0-2") return exp >= 0 && exp <= 2;
//         if (range === "3-5") return exp >= 3 && exp <= 5;
//         if (range === "5+") return exp > 5;
//         return false;
//       });

//     return matchesSearch && matchesSpec && matchesGender && matchesFees && matchesExperience;
//   });
// }, [doctors, search, filterSpec, filterGender, filterFees, filterExperience]);


//   // ✅ Consult button 
//   const handleConsult = (doctor: Doctor) => {
//     setSelectedDoctor(doctor);
//     setDrawerOpen(true);
//   };

//   const handleCloseDrawer = () => {
//     setDrawerOpen(false);
//     setTimeout(() => setSelectedDoctor(null), 300);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-6">
//           <div className="flex items-center gap-4">
//             <Stethoscope className="w-10 h-10 text-blue-600" />
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900">
//                 Consult General Physicians
//               </h1>
//               <p className="text-sm text-gray-500">
//                 Find the best doctors near you — online & offline
//               </p>
//             </div>
//           </div>

//           {/* Search + Filter */}
//           <div className="flex items-center gap-3">
//             <div className="hidden md:block">
//               <input
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 placeholder="Search doctor, specialization..."
//                 className="px-4 py-2 border rounded-lg w-80 focus:outline-none"
//               />
//             </div>

//             <div className="flex items-center gap-2 border rounded-lg px-3 py-2 bg-white">
//               <Filter className="w-4 h-4 text-gray-600" />
//               <select
//                 value={filterSpec ?? ""}
//                 onChange={(e) => setFilterSpec(e.target.value || null)}
//                 className="text-sm"
//               >
//                 <option value="">All Specializations</option>
//                 <option value="General Practitioner">General Practitioner</option>
//                 <option value="Dermatologist">Dermatologist</option>
//                 <option value="Cardiologist">Cardiologist</option>
//                 <option value="Orthologist">Orthologist</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Doctors List */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        


//           {/* Sidebar Filters */}
// <aside className="hidden md:block md:col-span-1">
//   <div className="bg-white rounded-lg p-4 shadow">
//     <h3 className="font-semibold mb-3">Filters</h3>
   

//     {/* Gender Filter */}
//     <div className="mt-3">
//       <div className="text-sm font-medium mb-2">Gender</div>
//       <label className="flex items-center gap-2">
//         <input type="checkbox" 
//          value="Male"
//     onChange={(e) => {
//       const val = e.target.value;
//       setFilterGender(prev => e.target.checked ? [...prev, val] : prev.filter(x => x !== val));
//     }} />
//         Male
//       </label>
//       <label className="flex items-center gap-2 mt-2">
//         <input type="checkbox"
//          value="Female"
//     onChange={(e) => {
//       const val = e.target.value;
//       setFilterGender(prev => e.target.checked ? [...prev, val] : prev.filter(x => x !== val));
//     }} />
//         Female
//       </label>
//       {/* <label className="flex items-center gap-2 mt-2">
//         <input type="checkbox" />
//         Other
//       </label> */}
//     </div>

//     {/* Fees Filter */}
//     <div className="mt-4">
//       <div className="text-sm font-medium mb-2">Fees</div>
//       <label className="flex items-center gap-2">
//         <input type="checkbox" 
//          value="0-500"
//     onChange={(e) => {
//       const val = e.target.value;
//       setFilterFees(prev => e.target.checked ? [...prev, val] : prev.filter(x => x !== val));
//     }}/> 0 - 500
//       </label>
//       <label className="flex items-center gap-2 mt-2">
//         <input type="checkbox" 
//          value="500-1000"
//     onChange={(e) => {
//       const val = e.target.value;
//       setFilterFees(prev => e.target.checked ? [...prev, val] : prev.filter(x => x !== val));
//     }}/> 500 - 1000
//       </label>
//       <label className="flex items-center gap-2 mt-2">
//         <input type="checkbox" /> 1000+
//       </label>
//     </div>

//     {/* Experience Filter */}
//     <div className="mt-4">
//       <div className="text-sm font-medium mb-2">Experience (years)</div>
//       <label className="flex items-center gap-2">
//         <input type="checkbox"
//          value="0-2"
//     onChange={(e) => {
//       const val = e.target.value;
//       setFilterExperience(prev => e.target.checked ? [...prev, val] : prev.filter(x => x !== val));
//     }} /> 0 - 2
//       </label>
//       <label className="flex items-center gap-2 mt-2">
//         <input type="checkbox"  value="3-5"
//     onChange={(e) => {
//       const val = e.target.value;
//       setFilterExperience(prev => e.target.checked ? [...prev, val] : prev.filter(x => x !== val));
//     }}/> 3 - 5
//       </label>
//       <label className="flex items-center gap-2 mt-2">
//         <input type="checkbox"
//          value="5+"
//     onChange={(e) => {
//       const val = e.target.value;
//       setFilterExperience(prev => e.target.checked ? [...prev, val] : prev.filter(x => x !== val));
//     }} /> 5+
//       </label>
//     </div>
//   </div>
// </aside>


//           {/* Main doctor cards */}
//           <main className="md:col-span-3 space-y-6">
//             {loading ? (
//               <div className="text-center py-20">
//                 <div className="text-blue-600 text-lg font-semibold">
//                   Loading doctors...
//                 </div>
//               </div>
//             ) : filtered.length === 0 ? (
//               <div className="text-center py-20 text-gray-600">
//                 No doctors found.
//               </div>
//             ) : (
//               filtered.map((doc) => (
//                 <DoctorCard

//                   key={doc._id}
//                   doctor={doc}
//                   onConsult={handleConsult}
//                   // onViewProfile={(d) => {
//                   //   setSelectedDoctor(d);
//                   //   setDrawerOpen(true);
//                   // }}
//                 />
//               ))
//             )}
//           </main>
//         </div>
//       </div>

//       {/* Booking drawer */}
//       <BookingDrawer
//         open={drawerOpen}
//         doctor={
//           selectedDoctor ? mapToBookingDoctor(selectedDoctor) : null
//           // ✅ FIX: BookingDrawer को हमेशा DoctorForBooking मिलेगा
//         }
//         onClose={handleCloseDrawer}
//         onBooked={(info: unknown) => {
//           console.log("Booked:", info);
//         }}
//          variant="modal"
//       />
//     </div>
//   );
// };

// export default AllDoctor;
import React, { useEffect, useMemo, useState } from "react";
import DoctorCard from "../components/DoctorCard.js";
import type { Doctor } from "../components/DoctorCard.js";
import BookingDrawer from "../components/BookingDrawer.jsx";
import { 
  Stethoscope, 
  Filter, 
  Search, 
  X, 
  Star, 
  MapPin, 
  Clock,
  Award,
  Shield,
  Calendar,
  Users,
  Menu,
  SlidersHorizontal
} from "lucide-react";

// 🔹 Type Definitions
interface DoctorForBooking {
  _id: string;
  fullName: string;
  photo?: string;
  specialization: string;
  fees: number;
  availability?: Record<string, string[]>;
}

interface FilterState {
  specialization: string | null;
  gender: string[];
  fees: string[];
  experience: string[];
}

// 🔹 Helper Function
const mapToBookingDoctor = (doc: Doctor): DoctorForBooking => ({
  _id: doc._id,
  fullName: doc.fullName,
  photo: doc.photo,
  specialization: doc.specialization,
  fees: doc.consultationFee, 
  availability: undefined,
});

const AllDoctor: React.FC = () => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("patientToken="))
    ?.split("=")[1];
  const payloadBase64 = token?.split(".")[1];
  const pay = payloadBase64 ? JSON.parse(atob(payloadBase64)) : null;
  const patientId = pay?.id;

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  
  const [filters, setFilters] = useState<FilterState>({
    specialization: null,
    gender: [],
    fees: [],
    experience: []
  });

  // ✅ Fetch doctors from backend
  useEffect(() => {
    const fetchDoctors = async (): Promise<void> => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3000/api/doctor/allDoctors");
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();

        if (Array.isArray(data.doctors)) {
          const validDoctors = data.doctors.filter((doc: unknown) => 
            doc && typeof doc === 'object' && 'fullName' in doc
          );
          setDoctors(validDoctors as Doctor[]);
        } else {
          setDoctors([]);
        }
      } catch (err) {
        console.error("Error fetching doctors:", err);
        setDoctors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Filter logic with TypeScript
  const filteredDoctors = useMemo((): Doctor[] => {
    return doctors.filter((doctor: Doctor) => {
      const matchesSearch: boolean =
        search.trim() === "" ||
        doctor.fullName?.toLowerCase().includes(search.toLowerCase()) ||
        doctor.specialization?.toLowerCase().includes(search.toLowerCase());

      const matchesSpecialization: boolean =
        !filters.specialization || 
        doctor.specialization?.trim().toLowerCase() === filters.specialization.toLowerCase();

      const matchesGender: boolean =
        filters.gender.length === 0 || 
        (doctor.gender != null && filters.gender.includes(doctor.gender));

      const matchesFees: boolean =
        filters.fees.length === 0 ||
        filters.fees.some((range: string) => {
          const fee: number = doctor.consultationFee;
          switch (range) {
            case "0-500": return fee >= 0 && fee <= 500;
            case "500-1000": return fee > 500 && fee <= 1000;
            case "1000+": return fee > 1000;
            default: return false;
          }
        });

      const matchesExperience: boolean =
        filters.experience.length === 0 ||
        filters.experience.some((range: string) => {
          const exp: number = Number(doctor.experience) || 0;
          switch (range) {
            case "0-2": return exp >= 0 && exp <= 2;
            case "3-5": return exp >= 3 && exp <= 5;
            case "5+": return exp > 5;
            default: return false;
          }
        });

      return matchesSearch && matchesSpecialization && matchesGender && matchesFees && matchesExperience;
    });
  }, [doctors, search, filters]);

  // Event handlers with proper typing
  const handleConsult = (doctor: Doctor): void => {
    setSelectedDoctor(doctor);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = (): void => {
    setDrawerOpen(false);
    setTimeout(() => setSelectedDoctor(null), 300);
  };

  const handleFilterChange = (filterType: keyof FilterState, value: string): void => {
    setFilters(prev => {
      if (filterType === 'specialization') {
        return { ...prev, specialization: value === '' ? null : value };
      }
      
      const currentArray = prev[filterType] as string[];
      const isChecked = currentArray.includes(value);
      
      return {
        ...prev,
        [filterType]: isChecked 
          ? currentArray.filter(item => item !== value)
          : [...currentArray, value]
      };
    });
  };

  const clearAllFilters = (): void => {
    setFilters({
      specialization: null,
      gender: [],
      fees: [],
      experience: []
    });
    setSearch("");
  };

  const removeFilter = (filterType: keyof FilterState, value?: string): void => {
    if (filterType === 'specialization') {
      setFilters(prev => ({ ...prev, specialization: null }));
    } else if (value) {
      setFilters(prev => ({
        ...prev,
        [filterType]: (prev[filterType] as string[]).filter(item => item !== value)
      }));
    }
  };

  // Calculate active filter count
  const activeFilterCount: number = [
    filters.specialization ? 1 : 0,
    filters.gender.length,
    filters.fees.length,
    filters.experience.length,
    search ? 1 : 0
  ].reduce((a: number, b: number) => a + b, 0);

  // Options for filters
  const specializationOptions: string[] = [
    "General Practitioner",
    "Dermatologist", 
    "Cardiologist",
    "Orthologist",
    "Pediatrician",
    "Neurologist"
  ];

  const genderOptions: string[] = ["Male", "Female"];
  
  const feeRanges: Array<{value: string; label: string}> = [
    { value: "0-500", label: "₹0 - ₹500" },
    { value: "500-1000", label: "₹500 - ₹1,000" },
    { value: "1000+", label: "₹1,000+" }
  ];

  const experienceRanges: Array<{value: string; label: string}> = [
    { value: "0-2", label: "0-2 years" },
    { value: "3-5", label: "3-5 years" },
    { value: "5+", label: "5+ years" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-lg bg-blue-50 text-blue-600"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-2">
              <Stethoscope className="w-6 h-6 text-blue-600" />
              <h1 className="text-lg font-bold text-gray-900">Find Doctors</h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="relative p-2 rounded-lg bg-gray-50 text-gray-600"
            >
              <Filter className="w-5 h-5" />
              {activeFilterCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
              placeholder="Search doctors..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between py-8">
            <div className="flex items-center space-x-4 mb-6 lg:mb-0">
              <div className="bg-blue-600 p-3 rounded-2xl shadow-lg">
                <Stethoscope className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Find Your Doctor
                </h1>
                <p className="text-lg text-gray-600 mt-2 flex items-center">
                  <Shield className="w-5 h-5 text-green-500 mr-2" />
                  Trusted medical professionals at your service
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">{doctors.length}+</div>
                <div className="text-sm text-gray-500">Verified Doctors</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">24/7</div>
                <div className="text-sm text-gray-500">Available</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">99%</div>
                <div className="text-sm text-gray-500">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 lg:py-8">
        {/* Desktop Search and Filter Bar */}
        <div className="hidden lg:block bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Search Input */}
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  value={search}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                  placeholder="Search by doctor name, specialization, or condition..."
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-lg"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Filter Controls */}
            <div className="flex items-center space-x-4">
              {/* Desktop Specialization Filter */}
              <div className="hidden lg:flex items-center space-x-2 border border-gray-200 rounded-xl px-4 py-3 bg-white">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={filters.specialization || ""}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => 
                    handleFilterChange('specialization', e.target.value)
                  }
                  className="bg-transparent focus:outline-none text-gray-700 font-medium"
                >
                  <option value="">All Specializations</option>
                  {specializationOptions.map((spec: string) => (
                    <option key={spec} value={spec}>{spec}</option>
                  ))}
                </select>
              </div>

              {/* Clear Filters */}
              {activeFilterCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="hidden lg:flex items-center space-x-2 px-4 py-3 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                  <span>Clear Filters</span>
                </button>
              )}
            </div>
          </div>

          {/* Active Filters Display */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {filters.specialization && (
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm">
                  {filters.specialization}
                  <button 
                    onClick={() => removeFilter('specialization')} 
                    className="ml-2 hover:text-blue-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {filters.gender.map((gender: string) => (
                <span key={gender} className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm">
                  {gender}
                  <button 
                    onClick={() => removeFilter('gender', gender)} 
                    className="ml-2 hover:text-green-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              {filters.fees.map((fee: string) => (
                <span key={fee} className="inline-flex items-center px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-sm">
                  {feeRanges.find(f => f.value === fee)?.label}
                  <button 
                    onClick={() => removeFilter('fees', fee)} 
                    className="ml-2 hover:text-orange-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              {filters.experience.map((exp: string) => (
                <span key={exp} className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-sm">
                  {experienceRanges.find(e => e.value === exp)?.label}
                  <button 
                    onClick={() => removeFilter('experience', exp)} 
                    className="ml-2 hover:text-purple-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              {search && (
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-sm">
                  Search: "{search}"
                  <button 
                    onClick={() => setSearch("")} 
                    className="ml-2 hover:text-gray-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Specialization Filter */}
              <div className="mb-6">
                <div className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                  <Award className="w-4 h-4 mr-2 text-blue-600" />
                  Specialization
                </div>
                <select
                  value={filters.specialization || ""}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => 
                    handleFilterChange('specialization', e.target.value)
                  }
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                >
                  <option value="">All Specializations</option>
                  {specializationOptions.map((spec: string) => (
                    <option key={spec} value={spec}>{spec}</option>
                  ))}
                </select>
              </div>

              {/* Gender Filter */}
              <div className="mb-6">
                <div className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                  <Users className="w-4 h-4 mr-2 text-green-600" />
                  Gender
                </div>
                <div className="space-y-2">
                  {genderOptions.map((gender: string) => (
                    <label key={gender} className="flex items-center space-x-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        value={gender}
                        checked={filters.gender.includes(gender)}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                          handleFilterChange('gender', e.target.value)
                        }
                        className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                      />
                      <span className="text-gray-700 group-hover:text-gray-900">{gender}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Fees Filter */}
              <div className="mb-6">
                <div className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-orange-600" />
                  Consultation Fees
                </div>
                <div className="space-y-2">
                  {feeRanges.map((range) => (
                    <label key={range.value} className="flex items-center space-x-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        value={range.value}
                        checked={filters.fees.includes(range.value)}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                          handleFilterChange('fees', e.target.value)
                        }
                        className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500"
                      />
                      <span className="text-gray-700 group-hover:text-gray-900">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Experience Filter */}
              <div className="mb-6">
                <div className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-purple-600" />
                  Experience
                </div>
                <div className="space-y-2">
                  {experienceRanges.map((range) => (
                    <label key={range.value} className="flex items-center space-x-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        value={range.value}
                        checked={filters.experience.includes(range.value)}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                          handleFilterChange('experience', e.target.value)
                        }
                        className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                      />
                      <span className="text-gray-700 group-hover:text-gray-900">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0"> {/* min-w-0 prevents flex item overflow */}
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 lg:mb-6 gap-2">
              <div>
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900">
                  Available Doctors
                </h2>
                <p className="text-gray-600 mt-1 text-sm lg:text-base">
                  {filteredDoctors.length} doctors found {search && `for "${search}"`}
                </p>
              </div>
              <div className="text-xs lg:text-sm text-gray-500">
                Sorted by: <span className="font-semibold text-gray-700">Relevance</span>
              </div>
            </div>

            {/* Loading State */}
            {loading ? (
              <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg p-8 lg:p-12 text-center">
                <div className="animate-spin rounded-full h-8 lg:h-12 w-8 lg:w-12 border-b-2 border-blue-600 mx-auto mb-3 lg:mb-4"></div>
                <div className="text-blue-600 text-base lg:text-lg font-semibold">
                  Loading qualified doctors...
                </div>
                <p className="text-gray-500 mt-1 lg:mt-2 text-sm lg:text-base">
                  Please wait while we fetch the best medical professionals
                </p>
              </div>
            ) : filteredDoctors.length === 0 ? (
              /* Empty State */
              <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg p-8 lg:p-12 text-center">
                <div className="w-16 lg:w-24 h-16 lg:h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 lg:mb-4">
                  <Search className="w-6 lg:w-10 h-6 lg:h-10 text-gray-400" />
                </div>
                <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2">
                  No doctors found
                </h3>
                <p className="text-gray-600 mb-4 lg:mb-6 text-sm lg:text-base">
                  Try adjusting your search criteria or filters
                </p>
                <button
                  onClick={clearAllFilters}
                  className="bg-blue-600 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-lg lg:rounded-xl hover:bg-blue-700 transition-colors font-medium text-sm lg:text-base"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              /* Doctors Grid */
              <div className="grid gap-3 lg:gap-6">
                {filteredDoctors.map((doctor: Doctor) => (
                  <div key={doctor._id} className="bg-white rounded-xl lg:rounded-2xl shadow-sm lg:shadow-lg border border-gray-100 lg:border-none">
                    <DoctorCard
                      doctor={doctor}
                      onConsult={handleConsult}
                    />
                  </div>
                ))}
              </div>
            )}
          </main>
        </div> 
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50" 
            onClick={() => setMobileFiltersOpen(false)} 
          />
          <div className="absolute inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl overflow-y-auto">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                <div className="flex items-center space-x-2">
                  {activeFilterCount > 0 && (
                    <button
                      onClick={clearAllFilters}
                      className="text-blue-600 text-sm font-medium px-3 py-1"
                    >
                      Clear all
                    </button>
                  )}
                  <button 
                    onClick={() => setMobileFiltersOpen(false)} 
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              {/* Filter Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {/* Specialization */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Specialization
                  </label>
                  <select
                    value={filters.specialization || ""}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => 
                      handleFilterChange('specialization', e.target.value)
                    }
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm"
                  >
                    <option value="">All Specializations</option>
                    {specializationOptions.map((spec: string) => (
                      <option key={spec} value={spec}>{spec}</option>
                    ))}
                  </select>
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Gender
                  </label>
                  <div className="space-y-3">
                    {genderOptions.map((gender: string) => (
                      <label key={gender} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
                        <input
                          type="checkbox"
                          value={gender}
                          checked={filters.gender.includes(gender)}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                            handleFilterChange('gender', e.target.value)
                          }
                          className="w-5 h-5 text-blue-600 rounded border-gray-300"
                        />
                        <span className="text-gray-700">{gender}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Fees */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Consultation Fees
                  </label>
                  <div className="space-y-3">
                    {feeRanges.map((range) => (
                      <label key={range.value} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
                        <input
                          type="checkbox"
                          value={range.value}
                          checked={filters.fees.includes(range.value)}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                            handleFilterChange('fees', e.target.value)
                          }
                          className="w-5 h-5 text-blue-600 rounded border-gray-300"
                        />
                        <span className="text-gray-700">{range.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Experience
                  </label>
                  <div className="space-y-3">
                    {experienceRanges.map((range) => (
                      <label key={range.value} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
                        <input
                          type="checkbox"
                          value={range.value}
                          checked={filters.experience.includes(range.value)}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                            handleFilterChange('experience', e.target.value)
                          }
                          className="w-5 h-5 text-blue-600 rounded border-gray-300"
                        />
                        <span className="text-gray-700">{range.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Apply Button */}
              <div className="p-4 border-t border-gray-200 bg-white sticky bottom-0">
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors text-base"
                >
                  Show {filteredDoctors.length} Doctors
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50" 
            onClick={() => setMobileMenuOpen(false)} 
          />
          <div className="absolute inset-y-0 left-0 w-64 bg-white shadow-xl">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <Stethoscope className="w-6 h-6 text-blue-600" />
                <span className="font-semibold text-gray-900">MediCare</span>
              </div>
            </div>
            <div className="p-4">
              {/* Add mobile menu items here */}
              <div className="space-y-4">
                <div className="text-sm font-medium text-gray-500">MENU</div>
                <button className="w-full text-left p-3 rounded-lg bg-blue-50 text-blue-600 font-medium">
                  Find Doctors
                </button>
                <button className="w-full text-left p-3 rounded-lg text-gray-700 hover:bg-gray-50">
                  My Appointments
                </button>
                <button className="w-full text-left p-3 rounded-lg text-gray-700 hover:bg-gray-50">
                  Medical Records
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Booking drawer */}
      <BookingDrawer
        open={drawerOpen}
        doctor={selectedDoctor ? mapToBookingDoctor(selectedDoctor) : null}
        onClose={handleCloseDrawer}
        onBooked={(info: unknown) => {
          console.log("Booked:", info);
        }}
        variant="modal"
      />
    </div>
  );
};

export default AllDoctor;