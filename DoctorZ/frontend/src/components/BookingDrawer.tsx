// /* eslint-disable @typescript-eslint/no-unused-vars */
// import React, { useEffect, useMemo, useState, useRef } from "react";
// import { X, Video, Phone, ChevronLeft, ChevronRight } from "lucide-react";
// import { formatDayShort, formatDateNumber } from "../utils/date.js";
// import api from "../Services/mainApi.js";
// import { startOfMonth, endOfMonth } from "date-fns";
// import AppointmentFormModal from "./AppointmentFormModal.js";
// import Swal from "sweetalert2";
// import { Helmet } from "react-helmet";

// interface Slot {
//   _id: string;
//   time: string;
//   isActive: boolean;
// }

// interface DoctorForBooking {
//   _id: string;
//   fullName: string;
//   photo?: string;
//   specialization?: string;
//   fees: number;
//   clinicAddress?: string;
// }

// interface Props {
//   doctor: DoctorForBooking | null;
//   open: boolean;
//   onClose: () => void;
//   onBooked?: (bookingInfo: unknown) => void;
// }

// interface SlotsAPIResponse {
//   availableMonths: {
//     [key: string]: Array<{
//       date: string;
//       slots: Slot[];
//     }>;
//   };
// }

// const BookingSidebar: React.FC<Props> = ({
//   doctor,
//   open,
//   onClose,
//   onBooked,
// }) => {
//   const [mode, setMode] = useState<"online" | "offline">("online");
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null);
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const [selectedTime, setSelectedTime] = useState<string | null>(null);
//   const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null); // ✅ stores full slot object
//   const [bookingLoading, setBookingLoading] = useState(false);
//   const [slots, setSlots] = useState<Slot[]>([]);
//   const [currentMonth, setCurrentMonth] = useState(new Date());
//   const [showForm, setShowForm] = useState(false);
//   const [loadingSlots, setLoadingSlots] = useState(false);
//   const sidebarRef = useRef<HTMLDivElement | null>(null);
//   const [availableMonthKeys, setAvailableMonthKeys] = useState<string[]>([]);
//   const [availableDates, setAvailableDates] = useState<string[]>([]);

//   const days = useMemo(() => {
//     const start = startOfMonth(currentMonth);
//     const end = endOfMonth(currentMonth);

//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     const arr: Date[] = [];
//     const d = new Date(start);

//     while (d <= end) {
//       if (d >= today) arr.push(new Date(d));
//       d.setDate(d.getDate() + 1);
//     }

//     return arr;
//   }, [currentMonth]);

//   const formatDate = (date: Date) =>
//     `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
//       2,
//       "0"
//     )}-${String(date.getDate()).padStart(2, "0")}`;

//   useEffect(() => {
//     if (!doctor) return;
//     setMode("online");
//     setSelectedDate(new Date());
//     setSelectedTime(null);
//     setSlots([]);
//     setShowForm(false);
//   }, [doctor]);

//   const monthKey = `${currentMonth.getFullYear()}-${String(
//     currentMonth.getMonth() + 1
//   ).padStart(2, "0")}`;

//   useEffect(() => {
//     const fetchSlots = async () => {
//       if (!doctor || !selectedDate) return;
//       setLoadingSlots(true);

//       try {
//         const res = await api.get<SlotsAPIResponse>(
//           `/api/patient/slots/${doctor._id}`
//         );
//         if (
//           !res.data ||
//           !res.data.availableMonths ||
//           Object.keys(res.data.availableMonths).length === 0
//         ) {
//           setSlots([]);
//           setAvailableMonthKeys([]);
//           setAvailableDates([]);
//           return;
//         }

//         const monthKey = `${selectedDate.getFullYear()}-${String(
//           selectedDate.getMonth() + 1
//         ).padStart(2, "0")}`;
//         const keys = Object.keys(res.data.availableMonths || {}).sort();
//         setAvailableMonthKeys(keys);

//         if (keys.length > 0 && !keys.includes(monthKey)) {
//           const [y, m] = keys[0].split("-");
//           const firstMonth = new Date(Number(y), Number(m) - 1);
//           setCurrentMonth(firstMonth);
//           setSelectedDate(firstMonth);
//         }

//         const monthData = res.data.availableMonths?.[monthKey] ?? [];
//         setAvailableDates(
//           monthData.map((entry: any) => entry.date.slice(0, 10))
//         );

//         const dateEntry = monthData.find(
//           (entry: any) => entry.date.slice(0, 10) === formatDate(selectedDate)
//         );

//         if (!dateEntry && monthData.length > 0) {
//           const firstDate = new Date(monthData[0].date);
//           setSelectedDate(firstDate);
//           return;
//         }

//         setSlots(dateEntry?.slots ?? []);
//       } catch (err) {
//         console.error("Failed to fetch slots", err);
//         setSlots([]);
//       } finally {
//         setLoadingSlots(false);
//       }
//     };

//     fetchSlots();
//   }, [doctor, selectedDate]);

//   const handleBook = async (formData: {
//     name: string;
//     age: number;
//     gender: "Male" | "Female" | "Other";
//     aadhar: string;
//     contact: string;
//   }) => {
//     const token = document.cookie
//       .split("; ")
//       .find((r) => r.startsWith("patientToken="))
//       ?.split("=")[1];
//     const payloadBase64 = token?.split(".")[1];
//     const pay = payloadBase64 ? JSON.parse(atob(payloadBase64)) : null;
//     const userId = pay?.id;
//     if (!token) {
//       Swal.fire({
//         icon: "info",
//         title: "Login Required",
//         text: "Please login to book an appointment.",
//         confirmButtonText: "OK",
//       }).then(() => (window.location.href = "/patient-login"));
//       return;
//     }

//     if (!doctor || !selectedDate || !selectedTime) {
//       Swal.fire({
//         icon: "warning",
//         title: "Incomplete Data",
//         text: "Please select date & time.",
//       });
//       return;
//     }

//     const selectedSlotId = slots.find((s) => s.time === selectedTime)?._id;
//     setBookingLoading(true);

//     const bookingPayload = {
//       doctorId: doctor._id,
//       userId,
//       slot: selectedSlot.time,
//       slotId: selectedSlot._id, // ✅ use actual slotId
//       dateTime: selectedDate.toISOString().slice(0, 10),
//       mode,
//       status: "booked",
//       fees: doctor.fees ?? 0,
//       patient: formData,
//     };

//     try {
//       await api.post("/api/booking/book", bookingPayload);
//       await Swal.fire({
//         icon: "success",
//         title: "Appointment Confirmed!",
//         text: `Your appointment with Dr. ${doctor.fullName} is booked successfully.`,
//       });
//       onBooked?.(bookingPayload);
//       onClose();
//     } catch (err) {
//       console.error("Booking error", err);
//       Swal.fire({
//         icon: "error",
//         title: "Booking Failed",
//         text: "Please try again later.",
//       });
//     } finally {
//       setBookingLoading(false);
//     }
//   };

//   if (!doctor) return null;

//   return (
//     <>
//       <Helmet>
//         <script type="application/ld+json">{`
//           {
//             "@context": "https://schema.org",
//             "@type": "Physician",
//             "name": "${doctor.fullName}",
//             "medicalSpecialty": "${doctor.specialization ?? "General"}",
//             "image": "${
//               doctor.photo
//                 ? `http://localhost:3000/uploads/${doctor.photo}`
//                 : ""
//             }",
//             "priceRange": "${doctor.fees ?? "0"}"
//           }
//         `}</script>
//       </Helmet>

