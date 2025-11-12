

import React, { useState } from "react";
import { createEMR } from "../Services/emrApi";
import { bookAppointment } from "../Services/bookingApi";
import { useNavigate } from "react-router-dom";

interface TimeSlot {
  _id: string;
  time: string;
  isActive: boolean;
}


interface AppointmentFormProps {
  doctorId?: string;
  selectedDate?: string;
  selectedTime?: string;
  selectedSlot?:TimeSlot;
  onClose: () => void;
  
  onSubmit?: (formData: {
    name: string;
    age: number;
    gender: "Male" | "Female" | "Other";
    aadhar: string;
    contact: string;
  }) => Promise<void>;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({
  doctorId,
  selectedDate,
  selectedTime,
  selectedSlot,
  onClose,
}) => {
  const [relation, setRelation] = useState<"self" | "relative">("self");
  
  const [name, setName] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [gender, setGender] = useState<"Male" | "Female" | "Other">("Male");
  const [aadhar, setAadhar] = useState("");
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // EMR fields
  const [allergies, setAllergies] = useState("");
  const [diseases, setDiseases] = useState("");
  const [pastSurgeries, setPastSurgeries] = useState("");
  const [currentMedications, setCurrentMedications] = useState("");

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ Get logged-in user from localStorage
      const storedUser = localStorage.getItem("user");
      const user = storedUser ? JSON.parse(storedUser) : null;

      console.log("👤 Logged-in user:", user);

      if (!user || !user._id) {
        alert("⚠️ Please login before booking an appointment.");
        setLoading(false);
        return;
      }

      if (!selectedSlot || !selectedSlot._id) {
        alert("⚠️ Please select a valid time slot before booking.");
        setLoading(false);
        return;
      }

      // ✅ Prepare patient data
      let patientData = {
        name,
        age: Number(age),
        gender,
        aadhar: Number(aadhar),
        contact,
      };

      if (relation === "self") {
        patientData = {
          name: user.name,
          age: user.age ,
          gender: user.gender,
          aadhar: Number(user.aadhar),
          contact: user.contact,
        };
      }

      
      // ✅ Prepare booking payload
      const bookingPayload = {
        doctorId,
        userId: user._id,
        slot: selectedTime,
        slotId : selectedSlot._id, // ✅ connect to TimeSlot model
        dateTime: selectedDate,
        patient: patientData,
        mode: "online", // or "offline" as per your backend
        fees: 500, // example fixed fee; adjust if needed
      };
      
      console.log("📦 Booking payload:", bookingPayload);


      if(relation==="relative"){
        // ✅ Prepare EMR JSON data
      const emrData = {
        doctorId,
        patientId: user._id,
        aadhar: patientData.aadhar || 0,
        allergies: allergies
          ? allergies.split(",").map((a) => a.trim())
          : [],
        diseases: diseases
          ? diseases.split(",").map((d) => d.trim())
          : [],
        pastSurgeries: pastSurgeries
          ? pastSurgeries.split(",").map((p) => p.trim())
          : [],
        currentMedications: currentMedications
          ? currentMedications.split(",").map((m) => m.trim())
          : [],
      };

      console.log("📦 EMR payload being sent:", emrData);

      // ✅ Create EMR
      const emrRes = await createEMR(emrData);
      console.log("🩺 EMR Created:", emrRes);

      }

      // ✅ Book appointment
      const bookingRes = await bookAppointment(bookingPayload);
      console.log("📅 Appointment booked:", bookingRes.data);

      
      alert("✅ Appointment and EMR created successfully!");
      navigate("/all-doctors");

      onClose();
    } catch (err) {
      console.error("❌ Error:", err);
      alert("Failed to create EMR or book appointment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleBook}
      className="space-y-4 p-4 bg-white rounded-lg shadow-md"
    >
      {/* Relation selector */}
      <div>
        <label className="font-medium">Booking for:</label>
        <select
          value={relation}
          onChange={(e) => setRelation(e.target.value as "self" | "relative")}
          className="border p-2 rounded w-full"
        >
          <option value="self">Self</option>
          <option value="relative">Relative</option>
        </select>
      </div>

      {/* Relative Fields */}
      {relation === "relative" && (
        <>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 rounded w-full"
              required
            />
          </div>

          <div>
            <label>Age:</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="border p-2 rounded w-full"
              required
            />
          </div>

          <div>
            <label>Gender:</label>
            <select
              value={gender}
              onChange={(e) =>
                setGender(e.target.value as "Male" | "Female" | "Other")
              }
              className="border p-2 rounded w-full"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label>Aadhaar Number:</label>
            <input
              type="text"
              value={aadhar}
              onChange={(e) => setAadhar(e.target.value)}
              className="border p-2 rounded w-full"
              required
            />
          </div>

          <div>
            <label>Contact:</label>
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="border p-2 rounded w-full"
              required
            />
          </div>

          <h1 className="text-2xl font-semibold mt-4 mb-2">
            Add EMR (optional)
          </h1>

          <div>
            <label>Allergies (comma separated):</label>
            <input
              type="text"
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
              className="border p-2 rounded w-full"
            />
          </div>

          <div>
            <label>Diseases (comma separated):</label>
            <input
              type="text"
              value={diseases}
              onChange={(e) => setDiseases(e.target.value)}
              className="border p-2 rounded w-full"
            />
          </div>

          <div>
            <label>Past Surgeries (comma separated):</label>
            <input
              type="text"
              value={pastSurgeries}
              onChange={(e) => setPastSurgeries(e.target.value)}
              className="border p-2 rounded w-full"
            />
          </div>

          <div>
            <label>Current Medications (comma separated):</label>
            <input
              type="text"
              value={currentMedications}
              onChange={(e) => setCurrentMedications(e.target.value)}
              className="border p-2 rounded w-full"
            />
          </div>
        </>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        {loading ? "Processing..." : "Book Appointment"}
      </button>
    </form>
  );
};

export default AppointmentForm;

