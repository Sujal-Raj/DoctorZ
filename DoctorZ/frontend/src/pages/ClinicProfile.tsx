// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import { useOutletContext } from "react-router-dom";

// // interface Clinic {
// //   _id: string;
// //   clinicName: string;
// //   clinicType: "Private" | "Government";
// //   specialities: string[];

// //   address: string;
// //   state: string;
// //   district: string;
// //   pincode: number;

// //   phone: string;
// //   email: string;

// //   doctors: string[]; // Doctor IDs (populate करोगे तो Doctor[] बना सकते हो)
// //   operatingHours: string;
// //   clinicLicenseNumber: string;
// //   registrationCertificate?: string;

// //   aadharNumber: number;
// //   panNumber: string;

// //   staffName: string;
// //   staffEmail: string;
// //   staffId: string;
  
// // }

// // interface OutletContext {
// //   clinicId: string | undefined;
// // }


// // const ClinicProfile: React.FC = () => {
// //     const { clinicId } = useOutletContext<OutletContext>();
// //   const [clinic, setClinic] = useState<Clinic | null>(null);
// //   const [loading, setLoading] = useState<boolean>(true);
// //   const [error, setError] = useState<string>("");

// //   useEffect(() => {
// //     const fetchClinic = async () => {
// //       try {
      
// //         if (!clinicId) {
// //           setError("Clinic ID not found. Please login again.");
// //           setLoading(false);
// //           return;
// //         }

// //         const res = await axios.get<{ clinic: Clinic }>(
// //           `http://localhost:3000/api/clinic/getClinicById/${clinicId}`
// //         );
// //         setClinic(res.data.clinic);
// //       } catch (err) {
// //         setError("Failed to fetch clinic details: " + err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchClinic();
// //   }, []);

// //   if (loading) return <p className="text-center text-lg">Loading clinic profile...</p>;
// //   if (error) return <p className="text-red-500 text-center">{error}</p>;
// //   if (!clinic) return <p className="text-center">Clinic not found</p>;

// //   return (
// //     <div className="max-w-4xl mx-auto mt-10 p-6 bg-gradient-to-b from-gray-50 to-white rounded-2xl shadow-lg border border-gray-200">
// //   {/* Header */}
// //   <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Clinic Profile</h2>

// //   {/* Clinic Info Section */}
// //   <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100 mb-6">
// //     <h3 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Clinic Information</h3>
    
// //     <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
// //       <p><span className="font-medium text-gray-800">Clinic Name:</span> {clinic.clinicName}</p>
// //       <p><span className="font-medium text-gray-800">Type:</span> {clinic.clinicType}</p>
// //       <p><span className="font-medium text-gray-800">Specialities:</span> {clinic.specialities.join(", ")}</p>
// //       <p><span className="font-medium text-gray-800">Operating Hours:</span> {clinic.operatingHours}</p>
// //       <p className="col-span-2"><span className="font-medium text-gray-800">Address:</span> {clinic.address}, {clinic.district}, {clinic.state} - {clinic.pincode}</p>
// //       <p><span className="font-medium text-gray-800">Phone:</span> {clinic.phone}</p>
// //       <p><span className="font-medium text-gray-800">Email:</span> {clinic.email}</p>
// //       <p><span className="font-medium text-gray-800">Clinic License No:</span> {clinic.clinicLicenseNumber}</p>
// //       {clinic.registrationCertificate && (
// //         <a
// //           href={`http://localhost:3000/uploads/${clinic.registrationCertificate}`}
// //           target="_blank"
// //           rel="noopener noreferrer"
// //           className="col-span-2 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
// //         >
// //           View Registration Certificate
// //         </a>
// //       )}
// //       <p><span className="font-medium text-gray-800">PAN No:</span> {clinic.panNumber}</p>
// //       <p><span className="font-medium text-gray-800">Aadhar No:</span> {clinic.aadharNumber}</p>
// //     </div>
// //   </div>

// //   {/* Staff Info Section */}
// //   <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100">
// //     <h3 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">Staff Details</h3>
    
// //     <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
// //       <p><span className="font-medium text-gray-800">Staff Name:</span> {clinic.staffName}</p>
// //       <p><span className="font-medium text-gray-800">Staff Email:</span> {clinic.staffEmail}</p>
// //       <p><span className="font-medium text-gray-800">Staff ID:</span> {clinic.staffId}</p>
// //     </div>
// //   </div>
// // </div>

// //   );
// // };

// // export default ClinicProfile;

