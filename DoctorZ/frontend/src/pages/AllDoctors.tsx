// // import { useEffect, useState } from "react";

// // interface Doctor {
// //   _id: string;
// //   fullName: string;
// //   specialization: string;
// //   experience: number;
// //   consultationFee: number;
// //   language: string;
// //   qualification: string;
// //   photo: string;
// // }

// // export default function AllDoctors() {
// //   const [doctors, setDoctors] = useState<Doctor[]>([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchDoctors = async () => {
// //       try {
// //         const response = await fetch(
// //           "http://localhost:3000/api/doctor/allDoctors"
// //         );
// //         const data = await response.json();
// //         console.log("API Response:", data);

// //         if (Array.isArray(data.doctors)) {
// //           setDoctors(data.doctors);
// //         } else {
// //           setDoctors([]);
// //         }
// //       } catch (err) {
// //         console.error("Error fetching doctors:", err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchDoctors();
// //   }, []);

// //   if (loading) {
// //     return (
// //       <div className="flex items-center justify-center h-screen text-xl font-semibold text-gray-600">
// //         Loading doctors...
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="container mx-auto p-6">
// //       <h1 className="text-3xl font-bold mb-8 text-center text-green-700">
// //         Available Doctors
// //       </h1>

// //       {doctors.length === 0 ? (
// //         <p className="text-center text-gray-500">No doctors available.</p>
// //       ) : (
// //         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
// //           {doctors.map((doctor) => (
// //             <div
// //               key={doctor._id}
// //               className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all border border-gray-100 flex flex-col items-center"
// //             >
// //               {/* Doctor Photo */}
// //               <div className="w-32 h-32 mb-4">
// //                 <img
// //                   src={`http://localhost:3000/uploads/${doctor.photo}`}
// //                   alt={doctor.fullName}
// //                   className="w-full h-full rounded-full object-cover border-2 border-green-500 shadow-sm"
// //                 />
// //               </div>

// //               {/* Doctor Info */}
// //               <h2 className="text-xl font-bold text-gray-800 mb-1 text-center">
// //                 {doctor.fullName}
// //               </h2>
// //               <p className="text-sm text-green-600 mb-2 text-center">
// //                 {doctor.specialization}
// //               </p>

// //               <div className="w-full text-gray-700 text-sm space-y-1 mb-4">
// //                 <p>
// //                   <strong>Experience:</strong> {doctor.experience} years
// //                 </p>
// //                 <p>
// //                   <strong>Fee:</strong> ₹{doctor.consultationFee}
// //                 </p>
// //                 <p>
// //                   <strong>Language:</strong> {doctor.language}
// //                 </p>
// //                 <p>
// //                   <strong>Qualification:</strong> {doctor.qualification}
// //                 </p>
// //               </div>

// //               {/* Appointment Button */}
// //               <button
// //                 onClick={() =>
// //                   alert(`Booking appointment with ${doctor.fullName}`)
// //                 }
// //                 className="mt-auto w-full bg-green-600 text-white font-semibold px-4 py-2 rounded-xl hover:bg-green-700 transition shadow-md"
// //               >
// //                 Get Appointment
// //               </button>
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }




// import React, { useEffect, useMemo, useState } from "react";
// import DoctorCard from "../components/DoctorCard.js";
// import type { Doctor } from "../components/DoctorCard.js";
// import BookingDrawer from "../components/BookingDrawer.js";
// import { nextNDays } from "../utils/date.js";
// import { Stethoscope, Filter } from "lucide-react";

// // Helper to build availability map for dummy data
// function buildAvailability(baseTimes: string[]) {
//   // produce slots for next 14 days (YYYY-MM-DD -> times)
//   const days = nextNDays(14);
//   const availabilityOnline: Record<string, string[]> = {};
//   const availabilityOffline: Record<string, string[]> = {};

//   days.forEach((d, idx) => {
//     const key = d.toISOString().slice(0, 10);
//     // vary availability
//     const onlineSlots = baseTimes.slice(0, Math.max(3, (idx % baseTimes.length) + 2));
//     const offlineSlots = baseTimes.slice(0, Math.max(2, ((idx + 2) % baseTimes.length) + 1));
//     availabilityOnline[key] = onlineSlots;
//     availabilityOffline[key] = offlineSlots;
//   });

//   return { online: availabilityOnline, offline: availabilityOffline };
// }