//       <div
//         className={`fixed inset-0 z-50 flex justify-end transition-opacity duration-300 ${
//           open ? "opacity-100" : "opacity-0 pointer-events-none"
//         }`}
//       >
//         <div
//           onClick={onClose}
//           className="absolute inset-0 bg-black/40 backdrop"
//         />

//         <aside
//           ref={sidebarRef}
//           className={`relative bg-white w-full sm:w-96 h-full shadow-2xl transform transition-transform duration-500 ease-in-out ${
//             open ? "translate-x-0" : "translate-x-full"
//           } rounded-l-2xl overflow-hidden`}
//         >
//           {/* Header */}
//           <header className="flex items-center justify-between px-5 py-4 border-b border-gray-200 bg-gray-50">
//             <div className="flex items-center gap-3">
//               {doctor.photo ? (
//                 <img
//                   src={`http://localhost:3000/uploads/${doctor.photo}`}
//                   alt={doctor.fullName}
//                   className="h-14 w-14 rounded-full object-cover border border-gray-200"
//                 />
//               ) : (
//                 <div className="h-14 w-14 flex items-center justify-center rounded-full bg-[#28328C] text-white text-lg font-semibold">
//                   {doctor.fullName.charAt(0)}
//                 </div>
//               )}
//               <div>
//                 <h2 className="text-lg font-semibold text-gray-900">
//                   {doctor.fullName}
//                 </h2>
//                 <p className="text-sm text-gray-500">{doctor.specialization}</p>
//               </div>
//             </div>
//             <button
//               onClick={onClose}
//               className="text-gray-500 hover:bg-gray-200 rounded-full p-2 transition-colors"
//             >
//               <X className="w-5 h-5" />
//             </button>
//           </header>

//           {/* Content */}
//           <div className="p-5 space-y-5 overflow-y-auto h-[calc(100%-4rem)] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">

//             {/* 🩵 Check if slots exist */}
//             {availableMonthKeys.length === 0 ? (
//               <div className="text-center py-8 bg-white rounded-2xl border border-gray-100 shadow-sm">
//                 <h2 className="text-lg font-semibold text-gray-800 mb-1">
//                   No Slots Available
//                 </h2>
//                 <p className="text-gray-500 text-sm">
//                   This doctor hasn’t added any appointment slots yet.
//                 </p>
//               </div>
//             ) : (
//               <>
//                 {/* Mode Buttons */}
//                 <div className="grid grid-cols-2 gap-3">
//                   <button
//                     onClick={() => setMode("online")}
//                     className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
//                       mode === "online"
//                         ? "bg-[#28328C] text-white shadow"
//                         : "bg-white text-gray-700 hover:border-[#28328C]/40"
//                     }`}
//                   >
//                     <Video className="w-4 h-4" /> Online
//                   </button>
//                   <button
//                     onClick={() => setMode("offline")}
//                     className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
//                       mode === "offline"
//                         ? "bg-[#28328C] text-white shadow"
//                         : "bg-white text-gray-700 hover:border-[#28328C]/40"
//                     }`}
//                   >
//                     <Phone className="w-4 h-4" /> Offline
//                   </button>
//                 </div>

//                 {/* Month Navigation */}
//                 <div className="flex justify-between items-center mb-3">
//                   <button
//                     className={`p-2 rounded ${
//                       availableMonthKeys.indexOf(monthKey) <= 0
//                         ? "opacity-40 cursor-not-allowed"
//                         : "hover:bg-gray-100"
//                     }`}
//                     disabled={availableMonthKeys.indexOf(monthKey) <= 0}
//                     onClick={() => {
//                       const idx = availableMonthKeys.indexOf(monthKey);
//                       if (idx > 0) {
//                         const prevKey = availableMonthKeys[idx - 1];
//                         const [y, m] = prevKey.split("-");
//                         const newMonth = new Date(Number(y), Number(m) - 1);
//                         setCurrentMonth(newMonth);
//                         setSelectedDate(newMonth);
//                       }
//                     }}
//                   >
//                     <ChevronLeft className="w-4 h-4" />
//                   </button>

//                   <span className="text-sm font-semibold text-gray-800">
//                     {currentMonth.toLocaleString("default", {
//                       month: "long",
//                       year: "numeric",
//                     })}
//                   </span>

//                   <button
//                     className={`p-2 rounded ${
//                       availableMonthKeys.indexOf(monthKey) >=
//                       availableMonthKeys.length - 1
//                         ? "opacity-40 cursor-not-allowed"
//                         : "hover:bg-gray-100"
//                     }`}
//                     disabled={
//                       availableMonthKeys.indexOf(monthKey) >=
//                       availableMonthKeys.length - 1
//                     }
//                     onClick={() => {
//                       const idx = availableMonthKeys.indexOf(monthKey);
//                       if (idx < availableMonthKeys.length - 1) {
//                         const nextKey = availableMonthKeys[idx + 1];
//                         const [y, m] = nextKey.split("-");
//                         const newMonth = new Date(Number(y), Number(m) - 1);
//                         setCurrentMonth(newMonth);
//                         setSelectedDate(newMonth);
//                       }
//                     }}
//                   >
//                     <ChevronRight className="w-4 h-4" />
//                   </button>
//                 </div>

//                 {/* Date Selection */}
//                 <div className="flex gap-2 overflow-x-auto py-2">
//                   {days.map((d) => {
//                     const key = formatDate(d);
//                     const active =
//                       selectedDate && formatDate(selectedDate) === key;
//                     const disabled = !availableDates.includes(key);

//                     return (
//                       <button
//                         key={key}
//                         onClick={() => {
//                           if (!disabled) {
//                             setSelectedDate(d);
//                             setSelectedTime(null);
//                           }
//                         }}
//                         disabled={disabled}
//                         className={`min-w-[72px] p-3 text-center rounded-lg border transition-all
//                           ${
//                             active
//                               ? "bg-[#28328C] text-white shadow"
//                               : "bg-white text-gray-800 hover:shadow-sm"
//                           }
//                           ${
//                             disabled
//                               ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                               : ""
//                           }`}
//                       >
//                         <div className="text-xs opacity-80">
//                           {formatDayShort(d)}
//                         </div>
//                         <div className="text-lg font-semibold">
//                           {formatDateNumber(d)}
//                         </div>
//                       </button>
//                     );
//                   })}
//                 </div>

//                 {/* Slots */}
//                 <div>
//                   <h4 className="text-sm font-semibold mb-2 text-gray-700">
//                     Available Slots
//                   </h4>

//                   {loadingSlots ? (
//                     <div className="grid grid-cols-3 gap-2">
//                       {Array.from({ length: 6 }).map((_, i) => (
//                         <div
//                           key={i}
//                           className="h-10 rounded bg-gray-100 animate-pulse"
//                         />
//                       ))}
//                     </div>
//                   ) : slots.length === 0 ? (
//                     <div className="text-gray-500 text-sm text-center py-3">
//                       No slots available for selected date.
//                     </div>
//                   ) : (
//                     <div className="grid grid-cols-3 gap-2">
//                       {slots.map((slot) => {
//                         const isBooked = !slot.isActive;
//                         const selected = selectedTime === slot.time;
//                         return (
//                           <button
//                             key={slot._id}
//                             onClick={() =>
//                               !isBooked && setSelectedTime(slot.time)
//                             }
//                             disabled={isBooked}
//                             className={`p-2 rounded border text-sm transition-all ${
//                               selected
//                                 ? "bg-[#28328C] text-white shadow"
//                                 : "bg-white text-gray-800 hover:shadow-sm"
//                             } ${
//                               isBooked
//                                 ? "!bg-gray-200 text-gray-950 cursor-not-allowed"
//                                 : ""
//                             }`}
//                           >
//                             {slot.time}
//                           </button>
//                         );
//                       })}
//                     </div>
//                   )}
//                 </div>
//               </>
//             )}
//           </div>

