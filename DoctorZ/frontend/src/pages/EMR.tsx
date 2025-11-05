// import { useState, useEffect } from "react";
// import axios from "axios";

// interface EMRFile {
//   _id: string;
//   fileName: string;
//   fileUrl: string;
//   uploadedAt: string;
// }

// export default function EMRSection() {
//   const [emrFiles, setEmrFiles] = useState<EMRFile[]>([]);
//   const [file, setFile] = useState<File | null>(null);
//   const userId = localStorage.getItem("userId");

//   // 🔹 Fetch EMR files from backend
//   const fetchEMRs = async () => {
//     try {
//       const res = await axios.get<EMRFile[]>(`http://localhost:3000/api/emr/${userId}`);
//       setEmrFiles(res.data);
//     } catch (err) {
//       console.error("Error fetching EMRs:", err);
//     }
//   };

//   // 🔹 Upload new EMR file
//   const handleUpload = async () => {
//     if (!file) return alert("Please select a file first");
//     try {
//       const formData = new FormData();
//       formData.append("reports", file);
//       formData.append("patientId", userId!);

//       await axios.post("http://localhost:3000/api/emr/createEmr", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       alert("EMR uploaded successfully");
//       setFile(null);
//       fetchEMRs(); // refresh list
//     } catch (err) {
//       console.error("Upload failed:", err);
//       alert("Upload failed");
//     }
//   };

//   useEffect(() => {
//     fetchEMRs();
//   }, []);

//   return (
//     <div className="bg-white shadow-md rounded-lg p-4 mt-6">
//       <div className="flex justify-between items-center mb-3">
//         <h3 className="text-xl font-semibold text-blue-700">Electronic Medical Records</h3>
//         <label className="cursor-pointer bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700">
//           + Add
//           <input
//             type="file"
//             className="hidden"
//             onChange={(e) => setFile(e.target.files?.[0] || null)}
//           />
//         </label>
//       </div>

//       {file && (
//         <button
//           onClick={handleUpload}
//           className="bg-green-600 text-white px-3 py-1 rounded-lg mb-4 hover:bg-green-700"
//         >
//           Upload File
//         </button>
//       )}

//       <div>
//         {emrFiles.length > 0 ? (
//           <ul className="list-disc ml-5">
//             {emrFiles.map((emr) => (
//               <li key={emr._id}>
//                 <a
//                   href={emr.fileUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-600 underline"
//                 >
//                   {emr.fileName}
//                 </a>{" "}
//                 <span className="text-gray-500 text-sm">
//                   ({new Date(emr.uploadedAt).toLocaleDateString()})
//                 </span>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="text-gray-600">No EMR files found.</p>
//         )}
//       </div>
//     </div>
//   );
// }


// import { useState, useEffect } from "react";
// import axios from "axios";

// interface EMR {
//   _id: string;
//   reports: string[];
//   createdAt: string;
// }

// interface EMRResponse {
//   message: string;
//   data: EMR[];
// }


// export default function EMRSection() {
//   const [emrFiles, setEmrFiles] = useState<EMR[]>([]);
//   const [file, setFile] = useState<File | null>(null);
//   const userId = localStorage.getItem("userId");

//   // 🔹 Fetch EMRs from backend
//   const fetchEMRs = async () => {
//     try {
//       const res = await axios.get<EMRResponse>(`http://localhost:3000/api/emr/${userId}`);
//       // ✅ backend usually sends { data: [...] }
//       setEmrFiles(res.data.data || []);
//     } catch (err) {
//       console.error("Error fetching EMRs:", err);
//     }
//   };

//   // 🔹 Upload new EMR file
//   const handleUpload = async () => {
//     if (!file) return alert("Please select a file first");

//     try {
//       const formData = new FormData();
//       formData.append("reports", file); // ✅ must match multer field name
//       formData.append("patientId", userId!);

