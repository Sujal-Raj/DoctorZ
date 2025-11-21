import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Phone, Search } from "lucide-react";
import api from "../Services/mainApi";

interface Patient {
  _id: string;
  name: string;
  age: number;
  gender: string;
  contact: string;
  aadhar: string;
  photo?: string;
}

interface Booking {
  _id: string;
  patient: Patient | null;
  mode: string;
  fees: number;
  roomId: string;
  doctorId: string;
}

const AllPatient: React.FC = () => {
  const navigate = useNavigate();
  const { drId } = useParams<{ drId: string }>();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      if (!drId) return;
      try {
        const res = await api.get<{ bookings: Booking[] }>(
          `/api/booking/doctor/${drId}/all-patient`
        );
        setBookings(res.data.bookings || []);
      } catch (err) {
        console.error("Error fetching patients:", err);
      }
    };
    fetchBookings();
  }, [drId]);

  const handleViewEMR = (aadhar?: string) => {
    if (!aadhar || !drId) return;
    navigate(`/doctordashboard/${drId}/patientEMR/${aadhar}`);
  };

  const filteredPatients = bookings.filter((b) =>
    b.patient?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const themeColor = "#0c213e";

  // Different button colors
  const emrColor = "#28328C"; // Blue
  const callColor = "#0a7d32"; // Green
  const chatColor = "#b434ef"; // Purple

  return (
    <main className="min-h-screen bg-gray-50 py-6 overflow-hidden font-[Poppins]">
      <title>Doctor Patients | Dashboard</title>

      <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8 max-w-[1400px] mx-auto">

        {/* Header */}
        <div className="sticky top-0 bg-gray-50 pb-3 z-30 border-b border-gray-200">

          <h1
            className="text-3xl sm:text-5xl font-bold text-center lg:text-left mb-2"
            style={{ color: themeColor }}
          >
            All Patients
          </h1>

          <p className="text-gray-600 text-base sm:text-lg text-center lg:text-left">
            View patients, check EMR, call, or chat instantly
          </p>

          {/* Search */}
          <div className="relative max-w-2xl mt-5 mx-auto lg:mx-0">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
              style={{ color: themeColor }}
            />
            <input
              type="text"
              placeholder="Search patient by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 placeholder-gray-400"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white shadow-sm overflow-auto mt-6 rounded-lg">
          {filteredPatients.length === 0 ? (
            <p className="text-center text-gray-500 py-6">No patients found.</p>
          ) : (
            <table className="w-full text-left min-w-[900px] border-collapse">
              <thead style={{ backgroundColor: themeColor }} className="text-white">
                <tr>
                  <th className="px-4 py-3">Patient</th>
                  <th className="px-4 py-3">Gender</th>
                  <th className="px-4 py-3">Age</th>
                  <th className="px-4 py-3">Contact</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredPatients.map((booking) => (
                  <tr key={booking._id} className="border-b border-gray-200 hover:bg-gray-50">

                    {/* Patient */}
                    <td className="px-4 py-4 flex items-center gap-3">
                      <img
                        src={
                          booking.patient?.photo
                            ? booking.patient.photo
                            : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        }
                        alt="profile"
                        className="w-12 h-12 rounded-lg object-cover border"
                      />
                      <div>
                        <p className="font-semibold text-gray-900">
                          {booking.patient?.name}
                        </p>
                        <p className="text-sm text-gray-500 capitalize">
                          {booking.mode}
                        </p>
                      </div>
                    </td>

                    <td className="px-4 py-4">{booking.patient?.gender}</td>

                    <td className="px-4 py-4">
                      {booking.patient?.age ? `${booking.patient.age} yrs` : "-"}
                    </td>

                    {/* Contact */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <Phone className="w-5 h-5" style={{ color: themeColor }} />
                        <span>{booking.patient?.contact}</span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-2 justify-center">

                        <button
                          onClick={() => handleViewEMR(booking.patient?.aadhar)}
                          className="px-3 py-1 text-white rounded-lg text-sm"
                          style={{ backgroundColor: emrColor }}
                        >
                          View EMR
                        </button>

                        <a
                          href={`tel:${booking.patient?.contact}`}
                          className="px-3 py-1 text-white rounded-lg text-sm"
                          style={{ backgroundColor: callColor }}
                        >
                          Call
                        </a>

                        <button
                          onClick={() =>
                            navigate(`/doctor-chat/${booking.roomId}`, {
                              state: {
                                patient: booking.patient,
                                doctorId: booking.doctorId,
                                roomId: booking.roomId,
                              },
                            })
                          }
                          className="px-3 py-1 text-white rounded-lg text-sm"
                          style={{ backgroundColor: chatColor }}
                        >
                          Chat
                        </button>

                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </main>
  );
};

export default AllPatient;
