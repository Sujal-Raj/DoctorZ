
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
  const [currentPage, setCurrentPage] = useState(1);
  const slotsPerPage = 3; // Show 3 slots per page

  const { drId } = useParams();
  const [step, setStep] = useState<number>(1);
  const [selectionType, setSelectionType] = useState<SelectionType | "">("");
  const [selectedSingleDate, setSelectedSingleDate] = useState<
    Date | undefined
  >(undefined);
  const [selectedMultipleDates, setSelectedMultipleDates] = useState<Date[]>(
    []
  );
  const [workingHours, setWorkingHours] = useState<WorkingHours>({
    start: "",
    end: "",
  });
  const [savedSlots, setSavedSlots] = useState<SavedSlot[]>([]);
  const doctorId = drId;

  // Fetch saved slots
  const fetchSavedSlots = async () => {
    if (!doctorId) return;
    try {
      const res = await api.get<SavedSlot[]>(
        `/api/availability/getTimeSlots/${doctorId}`
      );
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

  const disabledDates = savedSlots.map((s) => new Date(s.date));
  


  const handleMonthSelect = (selected: Date[] | undefined) => {
    if (!selected) return;

    const firstDate = selected[0];
    const year = firstDate.getFullYear();
    const month = firstDate.getMonth();
    const today = new Date();

    const dates: Date[] = [];
    const d = new Date(year, month, 1);

    while (d.getMonth() === month) {
      if (
        d >= today &&
        !disabledDates.some((dd) => dd.toDateString() === d.toDateString())
      ) {
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
        : selectedMultipleDates.map((d) => d.toISOString());
 

    if (!dates.length) return alert("Please select at least one date");
    if (!workingHours.start || !workingHours.end)
      return alert("Enter working hours");
    const formatDatePure = (dateStr: any) => {
      // This takes only the date part (before the "T")
      const pureDate = dateStr.split("T")[0];
      const [year, month, day] = pureDate.split("-");
      return `${day}/${month}/${year}`;
    };

    const payload = { doctorId, dates, workingHours };

    try {
      const res = await api.post<CreateSlotResponse>(
        "/api/availability/createTimeSlot",
        payload
      );
      const data = res.data;


      
      if (data.createdDates.length > 0) {
        alert(
          `Slots created for: ${data.createdDates
            .map(formatDatePure)
            .join(", ")}`
        );
      }

      if (data.alreadyExistDates.length > 0) {
        alert(
          `Slots already exist for: ${data.alreadyExistDates
            .map(formatDatePure)
            .join(", ")}`
        );
      }

      setStep(1);
      setSelectionType("");
      setSelectedSingleDate(undefined);
      setSelectedMultipleDates([]);
      setWorkingHours({ start: "", end: "" });
      fetchSavedSlots();
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.error || "Server error");
    }
  };

  const toggleSlot = async (
    slotId: string,
    time: string,
    isActive: boolean
  ) => {
    try {
      await api.patch(`/api/availability/updateSlot/${slotId}`, {
        time,
        isActive,
      });
      fetchSavedSlots();
    } catch (err) {
      console.error(err);
    }
  };
  const totalPages = Math.ceil(savedSlots.length / slotsPerPage);
  const paginatedSlots = savedSlots.slice(
    (currentPage - 1) * slotsPerPage,
    currentPage * slotsPerPage
  );

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      {/* Step 1 */}
      {step === 1 && (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-blue-600 mb-6">
            Select Availability Type
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              className="bg-gray-400 hover:bg-blue-400 px-6 py-3 rounded-lg text-white transition"
              onClick={() => handleSelectionType("single")}
            >
              Single Day
            </button>
            <button
              className=" bg-gray-400 hover:bg-blue-400 not-odd:px-6 py-3 rounded-lg text-white transition"
              onClick={() => handleSelectionType("multiple")}
            >
              Multiple Days
            </button>
            <button
              className="bg-gray-400 hover:bg-blue-400 px-6 py-3 rounded-lg text-white transition"
              onClick={() => handleSelectionType("month")}
            >
              Full Month
            </button>
          </div>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div className="mt-6">
          <h2 className="text-2xl font-bold text-blue-600 mb-6">
            Select Dates
          </h2>
          <div className="mb-6">
            {selectionType === "single" && (
              <DayPicker
                mode="single"
                selected={selectedSingleDate}
                onSelect={setSelectedSingleDate}
                modifiersClassNames={{
                  selected: "bg-blue-500 text-white rounded-full",
                }}
                showOutsideDays
                disabled={[{ before: new Date() }, ...disabledDates]}
              />
            )}
            {selectionType === "multiple" && (
              <DayPicker
                mode="multiple"
                selected={selectedMultipleDates}
                onSelect={(dates) => setSelectedMultipleDates(dates || [])}
                modifiersClassNames={{
                  selected: "bg-blue-500 text-white rounded-full",
                }}
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

          {/* Working Hours */}
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Enter Working Hours
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="flex flex-col flex-1">
              <label className="mb-2 text-sm text-gray-600">Start Time:</label>
              <input
                type="time"
                className="p-2 rounded-md border border-gray-300"
                value={workingHours.start}
                onChange={(e) =>
                  setWorkingHours({ ...workingHours, start: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col flex-1">
              <label className="mb-2 text-sm text-gray-600">End Time:</label>
              <input
                type="time"
                className="p-2 rounded-md border border-gray-300"
                value={workingHours.end}
                onChange={(e) =>
                  setWorkingHours({ ...workingHours, end: e.target.value })
                }
              />
            </div>
          </div>

          <button
            className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-lg text-white transition"
            onClick={handleSave}
          >
            Save Availability
          </button>
        </div>
      )}

      {/* Saved Slots */}

      {savedSlots.length === 0 ? (
        <p className="text-center text-gray-500 mt-6">No saved slots</p>
      ) : (
        paginatedSlots.map((slotItem) => (
          <>
            <div
              key={slotItem._id}
              className="mt-3 bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm"
            >
              <p className="mb-2 font-semibold text-gray-700">
                {new Date(slotItem.date).toDateString()}
              </p>
              <div className="flex flex-wrap gap-2">
                {slotItem.slots.map((s) => (
                  <button
                    key={s.time}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition transform hover:scale-105 ${
                      s.isActive
                        ? "bg-green-500 text-white hover:bg-green-600"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                    onClick={() =>
                      toggleSlot(slotItem._id, s.time, !s.isActive)
                    }
                  >
                    {s.time}
                  </button>
                ))}
              </div>
            </div>
          </>
        ))
      )}

      {totalPages > 1 && (
        <div className="flex justify-center gap-4 mt-6">
          <button
            className={`px-4 py-2 rounded-lg border ${
              currentPage === 1
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-white text-gray-800 hover:bg-gray-100"
            }`}
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            &lt;
          </button>
          <span className="px-3 py-2 rounded-lg bg-gray-100 text-gray-700">
            {currentPage} / {totalPages}
          </span>
          <button
            className={`px-4 py-2 rounded-lg border ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-white text-gray-800 hover:bg-gray-100"
            }`}
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default TimeSlots;
