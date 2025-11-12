import React, { useEffect, useMemo, useState } from "react";
import { X, Video, Phone } from "lucide-react";
import { formatDayShort, formatDateNumber } from "../utils/date.js";
import api from "../Services/mainApi.js";
import { addMonths, startOfMonth, endOfMonth } from "date-fns";
import AppointmentFormModal from "./AppointmentFormModal.js";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

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
  clinicAddress?: string;
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
  onBooked?: (bookingInfo: unknown) => void;
}

const BookingSidebar: React.FC<Props> = ({ doctor, open, onClose, onBooked }: Props) => {
  const [mode, setMode] = useState<"online" | "offline">("online");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const [slots, setSlots] = useState<Slot[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showForm, setShowForm] = useState(false);
  const [availableMonths, setAvailableMonths] = useState<
    Record<string, { date: string; slots: Slot[] }[]>
  >({});
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

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
      setLoadingSlots(true);
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
      } finally {
        setLoadingSlots(false);
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
    const token = document.cookie.split("; ").find((r) => r.startsWith("patientToken="))?.split("=")[1];
    const payloadBase64 = token?.split(".")[1];
    const pay = payloadBase64 ? JSON.parse(atob(payloadBase64)) : null;
    const userId = pay?.id;

    if (!token) {
      Swal.fire({
        icon: "info",
        title: "Login Required",
        text: "Please login to book an appointment.",
        confirmButtonText: "OK",
      }).then(() => (window.location.href = "/patient-login"));
      return;
    }

    if (!doctor || !selectedDate || !selectedTime) {
      Swal.fire({ icon: "warning", title: "Incomplete Data", text: "Please select date & time." });
      return;
    }

    const selectedSlotId = slots.find((s) => s.time === selectedTime)?._id;
    setBookingLoading(true);

    const bookingPayload = {
      doctorId: doctor._id,
      userId,
      mode,
      datetime: `${selectedDate.toISOString().slice(0, 10)}T${selectedTime}:00Z`,
      fees: doctor.fees ?? 0,
      slotId: selectedSlotId,
      patient: formData,
      createdAt: new Date().toISOString(),
    };

    try {
      
      const response = await api.post<{ roomId?: string }>("/api/booking/book", bookingPayload);
      console.log(response.data);
      const { roomId } = response.data;
      console.log(roomId)
      await api.post("/api/booking/book", bookingPayload);
      Swal.fire({
        icon: "success",
        title: "Appointment Confirmed!",
        text: `Your appointment with Dr. ${doctor.fullName} is booked successfully.`,
      });
      onBooked?.(bookingPayload);
      onClose();
    } catch (err) {
      console.error("Booking error", err);
      Swal.fire({ icon: "error", title: "Booking Failed", text: "Please try again later." });
    } finally {
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
        className={`fixed inset-0 z-50 flex justify-end transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div onClick={onClose} className="absolute inset-0 bg-black/40 backdrop" />

        <aside
          ref={sidebarRef}
          className={`relative bg-white w-full sm:w-96 h-full shadow-2xl transform transition-transform duration-500 ease-in-out ${
            open ? "translate-x-0" : "translate-x-full"
          } rounded-l-2xl overflow-hidden`}
        >
          {/* Header */}
          <header className="flex items-center justify-between px-5 py-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center gap-3">
              {doctor.photo ? (
                <img
                  src={`http://localhost:3000/uploads/${doctor.photo}`}
                  alt={doctor.fullName}
                  className="h-14 w-14 rounded-full object-cover border border-gray-200"
                />
              ) : (
                <div className="h-14 w-14 flex items-center justify-center rounded-full bg-[#28328C] text-white text-lg font-semibold">
                  {doctor.fullName.charAt(0)}
                </div>
              )}
              <div>
                <h2 className="text-lg font-semibold text-gray-900">{doctor.fullName}</h2>
                <p className="text-sm text-gray-500">{doctor.specialization}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:bg-gray-200 rounded-full p-2 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </header>

          {/* Content */}
          <div className="p-5 space-y-5 overflow-y-auto h-[calc(100%-4rem)] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            {/* Mode Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setMode("online")}
                className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                  mode === "online"
                    ? "bg-[#28328C] text-white shadow"
                    : "bg-white text-gray-700 hover:border-[#28328C]/40"
                }`}
              >
                <Video className="w-4 h-4" /> Online
              </button>
              <button
                onClick={() => setMode("offline")}
                className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                  mode === "offline"
                    ? "bg-[#28328C] text-white shadow"
                    : "bg-white text-gray-700 hover:border-[#28328C]/40"
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
              <h4 className="text-sm font-semibold mb-2 text-gray-700">Available Slots</h4>
              {loadingSlots ? (
                <div className="grid grid-cols-3 gap-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="h-10 rounded bg-gray-100 animate-pulse" />
                  ))}
                </div>
              ) : slots.length === 0 ? (
                <div className="text-gray-500 text-sm">No slots available for selected date.</div>
              ) : (
                <div className="grid grid-cols-3 gap-2">
                  {slots.map((slot) => {
                    const isBooked = !slot.isActive;
                    const selected = selectedTime === slot.time;
                    return (
                      <button
                        key={slot._id}
                        onClick={() => !isBooked && setSelectedTime(slot.time)}
                        disabled={isBooked}
                        className={`p-2 rounded border text-sm transition-all ${
                          selected
                            ? "bg-[#28328C] text-white shadow"
                            : "bg-white text-gray-800 hover:shadow-sm"
                        } ${
                          isBooked
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        {slot.time}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Sticky Bottom Button */}
          {selectedTime && (
            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-4 py-3">
              <button
                onClick={() => setShowForm(true)}
                className="w-full bg-[#28328C] text-white py-2 rounded-lg font-medium hover:bg-[#1e2675] transition-all"
              >
                Continue
              </button>
            </div>
          )}

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
        </aside>
      </div>
    </>
  );
};

export default BookingDrawer;
