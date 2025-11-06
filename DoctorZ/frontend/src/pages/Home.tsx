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
import { Venus , Baby} from 'lucide-react';
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
  const [doctors, setDoctors, ] = useState<Doctor[]>([]);

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
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Consult top doctors online for any health concern
          </h2>
          <p className="text-md text-gray-600 mb-10 text-center">
            Private online consultations with verified doctors in all specialties
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
                  {Array.isArray(clinic.specialities) && clinic.specialities.length > 0
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

    
   

   <section className="py-16 bg-white">
  <div className="container mx-auto px-4">
    {/* Header with "View All Specialities" button */}
    <div className="flex flex-col md:flex-row items-center justify-between mb-10">
      <div className="text-center md:text-left mb-6 md:mb-0">
        <h2 className="text-3xl font-bold text-gray-800">
          Consult top doctors online for any health concern
        </h2>
        <p className="text-md text-gray-600 mt-2">
          Private online consultations with verified doctors in all specialists
        </p>
      </div>
      <Link
        to="/specialities" // Link to a page listing all specialities
        className="px-6 py-2 border border-blue-400 text-blue-600 rounded-lg hover:bg-blue-50 transition duration-300 font-medium whitespace-nowrap"
      >
        View All Specialities
      </Link>
    </div>

    {/* Health Concerns Grid (Requires the 'healthConcerns' array from the full component) */}
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 justify-items-center">
      
     
      {/* Placeholder structure for one item: */}
      <div className="flex flex-col items-center text-center p-4 group">
        {/* Icon Circle (Example: Period/Pregnancy) */}
        <div 
          className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center mb-4 
            bg-red-100 border-2 border-gray-200 group-hover:border-blue-300 transition-all duration-300`}
        >
          {/* <HeartPulse className="w-12 h-12 sm:w-14 sm:h-14 text-red-500" /> */}
          <span className="text-4xl text-red-500">
            <img src={periods} alt="periods" />
          </span>
        </div>
        {/* Title */}
        <p className="font-semibold text-gray-800 text-sm sm:text-base mb-2">
          Period doubts or Pregnancy
        </p>
        {/* Consult Now Link */}
        <Link
          to="#"
          className="text-blue-500 text-xs sm:text-sm font-semibold hover:underline hover:text-blue-700 transition"
        >
          CONSULT NOW
        </Link>
      </div>
      
      {/* Placeholder structure for another item: */}
      <div className="flex flex-col items-center text-center p-4 group">
        {/* Icon Circle (Example: Skin Issues) */}
        <div
          className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center mb-4 
            bg-blue-100 border-2 border-gray-200 group-hover:border-blue-300 transition-all duration-300`}
        >
          {/* <Sparkles className="w-12 h-12 sm:w-14 sm:h-14 text-blue-500" /> */}
          <span className="text-4xl text-blue-500">
            <img src={Acne} alt="Acne & pimple" />
          </span>
        </div>
        {/* Title */}
        <p className="font-semibold text-gray-800 text-sm sm:text-base mb-2">
          Acne, pimple or skin issues
        </p>
        {/* Consult Now Link */}
        <Link
          to="/consult/skin-issues"
          className="text-blue-500 text-xs sm:text-sm font-semibold hover:underline hover:text-blue-700 transition"
        >
          CONSULT NOW
        </Link>
      </div>

   

<div className="flex flex-col items-center text-center p-4 group">
  {/* Icon Circle (Performance issue in bed) */}
  <div
    className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center mb-4 
      bg-purple-100 border-2 border-gray-200 group-hover:border-blue-300 transition-all duration-300`}
  >
    {/* Replaced <img> with Lucide Venus icon and set appropriate color */}
    <Venus className="w-12 h-12 sm:w-14 sm:h-14 text-purple-500" />
  </div>
  {/* Title */}
  <p className="font-semibold text-gray-800 text-sm sm:text-base mb-2">
    Performance issue in bed
  </p>
  {/* Consult Now Link */}
  <Link
    to="#" // Consider a more specific link if available
    className="text-blue-500 text-xs sm:text-sm font-semibold hover:underline hover:text-blue-700 transition"
  >
    CONSULT NOW
  </Link>
</div>

      <div className="flex flex-col items-center text-center p-4 group">
        {/* Icon Circle (Example: Skin Issues) */}
        <div
          className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center mb-4 
            bg-blue-100 border-2 border-gray-200 group-hover:border-blue-300 transition-all duration-300`}
        >
          {/* <Sparkles className="w-12 h-12 sm:w-14 sm:h-14 text-blue-500" /> */}
          <span className="text-4xl text-blue-500">
            <img src={cold}  />
          </span>
        </div>
        {/* Title */}
        <p className="font-semibold text-gray-800 text-sm sm:text-base mb-2">
        Cold ,cough or fever
        </p>
        {/* Consult Now Link */}
        <Link
          to="/consult/skin-issues"
          className="text-blue-500 text-xs sm:text-sm font-semibold hover:underline hover:text-blue-700 transition"
        >
          CONSULT NOW
        </Link>
      </div>

    

