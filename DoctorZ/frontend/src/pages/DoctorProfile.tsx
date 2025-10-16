// import React, { useEffect, useState } from "react";

// import axios from "axios";

// interface Doctor {
//   _id: string;
//   fullName: string;
//   specialization: string;
//   qualification: string;
//   experience: number;
//   consultationFee: number;
//   language: string;
//   MedicalRegistrationNumber: number;
//   Aadhar: number;
  
//   photo?: string;
//   signature?: string;
//   DegreeCertificate?: string;
// }

// const DoctorProfile: React.FC = () => {
 
//   const [doctor, setDoctor] = useState<Doctor | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string>("");

//   useEffect(() => {
//     const fetchDoctor = async () => {
//       try {
//         const token = localStorage.getItem("token"); // token saved on login
//         const doctorId = localStorage.getItem("doctorId");

        
//         if (!doctorId) {
//           setError("Doctor ID not found. Please login again.");
//           setLoading(false);
//           return;
//         }

//         const res = await axios.get<{ doctor: Doctor }>(
//           `http://localhost:3000/api/doctor/${doctorId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setDoctor(res.data.doctor);
//       } catch (err) {
//         setError("Failed to fetch doctor details" + err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDoctor();
//   }, []);

  

//   if (loading) return <p className="text-center text-lg">Loading profile...</p>;
//   if (error) return <p className="text-red-500 text-center">{error}</p>;
//   if (!doctor) return <p className="text-center">Doctor not found</p>;

//   return (
//     <div className="max-w-4xl mx-auto mt-10 bg-gradient-to-b from-blue-50 to-white rounded-2xl shadow-xl p-8 border border-gray-200">
//   {/* Header */}
//   <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
//     Doctor Profile
//   </h2>

//   <div className="flex flex-col md:flex-row items-center gap-8">
//     {/* Profile Photo */}
//     <div className="flex flex-col items-center">
//       {doctor.photo ? (
//         <img
//           src={`http://localhost:3000/uploads/${doctor.photo}`}
//           alt="Doctor"
//           className="w-36 h-36 rounded-full object-cover border-4 border-blue-400 shadow-md"
//         />
//       ) : (
//         <div className="w-36 h-36 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
//           No Photo
//         </div>
//       )}
//       <h3 className="text-xl font-semibold mt-4 text-gray-800">
//         {doctor.fullName}
//       </h3>
//       <p className="text-blue-600 font-medium">
//         {doctor.specialization}
//       </p>
//     </div>

//     {/* Details Section */}
//     <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
//       <div>
//         <p className="text-sm text-gray-500">Qualification</p>
//         <p className="font-medium">{doctor.qualification}</p>
//       </div>
//       <div>
//         <p className="text-sm text-gray-500">Experience</p>
//         <p className="font-medium">{doctor.experience} years</p>
//       </div>
//       <div>
//         <p className="text-sm text-gray-500">Consultation Fee</p>
//         <p className="font-medium text-green-600">
//           ₹{doctor.consultationFee}
//         </p>
//       </div>
//       <div>
//         <p className="text-sm text-gray-500">Language</p>
//         <p className="font-medium">{doctor.language}</p>
//       </div>
//       <div>
//         <p className="text-sm text-gray-500">Reg. No.</p>
//         <p className="font-medium">{doctor.MedicalRegistrationNumber}</p>
//       </div>
//       <div>
//         <p className="text-sm text-gray-500">Aadhar No.</p>
//         <p className="font-medium">{doctor.Aadhar}</p>
//       </div>
//     </div>
//   </div>

//   {/* Divider */}
//   <hr className="my-6 border-gray-300" />

//   {/* Signature & Certificate Section */}
//   <div className="flex flex-col md:flex-row items-center justify-between gap-6">
//     {/* Signature */}
//     {doctor.signature && (
//       <div className="flex flex-col items-center">
//         <p className="font-semibold mb-2 text-gray-700">
//           Digital Signature
//         </p>
//         <img
//           src={`http://localhost:3000/uploads/${doctor.signature}`}
//           alt="Signature"
//           className="w-44 h-16 object-contain border-b-2 border-gray-400"
//         />
//       </div>
//     )}

//     {/* Degree Certificate */}
//     {doctor.DegreeCertificate && (
//       <a
//         href={`http://localhost:3000/uploads/${doctor.DegreeCertificate}`}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="inline-flex items-center bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
//       >
//         🎓 View Degree Certificate
//       </a>
//     )}
//   </div>
// </div>

//   );
// };

// export default DoctorProfile;

import React, { useEffect, useState } from "react";
import axios from "axios";

interface Doctor {
  _id: string;
  fullName: string;
  specialization: string;
  qualification: string;
  experience: number;
  consultationFee: number;
  language: string;
  MedicalRegistrationNumber: number;
  Aadhar: number;
  photo?: string;
  signature?: string;
  DegreeCertificate?: string;
}


