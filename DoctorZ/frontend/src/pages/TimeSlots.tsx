
// import React, { useState, useEffect } from "react";
// import { DayPicker } from "react-day-picker";
// import "react-day-picker/dist/style.css";
// import api from "../Services/mainApi";
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
//   const [isLoading, setIsLoading] = useState(false);
//   // Pagination
// const [currentPage, setCurrentPage] = useState(1);
// const slotsPerPage = 6;

// const totalPages = Math.ceil(savedSlots.length / slotsPerPage);
// const startIndex = (currentPage - 1) * slotsPerPage;
// const currentSlots = savedSlots.slice(startIndex, startIndex + slotsPerPage);

// const handlePageChange = (page: number) => {
//   if (page >= 1 && page <= totalPages) {
//     setCurrentPage(page);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }
// };

//   const doctorId = drId;

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

//   const disabledDates = savedSlots.map((s) => new Date(s.date));

//   const handleMonthSelect = (selected: Date[] | undefined) => {
//     if (!selected) return;
//     const firstDate = selected[0];
//     const year = firstDate.getFullYear();
//     const month = firstDate.getMonth();
//     const today = new Date();

//     const dates: Date[] = [];
//     const d = new Date(year, month, 1);

//     while (d.getMonth() === month) {
//       if (d >= today && !disabledDates.some((dd) => dd.toDateString() === d.toDateString())) {
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
//         : selectedMultipleDates.map((d) => d.toISOString());

//     if (!dates.length) {
//       alert("Please select at least one date");
//       return;
//     }
//     if (!workingHours.start || !workingHours.end) {
//       alert("Please enter working hours");
//       return;
//     }

//     const payload = { doctorId, dates, workingHours };
//     setIsLoading(true);

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
//     } catch (err: unknown) {
//       console.error(err);
//       alert("Server error");
//     } finally {
//       setIsLoading(false);
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

//   const formatTime = (timeString: string) => {
//     const [hours, minutes] = timeString.split(":");
//     const hour = parseInt(hours);
//     const ampm = hour >= 12 ? "PM" : "AM";
//     const formattedHour = hour % 12 || 12;
//     return `${formattedHour}:${minutes} ${ampm}`;
//   };

//   return (
//     <div className="max-w-7xl ml-1 mt-6 px-4 sm:px-6 lg:px-8 pb-12">
//       {/* Header */}
//       <div className="text-center mb-8">
//         <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
//           Availability Management
//         </h1>
//         <p className="text-gray-600 text-sm sm:text-base">
//           Manage your appointment slots and working hours
//         </p>
//       </div>

//       {/* Step 1 */}
//       {step === 1 && (
//         <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 border border-gray-100">
//           <div className="text-center mb-8">
//             <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
//               <span className="text-xl sm:text-2xl text-blue-600 font-bold">1</span>
//             </div>
//             <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
//               Select Availability Type
//             </h2>
//             <p className="text-gray-500 text-sm sm:text-base">
//               Choose how you want to set your availability
//             </p>
//           </div>

//           <div className="grid grid-cols-1 gap-5">
//             {[
//               { type: "single", color: "blue", label: "Single Day", desc: "Set availability for a specific date" },
//               { type: "multiple", color: "green", label: "Multiple Days", desc: "Select multiple specific dates" },
//               { type: "month", color: "purple", label: "Full Month", desc: "Set availability for an entire month" },
//             ].map(({ type, color, label, desc }) => (
//               <button
//                 key={type}
//                 onClick={() => handleSelectionType(type as SelectionType)}
//                 className={`group p-5 bg-white border-2 border-gray-200 rounded-xl hover:border-${color}-500 hover:shadow-md transition-all text-left`}
//               >
//                 <div className={`w-12 h-12 bg-${color}-50 rounded-lg flex items-center justify-center mb-3 group-hover:bg-${color}-100`}>
//                   <svg
//                     className={`w-6 h-6 text-${color}-600`}
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                   </svg>
//                 </div>
//                 <h3 className="font-semibold text-gray-800 mb-1">{label}</h3>
//                 <p className="text-sm text-gray-500">{desc}</p>
//               </button>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Step 2 */}
//       {step === 2 && (
//         <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 border border-gray-100 mt-6">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-3 sm:space-y-0">
//             <div className="flex items-center space-x-3">
//               <button
//                 onClick={() => {
//                   setStep(1);
//                   setSelectionType("");
//                 }}
//                 className="flex items-center text-gray-500 hover:text-gray-700 transition"
//               >
//                 <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                 </svg>
//                 Back
//               </button>
//               <div className="flex items-center">
//                 <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-2">
//                   <span className="text-white text-sm font-bold">2</span>
//                 </div>
//                 <h2 className="text-lg sm:text-2xl font-semibold text-gray-800">
//                   Select Dates & Hours
//                 </h2>
//               </div>
//             </div>
//             <div className="text-xs sm:text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full self-start sm:self-auto">
//               {selectionType === "single" && "Single Day"}
//               {selectionType === "multiple" && "Multiple Days"}
//               {selectionType === "month" && "Full Month"}
//             </div>
//           </div>

