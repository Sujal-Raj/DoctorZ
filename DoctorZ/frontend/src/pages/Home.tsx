import { VideoCameraIcon, UserIcon, BuildingOfficeIcon } from "@heroicons/react/24/solid";


import { useState } from "react";
// Assuming SearchBar is a component that handles the search input and API calls.
import SearchBar from "../components/SearchBar"; 

import Gynecologist from "../assets/Gynecologist.jpeg";
import Dentist from "../assets/Dentist.jpeg";
import Dietitian from "../assets/nutrition.jpeg";
import Physiotherapist from "../assets/Physiotherapy.jpeg";
// import Kids from "../assets/kids.jpeg";
import periods from "../assets/period.jpeg";
import cold from "../assets/cold.png";
import Acne from "../assets/Acne&pimple.png";
import Depression from "../assets/depression.png";
import vitamins from "../assets/Vitamin.jpeg";

import corona from "../assets/coronavirus.png";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import {Venus, Baby } from "lucide-react";


// --- Interface Definitions (Kept from original code) ---

interface Clinic {
  _id: string;
  clinicName: string;
  clinicType: string;
  operatingHours: string;
  specialities: string[];
  phone: string;
  email: string;
}

interface Doctor {
  _id: string;
  fullName: string;
  specialization: string;
  experience: number;
  consultationFee: number;
  language: string;
  photo: string;
}

// --- Main Component ---

