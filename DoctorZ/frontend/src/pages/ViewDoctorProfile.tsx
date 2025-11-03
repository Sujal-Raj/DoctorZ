
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import { GraduationCap, MessageCircleMore, ChevronDown, ChevronUp,Stethoscope } from "lucide-react";
// import BookingDrawer from "../components/BookingDrawer";

// interface Doctor {
//   _id: string;
//   fullName: string;
//   specialization: string;
//   qualification: string;
//   experience: string;
//   consultationFee: number;
//   language: string;
//   MedicalRegistrationNumber?: string;
//   photo?: string;
//   signature?: string;
//   DegreeCertificate?: string;
// }

// const ViewDoctorProfile: React.FC = () => {
//   const [doctor, setDoctor] = useState<Doctor | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [openFAQ, setOpenFAQ] = useState<number | null>(null);
//   const { drId } = useParams<{ drId: string }>();

//   const faqs = [
//     "Where does Dr Ridhima Lakhani practice?",
//     "How can I book an appointment with Dr Ridhima Lakhani?",
//     "What do patients say about Dr Ridhima Lakhani?",
//     "What is Dr Ridhima Lakhani's educational qualification?",
//     "How many years of experience does Dr Ridhima Lakhani have?",
//     "What is Dr Ridhima Lakhani's medical specialty?",
//     "What conditions does Dr Ridhima Lakhani treat?",
//     "What is the consultation fee for Dr Ridhima Lakhani?",
//     "Does Dr Ridhima Lakhani offer online consultations?",
//   ];

//   useEffect(() => {
//     if (!drId) return;

//     const fetchDoctor = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get<{ doctor: Doctor }>(
//           `http://localhost:3000/api/doctor/${drId}`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         setDoctor(res.data.doctor);
//       } catch (err) {
//         console.error("Error fetching doctor profile:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDoctor();
//   }, [drId]);

//   if (loading) return <p className="p-8">Loading...</p>;

//   return (

// <div className="flex flex-col md:flex-row m-4 md:m-8 gap-8">
//   {/* Left: Doctor Profile */}
//   <div className="flex flex-col w-full md:w-2/3 gap-3.5">
//     {/* Doctor Card */}
//     <div className="gap-3 p-6 flex flex-col md:flex-row bg-white rounded-lg shadow-md">
//       <div className="flex-shrink-0">
//         <img
//           src={`http://localhost:3000/uploads/${doctor?.photo}`}
//           alt={doctor?.fullName}
//           className="h-28 w-28 rounded-full object-cover shadow mx-auto md:mx-0"
//         />
//       </div>
//       <div className="flex flex-col p-4 text-gray-800">
//         <h2 className="text-xl font-bold">{doctor?.fullName}</h2>
//         <p className="mt-2">{doctor?.specialization}</p>
//         <p className="text-gray-600">{doctor?.experience} year experience</p>

//         <p className="mt-2 flex gap-2 items-center">
//           <GraduationCap className="text-gray-500" size={22} />
//           {doctor?.qualification}
//         </p>

//         <p className="mt-2 flex gap-2 items-center">
//           <MessageCircleMore className="text-gray-500" size={20} />
//           {doctor?.language}
//         </p>
//       </div>
//     </div>

//     {/* Booking Drawer on small screens */}
//     <div className="md:hidden mt-4">
//       <h1 className="text-gray-800 mb-2 font-semibold text-lg ml-1">Pick a time Slot</h1>
//       <BookingDrawer
//         doctor={
//           doctor
//             ? {
//                 _id: doctor._id,
//                 fullName: doctor.fullName,
//                 photo: doctor.photo,
//                 specialization: doctor.specialization,
//                 fees: doctor.consultationFee,
//               }
//             : null
//         }
//         open={true}
//         onClose={() => {}}
//         variant="sidebar"
//       />
//     </div>

//     {/* Education and FAQs */}
//     <div className="bg-gray-50 p-6 rounded-lg shadow-md mt-4 text-gray-800">
//       {/* Education */}
//       <div className="flex gap-2 items-center ">
//         <GraduationCap size={26} />
//         <h3 className="text-md font-bold">Education</h3>
//       </div>
//       <p className="ml-7 mb-4">{doctor?.qualification}</p>
//       <hr className="my-4 border-gray-300" />

//       {/* Registration */}
//       <div className="flex gap-2 items-center ">
//         <Stethoscope size={26} />
//         <h3 className="text-md font-bold">Registration</h3>
//       </div>
//       <p className="ml-7 mb-4">{doctor?.MedicalRegistrationNumber}</p>
//       <hr className="my-4 border-gray-300" />

