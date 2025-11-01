import { useState, useEffect } from "react";
import axios from "axios";

interface EMRFile {
  _id: string;
  fileName: string;
  fileUrl: string;
  uploadedAt: string;
}

export default function EMRSection() {
  const [emrFiles, setEmrFiles] = useState<EMRFile[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const userId = localStorage.getItem("userId");

  // 🔹 Fetch EMR files from backend
  const fetchEMRs = async () => {
    try {
      const res = await axios.get<EMRFile[]>(`http://localhost:3000/api/emr/${userId}`);
      setEmrFiles(res.data );
    } catch (err) {
      console.error("Error fetching EMRs:", err);
    }
  };

  // 🔹 Upload new EMR file
  const handleUpload = async () => {
    if (!file) return alert("Please select a file first");
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("patientId", userId!);

      await axios.post("http://localhost:3000/api/emr/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("EMR uploaded successfully");
      setFile(null);
      fetchEMRs(); // refresh list
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed");
    }
  };

  useEffect(() => {
    fetchEMRs();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mt-6">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-xl font-semibold text-blue-700">Electronic Medical Records</h3>
        <label className="cursor-pointer bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700">
          + Add
          <input
            type="file"
            className="hidden"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </label>
      </div>

      {file && (
        <button
          onClick={handleUpload}
          className="bg-green-600 text-white px-3 py-1 rounded-lg mb-4 hover:bg-green-700"
        >
          Upload File
        </button>
      )}

      <div>
        {emrFiles.length > 0 ? (
          <ul className="list-disc ml-5">
            {emrFiles.map((emr) => (
              <li key={emr._id}>
                <a
                  href={emr.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {emr.fileName}
                </a>{" "}
                <span className="text-gray-500 text-sm">
                  ({new Date(emr.uploadedAt).toLocaleDateString()})
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No EMR files found.</p>
        )}
      </div>
    </div>
  );
}
