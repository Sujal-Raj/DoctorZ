import { useState, useContext, useEffect, type JSX } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  Menu,
  X,
  User,
  LogOut,
  LogIn,
  ChevronDown,
  MapPin,
  Navigation,
  Loader2,
  Stethoscope,
  UserPlus,
  UserCircle2,
  Hospital,
  FlaskConical,
  LocateFixed,
} from "lucide-react";
import Cookies from "js-cookie";
import { jwtDecode, type JwtPayload } from "jwt-decode";
import { AuthContext } from "../Context/AuthContext";
import RightSidebar from "./RightSidebar";

// Interface definitions
interface MyTokenPayload extends JwtPayload {
  id: string;
}

interface NavItem {
  label: string;
  path: string;
}

interface AuthOption {
  label: string;
  path: string;
  icon: JSX.Element;
}

interface ReverseGeocodeData {
  city?: string;
  countryName?: string;
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const { isLoggedIn, user, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const token = Cookies.get("patientToken") || "";
  const decoded = token ? jwtDecode<MyTokenPayload>(token) : null;

  // ---------------- LOCATION ----------------
  const [userLocation, setUserLocation] = useState<string>("Detecting location...");
  const [isLocating, setIsLocating] = useState<boolean>(true);
  const [locationError, setLocationError] = useState<string>("");
  const [locationDropdownOpen, setLocationDropdownOpen] = useState<boolean>(false);

  const popularCities: string[] = [
    "Delhi, India",
    "Mumbai, India",
    "Bangalore, India",
    "Hyderabad, India",
    "Chennai, India",
    "Kolkata, India",
    "Pune, India",
    "Ahmedabad, India",
  ];

  useEffect(() => {
    const fetchLocation = async (): Promise<void> => {
      try {
        setIsLocating(true);
        if (!navigator.geolocation) {
          setUserLocation("Location not supported");
          setIsLocating(false);
          return;
        }

        const cached = localStorage.getItem("userLocation");
        if (cached) {
          setUserLocation(cached);
          setIsLocating(false);
        }

        const pos = await new Promise<GeolocationPosition>((resolve, reject) =>
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            timeout: 8000,
            maximumAge: 300000,
          })
        );

        const { latitude, longitude } = pos.coords;
        const res = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
        );
        const data: ReverseGeocodeData = await res.json();
        const locationText = `${data.city || "Unknown"}, ${data.countryName || ""}`;
        setUserLocation(locationText);
        localStorage.setItem("userLocation", locationText);
      } catch (error) {
        console.error("Error fetching location:", error);
        setUserLocation("Location not found");
      } finally {
        setIsLocating(false);
      }
    };