//           <div className="grid grid-cols-1  lg:grid-cols-2 gap-8">
//             {/* Calendar */}
//             <div className="bg-gray-50 rounded-xl p-5 sm:p-6 overflow-x-auto">
//               <h3 className="font-semibold text-gray-700 mb-3 sm:mb-4">Date Selection</h3>
//               <div className="flex justify-center">
//                 {selectionType === "single" && (
//                   <DayPicker
//                     mode="single"
//                     selected={selectedSingleDate}
//                     onSelect={setSelectedSingleDate}
//                     showOutsideDays
//                     className="border-0"
//                     disabled={[{ before: new Date() }, ...disabledDates]}
//                   />
//                 )}
//                 {selectionType === "multiple" && (
//                   <DayPicker
//                     mode="multiple"
//                     selected={selectedMultipleDates}
//                     onSelect={(dates) => setSelectedMultipleDates(dates || [])}
//                     showOutsideDays
//                     className="border-0"
//                     disabled={[{ before: new Date() }, ...disabledDates]}
//                   />
//                 )}
//                 {selectionType === "month" && (
//                   <DayPicker
//                     mode="multiple"
//                     selected={selectedMultipleDates}
//                     onSelect={handleMonthSelect}
//                     captionLayout="dropdown"
//                     showOutsideDays
//                     className="border-0"
//                     disabled={[{ before: new Date() }, ...disabledDates]}
//                   />
//                 )}
//               </div>
//             </div>

//             {/* Working Hours */}
//             <div className="space-y-6">
//               <div className="bg-gray-50 rounded-xl p-5 sm:p-6">
//                 <h3 className="font-semibold text-gray-700 mb-4">Working Hours</h3>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
//                     <input
//                       type="time"
//                       className="w-full p-2.5 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       value={workingHours.start}
//                       onChange={(e) => setWorkingHours({ ...workingHours, start: e.target.value })}
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
//                     <input
//                       type="time"
//                       className="w-full p-2.5 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       value={workingHours.end}
//                       onChange={(e) => setWorkingHours({ ...workingHours, end: e.target.value })}
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Selected Dates Preview */}
//               <div className="bg-gray-50 rounded-xl p-5 sm:p-6">
//                 <h3 className="font-semibold text-gray-700 mb-3">Selected Dates</h3>
//                 <div className="max-h-32 overflow-y-auto text-sm">
//                   {selectionType === "single" && selectedSingleDate ? (
//                     <div className="bg-white p-2 rounded border text-gray-600">
//                       {selectedSingleDate.toDateString()}
//                     </div>
//                   ) : selectionType !== "single" && selectedMultipleDates.length > 0 ? (
//                     <>
//                       {selectedMultipleDates.slice(0, 5).map((date, idx) => (
//                         <div key={idx} className="bg-white p-2 rounded border mb-1 text-gray-600">
//                           {date.toDateString()}
//                         </div>
//                       ))}
//                       {selectedMultipleDates.length > 5 && (
//                         <p className="text-gray-500 text-center text-xs">
//                           +{selectedMultipleDates.length - 5} more dates
//                         </p>
//                       )}
//                     </>
//                   ) : (
//                     <p className="text-gray-400 text-center py-2">No dates selected</p>
//                   )}
//                 </div>
//               </div>

//               <button
//                 onClick={handleSave}
//                 disabled={isLoading}
//                 className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//               >
//                 {isLoading ? (
//                   <>
//                     <svg
//                       className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                     >
//                       <circle
//                         className="opacity-25"
//                         cx="12"
//                         cy="12"
//                         r="10"
//                         stroke="currentColor"
//                         strokeWidth="4"
//                       ></circle>
//                       <path
//                         className="opacity-75"
//                         fill="currentColor"
//                         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 
// 3.042 1.135 5.824 3 7.938l3-2.647z"
//                       ></path>
//                     </svg>
//                     Creating Slots...
//                   </>
//                 ) : (
//                   "Save Availability"
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Saved Slots */}
//      {/* Saved Slots */}
// {/* Saved Slots with Centered Pagination */}
// {savedSlots.length > 0 && (
//   <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 border border-gray-100 mt-8">
//     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-3 sm:space-y-0">
//       <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
//         Managed Availability
//       </h2>
//       <span className="bg-blue-100 text-blue-800 text-xs sm:text-sm font-medium px-3 py-1 rounded-full self-start sm:self-auto">
//         {savedSlots.length} date{savedSlots.length !== 1 ? "s" : ""}
//       </span>
//     </div>