//           {selectedTime && (
//             <div className="sticky bottom-0 bg-white border-t border-gray-200 px-4 py-3">
//               <button
//                 onClick={() => setShowForm(true)}
//                 className="w-full bg-[#28328C] text-white py-2 rounded-lg font-medium hover:bg-[#1e2675] transition-all"
//               >
//                 Continue
//               </button>
//             </div>
//           )}

//           <AppointmentFormModal
//             open={showForm}
//             onClose={() => setShowForm(false)}
//             onSubmit={handleBook}
//             loading={bookingLoading}
//           />
//         </aside>
//       </div>
//     </>
//   );
// };

// export default BookingSidebar;

// import React, { useEffect, useMemo, useState, useRef } from "react";
// import { X, Video, Phone, ChevronLeft, ChevronRight } from "lucide-react";
// import { formatDayShort, formatDateNumber } from "../utils/date.js";
// import api from "../Services/mainApi.js";
// import { startOfMonth, endOfMonth } from "date-fns";
// import AppointmentFormModal from "./AppointmentFormModal.js";
// import Swal from "sweetalert2";
// import { Helmet } from "react-helmet";

// interface Slot {
//   _id: string;
//   time: string;
//   isActive: boolean;
// }

// interface DoctorForBooking {
//   _id: string;
//   fullName: string;
//   photo?: string;
//   specialization?: string;
//   fees: number;
//   clinicAddress?: string;
// }

// interface Props {
//   doctor: DoctorForBooking | null;
//   open: boolean;
//   onClose: () => void;
//   onBooked?: (bookingInfo: unknown, roomId?: string) => void;
//   variant?: "sidebar" | "modal";
// }

// interface SlotsAPIResponse {
//   availableMonths: {
//     [key: string]: Array<{
//       date: string;
//       slots: Slot[];
//     }>;
//   };
// }

// const BookingDrawer: React.FC<Props> = ({
//   doctor,
//   open,
//   onClose,
//   onBooked,
//   variant = "sidebar",
// }) => {
//   const [mode, setMode] = useState<"online" | "offline">("online");
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null);
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const [selectedTime, setSelectedTime] = useState<string | null>(null);
//   const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
//   const [slots, setSlots] = useState<Slot[]>([]);
//   const [currentMonth, setCurrentMonth] = useState(new Date());
//   const [showForm, setShowForm] = useState(false);
//   const [loadingSlots, setLoadingSlots] = useState(false);
//   const [bookingLoading, setBookingLoading] = useState(false);
//   const [availableMonthKeys, setAvailableMonthKeys] = useState<string[]>([]);
//   const [availableDates, setAvailableDates] = useState<string[]>([]);
//   const sidebarRef = useRef<HTMLDivElement | null>(null);

//   const isSidebar = variant === "sidebar";

//   // Generate days of current month
//   const days = useMemo(() => {
//     const start = startOfMonth(currentMonth);
//     const end = endOfMonth(currentMonth);
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//     const arr: Date[] = [];
//     const d = new Date(start);
//     while (d <= end) {
//       if (d >= today) arr.push(new Date(d));
//       d.setDate(d.getDate() + 1);
//     }
//     return arr;
//   }, [currentMonth]);

//   const formatDate = (date: Date) =>
//     `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
//       2,
//       "0"
//     )}-${String(date.getDate()).padStart(2, "0")}`;

//   // Reset on doctor change
//   useEffect(() => {
//     if (!doctor) return;
//     setMode("online");
//     setSelectedDate(new Date());
//     setSelectedTime(null);
//     setSlots([]);
//     setShowForm(false);
//   }, [doctor]);

//   // Fetch slots
//   useEffect(() => {
//     const fetchSlots = async () => {
//       if (!doctor || !selectedDate) return;
//       setLoadingSlots(true);

//       try {
//         const res = await api.get<SlotsAPIResponse>(
//           `/api/patient/slots/${doctor._id}`
//         );
//         if (!res.data?.availableMonths) {
//           setSlots([]);
//           setAvailableMonthKeys([]);
//           setAvailableDates([]);
//           return;
//         }

//         const monthKey = `${selectedDate.getFullYear()}-${String(
//           selectedDate.getMonth() + 1
//         ).padStart(2, "0")}`;
//         const keys = Object.keys(res.data.availableMonths).sort();
//         setAvailableMonthKeys(keys);

//         if (keys.length > 0 && !keys.includes(monthKey)) {
//   const [y, m] = keys[0].split("-");
//   const firstMonth = new Date(Number(y), Number(m) - 1);
//   if (firstMonth.getTime() !== selectedDate.getTime()) {
//     setCurrentMonth(firstMonth);
//     setSelectedDate(firstMonth);
//   }
// }

// const monthData = res.data.availableMonths[monthKey] ?? [];
// ...
// if (!dateEntry && monthData.length > 0) {
//   const firstDate = new Date(monthData[0].date);
//   if (firstDate.getTime() !== selectedDate.getTime()) {
//     setSelectedDate(firstDate);
//   }
//   return;
// }

//         setSlots(dateEntry?.slots ?? []);
//       } catch (err) {
//         console.error("Failed to fetch slots", err);
//         setSlots([]);
//       } finally {
//         setLoadingSlots(false);
//       }
//     };

//     fetchSlots();
//   }, [doctor, selectedDate]);

//   // Booking function
//   const handleBook = async (formData: {
//     name: string;
//     age: number;
//     gender: "Male" | "Female" | "Other";
//     aadhar: string;
//     contact: string;
//   }) => {
//     const token = document.cookie
//       .split("; ")
//       .find((r) => r.startsWith("patientToken="))
//       ?.split("=")[1];
//     const payloadBase64 = token?.split(".")[1];
//     const pay = payloadBase64 ? JSON.parse(atob(payloadBase64)) : null;
//     const userId = pay?.id;
//     if (!token) {
//       Swal.fire({
//         icon: "info",
//         title: "Login Required",
//         text: "Please login to book an appointment.",
//         confirmButtonText: "OK",
//       }).then(() => (window.location.href = "/patient-login"));
//       return;
//     }

//     if (!doctor || !selectedDate || !selectedSlot) {
//       Swal.fire({
//         icon: "warning",
//         title: "Incomplete Data",
//         text: "Please select date & time.",
//       });
//       return;
//     }

//     setBookingLoading(true);

//     const bookingPayload = {
//       doctorId: doctor._id,
//       userId,
//       slot: selectedSlot.time,
//       slotId: selectedSlot._id,
//       dateTime: selectedDate.toISOString().slice(0, 10),
//       mode,
//       status: "booked",
//       fees: doctor.fees ?? 0,
//       patient: formData,
//     };

//     try {
//       const res = await api.post<{ roomId?: string }>(
//         "/api/booking/book",
//         bookingPayload
//       );
//       const { roomId } = res.data;
//       await Swal.fire({
//         icon: "success",
//         title: "Appointment Confirmed!",
//         text: `Your appointment with Dr. ${doctor.fullName} is booked successfully.`,
//       });
//       onBooked?.(bookingPayload, roomId);
//       onClose();
//     } catch (err) {
//       console.error("Booking error", err);
//       Swal.fire({
//         icon: "error",
//         title: "Booking Failed",
//         text: "Please try again later.",
//       });
//     } finally {
//       setBookingLoading(false);
//     }
//   };

//   if (!doctor) return null;

