import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  MapPin,
  Calendar,
  Stethoscope,
  Search as SearchIcon,
} from "lucide-react";
import { Helmet } from "react-helmet";

type SearchState = {
  location?: string;
  specialty?: string;
  date?: string;
};

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
  doctors: unknown[];
  clinicLicenseNumber: string;
  clinicImage?: string;
  operatingHours: string;
  staffName: string;
  staffEmail: string;
  aadharNumber: number;
  rating?: number;
  patientCount?: number;
  establishedYear?: number;
}

const API = "http://localhost:3000/api/clinic/getClinic";

const ClinicSearchResults: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const searchState = (state || {}) as SearchState;

  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const clinicsPerPage = 6;

  const [specialty, setSpecialty] = useState(searchState.specialty || "");
  const [locationValue, setLocationValue] = useState(searchState.location || "");
  const [date, setDate] = useState(searchState.date || "");

  const [modeHospital, setModeHospital] = useState(true);
  const [modeOnline, setModeOnline] = useState(true);
  const [expFilters, setExpFilters] = useState<string[]>([]);
  const [feeFilters, setFeeFilters] = useState<string[]>([]);
  const [languageFilters, setLanguageFilters] = useState<string[]>([]);
  const [typeFilters, setTypeFilters] = useState<string[]>([]);

  // ✅ Add random mock data for demo only
  const enhanceClinicsWithMockData = (clinics: Clinic[]): Clinic[] =>
    clinics.map((clinic) => ({
      ...clinic,
      rating: Math.random() * 2 + 3,
      patientCount: Math.floor(Math.random() * 5000) + 1000,
      establishedYear: Math.floor(Math.random() * 30) + 1990,
    }));

  useEffect(() => {
    const fetchClinics = async () => {
      setLoading(true);
      try {
       const response = await axios.get(API);
console.log("✅ API response:", response.data);
const data = response.data as Clinic[];
const enhancedClinics = enhanceClinicsWithMockData(data || []);
setClinics(enhancedClinics);

      } catch (err) {
        console.error("❌ Error fetching clinics:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchClinics();
  }, []);

  // ✅ Filters & Search
  const filtered = useMemo(() => {
    const loc = locationValue.trim().toLowerCase();
    const spec = specialty.trim().toLowerCase();

    return clinics.filter((clinic) => {
      const matchesSpec =
        !spec ||
        clinic.specialities.some((s) => s.toLowerCase().includes(spec)) ||
        clinic.clinicName.toLowerCase().includes(spec);

      const matchesLocation =
        !loc ||
        clinic.district.toLowerCase().includes(loc) ||
        clinic.state.toLowerCase().includes(loc);

      // Mode filter (currently both true always)
      if (!modeHospital && !modeOnline) return false;

      // Experience filter
      if (expFilters.length > 0) {
        const established = clinic.establishedYear ?? 0;
        const currentYear = new Date().getFullYear();
        const yearsOperating = currentYear - established;

        const matchesExp = expFilters.some((ef) => {
          if (ef === "15+") return yearsOperating >= 15;
          const [min, max] = ef.split("-").map(Number);
          return yearsOperating >= min && yearsOperating <= max;
        });

        if (!matchesExp) return false;
      }

      // Fee filter placeholder (all clinics valid)
      if (feeFilters.length > 0 && !feeFilters.includes("All")) return false;

      // Language filter (mock)
      if (languageFilters.length > 0) {
        const supportedLangs = ["English", "Hindi", "Local"];
        const matchesLang = languageFilters.every((lf) =>
          supportedLangs.some(
            (x) => x.toLowerCase() === lf.toLowerCase()
          )
        );
        if (!matchesLang) return false;
      }

      // Clinic type
      if (typeFilters.length > 0 && !typeFilters.includes(clinic.clinicType))
        return false;

      return matchesSpec && matchesLocation;
    });
  }, [
    clinics,
    specialty,
    locationValue,
    date,
    modeHospital,
    modeOnline,
    expFilters,
    feeFilters,
    languageFilters,
    typeFilters,
  ]);

  const indexOfLastClinic = currentPage * clinicsPerPage;
  const indexOfFirstClinic = indexOfLastClinic - clinicsPerPage;
  const currentClinics = filtered.slice(indexOfFirstClinic, indexOfLastClinic);
  const totalPages = Math.ceil(filtered.length / clinicsPerPage);

  const toggleFilter = (filterFn: any, val: string) => {
    filterFn((prev: string[]) =>
      prev.includes(val) ? prev.filter((x) => x !== val) : [...prev, val]
    );
    setCurrentPage(1);
  };

  const handleSearch = () => {
    setCurrentPage(1);
    navigate("/clinic-search-results", {
      state: { location: locationValue, specialty, date },
      replace: true,
    });
  };

  const specialityOptions = [
    "Dental",
    "Dermatology",
    "Pediatrics",
    "Cardiology",
    "Gynecology",
    "Orthopedic",
    "ENT",
    "General",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Find Clinics Near You | DoctorZ</title>
        <meta
          name="description"
          content="Find and book appointments at top clinics by specialization, location, and services on DoctorZ."
        />
      </Helmet>

      <div className="max-w-[1500px] mx-auto px-3 sm:px-4 py-5 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* === FILTERS === */}
        <aside className="lg:col-span-3 sticky top-24 self-start z-30">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-5 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
              <button
                onClick={() => {
                  setSpecialty("");
                  setLocationValue("");
                  setDate("");
                  setModeHospital(true);
                  setModeOnline(true);
                  setExpFilters([]);
                  setFeeFilters([]);
                  setLanguageFilters([]);
                  setTypeFilters([]);
                }}
                className="text-sm text-teal-700 hover:underline"
              >
                Clear All
              </button>
            </div>

            {/* Mode */}
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Mode of Consult
                </h4>
                <label className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                  <input
                    type="checkbox"
                    checked={modeHospital}
                    onChange={() => setModeHospital((s) => !s)}
                    className="accent-teal-600"
                  />
                  Hospital Visit
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    checked={modeOnline}
                    onChange={() => setModeOnline((s) => !s)}
                    className="accent-teal-600"
                  />
                  Online Consult
                </label>
              </div>

              {/* Clinic Type */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Clinic Type
                </h4>
                {["Government", "Private"].map((type) => (
                  <label
                    key={type}
                    className="flex items-center gap-2 text-sm text-gray-600 mb-1"
                  >
                    <input
                      type="checkbox"
                      checked={typeFilters.includes(type)}
                      onChange={() => toggleFilter(setTypeFilters, type)}
                      className="accent-teal-600"
                    />
                    {type}
                  </label>
                ))}
              </div>

              {/* Specialities */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Specialities
                </h4>
                {specialityOptions.map((spec) => (
                  <label
                    key={spec}
                    className="flex items-center gap-2 text-sm text-gray-600 mb-1"
                  >
                    <input
                      type="checkbox"
                      checked={specialty === spec}
                      onChange={() =>
                        setSpecialty(specialty === spec ? "" : spec)
                      }
                      className="accent-teal-600"
                    />
                    {spec}
                  </label>
                ))}
              </div>

              {/* Experience */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Experience (Years Operating)
                </h4>
                {["0-5", "6-10", "11-15", "15+"].map((exp) => (
                  <label
                    key={exp}
                    className="flex items-center gap-2 text-sm text-gray-600 mb-1"
                  >
                    <input
                      type="checkbox"
                      checked={expFilters.includes(exp)}
                      onChange={() => toggleFilter(setExpFilters, exp)}
                      className="accent-teal-600"
                    />
                    {exp}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* === MAIN CONTENT === */}
        <main className="lg:col-span-7">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {specialty ? `Find ${specialty} Clinics` : "Available Clinics"}
              </h1>
              <p className="text-sm text-gray-600 mt-0.5">
                {filtered.length} clinics found
              </p>
            </div>
          </div>

          {/* Search bar */}
          <div className="bg-white border border-gray-200 rounded-lg p-3 mb-4 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
              <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-1.5">
                <Stethoscope className="w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Specialty"
                  className="w-full outline-none text-gray-700"
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-1.5">
                <MapPin className="w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Location"
                  className="w-full outline-none text-gray-700"
                  value={locationValue}
                  onChange={(e) => setLocationValue(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-1.5">
                <Calendar className="w-4 h-4 text-gray-400" />
                <input
                  type="date"
                  className="w-full outline-none text-gray-700"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              <button
                onClick={handleSearch}
                className="flex items-center justify-center gap-2 bg-[#0c213e] hover:bg-[#1f2770] text-white font-medium rounded-lg px-4 py-1.5"
              >
                <SearchIcon className="w-4 h-4" />
                Search
              </button>
            </div>
          </div>

          {/* === Clinic Cards === */}
          {loading ? (
            <div className="bg-white rounded-lg p-6 shadow-sm text-center">
              <div className="inline-block w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mb-2" />
              <div className="text-gray-600">Loading clinics...</div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="bg-white rounded-lg p-6 shadow-sm text-center text-gray-700">
              No clinics found matching your filters.
            </div>
          ) : (
            <div className="space-y-4">
              {currentClinics.map((clinic) => (
              <div
  key={clinic._id}
  onClick={() => navigate(`/clinic/${clinic._id}`)}
  className="bg-white rounded-xl border border-gray-200 overflow-hidden relative shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group"
>
  {/* Clinic Image */}
  <div className="absolute left-6 top-6">
    <div className="relative">
      <img
        src={
          clinic.clinicImage
            ? clinic.clinicImage.startsWith("http")
              ? clinic.clinicImage
              : `http://localhost:3000/uploads/${clinic.clinicImage}`
            : "https://cdn-icons-png.flaticon.com/512/2966/2966327.png"
        }
        alt={clinic.clinicName}
        className="w-20 h-20 object-cover rounded-lg border-2 border-white shadow-md group-hover:scale-105 transition-transform duration-300"
      />
      {/* Verified Badge (optional) */}
      <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
  </div>

  <div className="pl-32 pr-6 py-6">
    {/* Clinic Name and Basic Info */}
    <div className="mb-3">
      <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
        {clinic.clinicName}
      </h2>
      <div className="flex items-center gap-2 mt-1">
        <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
        <p className="text-sm text-gray-600">
          {clinic.district}, {clinic.state}
        </p>
      </div>
    </div>

    {/* Specialities */}
    <div className="mb-4">
      <p className="text-sm text-gray-700 leading-relaxed">
        {clinic.specialities?.join(", ") || "General Practice"}
      </p>
    </div>

    {/* Rating and Stats */}
   
  </div>
</div>
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

        {/* === Help Card === */}
        <aside className="lg:col-span-2 hidden lg:block">
          <div className="bg-[#08263a] text-white rounded-lg p-4 shadow-md">
            <h3 className="font-semibold text-base mb-2">
              Need help finding the right clinic?
            </h3>
            <p className="text-sm leading-snug">
              Call <span className="font-medium">+91-8040245807</span> to book instantly
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
    </div>
  );
};

export default ClinicSearchResults;
