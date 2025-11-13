

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
//   const { emrId } = useParams<{ emrId: string }>();
//   const [emrData, setEmrData] = useState<EMR | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!emrId) {
//       setError("EMR ID not found in URL.");
//       setLoading(false);
//       return;
//     }

//     const fetchEMR = async () => {
//       try {
//         const res = await fetch(`http://localhost:3000/api/emr/${emrId}`);
//         const data = await res.json();

//         if (data?.data) {
//           setEmrData(data.data);
//         } else {
//           setError("No EMR found for this ID.");
//         }
//       } catch (err) {
//         console.error("Error fetching EMR:", err);
//         setError("Failed to load EMR data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEMR();
//   }, [emrId]);

//   if (loading) return <p>Loading EMR...</p>;
//   if (error) return <p>{error}</p>;
//   if (!emrData) return <p>No EMR record found.</p>;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-6">Patient EMR</h1>
//       <p><strong>Allergies:</strong> {emrData.allergies?.join(", ") || "None"}</p>
//       <p><strong>Diseases:</strong> {emrData.diseases?.join(", ") || "None"}</p>
//       <p><strong>Past Surgeries:</strong> {emrData.pastSurgeries?.join(", ") || "None"}</p>
//       <p><strong>Medications:</strong> {emrData.currentMedications?.join(", ") || "None"}</p>
//       <p><strong>Created At:</strong> {new Date(emrData.createdAt).toLocaleString()}</p>
//     </div>
//   );
// };

// export default PatientEMR;




import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../Services/mainApi";

// ---------------- Interfaces ----------------
interface EMRRecord {
  _id: string;
  aadhar: string;
  diagnosis: string;
  diseases: string[];
  prescriptions: string[];
  currentMedications: string[];
  allergies: string[];
  createdAt: string;
}

interface EMRResponse {
  emr: EMRRecord[];
}

// ---------------- Component ----------------
const PatientEMR: React.FC = () => {
  const { aadhar } = useParams<{ aadhar: string }>();
  const [emrData, setEmrData] = useState<EMRRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEMR = async () => {
      if (!aadhar) return;
      try {
        setLoading(true);
        // 👇 Explicitly tell Axios the response type
        const res = await api.get<EMRResponse>(`/api/emr/${aadhar}`);
        setEmrData(res.data.emr || []);
      } catch (err) {
        console.error("Error fetching EMR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEMR();
  }, [aadhar]);

  return (
    <div className="p-6 font-[Poppins]">
      <h2 className="text-xl font-bold mb-4 text-center text-gray-700">
        Patient EMR Details
      </h2>

      {loading ? (
        <p className="text-gray-500 text-center">Loading EMR...</p>
      ) : emrData.length === 0 ? (
        <p className="text-gray-500 text-center">No EMR records found.</p>
      ) : (
        <div className="space-y-4">
         {emrData.map((record) => (
  <div
    key={record._id}
    className="p-4 border rounded-lg shadow-md bg-white"
  >
    <p><strong>Aadhar:</strong> {record.aadhar}</p>
    <p><strong>Diagnosis:</strong> {record.diagnosis || "N/A"}</p>
    <p><strong>Prescriptions:</strong> {record.currentMedications.join(", ") || "N/A"}</p>

    {/* ✅ Safe join with fallback */}
    <p>
      <strong>Allergies:</strong>{" "}
      {Array.isArray(record.allergies) && record.allergies.length > 0
        ? record.allergies.join(", ")
        : "None"}
    </p>

        <p>
      <strong>Diseases:</strong>{" "}
      {Array.isArray(record.diseases) && record.diseases.length > 0
        ? record.allergies.join(", ")
        : "None"}
    </p>
        
    

    <p className="text-sm text-gray-500 mt-1">
      <strong>Date:</strong>{" "}
      {record.createdAt
        ? new Date(record.createdAt).toLocaleDateString()
        : "N/A"}
    </p>
  </div>
))}

        </div>
      )}
    </div>
  );
};

export default PatientEMR;
