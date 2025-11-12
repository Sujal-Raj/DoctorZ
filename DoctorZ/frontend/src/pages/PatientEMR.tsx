
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// interface EMR {
//   allergies?: string[];
//   diseases?: string[];
//   pastSurgeries?: string[];
//   currentMedications?: string[];
//   reports?: string[];
//   createdAt: string;
// }

// const PatientEMR = () => {
//   const { patientId } = useParams<{ patientId: string }>();
//   const { doctorId } = useParams<{ doctorId: string }>();
//   const [emrData, setEmrData] = useState<EMR[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   console.log("Patient ID from URL:", patientId);
//   console.log("Doctor ID from URL:", doctorId);

//   useEffect(() => {
//     if (!patientId) {
//       console.error("❌ Patient ID missing from URL");
//       setError("Patient ID not found in URL.");
//       setLoading(false);
//       return;
//     }

//     const fetchEMR = async () => {
//       try {
//         console.log("✅ Fetching EMR for patient:", patientId);
//         const res = await fetch(`http://localhost:3000/api/emr/${patientId}`);
//         const data = await res.json();

//         if (data?.data && Array.isArray(data.data)) {
//           setEmrData(data.data);
//         } else {
//           setEmrData([]);
//         }
//       } catch (err) {
//         console.error("Error fetching EMR:", err);
//         setError("Failed to load EMR data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEMR();
//   }, [patientId]);

//   // 🌀 Loading State
//   if (loading) {
//     return <p className="text-center mt-10 text-gray-600">Loading EMR...</p>;
//   }

//   // ⚠️ Error State
//   if (error) {
//     return <p className="text-center mt-10 text-red-600">{error}</p>;
//   }

//   // 📭 Empty State
//   if (!emrData.length) {
//     return <p className="text-center mt-10 text-gray-600">No EMR records found.</p>;
//   }

//   // ✅ Display EMR Records
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-6 text-center sm:text-left">Patient EMR</h1>

//       {emrData.map((emr, index) => (
//         <div
//           key={emr.createdAt || index}
//           className="border border-gray-200 rounded-lg p-4 mb-6 shadow-sm hover:shadow-md transition-shadow duration-200"
//         >
//           <p>
//             <strong>Allergies:</strong>{" "}
//             {emr.allergies?.length ? emr.allergies.join(", ") : "None"}
//           </p>
//           <p>
//             <strong>Diseases:</strong>{" "}
//             {emr.diseases?.length ? emr.diseases.join(", ") : "None"}
//           </p>
//           <p>
//             <strong>Past Surgeries:</strong>{" "}
//             {emr.pastSurgeries?.length ? emr.pastSurgeries.join(", ") : "None"}
//           </p>
//           <p>
//             <strong>Current Medications:</strong>{" "}
//             {emr.currentMedications?.length
//               ? emr.currentMedications.join(", ")
//               : "None"}
//           </p>

//           {emr.reports?.length ? (
//             <div className="mt-2">
//               <strong>Reports:</strong>
//               <ul className="list-disc list-inside">
//                 {emr.reports.map((report, i) => (
//                   <li key={`${emr.createdAt}-${i}`}>
//                     <a
//                       href={`http://localhost:3000${report}`}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="text-blue-600 hover:underline break-all"
//                     >
//                       {report}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ) : (
//             <p>
//               <strong>Reports:</strong> None
//             </p>
//           )}

//           <p className="text-gray-500 text-sm mt-3">
//             Created At: {new Date(emr.createdAt).toLocaleString()}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default PatientEMR;


import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface EMR {
  allergies?: string[];
  diseases?: string[];
  pastSurgeries?: string[];
  currentMedications?: string[];
  reports?: string[];
  createdAt: string;
}

const PatientEMR = () => {
  const { emrId } = useParams<{ emrId: string }>();
  const [emrData, setEmrData] = useState<EMR | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!emrId) {
      setError("EMR ID not found in URL.");
      setLoading(false);
      return;
    }

    const fetchEMR = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/emr/${emrId}`);
        const data = await res.json();

        if (data?.data) {
          setEmrData(data.data);
        } else {
          setError("No EMR found for this ID.");
        }
      } catch (err) {
        console.error("Error fetching EMR:", err);
        setError("Failed to load EMR data.");
      } finally {
        setLoading(false);
      }
    };

    fetchEMR();
  }, [emrId]);

  if (loading) return <p>Loading EMR...</p>;
  if (error) return <p>{error}</p>;
  if (!emrData) return <p>No EMR record found.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Patient EMR</h1>
      <p><strong>Allergies:</strong> {emrData.allergies?.join(", ") || "None"}</p>
      <p><strong>Diseases:</strong> {emrData.diseases?.join(", ") || "None"}</p>
      <p><strong>Past Surgeries:</strong> {emrData.pastSurgeries?.join(", ") || "None"}</p>
      <p><strong>Medications:</strong> {emrData.currentMedications?.join(", ") || "None"}</p>
      <p><strong>Created At:</strong> {new Date(emrData.createdAt).toLocaleString()}</p>
    </div>
  );
};

export default PatientEMR;
