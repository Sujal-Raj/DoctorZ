
// import React from "react";
// import { Video, MapPin, Clock, Star } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// export interface Doctor {
//   _id: string;
//   fullName: string;
//   specialization: string;
//   qualification: string;
//   experience: string; // years
//   consultationFee: number; // ✅ number (not string)
//   language: string;
//   MedicalRegistrationNumber?: string;
//   location?: string;
//   photo?: string;
//   rating?: number;
//   fees?: number;
//   // availability omitted here (booking drawer will use doctor data)
//   // add other fields as needed
// }

// interface Props {
//   doctor: Doctor;
//   onConsult: (doctor: Doctor) => void;
//   onViewProfile?: (doctor: Doctor) => void;
// }

// const DoctorCard: React.FC<Props> = ({ doctor, onConsult, onViewProfile }) => {
//   const navigate = useNavigate();
//   return (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
//       <div className="flex p-6 gap-6">
//         <div className="flex-shrink-0">
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

//         <div className="flex-1">
//           <div className="flex items-start justify-between gap-4">
//             <div>
//               <h3 className="text-xl font-semibold text-gray-900">{doctor.fullName}</h3>
//               <p className="text-blue-600 font-medium mt-1">{doctor.specialization}</p>
//               <p className="text-sm text-gray-600 mt-1">
//                 {doctor.qualification} • {doctor.experience} yrs experience
//               </p>
//               <div className="flex items-center gap-3 mt-3 text-sm text-gray-600">
//                 <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-50 rounded">
//                   <Star className="w-4 h-4 text-yellow-500" /> {doctor.rating ?? "4.8"}
//                 </span>
//                 {doctor.location && (
//                   <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-50 rounded">
//                     <MapPin className="w-4 h-4" /> {doctor.location}
//                   </span>
//                 )}
//                 <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-50 rounded">
//                   <Clock className="w-4 h-4" /> Reg: {doctor.MedicalRegistrationNumber ?? "—"}
//                 </span>
//               </div>
//               <p className="mt-3 text-sm text-gray-700">Languages: {doctor.language}</p>
              


//               <button
//                   onClick={() => onViewProfile?.(doctor)}
//                   className=" text-sm border-none text-gray-500 hover:text-blue-600 mt-2 cursor-pointer"
//                 >
//                   View profile
//                 </button>
//             </div>

//             <div className="text-right flex-shrink-0  ">
//               <div className="text-2xl font-bold text-gray-900">₹{doctor.consultationFee}</div>
//               <div className="text-sm text-gray-500">Consultation</div>

//               <div className="mt-4 flex flex-col gap-3">
//                 <button 
//                   onClick={() => onConsult(doctor)}
//                   className=" mt-28 px-3 py-2 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-lg shadow hover:from-green-700 transition"
//                 >
//                   <div className=" flex items-center gap-2 justify-center">
//                     <Video className="w-4 h-4" /> Consult
//                   </div>
//                 </button>
               

  

                
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DoctorCard;





import React, {  } from "react";
import { Video, MapPin, Clock, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
// import ViewDoctorProfile from "../pages/ViewDoctorProfile";

export interface Doctor {
  _id: string;
  fullName: string;
  specialization: string;
  qualification: string;
  experience: string; // years
  consultationFee: number;
  language: string;
  MedicalRegistrationNumber?: string;
  location?: string;
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
  
  return (
    <>
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
      <div className="flex flex-col md:flex-row p-6 gap-6">
        {/* Photo */}
        <div className="flex-shrink-0 mx-auto md:mx-0">
          {doctor.photo ? (
            <img
              src={`http://localhost:3000/uploads/${doctor.photo}`}
              alt={doctor.fullName}
              className="h-28 w-28 rounded-full object-cover shadow"
            />
          ) : (
            <div className="h-28 w-28 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-semibold shadow">
              {doctor.fullName.charAt(0)}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col md:flex-row justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900">{doctor.fullName}</h3>
            <p className="text-blue-600 font-medium mt-1">{doctor.specialization}</p>
            <p className="text-sm text-gray-600 mt-1">
              {doctor.qualification} • {doctor.experience} yrs experience
            </p>

            <div className="flex flex-wrap gap-2 mt-3 text-sm text-gray-600">
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-50 rounded">
                <Star className="w-4 h-4 text-yellow-500" /> {doctor.rating ?? "4.8"}
              </span>
              {doctor.location && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-50 rounded">
                  <MapPin className="w-4 h-4" /> {doctor.location}
                </span>
              )}
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-50 rounded">
                <Clock className="w-4 h-4" /> Reg: {doctor.MedicalRegistrationNumber ?? "—"}
              </span>
            </div>

            <p className="mt-3 text-sm text-gray-700">Languages: {doctor.language}</p>

            <button
            onClick={()=>navigate(`/view-doctor-profile/${doctor._id}`)}
              className="text-sm text-blue-500 font-bold mt-2 cursor-pointer"
            >
              View profile
            </button>
          </div>

          {/* Fee & Consult */}
          <div className="mt-4 md:mt-0 flex flex-col items-start md:items-end gap-3 flex-shrink-0">
            <div className="text-2xl font-bold text-gray-900">₹{doctor.consultationFee}</div>
            <div className="text-sm text-gray-500">Consultation</div>

            <button
              onClick={() => onConsult(doctor)}
              className="mt-2 px-3 py-2 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-lg shadow hover:from-green-700 transition w-full md:w-auto"
            >
              <div className="flex items-center gap-2 justify-center">
                <Video className="w-4 h-4" /> Consult
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
    
    </>
  );
};

export default DoctorCard;
