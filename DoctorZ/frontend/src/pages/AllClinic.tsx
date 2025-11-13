import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  MapPin,
  Calendar,
  Stethoscope,
  Search as SearchIcon,
  Menu,
  X,
} from "lucide-react";
import { Helmet } from "react-helmet";
import api from "../Services/mainApi";
import ClinicCard from "../components/ClinicCard";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

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
  isFavourite?: boolean;
}
interface ClinicResponse {
  clinic: Clinic[];
  message: string;
}
interface DecodedToken {
  id: string;
}

 const token = Cookies.get("patientToken");
  const patientId = token ? (jwtDecode<DecodedToken>(token)?.id ?? null) : null;
const API = `/api/clinic/getClinic/${patientId}`;

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
const handleFavouriteToggle = (clinicId: string) => {
  setClinics((prevClinics) =>
    prevClinics
      .map((clinic) =>
        clinic._id === clinicId
          ? { ...clinic, isFavourite: !clinic.isFavourite }
          : clinic
      )
      // ✅ isFavourite true wale top pe chale jaye
      .sort((a, b) =>
        a.isFavourite === b.isFavourite ? 0 : a.isFavourite ? -1 : 1
      )
  );
};


  // Mobile filter sidebar state
  const [showMobileFilters, setShowMobileFilters] = useState(false);

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
        const response = await api.get(API);
        console.log("✅ API response:", response.data);
        
        const responseData = response.data as { clinics: Clinic[]; message: string };
const data = responseData.clinics || [];
const enhancedClinics = enhanceClinicsWithMockData(data);

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
  // ✅ Sort favourites first
