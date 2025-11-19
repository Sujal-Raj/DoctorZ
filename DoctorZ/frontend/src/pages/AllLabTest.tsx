import { useNavigate } from "react-router-dom";
import { motion, type TargetAndTransition } from "framer-motion";
import api from "../Services/mainApi";
import {
  Search as SearchIcon,
  Sparkles,
  Shield,
  Heart,
  Star,
} from "lucide-react";

// 🧩 PNG icons
import fullbody from "../assets/icons/fullbody.png";
import diabetes from "../assets/icons/diabetes.png";
import womens from "../assets/icons/womens.png";
import thyroid from "../assets/icons/thyroid.png";
import vitamin from "../assets/icons/vitamin.png";
import blood from "../assets/icons/blood.png";
import heart from "../assets/icons/heart.png";
import kidney from "../assets/icons/kidney.png";
import liver from "../assets/icons/liver.png";
import hairfall from "../assets/icons/hairfall.png";
import fever from "../assets/icons/fever.png";
import senior from "../assets/icons/senior.png";
import testIcon from "../assets/icons/test.png";
import packageIcon from "../assets/icons/package.png";
import pcod from "../assets/icons/pcod.png";
import pregnancy from "../assets/icons/pregnancy.png";
import iron from "../assets/icons/iron.png";
import pill from "../assets/icons/pill.png";
import { useState, useEffect, useMemo } from "react";

// 🧠 Interfaces
interface Lab {
  name?: string;
}

interface LabTest {
  name: string;
  _id: string;
  testName: string;
  shortDescription?: string;
  price?: number;
  category?: string;
  customCategory?: string;
  lab?: Lab;
  labName?: string;
}

interface LabPackage {
  _id: string;
  packageName?: string;
  name?: string;
  title?: string;
  description?: string;
  shortDescription?: string;
  totalPrice?: number;
  price?: number;
  lab?: Lab;
  labName?: string;
  tests?: LabTest[];
}

