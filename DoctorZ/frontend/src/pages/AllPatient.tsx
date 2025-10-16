// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import api from "../api/client";

// interface Patient {
//   _id: string;
//   fullName: string;
//   email: string;
//   phone: string;
//   age: number;
// }

// interface Booking {
//   _id: string;
//   patientId: Patient;
  
// }

// const AllPatient: React.FC = () => {
//   const navigate = useNavigate();
//   const { drId } = useParams<{ drId: string }>();
//   const [patients, setPatients] = useState<Patient[]>([]);

//   useEffect(() => {
//     const fetchBookings = async () => {
//       if (!drId) return;
//       try {
//         const res = await api.get<{ bookings: Booking[] }>(
//           `/api/booking/doctor/${drId}`
//         );
       
//         const patientList = res.data.bookings.map((b) => b.patientId);
//         setPatients(patientList);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchBookings();
//   }, [drId]);

//   return (
//     <div className="p-5">
//       <h2 className="text-xl font-bold mb-4">Patients</h2>
//       {patients.length === 0 ? (
//         <p>No patients found.</p>
//       ) : (
//         <div className="space-y-3">
//           {patients.map((patient) => (
//             <div
//               key={patient._id}
//               className="p-4 border rounded flex items-center justify-between"
//             >
//               <div>
//                 <div className="font-semibold">{patient.fullName}</div>
//                 <div className="text-sm text-gray-500">{patient.email}</div>
//               </div>
//               <div className="flex gap-2">
//                 <a
//                   href={`tel:${patient.phone}`}
//                   className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
//                 >
//                   Call
//                 </a>
//                 <button onClick={()=>navigate('/doctor-chat')} className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
//                   Chat
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllPatient;


import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../Services/mainApi";

interface Patient {
  name: string;
  age: number;
  gender: string;
  contact: string;
  aadhar: string;
}

interface Booking {
  _id: string;
  patient: Patient;
  mode: string;
  fees: number;
}

const AllPatient: React.FC = () => {
  const navigate = useNavigate();
  const { drId } = useParams<{ drId: string }>();
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!drId) return;
      try {
        const res = await api.get<{ bookings: Booking[] }>(
          `/api/booking/doctor/${drId}`
        );

        // Extract embedded patient info from bookings
        const patientList = res.data.bookings
          .map((b) => b.patient)
          .filter((p) => p !== undefined && p !== null);
        setPatients(patientList);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBookings();
  }, [drId]);

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-4">Patients</h2>
      {patients.length === 0 ? (
        <p>No patients found.</p>
      ) : (
        <div className="space-y-3">
          {patients.map((patient, idx) => (
            <div
              key={idx}
              className="p-4 border rounded flex items-center justify-between"
            >
              <div>
                <div className="font-semibold">{patient.name}</div>
                <div className="text-sm text-gray-500">
                  Age: {patient.age || "-"} | Gender: {patient.gender || "-"}
                </div>
                <div className="text-sm text-gray-500">
                  Aadhar: {patient.aadhar}
                </div>
              </div>
              <div className="flex gap-2">
                <a
                  href={`tel:${patient.contact}`}
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Call
                </a>
                <button
                  onClick={() => navigate("/doctor-chat")}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Chat
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllPatient;
