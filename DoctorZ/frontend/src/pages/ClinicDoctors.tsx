// export default ClinicDoctors;
import { useEffect, useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import api from "../Services/mainApi";

interface Doctor {
  _id: string;
  fullName: string;
  specialization: string;
  mode: string;
  photo?: string;
}

interface ApiResponse {
  message: string;
  doctors: Doctor[];
}

interface OutletContext {
  clinicId: string | undefined;
}

const getStatusColor = (mode: string) => {
  switch (mode) {
    case "online":
      return "bg-green-500";
    case "offline":
      return "bg-red-500";
    default:
      return "bg-gray-300";
  }
};

const ClinicDoctors = () => {
  const { clinicId } = useOutletContext<OutletContext>();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await api.get<ApiResponse>(
          `/api/doctor/getClinicDoctors/${clinicId}`
        );
        if (Array.isArray(res.data.doctors)) {
          setDoctors(res.data.doctors);
        } else {
          setDoctors([]);
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
        setDoctors([]);
      } finally {
        setLoading(false);
      }
    };

    if (clinicId) fetchDoctors();
  }, [clinicId]);

  if (loading) return <p className="p-6">Loading doctors...</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen ">
      <h2 className="text-2xl font-bold mb-6">Doctor List</h2>

      {doctors.length === 0 ? (
        <p className="text-gray-600">No doctors found in this clinic.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
          {doctors.map((doctor) => (
            <div
              key={doctor._id}
              onClick={() => navigate(`/clinic-doctor-profile/${doctor._id}`)}
              className="cursor-pointer bg-white rounded-xl shadow-md border border-transparent hover:border-blue-500 hover:shadow-lg transition duration-200 group relative"
            >
              {/* Doctor Image */}
              <div className="w-full h-64 overflow-hidden rounded-t-xl">
                <img
                  src={`http://localhost:3000/uploads/${doctor.photo}`}
                  alt={doctor.fullName}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Doctor Info */}
              <div className="p-4 group-hover:bg-blue-500 transition font-poppins">
                {/* Status */}
                <div className="flex items-center mb-1">
                  <span
                    className={`w-2 h-2 rounded-full mr-2 ${getStatusColor(
                      doctor.mode || "offline"
                    )}`}
                  ></span>
                  <p className="text-sm text-gray-500 capitalize group-hover:text-white">
                    {doctor.mode || "offline"}
                  </p>
                </div>

                {/* Name & Specialization */}
                <h3 className="text-md font-semibold text-gray-800 group-hover:text-white font-poppins">
                  {doctor.fullName}
                </h3>
                <p className="text-sm text-gray-600 group-hover:text-white font-poppins">
                  {doctor.specialization}
                </p>
              </div>

              {/* 💬 Chat Icon in Bottom Right */}
              <div className="absolute bottom-4 right-4">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm group-hover:bg-white group-hover:text-blue-500 transition">
                  💬
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
