


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
  });

  // ✅ Auto-fill details if booking for self
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
            contact: payload.contact || "",
          }));
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      }
    } else {
      // reset fields if booking for relative
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
      });
    }
  }, [relation]);

  if (!open) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
      relation,
    };

    onSubmit(formattedData);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6 relative overflow-y-auto max-h-[90vh]">
        {/* Close button */}
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
          {/* Relation Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Booking For
            </label>
            <select
              value={relation}
              onChange={(e) =>
                setRelation(e.target.value as "self" | "relative")
              }
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#28328C] outline-none"
            >
              <option value="self">Self</option>
              <option value="relative">Relative</option>
            </select>
          </div>

          {/* Show fields only when booking for relative */}
          {relation === "relative" && (
            <>
              {/* Personal Details */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Age
                  </label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender
                  </label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Aadhar Number
                </label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Number
                </label>
                <input
                  type="text"
                  name="contact"
                  required
                  value={formData.contact}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>

              {/* EMR Section */}
              <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">
                Add EMR Details (Optional)
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Allergies (comma separated)
                </label>
                <input
                  type="text"
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Diseases (comma separated)
                </label>
                <input
                  type="text"
                  name="diseases"
                  value={formData.diseases}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Past Surgeries (comma separated)
                </label>
                <input
                  type="text"
                  name="pastSurgeries"
                  value={formData.pastSurgeries}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Medications (comma separated)
                </label>
                <input
                  type="text"
                  name="currentMedications"
                  value={formData.currentMedications}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 mt-4 rounded-lg font-semibold text-white transition-all ${
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



// import React, { useState, useEffect } from "react";
// import { X } from "lucide-react";

// interface AppointmentFormModalProps {
//   open: boolean;
//   onClose: () => void;
//   onSubmit: (formData: FormData) => Promise<void> | void; // change to FormData
//   loading: boolean;
// }

// const AppointmentFormModal: React.FC<AppointmentFormModalProps> = ({
//   open,
//   onClose,
//   onSubmit,
//   loading,
// }) => {
//   const [relation, setRelation] = useState<"self" | "relative">("self");

//   const [formData, setFormData] = useState({
//     name: "",
//     age: "",
//     gender: "Male" as "Male" | "Female" | "Other",
//     aadhar: "",
//     contact: "",
//     allergies: "",
//     diseases: "",
//     pastSurgeries: "",
//     currentMedications: "",
//     reports: [] as File[], // ← added for file upload
//   });

//   useEffect(() => {
//     if (relation === "self") {
//       const token = document.cookie
//         .split("; ")
//         .find((r) => r.startsWith("patientToken="))
//         ?.split("=")[1];

//       if (token) {
//         try {
//           const payload = JSON.parse(atob(token.split(".")[1]));
//           setFormData((prev) => ({
//             ...prev,
//             name: payload.name || "",
//             age: payload.age?.toString() || "",
//             gender: payload.gender || "Male",
//             aadhar: payload.aadhar || "",
//             contact: payload.contact || "",
//           }));
//         } catch (error) {
//           console.error("Error decoding token:", error);
//         }
//       }
//     } else {
//       setFormData({
//         name: "",
//         age: "",
//         gender: "Male",
//         aadhar: "",
//         contact: "",
//         allergies: "",
//         diseases: "",
//         pastSurgeries: "",
//         currentMedications: "",
//         reports: [],
//       });
//     }
//   }, [relation]);

//   if (!open) return null;

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // ✅ Handle multiple file upload
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setFormData((prev) => ({ ...prev, reports: Array.from(e.target.files!) }));
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     const patientData = {
//       name: formData.name,
//       age: Number(formData.age),
//       gender: formData.gender,
//       aadhar: formData.aadhar,
//       contact: formData.contact,
//       relation,
//       allergies: formData.allergies
//         ? formData.allergies.split(",").map((a) => a.trim())
//         : [],
//       diseases: formData.diseases
//         ? formData.diseases.split(",").map((d) => d.trim())
//         : [],
//       pastSurgeries: formData.pastSurgeries
//         ? formData.pastSurgeries.split(",").map((p) => p.trim())
//         : [],
//       currentMedications: formData.currentMedications
//         ? formData.currentMedications.split(",").map((m) => m.trim())
//         : [],
//     };

//     const finalData = new FormData();
//     finalData.append("patient", JSON.stringify(patientData));

//     // Append files
//     formData.reports.forEach((file) => finalData.append("reports", file));

//     onSubmit(finalData);
//   };

//   return (
//     <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
//       <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6 relative overflow-y-auto max-h-[90vh]">
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
//         >
//           <X className="w-5 h-5" />
//         </button>

//         <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
//           Book Appointment
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Relation Selector */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Booking For
//             </label>
//             <select
//               value={relation}
//               onChange={(e) => setRelation(e.target.value as "self" | "relative")}
//               className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#28328C] outline-none"
//             >
//               <option value="self">Self</option>
//               <option value="relative">Relative</option>
//             </select>
//           </div>

//           {/* Show fields only for relative */}
//           {relation === "relative" && (
//             <>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Full Name
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   required
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 rounded-lg p-2"
//                 />
//               </div>

//               <div className="grid grid-cols-2 gap-3">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Age
//                   </label>
//                   <input
//                     type="number"
//                     name="age"
//                     required
//                     value={formData.age}
//                     onChange={handleChange}
//                     className="w-full border border-gray-300 rounded-lg p-2"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Gender
//                   </label>
//                   <select
//                     name="gender"
//                     value={formData.gender}
//                     onChange={handleChange}
//                     className="w-full border border-gray-300 rounded-lg p-2"
//                   >
//                     <option>Male</option>
//                     <option>Female</option>
//                     <option>Other</option>
//                   </select>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Aadhar Number
//                 </label>
//                 <input
//                   type="text"
//                   name="aadhar"
//                   required
//                   value={formData.aadhar}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 rounded-lg p-2"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Contact Number
//                 </label>
//                 <input
//                   type="text"
//                   name="contact"
//                   required
//                   value={formData.contact}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 rounded-lg p-2"
//                 />
//               </div>

//               {/* EMR Section */}
//               <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">
//                 Add EMR Details (Optional)
//               </h3>

//               {["allergies", "diseases", "pastSurgeries", "currentMedications"].map(
//                 (field) => (
//                   <div key={field}>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       {field.charAt(0).toUpperCase() + field.slice(1)} (comma separated)
//                     </label>
//                     <input
//                       type="text"
//                       name={field}
//                       value={formData[field as keyof typeof formData] as string}
//                       onChange={handleChange}
//                       className="w-full border border-gray-300 rounded-lg p-2"
//                     />
//                   </div>
//                 )
//               )}

//               {/* File Upload */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Upload Reports (PDF / Image)
//                 </label>
//                 <input
//                   type="file"
//                   multiple
//                   accept=".pdf,.jpg,.jpeg,.png"
//                   onChange={handleFileChange}
//                   className="w-full border border-gray-300 rounded-lg p-2"
//                 />
//               </div>
//             </>
//           )}

//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full py-2 mt-4 rounded-lg font-semibold text-white transition-all ${
//               loading
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-[#28328C] hover:bg-[#1e2675]"
//             }`}
//           >
//             {loading ? "Processing..." : "Book Appointment"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AppointmentFormModal;
