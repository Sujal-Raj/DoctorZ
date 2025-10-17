// import React, { useEffect, useState } from "react";
// import axios from "axios";

// interface Doctor {
//   _id: string;
//   fullName: string;
//   specialization: string;
//   qualification: string;
//   password: string;
//   experience: number;
//   dob: string;
//   consultationFee: number;
//   language: string;
//   MobileNo: string;
//   email: string;
//   MedicalRegistrationNumber: number;
//   Aadhar: number;
//   photo?: string;
//   signature?: string;
//   DegreeCertificate?: string;
// }

// const DoctorProfile: React.FC = () => {
//   const [doctor, setDoctor] = useState<Doctor | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchDoctor = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const doctorId = localStorage.getItem("doctorId");
//         if (!doctorId) {
//           setError("Doctor ID not found.");
//           setLoading(false);
//           return;
//         }

//         const res = await axios.get<{ doctor: Doctor }>(
//           `http://localhost:3000/api/doctor/${doctorId}`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );

//         setDoctor(res.data.doctor);
//       } catch (err) {
//         setError( err+"Failed to fetch doctor details.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDoctor();
//   }, []);

//   if (loading) return <p className="text-center mt-10">Loading...</p>;
//   if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
//   if (!doctor) return <p className="text-center mt-10">Doctor not found.</p>;

//   const formattedDOB = new Date(doctor.dob).toLocaleDateString("en-IN", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   });

//   return (
//     <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-lg border flex flex-col lg:flex-row items-center gap-10">
//       {/* Left: Profile Image */}
//       <div className="flex-shrink-0">
//         {doctor.photo ? (
//           <img
//             src={`http://localhost:3000/uploads/${doctor.photo}`}
//             alt={doctor.fullName}
//             className="w-80 h-100 object-cover rounded-lg  shadow-md hover:shadow-xl transition "
//           />
//         ) : (
//           <div className="w-52 h-52 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
//             No Photo
//           </div>
//         )}
//       </div>

//       {/* Right: Details */}
//       <div className="flex-1 w-full">
//         {/* Name + Title */}
//         <h1 className="text-3xl font-bold text-gray-800 mb-1">{doctor.fullName}</h1>
//         <h2 className="text-lg font-medium text-blue-600">{doctor.specialization}</h2>

//         <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700 text-sm">
//           <p>
//             <span className="font-semibold">DOB:</span> {formattedDOB}
//           </p>
//           <p>
//             <span className="font-semibold">Qualification:</span> {doctor.qualification}
//           </p>
//           <p>
//             <span className="font-semibold">Experience:</span> {doctor.experience}+ years
//           </p>
//           <p>
//             <span className="font-semibold">Consultation Fee:</span> ₹{doctor.consultationFee}
//           </p>
//           <p>
//             <span className="font-semibold">Languages:</span> {doctor.language}
//           </p>
//           <p>
//             <span className="font-semibold">Registration No:</span> {doctor.MedicalRegistrationNumber}
//           </p>
//           <p>
//             <span className="font-semibold">Aadhar:</span> {doctor.Aadhar}
//           </p>
//         </div>

//         {/* Specialties */}
//         <div className="mt-6">
//           <h3 className="font-semibold mb-2 text-gray-800">Specialities</h3>
//           <div className="flex flex-wrap gap-2">
//             <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
//               {doctor.specialization}
//             </span>
//           </div>
//         </div>

//         {/* Contact Section */}
//         <div className="mt-6 bg-gray-50 p-4 rounded-lg flex items-center gap-6 border border-gray-200">
//           <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">
//             +
//           </div>
//           <div>
//             <p className="text-blue-800 font-semibold text-sm">Consultation Contact</p>
//             <p className="text-gray-700 text-sm">📞 {doctor.MobileNo}</p>
//             <p className="text-gray-600 text-xs">{doctor.email}</p>
//           </div>
//         </div>

//         {/* Signature & Degree Certificate */}
//         <div className="mt-6 flex flex-col sm:flex-row items-center gap-8">
//           {doctor.signature && (
//             <div className="flex flex-col items-center">
//               <p className="font-semibold mb-2 text-gray-700">Digital Signature</p>
//               <img
//                 src={`http://localhost:3000/uploads/${doctor.signature}`}
//                 alt="Signature"
//                 className="w-52 h-24 object-contain border-b-2 border-gray-400"
//               />
//             </div>
//           )}

