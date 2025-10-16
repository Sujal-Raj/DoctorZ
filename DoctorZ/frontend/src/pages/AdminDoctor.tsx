
import { useEffect, useState } from "react";

interface Doctor {
  _id: string;
  fullName: string;
  gender: string;
  consultationFee: number;
  dob: string;
  status: string;
  qualification: string;
  specialization: string;
  experience: number;
}

export default function AdminDoctor() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  const fetchDoctors = async () => {
    const token = localStorage.getItem("admin_token");
    const res = await fetch("http://localhost:3000/api/admin/doctors/pending",{
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, 
    },
    });
    const data = await res.json();
    setDoctors(data);
  };

  const handleAction = async (id: string, action: "approve" | "reject") => {
    await fetch(`http://localhost:3000/api/admin/doctor/${id}/${action}`, { method: "POST" });
    fetchDoctors(); // refresh list after action
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Pending Doctors</h2>
      {doctors.length === 0 ? (
        <p>No pending requests</p>
      ) : (
        <ul>
          {doctors.map((doc) => (
            <li key={doc._id} className="flex justify-between items-center border p-2 mb-2">
              
               <div className="text-sm text-gray-700 space-y-1 text-bold ">
                <h3><strong>Name: </strong>{doc.fullName}</h3>
                <p><strong>Gender: </strong> {doc.gender}</p>
              <p><strong>DOB: </strong> {new Date(doc.dob).toLocaleDateString()}</p>
           
              <p><strong>Qualification: </strong> {doc.qualification}</p>
              <p><strong>Specialization: </strong> {doc.specialization}</p>
              <p><strong>Experience: </strong> {doc.experience} years</p>
              <p><strong>Consultation Fee: </strong> ₹{doc.consultationFee}</p>
               </div>
              
              
              <div>
                 <span
                  className={`px-3 py-1 text-2xs font-semibold rounded-full ${
                    doc.status === "pending"
                      ? "bg-yellow-200 text-yellow-700"
                      : doc.status === "approved"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                </span>
              </div>
              <div>
                <button 
                  className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                  onClick={() => handleAction(doc._id, "approve")}
                >
                  Approve
                </button>
                <button 
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => handleAction(doc._id, "reject")}
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}