

import { useEffect, useState } from "react";
import axios from "axios";
import {
  CalendarDaysIcon,
  CurrencyRupeeIcon,
  ClockIcon,
  UserIcon,
  XMarkIcon,
  CheckIcon,
} from "@heroicons/react/24/solid";

interface Patient {
  name: string;
  age: number;
  gender: string;
  contact: string;
  aadhar?: string;
}

interface Booking {
  _id: string;
  patient: Patient;
  datetime: string;
  fees: number;
  mode: "online" | "offline";
  status: "booked" | "cancelled" | "completed";
}

export default function DoctorAppointments() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const doctorId = localStorage.getItem("doctorId");

  const fetchBookings = async () => {
    if (!doctorId) return;
    try {
      const { data } = await axios.get<{ bookings: Booking[] }>(
        `http://localhost:3000/api/booking/doctor/${doctorId}`
      );
      setBookings(data.bookings);
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
    }
  };

  const updateStatus = async (
    id: string,
    status: "completed" | "cancelled"
  ) => {
    try {
      await axios.put(`http://localhost:3000/api/booking/${id}/status`, {
        status,
      });
      fetchBookings();
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="p-4 ml-5 lg:p-8 flex flex-col  w-full">
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6 text-gray-800 text-center lg:text-left">
        Appointments
      </h2>

      <div className="flex justify-center">
        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-2  xl:grid-cols-3 gap-6 w-full max-w-screen-xl">
          {bookings.map((b) => (
            <div
              key={b._id}
              className="bg-white border border-gray-300 rounded-2xl p-4 sm:p-5 shadow-sm transition-transform hover:shadow-md hover:scale-[1.02] cursor-pointer hover:border-black flex flex-col justify-between"
            >
              {/* Patient Info */}
              <div className="mb-4">
                <div className="flex items-center gap-2">
                  <UserIcon className="text-gray-600 w-5 h-5 sm:w-6 sm:h-6" />
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">
                    {b.patient?.name}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm md:text-base text-gray-600">
                  {b.patient?.age} yrs / {b.patient?.gender}
                </p>
                <p className="text-xs sm:text-sm md:text-base text-gray-600">
                  Contact: {b.patient?.contact}
                </p>
              </div>

              {/* Appointment Info */}
              <div className="mb-4 text-gray-700 text-xs sm:text-sm md:text-base space-y-2">
                <p className="flex items-center gap-2">
                  <CalendarDaysIcon className="text-gray-500 w-5 h-5 sm:w-6 sm:h-6" />
                  <span className="font-medium">Date & Time:</span>{" "}
                  {new Date(b.datetime).toLocaleString()}
                </p>
                <p className="flex items-center gap-2">
                  <CurrencyRupeeIcon className="text-gray-500 w-5 h-5 sm:w-6 sm:h-6" />
                  <span className="font-medium">Fees:</span> {b.fees}
                </p>
                <p className="flex items-center gap-2 capitalize">
                  <ClockIcon className="text-gray-500 w-5 h-5 sm:w-6 sm:h-6" />
                  <span className="font-medium">Mode:</span> {b.mode}
                </p>
              </div>

              {/* Status Badge */}
              <div
                className={`inline-block px-3 py-1 rounded-full text-xs sm:text-sm font-semibold mb-4 ${
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
              <div className="mt-3 flex flex-col lg:flex-row gap-2">
                {b.status !== "completed" && (
                  <button
                    onClick={() => updateStatus(b._id, "completed")}
                    className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm py-2 rounded-lg font-medium transition"
                  >
                    <CheckIcon className="w-5 h-5" />
                    Complete
                  </button>
                )}
                {b.status !== "cancelled" && (
                  <button
                    onClick={() => updateStatus(b._id, "cancelled")}
                    className="flex-1 flex items-center justify-center gap-2 bg-red-400 hover:bg-red-500 text-white text-sm py-2 rounded-lg font-medium transition"
                  >
                    <XMarkIcon className="w-5 h-5" />
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
