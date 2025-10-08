




// import React, { useEffect, useMemo, useState } from "react";
// import { X, Video, Phone } from "lucide-react";
// import { formatDayShort, formatDateNumber } from "../utils/date.js";
// import api from "../api/client";
// import { addMonths, startOfMonth, endOfMonth } from "date-fns";

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
// }

// interface Props {
//   doctor: DoctorForBooking | null;
//   open: boolean;
//   onClose: () => void;
//   onBooked?: (bookingInfo: any) => void;
// }

// const BookingDrawer: React.FC<Props> = ({ doctor, open, onClose, onBooked }) => {
//   const [mode, setMode] = useState<"online" | "offline">("online");
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null);
//   const [selectedTime, setSelectedTime] = useState<string | null>(null);
//   const [bookingLoading, setBookingLoading] = useState(false);
//   const [successMsg, setSuccessMsg] = useState<string | null>(null);
//   const [slots, setSlots] = useState<Slot[]>([]);
//   const [currentMonth, setCurrentMonth] = useState(new Date());

//   // Generate all days in current month
//   const days = useMemo(() => {
//     const start = startOfMonth(currentMonth);
//     const end = endOfMonth(currentMonth);
//     const arr: Date[] = [];
//     for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
//       arr.push(new Date(d));
//     }
//     return arr;
//   }, [currentMonth]);

//   // Reset selection when doctor changes
//   useEffect(() => {
//     if (!doctor) return;
//     setMode("online");
//     setSelectedDate(new Date());
//     setSelectedTime(null);
//     setSlots([]);
//   }, [doctor]);

//   // Fetch slots whenever doctor or selectedDate changes
//   useEffect(() => {
//     const fetchSlots = async () => {
//       if (!doctor || !selectedDate) return;
//       const dateStr = selectedDate.toISOString().slice(0, 10);
//       try {
//         const res = await api.get<{
//           message: string;
//           slots: Array<{
//             _id: string;
//             doctorId: string;
//             date: string;
//             slots: Slot[];
//           }>;
//         }>(`/api/patient/slots/${doctor._id}/${dateStr}`);

//         if (res.data.slots?.length > 0) {
//           const allSlots = res.data.slots[0].slots; // include inactive slots
//   setSlots(allSlots);
//         } else {
//           setSlots([]);
//         }
//       } catch (err) {
//         console.error("Failed to fetch slots", err);
//         setSlots([]);
//       }
//     };

//     fetchSlots();
//   }, [doctor, selectedDate]);

//   const handleBook = async () => {
//     const token = document.cookie
//       .split("; ")
//       .find((row) => row.startsWith("patientToken="))
//       ?.split("=")[1];
//     const payloadBase64 = token?.split(".")[1];
//     const pay = payloadBase64 ? JSON.parse(atob(payloadBase64)) : null;
//     const patientId = pay?.id;

//     if (!token) {
//       alert("Please login to book an appointment.");
//       window.location.href = "/patient-login";
//       return;
//     }
//     if (!doctor || !selectedDate || !selectedTime) {
//       alert("Please choose date and time slot.");
//       return;
//     }
//     const selectedSlotId = slots.find((s) => s.time === selectedTime)?._id;

//     setBookingLoading(true);

//     const bookingPayload = {
//       doctorId: doctor._id,
//       patientId: patientId,
//       mode: mode,
//       datetime: `${selectedDate.toISOString().slice(0, 10)}T${selectedTime}:00Z`,
//       fees: doctor.fees ?? 0,
//       slotId: selectedSlotId,
//       createdAt: new Date().toISOString(),
//     };

//     try {
//       await api.post("/api/booking/book", bookingPayload);
//       setSuccessMsg("Appointment booked successfully!");
//       onBooked?.(bookingPayload);
//       setTimeout(() => {
//         setBookingLoading(false);
//         onClose();
//       }, 900);
//     } catch (err) {
//       console.error("Booking error", err);
//       alert("Could not book appointment. Try again.");
//       setBookingLoading(false);
//     }
//   };

//   if (!doctor) return null;