// // ...imports and interfaces remain same

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useOutletContext } from "react-router-dom";

// interface Clinic {
//   _id: string;
//   clinicName: string;
//   clinicType: "Private" | "Government";
//   specialities: string[];

//   address: string;
//   state: string;
//   district: string;
//   pincode: number;

//   phone: string;
//   email: string;

//   doctors: string[]; // Doctor IDs (populate करोगे तो Doctor[] बना सकते हो)
//   operatingHours: string;
//   clinicLicenseNumber: string;
//   registrationCertificate?: string;

//   aadharNumber: number;
//   panNumber: string;

//   staffName: string;
//   staffEmail: string;
//   staffId: string;
  
// }

// interface OutletContext {
//   clinicId: string | undefined;
// }


// const ClinicProfile: React.FC = () => {
//   const { clinicId } = useOutletContext<OutletContext>();
//   const [clinic, setClinic] = useState<Clinic | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [editMode, setEditMode] = useState(false);
//   const [formData, setFormData] = useState<Partial<Clinic>>({});

//   useEffect(() => {
//     const fetchClinic = async () => {
//       try {
//         if (!clinicId) throw new Error("Clinic ID not found");

//         const res = await axios.get<{ clinic: Clinic }>(
//           `http://localhost:3000/api/clinic/getClinicById/${clinicId}`
//         );
//         setClinic(res.data.clinic);
//         setFormData(res.data.clinic);
//       } catch (err: unknown) {
//         setError("Failed to fetch clinic details: " );
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchClinic();
//   }, [clinicId]);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

// const handleUpdate = async () => {
//   try {
//     if (!clinic) return;

//     const payload = {
//       ...formData,
//       specialities: Array.isArray(formData.specialities)
//         ? formData.specialities // already array hai to direct use kro
//         : typeof formData.specialities === "string"
//         ? formData.specialities.split(",").map((s) => s.trim()) // string hai to array me convert kro
//         : clinic.specialities, // fallback (in case undefined)
//     };

//     const res = await axios.put(
//       `http://localhost:3000/api/clinic/updateClinic/${clinic._id}`,
//       payload
//     );

//     setClinic(res.data.clinic);
//     setEditMode(false);
//     alert("Clinic updated successfully!");
//   } catch (err) {
//     console.error("Error updating clinic:", err);
//     alert("Failed to update clinic");
//   }
// };


//   const handleDelete = async () => {
//     if (!clinic) return;
//     const confirm = window.confirm(
//       `Are you sure you want to delete the clinic "${clinic.clinicName}"? This action cannot be undone.`
//     );
//     if (!confirm) return;

//     try {
//       await axios.delete(`http://localhost:3000/api/clinic/deleteClinic/${clinic._id}`);
//       alert("Clinic deleted successfully!");
//       window.location.href = "/"; // redirect after deletion
//     } catch (err) {
//       console.error(err);
//       alert("Failed to delete clinic");
//     }
//   };

//   if (loading) return <p className="text-center text-lg">Loading clinic profile...</p>;
//   if (error) return <p className="text-red-500 text-center">{error}</p>;
//   if (!clinic) return <p className="text-center">Clinic not found</p>;

//   return (
//     <div className="max-w-4xl mx-auto mt-10 p-6 bg-gradient-to-b from-gray-50 to-white rounded-2xl shadow-lg border border-gray-200">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-3xl font-bold text-blue-700">Clinic Profile</h2>
//         <button
//           onClick={() => setEditMode(!editMode)}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
//         >
//           {editMode ? "Cancel" : "Edit"}
//         </button>
//       </div>

