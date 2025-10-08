

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
  fees: doc.consultationFee, 
  availability: undefined, // अगर backend से आए तो यहाँ map करना
});

const AllDoctor: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null); // Doctor रखा हुआ है
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filterSpec, setFilterSpec] = useState<string | null>(null);


  const [filterGender, setFilterGender] = useState<string[]>([]); // e.g., ["Male", "Female"]
const [filterFees, setFilterFees] = useState<string[]>([]); // e.g., ["0-500", "500-1000", "1000+"]
const [filterExperience, setFilterExperience] = useState<string[]>([]); // e.g., ["0-2", "3-5", "5+"]

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

  
//filter logic
  const filtered = useMemo(() => {
  return doctors.filter((d) => {
    
 const matchesSearch =
      search.trim() === "" ||
      d.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      d.specialization?.toLowerCase().includes(search.toLowerCase());

    const matchesSpec =
      !filterSpec || d.specialization?.trim().toLowerCase() === filterSpec.toLowerCase();

    const matchesGender =
      filterGender.length === 0 || (d.gender != null && filterGender.includes(d.gender));

    const matchesFees =
      filterFees.length === 0 ||
      filterFees.some((range) => {
        const fee = d.consultationFee;
        if (range === "0-500") return fee >= 0 && fee <= 500;
        if (range === "500-1000") return fee > 500 && fee <= 1000;
        if (range === "1000+") return fee > 1000;
        return false;
      });

    const matchesExperience =
      filterExperience.length === 0 ||
      filterExperience.some((range) => {
        const exp = Number(d.experience); // ensure number of years
        if (range === "0-2") return exp >= 0 && exp <= 2;
        if (range === "3-5") return exp >= 3 && exp <= 5;
        if (range === "5+") return exp > 5;
        return false;
      });

    return matchesSearch && matchesSpec && matchesGender && matchesFees && matchesExperience;
  });
}, [doctors, search, filterSpec, filterGender, filterFees, filterExperience]);


  // ✅ Consult button 
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
   

    {/* Gender Filter */}
    <div className="mt-3">
      <div className="text-sm font-medium mb-2">Gender</div>
      <label className="flex items-center gap-2">
        <input type="checkbox" 
         value="Male"
    onChange={(e) => {
      const val = e.target.value;
      setFilterGender(prev => e.target.checked ? [...prev, val] : prev.filter(x => x !== val));
    }} />
        Male
      </label>
      <label className="flex items-center gap-2 mt-2">
        <input type="checkbox"
         value="Female"
    onChange={(e) => {
      const val = e.target.value;
      setFilterGender(prev => e.target.checked ? [...prev, val] : prev.filter(x => x !== val));
    }} />
        Female
      </label>
      {/* <label className="flex items-center gap-2 mt-2">
        <input type="checkbox" />
        Other
      </label> */}
    </div>

    {/* Fees Filter */}
    <div className="mt-4">
      <div className="text-sm font-medium mb-2">Fees</div>
      <label className="flex items-center gap-2">
        <input type="checkbox" 
         value="0-500"
    onChange={(e) => {
      const val = e.target.value;
      setFilterFees(prev => e.target.checked ? [...prev, val] : prev.filter(x => x !== val));
    }}/> 0 - 500
      </label>
      <label className="flex items-center gap-2 mt-2">
        <input type="checkbox" 
         value="500-1000"
    onChange={(e) => {
      const val = e.target.value;
      setFilterFees(prev => e.target.checked ? [...prev, val] : prev.filter(x => x !== val));
    }}/> 500 - 1000
      </label>
      <label className="flex items-center gap-2 mt-2">
        <input type="checkbox" /> 1000+
      </label>
    </div>

    {/* Experience Filter */}
    <div className="mt-4">
      <div className="text-sm font-medium mb-2">Experience (years)</div>
      <label className="flex items-center gap-2">
        <input type="checkbox"
         value="0-2"
    onChange={(e) => {
      const val = e.target.value;
      setFilterExperience(prev => e.target.checked ? [...prev, val] : prev.filter(x => x !== val));
    }} /> 0 - 2
      </label>
      <label className="flex items-center gap-2 mt-2">
        <input type="checkbox"  value="3-5"
    onChange={(e) => {
      const val = e.target.value;
      setFilterExperience(prev => e.target.checked ? [...prev, val] : prev.filter(x => x !== val));
    }}/> 3 - 5
      </label>
      <label className="flex items-center gap-2 mt-2">
        <input type="checkbox"
         value="5+"
    onChange={(e) => {
      const val = e.target.value;
      setFilterExperience(prev => e.target.checked ? [...prev, val] : prev.filter(x => x !== val));
    }} /> 5+
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
                  // onViewProfile={(d) => {
                  //   setSelectedDoctor(d);
                  //   setDrawerOpen(true);
                  // }}
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
         variant="modal"
      />
    </div>
  );
};

export default AllDoctor;
