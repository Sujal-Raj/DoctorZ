import React, { useEffect, useState } from "react";

import axios from "axios";

interface Doctor {
  _id: string;
  fullName: string;
  specialization: string;
  qualification: string;
  experience: number;
  consultationFee: number;
  language: string;
  MedicalRegistrationNumber: number;
  Aadhar: number;
  
  photo?: string;
  signature?: string;
  DegreeCertificate?: string;
}

const DoctorProfile: React.FC = () => {
 
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const token = localStorage.getItem("token"); // token saved on login
        const doctorId = localStorage.getItem("doctorId");

        
        if (!doctorId) {
          setError("Doctor ID not found. Please login again.");
          setLoading(false);
          return;
        }

        const res = await axios.get<{ doctor: Doctor }>(
          `http://localhost:3000/api/doctor/${doctorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDoctor(res.data.doctor);
      } catch (err) {
        setError("Failed to fetch doctor details" + err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, []);

  if (loading) return <p className="text-center text-lg">Loading profile...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!doctor) return <p className="text-center">Doctor not found</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">Doctor Profile</h2>
      <div className="flex flex-col items-center">
        {doctor.photo && (
          <img
            src={`http://localhost:3000/uploads/${doctor.photo}`}
            alt="Doctor"
            className="w-32 h-32 rounded-full object-cover border"
          />
        )}
        <h3 className="text-xl font-semibold mt-3">{doctor.fullName}</h3>
        <p className="text-gray-600">Specialization: {doctor.specialization}</p>
        <p className="text-gray-600">Qualification: {doctor.qualification}</p>
        <p className="text-gray-600">Experience: {doctor.experience} years</p>
        <p className="text-gray-600">
          Consultation Fee: ₹{doctor.consultationFee}
        </p>
        <p className="text-gray-600">Language: {doctor.language}</p>
        <p className="text-gray-600">
          Reg. No: {doctor.MedicalRegistrationNumber}
        </p>
        <p className="text-gray-600">
          Aadhar No: {doctor.Aadhar}
        </p>
       
        {/* Signature */}
        {doctor.signature && (
          <div className="mt-4">
            <p className="font-semibold">Digital Signature:</p>
            <img
              src={`http://localhost:3000/uploads/${doctor.signature}`}
              alt="Signature"
              className="w-40 mt-2"
            />
          </div>
        )}

        {/* Degree Certificate */}
        {doctor.DegreeCertificate && (
          <a
            href={`http://localhost:3000/uploads/${doctor.DegreeCertificate}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            View Degree Certificate
          </a>
        )}
      </div>
    </div>
  );
};

export default DoctorProfile;