//       {/* FAQ */}
//       <h3 className="text-lg font-bold mb-2">FAQs</h3>
//       <div className="divide-y divide-gray-300">
//         {faqs.map((question, index) => (
//           <div key={index} className="py-2">
//             <button
//               className="w-full flex justify-between items-center text-left text-sm font-medium text-gray-800 hover:text-blue-600 transition-colors"
//               onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
//             >
//               {question}
//               {openFAQ === index ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
//             </button>

//             {openFAQ === index && (
//               <p className="mt-2 text-gray-600 text-sm">
//                 This is a placeholder answer for now.
//               </p>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   </div>

//   {/* Right: Booking Sidebar for medium+ screens */}
//   <div className="hidden md:flex flex-col w-1/3 gap-2">
//     <h1 className="text-gray-800 mb-2 font-semibold text-lg ml-1">Pick a time Slot</h1>
//     <BookingDrawer
//       doctor={
//         doctor
//           ? {
//               _id: doctor._id,
//               fullName: doctor.fullName,
//               photo: doctor.photo,
//               specialization: doctor.specialization,
//               fees: doctor.consultationFee,
//             }
//           : null
//       }
//       open={true}
//       onClose={() => {}}
//       variant="sidebar"
//     />
//   </div>
// </div>

//   );
// };

// export default ViewDoctorProfile;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import {
//   GraduationCap,
//   MessageCircleMore,
//   Stethoscope,
//   ChevronDown,
//   ChevronUp,
//   Phone,
// } from "lucide-react";
// import BookingDrawer from "../components/BookingDrawer";
// import Doctor from "../assets/Doctor.jpeg";

// interface Doctor {
//   _id: string;
//   fullName: string;
//   specialization: string;
//   qualification: string;
//   experience: string;
//   consultationFee: number;
//   language: string;
//   MedicalRegistrationNumber?: string;
//   photo?: string;
// }

// const ViewDoctorProfile: React.FC = () => {
//   const [doctor, setDoctor] = useState<Doctor | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [activeTab, setActiveTab] = useState<"overview" | "education" | "faq">(
//     "overview"
//   );
//   const [openFAQ, setOpenFAQ] = useState<number | null>(null);
//   const { drId } = useParams<{ drId: string }>();

//   const faqs = [
//     "Where does the doctor practice?",
//     "How can I book an appointment?",
//     "What do patients say about this doctor?",
//     "What is the doctor's qualification?",
//     "How many years of experience does the doctor have?",
//     "What is the doctor's medical specialty?",
//     "What conditions does the doctor treat?",
//     "What is the consultation fee?",
//     "Does the doctor offer online consultations?",
//   ];

//   useEffect(() => {
//     if (!drId) return;

//     const fetchDoctor = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get<{ doctor: Doctor }>(
//           `http://localhost:3000/api/doctor/${drId}`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         setDoctor(res.data.doctor);
//       } catch (err) {
//         console.error("Error fetching doctor profile:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDoctor();
//   }, [drId]);

//   if (loading) return <p className="p-8">Loading...</p>;
//   if (!doctor) return <p className="p-8 text-red-600">Doctor not found.</p>;

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-100">
//       {/* Hero Section */}
//       <div className="relative h-90  bg-cover bg-center   mt-0 md:mt-0 overflow-hidden mb-0">
//         <img
//           src={Doctor}
//           alt="doctor banner"
//           className="absolute inset-0 w-full h-full object-cover" 
//         />
//          <div className="absolute inset-0 bg-black/5 backdrop-blur-sm"></div>

//         <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white bg-black/40">
//           <h1 className="text-3xl md:text-4xl font-bold">{doctor.fullName}</h1>
//           <p className="text-lg">{doctor.specialization}</p>
//           <div className="flex flex-wrap justify-center gap-4 mt-3 text-sm">
//             <span>{doctor.experience} years experience</span>
//             <span className="flex items-center gap-1">
//               <MessageCircleMore size={16} /> {doctor.language}
//             </span>
//           </div>
//           <button className="mt-4 bg-white text-blue-600 px-4 py-2 rounded-full font-medium flex items-center gap-2 hover:bg-blue-500  hover:text-white">
//             <Phone size={18} /> Call Now
//           </button>
//         </div>
//       </div>

