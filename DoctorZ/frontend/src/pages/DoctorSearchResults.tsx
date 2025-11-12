import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  MapPin,
  Calendar,
  Stethoscope,
  Search as SearchIcon,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { Helmet } from "react-helmet";
import DoctorCard from "../components/DoctorCard";
import BookingDrawer from "../components/BookingDrawer";
import { useEffect, useMemo, useState } from "react";
import api from "../Services/mainApi";

type SearchState = {
  location?: string;
  specialty?: string;
  date?: string;
};

const API = "/api/doctor/allDoctors";

const DoctorSearchResults: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const searchState = (state || {}) as SearchState;

  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<any | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 6;

  const [specialty, setSpecialty] = useState(searchState.specialty || "");
  const [locationValue, setLocationValue] = useState(searchState.location || "");
  const [date, setDate] = useState(searchState.date || "");

  const [modeHospital, setModeHospital] = useState(true);
  const [modeOnline, setModeOnline] = useState(true);
  const [expFilters, setExpFilters] = useState<string[]>([]);
  const [feeFilters, setFeeFilters] = useState<string[]>([]);
  const [languageFilters, setLanguageFilters] = useState<string[]>([]);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // ✅ Fetch Doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const res = await api.get<any>(API);
        const data = Array.isArray(res.data)
          ? res.data
          : res.data?.doctors ?? res.data;
        setDoctors(data || []);
      } catch (e) {
        console.error("Error fetching doctors:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);



  // ✅ Utility for date filter
  const hasSlotForDate = (doc: any, date?: string) => {
    if (!date) return true;
    if (!Array.isArray(doc?.slots)) return false;
    return doc.slots.some((s: { date: string }) => s.date === date);
  };

  // ✅ Geolocation “Near Me”
  const showNearMe = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported by your browser.");
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        const approx = doctors.filter((d) => {
          if (!d.lat || !d.lng) return false;
          const R = 6371;
          const dLat = ((d.lat - lat) * Math.PI) / 180;
          const dLon = ((d.lng - lng) * Math.PI) / 180;
          const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos((lat * Math.PI) / 180) *
              Math.cos((d.lat * Math.PI) / 180) *
              Math.sin(dLon / 2) *
              Math.sin(dLon / 2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          const dist = R * c;
          return dist <= 50;
        });
        setDoctors(approx);
        setLoading(false);
      },
      (err) => {
        setLoading(false);
        console.error(err);
        alert("Unable to get your location.");
      }
    );
  };

  // ✅ Filtering Logic
  const filtered = useMemo(() => {
    const loc = (locationValue || "").trim().toLowerCase();
    const spec = (specialty || "").trim().toLowerCase();
    const dateVal = (date || "").trim();

    return doctors.filter((d: any) => {
      const matchesSpec =
        !spec ||
        (d.specialization && d.specialization.toLowerCase().includes(spec)) ||
        (d.fullName && d.fullName.toLowerCase().includes(spec));

      const matchesLocation =
        !loc ||
        (d.location && d.location.toLowerCase().includes(loc)) ||
        (d.city && d.city.toLowerCase().includes(loc));

      const matchesDate = hasSlotForDate(d, dateVal);

      const supportsHospital = d.modeOfConsult?.includes("hospital") ?? true;
      const supportsOnline = d.modeOfConsult?.includes("online") ?? true;
      if (
        !((modeHospital && supportsHospital) || (modeOnline && supportsOnline))
      )
        return false;

      if (expFilters.length > 0) {
        const exp = d.experience ?? 0;
        const matchesExp = expFilters.some((ef) => {
          if (ef === "15+") return exp >= 15;
          const [min, max] = ef.split("-").map(Number);
          return exp >= min && exp <= max;
        });
        if (!matchesExp) return false;
      }

      if (feeFilters.length > 0) {
        const fee = d.consultationFee ?? 0;
        const matchesFee = feeFilters.some((ff) => {
          if (ff === "1000+") return fee >= 1000;
          const [min, max] = ff.split("-").map(Number);
          return fee >= min && fee <= max;
        });
        if (!matchesFee) return false;
      }

      if (languageFilters.length > 0) {
        const langs: string[] = d.languages ?? [];
        const matchesLang = languageFilters.every((lf) =>
          langs.map((x) => x.toLowerCase()).includes(lf.toLowerCase())
        );
        if (!matchesLang) return false;
      }

      return matchesSpec && matchesLocation && matchesDate;
    });
  
  }, [
    doctors,
    specialty,
    locationValue,
    date,
    modeHospital,
    modeOnline,
    expFilters,
    feeFilters,
    languageFilters,
  ]);
 