//       {/* Clinic Info */}
//       <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100 mb-6">
//         <h3 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">
//           Clinic Information
//         </h3>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
//           {editMode ? (
//             <>
//               <input
//                 type="text"
//                 name="clinicName"
//                 value={formData.clinicName || ""}
//                 onChange={handleChange}
//                 className="border p-2 rounded-md w-full"
//               />
//               <select
//                 name="clinicType"
//                 value={formData.clinicType || ""}
//                 onChange={handleChange}
//                 className="border p-2 rounded-md w-full"
//               >
//                 <option value="">Select Type</option>
//                 <option value="Private">Private</option>
//                 <option value="Government">Government</option>
//               </select>
//               <input
//                 type="text"
//                 name="specialities"
//                 value={formData.specialities?.toString() || ""}
//                 onChange={handleChange}
//                 placeholder="Specialities (comma separated)"
//                 className="border p-2 rounded-md w-full"
//               />
//               <input
//                 type="text"
//                 name="operatingHours"
//                 value={formData.operatingHours || ""}
//                 onChange={handleChange}
//                 className="border p-2 rounded-md w-full"
//               />
//               <textarea
//                 name="address"
//                 value={formData.address || ""}
//                 onChange={handleChange}
//                 className="border p-2 rounded-md w-full col-span-2"
//               />
//               <input
//                 type="text"
//                 name="district"
//                 value={formData.district || ""}
//                 onChange={handleChange}
//                 className="border p-2 rounded-md w-full"
//               />
//               <input
//                 type="text"
//                 name="state"
//                 value={formData.state || ""}
//                 onChange={handleChange}
//                 className="border p-2 rounded-md w-full"
//               />
//               <input
//                 type="number"
//                 name="pincode"
//                 value={formData.pincode || ""}
//                 onChange={handleChange}
//                 className="border p-2 rounded-md w-full"
//               />
//               <input
//                 type="text"
//                 name="phone"
//                 value={formData.phone || ""}
//                 onChange={handleChange}
//                 className="border p-2 rounded-md w-full"
//               />
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email || ""}
//                 onChange={handleChange}
//                 className="border p-2 rounded-md w-full"
//               />
//               <input
//                 type="text"
//                 name="clinicLicenseNumber"
//                 value={formData.clinicLicenseNumber || ""}
//                 onChange={handleChange}
//                 className="border p-2 rounded-md w-full"
//               />
//               <input
//                 type="number"
//                 name="aadharNumber"
//                 value={formData.aadharNumber || ""}
//                 onChange={handleChange}
//                 className="border p-2 rounded-md w-full"
//               />
//               <input
//                 type="text"
//                 name="panNumber"
//                 value={formData.panNumber || ""}
//                 onChange={handleChange}
//                 className="border p-2 rounded-md w-full"
//               />
//             </>
//           ) : (
//             <>
//               <p>
//                 <span className="font-medium text-gray-800">Clinic Name:</span> {clinic.clinicName}
//               </p>
//               <p>
//                 <span className="font-medium text-gray-800">Type:</span> {clinic.clinicType}
//               </p>
//               <p>
//                 <span className="font-medium text-gray-800">Specialities:</span>{" "}
//                 {clinic.specialities.join(", ")}
//               </p>
//               <p>
//                 <span className="font-medium text-gray-800">Operating Hours:</span>{" "}
//                 {clinic.operatingHours}
//               </p>
//               <p className="col-span-2">
//                 <span className="font-medium text-gray-800">Address:</span> {clinic.address},{" "}
//                 {clinic.district}, {clinic.state} - {clinic.pincode}
//               </p>
//               <p>
//                 <span className="font-medium text-gray-800">Phone:</span> {clinic.phone}
//               </p>
//               <p>
//                 <span className="font-medium text-gray-800">Email:</span> {clinic.email}
//               </p>
//               <p>
//                 <span className="font-medium text-gray-800">Clinic License No:</span>{" "}
//                 {clinic.clinicLicenseNumber}
//               </p>
//               {clinic.registrationCertificate && (
//                 <a
//                   href={`http://localhost:3000/uploads/${clinic.registrationCertificate}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="col-span-2 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
//                 >
//                   View Registration Certificate
//                 </a>
//               )}
//               <p>
//                 <span className="font-medium text-gray-800">PAN No:</span> {clinic.panNumber}
//               </p>
//               <p>
//                 <span className="font-medium text-gray-800">Aadhar No:</span> {clinic.aadharNumber}
//               </p>
//             </>
//           )}
//         </div>

//         {editMode && (
//           <div className="flex justify-between mt-4">
//             <button
//               onClick={handleUpdate}
//               className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition"
//             >
//               Save Changes
//             </button>
//             <button
//               onClick={handleDelete}
//               className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition"
//             >
//               Delete Clinic
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Staff Info */}
//       <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100">
//         <h3 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">
//           Staff Details
//         </h3>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
//           <p>
//             <span className="font-medium text-gray-800">Staff Name:</span> {clinic.staffName}
//           </p>
//           <p>
//             <span className="font-medium text-gray-800">Staff Email:</span> {clinic.staffEmail}
//           </p>
//           <p>
//             <span className="font-medium text-gray-800">Staff ID:</span> {clinic.staffId}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ClinicProfile;

import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