//       {/* Tabs Section */}
//       <div className=" shadow-sm mt-4">
//         <div className="flex justify-center space-x-6 text-gray-600">
//           <button
//             className={`py-3 border-b-2 ${
//               activeTab === "overview"
//                 ? "border-blue-600 text-blue-600 font-semibold"
//                 : "border-transparent hover:text-blue-600"
//             }`}
//             onClick={() => setActiveTab("overview")}
//           >
//             Overview
//           </button>
//           <button
//             className={`py-3 border-b-2 ${
//               activeTab === "education"
//                 ? "border-blue-600 text-blue-600 font-semibold"
//                 : "border-transparent hover:text-blue-600"
//             }`}
//             onClick={() => setActiveTab("education")}
//           >
//             Education
//           </button>
//           <button
//             className={`py-3 border-b-2 ${
//               activeTab === "faq"
//                 ? "border-blue-600 text-blue-600 font-semibold"
//                 : "border-transparent hover:text-blue-600"
//             }`}
//             onClick={() => setActiveTab("faq")}
//           >
//             FAQs
//           </button>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="max-w-4xl mx-auto w-full p-6">
//         {activeTab === "overview" && (
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-xl font-bold text-blue-700 mb-2">
//               About {doctor.fullName}
//             </h2>
//             <p className="text-gray-700 leading-relaxed">
//               Dr. {doctor.fullName} is a highly qualified{" "}
//               <strong>{doctor.specialization}</strong> with{" "}
//               {doctor.experience} years of experience. Fluent in{" "}
//               {doctor.language}, the doctor provides patient-centric care
//               and professional consultation. Book an appointment for expert
//               medical advice and quality healthcare.
//             </p>
//             <div className="mt-6">
//               <h3 className="font-semibold text-gray-800 mb-1">
//                 Consultation Fee:
//               </h3>
//               <p className="text-gray-700">₹{doctor.consultationFee}</p>
//             </div>

//             {/* Booking Section */}
//             <div className="mt-8">
//               <h2 className="text-gray-800 mb-2 font-semibold text-lg">
//                 Pick a time slot
//               </h2>
//               <BookingDrawer
//                 doctor={{
//                   _id: doctor._id,
//                   fullName: doctor.fullName,
//                   photo: doctor.photo,
//                   specialization: doctor.specialization,
//                   fees: doctor.consultationFee,
//                 }}
//                 open={true}
//                 onClose={() => {}}
//                 variant="sidebar"
//               />
//             </div>
//           </div>
//         )}

//         {activeTab === "education" && (
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <div className="flex items-center gap-2 mb-3">
//               <GraduationCap size={24} className="text-blue-600" />
//               <h3 className="text-lg font-bold text-gray-800">Education</h3>
//             </div>
//             <p className="ml-7 text-gray-700">{doctor.qualification}</p>

//             <hr className="my-4 border-gray-300" />

//             <div className="flex items-center gap-2 mb-3">
//               <Stethoscope size={24} className="text-blue-600" />
//               <h3 className="text-lg font-bold text-gray-800">
//                 Medical Registration
//               </h3>
//             </div>
//             <p className="ml-7 text-gray-700">
//               {doctor.MedicalRegistrationNumber || "Not available"}
//             </p>
//           </div>
//         )}

//         {activeTab === "faq" && (
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h3 className="text-lg font-bold text-gray-800 mb-4">FAQs</h3>
//             <div className="divide-y divide-gray-300">
//               {faqs.map((question, index) => (
//                 <div key={index} className="py-3">
//                   <button
//                     className="w-full flex justify-between items-center text-left text-sm font-medium text-gray-800 hover:text-blue-600 transition-colors"
//                     onClick={() =>
//                       setOpenFAQ(openFAQ === index ? null : index)
//                     }
//                   >
//                     {question}
//                     {openFAQ === index ? (
//                       <ChevronUp size={18} />
//                     ) : (
//                       <ChevronDown size={18} />
//                     )}
//                   </button>
//                   {openFAQ === index && (
//                     <p className="mt-2 text-gray-600 text-sm">
//                       This is a placeholder answer for now.
//                     </p>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ViewDoctorProfile;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  GraduationCap,
  MessageCircleMore,
  Stethoscope,
  ChevronDown,
  ChevronUp,
  Phone,
} from "lucide-react";
import BookingDrawer from "../components/BookingDrawer";
import Doctor from "../assets/Doctor.jpeg";

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
}

