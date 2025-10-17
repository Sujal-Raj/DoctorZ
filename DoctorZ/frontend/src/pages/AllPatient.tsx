import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../Services/client";
import { HiUserCircle } from "react-icons/hi"; // at the top
import {Phone} from "lucide-react";

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
<div className="p-5 overflow-x-auto rounded-lg font-[Poppins]">
      <h2 className="text-xl font-bold mb-4">Patients List</h2>
      {patients.length === 0 ? (
        <p className="text-gray-500">No patients found.</p>
      ) : (
        <table className="min-w-full text-left bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-700 text-sm">
            <tr>
              <th className="px-4 py-3 ">Name</th>
              <th className="px-4 py-3">Gender</th>
              <th className="px-4 py-3 ">Age</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Call / Msg</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient, idx) => (
              <tr key={idx} className="border-t hover:bg-gray-50 text-sm ">
                <td className="px-4 py-3 font-medium flex items-center gap-2 ">
                  <HiUserCircle className="text-2xl text-pink-500" />
                  {patient.name}
                </td>
                <td className="px-4 py-3 ">{patient.gender}</td>
                <td className="px-4 py-3">{patient.age} yrs</td>
                <td className="px-4 py-3 "> 
                   <div className="flex items-center gap-2">
                      <Phone size={20} className="text-gray-500 flex-shrink-0" />
                      <span className="truncate">{patient.contact || "N/A"}</span>
                    </div>
                </td>
                   
                  
                <td className="px-4 py-3 space-x-2 font-poppins">
                  <a
                    href={`tel:${patient.contact}`}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
                  >
                    Call
                  </a>
                  <button
                    onClick={() => navigate("/doctor-chat")}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                  >
                    Chat
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllPatient;   