import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/client";

interface Patient {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  age: number;
}

interface Booking {
  _id: string;
  patientId: Patient;
  // other booking fields if needed
}

const AllPatient: React.FC = () => {
  const { drId } = useParams<{ drId: string }>();
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!drId) return;
      try {
        const res = await api.get<{ bookings: Booking[] }>(
          `/api/booking/doctor/${drId}`
        );
        // Extract patient info from bookings
        const patientList = res.data.bookings.map((b) => b.patientId);
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
          {patients.map((patient) => (
            <div
              key={patient._id}
              className="p-4 border rounded flex items-center justify-between"
            >
              <div>
                <div className="font-semibold">{patient.fullName}</div>
                <div className="text-sm text-gray-500">{patient.email}</div>
              </div>
              <div className="flex gap-2">
                <a
                  href={`tel:${patient.phone}`}
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Call
                </a>
                <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
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