const ViewDoctorProfile: React.FC = () => {
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<"overview" | "education" | "faq">("overview");
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const { drId } = useParams<{ drId: string }>();

  const faqs = [
    "Where does the doctor practice?",
    "How can I book an appointment?",
    "What do patients say about this doctor?",
    "What is the doctor's qualification?",
    "How many years of experience does the doctor have?",
    "What is the doctor's medical specialty?",
    "What conditions does the doctor treat?",
    "What is the consultation fee?",
    "Does the doctor offer online consultations?",
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
  if (!doctor) return <p className="p-8 text-red-600">Doctor not found.</p>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="relative h-90 bg-cover bg-center mt-0 overflow-hidden">
        <img
          src={Doctor}
          alt="doctor banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/5 backdrop-blur-sm"></div>

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white bg-black/40">
          <h1 className="text-3xl md:text-4xl font-bold">{doctor.fullName}</h1>
          <p className="text-lg">{doctor.specialization}</p>
          <div className="flex flex-wrap justify-center gap-4 mt-3 text-sm">
            <span>{doctor.experience} years experience</span>
            <span className="flex items-center gap-1">
              <MessageCircleMore size={16} /> {doctor.language}
            </span>
          </div>
          <button className="mt-4 bg-white text-blue-600 px-4 py-2 rounded-full font-medium flex items-center gap-2 hover:bg-blue-500 hover:text-white">
            <Phone size={18} /> Call Now
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="shadow-sm mt-4">
        <div className="flex justify-center space-x-6 text-gray-600">
          <button
            className={`py-3 border-b-2 ${
              activeTab === "overview"
                ? "border-blue-600 text-blue-600 font-semibold"
                : "border-transparent hover:text-blue-600"
            }`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={`py-3 border-b-2 ${
              activeTab === "education"
                ? "border-blue-600 text-blue-600 font-semibold"
                : "border-transparent hover:text-blue-600"
            }`}
            onClick={() => setActiveTab("education")}
          >
            Education
          </button>
          <button
            className={`py-3 border-b-2 ${
              activeTab === "faq"
                ? "border-blue-600 text-blue-600 font-semibold"
                : "border-transparent hover:text-blue-600"
            }`}
            onClick={() => setActiveTab("faq")}
          >
            FAQs
          </button>
        </div>
      </div>

      {/* CONTENT SECTION */}
      <div className="max-w-4xl mx-auto w-full p-6">
        {activeTab === "overview" && (
          <div className="space-y-6">

            {/* 🔹 PRIMARY SECTION – Pick a Slot */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-blue-700 mb-4">
                Pick a Time Slot
              </h2>
              <BookingDrawer
                doctor={{
                  _id: doctor._id,
                  fullName: doctor.fullName,
                  photo: doctor.photo,
                  specialization: doctor.specialization,
                  fees: doctor.consultationFee,
                }}
                open={true}
                onClose={() => {}}
                variant="sidebar"
              />
            </div>

            {/* 🔸 SECONDARY SECTION – About Doctor */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-blue-700 mb-2">
                About {doctor.fullName}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Dr. {doctor.fullName} is a highly qualified{" "}
                <strong>{doctor.specialization}</strong> with{" "}
                {doctor.experience} years of experience. Fluent in{" "}
                {doctor.language}, the doctor provides patient-centric care
                and professional consultation.
              </p>
              <div className="mt-6">
                <h3 className="font-semibold text-gray-800 mb-1">
                  Consultation Fee:
                </h3>
                <p className="text-gray-700">₹{doctor.consultationFee}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "education" && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-2 mb-3">
              <GraduationCap size={24} className="text-blue-600" />
              <h3 className="text-lg font-bold text-gray-800">Education</h3>
            </div>
            <p className="ml-7 text-gray-700">{doctor.qualification}</p>
            <hr className="my-4 border-gray-300" />
            <div className="flex items-center gap-2 mb-3">
              <Stethoscope size={24} className="text-blue-600" />
              <h3 className="text-lg font-bold text-gray-800">
                Medical Registration
              </h3>
            </div>
            <p className="ml-7 text-gray-700">
              {doctor.MedicalRegistrationNumber || "Not available"}
            </p>
          </div>
        )}

        {activeTab === "faq" && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-gray-800 mb-4">FAQs</h3>
            <div className="divide-y divide-gray-300">
              {faqs.map((question, index) => (
                <div key={index} className="py-3">
                  <button
                    className="w-full flex justify-between items-center text-left text-sm font-medium text-gray-800 hover:text-blue-600 transition-colors"
                    onClick={() =>
                      setOpenFAQ(openFAQ === index ? null : index)
                    }
                  >
                    {question}
                    {openFAQ === index ? (
                      <ChevronUp size={18} />
                    ) : (
                      <ChevronDown size={18} />
                    )}
                  </button>
                  {openFAQ === index && (
                    <p className="mt-2 text-gray-600 text-sm">
                      This is a placeholder answer for now.
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewDoctorProfile;
