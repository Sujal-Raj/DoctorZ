// import React, { useState, useEffect } from "react";
// import { DayPicker } from "react-day-picker";
// import "react-day-picker/dist/style.css";
// import api from "../api/client";
// import { useParams } from "react-router-dom";

// type SelectionType = "single" | "multiple" | "month";

// interface WorkingHours {
//   start: string;
//   end: string;
// }

// interface Slot {
//   time: string;
//   isActive: boolean;
// }

// interface SavedSlot {
//   _id: string;
//   date: string;
//   slots: Slot[];
// }

// interface CreateSlotResponse {
//   success: boolean;
//   createdDates: string[];
//   alreadyExistDates: string[];
//   message: string;
// }

// const TimeSlots: React.FC = () => {
//   const { drId } = useParams();
//   const [step, setStep] = useState<number>(1);
//   const [selectionType, setSelectionType] = useState<SelectionType | "">("");
//   const [selectedSingleDate, setSelectedSingleDate] = useState<Date | undefined>(undefined);
//   const [selectedMultipleDates, setSelectedMultipleDates] = useState<Date[]>([]);
//   const [workingHours, setWorkingHours] = useState<WorkingHours>({ start: "", end: "" });
//   const [savedSlots, setSavedSlots] = useState<SavedSlot[]>([]);
//   const doctorId = drId;

//   // Fetch saved slots
//   const fetchSavedSlots = async () => {
//     if (!doctorId) return;
//     try {
//       const res = await api.get<SavedSlot[]>(`/api/availability/getTimeSlots/${doctorId}`);
//       setSavedSlots(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchSavedSlots();
//   }, [doctorId]);

//   const handleSelectionType = (type: SelectionType) => {
//     setSelectionType(type);
//     setStep(2);
//     setSelectedSingleDate(undefined);
//     setSelectedMultipleDates([]);
//   };

//   const disabledDates = savedSlots.map(s => new Date(s.date));

//   const handleMonthSelect = (selected: Date[] | undefined) => {
//     if (!selected) return;

//     const firstDate = selected[0];
//     const year = firstDate.getFullYear();
//     const month = firstDate.getMonth();
//     const today = new Date();

//     const dates: Date[] = [];
//     const d = new Date(year, month, 1);

//     while (d.getMonth() === month) {
//       if (d >= today && !disabledDates.some(dd => dd.toDateString() === d.toDateString())) {
//         dates.push(new Date(d));
//       }
//       d.setDate(d.getDate() + 1);
//     }

//     setSelectedMultipleDates(dates);
//   };

//   const handleSave = async () => {
//     const dates =
//       selectionType === "single"
//         ? selectedSingleDate
//           ? [selectedSingleDate.toISOString()]
//           : []
//         : selectedMultipleDates.map(d => d.toISOString());

//     if (!dates.length) return alert("Please select at least one date");
//     if (!workingHours.start || !workingHours.end) return alert("Enter working hours");

//     const payload = { doctorId, dates, workingHours };

//     try {
//       const res = await api.post<CreateSlotResponse>("/api/availability/createTimeSlot", payload);
//       const data = res.data;

//       if (data.createdDates.length > 0) {
//         alert(`Slots created for: ${data.createdDates.join(", ")}`);
//       }

//       if (data.alreadyExistDates.length > 0) {
//         alert(`Slots already exist for: ${data.alreadyExistDates.join(", ")}`);
//       }

//       setStep(1);
//       setSelectionType("");
//       setSelectedSingleDate(undefined);
//       setSelectedMultipleDates([]);
//       setWorkingHours({ start: "", end: "" });
//       fetchSavedSlots();
//     } catch (err: any) {
//       console.error(err);
//       alert(err.response?.data?.error || "Server error");
//     }
//   };

//   const toggleSlot = async (slotId: string, time: string, isActive: boolean) => {
//     try {
//       await api.patch(`/api/availability/updateSlot/${slotId}`, { time, isActive });
//       fetchSavedSlots();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto mt-16 p-4">
//       {/* Step 1 */}
//       {step === 1 && (
//         <div className="bg-gray-900 text-white p-8 rounded-xl shadow-lg text-center">
//           <h2 className="text-2xl font-bold text-blue-500 mb-6">Select Availability Type</h2>
//           <div className="flex flex-col sm:flex-row justify-center gap-4">
//             <button
//               className="bg-purple-800 hover:bg-blue-600 px-6 py-3 rounded-lg transition"
//               onClick={() => handleSelectionType("single")}
//             >
//               Single Day
//             </button>
//             <button
//               className="bg-purple-800 hover:bg-blue-600 px-6 py-3 rounded-lg transition"
//               onClick={() => handleSelectionType("multiple")}
//             >
//               Multiple Days
//             </button>
//             <button
//               className="bg-purple-800 hover:bg-blue-600 px-6 py-3 rounded-lg transition"
//               onClick={() => handleSelectionType("month")}
//             >
//               Full Month
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Step 2 */}
//       {step === 2 && (
//         <div className="bg-gray-900 text-white p-8 rounded-xl shadow-lg mt-6">
//           <h2 className="text-2xl font-bold text-blue-500 mb-6">Select Dates</h2>
//           <div className="mb-6">
//             {selectionType === "single" && (
//               <DayPicker
//                 mode="single"
//                 selected={selectedSingleDate}
//                 onSelect={setSelectedSingleDate}
//                 modifiersClassNames={{ selected: "bg-blue-500 text-white rounded-full" }}
//                 showOutsideDays
//                 disabled={[{ before: new Date() }, ...disabledDates]}
//               />
//             )}
//             {selectionType === "multiple" && (
//               <DayPicker
//                 mode="multiple"
//                 selected={selectedMultipleDates}
//                 onSelect={(dates) => setSelectedMultipleDates(dates || [])}
//                 modifiersClassNames={{ selected: "bg-blue-500 text-white rounded-full" }}
//                 showOutsideDays
//                 disabled={[{ before: new Date() }, ...disabledDates]}
//               />
//             )}
//             {selectionType === "month" && (
//               <DayPicker
//                 mode="multiple"
//                 selected={selectedMultipleDates}
//                 onSelect={handleMonthSelect}
//                 captionLayout="dropdown"
//                 disabled={[{ before: new Date() }, ...disabledDates]}
//               />
//             )}
//           </div>

