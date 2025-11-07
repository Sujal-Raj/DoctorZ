
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
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  GraduationCap,
  MessageCircle,
  Stethoscope,
  ChevronDown,
  ChevronUp,
  Phone,
} from "lucide-react";
import { Helmet } from "react-helmet";
import BookingDrawer from "../components/BookingDrawer";
import DefaultDoctor from "../assets/Doctor.jpeg";

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
  const { drId } = useParams<{ drId: string }>();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

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
      } catch (error) {
        console.error("Error fetching doctor:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctor();
  }, [drId]);

  if (loading) return <p className="p-10 text-center text-gray-600">Loading doctor profile...</p>;
  if (!doctor) return <p className="p-10 text-center text-red-600">Doctor not found.</p>;

  // ✅ Handle Doctor Image (backend or default)
  const doctorImage =
    doctor.photo && doctor.photo.startsWith("http")
      ? doctor.photo
      : doctor.photo
      ? `http://localhost:3000/${doctor.photo}`
      : DefaultDoctor;

  return (
    <>
      {/* ✅ SEO Optimization */}
      <Helmet>
        <title>{`Dr. ${doctor.fullName} | ${doctor.specialization} | Book Appointment`}</title>
        <meta
          name="description"
          content={`Consult Dr. ${doctor.fullName}, a leading ${doctor.specialization} with ${doctor.experience} years of experience. Book appointments online.`}
        />
        <meta
          name="keywords"
          content={`${doctor.fullName}, ${doctor.specialization}, online doctor, book doctor, healthcare`}
        />
      </Helmet>

      {/* ✅ Main Page */}
      <main className="min-h-screen bg-gray-50 py-10 px-4 md:px-10">
        <section className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          {/* ✅ Top Profile Section */}
          <div className="flex flex-col md:flex-row items-center md:items-start p-6 md:p-10 gap-10 bg-gradient-to-r from-[#28328C]/10 to-white">
            <div className="relative">
              <img
                src={doctorImage}
                alt={`Dr. ${doctor.fullName}`}
                className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-2xl shadow-md border-4 border-[#28328C]/20"
              />
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#28328C] text-white text-sm px-4 py-1 rounded-full">
                {doctor.specialization}
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-[#28328C]">
                Dr. {doctor.fullName}
              </h1>
              <p className="mt-2 text-gray-700 font-medium">
                {doctor.qualification}
              </p>

              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4 text-gray-600">
                <span className="bg-gray-100 px-4 py-1 rounded-full text-sm">
                  {doctor.experience} Years Experience
                </span>
                <span className="flex items-center gap-1 bg-gray-100 px-4 py-1 rounded-full text-sm">
                  <MessageCircle size={16} /> {doctor.language}
                </span>
              </div>

              <p className="mt-5 text-gray-700 leading-relaxed max-w-2xl mx-auto md:mx-0">
                Dr. {doctor.fullName} is a dedicated and highly experienced{" "}
                {doctor.specialization}, known for patient-centered care and
                advanced clinical expertise. Committed to improving healthcare
                outcomes through compassion and professionalism.
              </p>

              <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-3">
                <button
                  aria-label="Call Doctor"
                  className="bg-white border border-[#28328C] text-[#28328C] hover:bg-[#28328C] hover:text-white transition px-6 py-2 rounded-full flex items-center gap-2 font-semibold shadow-sm"
                >
                  <Phone size={18} /> Call Now
                </button>
                <button
                  onClick={() => setIsBookingOpen(true)}
                  aria-label="Book Appointment"
                  className="bg-[#28328C] hover:bg-[#1f266e] text-white px-6 py-2 rounded-full font-semibold transition shadow-sm"
                >
                  Book Appointment
                </button>
              </div>
            </div>
          </div>

          {/* ✅ Details Section */}
          <div className="p-6 md:p-10 space-y-10">
            {/* About Doctor */}
            <section>
              <h2 className="text-2xl font-semibold text-[#28328C] mb-3">
                About Dr. {doctor.fullName}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                With over {doctor.experience} years of professional experience,
                Dr. {doctor.fullName} specializes in {doctor.specialization}.
                Fluent in {doctor.language}, the doctor provides expert
                consultation and personalized medical guidance to all patients.
              </p>
              <div className="mt-4 bg-gray-50 border-l-4 border-[#28328C] px-4 py-3 rounded">
                <h3 className="text-lg font-semibold text-gray-800">
                  Consultation Fee:
                </h3>
                <p className="text-[#28328C] font-bold text-xl">
                  ₹{doctor.consultationFee}
                </p>
              </div>
            </section>

            {/* Education Section */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <GraduationCap size={24} className="text-[#28328C]" />
                <h2 className="text-2xl font-semibold text-[#28328C]">
                  Education
                </h2>
              </div>
              <p className="text-gray-700 ml-7">{doctor.qualification}</p>
            </section>

            {/* Medical Registration */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <Stethoscope size={24} className="text-[#28328C]" />
                <h2 className="text-2xl font-semibold text-[#28328C]">
                  Medical Registration
                </h2>
              </div>
              <p className="text-gray-700 ml-7">
                {doctor.MedicalRegistrationNumber || "Not available"}
              </p>
            </section>

            {/* FAQs */}
            <section>
              <h2 className="text-2xl font-semibold text-[#28328C] mb-4">
                Frequently Asked Questions
              </h2>
              <div className="divide-y divide-gray-200 rounded-lg border border-gray-100">
                {faqs.map((question, index) => (
                  <div key={index} className="py-3 px-4">
                    <button
                      onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                      className="w-full flex justify-between items-center text-left text-gray-800 font-medium hover:text-[#28328C] transition"
                    >
                      {question}
                      {openFAQ === index ? (
                        <ChevronUp size={18} />
                      ) : (
                        <ChevronDown size={18} />
                      )}
                    </button>
                    {openFAQ === index && (
                      <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                        This is a sample answer. Replace it with real FAQ data.
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>
        </section>

        {/* ✅ Booking Sidebar */}
        {doctor && (
          <BookingDrawer
            doctor={{
              _id: doctor._id,
              fullName: doctor.fullName,
              photo: doctor.photo,
              specialization: doctor.specialization,
              fees: doctor.consultationFee,
            }}
            open={isBookingOpen}
            onClose={() => setIsBookingOpen(false)}
            variant="sidebar"
          />
        )}
      </main>
    </>
  );
};

export default ViewDoctorProfile;
