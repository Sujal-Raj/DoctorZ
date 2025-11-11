

// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { UserCircleIcon } from "@heroicons/react/24/solid";
// import { Phone } from "lucide-react";
// import api from "../../Services/mainApi";


// // ---------------- Interfaces ----------------
// interface Doctor {
//   _id: string;
//   name: string;
 
//   gender: string;
//   contact: string;
//   aadhar: string;

// }



// // ---------------- Component ----------------
// const PatientAppointments: React.FC = () => {
//   const navigate = useNavigate();
//   const patientId=useParams().id;
//   console.log("🚀 Patient ID from params:", patientId);
//   const [doctors, setDoctors] = useState<Doctor[]>([]);
//   useEffect(()=>{
    
//     const fetchDoctors=async()=>{
//        try{
//         const res= await api.get<Doctor[]>(`/appointments/doctors/${patientId}`);
//         setDoctors(res.data as Doctor[]);
//        }catch(err){
//         console.error("Error fetching doctors:",err);
       
//        }
//       }
//       fetchDoctors();
//   },[patientId])
  

//   return (
//     <div className="w-full p-4 sm:p-5 md:p-6 overflow-x-auto rounded-lg font-[Poppins]">
//       <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 text-center sm:text-left">
//         Patients List
//       </h2>

//       {doctors.length === 0 ? (
//         <p className="text-gray-500 text-center sm:text-left">
//           No doctors found.
//         </p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full text-left bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
//             <thead className="bg-gray-100 text-gray-700 text-xs sm:text-sm md:text-base">
//               <tr>
//                 <th className="px-3 sm:px-4 py-2">Name</th>
//                 <th className="px-3 sm:px-4 py-2">Gender</th>
//                 <th className="px-3 sm:px-4 py-2">Age</th>
//                 <th className="px-3 sm:px-4 py-2">Contact</th>
//                 <th className="px-3 sm:px-4 py-2">Call / Chat</th>
//               </tr>
//             </thead>
//             <tbody>
//               {doctors.map((doctor) => (
//                 <tr
//                   key={doctor._id}
//                   className="border-t hover:bg-gray-50 text-xs sm:text-sm md:text-base"
//                 >
//                   <td className="px-3 sm:px-4 py-2 font-medium flex items-center gap-2">
//                     <UserCircleIcon className="w-5 h-5 sm:w-6 sm:h-6 text-pink-500" />
//                     <span className="truncate">{doctor.name}</span>
//                   </td>
//                   <td className="px-3 sm:px-4 py-2">{doctor.gender}</td>
             
//                   <td className="px-3 sm:px-4 py-2">
//                     <div className="flex items-center gap-2">
//                       <Phone
//                         size={18}
//                         className="text-gray-500 flex-shrink-0"
//                       />
//                       <span className="truncate">
//                         {doctor.contact || "N/A"}
//                       </span>
//                     </div>
//                   </td>
//                   <td className="px-3 sm:px-4 py-2">
//                     <div className="flex flex-col sm:flex-row gap-2"> 
//                       <a
//                         href={`tel:${doctor.contact}`}
//                         className="px-2 sm:px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-xs sm:text-sm text-center"
//                       >
//                         Call
//                       </a>
//                       <button
//                         onClick={() => navigate("/doctor-chat")}
//                         className="px-2 sm:px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs sm:text-sm text-center"
//                       >
//                         Chat
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PatientAppointments;


import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { Phone } from "lucide-react";
import api from "../../Services/mainApi";

interface Doctor {
  _id: string;
  fullName: string;
  gender: string;
  MobileNo: string;
  Aadhar: number;
}
interface DoctorApiResponse {
  doctor: Array<{
    doctorId: Doctor;
  }>;
}


const PatientAppointments: React.FC = () => {
  const navigate = useNavigate();
  const patientId = useParams().id;

  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await api.get<DoctorApiResponse>(`/api/patient/appointments/doctors/${patientId}`);

        // ✅ extract doctorId from each booking
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const extractedDoctors = res.data.doctor.map((item: any) => item.doctorId);

        setDoctors(extractedDoctors);
      } catch (err) {
        console.error("Error fetching doctors:", err);
      }
    };

    fetchDoctors();
  }, [patientId]);

  return (
    <div className="w-full p-4 sm:p-5 md:p-6 overflow-x-auto rounded-lg font-[Poppins]">
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 text-center sm:text-left">
        Doctors List
      </h2>

      {doctors.length === 0 ? (
        <p className="text-gray-500 text-center sm:text-left">No doctors found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-700 text-xs sm:text-sm md:text-base">
              <tr>
                <th className="px-3 sm:px-4 py-2">Name</th>
                <th className="px-3 sm:px-4 py-2">Gender</th>
                <th className="px-3 sm:px-4 py-2">Contact</th>
                <th className="px-3 sm:px-4 py-2">Call / Chat</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor) => (
                <tr key={doctor._id} className="border-t hover:bg-gray-50">
                  <td className="px-3 sm:px-4 py-2 font-medium flex items-center gap-2">
                    <UserCircleIcon className="w-6 h-6 text-pink-500" />
                    {doctor.fullName}
                  </td>

                  <td className="px-3 sm:px-4 py-2">{doctor.gender}</td>

                  <td className="px-3 sm:px-4 py-2">
                    <div className="flex items-center gap-2">
                      <Phone size={18} className="text-gray-500" />
                      {doctor.MobileNo}
                    </div>
                  </td>

                  <td className="px-3 sm:px-4 py-2">
                    <div className="flex gap-2">
                      <a
                        href={`tel:${doctor.MobileNo}`}
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
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PatientAppointments;