export default function LabTestsPage() {
  const [tests, setTests] = useState<LabTest[]>([]);
  const [packages, setPackages] = useState<LabPackage[]>([]);
  const [query, setQuery] = useState("");
  const [selectedHealthCheck, setSelectedHealthCheck] = useState<string | null>(
    null
  );
  const [showAllTests, setShowAllTests] = useState(false);
  const [showAllPackages, setShowAllPackages] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const THEME_COLOR = "#28328C";
  const ACCENT_COLOR = "#4F46E5";
  const GRADIENT = "linear-gradient(135deg, #28328C 0%, #4F46E5 100%)";

  const iconMap: Record<string, string> = {
    heart,
    liver,
    kidney,
    thyroid,
    vitamin,
    blood,
    diabetes,
    fever,
    hair: hairfall,
    women: womens,
    pcod,
    pregnancy,
    iron,
    senior,
    full: fullbody,
  };

  const getIconForTest = (test: LabTest): string => {
    const name = `${test.testName || ""} ${test.category || ""}`.toLowerCase();
    for (const key of Object.keys(iconMap)) {
      if (name.includes(key)) return iconMap[key];
    }
    return testIcon;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        interface TestResponse {
          tests: LabTest[];
        }
        setLoading(true);
        const testRes = await api.get("/api/lab/alllabtests");
        const rawTests = testRes.data as any;
        const testsData: LabTest[] = Array.isArray(rawTests)
          ? rawTests
          : Array.isArray(rawTests?.tests)
          ? rawTests.tests
          : [];

        // ✅ Normalize lab name field
        const normalizedTests: LabTest[] = testsData.map((t: any) => ({
          ...t,
          lab: t.lab || { name: t.labName || "Unknown Lab" },
        }));
        setTests(normalizedTests);

        interface PackageResponse {
          packages?: LabPackage[];
        }

        const packageRes = await api.get<PackageResponse>("/api/lab/packages");
        const packageData = Array.isArray(packageRes.data)
          ? packageRes.data
          : "packages" in packageRes.data &&
            Array.isArray(packageRes.data.packages)
          ? packageRes.data.packages
          : [];

        const normalizedPackages: LabPackage[] = packageData.map((p: any) => ({
          ...p,
          lab: p.lab || { name: p.labName || "Unknown Lab" },
        }));
        setPackages(normalizedPackages);
      } catch (err) {
        console.error("Error loading data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedHealthCheck) {
      window.scrollTo({
        top: 600, // adjust this number if needed scroll effect hai
        behavior: "smooth",
      });
    }
  }, [selectedHealthCheck]);

  const filteredTests = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tests.filter((t) => {
      const matchesQuery =
        q === "" ||
        t.testName?.toLowerCase().includes(q) ||
        t.shortDescription?.toLowerCase().includes(q);
      const matchesHealth =
        !selectedHealthCheck ||
        t.category?.toLowerCase().includes(selectedHealthCheck.toLowerCase()) ||
        t.customCategory
          ?.toLowerCase()
          .includes(selectedHealthCheck.toLowerCase()) ||
        t.testName?.toLowerCase().includes(selectedHealthCheck.toLowerCase());
      return matchesQuery && matchesHealth;
    });
  }, [tests, query, selectedHealthCheck]);

  const filteredPackages = useMemo(() => {
    const q = query.trim().toLowerCase();
    return packages.filter((p) => {
      const name = p.packageName || p.name || p.title || "";
      const desc = p.description || p.shortDescription || "";
      const matchesQuery =
        q === "" ||
        name.toLowerCase().includes(q) ||
        desc.toLowerCase().includes(q);
      const matchesHealth =
        !selectedHealthCheck ||
        name.toLowerCase().includes(selectedHealthCheck.toLowerCase()) ||
        desc.toLowerCase().includes(selectedHealthCheck.toLowerCase());
      return matchesQuery && matchesHealth;
    });
  }, [packages, query, selectedHealthCheck]);

  const healthChecks = [
    {
      key: "Full Body Checkup",
      icon: fullbody,
      color: "from-blue-500 to-cyan-500",
    },
    { key: "Diabetes", icon: diabetes, color: "from-green-500 to-emerald-500" },
    { key: "Women's Health", icon: womens, color: "from-pink-500 to-rose-500" },
    { key: "Thyroid", icon: thyroid, color: "from-purple-500 to-violet-500" },
    { key: "Vitamin", icon: vitamin, color: "from-amber-500 to-orange-500" },
    { key: "Blood Studies", icon: blood, color: "from-red-500 to-rose-600" },
    { key: "Heart", icon: heart, color: "from-rose-500 to-red-500" },
    { key: "Kidney", icon: kidney, color: "from-indigo-500 to-blue-500" },
    { key: "Liver", icon: liver, color: "from-teal-500 to-cyan-500" },
    { key: "Hairfall", icon: hairfall, color: "from-gray-600 to-gray-700" },
    { key: "Fever", icon: fever, color: "from-orange-500 to-amber-500" },
    {
      key: "Senior Citizen",
      icon: senior,
      color: "from-slate-600 to-gray-700",
    },
  ];

  const womenCare = [
    { key: "PCOD Screening", icon: pcod, color: "from-pink-500 to-purple-500" },
    { key: "Blood Studies", icon: blood, color: "from-red-500 to-rose-600" },
    { key: "Pregnancy", icon: pregnancy, color: "from-rose-400 to-pink-500" },
    { key: "Iron Studies", icon: iron, color: "from-amber-600 to-orange-500" },
    { key: "Vitamin", icon: pill, color: "from-cyan-500 to-blue-500" },
  ];

  const floatAnim: TargetAndTransition = {
    x: [0, 10, 0, -10, 0],
    y: [0, -15, 0, 10, 0],
    opacity: [0.6, 1, 0.6],
    transition: { duration: 10, repeat: Infinity, ease: "easeInOut" },
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 font-[Inter,sans-serif] overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl"></div>

      {/* Floating icons */}
      <motion.div
        className="absolute top-20 left-10 opacity-15"
        animate={floatAnim}
      >
        <img
          src={testIcon}
          alt="Floating test"
          className="w-20 h-20 object-contain"
        />
      </motion.div>
      <motion.div
        className="absolute bottom-20 right-10 opacity-15"
        animate={floatAnim}
      >
        <img
          src={packageIcon}
          alt="Floating package"
          className="w-24 h-24 object-contain"
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 py-10 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-blue-100 text-[#28328C] px-4 py-2 rounded-full text-sm font-medium mb-4"
          >
            <Sparkles className="w-4 h-4" />
            Trusted by 50,000+ Patients
          </motion.div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-[#28328C] to-[#4F46E5] bg-clip-text text-transparent">
            Comprehensive Health Tests
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our curated collection of diagnostic tests and health
            packages designed for your well-being
          </p>
        </div>

        {/* 🔍 Premium Search Bar */}
        <div className="max-w-3xl mx-auto mb-16 px-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative flex items-center bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-500"
          >
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#28328C]">
              <SearchIcon className="w-5 h-5" />
            </div>

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tests, packages, or health conditions..."
              className="w-full pl-14 pr-32 py-5 text-gray-800 placeholder-gray-500 bg-transparent focus:outline-none text-[16px] font-medium"
            />

            <button
              onClick={() => window.scrollTo({ top: 600, behavior: "smooth" })}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[#28328C] to-[#4F46E5] text-white font-semibold px-7 py-3 rounded-xl hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg shadow-blue-500/30"
            >
              Search
            </button>
          </motion.div>

          <p className="text-center text-gray-500 mt-4 text-sm flex items-center justify-center gap-2">
            <Shield className="w-4 h-4 text-green-500" />
            Certified labs • Accurate results • Doctor consultations
          </p>
        </div>

        {/* 🩺 Doctor-Created Health Checks */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Heart className="w-5 h-5 text-[#28328C]" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Doctor-Created Health Checks
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {healthChecks.map((hc) => {
              const active = selectedHealthCheck === hc.key;
              return (
                <motion.button
                  key={hc.key}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedHealthCheck(active ? null : hc.key)}
                  className={`relative flex items-center justify-start border border-gray-200/50 rounded-2xl bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 ${
                    active
                      ? "ring-2 ring-[#28328C] shadow-lg"
                      : "shadow-md hover:border-gray-300"
                  }`}
                  style={{ height: "80px", padding: "12px", gap: "12px" }}
                >
                  {active && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#28328C] rounded-full"></div>
                  )}
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${hc.color} shadow-md`}
                  >
                    <img
                      src={hc.icon}
                      alt={hc.key}
                      className="w-6 h-6 object-contain filter brightness-0 invert"
                    />
                  </div>
                  <span className="text-[14px] font-semibold text-gray-800 text-left leading-tight">
                    {hc.key}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </section>

        {/* 🧪 Available Tests */}
        <section className="mt-16">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Star className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Available Tests
              </h2>
            </div>
            <button
              onClick={() => setShowAllTests(!showAllTests)}
              className="group flex items-center gap-2 text-[#28328C] text-sm font-semibold hover:underline transition-all"
            >
              {showAllTests ? "Show Less" : "View All"}
              <motion.div
                animate={{ x: showAllTests ? -2 : 2 }}
                transition={{ duration: 0.2 }}
              >
                →
              </motion.div>
            </button>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="border border-gray-200 bg-white rounded-2xl shadow-sm p-6 h-48 animate-pulse"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-full"></div>
                      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredTests.length === 0 ? (
            <div className="text-center py-16 bg-white/50 rounded-3xl border border-gray-200/50">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <SearchIcon className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No tests found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredTests
                .slice(0, showAllTests ? filteredTests.length : 8)
                .map((t) => (
                  <motion.div
                    key={t._id}
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="group border border-gray-200/50 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 flex flex-col justify-between"
                    style={{ minHeight: "200px" }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 border border-gray-200/50 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 group-hover:from-blue-100 group-hover:to-indigo-100 transition-all duration-300">
                        <img
                          src={getIconForTest(t)}
                          alt={t.testName}
                          className="w-8 h-8 object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-[17px] font-bold text-gray-900 line-clamp-2 leading-tight">
                          {t.testName}
                        </h3>
                        <p className="text-[14px] text-gray-600 mt-2 line-clamp-2 leading-relaxed">
                          {t.shortDescription ||
                            "Comprehensive diagnostic test for accurate health assessment"}
                        </p>
                        <div className="flex items-center justify-between mt-3">
                          <p className="text-lg font-bold text-gray-900">
                            ₹{t.price ?? "N/A"}
                          </p>
                          {(t.lab?.name || t.labName) && (
                            <p className="text-[12px] text-[#28328C] font-semibold bg-blue-50 px-2 py-1 rounded-full">
                              {t.lab?.name || t.labName}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end mt-4">
                      <button
                        onClick={() =>
                          navigate(`/lab-test-details/${t._id}`, {
                            state: { test: t },
                          })
                        }
                        className="px-4 py-2 text-[13px] font-semibold text-white bg-gradient-to-r from-[#28328C] to-[#4F46E5] rounded-xl hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 shadow-md shadow-blue-500/30"
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
        <section className="mt-16">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Star className="w-5 h-5 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Health Packages
              </h2>
            </div>
            <button
              onClick={() => setShowAllPackages(!showAllPackages)}
              className="group flex items-center gap-2 text-[#28328C] text-sm font-semibold hover:underline transition-all"
            >
              {showAllPackages ? "Show Less" : "View All"}
              <motion.div
                animate={{ x: showAllPackages ? -2 : 2 }}
                transition={{ duration: 0.2 }}
              >
                →
              </motion.div>
            </button>
          </div>

          {loading ? (
            <div className="text-center text-gray-500 text-sm py-10">
              Loading packages...
            </div>
          ) : filteredPackages.length === 0 ? (
            <div className="text-center py-16 bg-white/50 rounded-3xl border border-gray-200/50">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <SearchIcon className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No packages found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredPackages
                .slice(0, showAllPackages ? filteredPackages.length : 8)
                .map((p) => {
                  const packageName =
                    p.packageName || p.name || p.title || "Unnamed Package";
                  const description =
                    p.description ||
                    p.shortDescription ||
                    "Comprehensive health package.";
                  const price = p.totalPrice || p.price || "N/A";
                  const included = p.tests || [];

                  return (
                    <motion.div
                      key={p._id || packageName}
                      whileHover={{ scale: 1.02, y: -5 }}
                      transition={{ duration: 0.2 }}
                      className="group border border-gray-200/50 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 flex flex-col justify-between"
                      style={{ minHeight: "220px" }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-3 border border-gray-200/50 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 group-hover:from-purple-100 group-hover:to-pink-100 transition-all duration-300">
                          <img
                            src={packageIcon}
                            alt="Package"
                            className="w-8 h-8 object-contain"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-[17px] font-bold text-gray-900 line-clamp-2 leading-tight">
                            {packageName}
                          </h3>
                          <p className="text-[14px] text-gray-600 mt-2 line-clamp-2 leading-relaxed">
                            {description}
                          </p>
                          <div className="flex items-center justify-between mt-3">
                            <p className="text-lg font-bold text-gray-900">
                              ₹{price}
                            </p>
                            {(p.lab?.name || p.labName) && (
                              <p className="text-[12px] text-[#28328C] font-semibold bg-blue-50 px-2 py-1 rounded-full">
                                {p.lab?.name || p.labName}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {Array.isArray(included) && included.length > 0 && (
                        <div className="mt-3 text-[13px] text-gray-600 line-clamp-1 bg-gray-50/50 px-3 py-2 rounded-lg">
                          <span className="font-semibold text-gray-700">
                            Includes:
                          </span>{" "}
                          {included
                            .slice(0, 2)
                            .map((t: LabTest) => t.testName || t.name)
                            .join(", ")}
                          {included.length > 2 &&
                            ` +${included.length - 2} more`}
                        </div>
                      )}

                      <div className="flex justify-end mt-4">
                        <button
                          onClick={() =>
                            navigate(`/lab-package-details/${p._id}`, {
                              state: { pkg: p },
                            })
                          }
                          className="px-4 py-2 text-[13px] font-semibold text-white bg-gradient-to-r from-[#28328C] to-[#4F46E5] rounded-xl hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 shadow-md shadow-blue-500/30"
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

        {/* 👩 Women Care */}
        <section className="mt-16 mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-pink-100 rounded-lg">
              <Heart className="w-5 h-5 text-pink-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Women Care</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {womenCare.map((w) => {
              const active = selectedHealthCheck === w.key;
              return (
                <motion.button
                  key={w.key}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedHealthCheck(active ? null : w.key)}
                  className={`relative flex items-center justify-start border border-gray-200/50 rounded-2xl bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 ${
                    active
                      ? "ring-2 ring-pink-500 shadow-lg"
                      : "shadow-md hover:border-gray-300"
                  }`}
                  style={{ height: "80px", padding: "12px", gap: "12px" }}
                >
                  {active && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-pink-500 rounded-full"></div>
                  )}
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${w.color} shadow-md`}
                  >
                    <img
                      src={w.icon}
                      alt={w.key}
                      className="w-6 h-6 object-contain filter brightness-0 invert"
                    />
                  </div>
                  <span className="text-[14px] font-semibold text-gray-800 text-left leading-tight">
                    {w.key}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