    fetchLocation();
  }, []);

  const handleUseCurrentLocation = async (): Promise<void> => {
    setIsLocating(true);
    setLocationError("");
    try {
      const pos = await new Promise<GeolocationPosition>((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject)
      );
      const { latitude, longitude } = pos.coords;
      const res = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
      );
      const data: ReverseGeocodeData = await res.json();
      const locationText = `${data.city || "Unknown"}, ${data.countryName || ""}`;
      setUserLocation(locationText);
      localStorage.setItem("userLocation", locationText);
      setLocationDropdownOpen(false);
    } catch (error) {
      console.error("Error getting current location:", error);
      setLocationError("Failed to fetch location");
    } finally {
      setIsLocating(false);
    }
  };

  const handleManualLocationSelect = (city: string): void => {
    setUserLocation(city);
    localStorage.setItem("userLocation", city);
    setLocationDropdownOpen(false);
  };

  // ---------------- NAV ITEMS ----------------
  const navItems: NavItem[] = [
    { label: "Home", path: "/" },
    { label: "Find Doctors", path: "/search-results" },
    { label: "Find Clinics", path: "/all-clinics" },
    { label: "Lab Tests", path: "/all-lab-test" },
  ];

  // ---------------- DROPDOWN OPTIONS ----------------
  const registerOptions: AuthOption[] = [
    { label: "Patient", path: "/patient-register", icon: <UserCircle2 size={18} /> },
    { label: "Doctor", path: "/doctor-register", icon: <Stethoscope size={18} /> },
    { label: "Clinic", path: "/clinic-register", icon: <Hospital size={18} /> },
    { label: "Lab", path: "/lab-register", icon: <FlaskConical size={18} /> },
  ];

  const loginOptions: AuthOption[] = [
    { label: "Patient", path: "/patient-login", icon: <UserCircle2 size={18} /> },
    { label: "Doctor", path: "/doctor-login", icon: <Stethoscope size={18} /> },
    { label: "Clinic", path: "/clinic-login", icon: <Hospital size={18} /> },
    { label: "Lab", path: "/lab-login", icon: <FlaskConical size={18} /> },
  ];

  // ---------------- RENDER ----------------
  return (
    <>
      <nav className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          {/* LOGO + LOCATION */}
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="flex items-center gap-2 text-2xl font-bold text-[#28328C] hover:text-[#1f2673]"
            >
              <div className="w-8 h-8 bg-[#28328C] rounded-full flex items-center justify-center">
                <Stethoscope className="w-4 h-4 text-white" />
              </div>
              DoctorZ
            </Link>

            {/* Location Dropdown */}
        <DropdownMenu.Root open={locationDropdownOpen} onOpenChange={setLocationDropdownOpen}>
  <DropdownMenu.Trigger asChild>
    <div className="hidden lg:flex items-center gap-2 px-3 py-2 bg-white hover:bg-gray-50 cursor-pointer">
      {isLocating ? (
        <Loader2 className="w-4 h-4 text-[#28328C] animate-spin" />
      ) : (
        <MapPin size={16} className="text-[#28328C]" />
      )}
      <span className="text-sm font-semibold text-gray-800">
        {isLocating ? "Detecting..." : userLocation}
      </span>
      <ChevronDown size={14} className="text-gray-400" />
    </div>
  </DropdownMenu.Trigger>

 <DropdownMenu.Content 
  className="bg-white rounded-xl shadow-2xl border border-gray-100 w-80 z-[60]"
  align="start"
  sideOffset={5}
>
  <div className="p-4 space-y-4 max-h-[300px] overflow-y-auto">
    {/* Current Location Button */}
    <DropdownMenu.Item asChild>
      <button
        onClick={handleUseCurrentLocation}
        className="w-full flex items-center gap-3 p-3 rounded-xl border-2 border-blue-200 bg-blue-50 hover:bg-blue-100 text-left transition-colors"
      >
        <LocateFixed size={20} className="text-[#28328C]" />
        <span className="flex-1 font-medium">Current Location</span>
        {isLocating && <Loader2 className="w-4 h-4 animate-spin text-blue-500" />}
      </button>
    </DropdownMenu.Item>

    {/* OR with horizontal lines */}
    <div className="flex items-center justify-center gap-3">
      <div className="flex-1 h-px bg-gray-200"></div>
      <span className="text-xs font-medium text-gray-500 px-2">OR</span>
      <div className="flex-1 h-px bg-gray-200"></div>
    </div>

    <div>
      <DropdownMenu.Item asChild>
        <button
          onClick={() => {
            // Yaha pe manually location input karne ka logic aayega
            const userInput = prompt("Enter your location:");
            if (userInput && userInput.trim()) {
              handleManualLocationSelect(userInput.trim());
            }
          }}
          className="w-full flex items-center gap-3 p-3 rounded-lg border-2 border-green-200 bg-green-50 hover:bg-green-100 text-left transition-colors mb-3"
        >
          <MapPin size={20} className="text-green-600" />
          <span className="flex-1 font-medium">Choose a different location</span>
        </button>
      </DropdownMenu.Item>
    </div>

    {/* Location Error */}
    {locationError && (
      <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-center gap-2">
        <MapPin size={16} />
        {locationError}
      </div>
    )}
  </div>
</DropdownMenu.Content>



</DropdownMenu.Root>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item: NavItem) => (
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
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#28328C]" />
                )}
              </Link>
            ))}

            {/* Register Dropdown */}
            {!isLoggedIn && (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <button className="bg-[#28328C] text-white px-5 py-2.5 rounded-lg shadow-lg flex items-center gap-2 hover:bg-[#1f2673] transition-colors">
                    <UserPlus size={18} />
                    Register
                    <ChevronDown size={16} />
                  </button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content className="bg-white rounded-xl shadow-2xl border border-gray-100 w-56 z-[60]">
                  {registerOptions.map((opt: AuthOption) => (
                    <DropdownMenu.Item asChild key={opt.path}>
                      <Link
                        to={opt.path}
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 border-b last:border-0 transition-colors"
                      >
                        {opt.icon}
                        {opt.label}
                      </Link>
                    </DropdownMenu.Item>
                  ))}
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}

            {/* Login Dropdown */}
            {!isLoggedIn ? (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <button className="bg-green-600 text-white px-5 py-2.5 rounded-lg shadow-lg flex items-center gap-2 hover:bg-green-700 transition-colors">
                    <LogIn size={18} />
                    Login
                    <ChevronDown size={16} />
                  </button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content className="bg-white rounded-xl shadow-2xl border border-gray-100 w-56 z-[60]">
                  {loginOptions.map((opt: AuthOption) => (
                    <DropdownMenu.Item asChild key={opt.path}>
                      <Link
                        to={opt.path}
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-green-50 border-b last:border-0 transition-colors"
                      >
                        {opt.icon}
                        {opt.label}
                      </Link>
                    </DropdownMenu.Item>
                  ))}
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            ) : (
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <User size={18} /> Profile
                </button>
                <button
                  onClick={() => {
                    logout();
                    Cookies.remove("patientToken");
                    navigate("/patient-login");
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-red-600 bg-red-50 hover:bg-red-100 border transition-colors"
                >
                  <LogOut size={18} /> Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Icon */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t shadow-lg">
            <div className="flex flex-col px-6 py-4 space-y-3">
              {/* Mobile Location Section */}
              <div className="py-2 border-b">
                <div className="flex items-center gap-2 text-gray-700 mb-2">
                  <LocateFixed size={16} className="text-[#28328C]" />
                  <span className="font-medium">Location</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <MapPin size={14} className="text-[#28328C]" />
                  <span>{isLocating ? "Detecting location..." : userLocation}</span>
                </div>
                <button
                  onClick={handleUseCurrentLocation}
                  className="w-full flex items-center gap-2 p-2 rounded-lg border border-blue-200 bg-blue-50 text-blue-700 text-sm hover:bg-blue-100 transition-colors"
                >
                  <Navigation size={16} />
                  Use Current Location
                </button>
                <div className="mt-3">
                  <div className="text-sm font-medium mb-2 flex items-center gap-2">
                    <MapPin size={14} className="text-[#28328C]" />
                    Popular Cities
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {popularCities.map((city) => (
                      <button
                        key={city}
                        onClick={() => {
                          handleManualLocationSelect(city);
                          setMobileOpen(false);
                        }}
                        className="text-left p-2 rounded border text-xs hover:bg-gray-50 transition-colors flex items-center gap-1"
                      >
                        <MapPin size={12} className="text-gray-500 flex-shrink-0" />
                        <span className="truncate">{city}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {navItems.map((item: NavItem) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className="py-2 text-gray-700 hover:text-[#28328C] transition-colors"
                >
                  {item.label}
                </Link>
              ))}

              {/* Register & Login dropdowns in mobile */}
              <div>
                <div className="text-gray-600 font-semibold mt-2 mb-1">Register</div>
                {registerOptions.map((opt: AuthOption) => (
                  <Link
                    key={opt.path}
                    to={opt.path}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 py-2 text-gray-700 hover:text-[#28328C] transition-colors"
                  >
                    {opt.icon}
                    {opt.label}
                  </Link>
                ))}

                <div className="text-gray-600 font-semibold mt-4 mb-1">Login</div>
                {loginOptions.map((opt: AuthOption) => (
                  <Link
                    key={opt.path}
                    to={opt.path}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 py-2 text-gray-700 hover:text-green-600 transition-colors"
                  >
                    {opt.icon}
                    {opt.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Right Sidebar */}
      <RightSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
}