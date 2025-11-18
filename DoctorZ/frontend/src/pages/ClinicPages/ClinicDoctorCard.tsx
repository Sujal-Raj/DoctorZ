
// import React, { useContext} from "react";
// import { MapPin, Video, Briefcase, Phone } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../../Context/AuthContext";
// // import api from "../../Services/mainApi.js";
// // import Cookies from "js-cookie";
// // import { jwtDecode } from "jwt-decode";

// export interface Doctor {
//   _id: string;
//   fullName: string;
//   specialization: string;
//   qualification?: string;
//   experience: number;
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
//   onFavouriteToggle?: (doctorId: string, isFavourite: boolean) => void; // ✅ Add this line
// }


// const ClinicDoctorCard: React.FC<Props> = ({ doctor, onConsult }) => {
//   const navigate = useNavigate();
//   const { isLoggedIn } = useContext(AuthContext);
 

//   // ✅ Get patient ID from token safely
// //   const token = Cookies.get("patientToken");
// //   const patientId = token ? (jwtDecode<DecodedToken>(token)?.id ?? null) : null;

  

 

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

//   const getLocationText = () => {
//     if (doctor.location && doctor.city) return `${doctor.location}, ${doctor.city}`;
//     if (doctor.location) return doctor.location;
//     if (doctor.city) return doctor.city;
//     return "—";
//   };

//   return (
//     <article
//       onClick={handleCardClick}
//       className="group bg-white border border-gray-400 rounded-xl shadow-sm hover:shadow-md hover:border-gray-400 hover:-translate-y-0.5 transition-all cursor-pointer overflow-hidden relative"
//     >
     

//       <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 p-4 md:p-5">
//         <div className="flex-shrink-0 flex items-start">
//           {doctor.photo ? (
//             <img
//               src={`http://localhost:3000/uploads/${doctor.photo}`}
//               alt={`Dr. ${doctor.fullName}`}
//               loading="lazy"
//               className="w-32 h-32 md:w-40 md:h-40 rounded-lg object-cover border border-gray-200"
//             />
//           ) : (
//             <div className="w-32 h-32 md:w-40 md:h-40 rounded-lg bg-[#28328C] text-white flex items-center justify-center text-2xl font-bold">
//               {doctor.fullName.charAt(0)}
//             </div>
//           )}
//         </div>

//         <div className="flex flex-col justify-between w-full md:flex-1 md:min-w-0">
//           <div className="text-left">
//             <h2 className="text-lg md:text-xl font-bold text-gray-900 break-words">
//               Dr. {doctor.fullName}
//             </h2>
//             <p className="text-[#28328C] text-sm md:text-base font-medium mt-1 break-words">
//               {doctor.specialization}
//             </p>

//             <div className="flex items-center gap-2 mt-2">
//               <span className="flex items-center gap-1 text-xs font-semibold bg-[#28328C]/10 text-[#28328C] px-3 py-1 rounded-full">
//                 <Briefcase className="w-3.5 h-3.5" /> {doctor.experience} yrs experience
//               </span>
//             </div>

//             <div className="flex items-center gap-1 text-gray-600 text-sm mt-3">
//               <MapPin className="w-4 h-4 text-gray-500 flex-shrink-0" />
//               <span>{getLocationText()}</span>
//             </div>
//           </div>

//           <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-3 w-full">
            

//             <div className="flex flex-col gap-2 w-full md:w-auto">
//               <button
//                 onClick={handleConsultClick}
//                 className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-[#28328C] border border-[#28328C] hover:bg-[#28328C]/10 text-sm rounded-lg font-medium shadow-sm transition-all"
//               >
//                 <Phone className="w-4 h-4" />
//                 <span>Contact Clinic</span>
//               </button>

//               <button
//                 onClick={handleConsultClick}
//                 className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#28328C] hover:bg-[#1f286f] text-white text-sm rounded-lg font-medium shadow-sm border border-[#1f286f] transition-all"
//               >
//                 <Video className="w-4 h-4" />
              
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </article>
//   );
// };

// export default ClinicDoctorCard;



import React from "react";
import { MapPin} from "lucide-react";
import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../../Context/AuthContext";
// // import api from "../../Services/mainApi";
// import Cookies from "js-cookie";
// import { jwtDecode } from "jwt-decode";

export interface Doctor {
  _id: string;
  fullName: string;
  specialization: string;
  qualification?: string;
  location?: string;
  city?: string;
  photo?: string;
  gender?: string;
}

interface Props {
  doctor: Doctor;
  onConsult: (doctor: Doctor) => void;
  onFavouriteToggle?: (doctorId: string, isFavourite: boolean) => void;
}


// interface DecodedToken {
//   id: string;
// }

const ClinicDoctorCard: React.FC<Props> = ({ doctor }) => {
  const navigate = useNavigate();
 
  // Get patient ID
  // const token = Cookies.get("patientToken");
  // const patientId = token ? (jwtDecode<DecodedToken>(token)?.id ?? null) : null;

 

  

  const handleCardClick = () => {
    navigate(`/view-doctor-profile/${doctor._id}`);
  };

  const getLocationText = () => {
    if (doctor.location && doctor.city) return `${doctor.location}, ${doctor.city}`;
    if (doctor.location) return doctor.location;
    if (doctor.city) return doctor.city;
    return "—";
  };

  return (
    <article
  onClick={handleCardClick}
  className="group bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer p-4 flex flex-col items-center text-center"
>
  {/* IMAGE */}
  {doctor.photo ? (
    <img
      src={`http://localhost:3000/uploads/${doctor.photo}`}
      alt={doctor.fullName}
      className="w-32 h-32 rounded-lg object-cover border mb-4"
    />
  ) : (
    <div className="w-32 h-32 rounded-lg bg-[#28328C] text-white flex items-center justify-center text-3xl font-bold mb-4">
      {doctor.fullName.charAt(0)}
    </div>
  )}

  {/* NAME */}
  <h2 className="text-lg font-bold text-gray-900">
    Dr. {doctor.fullName}
  </h2>

  {/* SPECIALIZATION */}
  <p className="text-[#28328C] font-medium mt-1">
    {doctor.specialization}
  </p>

  {/* LOCATION */}
  <div className="flex items-center justify-center gap-1 text-sm text-gray-600 mt-2">
    <MapPin className="w-4 h-4" />
    <span>{getLocationText()}</span>
  </div>

  {/* BUTTONS */}
  <div className="mt-4 w-full flex flex-col gap-2">
    
    <button
      
      className="flex items-center justify-center gap-2 px-4 py-2 bg-[#28328C] hover:bg-[#1f286f] text-white rounded-lg w-full"
    >
     
     Add Doctor
    </button>
  </div>
</article>

  );
};

export default ClinicDoctorCard;


