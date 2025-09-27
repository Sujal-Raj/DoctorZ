import React, { useEffect, useState } from "react";
import axios from "axios";
import { useOutletContext } from "react-router-dom";

interface Clinic {
  _id: string;
  clinicName: string;
  clinicType: "Private" | "Government";
  specialities: string[];

  address: string;
  state: string;
  district: string;
  pincode: number;

  phone: string;
  email: string;

  doctors: string[]; // Doctor IDs (populate करोगे तो Doctor[] बना सकते हो)
  operatingHours: string;
  clinicLicenseNumber: string;
  registrationCertificate?: string;

  aadharNumber: number;
  panNumber: string;

  staffName: string;
  staffEmail: string;
  staffId: string;
  
}

interface OutletContext {
  clinicId: string | undefined;
}


const ClinicProfile: React.FC = () => {
    const { clinicId } = useOutletContext<OutletContext>();
  const [clinic, setClinic] = useState<Clinic | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchClinic = async () => {
      try {
      
        if (!clinicId) {
          setError("Clinic ID not found. Please login again.");
          setLoading(false);
          return;
        }

        const res = await axios.get<{ clinic: Clinic }>(
          `http://localhost:3000/api/clinic/getClinicById/${clinicId}`
        );
        setClinic(res.data.clinic);
      } catch (err) {
        setError("Failed to fetch clinic details: " + err);
      } finally {
        setLoading(false);
      }
    };

    fetchClinic();
  }, []);

  if (loading) return <p className="text-center text-lg">Loading clinic profile...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!clinic) return <p className="text-center">Clinic not found</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">Clinic Profile</h2>

      <div className="space-y-3">
        <p><strong>Clinic Name:</strong> {clinic.clinicName}</p>
        <p><strong>Type:</strong> {clinic.clinicType}</p>
        <p><strong>Specialities:</strong> {clinic.specialities.join(", ")}</p>

        <p>
          <strong>Address:</strong> {clinic.address}, {clinic.district}, {clinic.state} - {clinic.pincode}
        </p>

        <p><strong>Phone:</strong> {clinic.phone}</p>
        <p><strong>Email:</strong> {clinic.email}</p>
        <p><strong>Operating Hours:</strong> {clinic.operatingHours}</p>
        <p><strong>Clinic License No:</strong> {clinic.clinicLicenseNumber}</p>

        {clinic.registrationCertificate && (
          <a
            href={`http://localhost:3000/uploads/${clinic.registrationCertificate}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            View Registration Certificate
          </a>
        )}

        <p><strong>PAN No:</strong> {clinic.panNumber}</p>
        <p><strong>Aadhar No:</strong> {clinic.aadharNumber}</p>

        <h3 className="text-lg font-semibold mt-4">Staff Details</h3>
        <p><strong>Staff Name:</strong> {clinic.staffName}</p>
        <p><strong>Staff Email:</strong> {clinic.staffEmail}</p>
        <p><strong>Staff ID:</strong> {clinic.staffId}</p>
      </div>
    </div>
  );
};

export default ClinicProfile;