interface Clinic {
  _id: string;
  clinicName: string;
  clinicType: "Private" | "Government";
  operatingHours: string;
  specialities: string[];
  phone: string;
  email: string;
  address: string;
  state: string;
  district: string;
  pincode: number;
  clinicLicenseNumber: string;
  registrationCertificate?: string;
  aadharNumber: number;
  panNumber: string;
  staffName: string;
  staffEmail: string;
  staffId: string;
  doctors: string[];
}

interface OutletContext {
  clinicId: string;
}

export default function ClinicProfile() {
  const { clinicId } = useOutletContext<OutletContext>();
  const [clinic, setClinic] = useState<Clinic | null>(null);
  const [formData, setFormData] = useState<Clinic | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);

  // Fetch clinic data
  const fetchClinicData = async () => {
    if (!clinicId) return;
    try {
      const res = await axios.get<{ clinic: Clinic }>(
        `http://localhost:3000/api/clinic/getClinicById/${clinicId}`
      );
      const clinicData = res.data.clinic;
      setClinic(clinicData);
      setFormData(clinicData);
    } catch (error) {
      console.error("Error fetching clinic data:", error);
      toast.error("Failed to load clinic profile");
    }
  };

  useEffect(() => {
    fetchClinicData();
  }, [clinicId]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Update clinic
  const handleUpdate = async () => {
    if (!formData) return;
    try {
      setSaving(true);
      await axios.put(
        `http://localhost:3000/api/clinic/update/${formData._id}`,
        formData
      );
      toast.success("Clinic profile updated successfully");
      setEditMode(false); // Hide Save button
      setSaving(false);
      fetchClinicData();
    } catch (error) {
      console.error("Error updating clinic:", error);
      toast.error("Failed to update profile");
      setSaving(false);
    }
  };

  // Delete clinic
  const handleDelete = async () => {
    if (!clinic) return;
    if (window.confirm("Are you sure you want to delete this clinic?")) {
      try {
        await axios.delete(
          `http://localhost:3000/api/clinic/delete/${clinic._id}`
        );
        toast.success("Clinic deleted successfully");
        setClinic(null);
      } catch (error) {
        console.error("Error deleting clinic:", error);
        toast.error("Failed to delete clinic");
      }
    }
  };

  if (!clinic || !formData)
    return <p className="text-center mt-6 text-gray-500">Loading clinic profile...</p>;

  const fields: { label: string; key: keyof Clinic }[] = [
    { label: "Clinic Name", key: "clinicName" },
    { label: "Clinic Type", key: "clinicType" },
    { label: "Operating Hours", key: "operatingHours" },
    { label: "Specialities", key: "specialities" },
    { label: "Phone", key: "phone" },
    { label: "Email", key: "email" },
    { label: "Address", key: "address" },
    { label: "State", key: "state" },
    { label: "District", key: "district" },
    { label: "Pincode", key: "pincode" },
    { label: "Clinic License Number", key: "clinicLicenseNumber" },
    { label: "Registration Certificate", key: "registrationCertificate" },
    { label: "Aadhar Number", key: "aadharNumber" },
    { label: "PAN Number", key: "panNumber" },
    { label: "Staff Name", key: "staffName" },
    { label: "Staff Email", key: "staffEmail" },
    { label: "Staff ID", key: "staffId" },
  ];

  return (
    <div className="max-w-5xl mx-auto p-8 mt-10 bg-white rounded-2xl shadow-lg border border-gray-200">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 ">
        <h2 className="text-3xl font-bold text-blue-700">Clinic Profile</h2>
        <div className="flex gap-3">
          {editMode && (
            <>
              <button
                onClick={handleUpdate}
                disabled={saving}
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg transition"
              >
                Cancel
              </button>
            </>
          )}
          {!editMode && (
            <button
              onClick={() => setEditMode(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
            >
              Edit
            </button>
          )}
          <button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {fields.map(({ label, key }) => (
          <div key={key as string} className="flex flex-col">
            <label className="text-sm font-semibold text-gray-600 mb-1">{label}</label>
            {editMode ? (
              <input
                type={
                  key === "pincode" || key === "aadharNumber" ? "number" : "text"
                }
                name={key}
                value={
                  Array.isArray(formData[key])
                    ? (formData[key] as string[]).join(", ")
                    : (formData[key] as string | number | undefined) || ""
                }
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            ) : (
              <p className="bg-gray-100 p-2 rounded-md text-gray-800">
                {Array.isArray(formData[key])
                  ? (formData[key] as string[]).join(", ")
                  : formData[key]}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