//   // ✅ Helmet SEO (works for sidebar or modal)
//   const HelmetMeta = (
//     <Helmet>
//       <script type="application/ld+json">{`
//         {
//           "@context": "https://schema.org",
//           "@type": "Physician",
//           "name": "${doctor.fullName}",
//           "medicalSpecialty": "${doctor.specialization ?? "General"}",
//           "image": "${
//             doctor.photo ? `http://localhost:3000/uploads/${doctor.photo}` : ""
//           }",
//           "priceRange": "${doctor.fees ?? "0"}"
//         }
//       `}</script>
//     </Helmet>
//   );

//   // ✅ Conditional wrapper for sidebar or modal
//   return (
//     <>
//       {HelmetMeta}
//       <div
//         className={`fixed inset-0 z-50 flex ${
//           isSidebar
//             ? "justify-end transition-opacity duration-300"
//             : "items-center justify-center bg-black/40"
//         } ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
//       >
//         {isSidebar && (
//           <div onClick={onClose} className="absolute inset-0 bg-black/40" />
//         )}

//         <div
//           ref={sidebarRef}
//           className={`relative bg-white ${
//             isSidebar ? "w-full sm:w-96 h-full rounded-l-2xl" : "max-w-md p-5"
//           } shadow-2xl transform transition-transform duration-500 ease-in-out ${
//             open ? "translate-x-0" : isSidebar ? "translate-x-full" : "scale-95"
//           } overflow-hidden rounded-2xl`}
//         >
//           {/* Header */}
//           <header className="flex items-center justify-between px-5 py-4 border-b border-gray-200 bg-gray-50">
//             <div className="flex items-center gap-3">
//               {doctor.photo ? (
//                 <img
//                   src={`http://localhost:3000/uploads/${doctor.photo}`}
//                   alt={doctor.fullName}
//                   className="h-14 w-14 rounded-full object-cover border border-gray-200"
//                 />
//               ) : (
//                 <div className="h-14 w-14 flex items-center justify-center rounded-full bg-[#28328C] text-white text-lg font-semibold">
//                   {doctor.fullName.charAt(0)}
//                 </div>
//               )}
//               <div>
//                 <h2 className="text-lg font-semibold text-gray-900">
//                   {doctor.fullName}
//                 </h2>
//                 <p className="text-sm text-gray-500">{doctor.specialization}</p>
//               </div>
//             </div>
//             <button
//               onClick={onClose}
//               className="text-gray-500 hover:bg-gray-200 rounded-full p-2 transition-colors"
//             >
//               <X className="w-5 h-5" />
//             </button>
//           </header>

//           {/* Body */}
//           <div className="p-5 space-y-5 overflow-y-auto h-[calc(100%-4rem)]">
//             {availableMonthKeys.length === 0 ? (
//               <div className="text-center py-8 bg-white rounded-2xl border border-gray-100 shadow-sm">
//                 <h2 className="text-lg font-semibold text-gray-800 mb-1">
//                   No Slots Available
//                 </h2>
//                 <p className="text-gray-500 text-sm">
//                   This doctor hasn’t added any appointment slots yet.
//                 </p>
//               </div>
//             ) : (
//               <>
//                 {/* Mode Selection */}
//                 <div className="grid grid-cols-2 gap-3">
//                   <button
//                     onClick={() => setMode("online")}
//                     className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
//                       mode === "online"
//                         ? "bg-[#28328C] text-white shadow"
//                         : "bg-white text-gray-700 hover:border-[#28328C]/40"
//                     }`}
//                   >
//                     <Video className="w-4 h-4" /> Online
//                   </button>
//                   <button
//                     onClick={() => setMode("offline")}
//                     className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
//                       mode === "offline"
//                         ? "bg-[#28328C] text-white shadow"
//                         : "bg-white text-gray-700 hover:border-[#28328C]/40"
//                     }`}
//                   >
//                     <Phone className="w-4 h-4" /> Offline
//                   </button>
//                 </div>

//                 {/* Month Navigation */}
//                 <div className="flex justify-between items-center mb-3">
//                   <button
//                     className="p-2 rounded hover:bg-gray-100"
//                     onClick={() => {
//                       const idx = availableMonthKeys.indexOf(
//                         `${currentMonth.getFullYear()}-${String(
//                           currentMonth.getMonth() + 1
//                         ).padStart(2, "0")}`
//                       );
//                       if (idx > 0) {
//                         const prevKey = availableMonthKeys[idx - 1];
//                         const [y, m] = prevKey.split("-");
//                         const newMonth = new Date(Number(y), Number(m) - 1);
//                         setCurrentMonth(newMonth);
//                         setSelectedDate(newMonth);
//                       }
//                     }}
//                   >
//                     <ChevronLeft className="w-4 h-4" />
//                   </button>

//                   <span className="text-sm font-semibold text-gray-800">
//                     {currentMonth.toLocaleString("default", {
//                       month: "long",
//                       year: "numeric",
//                     })}
//                   </span>

//                   <button
//                     className="p-2 rounded hover:bg-gray-100"
//                     onClick={() => {
//                       const idx = availableMonthKeys.indexOf(
//                         `${currentMonth.getFullYear()}-${String(
//                           currentMonth.getMonth() + 1
//                         ).padStart(2, "0")}`
//                       );
//                       if (idx < availableMonthKeys.length - 1) {
//                         const nextKey = availableMonthKeys[idx + 1];
//                         const [y, m] = nextKey.split("-");
//                         const newMonth = new Date(Number(y), Number(m) - 1);
//                         setCurrentMonth(newMonth);
//                         setSelectedDate(newMonth);
//                       }
//                     }}
//                   >
//                     <ChevronRight className="w-4 h-4" />
//                   </button>
//                 </div>

//                 {/* Dates */}
//                 <div className="flex gap-2 overflow-x-auto py-2">
//                   {days.map((d) => {
//                     const key = formatDate(d);
//                     const active =
//                       selectedDate && formatDate(selectedDate) === key;
//                     const disabled = !availableDates.includes(key);

//                     return (
//                       <button
//                         key={key}
//                         onClick={() => {
//                           if (!disabled) {
//                             setSelectedDate(d);
//                             setSelectedTime(null);
//                             setSelectedSlot(null);
//                           }
//                         }}
//                         disabled={disabled}
//                         className={`min-w-[72px] p-3 text-center rounded-lg border transition-all ${
//                           active
//                             ? "bg-[#28328C] text-white shadow"
//                             : "bg-white text-gray-800 hover:shadow-sm"
//                         } ${
//                           disabled
//                             ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                             : ""
//                         }`}
//                       >
//                         <div className="text-xs opacity-80">
//                           {formatDayShort(d)}
//                         </div>
//                         <div className="text-lg font-semibold">
//                           {formatDateNumber(d)}
//                         </div>
//                       </button>
//                     );
//                   })}
//                 </div>