//     {/* Cards */}
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
//       {currentSlots.map((slotItem) => (
//         <div
//           key={slotItem._id}
//           className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition"
//         >
//           <div className="flex items-center justify-between mb-3">
//             <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
//               {new Date(slotItem.date).toLocaleDateString("en-US", {
//                 weekday: "short",
//                 year: "numeric",
//                 month: "short",
//                 day: "numeric",
//               })}
//             </h3>
//             <span
//               className={`text-xs font-medium px-2 py-1 rounded-full ${
//                 slotItem.slots.filter((s) => s.isActive).length > 0
//                   ? "bg-green-100 text-green-800"
//                   : "bg-gray-100 text-gray-800"
//               }`}
//             >
//               {slotItem.slots.filter((s) => s.isActive).length} active
//             </span>
//           </div>

//           <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
//             {slotItem.slots.map((s) => (
//               <button
//                 key={s.time}
//                 onClick={() => toggleSlot(slotItem._id, s.time, !s.isActive)}
//                 className={`p-2 rounded-lg text-xs font-medium transition-all duration-200 ${
//                   s.isActive
//                     ? "bg-green-500 hover:bg-green-600 text-white shadow-sm"
//                     : "bg-gray-100 hover:bg-gray-200 text-gray-600"
//                 }`}
//               >
//                 {formatTime(s.time)}
//               </button>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>

//     {/* Pagination Bottom Center */}
//     {totalPages > 1 && (
//       <div className="flex justify-center items-center mt-8 space-x-2">
//         {/* Prev */}
//         <button
//           onClick={() => handlePageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//           className="px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100 text-sm disabled:opacity-50"
//         >
//           ←
//         </button>

//         {/* Page Numbers */}
//         {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
//           <button
//             key={num}
//             onClick={() => handlePageChange(num)}
//             className={`w-8 h-8 rounded-md text-sm font-medium ${
//               num === currentPage
//                 ? "bg-blue-600 text-white"
//                 : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//             }`}
//           >
//             {num}
//           </button>
//         ))}

//         {/* Next */}
//         <button
//           onClick={() => handlePageChange(currentPage + 1)}
//           disabled={currentPage === totalPages}
//           className="px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100 text-sm disabled:opacity-50"
//         >
//           →
//         </button>
//       </div>
//     )}
//   </div>
// )}

//     </div>
//   );
// };

// export default TimeSlots;


