import { MapPin, Mail, Phone, Facebook, Linkedin, Youtube, Instagram } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-blue-950 text-gray-300">
      {/* Top Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* DoctorZ Info */}
          <div className="md:col-span-1">
            <h2 className="text-2xl font-bold text-white mb-2">DoctorZ</h2>
            <p className="text-sm mb-4 leading-relaxed">
              DoctorZ is a digital healthcare platform that bridges the gap between patients and doctors.
              Book online consultations, read health articles, and manage appointments with ease.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="hover:text-blue-400"><Facebook /></a>
              <a href="#" className="hover:text-blue-400"><Instagram /></a>
              <a href="#" className="hover:text-blue-400"><Youtube /></a>
              <a href="#" className="hover:text-blue-400"><Linkedin /></a>
            </div>
          </div>

          {/* About Section */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-3 border-b border-blue-800 inline-block pb-1">
              About
            </h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">About DoctorZ</a></li>
              <li><a href="#" className="hover:text-white">Our Team</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:text-white">News & Updates</a></li>
              <li><a href="#" className="hover:text-white">Contact Us</a></li>
            </ul>
          </div>

          {/* For Patients */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-3 border-b border-blue-800 inline-block pb-1">
              For Patients
            </h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Search for Doctors</a></li>
              <li><a href="#" className="hover:text-white">Search for Clinics</a></li>
              <li><a href="#" className="hover:text-white">Book Appointments</a></li>
              <li><a href="#" className="hover:text-white">Health Articles</a></li>
              <li><a href="#" className="hover:text-white">Download App</a></li>
            </ul>
          </div>

          {/* For Doctors */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-3 border-b border-blue-800 inline-block pb-1">
              For Doctors
            </h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Join DoctorZ</a></li>
              <li><a href="#" className="hover:text-white">Manage Appointments</a></li>
              <li><a href="#" className="hover:text-white">DoctorZ Pro</a></li>
              <li><a href="#" className="hover:text-white">For Clinics</a></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-3 border-b border-blue-800 inline-block pb-1">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={18} className="text-blue-400 mt-1" />
                <span>123 Health Street, Raipur, Chhattisgarh 492001</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={18} className="text-blue-400" />
                <span>support@doctorz.in</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} className="text-blue-400" />
                <span>+91 98765 43210</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-blue-900 border-t border-blue-800">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-sm px-6 py-5">
          <p className="text-gray-400 text-center md:text-left">
            Copyright © {new Date().getFullYear()}{" "}
            <span className="text-white font-semibold">DoctorZ</span>. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-2 md:mt-0">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms & Conditions</a>
            <a href="#" className="hover:text-white">Sitemap</a>
            <a
              href="#"
              className="text-gray-400 hover:text-blue-300 font-medium"
            >
              Powered by <span className="text-white font-semibold">Zager Digital Services</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;