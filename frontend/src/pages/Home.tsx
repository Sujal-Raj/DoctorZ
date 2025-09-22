import { useState } from "react";
import SearchBar from "../components/SearchBar";

interface Clinic {
  _id: string;  // backend _id
  clinicName: string;
  clinicType: string;
  operatingHours: string;
  specialties: string[];
  contact: {
    phone: string;
    email: string;
  };
  staffName: string;
  staffEmail: string;
}

interface Doctor {
  _id: string;
  fullName: string;
  specialization: string;
  experience: number;
  consultationFee: number;
  language: string;
  photo: string;
}

export default function Home() {
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  const handleSearchResults = (data: any) => {

     if (Array.isArray(data) && data.length === 0) {
    setClinics([]);
    setDoctors([]);
    return;
  }
    if (data.type === "doctor") {
      setDoctors(data.results);
    } else if (data.type === "clinic") {
      setClinics(data.results);
    }
  };

  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to DoctorZ</h1>
      <p className="text-lg text-gray-700 mb-6">
        Your one-stop solution for managing patient, doctor, and clinic registrations.
      </p>

      {/* Search Bar */}
      <SearchBar onResults={handleSearchResults} />

      {/* Search Results */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Clinics */}
        {clinics.map((clinic) => (
          <div key={clinic._id} className="border p-4 rounded-md shadow hover:shadow-lg transition text-left">
            <h2 className="text-xl font-semibold">{clinic.clinicName}</h2>
            <p className="text-gray-600"><strong>Type:</strong> {clinic.clinicType}</p>
            <p className="text-gray-600"><strong>Hours:</strong> {clinic.operatingHours}</p>
            <p className="text-gray-600">
              <strong>Specialties:</strong> {clinic.specialties.join(", ") || "N/A"}
            </p>
            <p className="text-gray-600">
              <strong>Contact:</strong> {clinic.contact.phone} | {clinic.contact.email}
            </p>
            <p className="text-gray-600">
              <strong>Staff:</strong> {clinic.staffName} ({clinic.staffEmail})
            </p>
            <span className="text-sm text-blue-600">Clinic</span>
          </div>
        ))}

        {/* Doctors */}
        {doctors.map((doctor) => (
          <div key={doctor._id} className="border p-4 rounded-md shadow hover:shadow-lg transition text-left">
            <img
              src={`/uploads/${doctor.photo}`}
              alt={doctor.fullName}
              className="w-24 h-24 rounded-full mb-2 mx-auto"
            />
            <h2 className="text-xl font-semibold text-center">{doctor.fullName}</h2>
            <p className="text-gray-600"><strong>Specialization:</strong> {doctor.specialization}</p>
            <p className="text-gray-600"><strong>Experience:</strong> {doctor.experience} years</p>
            <p className="text-gray-600"><strong>Fee:</strong> ₹{doctor.consultationFee}</p>
            <p className="text-gray-600"><strong>Languages:</strong> {doctor.language}</p>
            <span className="text-sm text-green-600">Doctor</span>
          </div>
        ))}
      </div>
    </div>
  );
}
