import Lottie from "lottie-react";
import animation from "../assets/animation1.json";
import { useEffect, useState, useMemo } from "react";
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
  Shield,
  Award,
  Calendar,
  Navigation,
  Menu,
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
  rating?: number;
  patientCount?: number;
  establishedYear?: number;
}

interface Filters {
  speciality: string;
  type: string;
  state: string;
  district: string;
  rating: string;
}

export default function AllClinic() {
  const navigate = useNavigate();
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    speciality: "",
    type: "",
    state: "",
    district: "",
    rating: "",
  });

  // Mock data for demonstration - remove in production
  const enhanceClinicsWithMockData = (clinics: Clinic[]): Clinic[] => {
    return clinics.map(clinic => ({
      ...clinic,
      rating: Math.random() * 2 + 3, // Random rating between 3-5
      patientCount: Math.floor(Math.random() * 5000) + 1000,
      establishedYear: Math.floor(Math.random() * 30) + 1990,
    }));
  };

  useEffect(() => {
    const fetchClinics = async () => {
      try {
        setLoading(true);
        const response = await api.get("api/clinic/getClinic");
        const data = response.data as { clinic: Clinic[] };
        const enhancedClinics = enhanceClinicsWithMockData(data.clinic || []);
        setClinics(enhancedClinics);
      } catch (err) {
        console.error("Error fetching clinics:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchClinics();
  }, []);

  const filteredClinics = useMemo(() => {
    return clinics.filter((clinic) => {
      const matchesSearch = clinic.clinicName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
        clinic.specialities.some(spec => 
          spec.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        clinic.district.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilters =
        (!filters.speciality ||
          clinic.specialities.includes(filters.speciality)) &&
        (!filters.type || clinic.clinicType === filters.type) &&
        (!filters.state || clinic.state === filters.state) &&
        (!filters.district || clinic.district === filters.district) &&
        (!filters.rating || (clinic.rating && clinic.rating >= parseFloat(filters.rating)));

      return matchesSearch && matchesFilters;
    });
  }, [clinics, searchTerm, filters]);

  const clearFilters = () => {
    setFilters({
      speciality: "",
      type: "",
      state: "",
      district: "",
      rating: "",
    });
  };

  const hasActiveFilters = Object.values(filters).some(
    (filter) => filter !== ""
  );

  const specialityOptions = [
    { value: "Dental", label: "Dental", color: "text-green-600" },
    { value: "Dermatology", label: "Dermatology", color: "text-pink-600" },
    { value: "Pediatrics", label: "Pediatrics", color: "text-blue-600" },
    { value: "Cardiology", label: "Cardiology", color: "text-red-600" },
    { value: "Gynecology", label: "Gynecology", color: "text-purple-600" },
    { value: "Orthopedic", label: "Orthopedic", color: "text-orange-600" },
    { value: "ENT", label: "ENT", color: "text-cyan-600" },
    { value: "General", label: "General", color: "text-gray-600" },
  ];

  const ratingOptions = [
    { value: "4.5", label: "4.5★ & above" },
    { value: "4.0", label: "4.0★ & above" },
    { value: "3.5", label: "3.5★ & above" },
    { value: "3.0", label: "3.0★ & above" },
  ];

  // Close mobile filters when clicking on overlay
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setShowMobileFilters(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-slate-700 text-lg font-medium mb-2">Finding the best clinics for you...</p>
          <p className="text-slate-500 text-sm">Loading quality healthcare providers</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8 lg:py-4">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
          {/* Mobile Filter Button */}
          <div className="lg:hidden flex items-center justify-between mb-2">
            <button
              onClick={() => setShowMobileFilters(true)}
              className="inline-flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-xl font-medium shadow-lg hover:bg-blue-700 transition-colors duration-200 flex-1 mr-3"
            >
              <Filter className="h-5 w-5" />
              Filters & Search
              {hasActiveFilters && (
                <span className="ml-auto bg-white text-blue-600 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {Object.values(filters).filter(f => f !== "").length}
                </span>
              )}
            </button>
            
            <div className="flex items-center gap-2 text-slate-600 bg-white px-3 py-2 rounded-xl border border-slate-200 min-w-fit">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="text-sm font-medium whitespace-nowrap">Verified</span>
            </div>
          </div>

          {/* Enhanced Filters Sidebar - Fixed with sticky positioning */}
          <div className={`lg:sticky lg:top-6 lg:self-start transition-transform duration-300 ${
            showMobileFilters ? "translate-x-0 fixed inset-0 z-50 bg-black/50" : "-translate-x-full lg:translate-x-0 lg:relative"
          }`}
            onClick={handleOverlayClick}
          >
            <div 
              className={`bg-white h-full lg:h-auto w-full max-w-sm lg:max-w-none lg:w-80 rounded-lg lg:shadow-xl border-0 lg:border border-gray-300 backdrop-blur-sm overflow-y-auto lg:overflow-visible ${
                showMobileFilters ? "animate-in slide-in-from-left-8 h-screen" : "lg:h-auto"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 sm:p-6 border-b border-slate-100 bg-white lg:sticky lg:top-0 lg:z-10">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 flex items-center justify-center">
                      <Filter className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                    </div>
                    Filters
                  </h2>
                  <div className="flex items-center gap-2"> 
                    {hasActiveFilters && (
                      <button
                        onClick={clearFilters}
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2 px-2 sm:px-3 py-1 rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        <X className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="hidden sm:inline">Clear</span>
                      </button>
                    )}
                    <button
                      onClick={() => setShowMobileFilters(false)}
                      className="lg:hidden text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
                    >
                      <X className="h-5 w-5 sm:h-6 sm:w-6" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-6 space-y-6 md:space-y-8 pb-32 lg:pb-6">
                {/* Rating Filter */}
                {/* <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    Minimum Rating
                  </label>
                  <div className="space-y-2">
                    {ratingOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setFilters({ ...filters, rating: filters.rating === option.value ? "" : option.value })}
                        className={`w-full text-left px-3 sm:px-4 py-2 sm:py-3 rounded-xl border-2 transition-all duration-200 text-sm font-medium ${
                          filters.rating === option.value
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div> */}

                {/* Speciality Filter */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-1">
                    Medical Speciality
                  </label>

                  <div className="space-y-1">
                    {specialityOptions.map((option) => {
                      const isSelected = filters.speciality === option.value;

                      return (
                        <label
                          key={option.value}
                          className={`flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2 rounded cursor-pointer transition-all duration-200 text-sm font-medium ${
                            isSelected
                              ? "border-blue-500 bg-blue-50 text-blue-700"
                              : "border-slate-200 bg-white text-black hover:border-slate-300 hover:bg-slate-50"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() =>
                              setFilters({
                                ...filters,
                                speciality: isSelected ? "" : option.value,
                              })
                            }
                            className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                          />
                          <span>{option.label}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Type Filter */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-3">Clinic Type</label>
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <button
                      onClick={() => setFilters({ ...filters, type: filters.type === "Government" ? "" : "Government" })}
                      className={`p-3 sm:p-4 rounded border-2 transition-all duration-200 font-medium flex flex-col items-center gap-1 sm:gap-2 ${
                        filters.type === "Government"
                          ? "border-green-500 bg-green-50 text-green-700"
                          : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                      }`}
                    >
                      <Building2 className="h-5 w-5 sm:h-6 sm:w-6" />
                      <span className="text-xs sm:text-sm">Govt</span>
                    </button>
                    <button
                      onClick={() => setFilters({ ...filters, type: filters.type === "Private" ? "" : "Private" })}
                      className={`p-3 sm:p-4 rounded border-2 transition-all duration-200 font-medium flex flex-col items-center gap-1 sm:gap-2 ${
                        filters.type === "Private"
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                      }`}
                    >
                      <Shield className="h-5 w-5 sm:h-6 sm:w-6" />
                      <span className="text-xs sm:text-sm">Private</span>
                    </button>
                  </div>
                </div>

                {/* Location Filters */}
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-3">
                      Location
                    </label>
                    <div className="relative">
                      <Navigation className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                      <input
                        type="text"
                        placeholder="Enter your location"
                        className="w-full bg-slate-50 border border-slate-300 rounded pl-9 pr-3 py-2 sm:py-3 text-sm sm:text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        value={filters.state}
                        onChange={(e) => setFilters({ ...filters, state: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                      <input
                        type="text"
                        placeholder="Enter your district"
                        className="w-full bg-slate-50 border border-slate-300 rounded pl-9 pr-3 py-2 sm:py-3 text-sm sm:text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        value={filters.district}
                        onChange={(e) => setFilters({ ...filters, district: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="flex-1 min-w-0">
            {/* Enhanced Results Header */}
            <div className="bg-white border rounded-lg border-gray-300 p-4 sm:p-6 mb-4 sm:mb-6 lg:mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 truncate">
                    Available Clinics
                  </h2>
                  <p className="text-slate-600 mt-1 text-sm sm:text-base">
                    <span className="font-semibold text-blue-600">{filteredClinics.length}</span>{" "}
                    clinics match your criteria
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex items-center gap-2 text-slate-600 bg-slate-100 px-3 py-2 rounded-xl text-sm">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="font-medium">Quality Verified</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Clinics Grid */}
            <div className="space-y-3 sm:space-y-4">
              {filteredClinics.length === 0 ? (
                // No clinics block (keep as is)
                <div className="text-center py-8 bg-white rounded-xl shadow-sm border border-slate-200">
                  <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Building2 className="h-8 w-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">No clinics found</h3>
                  <p className="text-slate-600 text-sm max-w-xs mx-auto">
                    Try adjusting your filters or search terms.
                  </p>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 text-sm transition-all duration-200"
                    >
                      <X className="h-4 w-4" /> Clear all filters
                    </button>
                  )}
                </div>
              ) : (
                filteredClinics.map((clinic) => (
                  <div
                    key={clinic._id}
                    onClick={() => navigate(`/clinic/${clinic._id}`)}
                    className="group cursor-pointer transform hover:-translate-y-1 transition-all duration-300"
                  >
                    {/* 👇 Entire card smaller and tighter */}
                    <div className="bg-white h-[250px] rounded-lg border border-gray-300 hover:shadow-md hover:border-blue-300 transition-all duration-300 overflow-hidden">
                      <div className="p-3">
                        {/* Header */}
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-10 h-10 bg-[#106C89] rounded flex items-center justify-center shadow-md flex-shrink-0">
                            <Building2 className="h-5 w-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 truncate">
                              {clinic.clinicName}
                            </h3>
                            <div className="flex flex-wrap items-center gap-2 mt-1">
                              <span
                                className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium ${
                                  clinic.clinicType === "Government"
                                    ? "bg-green-100 text-green-700 border border-green-200"
                                    : "bg-blue-100 text-blue-700 border border-blue-200"
                                }`}
                              >
                                {clinic.clinicType === "Government" ? "🏛️ Govt" : "🏥 Private"}
                              </span>
                              <div className="flex items-center gap-1 text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full text-[11px]">
                                <Users className="h-3 w-3" />
                                {clinic.doctors.length} doctors
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Contact Info */}
                        <div className="grid grid-cols-2 gap-2 mb-3">
                          <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-md">
                            <MapPin className="h-4 w-4 text-blue-600 flex-shrink-0" />
                            <p className="text-sm font-medium text-slate-800 truncate">
                              {clinic.district}, {clinic.state}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-md">
                            <Clock className="h-4 w-4 text-purple-600 flex-shrink-0" />
                            <p className="text-sm font-medium text-slate-800 truncate">
                              {clinic.operatingHours || "24/7 Available"}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-md">
                            <Phone className="h-4 w-4 text-green-600 flex-shrink-0" />
                            <p className="text-sm font-medium text-slate-800 truncate">
                              {clinic.phone || "Contact Available"}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-md">
                            <Mail className="h-4 w-4 text-red-600 flex-shrink-0" />
                            <p className="text-sm font-medium text-slate-800 truncate">
                              {clinic.email || "Email Available"}
                            </p>
                          </div>
                        </div>

                        {/* Specialities */}
                        <div className="border-t border-slate-100 pt-2">
                          <div className="flex items-center gap-2 mb-2">
                            <Stethoscope className="h-4 w-4 text-blue-600" />
                            <span className="font-semibold text-slate-900 text-sm">
                              Specialities
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {clinic.specialities?.length > 0 ? (
                              clinic.specialities.map((spec, idx) => {
                                const speciality = specialityOptions.find(
                                  (s) => s.value === spec
                                );
                                return (
                                  <span
                                    key={idx}
                                    className="inline-flex items-center  px-2 py-0.5 rounded text-[15px] font-medium bg-blue-50 text-blue-700 border border-blue-200 truncate"
                                  >
                                    {speciality?.label || spec}
                                  </span>
                                );
                              })
                            ) : (
                              <span className="text-slate-400 text-xs italic">
                                No specialities listed
                              </span>
                            )}
                          </div>
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