export default function Home() {
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  // Dummy data for the 'Consult top doctors online' section
  // until actual content is loaded
  
const serviceBlocks = [
  {
    title: "Instant Video Consultation",
    subtitle: "Connect within 60 secs",
    icon: VideoCameraIcon, // was FaVideo
    bgColor: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    title: "Find Doctors Near You",
    subtitle: "Confirmed appointments",
    icon: UserIcon, // was FaUserMd
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "Surgeries",
    subtitle: "Safe and trusted surgery centers",
    icon: BuildingOfficeIcon, // was FaHospital
    bgColor: "bg-green-100",
    iconColor: "text-green-600",
  },
];
  const handleSearchResults = (data: any) => {
    // Clear previous results if no results or empty array
    if (Array.isArray(data) && data.length === 0) {
      setClinics([]);
      setDoctors([]);
      return;
    }
    // Update state based on the type of search result
    if (data.type === "doctor") {
      setDoctors(data.results);
      setClinics([]); // Clear other type
    } else if (data.type === "clinic") {
      setClinics(data.results);
      setDoctors([]); // Clear other type
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* --- Main Search/Hero Section (Inspired by image_7f854e.png) --- */}
      <header className="bg-white py-12 shadow-md">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Find the care you need
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Book appointments, video consults & lab tests.
          </p>
          {/* Assuming SearchBar component is a full-width input field */}
          <div className="max-w-3xl mx-auto">
            <SearchBar onResults={handleSearchResults} />
          </div>
        </div>
      </header>

      {/* --- Service Blocks (Inspired by image_7f854e.png) --- */}
      <section className="py-24 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold text-black mb-2 text-center">
            Connecting You to the Best
            <span className=" text-3xl font-extrabold text-blue-600"> D</span>
            octors and
            <span className=" text-3xl font-extrabold text-blue-600"> C</span>
            linics Near You
          </h2>

          <p className="text-base text-gray-600 mb-10 font-medium leading-tight text-center">
            At DoctorZ, we believe in combining advanced medical expertise with
            a personal touch. Your wellness is our mission.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {serviceBlocks.map((block) => (
              <div 
                key={block.title} 
                className={`p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1 ${block.bgColor}`}
              >
                <div className={`text-4xl mx-auto mb-3 ${block.iconColor}`}>
                  <block.icon className="h-6 w-6 mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {block.title}
                </h3>
                <p className="text-sm text-gray-600">{block.subtitle}</p>
                <button className="mt-3 text-sm font-medium text-blue-600 hover:text-blue-800">
                    Get Started &rarr;
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Search Results Section (Original Logic) --- */}
      {(clinics.length > 0 || doctors.length > 0) && (
        <section className="container mx-auto p-4 py-12 flex-grow">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Search Results
          </h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {/* Clinics Results */}
            {clinics.map((clinic) => (
              <div
                key={clinic._id}
                className="bg-white border border-gray-200 p-6 rounded-lg shadow-md hover:shadow-xl transition-all text-left"
              >
                <h3 className="text-xl font-bold text-blue-800 mb-1">
                  {clinic.clinicName}
                </h3>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-600">
                  Clinic
                </span>
                <p className="mt-3 text-sm text-gray-600">
                  <strong>Type:</strong> {clinic.clinicType}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Hours:</strong> {clinic.operatingHours}
                </p>
                <p className="text-sm text-gray-600 truncate">
                  <strong>Specialities: </strong>
                  {Array.isArray(clinic.specialities) &&
                  clinic.specialities.length > 0
                    ? clinic.specialities.join(", ")
                    : "N/A"}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  <strong>Contact:</strong> {clinic.phone}
                </p>
                <button
                  onClick={() => console.log("View Profile:", clinic._id)}
                  className="mt-4 w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all text-sm"
                >
                  View Clinic
                </button>
              </div>
            ))}

            {/* Doctors Results */}
            {doctors.map((doctor) => (
              <div
                key={doctor._id}
                className="bg-white border border-gray-200 p-6 rounded-lg shadow-md hover:shadow-xl transition-all text-center"
              >
                <img
                  src={`http://localhost:3000/uploads/${doctor.photo}`}
                  alt={doctor.fullName}
                  className="w-24 h-24 rounded-full mb-4 mx-auto object-cover border-4 border-green-500"
                />
                <h3 className="text-xl font-bold text-gray-800 mb-1">
                  Dr. {doctor.fullName}
                </h3>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-600">
                  Doctor
                </span>
                <p className="mt-3 text-sm text-gray-600 font-medium">
                  {doctor.specialization}
                </p>
                <div className="mt-2 text-left">
                  <p className="text-sm text-gray-600">
                    <strong>Exp:</strong> {doctor.experience} yrs
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Fee:</strong> ₹{doctor.consultationFee}
                  </p>
                  <p className="text-sm text-gray-600 truncate">
                    <strong>Lang:</strong> {doctor.language}
                  </p>
                </div>

                <button
                  onClick={() =>
                    alert(`Booking appointment with ${doctor.fullName}`)
                  }
                  className="mt-4 w-full bg-green-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-green-600 transition shadow-md text-sm"
                >
                  Get Appointment
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="py-16 border border-b-1 border-gray-100 bg-gray">
        <div className="container mx-auto px-4">
          {/* Header with "View All Specialities" button */}
      <div className="flex flex-col items-center justify-center mb-10 text-center">
  <div className="mb-6">
    <h2 className="text-2xl font-semibold text-black">
      Consult Top Doctors Online For Any Health Concern
    </h2>
    <p className="text-md font-medium text-gray-800 mt-2">
      Private online consultations with verified doctors in all specialists
    </p>
  </div>
  {/* <Link
    to="/specialities"
    className="px-6 py-2 border border-blue-400 text-blue-600 rounded-lg hover:bg-blue-50 transition duration-300 font-medium whitespace-nowrap"
  >
    View All Specialities
  </Link> */}
</div>


          {/* Health Concerns Grid (Requires the 'healthConcerns' array from the full component) */}
       <Swiper
      spaceBetween={24}
      pagination={{ clickable: true }}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      breakpoints={{
        320: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 4 },
      }}
      modules={[Pagination, Autoplay]}
      className="my-8"
    >
      {consultOptions.map((item) => (
        <SwiperSlide key={item.id}>
          <div className="flex flex-col items-center text-center p-9 group">
            {/* Icon Circle */}
            <div
              className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center mb-4 border-2 border-gray-200 group-hover:border-blue-300 transition-all duration-300 ${item.bgColor}`}
            >
              {item.icon ? (
                item.icon
              ) : (
                <span className={`text-4xl ${item.textColor}`}>
                  <img src={item.img} alt={item.title} />
                </span>
              )}
            </div>

            {/* Title */}
            <p className="font-semibold text-gray-800 text-sm sm:text-base mb-2">
              {item.title}
            </p>

            {/* Consult Now Link */}
            <Link
              to={item.link}
              className="text-blue-500 text-xs sm:text-sm font-semibold hover:underline hover:text-blue-700 transition"
            >
              Consult Now
            </Link>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
        </div>
      </section>

      {/* --- In-Clinic Consultation Section (Inspired by image_7f8839.jpg) --- */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl  font-semibold text-black mb-4 text-center">
            Book An Appointment For An In-Clinic Consultation
          </h2>
          <p className="text-md font-medium text-gray-800 mb-8 text-center">
            Find experienced doctors across all specialities
          </p>
          {/* This would typically be a carousel, here it's a grid with actual images */}
       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-10">
  {[
    {
      title: "Dentist",
      desc: "Teething troubles? Schedule a dental checkup",
      img: "https://imgk.timesnownews.com/story/dentist.gif",
    },
    {
      title: "Gynecologist",
      desc: "Women's health, pregnancy and infertility treatments",
      img: "https://ugc.futurelearn.com/uploads/images/f7/f9/f7f9b44a-e19e-4cd9-aa1b-1df0d4516daa.jpg",
    },
    {
      title: "Dietitian/Nutrition",
      desc: "Guidance on eating right, weight management, and sports nutrition",
      img: "https://coralandreed.com/wp-content/uploads/2020/01/nutrition.png",
    },
    {
      title: "Physiotherapist",
      desc: "Pulled a muscle? Get it treated by a trained physiotherapist",
      img: "https://tse3.mm.bing.net/th/id/OIP.x_ZugufW_e89OPT7OZ-GYgHaFH?w=1536&h=1062&rs=1&pid=ImgDetMain&o=7&rm=3",
    },
  ].map((item) => (
    <div
      key={item.title}
      className="rounded-lg overflow-hidden shadow-md border border-gray-100 hover:shadow-xl transform hover:scale-105 transition duration-300 flex flex-col"
    >
      {/* Image */}
      <div className="h-44 overflow-hidden">
        <img
          src={item.img}
          alt={item.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Text */}
      <div className="p-4 flex flex-col justify-between flex-grow text-start">
        <h3 className="font-semibold text-black mb-2">{item.title}</h3>
        <p className="text-xs font-medium text-gray-800">{item.desc}</p>
      </div>
    </div>
  ))}
</div>

        </div>
      </section>

      <section className="py-20 bg-gray">
        <div className="container mx-auto px-4 max-w-7xl">
           <h2 className="text-2xl text-center font-semibold text-black mb-18">
                Read Top Articles From Health Experts
              </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* --- Left Column: Header and Button --- */}
            <div className="flex flex-col justify-center lg:col-span-1 p-4">
             
              <p className="text-lg font-medium leading-relaxed text-gray-800 mb-6">
                Health articles that keep you informed about good health
                practices and achieve your goals.
              </p>
 <Link
  to="/articles"
  className="
    relative inline-block w-auto px-4 py-3
    bg-gradient-to-r from-blue-500 to-blue-600 
    text-white font-semibold rounded-lg shadow-md 
    overflow-hidden transition-all duration-300 
    hover:shadow-[0_0_10px_4px_rgba(59,130,246,0.6)]
    hover:scale-[1.03]
    text-center
    group
  "
>
  <span className="relative z-10">See All Articles</span>
  <span
    className="
      absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent 
      translate-x-[-100%] group-hover:translate-x-[100%] 
      transition-transform duration-700 ease-in-out
    "
  />
</Link>


            </div>

            {/* --- Right Columns: Featured Articles --- */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Article Card 1: CORONAVIRUS */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl">
                <img
                  // Replace with your actual image source
                  src={corona}
                  alt="Doctor giving patient a vaccine"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <span className="text-xs font-medium text-blue-600 uppercase tracking-wider">
                    CORONAVIRUS
                  </span>
                  <h3 className="text-lg font-semibold text-gray-800 mt-1 mb-2 leading-snug">
                    12 Coronavirus Myths and Facts That You Should Be Aware Of
                  </h3>
                  <p className="text-sm font-medium text-gray-800">Dr. Diana Borgio</p>
                </div>
              </div>

              {/* Article Card 2: VITAMINS AND SUPPLEMENTS */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl">
                <img
                  // Replace with your actual image source
                  src={vitamins}
                  alt="Healthy spread of fruits, nuts, and spices"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <span className="text-xs font-medium text-orange-600 uppercase tracking-wider">
                    VITAMINS AND SUPPLEMENTS
                  </span>
                  <h3 className="text-lg font-semibold text-gray-800 mt-1 mb-2 leading-snug">
                    Eating Right to Build Immunity Against Cold and Viral
                    Infections
                  </h3>
                  <p className="text-sm font-medium text-gray-800">Dr. Diana Borgio</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
