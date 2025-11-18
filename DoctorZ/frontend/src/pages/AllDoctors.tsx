

import { Award, Calendar, Clock, Filter, Search, Stethoscope, Users, X } from "lucide-react";
import BookingDrawer from "../components/BookingDrawer";
import DoctorCard, { type Doctor } from "../components/DoctorCard";
import SlidingBanner from "../components/SlidingBanner";
import { useEffect, useMemo, useState } from "react";

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

//   // small UI-only state
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ✅ Fetch doctors from backend
  useEffect(() => {
    const fetchDoctors = async (p0: Doctor[]): Promise<void> => {
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
          fetchDoctors(validDoctors as Doctor[]);
        } else {
          fetchDoctors([]);
        }
      } catch (err) {
        console.error("Error fetching doctors:", err);
        fetchDoctors([]);
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
        Search.trim() === "" ||
        doctor.fullName?.toLowerCase().includes(Search.toLowerCase()) ||
        doctor.specialization?.toLowerCase().includes(Search.toLowerCase());

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
  }, [doctors, Search, Filter]);

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
    setFilters((prev: FilterState) => {
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
      setFilters((prev: FilterState) => ({ ...prev, specialization: null }));
    } else if (value) {
      setFilters((prev: FilterState) => ({
        ...prev,
        [filterType]: (prev[filterType] as string[]).filter(item => item !== value)
      }));
    }
  };


function setLoading(arg0: boolean) {
  throw new Error("Function not implemented.");
}

function setFilters(arg0: { specialization: null; gender: never[]; fees: never[]; experience: never[]; }) {
  throw new Error("Function not implemented.");
}
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

