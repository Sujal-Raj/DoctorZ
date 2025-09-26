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

const TimeSlots: React.FC = () => {
  const {drId}=useParams();
  console.log("Doctor ID from params in TimeSlots:", drId);
  const [step, setStep] = useState<number>(1);
  const [selectionType, setSelectionType] = useState<SelectionType | "">("");
  const [selectedSingleDate, setSelectedSingleDate] = useState<Date | undefined>(undefined);
  const [selectedMultipleDates, setSelectedMultipleDates] = useState<Date[]>([]);
  const [workingHours, setWorkingHours] = useState<WorkingHours>({ start: "", end: "" });
  const [savedSlots, setSavedSlots] = useState<SavedSlot[]>([]);
  const doctorId = drId;

  // Fetch saved slots
  const fetchSavedSlots = async () => {
    try {
      const res = await api.get(`/api/availability/getTimeSlots/${doctorId}`);
      setSavedSlots(res.data as SavedSlot[]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSavedSlots();
  }, []);

  const handleSelectionType = (type: SelectionType) => {
    setSelectionType(type);
    setStep(2);//calender
    setSelectedSingleDate(undefined);
    setSelectedMultipleDates([]);
  };


const handleMonthSelect = (selected: Date[] | undefined) => {
  if (!selected) return;

  const firstDate = selected[0]; // month ke liye user ek date select karega
  const year = firstDate.getFullYear();
  const month = firstDate.getMonth();
  const today = new Date();

  const dates: Date[] = [];
  const d = new Date(year, month, 1); // month ka pehla din

  while (d.getMonth() === month) {
    if (d >= today) dates.push(new Date(d));
    d.setDate(d.getDate() + 1);
  }

  setSelectedMultipleDates(dates); // multiple dates set kar do
};




  const handleSave = async () => {
    const dates =
      selectionType === "single"
        ? selectedSingleDate
          ? [selectedSingleDate.toISOString()]
          : []
        : selectedMultipleDates.map((d) => d.toISOString());

    if (!dates.length) return alert("Please select at least one date");
    if (!workingHours.start || !workingHours.end) return alert("Enter working hours");

    const payload = { doctorId, dates, workingHours };

    try {
      await api.post("/api/availability/createTimeSlot", payload);
      alert("Availability saved!");
      setStep(1);
      setSelectionType("");
      setSelectedSingleDate(undefined);
      setSelectedMultipleDates([]);
      setWorkingHours({ start: "", end: "" });
      fetchSavedSlots(); // refresh saved slots
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.error || "Server error");
    }
  };

  // Toggle slot active/inactive
  const toggleSlot = async (slotId: string, time: string, isActive: boolean) => {
    try {
      await api.patch(`/api/availability/updateSlot/${slotId}`, { time, isActive });
      fetchSavedSlots(); // refresh after toggle
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-16 p-4">
      {/* Step 1 */}
      {step === 1 && (
        <div className="bg-gray-900 text-white p-8 rounded-xl shadow-lg text-center">
          <h2 className="text-2xl font-bold text-blue-500 mb-6">Select Availability Type</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              className="bg-purple-800 hover:bg-blue-600 px-6 py-3 rounded-lg transition"
              onClick={() => handleSelectionType("single")}
            >
              Single Day
            </button>
            <button
              className="bg-purple-800 hover:bg-blue-600 px-6 py-3 rounded-lg transition"
              onClick={() => handleSelectionType("multiple")}
            >
              Multiple Days
            </button>
            <button
              className="bg-purple-800 hover:bg-blue-600 px-6 py-3 rounded-lg transition"
              onClick={() => handleSelectionType("month")}
            >
              Full Month
            </button>
          </div>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div className="bg-gray-900 text-white p-8 rounded-xl shadow-lg mt-6">
          <h2 className="text-2xl font-bold text-blue-500 mb-6">Select Dates</h2>
          <div className="mb-6">
            {selectionType === "single" && (
              <DayPicker
                mode="single"
                selected={selectedSingleDate}
                onSelect={(date) => setSelectedSingleDate(date)}
                modifiersClassNames={{ selected: "bg-blue-500 text-white rounded-full" }}
                showOutsideDays
                disabled={{ before: new Date() }}
              />
            )}
            {selectionType === "multiple" && (
              <DayPicker
                mode="multiple"
                selected={selectedMultipleDates}
                onSelect={(dates) => setSelectedMultipleDates(dates || [])}
                modifiersClassNames={{ selected: "bg-blue-500 text-white rounded-full" }}
                showOutsideDays
                disabled={{ before: new Date() }}
              />
            )}
            {selectionType === "month" && (
              <DayPicker
                mode="multiple"
                 selected={selectedMultipleDates as Date[]}
    onSelect={handleMonthSelect}
                captionLayout="dropdown"
                disabled={{ before: new Date() }}
              />
            )}
          </div>

          {/* Working Hours */}
          <h3 className="text-xl font-semibold text-blue-400 mb-4">Enter Working Hours</h3>
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="flex flex-col flex-1">
              <label className="mb-2">Start Time:</label>
              <input
                type="time"
                className="p-2 rounded-md text-black"
                value={workingHours.start}
                onChange={(e) => setWorkingHours({ ...workingHours, start: e.target.value })}
              />
            </div>
            <div className="flex flex-col flex-1">
              <label className="mb-2">End Time:</label>
              <input
                type="time"
                className="p-2 rounded-md text-black"
                value={workingHours.end}
                onChange={(e) => setWorkingHours({ ...workingHours, end: e.target.value })}
              />
            </div>
          </div>

          <button
            className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-lg transition"
            onClick={handleSave}
          >
            Save Availability
          </button>
        </div>
      )}

      {/* Saved Slots */}
      {savedSlots.length > 0 && (
        <div className="bg-gray-800 text-white p-6 rounded-xl shadow-lg mt-10">
          <h2 className="text-2xl font-bold text-blue-400 mb-4">Saved Slots</h2>
          {savedSlots.map((slotItem) => (
            <div key={slotItem._id} className="mb-4">
              <p className="mb-2">{new Date(slotItem.date).toDateString()}</p>
              <div className="flex flex-wrap gap-2">
                {slotItem.slots.map((s) => (
                  <button
                    key={s.time}
                    className={`px-3 py-1 rounded-full text-sm ${
                      s.isActive ? "bg-green-500 text-white" : "bg-gray-600 text-gray-300"
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
      )}
    </div>
  );
};

export default TimeSlots; 