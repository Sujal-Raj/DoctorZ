
// import React, { useContext } from "react";
// import { Video, MapPin, Clock, Star } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../Context/AuthContext";

// export interface Doctor {
//   _id: string;
//   fullName: string;
//   specialization: string;
//   qualification: string;
//   experience: string; // years
//   consultationFee: number;
//   language: string;
//   MedicalRegistrationNumber?: string;
//   location?: string;
//   photo?: string;
//   rating?: number;
//   gender?: string;  
// }

// interface Props {
//   doctor: Doctor;
//   onConsult: (doctor: Doctor) => void;
// }

// const DoctorCard: React.FC<Props> = ({ doctor, onConsult }) => {
//   const navigate = useNavigate();
//   const { isLoggedIn } = useContext(AuthContext);

//   // Handle consult click
//   const handleConsultClick = (e: React.MouseEvent) => {
//     e.stopPropagation(); // Prevent triggering card click
//     if (!isLoggedIn) {
//       const confirmed = window.confirm(
//         "You need to be logged in to consult. Do you want to login or register now?"
//       );
//       if (confirmed) {
//         navigate("/patient-login");
//       }
//       return;
//     }
//     onConsult(doctor);
//   };

//   // Handle clicking the whole card
//   const handleCardClick = () => {
//     navigate(`/view-doctor-profile/${doctor._id}`);
//   };

//   return (
//     <div
//       onClick={handleCardClick}
//       className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 cursor-pointer"
//       role="button"
//       tabIndex={0}
//       onKeyDown={(e) => {
//         if (e.key === "Enter" || e.key === " ") {
//           handleCardClick();
//         }
//       }}
//     >
//       <div className="flex flex-col md:flex-row p-6 gap-6">
//         {/* Photo */}
//         <div className="flex-shrink-0 mx-auto md:mx-0">
//           {doctor.photo ? (
//             <img
//               src={`http://localhost:3000/uploads/${doctor.photo}`}
//               alt={doctor.fullName}
//               className="h-28 w-28 rounded-full object-cover shadow"
//             />
//           ) : (
//             <div className="h-28 w-28 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-semibold shadow">
//               {doctor.fullName.charAt(0)}
//             </div>
//           )}
//         </div>

//         {/* Info */}
//         <div className="flex-1 flex flex-col md:flex-row justify-between gap-4">
//           <div className="flex-1">
//             <h3 className="text-xl font-semibold text-gray-900">{doctor.fullName}</h3>
//             <p className="text-blue-600 font-medium mt-1">{doctor.specialization}</p>
//             <p className="text-sm text-gray-600 mt-1">
//               {doctor.qualification} • {doctor.experience} yrs experience
//             </p>

//             <div className="flex flex-wrap gap-2 mt-3 text-sm text-gray-600">
//               <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-50 rounded">
//                 <Star className="w-4 h-4 text-yellow-500" /> {doctor.rating ?? "4.8"}
//               </span>
//               {doctor.location && (
//                 <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-50 rounded">
//                   <MapPin className="w-4 h-4" /> {doctor.location}
//                 </span>
//               )}
//               <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-50 rounded">
//                 <Clock className="w-4 h-4" /> Reg: {doctor.MedicalRegistrationNumber ?? "—"}
//               </span>
//             </div>

//             <p className="mt-3 text-sm text-gray-700">Languages: {doctor.language}</p>

//             {/* Optional: you can remove this button since whole card is clickable */}
//             {/* <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 navigate(`/view-doctor-profile/${doctor._id}`);
//               }}
//               className="text-sm text-blue-500 font-bold mt-2 cursor-pointer"
//             >
//               View profile
//             </button> */}
//           </div>

//           {/* Fee & Consult */}
//           <div className="mt-4 md:mt-0 flex flex-col items-start md:items-end gap-3 flex-shrink-0">
//             <div className="text-2xl font-bold text-gray-900">₹{doctor.consultationFee}</div>
//             <div className="text-sm text-gray-500">Consultation</div>

//             <button
//               onClick={handleConsultClick}
//               className="mt-2 px-3 py-2 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-lg shadow hover:from-green-700 transition w-full md:w-auto"
//             >
//               <div className="flex items-center gap-2 justify-center">
//                 <Video className="w-4 h-4" /> Consult
//               </div>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DoctorCard;


// import React, { useContext } from "react";
// import { MapPin, Video, Briefcase } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../Context/AuthContext";

// export interface Doctor {
//   _id: string;
//   fullName: string;
//   specialization: string;
//   qualification?: string;
//   experience: string;
//   consultationFee: number;
//   language?: string;
//   MedicalRegistrationNumber?: string;
//   location?: string;
//   city?: string;
//   photo?: string;
//   rating?: number;
//   gender?: string;
// }

// interface Props {
//   doctor: Doctor;
//   onConsult: (doctor: Doctor) => void;
// }

// const DoctorCard: React.FC<Props> = ({ doctor, onConsult }) => {
//   const navigate = useNavigate();
//   const { isLoggedIn } = useContext(AuthContext);

//   const handleConsultClick = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     if (!isLoggedIn) {
//       const confirmed = window.confirm(
//         "You need to be logged in to consult. Do you want to login or register now?"
//       );
//       if (confirmed) navigate("/patient-login");
//       return;
//     }
//     onConsult(doctor);
//   };

