

// import { useEffect, useState } from "react";
// import ClinicDoctorCard from "../pages/ClinicPages/ClinicDoctorCard";
// import api from "../Services/mainApi";
// import { useParams } from "react-router-dom";

// const AddDoctor = () => {
//   const { clinicId } = useParams();

//   const [doctors, setDoctors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");

//   const API = `/api/clinic/${clinicId}`;

//   useEffect(() => {
//     const fetchDoctors = async () => {
//       setLoading(true);
//       try {
//         const res = await api.get(API);
//         const data = Array.isArray(res.data)
//           ? res.data
//           : res.data?.doctors ?? [];
//         setDoctors(data);
//       } catch (error) {
//         console.error("Error fetching doctors:", error);
//       }
//       setLoading(false);
//     };

//     fetchDoctors();
//   }, [clinicId]);

//   const filteredDoctors = doctors.filter((d) =>
//     d.fullName.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="p-5">
//       <div className="flex justify-center mb-6">
//         <input
//           type="text"
//           placeholder="Search doctor..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="px-3 py-2 border rounded-lg w-96"
//         />
//       </div>

//       {loading ? (
//         <p className="text-center text-gray-600">Searching...</p>
//       ) : filteredDoctors.length === 0 ? (
//         <p className="text-center text-gray-600">No doctors found.</p>
//       ) : (
//         <div className="grid md:grid-cols-2 gap-6">
//           {filteredDoctors.map((doc) => (
//             <ClinicDoctorCard key={doc._id} doctor={doc} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AddDoctor;


import { useEffect, useState } from "react";
import ClinicDoctorCard from "../pages/ClinicPages/ClinicDoctorCard";
import api from "../Services/mainApi";
import { Search as SearchIcon } from "lucide-react";

interface Doctor {
  _id: string;
  fullName: string;
  gender: string;
  specialization: string;
}

interface SearchResponse {
  doctors: Doctor[];
}

const AddDoctor = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const [genderFilter, setGenderFilter] = useState("");
  const [specialization, setSpecialization] = useState("");

  // ------------------ FETCH DOCTORS (FULL DB SEARCH) ------------------
  const fetchDoctors = async (query: string = "") => {
    if(!query.trim()){
      setDoctors([]);   // Clear list
    return; 
    }
    setLoading(true);
    try {
      const res = await api.get<SearchResponse>(`/api/doctor/search?query=${query}`);
      setDoctors(res.data.doctors || []);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
    setLoading(false);
  };

  // // Initial load → show all doctors
  // useEffect(() => {
  //   fetchDoctors("");
  // }, []);

  // Search doctor by typing
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if(search.trim()){
            fetchDoctors(search);
      }
      else{
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
    <div className="w-full bg-gray-50 min-h-screen">
      <div className="max-w-[1500px] mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Add Doctors to Clinic
        </h1>

        {/* --------- LAYOUT: FILTERS + RESULTS --------- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          {/* ---------------- LEFT FILTER SIDEBAR ---------------- */}
          <div className="bg-white border rounded-lg p-4 shadow-sm h-fit">
            <h2 className="text-lg font-semibold mb-3">Filters</h2>

            {/* Gender filter */}
            <div className="mb-4">
              <label className="block text-sm mb-2 text-gray-700">Gender</label>
              <select
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value)}
                className="w-full border rounded-md p-2 text-sm"
              >
                <option value="">All</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Specialization filter */}
            <div className="mb-4">
              <label className="block text-sm mb-2 text-gray-700">
                Specialization
              </label>
              <input
                type="text"
                value={specialization}
                placeholder="e.g. Dentist"
                onChange={(e) => setSpecialization(e.target.value)}
                className="w-full border rounded-md p-2 text-sm"
              />
            </div>

            {/* Reset button */}
            <button
              onClick={() => {
                setGenderFilter("");
                setSpecialization("");
                setSearch("");
                fetchDoctors("");
              }}
              className="w-full bg-blue-600 text-white py-2 rounded-md mt-2"
            >
              Reset Filters
            </button>
          </div>

          {/* ---------------- RIGHT: SEARCH + RESULTS ---------------- */}
          <div className="md:col-span-3">

            {/* Search bar */}
            <div className="bg-white border rounded-lg p-3 mb-6 shadow-sm">
              <div className="flex items-center gap-3">
                <SearchIcon className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search doctor by name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full outline-none text-gray-700"
                />
              </div>
            </div>

            {/* Show doctors */}
            {loading ? (
              <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                <p className="text-gray-600">Loading doctors...</p>
              </div>
            ) : filteredDoctors.length === 0 ? (
              <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
                <p className="text-gray-600">No doctors found.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDoctors.map((doc) => (
                  <ClinicDoctorCard
                    key={doc._id}
                    doctor={doc}
                    onConsult={() => console.log("Add doctor:", doc._id)}
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