//                 {/* Slots */}
//                 <div>
//                   <h4 className="text-sm font-semibold mb-2 text-gray-700">
//                     Available Slots
//                   </h4>
//                   {loadingSlots ? (
//                     <div className="grid grid-cols-3 gap-2">
//                       {Array.from({ length: 6 }).map((_, i) => (
//                         <div
//                           key={i}
//                           className="h-10 rounded bg-gray-100 animate-pulse"
//                         />
//                       ))}
//                     </div>
//                   ) : slots.length === 0 ? (
//                     <div className="text-gray-500 text-sm text-center py-3">
//                       No slots available for selected date.
//                     </div>
//                   ) : (
//                     <div className="grid grid-cols-3 gap-2">
//                       {slots.map((slot) => {
//                         const isBooked = !slot.isActive;
//                         const selected = selectedSlot?._id === slot._id;
//                         return (
//                           <button
//                             key={slot._id}
//                             onClick={() => {
//                               if (!isBooked) {
//                                 setSelectedTime(slot.time);
//                                 setSelectedSlot(slot);
//                               }
//                             }}
//                             disabled={isBooked}
//                             className={`p-2 rounded border text-sm transition-all ${
//                               selected
//                                 ? "bg-[#28328C] text-white shadow"
//                                 : "bg-white text-gray-800 hover:shadow-sm"
//                             } ${
//                               isBooked
//                                 ? "!bg-gray-200 text-gray-400 cursor-not-allowed"
//                                 : ""
//                             }`}
//                           >
//                             {slot.time}
//                           </button>
//                         );
//                       })}
//                     </div>
//                   )}
//                 </div>
//               </>
//             )}
//           </div>

//           {/* Continue Button */}
//           {selectedSlot && (
//             <div className="sticky bottom-0 bg-white border-t border-gray-200 px-4 py-3">
//               <button
//                 onClick={() => setShowForm(true)}
//                 className="w-full bg-[#28328C] text-white py-2 rounded-lg font-medium hover:bg-[#1e2675] transition-all"
//               >
//                 Continue
//               </button>
//             </div>
//           )}

//           <AppointmentFormModal
//             open={showForm}
//             onClose={() => setShowForm(false)}
//             onSubmit={handleBook}
//             loading={bookingLoading}
//           />
//         </div>
//       </div>
//     </>
//   );
// };

// export default BookingDrawer;

//changed

// import React, { useEffect, useMemo, useState, useRef } from "react";
// import { X, Video, Phone, ChevronLeft, ChevronRight } from "lucide-react";
// import { formatDayShort, formatDateNumber } from "../utils/date.js";
// import api from "../Services/mainApi.js";
// import { startOfMonth, endOfMonth } from "date-fns";
// import AppointmentFormModal from "./AppointmentFormModal.js";
// import Swal from "sweetalert2";
// import { Helmet } from "react-helmet";

// interface Slot {
//   _id: string;
//   time: string;
//   isActive: boolean;
// }

// interface DoctorForBooking {
//   _id: string;
//   fullName: string;
//   photo?: string;
//   specialization?: string;
//   fees: number;
//   clinicAddress?: string;
// }

// interface Props {
//   doctor: DoctorForBooking | null;
//   open: boolean;
//   onClose: () => void;
//   onBooked?: (bookingInfo: unknown, roomId?: string) => void;
//   variant?: "sidebar" | "modal";
// }

// interface SlotsAPIResponse {
//   availableMonths: {
//     [key: string]: Array<{
//       date: string;
//       slots: Slot[];
//     }>;
//   };
// }

// const BookingDrawer: React.FC<Props> = ({
//   doctor,
//   open,
//   onClose,
//   onBooked,
//   variant = "sidebar",
// }) => {
//   const [mode, setMode] = useState<"online" | "offline">("online");
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null);
//   const [selectedTime, setSelectedTime] = useState<string | null>(null);
//   const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
//   const [slots, setSlots] = useState<Slot[]>([]);
//   const [currentMonth, setCurrentMonth] = useState(new Date());
//   const [showForm, setShowForm] = useState(false);
//   const [loadingSlots, setLoadingSlots] = useState(false);
//   const [bookingLoading, setBookingLoading] = useState(false);
//   const [availableMonthKeys, setAvailableMonthKeys] = useState<string[]>([]);
//   const [availableDates, setAvailableDates] = useState<string[]>([]);
//   const sidebarRef = useRef<HTMLDivElement | null>(null);

//   const isSidebar = variant === "sidebar";

//   // Generate days of current month
//   const days = useMemo(() => {
//     const start = startOfMonth(currentMonth);
//     const end = endOfMonth(currentMonth);
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//     const arr: Date[] = [];
//     const d = new Date(start);
//     while (d <= end) {
//       if (d >= today) arr.push(new Date(d));
//       d.setDate(d.getDate() + 1);
//     }
//     return arr;
//   }, [currentMonth]);

//   const formatDate = (date: Date) =>
//     `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
//       2,
//       "0"
//     )}-${String(date.getDate()).padStart(2, "0")}`;

//   // Reset on doctor change
//   useEffect(() => {
//     if (!doctor) return;
//     setMode("online");
//     setSelectedDate(new Date());
//     setSelectedTime(null);
//     setSlots([]);
//     setShowForm(false);
//   }, [doctor]);

//   // Fetch slots
//   useEffect(() => {
//     const fetchSlots = async () => {
//       if (!doctor || !selectedDate) return;
//       setLoadingSlots(true);

//       try {
//         const res = await api.get<SlotsAPIResponse>(
//           `/api/patient/slots/${doctor._id}`
//         );
//         if (!res.data?.availableMonths) {
//           setSlots([]);
//           setAvailableMonthKeys([]);
//           setAvailableDates([]);
//           return;
//         }

//         const monthKey = `${selectedDate.getFullYear()}-${String(
//           selectedDate.getMonth() + 1
//         ).padStart(2, "0")}`;

//         const keys = Object.keys(res.data.availableMonths).sort();
//         setAvailableMonthKeys(keys);

//         // ✅ Guard: only update when date actually changes
//         if (keys.length > 0 && !keys.includes(monthKey)) {
//           const [y, m] = keys[0].split("-");
//           const firstMonth = new Date(Number(y), Number(m) - 1);
//           if (!selectedDate || firstMonth.getTime() !== selectedDate.getTime()) {
//             setCurrentMonth(firstMonth);
//             setSelectedDate(firstMonth);
//             return; // prevent continuing in this cycle
//           }
//         }

//         const monthData = res.data.availableMonths[monthKey] ?? [];
//         const dateEntry = monthData.find(
//           (entry) => entry.date === formatDate(selectedDate)
//         );

//         setAvailableDates(monthData.map((d) => d.date));

//         if (!dateEntry && monthData.length > 0) {
//           const firstDate = new Date(monthData[0].date);
//           if (!selectedDate || firstDate.getTime() !== selectedDate.getTime()) {
//             setSelectedDate(firstDate);
//             return; // avoid infinite loop
//           }
//         }

//         setSlots(dateEntry?.slots ?? []);
//       } catch (err) {
//         console.error("Failed to fetch slots", err);
//         setSlots([]);
//       } finally {
//         setLoadingSlots(false);
//       }
//     };

//     fetchSlots();
//   }, [doctor, selectedDate]);

//   // Booking function
//   const handleBook = async (formData: {
//     name: string;
//     age: number;
//     gender: "Male" | "Female" | "Other";
//     aadhar: string;
//     contact: string;
//   }) => {
//     const token = document.cookie
//       .split("; ")
//       .find((r) => r.startsWith("patientToken="))
//       ?.split("=")[1];
//     const payloadBase64 = token?.split(".")[1];
//     const pay = payloadBase64 ? JSON.parse(atob(payloadBase64)) : null;
//     const userId = pay?.id;

//     if (!token) {
//       Swal.fire({
//         icon: "info",
//         title: "Login Required",
//         text: "Please login to book an appointment.",
//         confirmButtonText: "OK",
//       }).then(() => (window.location.href = "/patient-login"));
//       return;
//     }

//     if (!doctor || !selectedDate || !selectedSlot) {
//       Swal.fire({
//         icon: "warning",
//         title: "Incomplete Data",
//         text: "Please select date & time.",
//       });
//       return;
//     }

//     setBookingLoading(true);

