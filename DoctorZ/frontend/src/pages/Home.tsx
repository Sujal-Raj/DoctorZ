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
      bgColor: "bg-[#0c213e]20",
      iconColor: "text-[#0c213e]",
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

  function handleSearch(value: string): void {
    throw new Error("Function not implemented.");
  }


  // The real image URL retrieved for a professional doctor
  const doctorImageUrl = "/doctor.webp";

  return (
    <div className="flex flex-col max-w-[1500px] bg-gray-50">
      {/* --- Main Search/Hero Section (Inspired by image_7f854e.png) --- */}
      {/* design 1 ...... */}
{/* <header className="relative bg-gray-900 min-h-[85vh] flex items-center overflow-hidden">

      <div className="absolute inset-0">
  
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1576091160550-2173dba99932?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0OTI3MDV8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtZWRpY2FsJTIwYmFja2dyb3VuZHxlbnwwfHx8fDE3MTAxNDU4NTF8MA&lib=rb-4.0.3&q=80&w=1080")' }}>

          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 to-purple-900/90"></div>
        </div>
      </div>

      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 -left-1/4 w-[500px] h-[500px] bg-[#0c213e] rounded-full mix-blend-screen filter blur-3xl opacity-40"></div>
        <div className="absolute -bottom-1/4 right-0 w-[500px] h-[500px] bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-40"></div>
      </div>

   
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <span className="absolute top-1/4 left-10 text-7xl text-blue-300/50">🩺</span>
        <span className="absolute top-1/3 right-20 text-6xl text-purple-300/50">💊</span>
        <span className="absolute bottom-1/4 left-1/3 text-8xl text-pink-300/50">❤️</span>
        <span className="absolute bottom-1/3 right-10 text-7xl text-blue-300/50">🔬</span>
      </div>

      <div className="container mx-auto px-4 relative z-10 py-20">
        
     
        <div className="max-w-4xl mx-auto text-center">
          
         
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white mb-6 leading-tight tracking-tight">
            Book <span className="text-blue-400">Trusted</span> & 
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300 mt-2">
              Verified Doctors
            </span>
            Instantly
          </h1>

          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto leading-snug font-light">
            Connect with **10,000+ top specialists** for in-person or video consultations. 
            Your health, our priority.
          </p>

          
          <div className="max-w-3xl mx-auto mb-10 p-2 bg-white/20 backdrop-blur-md rounded-2xl shadow-xl border border-white/30">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1">
                <input 
                  type="text" 
                  placeholder="Search by Specialty, Symptom, or Doctor name..." 
                  className="w-full text-lg p-4 rounded-xl border-none focus:ring-4 focus:ring-purple-500/50 placeholder-gray-500 text-gray-800 shadow-inner"
                  // You would replace this with a proper SearchBar component
                  onChange={(e) => handleSearch(e.target.value)} 
                />
              </div>
              <button className="flex-shrink-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold px-8 py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all text-lg shadow-lg">
                Find My Doctor
              </button>
            </div>
          </div>

         
          <div className="flex justify-center flex-wrap gap-4 mb-16">
            <button className="text-white text-sm font-semibold bg-white/10 hover:bg-white/20 transition-colors py-2 px-4 rounded-full border border-white/30">
              Video Consultations 👨‍💻
            </button>
            <button className="text-white text-sm font-semibold bg-white/10 hover:bg-white/20 transition-colors py-2 px-4 rounded-full border border-white/30">
              General Physician 🩺
            </button>
            <button className="text-white text-sm font-semibold bg-white/10 hover:bg-white/20 transition-colors py-2 px-4 rounded-full border border-white/30">
              Pediatrician 👶
            </button>
            <button className="text-white text-sm font-semibold bg-white/10 hover:bg-white/20 transition-colors py-2 px-4 rounded-full border border-white/30">
              Check Lab Results 🔬
            </button>
          </div>

          
          <div className="flex gap-12 justify-center border-t border-b border-white/20 py-6">
              <div className="text-center">
                <div className="text-4xl font-extrabold text-white">10K+</div>
                <div className="text-blue-200 text-sm tracking-wide mt-1">Happy Patients</div>
              </div>
              <div className="text-center border-l border-white/20 pl-12">
                <div className="text-4xl font-extrabold text-white">500+</div>
                <div className="text-blue-200 text-sm tracking-wide mt-1">Expert Doctors</div>
              </div>
              <div className="text-center border-l border-white/20 pl-12">
                <div className="text-4xl font-extrabold text-white">4.9/5</div>
                <div className="text-blue-200 text-sm tracking-wide mt-1">Average Rating</div>
              </div>
            </div>
        </div>
      </div>
    </header> */}


    {/* design 2 ..... */}
{/* <header className="relative bg-gray-900 min-h-[85vh] flex items-center overflow-hidden">
   
      <div className="absolute inset-0">
    
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: `url("${doctorImageUrl}")` }}
        >
          
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 to-purple-900/90"></div>
        </div>
      </div>

     
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 -left-1/4 w-[500px] h-[500px] bg-[#0c213e] rounded-full mix-blend-screen filter blur-3xl opacity-40"></div>
        <div className="absolute -bottom-1/4 right-0 w-[500px] h-[500px] bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-40"></div>
      </div>

    
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <span className="absolute top-1/4 left-10 text-7xl text-blue-300/50">🩺</span>
        <span className="absolute top-1/3 right-20 text-6xl text-purple-300/50">💊</span>
        <span className="absolute bottom-1/4 left-1/3 text-8xl text-pink-300/50">❤️</span>
        <span className="absolute bottom-1/3 right-10 text-7xl text-blue-300/50">🔬</span>
      </div>

      <div className="container mx-auto px-4 relative z-10 py-20">
        
       
        <div className="max-w-4xl mx-auto text-center">
          
        
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white mb-6 leading-tight tracking-tight">
            Book <span className="text-blue-400">Trusted</span> & 
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300 mt-2">
              Verified Doctors
            </span>
            Instantly
          </h1>

          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto leading-snug font-light">
            Connect with **10,000+ top specialists** for in-person or video consultations. 
            Your health, our priority.
          </p>

          
          <div className="max-w-3xl mx-auto mb-10 p-2 bg-white/20 backdrop-blur-md rounded-2xl shadow-xl border border-white/30">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1">
                <input 
                  type="text" 
                  placeholder="Search by Specialty, Symptom, or Doctor name..." 
                  className="w-full text-lg p-4 rounded-xl border-none focus:ring-4 focus:ring-purple-500/50 placeholder-gray-500 text-gray-800 shadow-inner"
                  onChange={(e) => handleSearch(e.target.value)} 
                />
              </div>
              <button className="flex-shrink-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold px-8 py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all text-lg shadow-lg">
                Find My Doctor
              </button>
            </div>
          </div>

      
          <div className="flex justify-center flex-wrap gap-4 mb-16">
            <button className="text-white text-sm font-semibold bg-white/10 hover:bg-white/20 transition-colors py-2 px-4 rounded-full border border-white/30">
              Video Consultations 👨‍💻
            </button>
            <button className="text-white text-sm font-semibold bg-white/10 hover:bg-white/20 transition-colors py-2 px-4 rounded-full border border-white/30">
              General Physician 🩺
            </button>
            <button className="text-white text-sm font-semibold bg-white/10 hover:bg-white/20 transition-colors py-2 px-4 rounded-full border border-white/30">
              Pediatrician 👶
            </button>
            <button className="text-white text-sm font-semibold bg-white/10 hover:bg-white/20 transition-colors py-2 px-4 rounded-full border border-white/30">
              Check Lab Results 🔬
            </button>
          </div>

         
          <div className="flex gap-12 justify-center border-t border-b border-white/20 py-6">
              <div className="text-center">
                <div className="text-4xl font-extrabold text-white">10K+</div>
                <div className="text-blue-200 text-sm tracking-wide mt-1">Happy Patients</div>
              </div>
              <div className="text-center border-l border-white/20 pl-12">
                <div className="text-4xl font-extrabold text-white">500+</div>
                <div className="text-blue-200 text-sm tracking-wide mt-1">Expert Doctors</div>
              </div>
              <div className="text-center border-l border-white/20 pl-12">
                <div className="text-4xl font-extrabold text-white">4.9/5</div>
                <div className="text-blue-200 text-sm tracking-wide mt-1">Average Rating</div>
              </div>
            </div>
        </div>
      </div>
    </header> */}


    {/* design 3 ..... */}

{/* <header className="relative bg-white min-h-[85vh] flex items-center overflow-hidden">
    
   
    <div className="absolute inset-0 opacity-10 pointer-events-none">
       
        <div className="absolute inset-0 bg-repeat" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239eebff' fill-opacity='0.1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3C/g%3E%3C/svg%3E")` }}></div>
        
        <div className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] bg-[#0c213e]20 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
    </div>

    <div className="container mx-auto px-4 relative z-10 py-20">
        
       
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            
            
            <div className="md:col-span-7 lg:col-span-6 text-center md:text-left">
                
               
                <div className="inline-block bg-[#0c213e]20 text-[#0c213e] text-sm font-semibold px-3 py-1 rounded-full mb-4">
                    ⭐️ Verified Health Network
                </div>

              
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
                    Find the <span className="text-[#0c213e]">Right Doctor</span>, 
                    <span className="block">Right Now.</span>
                </h1>

          
                <p className="text-xl text-gray-600 mb-8 max-w-xl md:max-w-none mx-auto leading-snug">
                    Access transparent profiles, real patient reviews, and instant booking 
                    for over **100+ specialties**. Your health journey starts here.
                </p>

             
                <div className="mt-10 max-w-2xl md:max-w-full mx-auto p-3 bg-white rounded-3xl shadow-xl border border-gray-100">
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="flex-1">
                            <input 
                                type="text" 
                                placeholder="Search by Specialty, Symptom, or Location..." 
                                className="w-full text-lg p-4 rounded-2xl border-none focus:ring-4 focus:ring-blue-500/50 placeholder-gray-400 text-gray-800 shadow-inner bg-gray-50"
                                onChange={(e) => handleSearch(e.target.value)} 
                            />
                        </div>
                        <button className="flex-shrink-0 bg-[#0c213e] text-white font-bold px-8 py-4 rounded-2xl hover:bg-[#0c213e] transition-all text-lg shadow-lg">
                            Search
                        </button>
                    </div>
                </div>

           
                <div className="flex justify-center md:justify-start flex-wrap gap-3 mt-6">
                    <button className="text-gray-700 text-sm font-medium bg-gray-100 hover:bg-gray-200 transition-colors py-2 px-4 rounded-full">
                        Find Dentists 🦷
                    </button>
                    <button className="text-gray-700 text-sm font-medium bg-gray-100 hover:bg-gray-200 transition-colors py-2 px-4 rounded-full">
                        Book Telehealth 📞
                    </button>
                    <button className="text-gray-700 text-sm font-medium bg-gray-100 hover:bg-gray-200 transition-colors py-2 px-4 rounded-full">
                        View Pediatricians 👶
                    </button>
                </div>

            </div>

           
            <div className="md:col-span-5 lg:col-span-6 flex justify-center mt-10 md:mt-0">
             
                <div className="w-full max-w-md h-[450px] bg-blue-50 border-8 border-white rounded-3xl shadow-2xl relative overflow-hidden">
                    
                    <div 
                        className="absolute inset-0 bg-cover bg-center" 
                        style={{ backgroundImage: `url("${doctorImageUrl}")` }}
                    >
                       
                        <div className="flex items-center justify-center h-full text-gray-500 text-xl font-medium">
                            
                        </div>
                    </div>
                    
                 
                    <div className="absolute -bottom-4 -left-4 bg-white p-3 rounded-xl shadow-lg border border-blue-200 transform rotate-[-5deg]">
                        <span className="text-sm font-bold text-green-600">
                            ✅ 10K+ Bookings
                        </span>
                    </div>
                </div>
            </div>
        </div>
        
        
        <div className="mt-16 pt-8 border-t border-gray-100">
            <div className="flex gap-8 justify-center flex-wrap">
                <div className="text-center">
                    <div className="text-4xl font-extrabold text-[#0c213e]">98%</div>
                    <div className="text-gray-500 text-sm tracking-wide mt-1">Satisfaction Rate</div>
                </div>
                <div className="text-center">
                    <div className="text-4xl font-extrabold text-[#0c213e]">100+</div>
                    <div className="text-gray-500 text-sm tracking-wide mt-1">Specialties Available</div>
                </div>
                <div className="text-center">
                    <div className="text-4xl font-extrabold text-[#0c213e]">24/7</div>
                    <div className="text-gray-500 text-sm tracking-wide mt-1">Support & Booking</div>
                </div>
            </div>
        </div>

    </div>
</header> */}


{/* design 4 .... */}

{/* <header className="relative bg-white min-h-[90vh] flex items-center overflow-hidden">
    

    <div className="absolute inset-0 md:left-1/2">
       <div 
            className="absolute inset-0 bg-cover bg-center" 
           style={{ backgroundImage: `url(${doctorImageUrl})` }}
        >
            
            <div className="absolute inset-0 bg-gradient-to-r from-white/95 to-transparent"></div>
        </div>
    </div>
    
   
    <div className="container mx-auto px-4 relative z-10 py-24 md:py-32">
        
        <div className="max-w-xl text-center md:text-left">
            
           
            <div className="inline-block bg-green-100 text-green-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4 shadow-sm">
                ✅ 5-Star Rated Health Booking
            </div>

         
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
                Connect with <span className="text-green-600">Expert Care</span>, 
                <span className="block">Today.</span>
            </h1>

           
            <p className="text-xl text-gray-700 mb-10 leading-relaxed font-light">
                Find the perfect specialist near you. Easy scheduling, transparent pricing, and verified patient reviews.
            </p>

           
            <div className="max-w-lg mx-auto md:mx-0 p-3 bg-white/95 border border-gray-100 rounded-3xl shadow-xl">
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1">
                        <input 
                            type="text" 
                            placeholder="Specialty, Doctor name, or Symptom..." 
                            className="w-full text-lg p-4 rounded-2xl border-none focus:ring-4 focus:ring-green-500/50 placeholder-gray-500 text-gray-800 shadow-inner bg-gray-50"
                            onChange={(e) => handleSearch(e.target.value)} 
                        />
                    </div>
                    <button className="flex-shrink-0 bg-green-600 text-white font-extrabold px-8 py-4 rounded-2xl hover:bg-green-700 transition-all text-lg shadow-lg">
                        Search
                    </button>
                </div>
            </div>

            
            <div className="flex gap-10 justify-center md:justify-start mt-10">
                <div className="text-left">
                    <div className="text-4xl font-extrabold text-green-600">10K+</div>
                    <div className="text-gray-600 text-sm tracking-wide mt-1">Verified Doctors</div>
                </div>
                <div className="text-left">
                    <div className="text-4xl font-extrabold text-green-600">500K+</div>
                    <div className="text-gray-600 text-sm tracking-wide mt-1">Happy Patients</div>
                </div>
            </div>
            
        </div>
        
    </div>
</header> */}

{/* desgin  ...5  */}

<header className="relative bg-white min-h-[85vh] flex items-start pt-20 overflow-hidden">
    
    {/* ==================================================================== */}
    {/* 1. Background Structure: Subtle Blue/Gray Gradient and Grid            */}
    {/* ==================================================================== */}
    <div className="absolute inset-0 opacity-70 pointer-events-none">
        {/* Soft, professional background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white"></div>
        
        {/* Subtle grid pattern for texture and professionalism */}
        <div className="absolute inset-0" style={{ 
            backgroundImage: `linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)`, 
            backgroundSize: '40px 40px', 
            opacity: 0.5 
        }}></div>
    </div>

    {/* ==================================================================== */}
    {/* 2. Main Content Container (Full-Width Focus)                         */}
    {/* ==================================================================== */}
    <div className="container mx-auto px-4 relative z-10">
        
        {/* Central Content Block (No Grid) */}
        <div className="max-w-5xl mx-auto text-center pt-10">
            
            {/* Headline: Now Centered */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-4 leading-tight tracking-tight">
                Your Health, <span className="text-[#0c213e]">Simplified.</span>
                <span className="block text-4xl md:text-5xl mt-2 font-semibold text-gray-800/90">
                    Book Verified Professionals Instantly.
                </span>
            </h1>

            {/* Description and Trust Seals */}
            <p className="text-xl text-gray-600 mb-6 max-w-xl mx-auto leading-relaxed">
                Trusted by millions, our platform connects you instantly with **certified doctors** and transparent, upfront information.
            </p>

            {/* Trust Seals/Badges: Now Centered */}
            <div className="flex justify-center gap-8 mt-6 mb-10 flex-wrap">
                <div className="flex items-center text-base font-semibold text-gray-800">
                    <span className="text-[#0c213e] mr-2 text-xl">✅</span> 100% Verified Reviews
                </div>
                <div className="flex items-center text-base font-semibold text-gray-800">
                    <span className="text-[#0c213e] mr-2 text-xl">🛡️</span> HIPAA Compliant Security
                </div>
            </div>

            {/* Integrated Search Bar (Now Full-Width Focused Below Text) */}
            <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-3xl shadow-2xl shadow-[#0c213e]/60 border-t-4 border-[#0c213e]">
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                    Start Your Search Instantly
                </h3>
                
                <div className="flex flex-col md:flex-row gap-4">
                    <input 
                        type="text" 
                        placeholder="Specialty, Doctor, or Symptom..." 
                        className="flex-1 text-lg p-4 rounded-xl border border-gray-300 focus:border-[#0c213e] focus:ring-4 focus:ring-blue-500/30 placeholder-gray-500 text-gray-800"
                        onChange={(e) => handleSearch(e.target.value)} 
                    />
                    <input 
                        type="text" 
                        placeholder="City or Zip Code" 
                        className="flex-1 text-lg p-4 rounded-xl border border-gray-300 focus:border-[#0c213e] focus:ring-4 focus:ring-blue-500/30 placeholder-gray-500 text-gray-800"
                    />
                    <button className="flex-shrink-0 bg-[#0c213e] text-white font-extrabold px-8 py-4 rounded-xl hover:bg-[#0c213e] transition-all text-xl shadow-lg shadow-[#0c213e]/50">
                        Find My Appointment 🔍
                    </button>
                </div>
            </div>
            
        </div>
        
        {/* 3. Global Stats/Footers (Wide Trust Indicators) */}
        <div className="mt-20 pt-8 pb-12 border-t border-gray-200">
            <div className="flex gap-12 justify-center flex-wrap">
                <div className="text-center">
                    <div className="text-5xl font-extrabold text-[#0c213e]">1M+</div>
                    <div className="text-gray-500 text-sm tracking-widest uppercase mt-1">Total Bookings</div>
                </div>
                <div className="text-center">
                    <div className="text-5xl font-extrabold text-[#0c213e]">4.9/5</div>
                    <div className="text-gray-500 text-sm tracking-widest uppercase mt-1">User Rating</div>
                </div>
                <div className="text-center">
                    <div className="text-5xl font-extrabold text-[#0c213e]">200+</div>
                    <div className="text-gray-500 text-sm tracking-widest uppercase mt-1">Top Specialties</div>
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

      
    

        {/* Enhanced CTA */}
        <button className="group/btn w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:border-[#0c213e] hover:text-[#0c213e] transition-all duration-300 flex items-center justify-between text-sm">
          <span>Start Consultation</span>
          <span className="group-hover/btn:translate-x-1 transition-transform duration-300 text-[#0c213e]">
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
                <h3 className="text-xl font-bold text-[#0c213e] mb-1">
                  {clinic.clinicName}
                </h3>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#0c213e]20 text-[#0c213e]">
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
                  className="mt-4 w-full px-4 py-2 bg-[#0c213e] text-white font-semibold rounded-lg shadow-md hover:bg-[#0c213e] transition-all text-sm"
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
        className="group relative px-8 py-4 bg-white border border-[#0c213e] text-[#0c213e] rounded-xl hover:bg-blue-50 transition-all duration-300 font-semibold shadow-sm hover:shadow-md whitespace-nowrap"
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
            className="text-[#0c213e] text-sm font-semibold hover:text-[#0c213e] transition-colors duration-300 flex items-center justify-center gap-1 group-hover:gap-2"
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
              <Droplet className="w-10 h-10 text-[#0c213e]" />
            </div>
          </div>
          <h3 className="font-semibold text-gray-800 text-base mb-3 leading-tight">
            Acne, Pimple or Skin Issues
          </h3>
          <Link
            to="/consult/dermatology"
            className="text-[#0c213e] text-sm font-semibold hover:text-[#0c213e] transition-colors duration-300 flex items-center justify-center gap-1 group-hover:gap-2"
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
            className="text-[#0c213e] text-sm font-semibold hover:text-[#0c213e] transition-colors duration-300 flex items-center justify-center gap-1 group-hover:gap-2"
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
            className="text-[#0c213e] text-sm font-semibold hover:text-[#0c213e] transition-colors duration-300 flex items-center justify-center gap-1 group-hover:gap-2"
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
            className="text-[#0c213e] text-sm font-semibold hover:text-[#0c213e] transition-colors duration-300 flex items-center justify-center gap-1 group-hover:gap-2"
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
            className="text-[#0c213e] text-sm font-semibold hover:text-[#0c213e] transition-colors duration-300 flex items-center justify-center gap-1 group-hover:gap-2"
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
          <div className="w-12 h-12 bg-[#0c213e]20 rounded-full flex items-center justify-center mb-3">
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
        Book an <span className="text-[#0c213e]">In-Clinic Consultation</span>
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
            <span className="bg-white/90 backdrop-blur-sm text-[#0c213e] text-xs font-semibold px-3 py-1 rounded-full">
              🦷 Dental
            </span>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-[#0c213e]20 rounded-lg flex items-center justify-center">
              <span className="text-[#0c213e] text-lg">🦷</span>
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
            <button className="bg-[#0c213e] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-300 transform group-hover:scale-105">
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
            <button className="bg-[#0c213e] text-white px-4 py-2 rounded-lg text-sm font-semibold ransition-colors duration-300 transform group-hover:scale-105">
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
            <button className="bg-[#0c213e] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-300 transform group-hover:scale-105">
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
            <button className="bg-[#0c213e] text-white px-4 py-2 rounded-lg text-sm font-semibold  transition-colors duration-300 transform group-hover:scale-105">
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
          <button className="bg-[#0c213e] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#030b4d] transition-colors duration-300 shadow-lg hover:shadow-xl">
            Browse All Specialties
          </button>
          <button className="border border-[#0c213e] text-[#0c213e] px-8 py-3 rounded-lg font-semibold hover:bg-[#e0e7ff] transition-colors duration-300">
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
                className="w-full sm:w-auto self-start px-6 py-3 bg-[#0c213e] text-white font-semibold rounded-lg shadow-md hover:bg-[#0c213e] transition duration-300 text-center"
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
                  <span className="text-xs font-semibold text-bg-[#0c213e] uppercase tracking-wider">
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
