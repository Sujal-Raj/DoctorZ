import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

interface AppointmentFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (formData: {
    name: string;
    age: number;
    gender: "Male" | "Female" | "Other";
    aadhar: string;
    contact: string;
    allergies?: string[];
    diseases?: string[];
    pastSurgeries?: string[];
    currentMedications?: string[];
    reports?: FileList | null;
    relation: "self" | "relative";
  }) => Promise<void> | void;
  loading: boolean;
}

const AppointmentFormModal: React.FC<AppointmentFormModalProps> = ({
  open,
  onClose,
  onSubmit,
  loading,
}) => {
  const [relation, setRelation] = useState<"self" | "relative">("self");

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "Male" as "Male" | "Female" | "Other",
    aadhar: "",
    contact: "",
    allergies: "",
    diseases: "",
    pastSurgeries: "",
    currentMedications: "",
    reports: null as FileList | null,
  });

  // Auto-fill for self user
  useEffect(() => {
    if (relation === "self") {
      const token = document.cookie
        .split("; ")
        .find((r) => r.startsWith("patientToken="))
        ?.split("=")[1];

      if (token) {
        try {
          const payload = JSON.parse(atob(token.split(".")[1]));
          setFormData((prev) => ({
            ...prev,
            name: payload.name || "",
            age: payload.age?.toString() || "",
            gender: payload.gender || "Male",
            aadhar: payload.aadhar || "",
            contact: payload.mobileNumber || "",
          }));
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      }
    } else {
      setFormData({
        name: "",
        age: "",
        gender: "Male",
        aadhar: "",
        contact: "",
        allergies: "",
        diseases: "",
        pastSurgeries: "",
        currentMedications: "",
        reports: null,
      });
    }
  }, [relation]);

  if (!open) return null;

  // Handle text + file inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (e.target.type === "file") {
      setFormData({
        ...formData,
        reports: (e.target as HTMLInputElement).files,
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedData = {
      ...formData,
      age: Number(formData.age),
      allergies: formData.allergies
        ? formData.allergies.split(",").map((a) => a.trim())
        : [],
      diseases: formData.diseases
        ? formData.diseases.split(",").map((d) => d.trim())
        : [],
      pastSurgeries: formData.pastSurgeries
        ? formData.pastSurgeries.split(",").map((p) => p.trim())
        : [],
      currentMedications: formData.currentMedications
        ? formData.currentMedications.split(",").map((m) => m.trim())
        : [],
      reports: formData.reports,
      relation,
    };

    onSubmit(formattedData);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6 relative overflow-y-auto max-h-[90vh]">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Book Appointment
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Booking For */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Booking For
            </label>
            <select
              value={relation}
              onChange={(e) =>
                setRelation(e.target.value as "self" | "relative")
              }
              className="w-full border border-gray-300 rounded-lg p-2"
            >
              <option value="self">Self</option>
              <option value="relative">Relative</option>
            </select>
          </div>

          {/* Relative Fields */}
          {relation === "relative" && (
            <>
              <div>
                <label className="text-sm text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-gray-700">Age</label>
                  <input
                    type="number"
                    name="age"
                    required
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-700">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2"
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-700">Aadhar Number</label>
                <input
                  type="text"
                  name="aadhar"
                  required
                  value={formData.aadhar}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>

              <div>
                <label className="text-sm text-gray-700">Contact Number</label>
                <input
                  type="text"
                  name="contact"
                  required
                  value={formData.contact}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">
                Add EMR Details (Optional)
              </h3>

              <div>
                <label className="text-sm text-gray-700">Allergies</label>
                <input
                  type="text"
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>

              <div>
                <label className="text-sm text-gray-700">Diseases</label>
                <input
                  type="text"
                  name="diseases"
                  value={formData.diseases}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>

              <div>
                <label className="text-sm text-gray-700">Past Surgeries</label>
                <input
                  type="text"
                  name="pastSurgeries"
                  value={formData.pastSurgeries}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>

              <div>
                <label className="text-sm text-gray-700">
                  Current Medications
                </label>
                <input
                  type="text"
                  name="currentMedications"
                  value={formData.currentMedications}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1">
                  Upload Reports (Multiple)
                </label>
                <input
                  type="file"
                  name="reports"
                  multiple
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 mt-4 rounded-lg font-semibold text-white ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#28328C] hover:bg-[#1e2675]"
            }`}
          >
            {loading ? "Processing..." : "Book Appointment"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AppointmentFormModal;