//           {/* Working Hours */}
//           <h3 className="text-xl font-semibold text-blue-400 mb-4">Enter Working Hours</h3>
//           <div className="flex flex-col sm:flex-row gap-4 mb-4">
//             <div className="flex flex-col flex-1">
//               <label className="mb-2">Start Time:</label>
//               <input
//                 type="time"
//                 className="p-2 rounded-md text-black"
//                 value={workingHours.start}
//                 onChange={(e) => setWorkingHours({ ...workingHours, start: e.target.value })}
//               />
//             </div>
//             <div className="flex flex-col flex-1">
//               <label className="mb-2">End Time:</label>
//               <input
//                 type="time"
//                 className="p-2 rounded-md text-black"
//                 value={workingHours.end}
//                 onChange={(e) => setWorkingHours({ ...workingHours, end: e.target.value })}
//               />
//             </div>
//           </div>

//           <button
//             className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-lg transition"
//             onClick={handleSave}
//           >
//             Save Availability
//           </button>
//         </div>
//       )}

//       {/* Saved Slots */}
//       {savedSlots.length > 0 && (
//         <div className="bg-gray-800 text-white p-6 rounded-xl shadow-lg mt-10">
//           <h2 className="text-2xl font-bold text-blue-400 mb-4">Saved Slots</h2>
//           {savedSlots.map((slotItem) => (
//             <div key={slotItem._id} className="mb-4">
//               <p className="mb-2">{new Date(slotItem.date).toDateString()}</p>
//               <div className="flex flex-wrap gap-2">
//                 {slotItem.slots.map((s) => (
//                   <button
//                     key={s.time}
//                     className={`px-3 py-1 rounded-full text-sm ${
//                       s.isActive ? "bg-green-500 text-white" : "bg-gray-600 text-gray-300"
//                     }`}
//                     onClick={() => toggleSlot(slotItem._id, s.time, !s.isActive)}
//                   >
//                     {s.time}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default TimeSlots;




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
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.error || "Server error");
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
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      {/* Step 1 */}
      {step === 1 && (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-blue-600 mb-6">Select Availability Type</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg text-white transition"
              onClick={() => handleSelectionType("single")}
            >
              Single Day
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg text-white transition"
              onClick={() => handleSelectionType("multiple")}
            >
              Multiple Days
            </button>
            <button
              className="bg-purple-500 hover:bg-purple-600 px-6 py-3 rounded-lg text-white transition"
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
          <h2 className="text-2xl font-bold text-blue-600 mb-6">Select Dates</h2>
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

          {/* Working Hours */}
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Enter Working Hours</h3>
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="flex flex-col flex-1">
              <label className="mb-2 text-sm text-gray-600">Start Time:</label>
              <input
                type="time"
                className="p-2 rounded-md border border-gray-300"
                value={workingHours.start}
                onChange={(e) => setWorkingHours({ ...workingHours, start: e.target.value })}
              />
            </div>
            <div className="flex flex-col flex-1">
              <label className="mb-2 text-sm text-gray-600">End Time:</label>
              <input
                type="time"
                className="p-2 rounded-md border border-gray-300"
                value={workingHours.end}
                onChange={(e) => setWorkingHours({ ...workingHours, end: e.target.value })}
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
      {savedSlots.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Saved Slots</h2>
          {savedSlots.map((slotItem) => (
            <div key={slotItem._id} className="mb-6 border rounded-lg p-4 bg-gray-50">
              <p className="mb-2 font-semibold text-gray-800">
                {new Date(slotItem.date).toDateString()}
              </p>
              <div className="flex flex-wrap gap-2">
                {slotItem.slots.map((s) => (
                  <button
                    key={s.time}
                    className={`px-4 py-2 rounded-lg text-sm ${
                      s.isActive
                        ? "bg-green-500 text-white"
                        : "bg-gray-300 text-gray-700"
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



