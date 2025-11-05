


import React from "react";
import { X } from "lucide-react";
import AppointmentForm from "../pages/AppointmentForm";

interface AppointmentFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    age: number;
    gender: "Male" | "Female" | "Other";
    aadhar: string;
    contact: string;
    emrId?: string;
  }) => void;
  doctorId?: string;
  selectedDate?: string;
  selectedTime?: string;
}

const AppointmentFormModal: React.FC<AppointmentFormModalProps> = ({
  open,
  onClose,
  onSubmit,
  doctorId,
  selectedDate,
  selectedTime,
}) => {
  if (!open) return null;

  const handleClick = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        onClick={handleClick}
        className="relative bg-white rounded-2xl shadow-lg p-6 w-full max-w-2xl mx-4"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <X size={22} />
        </button>

        <h2 className="text-xl font-semibold text-center mb-4 text-gray-800">
          Book Your Appointment
        </h2>

        {/* Display Info */}
        {(doctorId || selectedDate || selectedTime) && (
          <div className="text-center text-sm text-gray-600 mb-4">
            {doctorId && <p><strong>Doctor:</strong> {doctorId}</p>}
            {selectedDate && <p><strong>Date:</strong> {selectedDate}</p>}
            {selectedTime && <p><strong>Time:</strong> {selectedTime}</p>}
          </div>
        )}

        <AppointmentForm onSubmit={onSubmit}  doctorId={doctorId}/>
      </div>
    </div>
  );
};

export default AppointmentFormModal;