const sortedClinics = useMemo(() => {
  return [...filtered].sort((a, b) => {
    if (a.isFavourite === b.isFavourite) return 0;
    return a.isFavourite ? -1 : 1;
  });
}, [filtered]);


  const indexOfLastClinic = currentPage * clinicsPerPage;
  const indexOfFirstClinic = indexOfLastClinic - clinicsPerPage;
 const currentClinics = sortedClinics.slice(indexOfFirstClinic, indexOfLastClinic);

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

  const clearFilters = () => {
    setSpecialty("");
    setLocationValue("");
    setDate("");
    setModeHospital(true);
    setModeOnline(true);
    setExpFilters([]);
    setFeeFilters([]);
    setLanguageFilters([]);
    setTypeFilters([]);
  };

  const specialityOptions: string[] = [
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

      {/* Mobile Filter Overlay */}
      {showMobileFilters && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
          <div className="absolute right-0 top-0 h-full w-4/5 max-w-sm bg-white shadow-xl overflow-y-auto">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="p-2 text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Filter Content */}
              <MobileFilterPanel
                modeHospital={modeHospital}
                setModeHospital={setModeHospital}
                modeOnline={modeOnline}
                setModeOnline={setModeOnline}
                typeFilters={typeFilters}
                toggleFilter={toggleFilter}
                setTypeFilters={setTypeFilters}
                specialty={specialty}
                setSpecialty={setSpecialty}
                specialityOptions={specialityOptions}
                expFilters={expFilters}
                setExpFilters={setExpFilters}
                clearFilters={clearFilters}
                onClose={() => setShowMobileFilters(false)}
              />
            </div>
          </div>
        </div>
      )}

      <div className="max-w-[1500px] mx-auto px-3 sm:px-4 py-5 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        {/* === FILTERS - Desktop === */}
        <aside className="lg:col-span-3 hidden lg:block sticky top-24 self-start">
          <FilterPanel
            modeHospital={modeHospital}
            setModeHospital={setModeHospital}
            modeOnline={modeOnline}
            setModeOnline={setModeOnline}
            typeFilters={typeFilters}
            toggleFilter={toggleFilter}
            setTypeFilters={setTypeFilters}
            specialty={specialty}
            setSpecialty={setSpecialty}
            specialityOptions={specialityOptions}
            expFilters={expFilters}
            setExpFilters={setExpFilters}
            clearFilters={clearFilters}
          />
        </aside>

        {/* === MAIN CONTENT === */}
        <main className="lg:col-span-7">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                {specialty ? `Find ${specialty} Clinics` : "Available Clinics"}
              </h1>
              <p className="text-sm text-gray-600 mt-0.5">
                {filtered.length} clinics found
              </p>
            </div>
            
            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowMobileFilters(true)}
              className="lg:hidden flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <Menu className="w-4 h-4" />
              Filters
            </button>
          </div>

          {/* Search bar */}
          <div className="bg-white border border-gray-200 rounded-lg p-3 mb-4 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <SearchInput
                icon={<Stethoscope className="w-4 h-4 text-gray-400" />}
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
                className="flex items-center justify-center gap-2 bg-[#28328C] hover:bg-[#1a365d] text-white font-medium rounded-lg px-4 py-2 sm:py-1.5 text-sm sm:text-base"
              >
                <SearchIcon className="w-4 h-4" />
                <span className="sm:hidden">Search</span>
                <span className="hidden sm:inline">Search</span>
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
                <ClinicCard key={clinic._id} clinic={clinic} navigate={navigate} onFavouriteToggle={handleFavouriteToggle}/>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-5">
              <div className="inline-flex gap-1 flex-wrap justify-center">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-2.5 sm:px-3 py-1.5 rounded-md border text-xs sm:text-sm min-w-[2.5rem] ${
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

        {/* === Help Card - Desktop === */}
        <aside className="lg:col-span-2 hidden lg:block sticky top-24 self-start">
          <div className="bg-[#08263a] text-white rounded-lg p-4 shadow-md">
            <h3 className="font-semibold text-base mb-2">
              Need help finding the right clinic?
            </h3>
            <p className="text-sm leading-snug">
              Call <span className="font-medium">+91-8040245807</span> to book instantly
            </p>
            <a
              href="tel:+918040245807"
              className="inline-block mt-3 bg-white text-[#08263a] font-medium px-3 py-1.5 rounded text-sm hover:bg-gray-100 transition-colors"
            >
              Call Now
            </a>
          </div>
        </aside>

        {/* Mobile Help Card */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#08263a] text-white p-4 shadow-lg z-40">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Need help finding a clinic?</p>
              <p className="text-xs opacity-90">Call +91-8040245807</p>
            </div>
            <a
              href="tel:+918040245807"
              className="bg-white text-[#08263a] font-medium px-4 py-2 rounded text-sm hover:bg-gray-100 transition-colors"
            >
              Call Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

/* 🔹 Reusable Components */

const SearchInput = ({ icon, placeholder, value, onChange, type = "text" }: any) => (
  <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 sm:py-1.5 bg-white">
    {icon}
    <input
      type={type}
      placeholder={placeholder}
      className="w-full outline-none text-gray-700 text-sm sm:text-base"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

const FilterPanel = ({
  modeHospital,
  setModeHospital,
  modeOnline,
  setModeOnline,
  typeFilters,
  toggleFilter,
  specialty,
  setSpecialty,
  specialityOptions,
  expFilters,
  setExpFilters,
  clearFilters,
}: any) => (
  <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-5 hover:shadow-lg transition-all duration-300">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
      <button onClick={clearFilters} className="text-sm text-teal-700 hover:underline">
        Clear All
      </button>
    </div>

    <div className="space-y-4">
      {/* Mode */}
      <div>
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

      {/* Clinic Type */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Clinic Type</h4>
        {["Government", "Private"].map((type) => (
          <label
            key={type}
            className="flex items-center gap-2 text-sm text-gray-600 mb-1"
          >
            <input
              type="checkbox"
              checked={typeFilters.includes(type)}
              onChange={() => toggleFilter(setExpFilters, type)}
              className="accent-teal-600"
            />
            {type}
          </label>
        ))}
      </div>

      {/* Specialities */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Specialities</h4>
        {specialityOptions.map((spec: string) => (
          <label
            key={spec}
            className="flex items-center gap-2 text-sm text-gray-600 mb-1"
          >
            <input
              type="checkbox"
              checked={specialty === spec}
              onChange={() => setSpecialty(specialty === spec ? "" : spec)}
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
);

const MobileFilterPanel = ({
  modeHospital,
  setModeHospital,
  modeOnline,
  setModeOnline,
  typeFilters,
  toggleFilter,
  setTypeFilters,
  specialty,
  setSpecialty,
  specialityOptions,
  expFilters,
  setExpFilters,
  clearFilters,
  onClose,
}: any) => (
  <div className="space-y-6">
    {/* Mode */}
    <div>
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

    {/* Clinic Type */}
    <div>
      <h4 className="text-sm font-medium text-gray-700 mb-2">Clinic Type</h4>
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
      <h4 className="text-sm font-medium text-gray-700 mb-2">Specialities</h4>
      {specialityOptions.map((spec: string) => (
        <label
          key={spec}
          className="flex items-center gap-2 text-sm text-gray-600 mb-1"
        >
          <input
            type="checkbox"
            checked={specialty === spec}
            onChange={() => setSpecialty(specialty === spec ? "" : spec)}
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

    {/* Mobile Filter Actions */}
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
      <div className="flex gap-3">
        <button
          onClick={clearFilters}
          className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg font-medium"
        >
          Clear All
        </button>
        <button
          onClick={onClose}
          className="flex-1 py-2 px-4 bg-teal-600 text-white rounded-lg font-medium"
        >
          Apply Filters
        </button>
      </div>
    </div>
  </div>
);




export default ClinicSearchResults;


