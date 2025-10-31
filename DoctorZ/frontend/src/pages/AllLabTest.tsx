
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, type TargetAndTransition } from "framer-motion";
import api from "../Services/mainApi";
import packageIcon from "../assets/package.webp";
import {
  Search as SearchIcon,
  FlaskConical,
  Microscope,
  TestTube2,
  Heart,
  Activity,
  Droplet,
  Baby,
  Pill,
} from "lucide-react";

export default function LabTestsPage() {
  const [tests, setTests] = useState<any[]>([]);
  const [packages, setPackages] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [selectedHealthCheck, setSelectedHealthCheck] = useState<string | null>(null);
  const [showAllTests, setShowAllTests] = useState(false);
  const [showAllPackages, setShowAllPackages] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  interface TestResponse {
    tests: any[];
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // ✅ Fetch all lab tests
        const testRes = await api.get<TestResponse>("/api/lab/alllabtests");
        if (Array.isArray(testRes.data.tests)) {
          setTests(testRes.data.tests);
        } else if (Array.isArray(testRes.data)) {
          // fallback if API directly returns array
          setTests(testRes.data);
        }

        // ✅ Fetch all available packages (from approved labs)
        interface PackageResponse {
          packages: any[];
        }
        const packageRes = await api.get<PackageResponse>("/api/lab/packages");
        if ('packages' in packageRes.data && Array.isArray(packageRes.data.packages)) {
          setPackages(packageRes.data.packages);
        } else if (Array.isArray(packageRes.data)) {
          // fallback if API directly returns array
          setPackages(packageRes.data);
        }
      } catch (err) {
        console.error("Error loading tests or packages:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  //  Filter tests based on search and category
  
  const filteredTests = useMemo(() => {
  const q = query.trim().toLowerCase();
  return tests.filter((t) => {
    const matchesQuery =
      q === "" ||
      t.testName?.toLowerCase().includes(q) ||
      t.shortDescription?.toLowerCase().includes(q);

    const matchesHealth =
      !selectedHealthCheck ||
      t.category?.toLowerCase() === selectedHealthCheck.toLowerCase() ||
      t.customCategory?.toLowerCase() === selectedHealthCheck.toLowerCase();

    return matchesQuery && matchesHealth;
  });
}, [tests, query, selectedHealthCheck]);


  const healthChecks = [
    { key: "Full Body Checkup", icon: <Activity className="text-blue-500" /> },
    { key: "Diabetes", icon: <Heart className="text-pink-500" /> },
    { key: "Women’s Health", icon: <Droplet className="text-purple-500" /> },
    { key: "Thyroid", icon: <Activity className="text-orange-500" /> },
    { key: "Vitamin", icon: <TestTube2 className="text-green-500" /> },
    { key: "Blood Studies", icon: <FlaskConical className="text-amber-500" /> },
    { key: "Heart", icon: <Heart className="text-red-500" /> },
    { key: "Kidney", icon: <Droplet className="text-blue-400" /> },
    { key: "Liver", icon: <Activity className="text-yellow-500" /> },
    { key: "Hairfall", icon: <Microscope className="text-teal-500" /> },
    { key: "Fever", icon: <TestTube2 className="text-pink-600" /> },
    { key: "Senior Citizen", icon: <Heart className="text-gray-500" /> },
  ];

  const womenCare = [
    { key: "PCOD Screening", icon: <Activity className="text-pink-500" /> },
    { key: "Blood Studies", icon: <FlaskConical className="text-amber-500" /> },
    { key: "Pregnancy", icon: <Baby className="text-purple-500" /> },
    { key: "Iron Studies", icon: <Microscope className="text-orange-500" /> },
    { key: "Vitamin", icon: <Pill className="text-green-500" /> },
  ];

  const floatAnim: TargetAndTransition = {
    x: [0, 10, 0, -10, 0],
    y: [0, -15, 0, 10, 0],
    opacity: [0.6, 1, 0.6],
    transition: { duration: 10, repeat: Infinity, ease: "easeInOut" },
  };

  return (
    <div className="relative min-h-screen bg-white font-[Inter,sans-serif] overflow-hidden">
      {/* Floating Icons */}
      <motion.div className="absolute top-20 left-10 opacity-10" animate={floatAnim}>
        <FlaskConical className="w-24 h-24 text-blue-300" />
      </motion.div>
      <motion.div className="absolute bottom-20 right-10 opacity-10" animate={floatAnim}>
        <Microscope className="w-28 h-28 text-pink-300" />
      </motion.div>
      <motion.div className="absolute bottom-40 left-1/2 opacity-10" animate={floatAnim}>
        <TestTube2 className="w-20 h-20 text-green-300" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 py-10 relative z-10">
        {/* 🔍 Search Bar */}
        <div className="max-w-xl mx-auto relative mb-10">
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <SearchIcon className="text-gray-400 w-5 h-5" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder=" Search for lab tests or health packages..."
            className="w-full py-4 pl-12 pr-5 rounded-full shadow-md border border-gray-200 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-[#106C89] focus:outline-none text-md bg-gradient-to-r from-white to-blue-50"
          />
        </div>

        {/* 🧬 Health Checks */}
        <section>
          <h2 className="text-xl font-semibold mb-5 text-[#121414] border-l-4 border-[#106C89] pl-3">
            Doctor-Created Health Checks
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {healthChecks.map((hc) => {
              const active = selectedHealthCheck === hc.key;
              return (
                <button
                  key={hc.key}
                  onClick={() => setSelectedHealthCheck(active ? null : hc.key)}
                  className={`flex items-center justify-start border border-gray-200 rounded-md bg-white hover:shadow-sm transition-all duration-200 ${
                    active ? "ring-1 ring-[#106C89]" : ""
                  }`}
                  style={{ height: "64px", padding: "6px 8px", gap: "8px" }}
                >
                  <div className="p-2 border border-gray-200 rounded-md bg-gray-50">{hc.icon}</div>
                  <span className="text-[15px] text-gray-800 font-medium text-left">{hc.key}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* 🧪 Available Tests */}
        <section className="mt-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-[#121414] border-l-4 border-[#106C89] pl-3">
              Available Tests
            </h2>
            <button
              onClick={() => setShowAllTests(!showAllTests)}
              className="text-[#106C89] text-sm font-medium hover:underline"
            >
              {showAllTests ? "Show Less" : "View All"}
            </button>
          </div>

          {loading ? (
            <div className="text-center text-gray-500 text-sm py-10">Loading tests...</div>
          ) : filteredTests.length === 0 ? (
            <div className="text-center text-gray-500 text-sm py-10">No tests found.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {filteredTests
                .slice(0, showAllTests ? filteredTests.length : 8)
                .map((t) => (
                  <motion.div
                    key={t._id}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    className="border border-gray-200 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-4 flex flex-col justify-between"
                    style={{ height: "160px" }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 border border-gray-200 rounded-md bg-gray-50">
                        <TestTube2 className="text-[#106C89]" />
                      </div>
                      <div>
                        <h3 className="text-[16px] font-semibold text-[#121414]">{t.testName}</h3>
                        <p className="text-[13px] text-gray-500 mt-1 line-clamp-2">
                          {t.shortDescription || "Detailed diagnostic test."}
                        </p>
                        <p className="text-sm font-semibold text-gray-800 mt-1">
                          ₹{t.price ?? "N/A"}
                        </p>
                        
                      </div>
                    </div>
                    <div className="flex justify-end mt-2">
                      <button
                        onClick={() =>
                          navigate(`/lab-test-details/${t._id}`, { state: { test: t } })
                        }
                        className="px-3 py-1 text-[12px] text-white bg-[#106C89] rounded-sm hover:bg-[#0E5A72] transition"
                      >
                        View Details
                      </button>
                    </div>
                  </motion.div>
                ))}
            </div>
          )}
        </section>

        {/* 📦 Available Packages */}
        <section className="mt-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-[#121414] border-l-4 border-[#106C89] pl-3">
              Available Packages
            </h2>
            <button
              onClick={() => setShowAllPackages(!showAllPackages)}
              className="text-[#106C89] text-sm font-medium hover:underline"
            >
              {showAllPackages ? "Show Less" : "View All"}
            </button>
          </div>

          {loading ? (
            <div className="text-center text-gray-500 text-sm py-10">Loading packages...</div>
          ) : packages.length === 0 ? (
            <div className="text-center text-gray-500 text-sm py-10">No packages available.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {packages
                .slice(0, showAllPackages ? packages.length : 8)
                .map((p) => {
                  const packageName =
                    p.packageName || p.name || p.title || "Unnamed Package";
                  const description =
                    p.description || p.shortDescription || "Comprehensive health package.";
                  const price = p.totalPrice || p.price || "N/A";
                  const included = p.tests || [];

                  return (
                    <motion.div
                      key={p._id || packageName}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                      className="border border-gray-200 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-4 flex flex-col justify-between"
                      style={{ minHeight: "180px" }}
                    >
                      <div className="flex items-start gap-3">
                     
                    
                          <img src={packageIcon} alt="Package" className="w-15 h-15" />
                       
                        <div>
                          <h3 className="text-[16px] font-semibold text-[#121414] line-clamp-1">
                            {packageName}
                          </h3>
                          <p className="text-[13px] text-gray-500 mt-1 line-clamp-2">
                            {description}
                          </p>
                          <p className="text-sm font-semibold text-gray-800 mt-1">₹{price}</p>
                          {p.lab && p.lab.name && (
                          <p className="text-[12px] text-[#106C89] font-medium mt-1">
                            {p.lab.name}
                          </p>
                        )}
                        </div>
                      </div>

                      {Array.isArray(included) && included.length > 0 && (
                        <div className="mt-2 text-[12px] text-gray-600 line-clamp-1">
                          Includes:{" "}
                          {included
                            .slice(0, 2)
                            .map((t: any) => t.testName || t.name)
                            .join(", ")}
                          {included.length > 2 && " + more"}
                        </div>
                      )}

                      <div className="flex justify-end mt-2">
                        <button
                          onClick={() =>
                            navigate(`/lab-package-details/${p._id}`, { state: { pkg: p } })
                          }
                          className="px-3 py-1 text-[12px] text-white bg-[#106C89] rounded-sm hover:bg-[#0E5A72] transition"
                        >
                          View Details
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
            </div>
          )}
        </section>

        {/* 👩‍⚕️ Women Care Section */}
        <section className="mt-10 mb-16">
          <h2 className="text-xl font-semibold mb-5 text-[#121414] border-l-4 border-[#106C89] pl-3">
            Women Care
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {womenCare.map((w) => (
              <div
                key={w.key}
                className="flex items-center justify-start border border-gray-200 rounded-md bg-white hover:shadow-sm transition-all duration-200"
                style={{ height: "64px", padding: "6px 8px", gap: "8px" }}
              >
                <div className="p-2 border border-gray-200 rounded-md bg-gray-50">{w.icon}</div>
                <span className="text-[15px] text-gray-800 font-medium text-left">{w.key}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
