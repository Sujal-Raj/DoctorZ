import { useEffect, useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import api from "../api/client";

// Doctor type
interface Doctor {
  _id: string;
  fullName: string;
  specialization: string;
  experience: number;
  consultationFee: number;
  qualification: string;
  gender: string;
  language: string;
  photo?: string;
}

interface ApiResponse {
  message: string;
  doctors: Doctor[];
}

interface OutletContext {
  clinicId: string | undefined;
}

const ClinicDoctors = () => {
  const { clinicId } = useOutletContext<OutletContext>();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await api.get<ApiResponse>(`/api/doctor/getClinicDoctors/${clinicId}`);
        console.log("Doctors in this clinic:", res.data);

        if (Array.isArray(res.data.doctors)) {
          setDoctors(res.data.doctors);
        } else {
          setDoctors([]);
        }
      } catch (error) {
        console.error("Error fetching clinic doctors:", error);
        setDoctors([]);
      } finally {
        setLoading(false);
      }
    };

    if (clinicId) fetchDoctors();
  }, [clinicId]);

  if (loading) return <p className="p-6">Loading doctors...</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Clinic Doctors</h2>

      {doctors.length === 0 ? (
        <p className="text-gray-600">No doctors found in this clinic.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {doctors.map((doctor) => (
            <div
              key={doctor._id}
              className="flex items-start gap-4 bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
            >
              {/* Doctor Image */}
              <img
                src={`http://localhost:3000/uploads/${doctor.photo}`}
                alt={doctor.fullName}
                className="w-20 h-20 rounded-full object-cover border"
              />

              {/* Doctor Info */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{doctor.fullName}</h3>
                <p className="text-sm text-gray-600 capitalize">{doctor.specialization}</p>
                <p className="text-sm text-gray-500">{doctor.experience} years experience</p>
                <p className="text-sm text-gray-500">{doctor.qualification}</p>
                <p className="text-sm text-gray-500">Speaks: {doctor.language}</p>
                <p className="mt-2 font-semibold text-blue-600">₹{doctor.consultationFee}</p>

                {/* Buttons */}
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => navigate(`/doctor/profile/${doctor._id}`)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => navigate(`${doctor._id}/availability`)}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
                  >
                    Set Availability
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClinicDoctors;
