import { useEffect, useState } from "react";

interface Doctor {
  _id: string;
  fullName: string;
  specialization: string;
  experience: number;
  consultationFee: number;
  language: string;
  qualification: string;
  photo: string;
}

export default function AllDoctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/doctor/allDoctors"
        );
        const data = await response.json();
        console.log("API Response:", data);

        if (Array.isArray(data.doctors)) {
          setDoctors(data.doctors);
        } else {
          setDoctors([]);
        }
      } catch (err) {
        console.error("Error fetching doctors:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-xl font-semibold text-gray-600">
        Loading doctors...
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center text-green-700">
        Available Doctors
      </h1>

      {doctors.length === 0 ? (
        <p className="text-center text-gray-500">No doctors available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {doctors.map((doctor) => (
            <div
              key={doctor._id}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all border border-gray-100 flex flex-col items-center"
            >
              {/* Doctor Photo */}
              <div className="w-32 h-32 mb-4">
                <img
                  src={`http://localhost:3000/uploads/${doctor.photo}`}
                  alt={doctor.fullName}
                  className="w-full h-full rounded-full object-cover border-2 border-green-500 shadow-sm"
                />
              </div>

              {/* Doctor Info */}
              <h2 className="text-xl font-bold text-gray-800 mb-1 text-center">
                {doctor.fullName}
              </h2>
              <p className="text-sm text-green-600 mb-2 text-center">
                {doctor.specialization}
              </p>

              <div className="w-full text-gray-700 text-sm space-y-1 mb-4">
                <p>
                  <strong>Experience:</strong> {doctor.experience} years
                </p>
                <p>
                  <strong>Fee:</strong> ₹{doctor.consultationFee}
                </p>
                <p>
                  <strong>Language:</strong> {doctor.language}
                </p>
                <p>
                  <strong>Qualification:</strong> {doctor.qualification}
                </p>
              </div>

              {/* Appointment Button */}
              <button
                onClick={() =>
                  alert(`Booking appointment with ${doctor.fullName}`)
                }
                className="mt-auto w-full bg-green-600 text-white font-semibold px-4 py-2 rounded-xl hover:bg-green-700 transition shadow-md"
              >
                Get Appointment
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