//     const bookingPayload = {
//       doctorId: doctor._id,
//       userId,
//       slot: selectedSlot.time,
//       slotId: selectedSlot._id,
//       dateTime: selectedDate.toISOString().slice(0, 10),
//       mode,
//       status: "booked",
//       fees: doctor.fees ?? 0,
//       patient: formData,
//     };

//     try {
//       const res = await api.post<{ roomId?: string }>(
//         "/api/booking/book",
//         bookingPayload
//       );
//       const { roomId } = res.data;
//       await Swal.fire({
//         icon: "success",
//         title: "Appointment Confirmed!",
//         text: `Your appointment with Dr. ${doctor.fullName} is booked successfully.`,
//       });
//       onBooked?.(bookingPayload, roomId);
//       onClose();
//     } catch (err) {
//       console.error("Booking error", err);
//       Swal.fire({
//         icon: "error",
//         title: "Booking Failed",
//         text: "Please try again later.",
//       });
//     } finally {
//       setBookingLoading(false);
//     }
//   };

//   if (!doctor) return null;

//   const HelmetMeta = (
//     <Helmet>
//       <script type="application/ld+json">{`
//         {
//           "@context": "https://schema.org",
//           "@type": "Physician",
//           "name": "${doctor.fullName}",
//           "medicalSpecialty": "${doctor.specialization ?? "General"}",
//           "image": "${
//             doctor.photo ? `http://localhost:3000/uploads/${doctor.photo}` : ""
//           }",
//           "priceRange": "${doctor.fees ?? "0"}"
//         }
//       `}</script>
//     </Helmet>
//   );

//   return (
//     <>
//       {HelmetMeta}
//       <div
//         className={`fixed inset-0 z-50 flex ${
//           isSidebar
//             ? "justify-end transition-opacity duration-300"
//             : "items-center justify-center bg-black/40"
//         } ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
//       >
//         {isSidebar && (
//           <div onClick={onClose} className="absolute inset-0 bg-black/40" />
//         )}

//         <div
//           ref={sidebarRef}
//           className={`relative bg-white ${
//             isSidebar ? "w-full sm:w-96 h-full rounded-l-2xl" : "max-w-md p-5"
//           } shadow-2xl transform transition-transform duration-500 ease-in-out ${
//             open ? "translate-x-0" : isSidebar ? "translate-x-full" : "scale-95"
//           } overflow-hidden rounded-2xl`}
//         >
//           {/* Header */}
//           <header className="flex items-center justify-between px-5 py-4 border-b border-gray-200 bg-gray-50">
//             <div className="flex items-center gap-3">
//               {doctor.photo ? (
//                 <img
//                   src={`http://localhost:3000/uploads/${doctor.photo}`}
//                   alt={doctor.fullName}
//                   className="h-14 w-14 rounded-full object-cover border border-gray-200"
//                 />
//               ) : (
//                 <div className="h-14 w-14 flex items-center justify-center rounded-full bg-[#28328C] text-white text-lg font-semibold">
//                   {doctor.fullName.charAt(0)}
//                 </div>
//               )}
//               <div>
//                 <h2 className="text-lg font-semibold text-gray-900">
//                   {doctor.fullName}
//                 </h2>
//                 <p className="text-sm text-gray-500">{doctor.specialization}</p>
//               </div>
//             </div>
//             <button
//               onClick={onClose}
//               className="text-gray-500 hover:bg-gray-200 rounded-full p-2 transition-colors"
//             >
//               <X className="w-5 h-5" />
//             </button>
//           </header>

//           {/* Body */}
//           <div className="p-5 space-y-5 overflow-y-auto h-[calc(100%-4rem)]">
//             {availableMonthKeys.length === 0 ? (
//               <div className="text-center py-8 bg-white rounded-2xl border border-gray-100 shadow-sm">
//                 <h2 className="text-lg font-semibold text-gray-800 mb-1">
//                   No Slots Available
//                 </h2>
//                 <p className="text-gray-500 text-sm">
//                   This doctor hasn’t added any appointment slots yet.
//                 </p>
//               </div>
//             ) : (
//               <>
//                 {/* Mode Selection */}
//                 <div className="grid grid-cols-2 gap-3">
//                   <button
//                     onClick={() => setMode("online")}
//                     className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
//                       mode === "online"
//                         ? "bg-[#28328C] text-white shadow"
//                         : "bg-white text-gray-700 hover:border-[#28328C]/40"
//                     }`}
//                   >
//                     <Video className="w-4 h-4" /> Online
//                   </button>
//                   <button
//                     onClick={() => setMode("offline")}
//                     className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
//                       mode === "offline"
//                         ? "bg-[#28328C] text-white shadow"
//                         : "bg-white text-gray-700 hover:border-[#28328C]/40"
//                     }`}
//                   >
//                     <Phone className="w-4 h-4" /> Offline
//                   </button>
//                 </div>

//                 {/* Month Navigation */}
//                 <div className="flex justify-between items-center mb-3">
//                   <button
//                     className="p-2 rounded hover:bg-gray-100"
//                     onClick={() => {
//                       const idx = availableMonthKeys.indexOf(
//                         `${currentMonth.getFullYear()}-${String(
//                           currentMonth.getMonth() + 1
//                         ).padStart(2, "0")}`
//                       );
//                       if (idx > 0) {
//                         const prevKey = availableMonthKeys[idx - 1];
//                         const [y, m] = prevKey.split("-");
//                         const newMonth = new Date(Number(y), Number(m) - 1);
//                         setCurrentMonth(newMonth);
//                         setSelectedDate(newMonth);
//                       }
//                     }}
//                   >
//                     <ChevronLeft className="w-4 h-4" />
//                   </button>

//                   <span className="text-sm font-semibold text-gray-800">
//                     {currentMonth.toLocaleString("default", {
//                       month: "long",
//                       year: "numeric",
//                     })}
//                   </span>

//                   <button
//                     className="p-2 rounded hover:bg-gray-100"
//                     onClick={() => {
//                       const idx = availableMonthKeys.indexOf(
//                         `${currentMonth.getFullYear()}-${String(
//                           currentMonth.getMonth() + 1
//                         ).padStart(2, "0")}`
//                       );
//                       if (idx < availableMonthKeys.length - 1) {
//                         const nextKey = availableMonthKeys[idx + 1];
//                         const [y, m] = nextKey.split("-");
//                         const newMonth = new Date(Number(y), Number(m) - 1);
//                         setCurrentMonth(newMonth);
//                         setSelectedDate(newMonth);
//                       }
//                     }}
//                   >
//                     <ChevronRight className="w-4 h-4" />
//                   </button>
//                 </div>

//                 {/* Dates */}
//                 <div className="flex gap-2 overflow-x-auto py-2">
//                   {days.map((d) => {
//                     const key = formatDate(d);
//                     const active =
//                       selectedDate && formatDate(selectedDate) === key;
//                     const disabled = !availableDates.includes(key);

//                     return (
//                       <button
//                         key={key}
//                         onClick={() => {
//                           if (!disabled) {
//                             setSelectedDate(d);
//                             setSelectedTime(null);
//                             setSelectedSlot(null);
//                           }
//                         }}
//                         disabled={disabled}
//                         className={`min-w-[72px] p-3 text-center rounded-lg border transition-all ${
//                           active
//                             ? "bg-[#28328C] text-white shadow"
//                             : "bg-white text-gray-800 hover:shadow-sm"
//                         } ${
//                           disabled
//                             ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                             : ""
//                         }`}
//                       >
//                         <div className="text-xs opacity-80">
//                           {formatDayShort(d)}
//                         </div>
//                         <div className="text-lg font-semibold">
//                           {formatDateNumber(d)}
//                         </div>
//                       </button>
//                     );
//                   })}
//                 </div>