//   return (
//     <div
//       className={`fixed inset-0 z-50 flex items-center justify-center transition-all ${
//         open ? "pointer-events-auto" : "pointer-events-none"
//       }`}
//       aria-hidden={!open}
//     >
//       {/* Dark overlay */}
//       <div
//         className={`absolute inset-0 bg-black/50 transition-opacity ${
//           open ? "opacity-100" : "opacity-0"
//         }`}
//         onClick={() => !bookingLoading && onClose()}
//       />

//       {/* Modal content */}
//       <div
//         className={`relative bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 transform transition-all duration-300 ${
//           open ? "scale-100 opacity-100" : "scale-95 opacity-0"
//         }`}
//       >
//         {/* Header */}
//         <div className="p-5 border-b flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             {doctor.photo ? (
//               <img
//                 src={doctor.photo}
//                 alt={doctor.fullName}
//                 className="h-12 w-12 rounded-full object-cover"
//               />
//             ) : (
//               <div className="h-12 w-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
//                 {doctor.fullName.charAt(0)}
//               </div>
//             )}
//             <div>
//               <div className="font-semibold text-lg">{doctor.fullName}</div>
//               <div className="text-sm text-gray-500">{doctor.specialization}</div>
//             </div>
//           </div>
//           <button
//             onClick={() => !bookingLoading && onClose()}
//             className="text-gray-600 hover:bg-gray-100 rounded p-2"
//           >
//             <X />
//           </button>
//         </div>

//         <div className="p-5 space-y-4 max-h-[80vh] overflow-y-auto">
//           {/* Mode */}
//           <div className="flex gap-3 mb-4">
//             <button
//               onClick={() => setMode("online")}
//               className={`flex-1 px-4 py-2 rounded-lg flex items-center justify-center gap-2 border ${
//                 mode === "online"
//                   ? "bg-green-600 text-white border-green-600"
//                   : "bg-white text-gray-700"
//               }`}
//             >
//               <Video className="w-4 h-4" /> Online
//             </button>
//             <button
//               onClick={() => setMode("offline")}
//               className={`flex-1 px-4 py-2 rounded-lg flex items-center justify-center gap-2 border ${
//                 mode === "offline"
//                   ? "bg-blue-600 text-white border-blue-600"
//                   : "bg-white text-gray-700"
//               }`}
//             >
//               <Phone className="w-4 h-4" /> Offline
//             </button>
//           </div>

//           {/* Month navigation */}
//           <div className="flex justify-between items-center mb-2">
//             <button
//               onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}
//               className="px-2 py-1 border rounded"
//             >
//               Prev
//             </button>
//             <div className="font-semibold">
//               {currentMonth.toLocaleString("default", { month: "long", year: "numeric" })}
//             </div>
//             <button
//               onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
//               className="px-2 py-1 border rounded"
//             >
//               Next
//             </button>
//           </div>

//           {/* Date carousel */}
//           <div className="flex gap-2 overflow-x-auto mb-4">
//             {days.map((d) => {
//               const key = d.toISOString().slice(0, 10);
//               const active =
//                 selectedDate && selectedDate.toISOString().slice(0, 10) === key;
//               return (
//                 <button
//                   key={key}
//                   onClick={() => {
//                     setSelectedDate(d);
//                     setSelectedTime(null);
//                   }}
//                   className={`min-w-[72px] flex-shrink-0 rounded-lg p-3 text-center border ${
//                     active ? "bg-blue-600 text-white" : "bg-white text-gray-800 hover:shadow"
//                   }`}
//                 >
//                   <div className="text-xs">{formatDayShort(d)}</div>
//                   <div className="text-lg font-semibold">{formatDateNumber(d)}</div>
//                 </button>
//               );
//             })}
//           </div>
//           {/* Slots */}

