import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  Menu,
  X,
  User,
  LogOut,
  LogIn,
  Stethoscope,
  Hospital,
  UserPlus,
  ChevronDown,
  MapPin,
  Navigation,
  Loader2,
} from "lucide-react";
import { AuthContext } from "../Context/AuthContext.js";

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isLoggedIn, user, logout } = useContext(AuthContext);
  const location = useLocation();
  const [userLocation, setUserLocation] = useState<string>("Detecting location...");
  const [isLocating, setIsLocating] = useState<boolean>(true);
  const [showLocationPopup, setShowLocationPopup] = useState<boolean>(false);
  const [locationError, setLocationError] = useState<string>("");

  // Predefined cities for manual selection
  const popularCities = [
    "Delhi, India",
    "Mumbai, India", 
    "Bangalore, India",
    "Hyderabad, India",
    "Chennai, India",
    "Kolkata, India",
    "Pune, India",
    "Ahmedabad, India"
  ];

  // Fetch user location with better error handling and fallbacks
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        setIsLocating(true);
        setLocationError("");
        
        // Check if location is supported
        if (!navigator.geolocation) {
          setUserLocation("Location not supported");
          setIsLocating(false);
          setLocationError("Geolocation is not supported by your browser");
          return;
        }

        // Try to get cached location first
        const cachedLocation = localStorage.getItem('userLocation');
        if (cachedLocation && cachedLocation !== "Location not found") {
          setUserLocation(cachedLocation);
          setIsLocating(false);
        }

        // Get current position with timeout
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: false, // Set to false for faster response
            timeout: 8000, // Reduced timeout
            maximumAge: 300000 // 5 minutes cache
          });
        });

        const { latitude, longitude } = position.coords;
        
        // Use a faster geocoding service with better fallbacks
        try {
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );
          
          if (res.ok) {
            const data = await res.json();
            if (data.city && data.countryName) {
              const locationText = `${data.city}, ${data.countryName}`;
              setUserLocation(locationText);
              localStorage.setItem('userLocation', locationText);
            } else {
              throw new Error("No location data found");
            }
          } else {
            throw new Error("Geocoding API failed");
          }
        } catch (geocodingError) {
          // Fallback to OpenStreetMap if primary service fails
          const fallbackRes = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const fallbackData = await fallbackRes.json();
          
          if (fallbackData?.address) {
            const city = fallbackData.address.city || 
                        fallbackData.address.town || 
                        fallbackData.address.village ||
                        fallbackData.address.suburb ||
                        fallbackData.address.county;
            const state = fallbackData.address.state;
            const country = fallbackData.address.country;
            const locationText = `${city ? city + ", " : ""}${state || country || "Unknown Location"}`;
            setUserLocation(locationText);
            localStorage.setItem('userLocation', locationText);
          } else {
            setUserLocation("Location not found");
            setLocationError("Could not determine your location");
          }
        }
        
        setIsLocating(false);
        
      } catch (error: any) {
        console.error("Location fetch error:", error);
        setIsLocating(false);
        
        // Handle specific error cases
        if (error.code === error.PERMISSION_DENIED) {
          setUserLocation("Location access denied");
          setLocationError("Please allow location access for better experience");
        } else if (error.code === error.TIMEOUT) {
          setUserLocation("Location timeout");
          setLocationError("Location detection took too long");
        } else {
          setUserLocation("Error detecting location");
          setLocationError("Failed to detect your location");
        }
        
        // Set default location if no cached location
        const cachedLocation = localStorage.getItem('userLocation');
        if (!cachedLocation) {
          setUserLocation("Select location manually");
        }
      }
    };

    fetchLocation();
  }, []);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Find Doctors", path: "/search-results" },
    { label: "Find Clinics", path: "/all-clinics" },
    { label: "Lab Tests", path: "/all-lab-test" },
  ];

  const handleLocationClick = () => {
    setShowLocationPopup(true);
  };

  const handleUseCurrentLocation = async () => {
    setShowLocationPopup(false);
    setIsLocating(true);
    setLocationError("");
    
    try {
      if (!navigator.geolocation) {
        setUserLocation("Location not supported");
        setIsLocating(false);
        return;
      }

      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: false,
          timeout: 8000,
          maximumAge: 0 // Force fresh location
        });
      });

      const { latitude, longitude } = position.coords;
      const res = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
      );
      
      if (res.ok) {
        const data = await res.json();
        if (data.city && data.countryName) {
          const locationText = `${data.city}, ${data.countryName}`;
          setUserLocation(locationText);
          localStorage.setItem('userLocation', locationText);
        }
      }
    } catch (error: any) {
      console.error("Location retry error:", error);
      setLocationError("Failed to get current location");
    } finally {
      setIsLocating(false);
    }
  };

  const handleManualLocationSelect = (city: string) => {
    setUserLocation(city);
    localStorage.setItem('userLocation', city);
    setShowLocationPopup(false);
    setLocationError("");
  };

  const handleManualLocation = () => {
    // This will show the city list in the popup
    // The popup already shows manual options, so we don't need additional logic here
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo + Professional Location */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold text-[#28328C] hover:text-[#1f2673] transition-colors"
          >
            <div className="w-8 h-8 bg-[#28328C] rounded-full flex items-center justify-center">
              <Stethoscope className="w-4 h-4 text-white" />
            </div>
            DoctorZ
          </Link>
          
          {/* Professional Location Component */}
          <div className="hidden lg:block">
            <div 
              onClick={handleLocationClick}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 cursor-pointer transition-all duration-200 group min-w-[180px]"
            >
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <div className="relative">
                  {isLocating ? (
                    <Loader2 className="w-4 h-4 text-[#28328C] animate-spin" />
                  ) : (
                    <MapPin size={16} className="text-[#28328C]" />
                  )}
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="text-xs text-gray-500 font-medium">Your Location</span>
                  <span className="text-sm font-semibold text-gray-800 truncate">
                    {isLocating ? "Detecting..." : userLocation}
                  </span>
                </div>
              </div>
              <ChevronDown size={14} className="text-gray-400 group-hover:text-gray-600 transition-colors flex-shrink-0" />
            </div>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`font-medium transition-colors relative py-2 ${
                location.pathname === item.path
                  ? "text-[#28328C] font-semibold"
                  : "text-gray-600 hover:text-[#28328C]"
              }`}
            >
              {item.label}
              {location.pathname === item.path && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#28328C] rounded-full" />
              )}
            </Link>
          ))}

          {/* Registration Dropdown */}
          {!isLoggedIn && (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button className="bg-[#28328C] text-white px-5 py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 hover:bg-[#1f2673]">
                  <UserPlus size={18} />
                  Register
                  <ChevronDown size={16} className="opacity-80" />
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content
                sideOffset={8}
                className="bg-white rounded-xl shadow-2xl border border-gray-100 w-56 overflow-hidden animate-in fade-in-80"
              >
                {[
                  {
                    label: "Patient",
                    icon: <UserPlus size={18} className="text-indigo-600" />,
                    path: "/patient-register",
                  },
                  {
                    label: "Doctor",
                    icon: <Stethoscope size={18} className="text-blue-600" />,
                    path: "/doctor-register",
                  },
                  {
                    label: "Clinic",
                    icon: <Hospital size={18} className="text-green-600" />,
                    path: "/clinic-register",
                  },
                  {
                    label: "Lab",
                    icon: <Hospital size={18} className="text-purple-600" />,
                    path: "/lab-register",
                  },
                ].map((item) => (
                  <DropdownMenu.Item asChild key={item.path}>
                    <Link
                      to={item.path}
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 transition-colors border-b border-gray-50 last:border-b-0"
                    >
                      {item.icon} 
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          )}

          {/* Login / Logout */}
          <div>
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full text-[#28328C] border border-blue-100">
                  <User size={18} /> 
                  <span className="font-medium">{user?.email?.split('@')[0] || "Profile"}</span>
                </div>
                <button
                  onClick={() => {
                    logout();
                    alert("You have been logged out.");
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-red-600 bg-red-50 hover:bg-red-100 transition-colors border border-red-100"
                >
                  <LogOut size={18} /> 
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            ) : (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <button className="bg-green-600 text-white px-5 py-2.5 rounded-lg shadow-lg hover:bg-green-700 transition-all duration-200 flex items-center gap-2">
                    <LogIn size={18} />
                    Login
                    <ChevronDown size={16} className="opacity-80" />
                  </button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content
                  sideOffset={8}
                  className="bg-white rounded-xl shadow-2xl border border-gray-100 w-56 overflow-hidden animate-in fade-in-80"
                >
                  {[
                    {
                      label: "Patient Login",
                      icon: <User size={18} className="text-indigo-600" />,
                      path: "/patient-login",
                    },
                    {
                      label: "Doctor Login",
                      icon: <Stethoscope size={18} className="text-blue-600" />,
                      path: "/doctor/login",
                    },
                    {
                      label: "Clinic Login",
                      icon: <Hospital size={18} className="text-green-600" />,
                      path: "/clinic-login",
                    },
                    {
                      label: "Lab Login",
                      icon: <Hospital size={18} className="text-purple-600" />,
                      path: "/lab-login",
                    },
                  ].map((item) => (
                    <DropdownMenu.Item asChild key={item.path}>
                      <Link
                        to={item.path}
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-green-50 transition-colors border-b border-gray-50 last:border-b-0"
                      >
                        {item.icon} 
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    </DropdownMenu.Item>
                  ))}
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-600 hover:text-[#28328C] transition p-2 rounded-lg hover:bg-gray-100"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle Menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg animate-in slide-in-from-top">
          <div className="flex flex-col px-6 py-4 space-y-1">
            {/* Mobile Location */}
            <div 
              onClick={handleLocationClick}
              className="flex items-center gap-3 px-3 py-3 rounded-lg bg-gray-50 mb-2"
            >
              {isLocating ? (
                <Loader2 className="w-5 h-5 text-[#28328C] animate-spin" />
              ) : (
                <MapPin size={18} className="text-[#28328C]" />
              )}
              <div className="flex flex-col flex-1">
                <span className="text-xs text-gray-500">Your Location</span>
                <span className="text-sm font-semibold text-gray-800">
                  {isLocating ? "Detecting location..." : userLocation}
                </span>
              </div>
            </div>

            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`px-3 py-3 rounded-lg font-medium transition-colors ${
                  location.pathname === item.path
                    ? "text-[#28328C] bg-blue-50"
                    : "text-gray-600 hover:text-[#28328C] hover:bg-gray-50"
                }`}
              >
                {item.label}
              </Link>
            ))}

            {!isLoggedIn && (
              <>
                <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide mt-2">
                  Registration
                </div>
                {[
                  { label: "Patient", path: "/patient-register" },
                  { label: "Doctor", path: "/doctor-register" },
                  { label: "Clinic", path: "/clinic-register" },
                  { label: "Lab", path: "/lab-register" },
                ].map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className="px-3 py-2.5 text-gray-600 hover:text-[#28328C] hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    {item.label} Registration
                  </Link>
                ))}
              </>
            )}

            {isLoggedIn ? (
              <button
                onClick={() => {
                  logout();
                  setMobileOpen(false);
                }}
                className="px-3 py-3 text-red-600 font-medium hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2 mt-2"
              >
                <LogOut size={18} /> Logout
              </button>
            ) : (
              <Link
                to="/patient-login"
                onClick={() => setMobileOpen(false)}
                className="px-3 py-3 text-green-600 font-medium hover:bg-green-50 rounded-lg transition-colors flex items-center gap-2 mt-2"
              >
                <LogIn size={18} /> Login
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Location Selection Popup */}
      {showLocationPopup && (
        <div className="fixed bottom-[-550px] bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-in fade-in-0">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-in zoom-in-95 max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">Choose Location</h3>
              <p className="text-sm text-gray-600 mt-1">Select your location for better experience</p>
            </div>
            
            <div className="p-6 space-y-4 max-h-[400px] overflow-y-auto">
              {/* Current Location Option */}
              <button
                onClick={handleUseCurrentLocation}
                className="w-full flex items-center gap-3 p-4 rounded-xl border-2 border-blue-200 bg-blue-50 hover:bg-blue-100 transition-colors"
              >
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <Navigation size={20} className="text-white" />
                </div>
                <div className="text-left flex-1">
                  <div className="font-semibold text-gray-900">Use Current Location</div>
                  <div className="text-sm text-gray-600">Automatically detect your location</div>
                </div>
                {isLocating && <Loader2 className="w-4 h-4 animate-spin text-blue-500" />}
              </button>

              {/* Manual Location Options */}
              <div>
                <div className="text-sm font-semibold text-gray-700 mb-3">Popular Cities</div>
                <div className="grid gap-2">
                  {popularCities.map((city) => (
                    <button
                      key={city}
                      onClick={() => handleManualLocationSelect(city)}
                      className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <MapPin size={16} className="text-gray-400" />
                        <span className="font-medium text-gray-800">{city}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Error Message */}
              {locationError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-700">{locationError}</p>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-gray-100 bg-gray-50">
              <button
                onClick={() => setShowLocationPopup(false)}
                className="w-full py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;