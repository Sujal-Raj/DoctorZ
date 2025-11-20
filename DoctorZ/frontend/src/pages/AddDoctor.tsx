
import { useEffect, useState } from "react";
import ClinicDoctorCard from "../pages/ClinicPages/ClinicDoctorCard";
import api from "../Services/mainApi";
import { Search as SearchIcon } from "lucide-react";

export interface Doctor {
  _id: string;
  fullName: string;
  specialization: string;
  qualification?: string;
  location?: string;
  city?: string;
  photo?: string;
  gender?: string;
}
interface SearchResponse {
  doctors: Doctor[];
}

const AddDoctor = () => {
  const [addedDoctors, setAddedDoctors] = useState<string[]>([]);
  const [pendingRequests, setPendingRequests] = useState<string[]>([]);

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const [genderFilter, setGenderFilter] = useState("");
  const [specialization, setSpecialization] = useState("");

  // ------------------ FETCH DOCTORS (FULL DB SEARCH) ------------------
  const fetchDoctors = async (query: string = "") => {
    if (!query.trim()) {
      setDoctors([]); // Clear list
      return;
    }
    setLoading(true);
    try {
      const res = await api.get<SearchResponse>(
        `/api/doctor/search?query=${query}`
      );
      setDoctors(res.data.doctors || []);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const clinicId = localStorage.getItem("clinicId");

    api
      .get <{ addedDoctors: string[]; pendingRequests: string[] }>(`/api/clinic/doctor-status/${clinicId}`)
      .then((res) => {
        setAddedDoctors(res.data.addedDoctors || []);
        setPendingRequests(res.data.pendingRequests || []);
      })
      .catch((err) => console.log(err));
  }, []);

  // // Initial load → show all doctors
  // useEffect(() => {
  //   fetchDoctors("");
  // }, []);

  // Search doctor by typing
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (search.trim()) {
        fetchDoctors(search);
      } else {
        setDoctors([]);
      }
    }, 400); // debounce

    return () => clearTimeout(delayDebounce);
  }, [search]);

  // ------------------ APPLY FILTERS ------------------
  const filteredDoctors = doctors.filter((doc) => {
    const matchesGender = genderFilter ? doc.gender === genderFilter : true;
    const matchesSpec = specialization
      ? doc.specialization?.toLowerCase().includes(specialization.toLowerCase())
      : true;

    return matchesGender && matchesSpec;
  });

  return (
    
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <div className="max-w-[1500px] mx-auto px-4 py-8">

      {/* Page Heading */}
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8 tracking-tight">
        Add Doctors to Clinic
      </h1>

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* ================= FILTER SIDEBAR ================= */}
        <div className="lg:sticky lg:top-6">
          <div className="bg-white/80 backdrop-blur-xl border rounded-2xl p-6 shadow-lg">

            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Filters
            </h2>

            {/* Gender */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender
              </label>
              <select
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value)}
                className="w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Specialization */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Specialization
              </label>
              <input
                type="text"
                value={specialization}
                placeholder="e.g. Dentist"
                onChange={(e) => setSpecialization(e.target.value)}
                className="w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Reset Button */}
            <button
              onClick={() => {
                setGenderFilter("");
                setSpecialization("");
                setSearch("");
                fetchDoctors("");
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-sm rounded-xl transition-all"
            >
              Reset Filters
            </button>

          </div>
        </div>

        {/* ================= RIGHT SECTION ================= */}
        <div className="lg:col-span-3 space-y-6">

          {/* Search Bar */}
          <div className="bg-white border rounded-2xl shadow p-4 flex items-center gap-3">
            <SearchIcon className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search doctor by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full outline-none text-gray-700 text-sm"
            />
          </div>

          {/* Doctor List */}
          {loading ? (
            <div className="bg-white p-10 rounded-2xl shadow border text-center">
              <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 font-medium">Loading doctors...</p>
            </div>
          ) : filteredDoctors.length === 0 ? (
            <div className="bg-white p-10 rounded-2xl shadow border text-center">
              <p className="text-gray-600 font-medium">No doctors found.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredDoctors.map((doc) => (
                <ClinicDoctorCard
                  key={doc._id}
                  doctor={doc}
                  
                  doctorStatus={
                    addedDoctors.includes(doc._id)
                      ? "added"
                      : pendingRequests.includes(doc._id)
                      ? "pending"
                      : "none"
                  }
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);

  
};

export default AddDoctor;