// const dummyDoctors: Doctor[] & any[] = [
//   {
//     _id: "d1",
//     fullName: "Dr. Jawwad Mohammed Kaleem",
//     specialization: "General Practitioner",
//     qualification: "MBBS",
//     experience: "4",
//     fees: "540",
//     languages: "English, Hindi",
//     regNumber: "MED12345",
//     location: "Hyderabad",
//     rating: 4.7,
//     photo: "https://randomuser.me/api/portraits/men/32.jpg",
//     availability: buildAvailability(["18:00", "18:08", "18:16", "18:24", "18:32", "18:40", "18:48", "18:56"]),
//   },
//   {
//     _id: "d2",
//     fullName: "Dr. Rohinipriyanka Reddy",
//     specialization: "General Practitioner",
//     qualification: "MBBS",
//     experience: "9",
//     fees: "605",
//     languages: "English, Hindi, Telugu",
//     regNumber: "MED67890",
//     location: "Hyderabad",
//     rating: 4.9,
//     photo: "https://randomuser.me/api/portraits/women/44.jpg",
//     availability: buildAvailability(["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "16:00", "16:30"]),
//   },
//   {
//     _id: "d3",
//     fullName: "Dr. Summaiya Banu",
//     specialization: "General Practitioner",
//     qualification: "MBBS",
//     experience: "8",
//     fees: "615",
//     languages: "English, Hindi",
//     regNumber: "MED54321",
//     location: "Hyderabad",
//     rating: 4.6,
//     photo: "https://randomuser.me/api/portraits/women/68.jpg",
//     availability: buildAvailability(["10:00", "10:30", "11:00", "11:30", "15:00", "15:30"]),
//   },
// ];

// const FindDoctors: React.FC = () => {
//   const [doctors, setDoctors] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedDoctor, setSelectedDoctor] = useState<any | null>(null);
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [search, setSearch] = useState("");
//   const [filterSpec, setFilterSpec] = useState<string | null>(null);

//   useEffect(() => {
//     // If you have backend, replace the below with:
//     // api.get("/api/doctor").then(res => setDoctors(res.data)).catch(...).finally(...)
//     setTimeout(() => {
//       setDoctors(dummyDoctors);
//       setLoading(false);
//     }, 700);
//   }, []);

//   const filtered = useMemo(() => {
//     return doctors.filter((d) => {
//       const matchesSearch =
//         search.trim() === "" ||
//         d.fullName.toLowerCase().includes(search.toLowerCase()) ||
//         d.specialization.toLowerCase().includes(search.toLowerCase());
//       const matchesSpec = !filterSpec || d.specialization === filterSpec;
//       return matchesSearch && matchesSpec;
//     });
//   }, [doctors, search, filterSpec]);

//   const handleConsult = (doctor: any) => {
//     setSelectedDoctor(doctor);
//     setDrawerOpen(true);
//   };

//   const handleCloseDrawer = () => {
//     setDrawerOpen(false);
//     // small delay to clear to avoid UI flicker
//     setTimeout(() => setSelectedDoctor(null), 300);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50  p-6">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex items-center justify-between mb-6">
//           <div className="flex items-center gap-4">
//             <Stethoscope className="w-10 h-10 text-blue-600" />
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900">Consult General Physicians</h1>
//               <p className="text-sm text-gray-500">Find the best doctors near you — online & offline</p>
//             </div>
//           </div>

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
//               </select>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//           {/* left filters */}
//           <aside className="hidden md:block md:col-span-1">
//             <div className="bg-white rounded-lg p-4 shadow">
//               <h3 className="font-semibold mb-3">Filters</h3>
//               <button className="w-full mb-3 py-2 bg-blue-50 text-blue-700 rounded">Show Doctors Near Me</button>

//               <div className="mt-3">
//                 <div className="text-sm font-medium mb-2">Mode of Consult</div>
//                 <label className="flex items-center gap-2">
//                   <input type="checkbox" defaultChecked />
//                   Online Consult
//                 </label>
//                 <label className="flex items-center gap-2 mt-2">
//                   <input type="checkbox" defaultChecked />
//                   Hospital Visit
//                 </label>
//               </div>

//               <div className="mt-4">
//                 <div className="text-sm font-medium mb-2">Fees</div>
//                 <label className="flex items-center gap-2"><input type="checkbox" /> 0 - 500</label>
//                 <label className="flex items-center gap-2 mt-2"><input type="checkbox" /> 500 - 1000</label>
//               </div>
//             </div>
//           </aside>

//           {/* doctors list */}
//           <main className="md:col-span-3 space-y-6">
//             {loading ? (
//               <div className="text-center py-20">
//                 <div className="text-blue-600 text-lg font-semibold">Loading doctors...</div>
//               </div>
//             ) : filtered.length === 0 ? (
//               <div className="text-center py-20 text-gray-600">No doctors found.</div>
//             ) : (
//               filtered.map((doc) => (
//                 <DoctorCard
//                   key={doc._id}
//                   doctor={doc}
//                   onConsult={handleConsult}
//                   onViewProfile={(d :any) => {
//                     // optionally show detailed profile page
//                     // for now open drawer too but could open route /doctor/:id
//                     setSelectedDoctor(d);
//                     setDrawerOpen(true);
//                   }}
//                 />
//               ))
//             )}
//           </main>
//         </div>
//       </div>

//       {/* Booking drawer */}
//       <BookingDrawer
//         open={drawerOpen}
//         doctor={selectedDoctor}
//         onClose={handleCloseDrawer}
//         onBooked={(info:any) => {
//           // you can refresh availability or mark slot booked
//           console.log("Booked:", info);
//         }}
//       />
//     </div>
//   );
// };

