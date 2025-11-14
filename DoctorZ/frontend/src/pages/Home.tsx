import {
  VideoCameraIcon,
  UserIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/solid";

import { useState } from "react";
// Assuming SearchBar is a component that handles the search input and API calls.
import SearchBar from "../components/SearchBar";

import Gynecologist from "../assets/Gynecologist.jpeg";
import Dentist from "../assets/Dentist.jpeg";
import Dietitian from "../assets/nutrition.jpeg";
import Physiotherapist from "../assets/Physiotherapy.jpeg";
// import Kids from "../assets/kids.jpeg";
// import periods from "../assets/period.jpeg";
// import cold from "../assets/cold.png";
// import Acne from "../assets/Acne&pimple.png";
// import Depression from "../assets/depression.png";
import vitamins from "../assets/Vitamin.jpeg";
import { Venus, Baby, Thermometer, Droplet, Moon, Heart } from "lucide-react";
import corona from "../assets/coronavirus.png";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

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
      title: " Video Consultation",
      subtitle: "Connect within 60 secs",
      icon: VideoCameraIcon, // was FaVideo
      bgColor: "bg-purple-100",
      iconColor: "text-red-600",
      features: ["Expert doctors", "Quick response", "Secure chat"],
    },
    {
      title: "Find Doctors Near You",
      subtitle: "Confirmed appointments",
      icon: UserIcon, // was FaUserMd
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
      features: ["Verified profiles", "Real reviews", "Easy booking"],
    },
    {
      title: "Find Clinics Near You",
      subtitle: "Safe and trusted surgery centers",
      icon: BuildingOfficeIcon, // was FaHospital
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
      features: ["Accredited centers", "Expert surgeons", "Post-care support"],
    },
       {
      title: "Lab Tests",
      subtitle: "Safe and trusted surgery centers",
      icon: BuildingOfficeIcon, // was FaHospital
      bgColor: "bg-green-100",
      iconColor: "text-purple-600",
      features: ["Accredited centers", "Expert surgeons", "Post-care support"],
    },
  ];

  

