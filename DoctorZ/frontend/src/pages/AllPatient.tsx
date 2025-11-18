import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { Phone } from "lucide-react";
import api from "../Services/mainApi";

// ---------------- Interfaces ----------------
interface Patient {
  _id: string;
  name: string;
  age: number;
  gender: string;
  contact: string;
  aadhar: string;
  emrId?: string;
}

interface Booking {
  _id: string;
  patient: Patient | null;
  mode: string;
  fees: number;
  roomId: string;
  doctorId: string;
}

// ---------------- Component ----------------
const AllPatient: React.FC = () => {
  const navigate = useNavigate();
  const { drId } = useParams<{ drId: string }>();
  console.log("🚀 Doctor ID from params:", drId);

  // Store the full bookings so you can access booking.roomId etc.
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!drId) return;
      try {
        const res = await api.get<{ bookings: Booking[] }>(
          `/api/booking/doctor/${drId}`
        );
        console.log("Bookings:", res.data.bookings);

        setBookings(res.data.bookings);
      } catch (err) {
        console.error("Error fetching patients:", err);
      }
    };

    fetchBookings();
  }, [drId]);

  return (
    <div className="w-full p-4 sm:p-5 md:p-6 overflow-x-auto rounded-lg font-[Poppins]">
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 text-center sm:text-left">
        Patients List
      </h2>

      {bookings.length === 0 ? (
        <p className="text-gray-500 text-center sm:text-left">No patients found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-700 text-xs sm:text-sm md:text-base">
              <tr>
                <th className="px-3 sm:px-4 py-2">Name</th>
                <th className="px-3 sm:px-4 py-2">Gender</th>
                <th className="px-3 sm:px-4 py-2">Age</th>
                <th className="px-3 sm:px-4 py-2">Contact</th>
                <th className="px-3 sm:px-4 py-2">Call / Chat</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => {
                const patient = booking.patient;
                if (!patient) return null;
                return (
                  <tr
                    key={patient._id}
                    className="border-t hover:bg-gray-50 text-xs sm:text-sm md:text-base"
                  >
                    <td className="px-3 sm:px-4 py-2 font-medium flex items-center gap-2">
                      <UserCircleIcon className="w-5 h-5 sm:w-6 sm:h-6 text-pink-500" />
                      <span className="truncate">{patient.name || "-"}</span>
                    </td>
                    <td className="px-3 sm:px-4 py-2">{patient.gender || "-"}</td>
                    <td className="px-3 sm:px-4 py-2">{patient.age ? `${patient.age} yrs` : "-"}</td>
                    <td className="px-3 sm:px-4 py-2">
                      <div className="flex items-center gap-2">
                        <Phone size={18} className="text-gray-500 flex-shrink-0" />
                        <span className="truncate">{patient.contact || "N/A"}</span>
                      </div>
                    </td>
                    <td className="px-3 sm:px-4 py-2">
                      <div className="flex flex-col sm:flex-row gap-2">
                        <button
                          onClick={() =>
                            navigate(
                              `/doctordashboard/${drId}/patientEMR/${patient.emrId}`
                            )
                          }
                          className="px-2 sm:px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs sm:text-sm text-center"
                        >
                          View EMR
                        </button>
                        <a
                          href={`tel:${patient.contact}`}
                          className="px-2 sm:px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-xs sm:text-sm text-center"
                        >
                          Call
                        </a>
                        <button
                          onClick={() =>
                            navigate(`/doctor-chat/${booking.roomId}`, {
                              state: {
                                patient,
                                doctorId: booking.doctorId,
                                roomId: booking.roomId,
                              },
                            })
                          }
                          className="px-2 sm:px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs sm:text-sm text-center"
                        >
                          Chat
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllPatient;
