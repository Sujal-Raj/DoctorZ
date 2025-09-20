// import React, { useEffect, useState } from "react";

// type DoctorData = {
//   id: string;
//   fullName: string;
//   gender: string;
//   dob: string;
//   medicalRegNo: string;
//   qualification: string;
//   experience: number;
//   consultationFees: number;
//   languages: string[];
//   aadhar: string;
//   pan: string;
// };

// type ClinicData = {
//   id: string;
//   clinicName: string;
//   clinicType: string;
//   speciality: string;
//   address: string;
//   state: string;
//   district: string;
//   contactNumber: string;
//   email: string;
//   openingHours: string;
//   licenseNo: string;
//   ownerAadhar: string;
//   ownerPan: string;
// };

// const AdminDashboard: React.FC = () => {
//   const [doctors, setDoctors] = useState<DoctorData[]>([]);
//   const [clinics, setClinics] = useState<ClinicData[]>([]);

//   useEffect(() => {
//     // 👉 Fetch doctor & clinic pending approvals
//     const fetchData = async () => {
//       try {
//         const doctorRes = await fetch("http://localhost:5000/api/admin/doctors");
//         const clinicRes = await fetch("http://localhost:5000/api/admin/clinics");

//         setDoctors(await doctorRes.json());
//         setClinics(await clinicRes.json());
//       } catch (error) {
//         console.error("Error fetching data", error);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleAction = async (type: "doctor" | "clinic", id: string, action: "approve" | "reject") => {
//     try {
//       await fetch(`http://localhost:5000/api/admin/${type}/${id}/${action}`, {
//         method: "POST",
//       });

//       if (type === "doctor") {
//         setDoctors(doctors.filter((doc) => doc.id !== id));
//       } else {
//         setClinics(clinics.filter((cli) => cli.id !== id));
//       }
//     } catch (error) {
//       console.error("Error updating status", error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
//         🛠️ Admin Dashboard
//       </h1>

//       <div className="grid md:grid-cols-2 gap-6">
//         {/* Doctor Registrations */}
//         {doctors.map((doctor) => (
//           <div
//             key={doctor.id}
//             className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200"
//           >
//             <h2 className="text-xl font-semibold text-blue-700 mb-2">
//               👨‍⚕️ {doctor.fullName}
//             </h2>
//             <p><strong>Gender:</strong> {doctor.gender}</p>
//             <p><strong>DOB:</strong> {doctor.dob}</p>
//             <p><strong>Reg No:</strong> {doctor.medicalRegNo}</p>
//             <p><strong>Qualification:</strong> {doctor.qualification}</p>
//             <p><strong>Experience:</strong> {doctor.experience} years</p>
//             <p><strong>Fees:</strong> ₹{doctor.consultationFees}</p>
//             <p><strong>Languages:</strong> {doctor.languages.join(", ")}</p>
//             <div className="mt-4 flex gap-3">
//               <button
//                 onClick={() => handleAction("doctor", doctor.id, "approve")}
//                 className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
//               >
//                 Approve ✅
//               </button>
//               <button
//                 onClick={() => handleAction("doctor", doctor.id, "reject")}
//                 className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700"
//               >
//                 Reject ❌
//               </button>
//             </div>
//           </div>
//         ))}

//         {/* Clinic Registrations */}
//         {clinics.map((clinic) => (
//           <div
//             key={clinic.id}
//             className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200"
//           >
//             <h2 className="text-xl font-semibold text-green-700 mb-2">
//               🏥 {clinic.clinicName}
//             </h2>
//             <p><strong>Type:</strong> {clinic.clinicType}</p>
//             <p><strong>Speciality:</strong> {clinic.speciality}</p>
//             <p><strong>Address:</strong> {clinic.address}, {clinic.district}, {clinic.state}</p>
//             <p><strong>Contact:</strong> {clinic.contactNumber}</p>
//             <p><strong>Email:</strong> {clinic.email}</p>
//             <p><strong>License No:</strong> {clinic.licenseNo}</p>
//             <div className="mt-4 flex gap-3">
//               <button
//                 onClick={() => handleAction("clinic", clinic.id, "approve")}
//                 className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
//               >
//                 Approve ✅
//               </button>
//               <button
//                 onClick={() => handleAction("clinic", clinic.id, "reject")}
//                 className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700"
//               >
//                 Reject ❌
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;
import React, { useState } from "react";

type DoctorData = {
  id: string;
  fullName: string;
  gender: string;
  dob: string;
  medicalRegNo: string;
  qualification: string;
  experience: number;
  consultationFees: number;
  languages: string[];
  aadhar: string;
  pan: string;
};