const DoctorProfile: React.FC = () => {
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [editMode, setEditMode] = useState<boolean>(false);
  const [formData, setFormData] = useState<Partial<Doctor>>({});
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const token = localStorage.getItem("token");
        const doctorId = localStorage.getItem("doctorId");
        if (!doctorId) {
          setError("Doctor ID not found. Please login again.");
          setLoading(false);
          return;
        }

        const res = await axios.get<{ doctor: Doctor }>(
          `http://localhost:3000/api/doctor/${doctorId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setDoctor(res.data.doctor);
        setFormData(res.data.doctor);
      } catch (err) {
        setError(err+"Failed to fetch doctor details");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, []);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Update doctor info
  const handleUpdate = async () => {
    try {
      if (!doctor?._id) return;
      const res = await axios.put<{doctor:Doctor}>(
        `http://localhost:3000/api/doctor/update/${doctor._id}`,
        formData
      );
       alert("Profile updated successfully ✅");
      setDoctor(res.data.doctor);
      setEditMode(false);
     
    } catch (err) {
      alert(err+"Failed to update profile ❌");
    }
  };

  // Delete doctor
  const handleDelete = async () => {
    try {
      if (!doctor?._id) return;
      await axios.delete(`http://localhost:3000/api/doctor/delete/${doctor._id}`);
      alert("Doctor profile deleted ❌");
      localStorage.removeItem("doctorId");
      localStorage.removeItem("token");
      window.location.href = "/";
    } catch (err) {
      alert(err+"Failed to delete doctor ❌");
    }
  };

  if (loading) return <p className="text-center text-lg">Loading profile...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!doctor) return <p className="text-center">Doctor not found</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-gradient-to-b from-blue-50 to-white rounded-2xl shadow-xl p-8 border border-gray-200 relative">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
        Doctor Profile
      </h2>

      {/* Action Buttons */}
      <div className="absolute top-6 right-6 flex gap-3">
        <button
          onClick={() => setEditMode(!editMode)}
          className="bg-yellow-500 text-white px-4 py-1 rounded-lg hover:bg-yellow-600 transition"
        >
          {editMode ? "Cancel" : "Edit"}
        </button>
        <button
          onClick={() => setShowConfirm(true)}
          className="bg-red-600 text-white px-4 py-1 rounded-lg hover:bg-red-700 transition"
        >
          Delete
        </button>
      </div>

      {/* Profile Section */}
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="flex flex-col items-center">
          {doctor.photo ? (
            <img
              src={`http://localhost:3000/uploads/${doctor.photo}`}
              alt="Doctor"
              className="w-36 h-36 rounded-full object-cover border-4 border-blue-400 shadow-md"
            />
          ) : (
            <div className="w-36 h-36 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
              No Photo
            </div>
          )}
          <h3 className="text-xl font-semibold mt-4 text-gray-800">
            {doctor.fullName}
          </h3>
          <p className="text-blue-600 font-medium">
            {doctor.specialization}
          </p>
        </div>

        {/* Details Section */}
        {!editMode ? (
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
            <p><span className="font-semibold">Qualification:</span> {doctor.qualification}</p>
            <p><span className="font-semibold">Experience:</span> {doctor.experience} years</p>
            <p><span className="font-semibold">Fee:</span> ₹{doctor.consultationFee}</p>
            <p><span className="font-semibold">Language:</span> {doctor.language}</p>
            <p><span className="font-semibold">Reg. No.:</span> {doctor.MedicalRegistrationNumber}</p>
            <p><span className="font-semibold">Aadhar:</span> {doctor.Aadhar}</p>
          </div>
        ) : (
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              name="qualification"
              value={formData.qualification || ""}
              onChange={handleChange}
              placeholder="Qualification"
              className="border p-2 rounded"
            />
            <input
              name="experience"
              value={formData.experience || ""}
              onChange={handleChange}
              placeholder="Experience"
              className="border p-2 rounded"
            />
            <input
              name="consultationFee"
              value={formData.consultationFee || ""}
              onChange={handleChange}
              placeholder="Consultation Fee"
              className="border p-2 rounded"
            />
            <input
              name="language"
              value={formData.language || ""}
              onChange={handleChange}
              placeholder="Language"
              className="border p-2 rounded"
            />
            <input
              name="specialization"
              value={formData.specialization || ""}
              onChange={handleChange}
              placeholder="Specialization"
              className="border p-2 rounded"
            />
          </div>
        )}
      </div>

      {/* Divider */}
      <hr className="my-6 border-gray-300" />

      {/* Signature & Certificate */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {doctor.signature && (
          <div className="flex flex-col items-center">
            <p className="font-semibold mb-2 text-gray-700">
              Digital Signature
            </p>
            <img
              src={`http://localhost:3000/uploads/${doctor.signature}`}
              alt="Signature"
              className="w-44 h-16 object-contain border-b-2 border-gray-400"
            />
          </div>
        )}
        {doctor.DegreeCertificate && (
          <a
            href={`http://localhost:3000/uploads/${doctor.DegreeCertificate}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            🎓 View Degree Certificate
          </a>
        )}
      </div>

      {/* Save Button */}
      {editMode && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleUpdate}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Save Changes
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
            <p className="text-lg font-semibold mb-4">
              Are you sure you want to delete your profile?
            </p>
            <div className="flex justify-around">
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-1 rounded-lg hover:bg-red-700"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-400 text-white px-4 py-1 rounded-lg hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorProfile;
