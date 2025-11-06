import React, { useEffect, useMemo, useState } from "react";
import { X, Video, Phone } from "lucide-react";
import { formatDayShort, formatDateNumber } from "../utils/date.js";
import api from "../Services/mainApi.js";
import { addMonths, startOfMonth, endOfMonth } from "date-fns";

import AppointmentFormModal from "./AppointmentFormModal.js";
import Swal from "sweetalert2";

interface Slot {
  _id: string;
  time: string;
  isActive: boolean;
}

interface DoctorForBooking {
  _id: string;
  fullName: string;
  photo?: string;
  specialization?: string;
  fees: number;
}

interface AvailableData {
  date: string;
  slots: Slot[];
}
interface ApiResponse {
  message?: string;
  availableMonths?: Record<string, AvailableData[]>;
}

type BookingDrawerVariant = "modal" | "sidebar";

interface Props {
  doctor: DoctorForBooking | null;
  open: boolean;
  onClose: () => void;
  onBooked?: (bookingInfo: unknown, roomId: unknown) => void;
  variant?: BookingDrawerVariant;
  roomId: unknown;
}

const BookingDrawer: React.FC<Props> = ({
  doctor,
  open,
  onClose,
  onBooked,
  variant = "modal",
}) => {
  const [mode, setMode] = useState<"online" | "offline">("online");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookingLoading, setBookingLoading] = useState(false);

  const [slots, setSlots] = useState<Slot[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showForm, setShowForm] = useState(false);
  const [availableMonths, setAvailableMonths] = useState<
    Record<string, { date: string; slots: Slot[] }[]>
  >({});
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  const isModal = variant === "modal";

  // Generate days of current month
  const days = useMemo(() => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    const arr: Date[] = [];
    const d = new Date(start);
    while (d <= end) {
      arr.push(new Date(d));
      d.setDate(d.getDate() + 1);
    }
    return arr;
  }, [currentMonth]);

  // --- FIX 1: Build a normalized dateMap using ISO date keys (YYYY-MM-DD)
  const dateMap = useMemo(() => {
    const map: Record<string, Slot[]> = {};

    Object.values(availableMonths).forEach((monthArr) => {
      monthArr.forEach((entry) => {
        // normalize entry date using ISO to avoid timezone mismatches
        const key = new Date(entry.date).toISOString().slice(0, 10);
        map[key] = entry.slots;
      });
    });

    return map;
  }, [availableMonths]);

  // --- FIX 2: Use an ISO-normalized formatDate so it matches dateMap keys
  const formatDate = (date: Date) => date.toISOString().slice(0, 10);

  useEffect(() => {
    const fetchAvailableMonths = async () => {
      if (!doctor) return;
      try {
        const res = await api.get<ApiResponse>(
          `/api/patient/slots/${doctor._id}`
        );

        const availableMonthsData: Record<string, AvailableData[]> =
          (res.data.availableMonths as Record<string, AvailableData[]>) || {};

        setAvailableMonths(availableMonthsData);

        // ✅ Auto-select first available date globally (only once after fetch)
        const allMonths = Object.keys(availableMonthsData).sort();
        if (allMonths.length > 0) {
          const firstMonthKey = allMonths[0];
          const monthData = availableMonthsData[firstMonthKey];
          if (monthData && monthData.length > 0) {
            const firstAvailable = monthData[0];
            const firstDate = new Date(firstAvailable.date);

            // update month and selected date/slots (initial load)
            setCurrentMonth(firstDate);

            // clone slots to avoid shared references
            const clonedSlots = (firstAvailable.slots || []).map((s) => ({
              ...s,
            }));
            setSelectedDate(firstDate);
            setSlots(clonedSlots);

            setSelectedTime(null);
            setSelectedKey(
              new Date(firstAvailable.date).toISOString().slice(0, 10)
            );
          }
        }
      } catch (err) {
        console.error("Failed to fetch available months", err);
        setAvailableMonths({});
      }
    };

    fetchAvailableMonths();
  }, [doctor]);

  // NOTE: removed the month-driven effect that auto-selected first day every time currentMonth changed.
  // That autoset was causing overwrites after user clicks. We intentionally do NOT auto-select slots on month change.

  const handleBook = async (formData: {
    name: string;
    age: number;
    gender: "Male" | "Female" | "Other";
    aadhar: string;
    contact: string;
  }) => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("patientToken="))
      ?.split("=")[1];
    const payloadBase64 = token?.split(".")[1];
    const pay = payloadBase64 ? JSON.parse(atob(payloadBase64)) : null;
    const userId = pay?.id;

    if (!token) {
      alert("Please login to book an appointment.");
      window.location.href = "/patient-login";
      return;
    }

    if (!doctor || !selectedDate || !selectedTime) {
      alert("Invalid booking data.");
      return;
    }

    const selectedSlotId = slots.find((s) => s.time === selectedTime)?._id;

    setBookingLoading(true);

    const bookingPayload = {
      doctorId: doctor._id,
      userId,
      mode,
      datetime: `${selectedDate
        .toISOString()
        .slice(0, 10)}T${selectedTime}:00Z`,
      fees: doctor.fees ?? 0,
      status: "booked", // ✅ required field
      emrId: null,
      slotId: selectedSlotId,
      patient: formData,
      createdAt: new Date().toISOString(),
    };
    console.log(" booking payload", bookingPayload);

    console.log({
      doctorId: doctor?._id,
      userId,
      slotId: selectedSlotId,
      selectedTime,
      datetime: `${selectedDate
        .toISOString()
        .slice(0, 10)}T${selectedTime}:00Z`,
    });

    try {
      const response = await api.post<{ roomId?: string }>(
        "/api/booking/book",
        bookingPayload
      );
      console.log(response.data);
      const { roomId } = response.data;

      Swal.fire({
        icon: "success",
        title: "Appointment Booked!",
        text: `Your appointment with Dr. ${doctor.fullName} has been booked successfully.`,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      }).then(() => {
        onBooked?.(bookingPayload, roomId);
        setBookingLoading(false);
        onClose();
      });
    } catch (err) {
      console.error("Booking error", err);
      Swal.fire({
        icon: "error",
        title: "Booking Failed",
        text: "Could not book appointment. Try again.",
        confirmButtonColor: "#d33",
      });
      setBookingLoading(false);
    }
  };

  if (!doctor) return null;

  return (
    <div
      className={`${
        isModal
          ? "fixed inset-0 z-50 flex items-center justify-center"
          : "w-full"
      }`}
    >
      <div
        className={`relative bg-white rounded-xl shadow p-5 ${
          isModal
            ? "max-w-md mx-4 transform transition-all duration-300 " +
              (open ? "scale-100 opacity-100" : "scale-95 opacity-0")
            : ""
        }`}
      >
        {/* Header */}
        <div className="p-2 border-b flex items-center justify-between">
          <div className="flex items-center gap-3">
            {doctor.photo ? (
              <img
                src={`http://localhost:3000/uploads/${doctor?.photo}`}
                alt={doctor.fullName}
                className="h-28 w-28 rounded-full object-cover shadow mx-auto md:mx-0"
              />
            ) : (
              <div className="h-12 w-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                {doctor.fullName.charAt(0)}
              </div>
            )}
            <div>
              <div className="font-semibold text-lg">{doctor.fullName}</div>
              <div className="text-sm text-gray-500">
                {doctor.specialization}
              </div>
            </div>
          </div>
          {isModal && (
            <button
              onClick={() => !bookingLoading && onClose()}
              className="text-gray-600 hover:bg-gray-100 rounded p-2"
            >
              <X />
            </button>
          )}
        </div>

        <div className="p-2 space-y-4 max-h-[80vh] overflow-y-auto">
          <>
            {/* Mode Selection */}
            <div className="flex gap-3 mb-4">
              <button
                onClick={() => setMode("online")}
                className={`flex-1 px-4 py-2 rounded-lg flex items-center justify-center gap-2 border ${
                  mode === "online"
                    ? "bg-green-600 text-white border-green-600"
                    : "bg-white text-gray-700"
                }`}
              >
                <Video className="w-4 h-4" /> Online
              </button>
              <button
                onClick={() => setMode("offline")}
                className={`flex-1 px-4 py-2 rounded-lg flex items-center justify-center gap-2 border ${
                  mode === "offline"
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700"
                }`}
              >
                <Phone className="w-4 h-4" /> Offline
              </button>
            </div>

            {/* Month Navigation */}
            <div className="flex justify-between items-center mb-2">
              {(() => {
                const prev = addMonths(currentMonth, -1);
                const next = addMonths(currentMonth, 1);

                const prevKey = `${prev.getFullYear()}-${String(
                  prev.getMonth() + 1
                ).padStart(2, "0")}`;
                const nextKey = `${next.getFullYear()}-${String(
                  next.getMonth() + 1
                ).padStart(2, "0")}`;

                const hasPrev = !!availableMonths[prevKey];
                const hasNext = !!availableMonths[nextKey];

                return (
                  <>
                    {/* Prev Button: only change month — do NOT auto-select slots */}
                    <button
                      onClick={() => {
                        if (!hasPrev) return;
                        setCurrentMonth(prev);
                        // clear selection when month changes (optional)
                        setSelectedKey(null);
                        setSelectedDate(null);
                        setSelectedTime(null);
                        setSlots([]);
                      }}
                      disabled={!hasPrev}
                      className={`px-2 py-1 border rounded ${
                        !hasPrev ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      Prev
                    </button>

                    <div className="font-semibold">
                      {currentMonth.toLocaleString("default", {
                        month: "long",
                        year: "numeric",
                      })}
                    </div>

                    {/* Next Button: only change month — do NOT auto-select slots */}
                    <button
                      onClick={() => {
                        if (!hasNext) return;
                        setCurrentMonth(next);
                        // clear selection when month changes (optional)
                        setSelectedKey(null);
                        setSelectedDate(null);
                        setSelectedTime(null);
                        setSlots([]);
                      }}
                      disabled={!hasNext}
                      className={`px-2 py-1 border rounded ${
                        !hasNext ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      Next
                    </button>
                  </>
                );
              })()}
            </div>

            {/* Date Carousel */}
            <div className="flex gap-2 mt-1 overflow-x-auto mb-4">
              {days
                .filter((d: Date) => {
                  const dateKey = formatDate(d);
                  return !!dateMap[dateKey];
                })
                .map((d: Date) => {
                  const key = formatDate(d);
                  const active = selectedKey === key;

                  return (
                    <button
                      key={key}
                      onClick={() => {
                        const dateKey = formatDate(d);

                        setSelectedDate(d);
                        setSelectedKey(dateKey);
                        setSelectedTime(null);

                        // --- FIX 3: clone slots when setting so downstream changes don't mutate shared arrays
                        const source = dateMap[dateKey] || [];
                        setSlots(source.map((s) => ({ ...s })));
                      }}
                      className={`min-w-[72px] flex-shrink-0 rounded-lg p-3 text-center border ${
                        active
                          ? "bg-blue-600 text-white"
                          : "bg-white text-gray-800 hover:shadow"
                      }`}
                    >
                      <div className="text-xs">{formatDayShort(d)}</div>
                      <div className="text-lg font-semibold">
                        {formatDateNumber(d)}
                      </div>
                    </button>
                  );
                })}
            </div>

            {/* Slots */}
            <div>
              <div className="text-sm font-medium mb-2">Available Slots</div>
              <div className="grid grid-cols-3 gap-2">
                {slots.length === 0 ? (
                  <div className="col-span-3 text-gray-500">
                    No slots available
                  </div>
                ) : (
                  slots.map((slot) => {
                    const isBooked = !slot.isActive;
                    return (
                      <button
                        key={slot._id}
                        onClick={() => !isBooked && setSelectedTime(slot.time)}
                        className={`relative p-2 rounded border text-sm w-full ${
                          selectedTime === slot.time
                            ? "bg-blue-600 text-white"
                            : "bg-white text-gray-800 hover:shadow"
                        } ${
                          isBooked
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : ""
                        }`}
                        disabled={isBooked}
                      >
                        {slot.time}
                        {isBooked && (
                          <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <span className="absolute w-[2px] h-full bg-red-600 rotate-45 origin-center"></span>
                            <span className="absolute w-[2px] h-full bg-red-600 -rotate-45 origin-center"></span>
                          </span>
                        )}
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            {/* Continue Button */}
            {selectedTime && (
              <button
                onClick={() => setShowForm(true)}
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Continue
              </button>
            )}
          </>

          <AppointmentFormModal
            open={showForm}
            onClose={() => setShowForm(false)}
            onSubmit={handleBook}
            doctorId={doctor._id}
            selectedDate={
              selectedDate ? selectedDate.toISOString().slice(0, 10) : ""
            }
            selectedTime={selectedTime || ""}
          />
        </div>
      </div>
    </div>
  );
};

export default BookingDrawer;