import React, { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import api from "../Services/mainApi";
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
  const [isLoading, setIsLoading] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const slotsPerPage = 6;
  const totalPages = Math.ceil(savedSlots.length / slotsPerPage);
  const startIndex = (currentPage - 1) * slotsPerPage;
  const currentSlots = savedSlots.slice(startIndex, startIndex + slotsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const doctorId = drId;

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
      if (d >= today && !disabledDates.some((dd) => dd.toDateString() === d.toDateString())) {
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

    if (!dates.length) {
      alert("Please select at least one date");
      return;
    }
    if (!workingHours.start || !workingHours.end) {
      alert("Please enter working hours");
      return;
    }

    const payload = { doctorId, dates, workingHours };
    setIsLoading(true);

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
      alert("Server error");
    } finally {
      setIsLoading(false);
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

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
          Availability Management
        </h1>
        <p className="text-gray-600 text-sm sm:text-base">
          Manage your appointment slots and working hours
        </p>
      </div>

      {/* Step 1 */}
      {step === 1 && (
        <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-8 border border-gray-100">
          <div className="text-center mb-8">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-xl sm:text-2xl text-blue-600 font-bold">1</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
              Select Availability Type
            </h2>
            <p className="text-gray-500 text-sm sm:text-base">
              Choose how you want to set your availability
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { type: "single", color: "blue", label: "Single Day", desc: "Set for one date" },
              { type: "multiple", color: "green", label: "Multiple Days", desc: "Pick specific dates" },
              { type: "month", color: "purple", label: "Full Month", desc: "Set for entire month" },
            ].map(({ type, color, label, desc }) => (
              <button
                key={type}
                onClick={() => handleSelectionType(type as SelectionType)}
                className={`group p-5 bg-white border-2 border-gray-200 rounded-xl hover:border-${color}-500 hover:shadow-md transition-all text-left`}
              >
                <div
                  className={`w-12 h-12 bg-${color}-50 rounded-lg flex items-center justify-center mb-3 group-hover:bg-${color}-100`}
                >
                  <svg
                    className={`w-6 h-6 text-${color}-600`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">{label}</h3>
                <p className="text-sm text-gray-500">{desc}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-8 border border-gray-100 mt-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => {
                  setStep(1);
                  setSelectionType("");
                }}
                className="flex items-center text-gray-500 hover:text-gray-700 transition"
              >
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-2">
                  <span className="text-white text-sm font-bold">2</span>
                </div>
                <h2 className="text-lg sm:text-2xl font-semibold text-gray-800">
                  Select Dates & Hours
                </h2>
              </div>
            </div>

            <div className="text-xs sm:text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full mt-3 sm:mt-0">
              {selectionType === "single" && "Single Day"}
              {selectionType === "multiple" && "Multiple Days"}
              {selectionType === "month" && "Full Month"}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Calendar */}
            <div className="bg-gray-50 rounded-xl p-5 overflow-x-auto">
              <h3 className="font-semibold text-gray-700 mb-4">Date Selection</h3>
              <div className="flex justify-center">
                {selectionType === "single" && (
                  <DayPicker
                    mode="single"
                    selected={selectedSingleDate}
                    onSelect={setSelectedSingleDate}
                    showOutsideDays
                    className="border-0"
                    disabled={[{ before: new Date() }, ...disabledDates]}
                  />
                )}
                {selectionType === "multiple" && (
                  <DayPicker
                    mode="multiple"
                    selected={selectedMultipleDates}
                    onSelect={(dates) => setSelectedMultipleDates(dates || [])}
                    showOutsideDays
                    className="border-0"
                    disabled={[{ before: new Date() }, ...disabledDates]}
                  />
                )}
                {selectionType === "month" && (
                  <DayPicker
                    mode="multiple"
                    selected={selectedMultipleDates}
                    onSelect={handleMonthSelect}
                    captionLayout="dropdown"
                    showOutsideDays
                    className="border-0"
                    disabled={[{ before: new Date() }, ...disabledDates]}
                  />
                )}
              </div>
            </div>

            {/* Working Hours + Preview */}
            <div className="flex flex-col gap-6">
              <div className="bg-gray-50 rounded-xl p-5">
                <h3 className="font-semibold text-gray-700 mb-4">Working Hours</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Time
                    </label>
                    <input
                      type="time"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={workingHours.start}
                      onChange={(e) =>
                        setWorkingHours({ ...workingHours, start: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Time
                    </label>
                    <input
                      type="time"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={workingHours.end}
                      onChange={(e) =>
                        setWorkingHours({ ...workingHours, end: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Selected Dates Preview */}
              <div className="bg-gray-50 rounded-xl p-5">
                <h3 className="font-semibold text-gray-700 mb-3">Selected Dates</h3>
                <div className="max-h-32 overflow-y-auto text-sm">
                  {selectionType === "single" && selectedSingleDate ? (
                    <div className="bg-white p-2 rounded border text-gray-600">
                      {selectedSingleDate.toDateString()}
                    </div>
                  ) : selectionType !== "single" && selectedMultipleDates.length > 0 ? (
                    <>
                      {selectedMultipleDates.slice(0, 5).map((date, idx) => (
                        <div
                          key={idx}
                          className="bg-white p-2 rounded border mb-1 text-gray-600"
                        >
                          {date.toDateString()}
                        </div>
                      ))}
                      {selectedMultipleDates.length > 5 && (
                        <p className="text-gray-500 text-center text-xs">
                          +{selectedMultipleDates.length - 5} more dates
                        </p>
                      )}
                    </>
                  ) : (
                    <p className="text-gray-400 text-center py-2">No dates selected</p>
                  )}
                </div>
              </div>

              {/* Save Button */}
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50 flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 
5.291A7.962 7.962 0 014 12H0c0 
3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating Slots...
                  </>
                ) : (
                  "Save Availability"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Saved Slots */}
      {savedSlots.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-8 border border-gray-100 mt-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
              Managed Availability
            </h2>
            <span className="bg-blue-100 text-blue-800 text-xs sm:text-sm font-medium px-3 py-1 rounded-full mt-2 sm:mt-0">
              {savedSlots.length} date{savedSlots.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {currentSlots.map((slotItem) => (
              <div
                key={slotItem._id}
                className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
                    {new Date(slotItem.date).toLocaleDateString("en-US", {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </h3>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                      slotItem.slots.filter((s) => s.isActive).length > 0
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {slotItem.slots.filter((s) => s.isActive).length} active
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {slotItem.slots.map((s) => (
                    <button
                      key={s.time}
                      onClick={() => toggleSlot(slotItem._id, s.time, !s.isActive)}
                      className={`p-2 rounded-lg text-xs font-medium transition-all ${
                        s.isActive
                          ? "bg-green-500 hover:bg-green-600 text-white shadow-sm"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                      }`}
                    >
                      {formatTime(s.time)}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-8 space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100 text-sm disabled:opacity-50"
              >
                ←
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  onClick={() => handlePageChange(num)}
                  className={`w-8 h-8 rounded-md text-sm font-medium ${
                    num === currentPage
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {num}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100 text-sm disabled:opacity-50"
              >
                →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TimeSlots;