// <div>
//   <div className="text-sm font-medium mb-2">Available Slots</div>
//   <div className="grid grid-cols-3 gap-2">
//     {slots.length === 0 ? (
//       <div className="col-span-3 text-gray-500">No slots available</div>
//     ) : (
//       slots.map((slot) => {
//         const isBooked = !slot.isActive;
//         return (
//           <button
//             key={slot._id}
//             onClick={() => !isBooked && setSelectedTime(slot.time)}
//             className={`relative p-2 rounded border text-sm w-full ${
//               selectedTime === slot.time ? "bg-blue-600 text-white" : "bg-white text-gray-800 hover:shadow"
//             } ${isBooked ? "bg-gray-200 text-gray-400 cursor-not-allowed" : ""}`}
//             disabled={isBooked}
//           >
//             {slot.time}
//             {/* Red diagonal cross over booked slot */}
//            {isBooked && (
//   <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
//     {/* Use two thin red spans forming the cross */}
//     <span className="absolute w-[2px] h-full bg-red-600 rotate-45 origin-center"></span>
//     <span className="absolute w-[2px] h-full bg-red-600 -rotate-45 origin-center"></span>
//   </span>
// )}

//           </button>
//         );
//       })
//     )}
//   </div>
// </div>




//           {/* Price & Book */}
//           <div className="pt-3 border-t flex items-center justify-between">
//             <div>
//               <div className="text-sm text-gray-500">Price</div>
//               <div className="text-xl font-bold">₹ {doctor.fees ?? 0}</div>
//             </div>
//             <button
//               onClick={handleBook}
//               disabled={bookingLoading}
//               className="px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow hover:from-blue-700 disabled:opacity-60"
//             >
//               {bookingLoading ? "Booking..." : "Continue"}
//             </button>
//           </div>

//           {successMsg && <div className="mt-2 text-green-600">{successMsg}</div>}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookingDrawer;



import React, { useEffect, useMemo, useState } from "react";
import { X, Video, Phone } from "lucide-react";
import { formatDayShort, formatDateNumber } from "../utils/date.js";
import api from "../api/client";
import { addMonths, startOfMonth, endOfMonth } from "date-fns";

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

type BookingDrawerVariant = "modal" | "sidebar";

interface Props {
  doctor: DoctorForBooking | null;
  open: boolean; // modal visibility
  onClose: () => void;
  onBooked?: (bookingInfo: any) => void;
  variant?: BookingDrawerVariant; // modal or sidebar
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
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const isModal = variant === "modal";

  // Generate all days in current month
  // const days = useMemo(() => {
  //   const start = startOfMonth(currentMonth);
  //   const end = endOfMonth(currentMonth);
  //   const arr: Date[] = [];
  //   for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
  //     arr.push(new Date(d));
  //   }
  //   return arr;
  // }, [currentMonth]);

