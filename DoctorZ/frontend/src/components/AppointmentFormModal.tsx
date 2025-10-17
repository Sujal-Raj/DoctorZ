import React from "react";
import { X } from "lucide-react";
import AppointmentForm from "../pages/AppointmentForm";

interface AppointmentFormProps {
  onSubmit: (data: {
    name: string;
    age: number;
    gender: "Male" | "Female" | "Other";
    aadhar: string;
    contact: string;
  }) => void;
}

interface FormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: AppointmentFormProps["onSubmit"];
}

const AppointmentFormModal: React.FC<FormModalProps> = ({ open, onClose, onSubmit }) => {
  if (!open) return null;

  // Prevent modal content click from closing the modal
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center ">
      {/* Overlay */}
      <div
    className="absolute inset-0 bg-black/50 backdrop-blur-sm"
    onClick={onClose}
  />
      {/* Modal content */}
      <div
        className="relative bg-white rounded-xl shadow-lg p-6 w-full max-w-md mx-4 animate-fadeIn"
        onClick={handleContentClick}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          aria-label="Close"
        >
          <X size={20} />
        </button>

       
        <AppointmentForm onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default AppointmentFormModal;