//                 {/* Slots */}
//                 <div>
//                   <h4 className="text-sm font-semibold mb-2 text-gray-700">
//                     Available Slots
//                   </h4>
//                   {loadingSlots ? (
//                     <div className="grid grid-cols-3 gap-2">
//                       {Array.from({ length: 6 }).map((_, i) => (
//                         <div
//                           key={i}
//                           className="h-10 rounded bg-gray-100 animate-pulse"
//                         />
//                       ))}
//                     </div>
//                   ) : slots.length === 0 ? (
//                     <div className="text-gray-500 text-sm text-center py-3">
//                       No slots available for selected date.
//                     </div>
//                   ) : (
//                     <div className="grid grid-cols-3 gap-2">
//                       {slots.map((slot) => {
//                         const isBooked = !slot.isActive;
//                         const selected = selectedSlot?._id === slot._id;
//                         return (
//                           <button
//                             key={slot._id}
//                             onClick={() => {
//                               if (!isBooked) {
//                                 setSelectedTime(slot.time);
//                                 setSelectedSlot(slot);
//                               }
//                             }}
//                             disabled={isBooked}
//                             className={`p-2 rounded border text-sm transition-all ${
//                               selected
//                                 ? "bg-[#28328C] text-white shadow"
//                                 : "bg-white text-gray-800 hover:shadow-sm"
//                             } ${
//                               isBooked
//                                 ? "!bg-gray-200 text-gray-400 cursor-not-allowed"
//                                 : ""
//                             }`}
//                           >
//                             {slot.time}
//                           </button>
//                         );
//                       })}
//                     </div>
//                   )}
//                 </div>
//               </>
//             )}
//           </div>

//           {/* Continue Button */}
//           {selectedSlot && (
//             <div className="sticky bottom-0 bg-white border-t border-gray-200 px-4 py-3">
//               <button
//                 onClick={() => setShowForm(true)}
//                 className="w-full bg-[#28328C] text-white py-2 rounded-lg font-medium hover:bg-[#1e2675] transition-all"
//               >
//                 Continue
//               </button>
//             </div>
//           )}

//           <AppointmentFormModal
//             open={showForm}
//             onClose={() => setShowForm(false)}
//             onSubmit={handleBook}
//             loading={bookingLoading}
//           />
//         </div>
//       </div>
//     </>
//   );
// };

// export default BookingDrawer;

import React, { useEffect, useMemo, useState, useRef } from "react";
import { X, Video, Phone, ChevronLeft, ChevronRight } from "lucide-react";
import { formatDayShort, formatDateNumber } from "../utils/date.js";
import api from "../Services/mainApi.js";
import { startOfMonth, endOfMonth } from "date-fns";
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

interface FormData {
  name: string;
  age: string;
  gender: string;
  aadhar: string;
  contact: string;
}

interface Props {
  doctor: DoctorForBooking | null;
  open: boolean;
  onClose: () => void;
  onBooked?: (bookingInfo: unknown) => void;
}
interface MonthDataEntry {
  date: string;
  slots: Slot[];
}

interface SlotsAPIResponse {
  availableMonths: {
    [key: string]: Array<{
      date: string;
      slots: Slot[];
    }>;
  };
}

interface BookingPayload {
  doctorId: string;
  userId: string;
  mode: "online" | "offline";
  datetime: string;
  fees: number;
  slotId: string | undefined;
  patient: {
    name: string;
    age: number;
    gender: "Male" | "Female" | "Other";
    aadhar: string;
    contact: string;
  };
  createdAt: string;
}

interface JwtPayload {
  id: string;
  [key: string]: any;
}