const handleSearchResults = (data: unknown) => {
  if (
    typeof data === "object" &&
    data !== null &&
    !Array.isArray(data) &&
    "type" in data &&
    "results" in data
  ) {
    // 🧩 Safe type narrowing
    const result = data as
      | { type: "doctor"; results: Doctor[] }
      | { type: "clinic"; results: Clinic[] };

    if (result.type === "doctor") {
      setDoctors(result.results);
      setClinics([]);
    } else if (result.type === "clinic") {
      setClinics(result.results);
      setDoctors([]);
    }
  } else if (Array.isArray(data) && data.length === 0) {
    setClinics([]);
    setDoctors([]);
  }
};

  return (
    <div className="flex flex-col max-w-[1500px] bg-gray-50">
      {/* --- Main Search/Hero Section (Inspired by image_7f854e.png) --- */}
<header className="relative bg-gradient-to-r from-blue-900 to-purple-900 py-16 md:py-24 overflow-hidden">
  {/* Background Pattern */}
  <div className="absolute inset-0 opacity-10">
    <div className="absolute top-0 left-0 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
    <div className="absolute top-0 right-0 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
    <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
  </div>

  {/* Medical Icons Floating */}
  <div className="absolute inset-0 opacity-5">
    <span className="absolute top-1/4 left-10 text-4xl">🩺</span>
    <span className="absolute top-1/3 right-20 text-3xl">💊</span>
    <span className="absolute bottom-1/4 left-20 text-5xl">🏥</span>
    <span className="absolute bottom-1/3 right-10 text-4xl">❤️</span>
  </div>

  <div className="container mx-auto px-4 relative z-10">
    <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
      {/* Left Content */}
      <div className="flex-1 text-center lg:text-left">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Find & Book
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200">
            The Best Doctors
          </span>
          Near You
        </h1>
        
        <p className="text-xl text-blue-100 mb-8 max-w-2xl leading-relaxed">
          Connect with 10,000+ verified doctors for online consultations, 
          in-clinic visits, and lab tests. Your health is our priority.
        </p>

        {/* Trust Indicators */}
        <div className="flex flex-wrap gap-6 mb-8 justify-center lg:justify-start">
          <div className="flex items-center gap-2 text-white">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-sm">✓</span>
            </div>
            <span className="text-sm font-medium">Verified Doctors</span>
          </div>
          <div className="flex items-center gap-2 text-white">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-sm">🕒</span>
            </div>
            <span className="text-sm font-medium">24/7 Available</span>
          </div>
          <div className="flex items-center gap-2 text-white">
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
              <span className="text-sm">🏆</span>
            </div>
            <span className="text-sm font-medium">Award Winning</span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="flex flex-wrap gap-8 justify-center lg:justify-start">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">10K+</div>
            <div className="text-blue-200 text-sm">Happy Patients</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">500+</div>
            <div className="text-blue-200 text-sm">Expert Doctors</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">50+</div>
            <div className="text-blue-200 text-sm">Cities</div>
          </div>
        </div>
      </div>

      {/* Right Content - Search Section */}
      <div className="flex-1 max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8 transform hover:scale-[1.02] transition-transform duration-300">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Find Doctors & Book Instantly
            </h3>
            <p className="text-gray-600">
              Search by specialty, symptoms, or doctor name
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <SearchBar onResults={handleSearchResults} />
          </div>

          {/* Quick Filters */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors group">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg">👨‍⚕️</span>
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900 text-sm">Video Consult</div>
                <div className="text-xs text-gray-500">Available 24/7</div>
              </div>
            </button>
            
            <button className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors group">
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg">🏥</span>
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900 text-sm">Clinic Visit</div>
                <div className="text-xs text-gray-500">Book Appointment</div>
              </div>
            </button>
          </div>

          {/* Emergency Section */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white text-lg">🚑</span>
              </div>
              <div className="flex-1">
                <div className="font-semibold text-red-900">Medical Emergency?</div>
                <div className="text-sm text-red-700">Call our 24/7 helpline</div>
              </div>
              <button className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                Call Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Scroll Indicator */}
    <div className="text-center mt-12">
      <div className="inline-flex flex-col items-center text-white">
        <span className="text-sm mb-2">Scroll to explore</span>
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </div>
  </div>


</header>

      {/* --- Service Blocks (Inspired by image_7f854e.png) --- */}
  <section className="py-2 bg-white border-b border-gray-200">

    <div className="text-center mb-16" data-aos="fade-up">

    {/* Premium Services Grid */}
<div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
  {serviceBlocks.map((block, index) => (
    <div
      key={block.title}
      data-aos="zoom-in"
      data-aos-delay={index * 150}
      className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
    >
      {/* Animated Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${block.bgColor} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
      
      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.03] transition-opacity duration-300">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform skew-x-12 group-hover:skew-x-0 transition-transform duration-700" />
      </div>

      <div className="relative p-6 z-10">
        {/* Icon with Glow Effect */}
        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${block.bgColor} bg-opacity-10 mb-4 group-hover:bg-opacity-20 transition-all duration-300 group-hover:scale-105 shadow-md`}>
          <block.icon className={`h-6 w-6 ${block.iconColor} drop-shadow-sm`} />
        </div>

        {/* Text Content */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors">
          {block.title}
        </h3>
        <p className="text-gray-600 leading-relaxed mb-4 text-base">
          {block.subtitle}
        </p> 

      
        {/* <ul className="space-y-1.5 mb-6">
          {block.features?.map((feature, i) => (
            <li key={i} className="flex items-center gap-2 text-xs text-gray-500">
              <span className="w-1 h-1 bg-blue-400 rounded-full flex-shrink-0"></span>
              <span className="leading-tight">{feature}</span>
            </li>
          ))}
        </ul>  */}

        {/* Enhanced CTA */}
        <button className="group/btn w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:border-blue-500 hover:text-blue-600 transition-all duration-300 flex items-center justify-between text-sm">
          <span>Start Consultation</span>
          <span className="group-hover/btn:translate-x-1 transition-transform duration-300 text-blue-500">
            &rarr;
          </span>
        </button>
      </div>

      {/* Shine Effect */}
      <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-30 group-hover:animate-shine" />
    </div>
  ))}
</div>
    {/* Trust Indicators */}
    <div className="max-w-4xl mx-auto mt-16" data-aos="fade-up">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {[
          { number: "24/7", text: "Available" },
          { number: "15min", text: "Average Wait" },
          { number: "100%", text: "Verified Doctors" },
          { number: "4.9★", text: "Patient Rating" }
        ].map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-2xl font-bold text-yellow-500 mb-1">{stat.number}</div>
            <div className="text-sm text-black font-medium">{stat.text}</div>
          </div>
        ))}
      </div>
    </div>
  </div>

  {/* Add this to your CSS for shine animation */}

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

      {/* <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
      
          <div className="flex flex-col md:flex-row items-center justify-between mb-10">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <h2 className="text-3xl font-bold text-black">
                Consult top doctors online for any health concern
              </h2>
              <p className="text-md text-gray-700 mt-2">
                Private online consultations with verified doctors in all
                specialists
              </p>
            </div>
            <Link
              to="/specialities" 
              className="px-6 py-2 border border-blue-400 text-blue-600 rounded-lg hover:bg-blue-50 transition duration-300 font-medium whitespace-nowrap"
            >
              View All Specialities
            </Link>
          </div>

       
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 justify-items-center">
         
            <div className="flex flex-col items-center text-center p-4 group">
     
              <div
                className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center mb-4 
            bg-red-100 border-2 border-gray-200 group-hover:border-blue-300 transition-all duration-300`}
              >
          
                
                  <Moon className="w-12 h-12 sm:w-14 sm:h-14 text-red-500" />
              
              </div>
         
              <p className="font-semibold text-gray-800 text-sm sm:text-base mb-2">
                Period doubts or Pregnancy
              </p>
            
              <Link
                to="#"
                className="text-blue-500 text-xs sm:text-sm font-semibold hover:underline hover:text-blue-700 transition"
              >
                CONSULT NOW
              </Link>
            </div>

            <div className="flex flex-col items-center text-center p-4 group">
       
              <div
                className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center mb-4 
            bg-blue-100 border-2 border-gray-200 group-hover:border-blue-300 transition-all duration-300`}
              >
            
               
                  <Droplet className="w-12 h-12 sm:w-14 sm:h-14 text-blue-500" />
             
              </div>
         
              <p className="font-semibold text-gray-800 text-sm sm:text-base mb-2 ">
                Acne, pimple or skin issues
              </p>
       
              <Link
                to="/consult/skin-issues"
                className="text-blue-500 text-xs sm:text-sm font-semibold hover:underline hover:text-blue-700 transition"
              >
                CONSULT NOW
              </Link>
            </div>

            <div className="flex flex-col items-center text-center p-4 group">
 
              <div
                className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center mb-4 
      bg-purple-100 border-2 border-gray-200 group-hover:border-blue-300 transition-all duration-300`}
              >
          
                <Venus className="w-12 h-12 sm:w-14 sm:h-14 text-purple-500" />
              </div>
              
              <p className="font-semibold text-gray-800 text-sm sm:text-base mb-2">
                Performance issue in bed
              </p>
          
              <Link
                to="#" 
                className="text-blue-500 text-xs sm:text-sm font-semibold hover:underline hover:text-blue-700 transition"
              >
                CONSULT NOW
              </Link>
            </div>

            <div className="flex flex-col items-center text-center p-4 group">
   
              <div
                className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center mb-4 
            bg-blue-100 border-2 border-gray-200 group-hover:border-blue-300 transition-all duration-300`}
              >
                <Thermometer className="w-12 h-12 sm:w-14 sm:h-14 text-orange-500" />
              </div>
        
              <p className="font-semibold text-gray-800 text-sm sm:text-base mb-2">
                Cold ,cough or fever
              </p>
          
              <Link
                to="/consult/skin-issues"
                className="text-blue-500 text-xs sm:text-sm font-semibold hover:underline hover:text-blue-700 transition"
              >
                CONSULT NOW
              </Link>
            </div>

            <div className="flex flex-col items-center text-center p-4 group">
         
              <div
                className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center mb-4 
      bg-orange-100 border-2 border-gray-200 group-hover:border-blue-300 transition-all duration-300`}
              >

                <Baby className="w-12 h-12 sm:w-14 sm:h-14 text-orange-500" />
              </div>
       
              <p className="font-semibold text-gray-800 text-sm sm:text-base mb-2">
                Child not feeling well
              </p>
           
              <Link
                to="#" 
                className="text-blue-500 text-xs sm:text-sm font-semibold hover:underline hover:text-blue-700 transition"
              >
                CONSULT NOW
              </Link>
            </div>

            <div className="flex flex-col items-center text-center p-4 group">
     
              <div
                className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center mb-4 
            bg-blue-100 border-2 border-gray-200 group-hover:border-blue-300 transition-all duration-300`}
              >
            
                <span className="text-4xl text-blue-500">
                  <Heart className="w-12 h-12 sm:w-14 sm:h-14 text-blue-500" />
                </span>
              </div>
        

              <p className="font-semibold text-gray-800 text-sm sm:text-base mb-2">
                Depression or anxiety
              </p>
        
              <Link
                to="#"
                className="text-blue-500 text-xs sm:text-sm font-semibold hover:underline hover:text-blue-700 transition"
              >
                CONSULT NOW
              </Link>
            </div>
          </div>
        </div>
      </section> */}

      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Header Section */}
    <div className="flex flex-col lg:flex-row items-center justify-between mb-16">
      <div className="text-center lg:text-left mb-8 lg:mb-0 max-w-2xl">
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
          Consult Top Doctors for 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            {" "}Any Health Concern
          </span>
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          Private online consultations with verified doctors across all specialties. 
          Get personalized care from the comfort of your home.
        </p>
      </div>
      <Link
        to="/specialities"
        className="group relative px-8 py-4 bg-white border border-blue-500 text-blue-600 rounded-xl hover:bg-blue-50 transition-all duration-300 font-semibold shadow-sm hover:shadow-md whitespace-nowrap"
      >
        View All Specialities
        <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
      </Link>
    </div>

    {/* Health Concerns Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 lg:gap-8">
      {/* Period/Pregnancy */}
      <div className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-blue-200 transform hover:-translate-y-2">
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-5">
            <div className="w-20 h-20 bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-red-100">
              <Moon className="w-10 h-10 text-red-500" />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">♀</span>
            </div>
          </div>
          <h3 className="font-semibold text-gray-800 text-base mb-3 leading-tight">
            Period Doubts or Pregnancy
          </h3>
          <Link
            to="/consult/womens-health"
            className="text-blue-600 text-sm font-semibold hover:text-blue-700 transition-colors duration-300 flex items-center justify-center gap-1 group-hover:gap-2"
          >
            CONSULT NOW
            <span className="text-xs transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>

      {/* Skin Issues */}
      <div className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-blue-200 transform hover:-translate-y-2">
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-5">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-blue-100">
              <Droplet className="w-10 h-10 text-blue-500" />
            </div>
          </div>
          <h3 className="font-semibold text-gray-800 text-base mb-3 leading-tight">
            Acne, Pimple or Skin Issues
          </h3>
          <Link
            to="/consult/dermatology"
            className="text-blue-600 text-sm font-semibold hover:text-blue-700 transition-colors duration-300 flex items-center justify-center gap-1 group-hover:gap-2"
          >
            CONSULT NOW
            <span className="text-xs transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>

      {/* Performance Issues */}
      <div className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-blue-200 transform hover:-translate-y-2">
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-5">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-purple-100">
              <Venus className="w-10 h-10 text-purple-500" />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">⚤</span>
            </div>
          </div>
          <h3 className="font-semibold text-gray-800 text-base mb-3 leading-tight">
            Performance Issues
          </h3>
          <Link
            to="/consult/sexual-health"
            className="text-blue-600 text-sm font-semibold hover:text-blue-700 transition-colors duration-300 flex items-center justify-center gap-1 group-hover:gap-2"
          >
            CONSULT NOW
            <span className="text-xs transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>

      {/* Cold & Fever */}
      <div className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-blue-200 transform hover:-translate-y-2">
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-5">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-orange-100">
              <Thermometer className="w-10 h-10 text-orange-500" />
            </div>
          </div>
          <h3 className="font-semibold text-gray-800 text-base mb-3 leading-tight">
            Cold, Cough or Fever
          </h3>
          <Link
            to="/consult/general-physician"
            className="text-blue-600 text-sm font-semibold hover:text-blue-700 transition-colors duration-300 flex items-center justify-center gap-1 group-hover:gap-2"
          >
            CONSULT NOW
            <span className="text-xs transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>

      {/* Child Health */}
      <div className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-blue-200 transform hover:-translate-y-2">
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-5">
            <div className="w-20 h-20 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-amber-100">
              <Baby className="w-10 h-10 text-amber-500" />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">👶</span>
            </div>
          </div>
          <h3 className="font-semibold text-gray-800 text-base mb-3 leading-tight">
            Child Not Feeling Well
          </h3>
          <Link
            to="/consult/pediatrics"
            className="text-blue-600 text-sm font-semibold hover:text-blue-700 transition-colors duration-300 flex items-center justify-center gap-1 group-hover:gap-2"
          >
            CONSULT NOW
            <span className="text-xs transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>

      {/* Mental Health */}
      <div className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-blue-200 transform hover:-translate-y-2">
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-5">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-indigo-100">
              <Heart className="w-10 h-10 text-indigo-500" />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">🧠</span>
            </div>
          </div>
          <h3 className="font-semibold text-gray-800 text-base mb-3 leading-tight">
            Depression or Anxiety
          </h3>
          <Link
            to="/consult/mental-health"
            className="text-blue-600 text-sm font-semibold hover:text-blue-700 transition-colors duration-300 flex items-center justify-center gap-1 group-hover:gap-2"
          >
            CONSULT NOW
            <span className="text-xs transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </div>

    {/* Trust Indicators */}
    <div className="mt-16 pt-8 border-t border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
            <span className="text-2xl">🏆</span>
          </div>
          <h4 className="font-semibold text-gray-800 mb-2">500+ Verified Doctors</h4>
          <p className="text-gray-600 text-sm">Top specialists from leading hospitals</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
            <span className="text-2xl">🛡️</span>
          </div>
          <h4 className="font-semibold text-gray-800 mb-2">100% Private & Secure</h4>
          <p className="text-gray-600 text-sm">Your consultations are completely confidential</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
            <span className="text-2xl">💊</span>
          </div>
          <h4 className="font-semibold text-gray-800 mb-2">Free Follow-ups</h4>
          <p className="text-gray-600 text-sm">7-day free follow-up for all consultations</p>
        </div>
      </div>
    </div>
  </div>
</section>


{/* //// */}
<section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Header Section */}
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold text-gray-900 mb-4">
        Book an <span className="text-blue-600">In-Clinic Consultation</span>
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Find experienced doctors across all specialties for personalized, face-to-face care at our partner clinics
      </p>
    </div>

    {/* Specialties Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
      {/* Dentist Card */}
      <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden transform hover:-translate-y-2">
        <div className="relative h-48 overflow-hidden">
          <img
            src={Dentist}
            alt="Dentist"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-4 right-4">
            <span className="bg-white/90 backdrop-blur-sm text-blue-600 text-xs font-semibold px-3 py-1 rounded-full">
              🦷 Dental
            </span>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 text-lg">🦷</span>
            </div>
            <h3 className="font-bold text-gray-900 text-lg">Dentist</h3>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            Teething troubles? Schedule a comprehensive dental checkup with our expert dentists
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              🕒 30-min sessions
            </span>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors duration-300 transform group-hover:scale-105">
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Gynecologist Card */}
      <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden transform hover:-translate-y-2">
        <div className="relative h-48 overflow-hidden">
          <img
            src={Gynecologist}
            alt="Gynecologist"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-4 right-4">
            <span className="bg-white/90 backdrop-blur-sm text-pink-600 text-xs font-semibold px-3 py-1 rounded-full">
              👩 Women's Health
            </span>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
              <span className="text-pink-600 text-lg">👩⚕️</span>
            </div>
            <h3 className="font-bold text-gray-900 text-lg">Gynecologist</h3>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            Comprehensive women's health, pregnancy care, and infertility treatments
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              🕒 45-min sessions
            </span>
            <button className="bg-pink-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-pink-700 transition-colors duration-300 transform group-hover:scale-105">
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Dietitian Card */}
      <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden transform hover:-translate-y-2">
        <div className="relative h-48 overflow-hidden">
          <img
            src={Dietitian}
            alt="Dietitian/Nutrition"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-4 right-4">
            <span className="bg-white/90 backdrop-blur-sm text-green-600 text-xs font-semibold px-3 py-1 rounded-full">
              🥗 Nutrition
            </span>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-green-600 text-lg">🥗</span>
            </div>
            <h3 className="font-bold text-gray-900 text-lg">Dietitian</h3>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            Personalized guidance on eating right, weight management, and sports nutrition plans
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              🕒 60-min sessions
            </span>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors duration-300 transform group-hover:scale-105">
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Physiotherapist Card */}
      <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden transform hover:-translate-y-2">
        <div className="relative h-48 overflow-hidden">
          <img
            src={Physiotherapist}
            alt="Physiotherapist"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-4 right-4">
            <span className="bg-white/90 backdrop-blur-sm text-purple-600 text-xs font-semibold px-3 py-1 rounded-full">
              💪 Rehabilitation
            </span>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-purple-600 text-lg">💪</span>
            </div>
            <h3 className="font-bold text-gray-900 text-lg">Physiotherapist</h3>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            Expert treatment for muscle injuries and rehabilitation by trained physiotherapists
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              🕒 45-min sessions
            </span>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-purple-700 transition-colors duration-300 transform group-hover:scale-105">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* CTA Section */}
    <div className="text-center mt-12">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Can't Find Your Specialty?
        </h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          We have 50+ medical specialties and 1000+ experienced doctors ready to help you
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl">
            Browse All Specialties
          </button>
          <button className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-300">
            Call: 1800-HELP-NOW
          </button>
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Verified Doctors
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Same Day Appointments
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Emergency Services
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      <section className="py-20 bg-gray">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
   
            <div className="flex flex-col justify-start lg:col-span-1 p-4">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Read top articles from health experts
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Health articles that keep you informed about good health
                practices and achieve your goals.
              </p>
              <Link
                to="/articles"
                className="w-full sm:w-auto self-start px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300 text-center"
              >
                See all articles
              </Link>
            </div>

        
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
     
              <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl">
                <img
           
                  src={corona}
                  alt="Doctor giving patient a vaccine"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                    CORONAVIRUS
                  </span>
                  <h3 className="text-lg font-bold text-gray-800 mt-1 mb-2 leading-snug">
                    12 Coronavirus Myths and Facts That You Should Be Aware Of
                  </h3>
                  <p className="text-sm text-gray-500">Dr. Diana Borgio</p>
                </div>
              </div>

         
              <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl">
                <img
        
                  src={vitamins}
                  alt="Healthy spread of fruits, nuts, and spices"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <span className="text-xs font-semibold text-orange-600 uppercase tracking-wider">
                    VITAMINS AND SUPPLEMENTS
                  </span>
                  <h3 className="text-lg font-bold text-gray-800 mt-1 mb-2 leading-snug">
                    Eating Right to Build Immunity Against Cold and Viral
                    Infections
                  </h3>
                  <p className="text-sm text-gray-500">Dr. Diana Borgio</p>
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
