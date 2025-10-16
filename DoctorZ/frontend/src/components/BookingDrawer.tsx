


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

type BookingDrawerVariant = "modal" | "sidebar";

interface Props {
  doctor: DoctorForBooking | null;
  open: boolean;
  onClose: () => void;
  onBooked?: (bookingInfo: unknown) => void;
  variant?: BookingDrawerVariant;
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
  // const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showForm, setShowForm] = useState(false);

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

  const formatDate = (date: Date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;

  useEffect(() => {
    if (!doctor) return;
    setMode("online");
    setSelectedDate(new Date());
    setSelectedTime(null);
    setSlots([]);
    setShowForm(false);
  }, [doctor]);

  useEffect(() => {
    const fetchSlots = async () => {
      if (!doctor || !selectedDate) return;

      const dateStr = formatDate(selectedDate);
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
          setSlots(res.data.slots[0].slots);
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
      slotId: selectedSlotId,
      patient: formData,
      createdAt: new Date().toISOString(),
    };
    console.log(bookingPayload);

    try {
      
      await api.post("/api/booking/book", bookingPayload);
      Swal.fire({
        icon: "success",
        title: "Appointment Booked!",
        text: `Your appointment with Dr. ${doctor.fullName} has been booked successfully.`,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      }).then(() => {
        onBooked?.(bookingPayload);
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
      {/* {isModal && (
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => !bookingLoading && onClose()}
        />
      )} */}

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
              <button
                onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}
                className="px-2 py-1 border rounded"
              >
                Prev
              </button>
              <div className="font-semibold">
                {currentMonth.toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                })}
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
                const key = formatDate(d);
                const active = selectedDate && formatDate(selectedDate) === key;

                return (
                  <button
                    key={key}
                    onClick={() => {
                      setSelectedDate(d);
                      setSelectedTime(null);
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
          />
        </div>
      </div>
    </div>
  );
};

export default BookingDrawer;

// import React, { useEffect, useMemo, useState } from "react";
// import { X, Video, Phone } from "lucide-react";
// import { formatDayShort, formatDateNumber } from "../utils/date.js";
// import api from "../api/client";
// import { addMonths, startOfMonth, endOfMonth } from "date-fns";

// import AppointmentFormModal from "./AppointmentFormModal.js";
// import Swal from "sweetalert2";

// interface AppointmentFormData {
//   name: string;
//   age: number;
//   gender: "Male" | "Female" | "Other";
//   aadhar: string;
//   contact: string;
//   address: {
//     city: string;
//     state: string;
//     pincode: string;
//   };
// }

// interface AppointmentFormModalProps {
//   open: boolean;
//   onClose: () => void;
//   onSubmit: (data: AppointmentFormData) => void;  // Update here
// }


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

// interface PatientRegisterResponse {
//   message: string;
//   patient: {
//     _id: string;
//     name: string;
//     age: number;
//     gender: string;
//     aadhar: string;
//     contact: string;
//   };
// }

// type BookingDrawerVariant = "modal" | "sidebar";

// interface Props {
//   doctor: DoctorForBooking | null;
//   open: boolean;
//   onClose: () => void;
//   onBooked?: (bookingInfo: unknown) => void;
//   variant?: BookingDrawerVariant;
// }

// const BookingDrawer: React.FC<Props> = ({
//   doctor,
//   open,
//   onClose,
//   onBooked,
//   variant = "modal",
// }) => {
//   const [mode, setMode] = useState<"online" | "offline">("online");
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null);
//   const [selectedTime, setSelectedTime] = useState<string | null>(null);
//   const [bookingLoading, setBookingLoading] = useState(false);
//   const [slots, setSlots] = useState<Slot[]>([]);
//   const [currentMonth, setCurrentMonth] = useState(new Date());
//   const [showForm, setShowForm] = useState(false);

//   const isModal = variant === "modal";

//   // Generate days of current month
//   const days = useMemo(() => {
//     const start = startOfMonth(currentMonth);
//     const end = endOfMonth(currentMonth);
//     const arr: Date[] = [];
//     const d = new Date(start);
//     while (d <= end) {
//       arr.push(new Date(d));
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

//   useEffect(() => {
//     const fetchSlots = async () => {
//       if (!doctor || !selectedDate) return;

//       const dateStr = formatDate(selectedDate);
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
//           setSlots(res.data.slots[0].slots);
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

//   const handleBook = async (formData: {
//     name: string;
//     age: number;
//     gender: "Male" | "Female" | "Other";
//     aadhar: string;
//     contact: string;
//     address: {
//       city: string;
//       state: string;
//       pincode: string;
//     };
//   }) => {
//     if (!doctor || !selectedDate || !selectedTime) {
//       alert("Invalid booking data.");
//       return;
//     }

//     // Find slot ID for selected time
//     const selectedSlotId = slots.find((s) => s.time === selectedTime)?._id;

//     if (!selectedSlotId) {
//       alert("Selected slot is invalid.");
//       return;
//     }

//     setBookingLoading(true);

//     try {
//       // STEP 1: Register patient with full formData including address
//       const registerRes = await api.post<PatientRegisterResponse>(
//         "/api/patient/register",
//         formData
//       );
//       const patientId = registerRes.data?.patient?._id;

//       if (!patientId) {
//         throw new Error("Failed to register patient.");
//       }

//       // STEP 2: Prepare booking payload and send booking request
//       const bookingPayload = {
//         doctorId: doctor._id,
//         patientId,
//         mode,
//         datetime: `${selectedDate.toISOString().slice(0, 10)}T${selectedTime}:00Z`,
//         fees: doctor.fees ?? 0,
//         slotId: selectedSlotId,
//         createdAt: new Date().toISOString(),
//       };

//       await api.post("/api/booking/book", bookingPayload);

//       Swal.fire({
//         icon: "success",
//         title: "Appointment Booked!",
//         text: `Your appointment with Dr. ${doctor.fullName} has been booked successfully.`,
//         confirmButtonColor: "#3085d6",
//         confirmButtonText: "OK",
//       }).then(() => {
//         onBooked?.(bookingPayload);
//         setBookingLoading(false);
//         onClose();
//       });
//     } catch (err) {
//       console.error("Booking error", err);
//       Swal.fire({
//         icon: "error",
//         title: "Booking Failed",
//         text: "Could not book appointment. Try again.",
//         confirmButtonColor: "#d33",
//       });
//       setBookingLoading(false);
//     }
//   };

//   if (!doctor) return null;

//   return (
//     <div
//       className={`${
//         isModal
//           ? "fixed inset-0 z-50 flex items-center justify-center"
//           : "w-full"
//       }`}
//     >
//       {isModal && (
//         <div
//           className={`absolute inset-0 bg-black/50 transition-opacity ${
//             open ? "opacity-100" : "opacity-0"
//           }`}
//           onClick={() => !bookingLoading && onClose()}
//         />
//       )}

//       <div
//         className={`relative bg-white rounded-xl shadow p-5 ${
//           isModal
//             ? "max-w-md mx-4 transform transition-all duration-300 " +
//               (open ? "scale-100 opacity-100" : "scale-95 opacity-0")
//             : ""
//         }`}
//       >
//         {/* Header */}
//         <div className="p-2 border-b flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             {doctor.photo ? (
//               <img
//                 src={`http://localhost:3000/uploads/${doctor.photo}`}
//                 alt={doctor.fullName}
//                 className="h-28 w-28 rounded-full object-cover shadow mx-auto md:mx-0"
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
//           {isModal && (
//             <button
//               onClick={() => !bookingLoading && onClose()}
//               className="text-gray-600 hover:bg-gray-100 rounded p-2"
//             >
//               <X />
//             </button>
//           )}
//         </div>

//         <div className="p-2 space-y-4 max-h-[80vh] overflow-y-auto">
//           <>
//             {/* Mode Selection */}
//             <div className="flex gap-3 mb-4">
//               <button
//                 onClick={() => setMode("online")}
//                 className={`flex-1 px-4 py-2 rounded-lg flex items-center justify-center gap-2 border ${
//                   mode === "online"
//                     ? "bg-green-600 text-white border-green-600"
//                     : "bg-white text-gray-700"
//                 }`}
//               >
//                 <Video className="w-4 h-4" /> Online
//               </button>
//               <button
//                 onClick={() => setMode("offline")}
//                 className={`flex-1 px-4 py-2 rounded-lg flex items-center justify-center gap-2 border ${
//                   mode === "offline"
//                     ? "bg-blue-600 text-white border-blue-600"
//                     : "bg-white text-gray-700"
//                 }`}
//               >
//                 <Phone className="w-4 h-4" /> Offline
//               </button>
//             </div>

//             {/* Month Navigation */}
//             <div className="flex justify-between items-center mb-2">
//               <button
//                 onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}
//                 className="px-2 py-1 border rounded"
//               >
//                 Prev
//               </button>
//               <div className="font-semibold">
//                 {currentMonth.toLocaleString("default", {
//                   month: "long",
//                   year: "numeric",
//                 })}
//               </div>
//               <button
//                 onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
//                 className="px-2 py-1 border rounded"
//               >
//                 Next
//               </button>
//             </div>

//             {/* Date Carousel */}
//             <div className="flex gap-2 mt-1 overflow-x-auto mb-4">
//               {days.map((d) => {
//                 const key = formatDate(d);
//                 const active = selectedDate && formatDate(selectedDate) === key;

//                 return (
//                   <button
//                     key={key}
//                     onClick={() => {
//                       setSelectedDate(d);
//                       setSelectedTime(null);
//                     }}
//                     className={`min-w-[72px] flex-shrink-0 rounded-lg p-3 text-center border ${
//                       active
//                         ? "bg-blue-600 text-white"
//                         : "bg-white text-gray-800 hover:shadow"
//                     }`}
//                   >
//                     <div className="text-xs">{formatDayShort(d)}</div>
//                     <div className="text-lg font-semibold">{formatDateNumber(d)}</div>
//                   </button>
//                 );
//               })}
//             </div>

//             {/* Slots */}
//             <div>
//               <div className="text-sm font-medium mb-2">Available Slots</div>
//               <div className="grid grid-cols-3 gap-2">
//                 {slots.length === 0 ? (
//                   <div className="col-span-3 text-gray-500">No slots available</div>
//                 ) : (
//                   slots.map((slot) => {
//                     const isBooked = !slot.isActive;
//                     return (
//                       <button
//                         key={slot._id}
//                         onClick={() => !isBooked && setSelectedTime(slot.time)}
//                         className={`relative p-2 rounded border text-sm w-full ${
//                           selectedTime === slot.time
//                             ? "bg-blue-600 text-white"
//                             : "bg-white text-gray-800 hover:shadow"
//                         } ${
//                           isBooked
//                             ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                             : ""
//                         }`}
//                         disabled={isBooked}
//                       >
//                         {slot.time}
//                         {isBooked && (
//                           <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
//                             <span className="absolute w-[2px] h-full bg-red-600 rotate-45 origin-center"></span>
//                             <span className="absolute w-[2px] h-full bg-red-600 -rotate-45 origin-center"></span>
//                           </span>
//                         )}
//                       </button>
//                     );
//                   })
//                 )}
//               </div>
//             </div>

//             {/* Continue Button */}
//             {selectedTime && (
//               <button
//                 onClick={() => setShowForm(true)}
//                 className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//               >
//                 Continue
//               </button>
//             )}
//           </>

//           <AppointmentFormModal
//             open={showForm}
//             onClose={() => setShowForm(false)}
//             onSubmit={handleBook}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookingDrawer;
