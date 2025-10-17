


import React, { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../Services/mainApi";
import { Phone, MapPin, Mail, Clock, Award, Search } from "lucide-react";

interface Doctor {
  _id: string;
  fullName: string;
  specialization: string;
  experience: number;
  consultationFee: number;
  gender: "Male" | "Female";
  photo?: string;
}

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
  clinicLicenseNumber: string;
  operatingHours: string;
}

interface ClinicResponse {
  clinic: Clinic;
}

interface DoctorsResponse {
  doctors: Doctor[];
}

type TabType = "overview" | "doctors" | "services";

interface Filters {
  gender: string[];
  fees: string[];
  experience: string[];
  search: string;
}

const ClinicDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [clinic, setClinic] = useState<Clinic | null>(null);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loadingClinic, setLoadingClinic] = useState(true);
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  const [filters, setFilters] = useState<Filters>({
    gender: [],
    fees: [],
    experience: [],
    search: "",
  });

  // Fetch clinic & doctors
  useEffect(() => {
    const fetchClinic = async () => {
      try {
        const res = await api.get<ClinicResponse>(`api/clinic/getClinicById/${id}`);
        setClinic(res.data.clinic);
      } catch (err) {
        console.error("Error fetching clinic:", err);
      } finally {
        setLoadingClinic(false);
      }
    };

    const fetchDoctors = async () => {
      try {
        const res = await api.get<DoctorsResponse>(`api/doctor/getClinicDoctors/${id}`);
        setDoctors(res.data.doctors || []);
      } catch (err) {
        console.error("Error fetching doctors:", err);
      } finally {
        setLoadingDoctors(false);
      }
    };

    fetchClinic();
    fetchDoctors();
  }, [id]);

  const handleFilterChange = (type: keyof Filters, value: string) => {
    if (type === "search") {
      setFilters((prev) => ({ ...prev, search: value }));
      return;
    }
    setFilters((prev) => {
      const selected = prev[type].includes(value)
        ? prev[type].filter((v) => v !== value)
        : [...prev[type], value];
      return { ...prev, [type]: selected };
    });
  };

  // --- Filter Logic ---
  const filteredDoctors = doctors.filter((doc) => {
    const { gender, fees, experience, search } = filters;

    // gender filter
    const genderMatch = gender.length === 0 || gender.includes(doc.gender);

    // fee filter
    const feeMatch =
      fees.length === 0 ||
      fees.some((range) => {
        if (range === "0-500") return doc.consultationFee <= 500;
        if (range === "500-1000") return doc.consultationFee > 500 && doc.consultationFee <= 1000;
        if (range === "1000+") return doc.consultationFee > 1000;
        return false;
      });

    // experience filter
    const experienceMatch =
      experience.length === 0 ||
      experience.some((range) => {
        if (range === "0-2") return doc.experience <= 2;
        if (range === "3-5") return doc.experience >= 3 && doc.experience <= 5;
        if (range === "5+") return doc.experience > 5;
        return false;
      });

    // search filter (name or specialization)
    const searchMatch =
      search.trim() === "" ||
      doc.fullName.toLowerCase().includes(search.toLowerCase()) ||
      doc.specialization.toLowerCase().includes(search.toLowerCase());

    return genderMatch && feeMatch && experienceMatch && searchMatch;
  });

  if (loadingClinic) return <div>Loading clinic info...</div>;
  if (!clinic) return <div>Clinic not found</div>;

  return (
    <div className=" mx-auto p-6 bg-blue-50 min-h-screen w-full space-y-6">
      {/* Clinic Header */}
      <div className="bg-white rounded-lg shadow p-6 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{clinic.clinicName}</h1>
          <p className="text-indigo-600 font-semibold">{clinic.clinicType}</p>

          <div className="flex items-center text-gray-700 mt-3 space-x-2">
            <MapPin size={18} />
            <span>
              {clinic.address}, {clinic.district}, {clinic.state}
            </span>
          </div>

          <div className="flex items-center text-gray-700 mt-2 space-x-2">
            <Mail size={18} />
            <span>{clinic.email}</span>
          </div>

          <div className="flex items-center text-gray-700 mt-2 space-x-2">
            <Award size={18} />
            <span>License No: {clinic.clinicLicenseNumber}</span>
          </div>

          <div className="flex items-center text-gray-700 mt-2 space-x-2">
            <Clock size={18} />
            <span>Hours: {clinic.operatingHours}</span>
          </div>
        </div>

        <a
          href={`tel:${clinic.phone}`}
          className="mt-4 md:mt-0 inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-md transition space-x-2"
        >
          <Phone size={18} />
          <span>Call Now</span>
        </a>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-300 space-x-6">
        {(["overview", "doctors", "services"] as TabType[]).map((tab) => (
          <button
            key={tab}
            className={`pb-2 text-lg font-medium capitalize transition-colors ${
              activeTab === tab
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-blue-500"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>



      {/* Overview */}
{activeTab === "overview" && (
  <div className="space-y-6">
    {/* Clinic Info */}
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">About {clinic.clinicName}</h2>
      <p className="text-gray-800">
        {clinic.clinicType} clinic specializing in{" "}
        <span className="font-medium">{clinic.specialities.join(", ")}</span>. Operating hours:{" "}
        <span className="font-semibold">{clinic.operatingHours}</span>.
      </p>
    </div>

    {/* Doctor List */}
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Our Doctors</h2>
      {loadingDoctors ? (
        <p>Loading doctors...</p>
      ) : doctors.length === 0 ? (
        <p>No doctors found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {doctors.map((doc) => (
            <div
              key={doc._id}
              onClick={() => navigate(`/view-doctor-profile/${doc._id}`)}
              className="cursor-pointer flex space-x-4 items-center border border-gray-200 rounded-md p-4 hover:shadow-md transition"
            >
              {doc.photo ? (
                <img
                  src={`http://localhost:3000/uploads/${doc.photo}`}
                  alt={doc.fullName}
                  className="w-20 h-20 rounded-full object-cover border"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                  No Image
                </div>
              )}
              <div>
                <h3 className="text-lg font-semibold">{doc.fullName}</h3>
                <p className="text-indigo-600 font-medium">{doc.specialization}</p>
                <p className="text-gray-600 text-sm">{doc.experience} years experience</p>
                <p className="text-gray-700 text-sm font-medium">
                  ₹{doc.consultationFee} / consultation
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
)}


      {/* Doctors Tab */}
      {activeTab === "doctors" && (
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="bg-white rounded-lg shadow p-5 md:w-1/3 lg:w-1/4">
            <h3 className="text-lg font-semibold mb-3">Filters</h3>

            <div className="space-y-4">
              {/* Gender */}
              <div>
                <h4 className="font-medium text-gray-800">Gender</h4>
                {["Male", "Female"].map((g) => (
                  <label key={g} className="flex items-center space-x-2 mt-1">
                    <input
                      type="checkbox"
                      checked={filters.gender.includes(g)}
                      onChange={() => handleFilterChange("gender", g)}
                    />
                    <span>{g}</span>
                  </label>
                ))}
              </div>

              {/* Fees */}
              <div>
                <h4 className="font-medium text-gray-800">Fees</h4>
                {["0-500", "500-1000", "1000+"].map((range) => (
                  <label key={range} className="flex items-center space-x-2 mt-1">
                    <input
                      type="checkbox"
                      checked={filters.fees.includes(range)}
                      onChange={() => handleFilterChange("fees", range)}
                    />
                    <span>{range}</span>
                  </label>
                ))}
              </div>

              {/* Experience */}
              <div>
                <h4 className="font-medium text-gray-800">Experience (years)</h4>
                {["0-2", "3-5", "5+"].map((exp) => (
                  <label key={exp} className="flex items-center space-x-2 mt-1">
                    <input
                      type="checkbox"
                      checked={filters.experience.includes(exp)}
                      onChange={() => handleFilterChange("experience", exp)}
                    />
                    <span>{exp}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Doctor List */}
          <div className="flex-1 bg-white rounded-lg shadow p-6">
            {/* Search bar */}
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 mb-5">
              <Search size={18} className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search by name or specialization..."
                value={filters.search}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleFilterChange("search", e.target.value)
                }
                className="w-full outline-none text-gray-700"
              />
            </div>

            {loadingDoctors ? (
              <p>Loading doctors...</p>
            ) : filteredDoctors.length === 0 ? (
              <p>No doctors found.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredDoctors.map((doc) => (
                  <div
                    key={doc._id}
                    onClick={() => navigate(`/view-doctor-profile/${doc._id}`)}
                    className="cursor-pointer flex space-x-4 items-center border border-gray-200 rounded-md p-4 hover:shadow-md transition"
                  >
                    {doc.photo ? (
                      <img
                        src={`http://localhost:3000/uploads/${doc.photo}`}
                        alt={doc.fullName}
                        className="w-20 h-20 rounded-full object-cover border"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                        No Image
                      </div>
                    )}
                    <div>
                      <h3 className="text-lg font-semibold">{doc.fullName}</h3>
                      <p className="text-indigo-600 font-medium">{doc.specialization}</p>
                      <p className="text-gray-600 text-sm">{doc.experience} years experience</p>
                      <p className="text-gray-700 text-sm font-medium">
                        ₹{doc.consultationFee} / consultation
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Services Tab */}
      {activeTab === "services" && (
        <div className="bg-white rounded-lg shadow p-6 text-gray-700">
          <p>No Services Available</p>
        </div>
      )}
    </div>
  );
};

export default ClinicDetails;
