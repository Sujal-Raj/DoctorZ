


import React, { useContext } from "react";
import { MapPin, Video, Briefcase, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

export interface Doctor {
  _id: string;
  fullName: string;
  specialization: string;
  qualification?: string;
  experience: string;
  consultationFee: number;
  language?: string;
  MedicalRegistrationNumber?: string;
  location?: string;
  city?: string;
  photo?: string;
  rating?: number;
  gender?: string;
}

interface Props {
  doctor: Doctor;
  onConsult: (doctor: Doctor) => void;
}

const DoctorCard: React.FC<Props> = ({ doctor, onConsult }) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  const handleConsultClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      const confirmed = window.confirm(
        "You need to be logged in to consult. Do you want to login or register now?"
      );
      if (confirmed) navigate("/patient-login");
      return;
    }
    onConsult(doctor);
  };

  const handleCardClick = () => {
    navigate(`/view-doctor-profile/${doctor._id}`);
  };

  // Fixed location display logic
  const getLocationText = () => {
    if (doctor.location && doctor.city) {
      return `${doctor.location}, ${doctor.city}`;
    } else if (doctor.location) {
      return doctor.location;
    } else if (doctor.city) {
      return doctor.city;
    } else {
      return "—";
    }
  };

  return (
<article
  onClick={handleCardClick}
  className="group bg-white border border-gray-400 rounded-xl shadow-sm hover:shadow-md hover:border-gray-400 hover:-translate-y-0.5 transition-all cursor-pointer overflow-hidden"
>
  <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 p-4 md:p-5">
    {/* Doctor Photo - Now horizontally aligned with title */}
    <div className="flex-shrink-0 flex items-start">
      {doctor.photo ? (
        <img
          src={`http://localhost:3000/uploads/${doctor.photo}`}
          alt={`Dr. ${doctor.fullName}`}
          loading="lazy"
          className="w-32 h-32 md:w-40 md:h-40 rounded-lg object-cover border border-gray-200"
        />
      ) : (
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-lg bg-[#28328C] text-white flex items-center justify-center text-2xl font-bold">
          {doctor.fullName.charAt(0)}
        </div>
      )}
    </div>

    {/* Doctor Info - Now aligned horizontally with image */}
    <div className="flex flex-col justify-between w-full md:flex-1 md:min-w-0">
      {/* Name & Specialization - Now aligned with image */}
      <div className="text-left">
        <h2 className="text-lg md:text-xl font-bold text-gray-900 break-words">
          Dr. {doctor.fullName}
        </h2>
        <p className="text-[#28328C] text-sm md:text-base font-medium mt-1 break-words">
          {doctor.specialization}
        </p>

        {/* Experience - Left aligned */}
        <div className="flex items-center gap-2 mt-2">
          <span className="flex items-center gap-1 text-xs font-semibold bg-[#28328C]/10 text-[#28328C] px-3 py-1 rounded-full">
            <Briefcase className="w-3.5 h-3.5" /> {doctor.experience} yrs experience
          </span>
        </div>

        {/* City + Location - Left aligned */}
        <div className="flex items-center gap-1 text-gray-600 text-sm mt-3">
          <MapPin className="w-4 h-4 text-gray-500 flex-shrink-0" />
          <span>
            {getLocationText()}
          </span>
        </div>
      </div>

      {/* Fee & Consult Buttons - Stacked on mobile, row on desktop */}
      <div className="flex flex-col md:flex-row justify-between items-center md:items-center mt-4 md:mt-2 gap-3 w-full">
        {/* Fee - Left aligned */}
        <div className="text-left w-full md:w-auto">
          <p className="text-lg font-semibold text-gray-900">
            ₹{doctor.consultationFee}
          </p>
          <p className="text-xs text-gray-500">Consultation Fee</p>
        </div>

        {/* Buttons - Full width stacked on mobile, auto width on desktop */}
        <div className="flex flex-col gap-2 w-full md:w-auto">
          {/* Contact Clinic Button */}
          <button
            onClick={handleConsultClick}
            className="inline-flex items-center justify-center gap-2 px-4 md:px-5 py-2.5 bg-white text-[#28328C] border border-[#28328C] hover:bg-[#28328C]/10 text-sm rounded-lg font-medium shadow-sm transition-all w-full md:w-auto"
          >
            <Phone className="w-4 h-4" /> 
            <span>Contact Clinic</span>
          </button>

          {/* Schedule Appointment Button */}
          <button
            onClick={handleConsultClick}
            className="inline-flex items-center justify-center gap-2 px-4 md:px-5 py-2.5 bg-[#28328C] hover:bg-[#1f286f] text-white text-sm rounded-lg font-medium shadow-sm border border-[#1f286f] transition-all w-full md:w-auto"
          >
            <Video className="w-4 h-4" /> 
            <span>Schedule Appointment</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</article>
  );
};

export default DoctorCard;