type ClinicData = {
  id: string;
  clinicName: string;
  clinicType: string;
  speciality: string;
  address: string;
  state: string;
  district: string;
  contactNumber: string;
  email: string;
  openingHours: string;
  licenseNo: string;
  ownerAadhar: string;
  ownerPan: string;
};

const AdminDashboard: React.FC = () => {
  // 🔹 Dummy Doctor Data
  const [doctors, setDoctors] = useState<DoctorData[]>([
    {
      id: "doc1",
      fullName: "Dr. Arjun Sharma",
      gender: "Male",
      dob: "1980-05-12",
      medicalRegNo: "REG12345",
      qualification: "MBBS, MD",
      experience: 12,
      consultationFees: 500,
      languages: ["English", "Hindi"],
      aadhar: "1234-5678-9012",
      pan: "ABCDE1234F",
    },
    {
      id: "doc2",
      fullName: "Dr. Meera Kapoor",
      gender: "Female",
      dob: "1985-10-22",
      medicalRegNo: "REG67890",
      qualification: "BDS, MDS",
      experience: 8,
      consultationFees: 300,
      languages: ["English", "Telugu"],
      aadhar: "9876-5432-1098",
      pan: "XYZAB6789C",
    },
  ]);

  // 🔹 Dummy Clinic Data
  const [clinics, setClinics] = useState<ClinicData[]>([
    {
      id: "cli1",
      clinicName: "Sharma Dental Care",
      clinicType: "Dental Clinic",
      speciality: "Orthodontics",
      address: "123 MG Road",
      state: "Delhi",
      district: "Central Delhi",
      contactNumber: "9876543210",
      email: "sharma@clinic.com",
      openingHours: "9 AM - 6 PM",
      licenseNo: "LIC1234",
      ownerAadhar: "1111-2222-3333",
      ownerPan: "POIU1234Z",
    },
    {
      id: "cli2",
      clinicName: "Kapoor Heart Center",
      clinicType: "Multi-speciality",
      speciality: "Cardiology",
      address: "45 Green Park",
      state: "Delhi",
      district: "South Delhi",
      contactNumber: "9123456789",
      email: "kapoor@clinic.com",
      openingHours: "10 AM - 8 PM",
      licenseNo: "LIC5678",
      ownerAadhar: "4444-5555-6666",
      ownerPan: "LKJH6789X",
    },
  ]);

  // 🔹 Approve/Reject Actions
  const handleAction = (
    type: "doctor" | "clinic",
    id: string,
    action: "approve" | "reject"
  ) => {
    if (type === "doctor") {
      setDoctors(doctors.filter((doc) => doc.id !== id));
    } else {
      setClinics(clinics.filter((cli) => cli.id !== id));
    }
    alert(`${type} ${action}d successfully ✅`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
        🛠️ Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Doctor Registrations */}
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200"
          >
            <h2 className="text-xl font-semibold text-blue-700 mb-2">
              👨‍⚕️ {doctor.fullName}
            </h2>
            <p><strong>Gender:</strong> {doctor.gender}</p>
            <p><strong>DOB:</strong> {doctor.dob}</p>
            <p><strong>Reg No:</strong> {doctor.medicalRegNo}</p>
            <p><strong>Qualification:</strong> {doctor.qualification}</p>
            <p><strong>Experience:</strong> {doctor.experience} years</p>
            <p><strong>Fees:</strong> ₹{doctor.consultationFees}</p>
            <p><strong>Languages:</strong> {doctor.languages.join(", ")}</p>
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => handleAction("doctor", doctor.id, "approve")}
                className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
              >
                Approve 
              </button>
              <button
                onClick={() => handleAction("doctor", doctor.id, "reject")}
                className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700"
              >
                Reject 
              </button>
            </div>
          </div>
        ))}

        {/* Clinic Registrations */}
        {clinics.map((clinic) => (
          <div
            key={clinic.id}
            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200"
          >
            <h2 className="text-xl font-semibold text-green-700 mb-2">
              🏥 {clinic.clinicName}
            </h2>
            <p><strong>Type:</strong> {clinic.clinicType}</p>
            <p><strong>Speciality:</strong> {clinic.speciality}</p>
            <p><strong>Address:</strong> {clinic.address}, {clinic.district}, {clinic.state}</p>
            <p><strong>Contact:</strong> {clinic.contactNumber}</p>
            <p><strong>Email:</strong> {clinic.email}</p>
            <p><strong>License No:</strong> {clinic.licenseNo}</p>
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => handleAction("clinic", clinic.id, "approve")}
                className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
              >
                Approve 
              </button>
              <button
                onClick={() => handleAction("clinic", clinic.id, "reject")}
                className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700"
              >
                Reject 
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
