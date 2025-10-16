import { useEffect, useState } from "react";

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
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/clinic/getClinic");
        const data = await response.json();
        setClinics(data.clinic || []);
  

      } catch (err) {
        console.error("Error fetching clinics:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchClinics();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-xl font-semibold text-gray-600">
        Loading clinics...
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        Registered Clinics
      </h1>

      {clinics.length === 0 ? (
        <p className="text-center text-gray-500">No clinics available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {clinics.map((clinic) => (
            <div
              key={clinic._id}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all border border-gray-100 flex flex-col justify-between"
            >
              {/* Clinic Info */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-1">
                  {clinic.clinicName}
                </h2>
                <p className="text-sm text-blue-600 font-medium mb-3">
                  {clinic.clinicType}
                </p>

                <p className="text-gray-700 mb-1">
     
                    <strong>Specialties:</strong>{" "}
  {clinic.specialities?.join(", ") || "N/A"}
                </p>

                <p className="text-gray-700 mb-1">
                  <strong>Operating Hours:</strong> {clinic.operatingHours || "N/A"}
                </p>

                <p className="text-gray-700 mb-1">
                  <strong>Address:</strong> {clinic.address || "N/A"}, {clinic.district || "N/A"}, {clinic.state || "N/A"}
                </p>

                <p className="text-gray-700 mb-3">
                  <strong>Contact:</strong> {clinic.phone || "N/A"} | {clinic.email || "N/A"}
                </p>

                <p className="text-gray-700">
                  <strong>Doctors:</strong> {clinic.doctors.length}
                </p>
              </div>

              {/* View Profile Button */}
              <button
                onClick={() => console.log("View Profile:", clinic._id)}
                className="mt-4 w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition-all"
              >
                View Profile
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
