


import React, { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import api from "../api/client";
import { useParams } from "react-router-dom";

type SelectionType = "single" | "multiple" | "month";

interface WorkingHours {
  start: string;
  end: string;
}

interface Slot {
  time: string;
  isActive: boolean;
}

interface SavedSlot {
  _id: string;
  date: string;
  slots: Slot[];
}

interface CreateSlotResponse {
  success: boolean;
  createdDates: string[];
  alreadyExistDates: string[];
  message: string;
}

const TimeSlots: React.FC = () => {
  const { drId } = useParams();
  const [step, setStep] = useState<number>(1);
  const [selectionType, setSelectionType] = useState<SelectionType | "">("");
  const [selectedSingleDate, setSelectedSingleDate] = useState<Date | undefined>(undefined);
  const [selectedMultipleDates, setSelectedMultipleDates] = useState<Date[]>([]);
  const [workingHours, setWorkingHours] = useState<WorkingHours>({ start: "", end: "" });
  const [savedSlots, setSavedSlots] = useState<SavedSlot[]>([]);
  const doctorId = drId;

  // Fetch saved slots
  const fetchSavedSlots = async () => {
    if (!doctorId) return;
    try {
      const res = await api.get<SavedSlot[]>(`/api/availability/getTimeSlots/${doctorId}`);
      setSavedSlots(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSavedSlots();
  }, [doctorId]);

  const handleSelectionType = (type: SelectionType) => {
    setSelectionType(type);
    setStep(2);
    setSelectedSingleDate(undefined);
    setSelectedMultipleDates([]);
  };

  const disabledDates = savedSlots.map(s => new Date(s.date));

  const handleMonthSelect = (selected: Date[] | undefined) => {
    if (!selected) return;

    const firstDate = selected[0];
    const year = firstDate.getFullYear();
    const month = firstDate.getMonth();
    const today = new Date();

    const dates: Date[] = [];
    const d = new Date(year, month, 1);

    while (d.getMonth() === month) {
      if (d >= today && !disabledDates.some(dd => dd.toDateString() === d.toDateString())) {
        dates.push(new Date(d));
      }
      d.setDate(d.getDate() + 1);
    }

    setSelectedMultipleDates(dates);
  };

  const handleSave = async () => {
    const dates =
      selectionType === "single"
        ? selectedSingleDate
          ? [selectedSingleDate.toISOString()]
          : []
        : selectedMultipleDates.map(d => d.toISOString());

    if (!dates.length) return alert("Please select at least one date");
    if (!workingHours.start || !workingHours.end) return alert("Enter working hours");

    const payload = { doctorId, dates, workingHours };

    try {
      const res = await api.post<CreateSlotResponse>("/api/availability/createTimeSlot", payload);
      const data = res.data;

      if (data.createdDates.length > 0) {
        alert(`Slots created for: ${data.createdDates.join(", ")}`);
      }

      if (data.alreadyExistDates.length > 0) {
        alert(`Slots already exist for: ${data.alreadyExistDates.join(", ")}`);
      }

      setStep(1);
      setSelectionType("");
      setSelectedSingleDate(undefined);
      setSelectedMultipleDates([]);
      setWorkingHours({ start: "", end: "" });
      fetchSavedSlots();
    } catch (err: unknown) {
      console.error(err);
      alert( "Server error");
    }
  };

  const toggleSlot = async (slotId: string, time: string, isActive: boolean) => {
    try {
      await api.patch(`/api/availability/updateSlot/${slotId}`, { time, isActive });
      fetchSavedSlots();
    } catch (err) {
      console.error(err);
    }
  };
return (
  <div className="max-w-4xl mx-auto  p-4">
    {/* Step 1 - Select Type */}
    {step === 1 && (
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Choose Availability Type</h2>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {["single", "multiple", "month"].map((type) => (
            <button
              key={type}
              onClick={() => handleSelectionType(type as SelectionType)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md transition"
            >
              {type === "single"
                ? "Single Day"
                : type === "multiple"
                ? "Multiple Days"
                : "Full Month"}
            </button>
          ))}
        </div>
      </div>
    )}

    {/* Step 2 - Date Picker & Working Hours */}
    {step === 2 && (
      <div className="bg-white p-8 rounded-lg shadow-md mt-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-6">Select Dates</h2>

        {/* Day Picker */}
        <div className="mb-6">
          {selectionType === "single" && (
            <DayPicker
              mode="single"
              selected={selectedSingleDate}
              onSelect={setSelectedSingleDate}
              modifiersClassNames={{ selected: "bg-blue-500 text-white rounded-full" }}
              showOutsideDays
              disabled={[{ before: new Date() }, ...disabledDates]}
            />
          )}
          {selectionType === "multiple" && (
            <DayPicker
              mode="multiple"
              selected={selectedMultipleDates}
              onSelect={(dates) => setSelectedMultipleDates(dates || [])}
              modifiersClassNames={{ selected: "bg-blue-500 text-white rounded-full" }}
              showOutsideDays
              disabled={[{ before: new Date() }, ...disabledDates]}
            />
          )}
          {selectionType === "month" && (
            <DayPicker
              mode="multiple"
              selected={selectedMultipleDates}
              onSelect={handleMonthSelect}
              captionLayout="dropdown"
              disabled={[{ before: new Date() }, ...disabledDates]}
            />
          )}
        </div>

        {/* Working Hours Input */}
        <h3 className="text-lg font-medium text-gray-700 mb-4">Set Working Hours</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block mb-1 text-sm text-gray-600">Start Time:</label>
            <input
              type="time"
              className="w-full border rounded-md px-3 py-2"
              value={workingHours.start}
              onChange={(e) => setWorkingHours({ ...workingHours, start: e.target.value })}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm text-gray-600">End Time:</label>
            <input
              type="time"
              className="w-full border rounded-md px-3 py-2"
              value={workingHours.end}
              onChange={(e) => setWorkingHours({ ...workingHours, end: e.target.value })}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
            onClick={() => {
              setStep(1);
              setSelectionType("");
              setSelectedSingleDate(undefined);
              setSelectedMultipleDates([]);
            }}
          >
            Back
          </button>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
            onClick={handleSave}
          >
            Save Availability
          </button>
        </div>
      </div>
    )}

    {/* Saved Slots */}
    {savedSlots.length > 0 && (
      <div className="bg-white p-6 rounded-lg shadow-md mt-10">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Saved Time Slots</h2>
        <div className="space-y-6">
          {savedSlots.map((slotItem) => (
            <div key={slotItem._id} className="border-b pb-4">
              <p className="text-gray-600 font-medium mb-2">
                {new Date(slotItem.date).toDateString()}
              </p>
              <div className="flex flex-wrap gap-2">
                {slotItem.slots.map((s) => (
                  <button
                    key={s.time}
                    className={`px-3 py-1 rounded-full text-sm transition ${
                      s.isActive
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                    }`}
                    onClick={() => toggleSlot(slotItem._id, s.time, !s.isActive)}
                  >
                    {s.time}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

};

export default TimeSlots;
