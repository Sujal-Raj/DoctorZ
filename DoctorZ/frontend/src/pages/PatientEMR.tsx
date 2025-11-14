


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
  reports: string[];
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
{/*         
    <p>
  <strong>Reports:</strong>{" "}
  {Array.isArray(record.reports) && record.reports.length > 0 ? (
    <ul className="list-disc ml-6">
      {record.reports.map((r, i) => (
        
        <li key={i}>
          
          <a
            href={r}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            {r.split("/").pop()}
          </a>
        </li>
      ))}
    </ul>
  ) : (
    "No reports uploaded"
  )}
</p> */}
<p>
  <strong>Reports:</strong>{" "}
  {Array.isArray(record.reports) && record.reports.length > 0 ? (
    <ul className="list-disc ml-6">

      {record.reports.map((r, i) => {
        
        console.log("Report file path:", r); // <--- ADD THIS

        return (
          <li key={i}>
            <a
              href={`http://localhost:3000${r}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {r.split("/").pop()}
            </a>
          </li>
        );
      })}

    </ul>
  ) : (
    "No reports uploaded"
  )}
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
