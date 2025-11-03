


import { useEffect, useState } from "react";
import axios from "axios";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

interface Slot {
  time: string;
  isActive: boolean;
}

interface DoctorSlot {
  _id: string;
  doctorId: string;
  date: string;
  slots: Slot[];
}

export default function TimeSlots({ doctorId }: { doctorId?: string }) {
  const [savedSlots, setSavedSlots] = useState<DoctorSlot[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [activeSlots, setActiveSlots] = useState<Slot[]>([]);
  const [selectedMultipleDates, setSelectedMultipleDates] = useState<Date[]>([]);
  const [selectionType, setSelectionType] = useState<"day" | "month">("day");

  // ✅ Fetch slots from backend
  const fetchSlots = async () => {
    try {
      const res = await axios.get<DoctorSlot[]>(`/api/timeslots/getActiveSlots/${doctorId}`);
      setSavedSlots(res.data ?? []);
    } catch (err) {
      console.error("Error fetching slots:", err);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, [doctorId]);

  // ✅ Only include dates that have active slots
  const availableDates = savedSlots
    .filter((slot) => slot.slots.some((s) => s.isActive))
    .map((s) => new Date(s.date));

  // ✅ Disable all past days + inactive days
  const disabledDays = [
    { before: new Date() },
    (date: Date) =>
      !availableDates.some((d) => d.toDateString() === date.toDateString()),
  ];

  // ✅ Handle date selection
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (!date) return;

    const matchingSlot = savedSlots.find(
      (slot) => new Date(slot.date).toDateString() === date.toDateString()
    );

    if (matchingSlot) {
      const active = matchingSlot.slots.filter((s) => s.isActive);
      setActiveSlots(active);
    } else {
      setActiveSlots([]);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      <h2 className="text-xl font-semibold text-gray-800">
        Select Available Date
      </h2>

      {/* 🗓 Toggle between Day / Month mode (optional) */}
      <div className="flex gap-2 mb-4">
        <button
          className={`px-3 py-1 rounded-md border ${
            selectionType === "day"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
          onClick={() => setSelectionType("day")}
        >
          By Day
        </button>
        <button
          className={`px-3 py-1 rounded-md border ${
            selectionType === "month"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
          onClick={() => setSelectionType("month")}
        >
          By Month
        </button>
      </div>

      {/* 📅 Day Selection */}
      {selectionType === "day" && (
        <DayPicker
          mode="single"
          selected={selectedDate}
          onSelect={handleDateSelect}
          disabled={disabledDays}
          modifiersClassNames={{
            selected: "bg-blue-500 text-white",
            disabled: "opacity-40 cursor-not-allowed",
          }}
        />
      )}

      {/* 📆 Month Selection */}
      {selectionType === "month" && (
        <DayPicker
          mode="single"
          captionLayout="dropdown"
          selected={selectedMultipleDates[0]}
          onSelect={(date) => {
            if (!date) return;
            const year = date.getFullYear();
            const month = date.getMonth();
            const today = new Date();

            const validDates: Date[] = [];
            const d = new Date(year, month, 1);

            while (d.getMonth() === month) {
              if (
                d >= today &&
                !disabledDays.some(
                  (dd) =>
                    dd instanceof Function &&
                    dd(d) === true
                )
              ) {
                validDates.push(new Date(d));
              }
              d.setDate(d.getDate() + 1);
            }

            setSelectedMultipleDates(validDates);
          }}
          showOutsideDays
          disabled={[{ before: new Date() }]}
        />
      )}

      {/* 🕐 Available Slots */}
      <div className="mt-4 w-full text-center">
        {selectedDate && activeSlots.length > 0 ? (
          <>
            <h3 className="text-lg font-medium text-gray-700">
              Available Slots for {selectedDate.toDateString()}
            </h3>
            <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {activeSlots.map((slot, index) => (
                <button
                  key={index}
                  className="bg-green-500 text-white rounded-xl px-4 py-2 hover:bg-green-600 transition"
                >
                  {slot.time}
                </button>
              ))}
            </div>
          </>
        ) : selectedDate ? (
          <p className="text-gray-500">
            No active slots available for this date.
          </p>
        ) : (
          <p className="text-gray-400">Please select a date to view slots.</p>
        )}
      </div>
    </div>
  );
}
