import { useState } from "react";
import SearchBar from "../components/SearchBar";

interface Clinic {
  _id: string; 
  clinicName: string;
  clinicType: string;
  operatingHours: string;
  specialities: string[];

  phone: string;
  email: string;

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
        Your one-stop solution for managing patient, doctor, and clinic
        registrations.
      </p>

      {/* Search Bar */}
      <SearchBar onResults={handleSearchResults} />

      {/* Search Results */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Clinics */}
        {clinics.map((clinic) => (
          <div
            key={clinic._id}
            className="border p-4 rounded-md shadow hover:shadow-lg transition text-left"
          >
            <h2 className="text-xl font-semibold">{clinic.clinicName}</h2>
            <span className="text-sm text-blue-600">Clinic</span>
            <p className="text-gray-600">
              <strong>Type:</strong> {clinic.clinicType}
            </p>
            <p className="text-gray-600">
              <strong>Hours:</strong> {clinic.operatingHours}
            </p>
            <p className="text-gray-600">
              <strong>Specialities: </strong>
              {Array.isArray(clinic.specialities) &&
              clinic.specialities.length > 0
                ? clinic.specialities.join(", ")
                : "N/A"}
            </p>
            <p className="text-gray-600">
              <strong>Contact:</strong> {clinic.phone} | {clinic.email}
            </p>
            <button
                onClick={() => console.log("View Profile:", clinic._id)}
                className="mt-4 w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition-all"
              >
                View Clinic
              </button>
          </div>
        ))}

        {/* Doctors */}
        {doctors.map((doctor) => (
          <div
            key={doctor._id}
            className="border p-4 rounded-md shadow hover:shadow-lg transition text-left"
          >
            <img
              src={`http://localhost:3000/uploads/${doctor.photo}`}
              alt={doctor.fullName}
              className="w-24 h-24 rounded-full mb-2 mx-auto"
            />
            <h2 className="text-xl font-semibold text-center">
              {doctor.fullName}
            </h2>
                 <span className="text-sm text-green-600">Doctor</span>
            <p className="text-gray-600">
              <strong>Specialization:</strong> {doctor.specialization}
            </p>
            <p className="text-gray-600">
              <strong>Experience:</strong> {doctor.experience} years
            </p>
            <p className="text-gray-600">
              <strong>Fee:</strong> ₹{doctor.consultationFee}
            </p>
            <p className="text-gray-600">
              <strong>Languages:</strong> {doctor.language}
            </p>

               <button
                onClick={() =>
                  alert(`Booking appointment with ${doctor.fullName}`)
                }
                className="mt-3 w-full bg-blue-500 text-white font-semibold px-4 py-2 rounded-xl hover:bg-green-700 transition shadow-md"
              >
                Get Appointment
              </button>
       
          </div>
        ))}
      </div>
    </div>
  );
}