//   const handleCardClick = () => {
//     navigate(`/view-doctor-profile/${doctor._id}`);
//   };

//   return (
//     <article
//       onClick={handleCardClick}
//       className="group bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer overflow-hidden"
//     >
//       <div className="flex items-center gap-5 p-5">
//         {/* Doctor Photo */}
//         <div className="flex-shrink-0">
//           {doctor.photo ? (
//             <img
//               src={`http://localhost:3000/uploads/${doctor.photo}`}
//               alt={`Dr. ${doctor.fullName}`}
//               loading="lazy"
//               className="w-28 h-28 rounded-lg object-cover border border-gray-100"
//             />
//           ) : (
//             <div className="w-28 h-28 rounded-lg bg-[#106C89] text-white flex items-center justify-center text-2xl font-bold">
//               {doctor.fullName.charAt(0)}
//             </div>
//           )}
//         </div>

//         {/* Doctor Info */}
//         <div className="flex flex-col justify-between flex-1 min-w-0">
//           {/* Name & Specialization */}
//           <div>
//             <h2 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
//               Dr. {doctor.fullName}
//             </h2>
//             <p className="text-[#106C89] text-sm sm:text-base font-medium mt-1 truncate">
//               {doctor.specialization}
//             </p>

//             {/* Experience */}
//             <div className="flex items-center gap-2 mt-2">
//               <span className="flex items-center gap-1 text-xs font-semibold bg-sky-50 text-[#106C89] px-3 py-1 rounded-full">
//                 <Briefcase className="w-3.5 h-3.5" /> {doctor.experience} yrs experience
//               </span>
//             </div>

//             {/* City + Location */}
//             <div className="flex items-center gap-1 text-gray-600 text-sm mt-3">
//               <MapPin className="w-4 h-4 text-gray-500" />
//               <span>
//                 {doctor.location
//                   ? `${doctor.location}${doctor.city ? `, ${doctor.city}` : ""}`
//                   : doctor.city || "—"}
//               </span>
//             </div>
//           </div>

//           {/* Fee & Consult Button */}
//           <div className="flex flex-col sm:flex-row justify-between items-center mt-4 sm:mt-5 gap-2">
//             <div className="text-center sm:text-left">
//               <p className="text-lg font-semibold text-gray-900">
//                 ₹{doctor.consultationFee}
//               </p>
//               <p className="text-xs text-gray-500">Consultation Fee</p>
//             </div>

//             <button
//               onClick={handleConsultClick}
//               className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#106C89] hover:bg-[#0d5970] text-white text-sm rounded-lg font-medium shadow-sm transition-all w-full sm:w-auto"
//             >
//               <Video className="w-4 h-4" /> Consult
//             </button>
//           </div>
//         </div>
//       </div>
//     </article>
//   );
// };

// export default DoctorCard;

import React, { useContext } from "react";
import { MapPin, Video, Briefcase } from "lucide-react";
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

  return (
    <article
      onClick={handleCardClick}
      className="group bg-white border border-gray-400 rounded-xl shadow-sm hover:shadow-md hover:border-gray-400 hover:-translate-y-0.5 transition-all cursor-pointer overflow-hidden"
    >
      <div className="flex items-center gap-5 p-5">
        {/* Doctor Photo */}
        <div className="flex-shrink-0">
          {doctor.photo ? (
            <img
              src={`http://localhost:3000/uploads/${doctor.photo}`}
              alt={`Dr. ${doctor.fullName}`}
              loading="lazy"
              className="w-28 h-28 rounded-lg object-cover border border-gray-200"
            />
          ) : (
            <div className="w-28 h-28 rounded-lg bg-[#28328C] text-white flex items-center justify-center text-2xl font-bold">
              {doctor.fullName.charAt(0)}
            </div>
          )}
        </div>

        {/* Doctor Info */}
        <div className="flex flex-col justify-between flex-1 min-w-0">
          {/* Name & Specialization */}
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
              Dr. {doctor.fullName}
            </h2>
            <p className="text-[#28328C] text-sm sm:text-base font-medium mt-1 truncate">
              {doctor.specialization}
            </p>

            {/* Experience */}
            <div className="flex items-center gap-2 mt-2">
              <span className="flex items-center gap-1 text-xs font-semibold bg-[#28328C]/10 text-[#28328C] px-3 py-1 rounded-full">
                <Briefcase className="w-3.5 h-3.5" /> {doctor.experience} yrs experience
              </span>
            </div>

            {/* City + Location */}
            <div className="flex items-center gap-1 text-gray-600 text-sm mt-3">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span>
                {doctor.location
                  ? `${doctor.location}${doctor.city ? `, ${doctor.city}` : ""}`
                  : doctor.city || "—"}
              </span>
            </div>
          </div>

          {/* Fee & Consult Button */}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-4 sm:mt-5 gap-2">
            <div className="text-center sm:text-left">
              <p className="text-lg font-semibold text-gray-900">
                ₹{doctor.consultationFee}
              </p>
              <p className="text-xs text-gray-500">Consultation Fee</p>
            </div>

            <button
              onClick={handleConsultClick}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#28328C] hover:bg-[#1f286f] text-white text-sm rounded-lg font-medium shadow-sm border border-[#1f286f] transition-all w-full sm:w-auto"
            >
              <Video className="w-4 h-4" /> Consult
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default DoctorCard;