<div className="flex flex-col items-center text-center p-4 group">
  {/* Icon Circle (Child not feeling well) */}
  <div
    className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center mb-4 
      bg-orange-100 border-2 border-gray-200 group-hover:border-blue-300 transition-all duration-300`}
  >
    {/* Replaced <img> with Lucide Baby icon and set appropriate color */}
    <Baby className="w-12 h-12 sm:w-14 sm:h-14 text-orange-500" />
  </div>
  {/* Title */}
  <p className="font-semibold text-gray-800 text-sm sm:text-base mb-2">
    Child not feeling well
  </p>
  {/* Consult Now Link */}
  <Link
    to="#" // Consider a more specific link if available
    className="text-blue-500 text-xs sm:text-sm font-semibold hover:underline hover:text-blue-700 transition"
  >
    CONSULT NOW
  </Link>
</div>

      <div className="flex flex-col items-center text-center p-4 group">
        {/* Icon Circle (Example: Skin Issues) */}
        <div
          className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center mb-4 
            bg-blue-100 border-2 border-gray-200 group-hover:border-blue-300 transition-all duration-300`}
        >
          {/* <Sparkles className="w-12 h-12 sm:w-14 sm:h-14 text-blue-500" /> */}
          <span className="text-4xl text-blue-500">
            <img src={Depression} alt="Acne & pimple" />
          </span>
        </div>
        {/* Title */}
        <p className="font-semibold text-gray-800 text-sm sm:text-base mb-2">
          Depression or anxiety
        </p>
        {/* Consult Now Link */}
        <Link
          to="#"
          className="text-blue-500 text-xs sm:text-sm font-semibold hover:underline hover:text-blue-700 transition"
        >
          CONSULT NOW
        </Link>
      </div>
      

    </div>
  </div>
</section> 

     

      {/* --- In-Clinic Consultation Section (Inspired by image_7f8839.jpg) --- */}
      <section className="py-12 bg-white">
  <div className="container mx-auto px-4">
    <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center md:text-left">
      Book an appointment for an in-clinic consultation
    </h2>
    <p className="text-md text-gray-600 mb-8 text-center md:text-left">
      Find experienced doctors across all specialities
    </p>
    {/* This would typically be a carousel, here it's a grid with actual images */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {/* Dentist */}
      <div className="rounded-lg overflow-hidden shadow-lg border border-gray-100 transform hover:scale-105 transition-transform duration-300">
        <div className="h-50 overflow-hidden">
          {/* Image related to Dentist */}
          <img
            src={Dentist}
            alt="Dentist"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-gray-800">Dentist</h3>
          <p className="text-xs text-gray-500">Teething troubles? Schedule a dental checkup</p>
        </div>
      </div>
      
      {/* Gynecologist */}
      <div className="rounded-lg overflow-hidden shadow-lg border border-gray-100 transform hover:scale-105 transition-transform duration-300">
        <div className="h-40 overflow-hidden">
          {/* Image related to Gynecologist */}
          <img
            src={Gynecologist}
            alt="Gynecologist"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-gray-800">Gynecologist</h3>
          <p className="text-xs text-gray-500">Women's health, pregnancy and infertility treatments</p>
        </div>
      </div>
      
      {/* Dietitian/Nutrition */}
      <div className="rounded-lg overflow-hidden shadow-lg border border-gray-100 transform hover:scale-105 transition-transform duration-300">
        <div className="h-40 overflow-hidden">
          {/* Image related to Dietitian/Nutrition */}
          <img
            src={Dietitian}
            alt="Dietitian/Nutrition"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-gray-800">Dietitian/Nutrition</h3>
          <p className="text-xs text-gray-500">Guidance on eating right, weight management, and sports nutrition</p>
        </div>
      </div>
      
      {/* Physiotherapist */}
      <div className="rounded-lg overflow-hidden shadow-lg border border-gray-100 transform hover:scale-105 transition-transform duration-300">
        <div className="h-40 overflow-hidden">
          {/* Image related to Physiotherapist */}
          <img
            src={Physiotherapist}
            alt="Physiotherapist"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-gray-800">Physiotherapist</h3>
          <p className="text-xs text-gray-500">Pulled a muscle? Get it treated by a trained physiotherapist</p>
        </div>
      </div>
    </div>
  </div>
</section>



<section className="py-20 bg-gray">
  <div className="container mx-auto px-4 max-w-7xl">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      
      {/* --- Left Column: Header and Button --- */}
      <div className="flex flex-col justify-start lg:col-span-1 p-4">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Read top articles from health experts
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Health articles that keep you informed about good health practices and achieve your goals.
        </p>
        <Link
          to="/articles"
          className="w-full sm:w-auto self-start px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300 text-center"
        >
          See all articles
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
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
              CORONAVIRUS
            </span>
            <h3 className="text-lg font-bold text-gray-800 mt-1 mb-2 leading-snug">
              12 Coronavirus Myths and Facts That You Should Be Aware Of
            </h3>
            <p className="text-sm text-gray-500">Dr. Diana Borgio</p>
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
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-wider">
              VITAMINS AND SUPPLEMENTS
            </span>
            <h3 className="text-lg font-bold text-gray-800 mt-1 mb-2 leading-snug">
              Eating Right to Build Immunity Against Cold and Viral Infections
            </h3>
            <p className="text-sm text-gray-500">Dr. Diana Borgio</p>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</section>



     <Footer  />
      
    </div>
  );
}