  // Generate all days in current month safely (local time)
const days = useMemo(() => {
  const start = startOfMonth(currentMonth);
  const end = endOfMonth(currentMonth);
  const arr: Date[] = [];

  let d = new Date(start); // clone start date
  while (d <= end) {
    arr.push(new Date(d)); // push a fresh Date object
    d.setDate(d.getDate() + 1); // increment day
  }

  return arr;
}, [currentMonth]);

// Local date formatter (yyyy-mm-dd)
const formatDate = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate()
  ).padStart(2, "0")}`;


  // Reset selection when doctor changes
  useEffect(() => {
    if (!doctor) return;
    setMode("online");
    setSelectedDate(new Date());
    setSelectedTime(null);
    setSlots([]);
  }, [doctor]);

  // Fetch slots
  useEffect(() => {
    const fetchSlots = async () => {
      if (!doctor || !selectedDate) return;
     
      const dateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`;

      console.log("Fetching slots for", doctor._id, dateStr);
      try {
        const res = await api.get<{
          message: string;
          slots: Array<{
            _id: string;
            doctorId: string;
            date: string;
            slots: Slot[];
          }>;
        }>(`/api/patient/slots/${doctor._id}/${dateStr}`);

      
        if (res.data.slots?.length > 0) {
          const allSlots = res.data.slots[0].slots;
          setSlots(allSlots);
        } else {
          setSlots([]);
        }
      } catch (err) {
        console.error("Failed to fetch slots", err);
        setSlots([]);
      }
    };
    fetchSlots();
  }, [doctor, selectedDate]);

  const handleBook = async () => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("patientToken="))
      ?.split("=")[1];
    const payloadBase64 = token?.split(".")[1];
    const pay = payloadBase64 ? JSON.parse(atob(payloadBase64)) : null;
    const patientId = pay?.id;

    if (!token) {
      alert("Please login to book an appointment.");
      window.location.href = "/patient-login";
      return;
    }
    if (!doctor || !selectedDate || !selectedTime) {
      alert("Please choose date and time slot.");
      return;
    }
    const selectedSlotId = slots.find((s) => s.time === selectedTime)?._id;

    setBookingLoading(true);

    const bookingPayload = {
      doctorId: doctor._id,
      patientId: patientId,
      mode: mode,
      datetime: `${selectedDate.toISOString().slice(0, 10)}T${selectedTime}:00Z`,
      fees: doctor.fees ?? 0,
      slotId: selectedSlotId,
      createdAt: new Date().toISOString(),
    };

    try {
      await api.post("/api/booking/book", bookingPayload);
      setSuccessMsg("Appointment booked successfully!");
      onBooked?.(bookingPayload);
      setTimeout(() => {
        setBookingLoading(false);
        if (isModal) onClose();
      }, 900);
    } catch (err) {
      console.error("Booking error", err);
      alert("Could not book appointment. Try again.");
      setBookingLoading(false);
    }
  };

  if (!doctor) return null;

  return (
    <div
      className={`${
        isModal ? "fixed inset-0 z-50 flex items-center justify-center" : "w-full"
      }`}
    >
      {/* Overlay for modal only */}
      {isModal && (
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => !bookingLoading && onClose()}
        />
      )}

      {/* Drawer Content */}
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
        alt={doctor?.fullName}
           className="h-28 w-28 rounded-full object-cover shadow mx-auto md:mx-0"/>
            ) : (
              <div className="h-12 w-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                {doctor.fullName.charAt(0)}
              </div>
            )}
            <div>
              <div className="font-semibold text-lg">{doctor.fullName}</div>
              <div className="text-sm text-gray-500">{doctor.specialization}</div>
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
            <button
              onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}
              className="px-2 py-1 border rounded"
            >
              Prev
            </button>
            <div className="font-semibold">
              {currentMonth.toLocaleString("default", { month: "long", year: "numeric" })}
            </div>
            <button
              onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              className="px-2 py-1 border rounded"
            >
              Next
            </button>
          </div>

          {/* Date Carousel */}
          <div className="flex gap-2 mt-1 overflow-x-auto mb-4">
           

            {days.map((d) => {
  const key = formatDate(d); // local date string
  const active = selectedDate && formatDate(selectedDate) === key;

  return (
    <button
      key={key}
      onClick={() => {
        setSelectedDate(d);
        setSelectedTime(null);
      }}
      className={`min-w-[72px] flex-shrink-0 rounded-lg p-3 text-center border ${
        active ? "bg-blue-600 text-white" : "bg-white text-gray-800 hover:shadow"
      }`}
    >
      <div className="text-xs">{formatDayShort(d)}</div>
      <div className="text-lg font-semibold">{formatDateNumber(d)}</div>
    </button>
  );
})}

          </div>

          {/* Slots */}
          <div>
            <div className="text-sm font-medium mb-2">Available Slots</div>
            <div className="grid grid-cols-3 gap-2">
              {slots.length === 0 ? (
                <div className="col-span-3 text-gray-500">No slots available</div>
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
                      } ${isBooked ? "bg-gray-200 text-gray-400 cursor-not-allowed" : ""}`}
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

          {/* Price & Book */}
          <div className="pt-3 border-t flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Price</div>
              <div className="text-xl font-bold">₹ {doctor.fees ?? 0}</div>
            </div>
            <button
              onClick={handleBook}
              disabled={bookingLoading}
              className="px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow hover:from-blue-700 disabled:opacity-60"
            >
              {bookingLoading ? "Booking..." : "Continue"}
            </button>
          </div>

          {successMsg && <div className="mt-2 text-green-600">{successMsg}</div>}
        </div>
      </div>
    </div>
  );
};

export default BookingDrawer;
