
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { User, User2, Phone, Calendar } from "lucide-react";

interface Patient {
  patientName: string;
  age: number;
  gender?: string;
  contact: string;
  appointedTo: string;
  specialization: string;
  datetime: string;
  mode: string;
  status: string;
  fees: number;
}

interface GetPatientsResponse {
  patients: Patient[];
  message?: string;
}

export default function AllClinicPatients() {
  const { clinicId } = useParams<{ clinicId: string }>();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatients = async () => {
      if (!clinicId) return;
      try {
        setLoading(true);
        const res = await axios.get<GetPatientsResponse>(
          `http://localhost:3000/api/clinic/getAllClinicPatients/${clinicId}`
        );
        setPatients(res.data.patients || []);
      } catch (err: unknown) {
        setError(err + "Failed to fetch clinic patients");
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, [clinicId]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64 text-lg font-poppins">
        Loading patients...
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-600 font-semibold mt-8 font-poppins">
        {error}
      </div>
    );

  if (patients.length === 0)
    return (
      <div className="text-center text-gray-600 font-medium mt-8 font-poppins">
        No patients found for this clinic.
      </div>
    );

  return (
    <div
      className="p-8 bg-gray-50 min-h-screen font-[Poppins]"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 tracking-tight">
          Patients List
        </h2>
      </div>

      <div className="overflow-x-auto bg-white rounded-2xl shadow-lg border border-gray-100">
        <table className="min-w-full text-sm text-left text-gray-700 whitespace-nowrap">
          <thead className="bg-indigo-50 text-gray-700 uppercase text-xs font-semibold tracking-wider">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Gender</th>
              <th className="px-6 py-4">Age</th>
              <th className="px-6 py-4">Doctor</th>
              <th className="px-6 py-4">Specialization</th>
              <th className="px-6 py-4 min-w-[160px]">Contact</th>
              <th className="px-6 py-4 min-w-[200px]">Date & Time</th>
              <th className="px-6 py-4">Mode</th>
              <th className="px-6 py-4">Fees</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p, index) => {
              if (!p) return null;
              const gender =
                typeof p.gender === "string"
                  ? p.gender.toLowerCase()
                  : "unknown";
              const isFemale = gender === "female";

              const formattedDate = p.datetime
                ? new Date(p.datetime).toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })
                : "N/A";

              return (
                <tr
                  key={index}
                  className="border-b border-gray-100 hover:bg-indigo-50 transition-all duration-150"
                >
                  <td className="px-6 py-4 flex items-center gap-3 font-medium text-gray-800">
                    {isFemale ? (
                      <User2 className="text-pink-500" size={26} />
                    ) : (
                      <User className="text-blue-500" size={26} />
                    )}
                    <span>{p.patientName || "N/A"}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{p.gender || "N/A"}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {p.age ? `${p.age} yrs` : "N/A"}
                  </td>
                  <td className="px-6 py-4 text-gray-700 font-medium">
                    {p.appointedTo || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {p.specialization || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    <div className="flex items-center gap-2">
                      <Phone size={20} className="text-gray-500 flex-shrink-0" />
                      <span className="truncate">{p.contact || "N/A"}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    <div className="flex items-center gap-2">
                      <Calendar size={20} className="text-gray-500 flex-shrink-0" />
                      <span className="truncate">{formattedDate}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 capitalize text-gray-700">
                    {p.mode || "N/A"}
                  </td>
                  <td className="px-6 py-4 font-semibold text-indigo-600">
                    ₹{p.fees ?? 0}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