//       await axios.post("http://localhost:3000/api/emr/createEmr", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       alert("EMR uploaded successfully!");
//       setFile(null);
//       fetchEMRs(); // ✅ refresh list instantly
//     } catch (err) {
//       console.error("Upload failed:", err);
//       alert("Upload failed. Check console for details.");
//     }
//   };

//   useEffect(() => {
//     fetchEMRs();
//   }, []);

//   return (
//     <div className="bg-white shadow-md rounded-lg p-4 mt-6">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-3">
//         <h3 className="text-xl font-semibold text-blue-700">
//           Electronic Medical Records
//         </h3>

        
//       </div>

//       {/* Upload button */}
//       {file && (
//         <button
//           onClick={handleUpload}
//           className="bg-green-600 text-white px-3 py-1 rounded-lg mb-4 hover:bg-green-700"
//         >
//           Upload File
//         </button>
//       )}

//       {/* EMR List */}
//       <div>
//         {emrFiles.length > 0 ? (
//           <ul className="list-disc ml-5">
//             {emrFiles.map((emr) =>
//               emr.reports.map((reportUrl, i) => (
//                 <li key={`${emr._id}-${i}`} className="my-1">
//                   <a
//                     href={`http://localhost:3000${reportUrl}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-600 underline"
//                   >
//                     {reportUrl.split("/").pop()}
//                   </a>
//                   <span className="text-gray-500 text-sm ml-2">
//                     ({new Date(emr.createdAt).toLocaleDateString()})
//                   </span>
//                 </li>
//               ))
//             )}
//           </ul>
//         ) : (
//           <p className="text-gray-600">No EMR files found.</p>
//         )}
//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import axios from "axios";

interface EMR {
  _id: string;
  allergies?: string[];
  diseases?: string[];
  pastSurgeries?: string[];
  currentMedications?: string[];
  reports: string[];
  createdAt: string;
}

interface EMRResponse {
  message: string;
  data: EMR[];
}

export default function EMRSection() {
  const [emrFiles, setEmrFiles] = useState<EMR[]>([]);
  
  const userId = localStorage.getItem("userId");

  // 🔹 Fetch EMRs from backend
  const fetchEMRs = async () => {
    try {
      const res = await axios.get<EMRResponse>(
        `http://localhost:3000/api/emr/${userId}`
      );
      setEmrFiles(res.data.data || []);
    } catch (err) {
      console.error("Error fetching EMRs:", err);
    }
  };


  useEffect(() => {
    fetchEMRs();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mt-6">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-xl font-semibold text-blue-700">
          Electronic Medical Records (EMR)
        </h3>
      </div>

      {/* File Upload Input */}
      

      {/* EMR Records */}
      {emrFiles.length > 0 ? (
        <div className="space-y-4">
          {emrFiles.map((emr) => (
            <div
              key={emr._id}
              className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <p>
                <strong>Allergies:</strong>{" "}
                {emr.allergies?.length ? emr.allergies.join(", ") : "None"}
              </p>
              <p>
                <strong>Diseases:</strong>{" "}
                {emr.diseases?.length ? emr.diseases.join(", ") : "None"}
              </p>
              <p>
                <strong>Past Surgeries:</strong>{" "}
                {emr.pastSurgeries?.length
                  ? emr.pastSurgeries.join(", ")
                  : "None"}
              </p>
              <p>
                <strong>Current Medications:</strong>{" "}
                {emr.currentMedications?.length
                  ? emr.currentMedications.join(", ")
                  : "None"}
              </p>

              {/* Reports Section */}
              {emr.reports?.length ? (
                <div className="mt-2">
                  <strong>Reports:</strong>
                  <ul className="list-disc list-inside">
                    {emr.reports.map((reportUrl, i) => (
                      <li key={`${emr._id}-${i}`}>
                        <a
                          href={`http://localhost:3000${reportUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          {reportUrl.split("/").pop()}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p>
                  <strong>Reports:</strong> None
                </p>
              )}

              <p className="text-gray-500 text-sm mt-3">
                Created At: {new Date(emr.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No EMR records found.</p>
      )}
    </div>
  );
}
