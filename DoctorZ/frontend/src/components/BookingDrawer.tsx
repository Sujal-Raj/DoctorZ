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
    reports: null as FileList | null, // ✅ Added
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
      // Reset for relative
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
      reports: formData.reports, // ✅ Important
      relation,
    };

    onSubmit(formattedData);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6 relative overflow-y-auto max-h-[90vh]">
        
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
          
          {/* Relation */}
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
                  This doctor hasn’t added any appointment slots yet.
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
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Date Selection */}
                <div className="flex gap-2 overflow-x-auto py-2">
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
                        className={`min-w-[72px] p-3 text-center rounded-lg border transition-all
                          ${
                            active
                              ? "bg-[#28328C] text-white shadow"
                              : "bg-white text-gray-800 hover:shadow-sm"
                          }
                          ${
                            disabled
                              ? "bg-gray-100 text-gray-100 cursor-not-allowed"
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
                                ? "bg-[#28328C] text-white shadow "
                                : "bg-white text-gray-800 hover:shadow-sm border-green-300"
                            } ${
                              isBooked
                                ? "!bg-gray-200 text-gray-100 border-gray-200 cursor-not-allowed"
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

          {relation === "relative" && (
            <>
              {/* Name */}
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

              {/* Age + Gender */}
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

              {/* Aadhar */}
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

              {/* Contact */}
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

              {/* EMR Fields */}
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

              {/* 📁 Reports Upload */}
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