// export default FindDoctors;

import React, { useEffect, useMemo, useState } from "react";
import DoctorCard from "../components/DoctorCard.js";
import type { Doctor } from "../components/DoctorCard.js";
import BookingDrawer from "../components/BookingDrawer.jsx";
import { Stethoscope, Filter } from "lucide-react";

// 🔹 BookingDrawer को fees:number चाहिए
interface DoctorForBooking {
  _id: string;
  fullName: string;
  photo?: string;
  specialization: string;
  fees: number; // ✅ number (not string)
  availability?: Record<string, string[]>; // optional
}

// 🔹 Helper: Doctor (UI वाला) → DoctorForBooking (BookingDrawer वाला)
const mapToBookingDoctor = (doc: Doctor): DoctorForBooking => ({
  _id: doc._id,
  fullName: doc.fullName,
  photo: doc.photo,
  specialization: doc.specialization,
  fees: doc.consultationFee, // ✅ string → number convert
  availability: undefined, // अगर backend से आए तो यहाँ map करना
});

const AllDoctor: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null); // Doctor रखा हुआ है
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filterSpec, setFilterSpec] = useState<string | null>(null);

  // ✅ Backend से doctors fetch
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/doctor/allDoctors");
        const data = await response.json();
        console.log("API Response:", data);

        if (Array.isArray(data.doctors)) {
          const validDoctors = data.doctors.filter((doc: unknown) => (doc as Doctor).fullName);
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

  // ✅ Search + Filter logic
  const filtered = useMemo(() => {
    return doctors.filter((d) => {
      const matchesSearch =
        search.trim() === "" ||
        d.fullName?.toLowerCase().includes(search.toLowerCase()) ||
        d.specialization?.toLowerCase().includes(search.toLowerCase());
      const matchesSpec = !filterSpec || d.specialization === filterSpec;
      return matchesSearch && matchesSpec;
    });
  }, [doctors, search, filterSpec]);

  // ✅ Consult button click → Doctor को select करना
  const handleConsult = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setTimeout(() => setSelectedDoctor(null), 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Stethoscope className="w-10 h-10 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Consult General Physicians
              </h1>
              <p className="text-sm text-gray-500">
                Find the best doctors near you — online & offline
              </p>
            </div>
          </div>

          {/* Search + Filter */}
          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search doctor, specialization..."
                className="px-4 py-2 border rounded-lg w-80 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 border rounded-lg px-3 py-2 bg-white">
              <Filter className="w-4 h-4 text-gray-600" />
              <select
                value={filterSpec ?? ""}
                onChange={(e) => setFilterSpec(e.target.value || null)}
                className="text-sm"
              >
                <option value="">All Specializations</option>
                <option value="General Practitioner">General Practitioner</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Cardiologist">Cardiologist</option>
                <option value="Orthologist">Orthologist</option>
              </select>
            </div>
          </div>
        </div>

        {/* Doctors List */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar Filters */}
          <aside className="hidden md:block md:col-span-1">
            <div className="bg-white rounded-lg p-4 shadow">
              <h3 className="font-semibold mb-3">Filters</h3>
              <button className="w-full mb-3 py-2 bg-blue-50 text-blue-700 rounded">
                Show Doctors Near Me
              </button>

              <div className="mt-3">
                <div className="text-sm font-medium mb-2">Mode of Consult</div>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked />
                  Online Consult
                </label>
                <label className="flex items-center gap-2 mt-2">
                  <input type="checkbox" defaultChecked />
                  Hospital Visit
                </label>
              </div>

              <div className="mt-4">
                <div className="text-sm font-medium mb-2">Fees</div>
                <label className="flex items-center gap-2">
                  <input type="checkbox" /> 0 - 500
                </label>
                <label className="flex items-center gap-2 mt-2">
                  <input type="checkbox" /> 500 - 1000
                </label>
              </div>
            </div>
          </aside>

          {/* Main doctor cards */}
          <main className="md:col-span-3 space-y-6">
            {loading ? (
              <div className="text-center py-20">
                <div className="text-blue-600 text-lg font-semibold">
                  Loading doctors...
                </div>
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20 text-gray-600">
                No doctors found.
              </div>
            ) : (
              filtered.map((doc) => (
                <DoctorCard
                  key={doc._id}
                  doctor={doc}
                  onConsult={handleConsult}
                  onViewProfile={(d) => {
                    setSelectedDoctor(d);
                    setDrawerOpen(true);
                  }}
                />
              ))
            )}
          </main>
        </div>
      </div>

      {/* Booking drawer */}
      <BookingDrawer
        open={drawerOpen}
        doctor={
          selectedDoctor ? mapToBookingDoctor(selectedDoctor) : null
          // ✅ FIX: BookingDrawer को हमेशा DoctorForBooking मिलेगा
        }
        onClose={handleCloseDrawer}
        onBooked={(info: unknown) => {
          console.log("Booked:", info);
        }}
      />
    </div>
  );
};

export default AllDoctor;
