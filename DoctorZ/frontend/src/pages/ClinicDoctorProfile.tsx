import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  GraduationCap,
  MessageCircleMore,
  ChevronDown,
  ChevronUp,
  Stethoscope,
} from "lucide-react";

import Availability from "../pages/TimeSlots";

interface Doctor {
  _id: string;
  fullName: string;
  specialization: string;
  qualification: string;
  experience: string;
  consultationFee: number;
  language: string;
  MedicalRegistrationNumber?: string;
  photo?: string;
  signature?: string;
  DegreeCertificate?: string;
}

const ClinicDoctorProfile: React.FC = () => {
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const { drId } = useParams<{ drId: string }>();

  const faqs = [
    "Where does Dr Ridhima Lakhani practice?",
    "How can I book an appointment with Dr Ridhima Lakhani?",
    "What do patients say about Dr Ridhima Lakhani?",
    "What is Dr Ridhima Lakhani's educational qualification?",
    "How many years of experience does Dr Ridhima Lakhani have?",
    "What is Dr Ridhima Lakhani's medical specialty?",
    "What conditions does Dr Ridhima Lakhani treat?",
    "What is the consultation fee for Dr Ridhima Lakhani?",
    "Does Dr Ridhima Lakhani offer online consultations?",
  ];

  useEffect(() => {
    if (!drId) return;

    const fetchDoctor = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get<{ doctor: Doctor }>(
          `http://localhost:3000/api/doctor/${drId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setDoctor(res.data.doctor);
      } catch (err) {
        console.error("Error fetching doctor profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [drId]);

  if (loading) return <p className="p-8">Loading...</p>;
  return (
    <div className="flex flex-col md:flex-row m-4 md:m-8 gap-8">
      {/* Left: Doctor Profile */}
      <div className="flex flex-col w-full md:w-2/3 gap-6">
        {/* Doctor Card */}
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center md:items-start gap-6">
          <img
            src={`http://localhost:3000/uploads/${doctor?.photo}`}
            alt={doctor?.fullName}
            className="h-32 w-32 rounded-full object-cover shadow-md"
          />

          <div className="flex flex-col gap-2 text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-800">
              {doctor?.fullName}
            </h2>
            <p className="text-blue-600 font-medium">
              {doctor?.specialization}
            </p>
            <p className="text-sm text-gray-500">
              {doctor?.experience} years of experience
            </p>

            <div className="mt-2 flex flex-col gap-1 text-gray-700 text-sm">
              <p className="flex items-center gap-2">
                <GraduationCap className="text-blue-500" size={18} />
                {doctor?.qualification}
              </p>
              <p className="flex items-center gap-2">
                <MessageCircleMore className="text-blue-500" size={18} />
                Speaks: {doctor?.language}
              </p>
            </div>
          </div>
        </div>

        {/* Education + Registration + FAQs */}
        <div className="bg-white rounded-xl shadow-md p-6 text-gray-800">
          {/* Education */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-1">
              <GraduationCap className="text-blue-500" size={20} />
              <h3 className="text-lg font-semibold">Education</h3>
            </div>
            <p className="ml-7 text-sm">{doctor?.qualification}</p>
          </div>

          {/* Registration */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-1">
              <Stethoscope className="text-blue-500" size={20} />
              <h3 className="text-lg font-semibold">Medical Registration</h3>
            </div>
            <p className="ml-7 text-sm">{doctor?.MedicalRegistrationNumber}</p>
          </div>

          {/* FAQ Section */}
          <div className="mt-6">
            <h3 className="text-lg font-bold mb-3">
              Frequently Asked Questions
            </h3>
            <div className="divide-y divide-gray-200">
              {faqs.map((question, index) => (
                <div key={index} className="py-3">
                  <button
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                    className="w-full flex justify-between items-center text-left text-sm font-medium text-gray-700 hover:text-blue-600 transition"
                  >
                    {question}
                    {openFAQ === index ? (
                      <ChevronUp size={18} />
                    ) : (
                      <ChevronDown size={18} />
                    )}
                  </button>

                  {openFAQ === index && (
                    <p className="mt-2 text-sm text-gray-600">
                      This is a placeholder answer for the FAQ.
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

   
      
      </div>

      {/* Right: TimeSlots (Availability) */}
   
      

      <div className="w-full md:w-1/3">
        <div className="bg-white shadow-md rounded-xl p-6 h-[90vh] flex flex-col justify-start overflow-y-auto">
         
          <Availability />
        </div>
      </div>
    </div>
  );
};

export default ClinicDoctorProfile;