const BookingDrawer: React.FC<Props> = ({
  doctor,
  open,
  onClose,
  onBooked,
}) => {
  const [mode, setMode] = useState<"online" | "offline">("online");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showForm, setShowForm] = useState(false);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [availableMonthKeys, setAvailableMonthKeys] = useState<string[]>([]);
  const [availableDates, setAvailableDates] = useState<string[]>([]);

  const days = useMemo(() => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const arr: Date[] = [];
    const d = new Date(start);

    while (d <= end) {
      if (d >= today) arr.push(new Date(d));
      d.setDate(d.getDate() + 1);
    }

    return arr;
  }, [currentMonth]);

  const formatDate = (date: Date): string =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;

  useEffect(() => {
    if (!doctor) return;
    setMode("online");
    const today = new Date();
    setSelectedDate(today);
    setSelectedTime(null);
    setSlots([]);
    setShowForm(false);
  }, [doctor]);

  const monthKey = `${currentMonth.getFullYear()}-${String(
    currentMonth.getMonth() + 1
  ).padStart(2, "0")}`;

  useEffect(() => {
    const fetchSlots = async () => {
      if (!doctor || !selectedDate) return;
      setLoadingSlots(true);

      try {
        const res = await api.get<SlotsAPIResponse>(
          `/api/patient/slots/${doctor._id}`
        );
        if (
          !res.data ||
          !res.data.availableMonths ||
          Object.keys(res.data.availableMonths).length === 0
        ) {
          setSlots([]);
          setAvailableMonthKeys([]);
          setAvailableDates([]);
          return;
        }

        const monthKey = `${selectedDate.getFullYear()}-${String(
          selectedDate.getMonth() + 1
        ).padStart(2, "0")}`;
        const keys = Object.keys(res.data.availableMonths || {}).sort();
        setAvailableMonthKeys(keys);

        if (keys.length > 0 && !keys.includes(monthKey)) {
          const [y, m] = keys[0].split("-");
          const firstMonth = new Date(Number(y), Number(m) - 1);
          setCurrentMonth(firstMonth);
          setSelectedDate(firstMonth);
        }

        const monthData: MonthDataEntry[] =
          res.data.availableMonths?.[monthKey] ?? [];

        setAvailableDates(monthData.map((entry) => entry.date.slice(0, 10)));

        const dateEntry = monthData.find(
          (entry) => entry.date.slice(0, 10) === formatDate(selectedDate)
        );

        if (!dateEntry && monthData.length > 0) {
          const firstDate = new Date(monthData[0].date);
          setSelectedDate(firstDate);
          return;
        }

        setSlots(dateEntry?.slots ?? []);
      } catch (err) {
        console.error("Failed to fetch slots", err);
        setSlots([]);
      } finally {
        setLoadingSlots(false);
      }
    };

    fetchSlots();
  }, [doctor, selectedDate]);

  const handleBook = async (formData: FormData) => {
    // Get token and decode user ID
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("patientToken="))
      ?.split("=")[1];
    
    if (!token) {
      Swal.fire({
        icon: "info",
        title: "Login Required",
        text: "Please login to book an appointment.",
        confirmButtonText: "OK",
      }).then(() => { window.location.href = "/patient-login" });
      return;
    }

    // Decode JWT token to get user ID
    const payloadBase64 = token.split(".")[1];
    let userId = "";
    try {
      const payload = JSON.parse(atob(payloadBase64)) as JwtPayload;
      userId = payload.id;
    } catch (error) {
      console.error("Failed to decode token", error);
      Swal.fire({
        icon: "error",
        title: "Authentication Error",
        text: "Please login again.",
      }).then(() => { window.location.href = "/patient-login" });
      return;
    }

    if (!doctor || !selectedDate || !selectedTime) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Data",
        text: "Please select date & time.",
      });
      return;
    }

    const selectedSlotId = slots.find((s) => s.time === selectedTime)?._id;
    setBookingLoading(true);

    const bookingPayload: BookingPayload = {
      doctorId: doctor._id,
      userId,
      mode,
      dateTime: `${selectedDate
        .toISOString()
        .slice(0, 10)}T${selectedTime}:00Z`,
      fees: doctor.fees ?? 0,
      slot: selectedTime,
      slotId: selectedSlotId,
      patient: {
        name: formData.name,
        age: Number(formData.age),
        gender: formData.gender as "Male" | "Female" | "Other",
        aadhar: formData.aadhar,
        contact: formData.contact,
      },
      createdAt: new Date().toISOString(),
    };

    console.log("🟢 Booking Payload Sent:", bookingPayload);


    try {
      await api.post("/api/booking/book", bookingPayload);
      await Swal.fire({
        icon: "success",
        title: "Appointment Confirmed!",
        text: `Your appointment with Dr. ${doctor.fullName} is booked successfully.`,
      });
      onBooked?.(bookingPayload);
      onClose();
    } catch (err: any) {
      console.error("Booking error", err);

  // Extract backend error message safely
  const errorMessage =
    err.response?.data?.message ||
    err.message ||
    "Something went wrong while booking.";

  // ✅ Show specific alert if duplicate Aadhar booking detected
  if (errorMessage.toLowerCase().includes("aadhar")) {
    await Swal.fire({
      icon: "warning",
      title: "Duplicate Booking Detected",
      text: "An appointment has already been booked with this Aadhar number.",
      confirmButtonColor: "#28328C",
    });
  } else {
    await Swal.fire({
      icon: "error",
      title: "Booking Failed",
      text: errorMessage || "Please try again later.",
      confirmButtonColor: "#28328C",
    });
  }

      
    } finally {
      setBookingLoading(false);
    }
  };

  // Close drawer when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        open
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onClose]);

  if (!doctor) return null;

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "Physician",
            "name": "${doctor.fullName}",
            "medicalSpecialty": "${doctor.specialization ?? "General"}",
            "image": "${
              doctor.photo
                ? `http://localhost:3000/uploads/${doctor.photo}`
                : ""
            }",
            "priceRange": "₹${doctor.fees ?? "0"}"
          }
        `}</script>
      </Helmet>

      <div
        className={`fixed inset-0 z-50 flex justify-end transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          onClick={onClose}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
        />

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
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              ) : (
                <div className="h-14 w-14 flex items-center justify-center rounded-full bg-[#28328C] text-white text-lg font-semibold">
                  {doctor.fullName.charAt(0)}
                </div>
              )}
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {doctor.fullName}
                </h2>
                <p className="text-sm text-gray-500">{doctor.specialization}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:bg-gray-200 rounded-full p-2 transition-colors"
              aria-label="Close booking drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </header>

          {/* Content */}
          <div className="p-5 space-y-5 overflow-y-auto h-[calc(100%-4rem)] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            {/* 🩵 Check if slots exist */}
            {availableMonthKeys.length === 0 ? (
              <div className="text-center py-8 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-800 mb-1">
                  No Slots Available
                </h2>
                <p className="text-gray-500 text-sm">
                  This doctor hasn't added any appointment slots yet.
                </p>
              </div>
            ) : (
              <>
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
                <div className="flex justify-between items-center mb-3">
                  <button
                    className={`p-2 rounded ${
                      availableMonthKeys.indexOf(monthKey) <= 0
                        ? "opacity-40 cursor-not-allowed"
                        : "hover:bg-gray-100"
                    }`}
                    disabled={availableMonthKeys.indexOf(monthKey) <= 0}
                    onClick={() => {
                      const idx = availableMonthKeys.indexOf(monthKey);
                      if (idx > 0) {
                        const prevKey = availableMonthKeys[idx - 1];
                        const [y, m] = prevKey.split("-");
                        const newMonth = new Date(Number(y), Number(m) - 1);
                        setCurrentMonth(newMonth);
                        setSelectedDate(newMonth);
                      }
                    }}
                    aria-label="Previous month"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <span className="text-sm font-semibold text-gray-800">
                    {currentMonth.toLocaleString("default", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>

                  <button
                    className={`p-2 rounded ${
                      availableMonthKeys.indexOf(monthKey) >=
                      availableMonthKeys.length - 1
                        ? "opacity-40 cursor-not-allowed"
                        : "hover:bg-gray-100"
                    }`}
                    disabled={
                      availableMonthKeys.indexOf(monthKey) >=
                      availableMonthKeys.length - 1
                    }
                    onClick={() => {
                      const idx = availableMonthKeys.indexOf(monthKey);
                      if (idx < availableMonthKeys.length - 1) {
                        const nextKey = availableMonthKeys[idx + 1];
                        const [y, m] = nextKey.split("-");
                        const newMonth = new Date(Number(y), Number(m) - 1);
                        setCurrentMonth(newMonth);
                        setSelectedDate(newMonth);
                      }
                    }}
                    aria-label="Next month"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Date Selection */}
                <div className="flex gap-2 overflow-x-auto py-2 scrollbar-thin">
                  {days.map((d) => {
                    const key = formatDate(d);
                    const active =
                      selectedDate && formatDate(selectedDate) === key;
                    const disabled = !availableDates.includes(key);

                    return (
                      <button
                        key={key}
                        onClick={() => {
                          if (!disabled) {
                            setSelectedDate(d);
                            setSelectedTime(null);
                          }
                        }}
                        disabled={disabled}
                        className={`min-w-[72px] p-3 text-center rounded-lg border transition-all flex-shrink-0
                          ${
                            active
                              ? "bg-[#28328C] text-white shadow"
                              : "bg-white text-gray-800 hover:shadow-sm"
                          }
                          ${
                            disabled
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                              : ""
                          }`}
                      >
                        <div className="text-xs opacity-80">
                          {formatDayShort(d)}
                        </div>
                        <div className="text-lg font-semibold">
                          {formatDateNumber(d)}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Slots */}
                <div>
                  <h4 className="text-sm font-semibold mb-2 text-gray-700">
                    Available Slots
                  </h4>

                  {loadingSlots ? (
                    <div className="grid grid-cols-3 gap-2">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div
                          key={i}
                          className="h-10 rounded bg-gray-100 animate-pulse"
                        />
                      ))}
                    </div>
                  ) : slots.length === 0 ? (
                    <div className="text-gray-500 text-sm text-center py-3">
                      No slots available for selected date.
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-2">
                      {slots.map((slot) => {
                        const isBooked = !slot.isActive;
                        const selected = selectedTime === slot.time;
                        return (
                          <button
                            key={slot._id}
                            onClick={() =>
                              !isBooked && setSelectedTime(slot.time)
                            }
                            disabled={isBooked}
                            className={`p-2 rounded border text-sm transition-all ${
                              selected
                                ? "bg-[#28328C] text-white shadow"
                                : "bg-white text-gray-800 hover:shadow-sm"
                            } ${
                              isBooked
                                ? "!bg-gray-200 text-gray-500 cursor-not-allowed"
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
              </>
            )}
          </div>

          {selectedTime && (
            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-4 py-3">
              <button
                onClick={() => setShowForm(true)}
                className="w-full bg-[#28328C] text-white py-3 rounded-lg font-medium hover:bg-[#1e2675] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={bookingLoading}
              >
                {bookingLoading ? "Processing..." : "Continue to Book"}
              </button>
            </div>
          )}

          <AppointmentFormModal
            open={showForm}
            onClose={() => setShowForm(false)}
            onSubmit={handleBook}
            loading={bookingLoading}
          />
        </aside>
      </div>
    </>
  );
};

export default BookingDrawer
