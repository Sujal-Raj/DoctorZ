
import { useEffect, useState } from "react";
import axios from "axios";
import { FaCalendarAlt, FaRupeeSign, FaClock, FaUser ,FaTimes ,FaCheck } from "react-icons/fa";

interface Patient {
  name: string;
  age: number;
  gender: string;
  contact: string;
  aadhar?: string;
}

interface Booking {
  _id: string;
  patient: Patient; // matches backend populate("patientId")
  datetime: string;
  fees: number;
  mode: "online" | "offline";
  status: "booked" | "cancelled" | "completed";
}

export default function DoctorAppointments() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  // Get doctor ID from localStorage (dynamic per login)
  const doctorId = localStorage.getItem("doctorId");

  // Fetch bookings for this doctor
  const fetchBookings = async () => {
    if (!doctorId){
       console.error("Doctor ID missing from localStorage");
       return;
    }
    try {
      const { data } = await axios.get<{ bookings: Booking[] }>(
        `http://localhost:3000/api/booking/doctor/${doctorId}`
      );
      setBookings(data.bookings);
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
    }
  };

  // Update booking status
  const updateStatus = async (id: string, status: "completed" | "cancelled") => {
    try {
      await axios.put(`http://localhost:3000/api/booking/${id}/status`, { status });
      fetchBookings(); // refresh after update
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

 return (
<div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Appointments</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((b) => (
          <div
            key={b._id}
            className="bg-white/0 border border-gray-300 rounded-2xl p-5 shadow-sm transition-transform hover:shadow-md hover:scale-[1.02] cursor-pointer hover:border-black"
          >
            {/* Patient Info */}
            <div className="mb-4">
              <div className="flex items-center gap-2">
                <FaUser className="text-gray-600" />
                <h3 className="text-lg font-semibold text-gray-900">{b.patient?.name}</h3>
              </div>
              <p className="text-sm text-gray-600">
                {b.patient?.age} yrs / {b.patient?.gender}
              </p>
              <p className="text-sm text-gray-600">Contact: {b.patient?.contact}</p>
            </div>

            {/* Appointment Info */}
            <div className="mb-4 text-gray-700 text-sm space-y-2">
              <p className="flex items-center gap-2">
                <FaCalendarAlt className="text-gray-500" />
                <span className="font-medium">Date & Time:</span> {new Date(b.datetime).toLocaleString()}
              </p>
              <p className="flex items-center gap-2">
                <FaRupeeSign className="text-gray-500" />
                <span className="font-medium">Fees:</span> {b.fees}
              </p>
              <p className="flex items-center gap-2 capitalize">
                <FaClock className="text-gray-500" />
                <span className="font-medium">Mode:</span> {b.mode}
              </p>
            </div>

            {/* Status Badge */}
            <div
              className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-4 ${
                b.status === "completed"
                  ? "bg-green-200 text-green-800"
                  : b.status === "cancelled"
                  ? "bg-red-200 text-red-800"
                  : "bg-yellow-200 text-yellow-800"
              }`}
            >
              {b.status.toUpperCase()}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-2">
              {b.status !== "completed" && (
                <button
                  onClick={() => updateStatus(b._id, "completed")}
                  className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-500 text-white py-2 rounded-lg font-medium transition-colors cursor-pointer"
                >
                  <FaCheck /> Complete
                </button>
              )}
              {b.status !== "cancelled" && (
                <button
                  onClick={() => updateStatus(b._id, "cancelled")}
                  className="flex-1 flex items-center justify-center gap-2 bg-red-400 hover:bg-red-500 text-white py-2 rounded-lg font-medium transition-colors cursor-pointer"
                >
                  <FaTimes /> Cancel
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
);

}
