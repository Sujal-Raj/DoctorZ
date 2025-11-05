

import React, { useRef, useState, useEffect } from "react";
import EmrForAppointment from "./EmrForAppoinment";
import type { EmrHandle } from "./EmrForAppoinment";

interface AppointmentFormProps {
  onSubmit: (data: {
    name: string;
    age: number;
    gender: "Male" | "Female" | "Other";
    aadhar: string;
    contact: string;
    emrId?: string;
  }) => void;
  doctorId?: string; // can be passed from modal
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ onSubmit, doctorId }) => {
  const emrRef = useRef<EmrHandle>(null);

  const [name, setName] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [gender, setGender] = useState<"Male" | "Female" | "Other">("Male");
  const [aadhar, setAadhar] = useState("");
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const [localDoctorId, setLocalDoctorId] = useState<string>("");
  const [patientId, setPatientId] = useState<string | null>(null);

  useEffect(() => {
    // Prefer doctorId prop if passed from modal
    if (doctorId) {
      setLocalDoctorId(doctorId);
      console.log("✅ Using doctorId from props:", doctorId);
    } else {
      const storedDoctorId = localStorage.getItem("doctorId");
      if (storedDoctorId) {
        setLocalDoctorId(storedDoctorId);
        console.log("✅ Loaded doctorId from localStorage:", storedDoctorId);
      } else {
        alert("Doctor ID missing. Please login again.");
      }
    }

    const storedPatientId = localStorage.getItem("userId");
    if (storedPatientId) setPatientId(storedPatientId);
  }, [doctorId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !age || !aadhar || !contact) {
      setMessage("⚠️ Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);
      setMessage(null);

      // 🔹 Create EMR first (from child component)
      const emrData = (await emrRef.current?.submitEmr()) || null;
      const emrId = emrData?._id;

      // 🔹 Pass patient + EMR data to parent (BookingDrawer or similar)
      onSubmit({
        name,
        age: Number(age),
        gender,
        aadhar,
        contact,
        emrId,
      });

      // Reset fields
      setName("");
      setAge("");
      setGender("Male");
      setAadhar("");
      setContact("");
    } catch (err) {
      console.error("❌ Error submitting appointment:", err);
      setMessage("❌ Something went wrong while submitting.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 p-6 bg-white rounded-2xl shadow-lg w-full max-w-sm"
    >
      <h1 className="text-2xl font-semibold text-gray-800 text-center mb-3">
        Appointment Form
      </h1>

      {message && (
        <div
          className={`p-2 text-center rounded ${
            message.includes("⚠️")
              ? "bg-yellow-100 text-yellow-800"
              : message.includes("❌")
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {message}
        </div>
      )}

      {/* Patient details section */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-600">
          Patient Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter patient name"
          required
        />
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-600">Age</label>
        <input
          type="number"
          value={age}
          onChange={(e) =>
            setAge(e.target.value ? Number(e.target.value) : "")
          }
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter age"
          required
        />
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-600">Gender</label>
        <select
          value={gender}
          onChange={(e) =>
            setGender(e.target.value as "Male" | "Female" | "Other")
          }
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-600">
          Aadhar Number
        </label>
        <input
          type="text"
          value={aadhar}
          onChange={(e) => setAadhar(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Aadhar number"
          required
        />
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-600">
          Contact Number
        </label>
        <input
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter contact number"
          required
        />
      </div>

      {/* 🔹 Embedded EMR Form */}
      <div className="border-t border-gray-200 pt-4 mt-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">EMR Details</h2>
        <EmrForAppointment
          ref={emrRef}
          doctorId={localDoctorId}
          patientId={patientId}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 rounded-lg font-medium text-lg transition ${
          loading
            ? "bg-gray-400 text-white"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default AppointmentForm;
