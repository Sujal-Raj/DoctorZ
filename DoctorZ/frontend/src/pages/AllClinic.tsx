import Lottie from "lottie-react";
import animation from "../assets/animation1.json";
import { useEffect, useState } from "react";
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
}

export default function AllClinic() {
  const navigate = useNavigate();
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [filters, setFilters] = useState({
    speciality: "",
    type: "",
    state: "",
    district: "",
  });

  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const response = await api.get("api/clinic/getClinic");
        const data = response.data as { clinic: Clinic[] };
        setClinics(data.clinic || []);
      } catch (err) {
        console.error("Error fetching clinics:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchClinics();
  }, []);

  const filteredClinics = clinics.filter((clinic) => {
    const matchesSearch = clinic.clinicName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilters =
      (!filters.speciality ||
        clinic.specialities.includes(filters.speciality)) &&
      (!filters.type || clinic.clinicType === filters.type) &&
      (!filters.state || clinic.state === filters.state) &&
      (!filters.district || clinic.district === filters.district);
    return matchesSearch && matchesFilters;
  });

  const clearFilters = () => {
    setFilters({
      speciality: "",
      type: "",
      state: "",
      district: "",
    });
  };

  const hasActiveFilters = Object.values(filters).some(
    (filter) => filter !== ""
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-slate-600 text-lg">Finding clinics near you...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HEADER */}
      <div className="relative w-full bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Left Section — Text and Search */}
            <div className="md:w-1/2 space-y-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-3">
                  Find the Right{" "}
                  <span className="text-blue-300">Healthcare Clinic</span>
                </h1>
                <p className="text-blue-100 text-lg leading-relaxed">
                  Discover trusted healthcare professionals, clinics, and
                  services tailored to your needs. Book consultations, explore
                  top-rated specialists, and get the care you deserve — all in
                  one place.
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative mt-6">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search for clinics, specialities, or locations..."
                  className="w-full pl-12 pr-4 py-4 text-lg border border-slate-300 rounded-2xl bg-white/90 text-slate-800 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Right Section — Lottie Animation */}
            <div className="md:w-1/2 flex justify-center md:justify-end">
              <Lottie
                animationData={animation}
                loop
                className="w-72 h-72 md:w-96 md:h-96 drop-shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div
            className={`lg:w-80 ${
              showMobileFilters ? "block" : "hidden lg:block"
            }`}
          >
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 sticky top-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
                  <Filter className="h-5 w-5 text-blue-600" />
                  Filters
                </h2>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                  >
                    <X className="h-4 w-4" />
                    Clear all
                  </button>
                )}
                {/* Mobile close button */}
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="lg:hidden text-slate-400 hover:text-slate-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Speciality Filter */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Medical Speciality
                  </label>
                  <div className="relative">
                    <select
                      className="w-full appearance-none bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 pr-10 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      value={filters.speciality}
                      onChange={(e) =>
                        setFilters({ ...filters, speciality: e.target.value })
                      }
                    >
                      <option value="">All Specialities</option>
                      <option value="Dental">🦷 Dental</option>
                      <option value="Dermatology">🫧 Dermatology</option>
                      <option value="Pediatrics">👶 Pediatrics</option>
                      <option value="Cardiology">❤️ Cardiology</option>
                      <option value="Gynecology">👩‍⚕️ Gynecology</option>
                      <option value="Orthopedic">🦴 Orthopedic</option>
                      <option value="ENT">👂 ENT</option>
                      <option value="General">🩺 General</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5 pointer-events-none" />
                  </div>
                </div>

                {/* Type Filter */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Clinic Type
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() =>
                        setFilters({
                          ...filters,
                          type:
                            filters.type === "Government" ? "" : "Government",
                        })
                      }
                      className={`p-3 rounded-xl border-2 transition-all duration-200 text-sm font-medium ${
                        filters.type === "Government"
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                      }`}
                    >
                      🏛️ Govt
                    </button>
                    <button
                      onClick={() =>
                        setFilters({
                          ...filters,
                          type: filters.type === "Private" ? "" : "Private",
                        })
                      }
                      className={`p-3 rounded-xl border-2 transition-all duration-200 text-sm font-medium ${
                        filters.type === "Private"
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                      }`}
                    >
                      🏥 Private
                    </button>
                  </div>
                </div>

                {/* Location Filters */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    State
                  </label>
                  <div className="relative">
                    <select
                      className="w-full appearance-none bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 pr-10 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      value={filters.state}
                      onChange={(e) =>
                        setFilters({ ...filters, state: e.target.value })
                      }
                    >
                      <option value="">All States</option>
                      <option value="Madhya Pradesh">Madhya Pradesh</option>
                      <option value="Chhattisgarh">Chhattisgarh</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    District
                  </label>
                  <div className="relative">
                    <select
                      className="w-full appearance-none bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 pr-10 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      value={filters.district}
                      onChange={(e) =>
                        setFilters({ ...filters, district: e.target.value })
                      }
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
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <p className="text-slate-600">
                  <span className="font-semibold text-slate-900">
                    {filteredClinics.length}
                  </span>{" "}
                  clinics found
                </p>
                <div className="hidden sm:flex items-center gap-2 text-sm text-slate-500">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  Quality healthcare providers
                </div>
              </div>
            </div>

            {/* Clinics Grid */}
            <div className="space-y-6  ">
              {filteredClinics.length === 0 ? (
                <div className="text-center py-16 ">
                  <div className=" w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Building2 className="h-12 w-12 text-slate-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    No clinics found
                  </h3>
                  <p className="text-slate-600 mb-6">
                    Try adjusting your search criteria or filters
                  </p>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium shadow-sm hover:bg-blue-700 transition-colors duration-200"
                    >
                      <X className="h-5 w-5" />
                      Clear all filters
                    </button>
                  )}
                </div>
              ) : (
                filteredClinics.map((clinic) => (
                  <div onClick={() => navigate(`/clinic/${clinic._id}`)}
                    key={clinic._id}
                    className="cursor-pointer bg-white rounded-3xl shadow-sm border border-slate-200 hover:shadow-md hover:border-blue-200 transition-all duration-300 overflow-hidden group "
                  >
                    <div className="p-8">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex-1">
                          <h3
                            
                            className="text-2xl font-bold text-slate-900 hover:text-blue-600 cursor-pointer transition-colors duration-200 flex items-center gap-3 group-hover:text-blue-600"
                          >
                            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-200">
                              <Building2 className="h-6 w-6 text-blue-600" />
                            </div>
                            {clinic.clinicName}
                          </h3>
                          <div className="flex items-center gap-4 mt-3">
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                clinic.clinicType === "Government"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-blue-100 text-blue-700"
                              }`}
                            >
                              {clinic.clinicType === "Government" ? "🏛️" : "🏥"}{" "}
                              {clinic.clinicType}
                            </span>
                            <div className="flex items-center gap-1 text-slate-500">
                              <Users className="h-4 w-4" />
                              <span className="text-sm">
                                {clinic.doctors.length} doctors
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Contact Info Grid */}
                      <div className="grid sm:grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center gap-3 text-slate-600">
                          <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                            <MapPin className="h-5 w-5 text-slate-500" />
                          </div>
                          <div>
                            <p className="font-medium text-slate-900">
                              {clinic.district}, {clinic.state}
                            </p>
                            <p className="text-sm text-slate-500">
                              {clinic.street}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 text-slate-600">
                          <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                            <Clock className="h-5 w-5 text-slate-500" />
                          </div>
                          <div>
                            <p className="font-medium text-slate-900">
                              {clinic.operatingHours || "24/7 Available"}
                            </p>
                            <p className="text-sm text-slate-500">
                              Operating Hours
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 text-slate-600">
                          <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                            <Phone className="h-5 w-5 text-slate-500" />
                          </div>
                          <div>
                            <p className="font-medium text-slate-900">
                              {clinic.phone || "Contact Available"}
                            </p>
                            <p className="text-sm text-slate-500">
                              Phone Number
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 text-slate-600">
                          <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                            <Mail className="h-5 w-5 text-slate-500" />
                          </div>
                          <div>
                            <p className="font-medium text-slate-900">
                              {clinic.email || "Email Available"}
                            </p>
                            <p className="text-sm text-slate-500">
                              Email Address
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Specialities */}
                      <div className="border-t border-slate-100 pt-6">
                        <div className="flex items-center gap-2 mb-4">
                          <Stethoscope className="h-5 w-5 text-blue-600" />
                          <span className="font-semibold text-slate-900">
                            Medical Specialities
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {clinic.specialities?.length > 0 ? (
                            clinic.specialities.map((spec, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200"
                              >
                                {spec}
                              </span>
                            ))
                          ) : (
                            <span className="text-slate-400 text-sm italic">
                              No specialities listed
                            </span>
                          )}
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