//           {doctor.DegreeCertificate && (
//             <a
//               href={`http://localhost:3000/uploads/${doctor.DegreeCertificate}`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="inline-flex items-center bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition shadow-md "
//             >
//               🎓 View Degree Certificate
//             </a>
//           )}
//         </div>
//       </div>
//     </div>
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
  password: string;
  experience: number;
  dob: string; // changed to string for display
  consultationFee: number;
  language: string;
  MobileNo: string;
  email: string;
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
        setError(err + " Failed to fetch doctor details");
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
      const res = await axios.put<{ doctor: Doctor }>(
        `http://localhost:3000/api/doctor/update/${doctor._id}`,
        formData
      );
      alert("Profile updated successfully ✅");
      setDoctor(res.data.doctor);
      setEditMode(false);
    } catch (err) {
      alert(err + " Failed to update profile ❌");
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
      alert(err + " Failed to delete doctor ❌");
    }
  };

  if (loading) return <p className="text-center text-lg">Loading profile...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!doctor) return <p className="text-center">Doctor not found</p>;

  // Shared input styles for edit mode (looks like text)
  const inputClass =
    "bg-transparent border-0 outline-none w-full text-gray-900 placeholder-gray-400 " +
    "focus:underline focus:underline-offset-2 focus:text-blue-600";

  const smallInputClass =
    "bg-transparent border-0 outline-none w-full text-gray-700 placeholder-gray-400 text-sm " +
    "focus:underline focus:underline-offset-2 focus:text-blue-600";

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-lg border flex flex-col lg:flex-row items-center gap-10">
      {/* Left: Profile Image with bigger size */}
      <div className="flex-shrink-0 w-[400px]   md:mb-70">
        {doctor.photo ? (
          <img
            src={`http://localhost:3000/uploads/${doctor.photo}`}
            alt={doctor.fullName}
            className="  sm:w-full sm:h-auto object-cover rounded-lgshadow-md  "
          />
        ) : (
          <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
            No Photo
          </div>
        )}
      </div>

      {/* Right: Details */}
      <div className="flex-1 w-full">
        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mb-4">
          <button
            onClick={() => {
              if (editMode) {
                setFormData(doctor); // reset changes on cancel
                setEditMode(false);
              } else {
                setEditMode(true);
              }
            }}
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

        {/* Name + Title */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-1">
          {editMode ? (
            <input
              type="text"
              name="fullName"
              value={formData.fullName || ""}
              onChange={handleChange}
              className={inputClass}
              placeholder="Full Name"
            />
          ) : (
            doctor.fullName
          )}
        </h1>
        <h2 className="text-xl font-semibold text-blue-600 mb-4">
          {editMode ? (
            <input
              type="text"
              name="specialization"
              value={formData.specialization || ""}
              onChange={handleChange}
              className={inputClass}
              placeholder="Specialization"
            />
          ) : (
            doctor.specialization
          )}
        </h2>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700 text-sm">
          {[
            ["dob", "DOB", new Date(formData.dob || doctor.dob).toLocaleDateString()],
            ["qualification", "Qualification", formData.qualification || doctor.qualification],
            ["experience", "Experience", (formData.experience ?? doctor.experience) + "+ years"],
            ["consultationFee", "Consultation Fee", "₹" + (formData.consultationFee ?? doctor.consultationFee)],
            ["language", "Languages", formData.language || doctor.language],
            ["MedicalRegistrationNumber", "Registration No", formData.MedicalRegistrationNumber ?? doctor.MedicalRegistrationNumber],
            ["Aadhar", "Aadhar", formData.Aadhar ?? doctor.Aadhar],
          ].map(([field, label, value]) => (
            <p key={field}>
              <span className="font-semibold">{label}:</span>{" "}
              {editMode ? (
                <input
                  type={field === "dob" ? "date" : field === "experience" || field === "consultationFee" || field === "MedicalRegistrationNumber" || field === "Aadhar" ? "number" : "text"}
                  name={field}
                  value={formData[field as keyof Doctor] ?? doctor[field as keyof Doctor]}
                  onChange={handleChange}
                  className={smallInputClass}
                  placeholder={label as string}
                />
              ) : (
                value
              )}
            </p>
          ))}
        </div>

        {/* Specialties */}
        <div className="mt-6">
          <h3 className="font-semibold mb-2 text-gray-800">Specialities</h3>
          <div className="flex flex-wrap gap-2">
            {editMode ? (
              <input
                type="text"
                name="specialization"
                value={formData.specialization || ""}
                onChange={handleChange}
                className={smallInputClass}
                placeholder="Specialization"
              />
            ) : (
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {doctor.specialization}
              </span>
            )}
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-6 bg-gray-50 p-4 rounded-lg flex items-center gap-6 border border-gray-200">
          <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">
            +
          </div>
          <div className="flex-1">
            <p className="text-blue-800 font-semibold text-sm">Consultation Contact</p>
            {editMode ? (
              <>
                <input
                  type="text"
                  name="MobileNo"
                  value={formData.MobileNo || ""}
                  onChange={handleChange}
                  className={smallInputClass}
                  placeholder="Mobile Number"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email || ""}
                  onChange={handleChange}
                  className={smallInputClass + " mt-1"}
                  placeholder="Email"
                />
              </>
            ) : (
              <>
                <p className="text-gray-700 text-sm">📞 {doctor.MobileNo}</p>
                <p className="text-gray-600 text-xs">{doctor.email}</p>
              </>
            )}
          </div>
        </div>

        {/* Signature & Degree Certificate */}
        <div className="mt-8 flex flex-col sm:flex-row gap-8 items-center">
          {doctor.signature && (
            <div className="flex flex-col items-center">
              <p className="font-semibold mb-2 text-gray-700">Digital Signature</p>
              <img
                src={`http://localhost:3000/uploads/${doctor.signature}`}
                alt="Signature"
                className="w-56 h-20 object-contain border-b-2 border-gray-400"
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
    </div>
  );
};

export default DoctorProfile;