// ✅ move sort here (after filtered)
const sortedDoctors = useMemo(() => {
  return [...filtered].sort((a, b) => {
    if (a.isFavourite === b.isFavourite) return 0;
    return a.isFavourite ? -1 : 1;
  });

  // const indexOfLastDoctor = currentPage * doctorsPerPage;
  // const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  // const currentDoctors = filtered.slice(indexOfFirstDoctor, indexOfLastDoctor);
  // const totalPages = Math.ceil(filtered.length / doctorsPerPage);


}, [filtered]);
const indexOfLastDoctor = currentPage * doctorsPerPage;
const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
const currentDoctors = sortedDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);
const totalPages = Math.ceil(sortedDoctors.length / doctorsPerPage);

  const toggleExp = (val: string) =>
    setExpFilters((s) =>
      s.includes(val) ? s.filter((x) => x !== val) : [...s, val]
    );
  const toggleFee = (val: string) =>
    setFeeFilters((s) =>
      s.includes(val) ? s.filter((x) => x !== val) : [...s, val]
    );
  const toggleLang = (val: string) =>
    setLanguageFilters((s) =>
      s.includes(val) ? s.filter((x) => x !== val) : [...s, val]
    );

  const openBooking = (doc: any) => {
    setSelectedDoctor(doc);
    setDrawerOpen(true);
  };

  const handleSearch = () => {
    setCurrentPage(1);
    navigate("/search-results", {
      state: { location: locationValue, specialty, date },
      replace: true,
    });
  };
