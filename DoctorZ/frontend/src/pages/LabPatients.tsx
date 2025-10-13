

import { useEffect, useState } from "react";
import axios from "axios";
import { useOutletContext } from "react-router-dom";

// Interface for each booking
interface PatientBooking {
  _id: string;
  userId: { _id: string; fullName: string } | string; // populated object or just ID
  testName: string;
  bookingDate: string;
  status: string;
}

// Lab dashboard context
interface LabDashboardContext {
  labId: string | null;
}

const Patients = () => {
  const { labId } = useOutletContext<LabDashboardContext>();
  const [patients, setPatients] = useState<PatientBooking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      if (!labId) return;

      try {
        // Fetch all bookings for this lab
        const res = await axios.get<{ labPatients: PatientBooking[] }>(
          `http://localhost:3000/api/lab/getLabPatients/${labId}`
        );

        // Ensure userId has a name
        const bookings = res.data.labPatients.map((b) => ({
          ...b,
          userId:
            typeof b.userId === "string"
              ? { _id: b.userId, fullName: "Unknown" } // fallback if not populated
              : b.userId,
        }));

        setPatients(bookings);
      } catch (err) {
        console.error("Error fetching patients:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, [labId]);

  if (loading) return <p>Loading patients...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Booked Patients</h2>
      {patients.length === 0 ? (
        <p>No patients found.</p>
      ) : (
        <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 text-left">Patient Name</th>
              <th className="p-2 text-left">Test</th>
              <th className="p-2 text-left">Date</th>
              {/* <th className="p-2 text-left">Status</th> */}
            </tr>
          </thead>
          <tbody>
            {patients.map((p, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50 transition">
                <td className="p-2">{(p.userId as { fullName: string }).fullName}</td>
                <td className="p-2">{p.testName}</td>
                <td className="p-2">{new Date(p.bookingDate).toLocaleDateString()}</td>
                {/* <td className="p-2">{p.status}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Patients;