const handleFavouriteToggle = (doctorId: string, isFavourite: boolean) => {
  setDoctors((prev) =>
    prev.map((d) =>
      d._id === doctorId ? { ...d, isFavourite } : d
    )
  );
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
  };

  return (
    <div className="w-full bg-gray-50 ">
      <Helmet>
        <title>Consult Doctors Online | DoctorZ</title>
        <meta
          name="description"
          content="Find and consult top doctors online by specialization, experience, and location on DoctorZ."
        />
      </Helmet>

      {/* Main Grid Container */}
      <div className="max-w-[1500px] mx-auto px-3 sm:px-4 py-5 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sidebar Filters (Desktop) */}
        <aside className="lg:col-span-3 hidden lg:block sticky top-24 self-start">
          <FilterPanel
            showNearMe={showNearMe}
            clearFilters={clearFilters}
            modeHospital={modeHospital}
            setModeHospital={setModeHospital}
            modeOnline={modeOnline}
            setModeOnline={setModeOnline}
            expFilters={expFilters}
            toggleExp={toggleExp}
            feeFilters={feeFilters}
            toggleFee={toggleFee}
            languageFilters={languageFilters}
            toggleLang={toggleLang}
          />
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {specialty ? `Consult ${specialty}s Online` : "Available Doctors"}
              </h1>
              <p className="text-sm text-gray-600 mt-0.5">
                {filtered.length} doctors found
              </p>
            </div>
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-3 py-2 border border-teal-700 text-teal-700 rounded-md text-sm font-medium"
            >
              <SlidersHorizontal size={16} />
              Filters
            </button>
          </div>

          {/* Search Bar */}
          <div className="bg-white border border-gray-400 rounded-lg p-3 mb-4 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
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
                className="flex items-center justify-center gap-2 bg-[#28328C] hover:bg-[#1f286f] text-white font-medium rounded-lg px-4 py-1.5 border border-[#1f286f] transition-all duration-200"
              >
                <SearchIcon className="w-4 h-4" />
                Search
              </button>
            </div>
          </div>

          {/* Doctor Cards */}
          {loading ? (
            <div className="bg-white rounded-lg p-6 shadow-sm text-center border border-gray-200">
              <div className="inline-block w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mb-2" />
              <div className="text-gray-600">Loading doctors...</div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="bg-white rounded-lg p-6 shadow-sm text-center border border-gray-200">
              <div className="text-gray-700">
                No doctors found matching your filters.
              </div>
            </div>
          ) : (
            <div className="space-y-7">
              {currentDoctors.map((doc) => (
                <DoctorCard key={doc._id} doctor={doc} onConsult={openBooking}   onFavouriteToggle={(doctorId, isFav) => {
    setDoctors((prev) =>
      prev.map((d) =>
        d._id === doctorId ? { ...d, isFavourite: isFav } : d
      )
    );
  }} />
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

        {/* Right Help Card */}
        <aside className="lg:col-span-2 hidden lg:block">
          <div className="bg-[#08263a] text-white rounded-lg p-4 shadow-md border border-gray-200">
            <h3 className="font-semibold text-base">
              Need help consulting the right doctor?
            </h3>
            <p className="text-sm mt-2 leading-snug">
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

      {/* Mobile Filter Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-end">
          <div className="bg-white w-80 max-w-full h-full p-5 overflow-y-auto shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <FilterPanel
              showNearMe={showNearMe}
              clearFilters={clearFilters}
              modeHospital={modeHospital}
              setModeHospital={setModeHospital}
              modeOnline={modeOnline}
              setModeOnline={setModeOnline}
              expFilters={expFilters}
              toggleExp={toggleExp}
              feeFilters={feeFilters}
              toggleFee={toggleFee}
              languageFilters={languageFilters}
              toggleLang={toggleLang}
            />

            <button
              onClick={() => setMobileFilterOpen(false)}
              className="mt-5 w-full bg-teal-700 text-white py-2 rounded-md font-medium hover:bg-teal-800"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Booking Drawer */}
      <BookingDrawer
        open={drawerOpen}
        doctor={
          selectedDoctor
            ? {
                _id: selectedDoctor._id,
                fullName: selectedDoctor.fullName,
                photo: selectedDoctor.photo,
                specialization: selectedDoctor.specialization,
                fees: selectedDoctor.consultationFee,
              }
            : null
        }
        onClose={() => {
          setDrawerOpen(false);
          setSelectedDoctor(null);
        }}
        onBooked={() => {
          setDrawerOpen(false);
          setSelectedDoctor(null);
        }}
      />
    </div>
  );
};

/* 🔹 Reusable Components */

const SearchInput = ({ icon, placeholder, value, onChange, type = "text" }: any) => (
  <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-1.5 bg-white">
    {icon}
    <input
      type={type}
      placeholder={placeholder}
      className="w-full outline-none text-gray-700"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

const FilterPanel = ({
  showNearMe,
  clearFilters,
  modeHospital,
  setModeHospital,
  modeOnline,
  setModeOnline,
  expFilters,
  toggleExp,
  feeFilters,
  toggleFee,
  languageFilters,
  toggleLang,
}: any) => (
  <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-5 hover:shadow-lg transition-all duration-300">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
      <button onClick={clearFilters} className="text-sm text-teal-700 hover:underline">
        Clear All
      </button>
    </div>

    <div className="space-y-4">
      <button
        onClick={showNearMe}
        className="w-full border border-[#28328C] text-[#28328C] text-sm font-medium rounded-md py-2 hover:bg-[#28328C]/10"
      >
        Show Doctors Near Me
      </button>

      {/* Mode */}
      <div className="pt-2">
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

      {/* Experience */}
      <div className="pt-2">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Experience</h4>
        {["0-5", "5-10", "10-15", "15+"].map((v) => (
          <label key={v} className="flex items-center gap-2 text-sm text-gray-600 mb-1">
            <input
              type="checkbox"
              checked={expFilters.includes(v)}
              onChange={() => toggleExp(v)}
              className="accent-teal-600"
            />
            {v} years
          </label>
        ))}
      </div>

      {/* Fee */}
      <div className="pt-2">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Consultation Fee</h4>
        {["0-500", "500-1000", "1000+"].map((v) => (
          <label key={v} className="flex items-center gap-2 text-sm text-gray-600 mb-1">
            <input
              type="checkbox"
              checked={feeFilters.includes(v)}
              onChange={() => toggleFee(v)}
              className="accent-teal-600"
            />
            ₹{v}
          </label>
        ))}
      </div>

      {/* Languages */}
      <div className="pt-2">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Languages</h4>
        {["English", "Hindi", "Marathi", "Gujarati"].map((v) => (
          <label key={v} className="flex items-center gap-2 text-sm text-gray-600 mb-1">
            <input
              type="checkbox"
              checked={languageFilters.includes(v)}
              onChange={() => toggleLang(v)}
              className="accent-teal-600"
            />
            {v}
          </label>
        ))}
      </div>
    </div>
  </div>
);

export default DoctorSearchResults;
