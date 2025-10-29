
// import { useLocation, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import api from  "../Services/mainApi";
// import { Heart, Thermometer, Baby, Activity, Pill, Droplet } from "lucide-react";

// interface Test {
//   _id: string;
//   testName: string;
//   price: number;
//   labId: string;
//   labName: string;
//   category?: string;
//   description?: string;
//   precautions?: string;
//   includedTests?: string[];
//   reportFile?: string | null;
// }

// export default function LabTestDetails() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const test = location.state?.test as Test | undefined;

//   const [loading, setLoading] = useState(false);
//   const [bookingStatus, setBookingStatus] = useState<string | null>(null);

//   // ✅ Category Icons
//   const categoryIcons: Record<string, React.ReactNode> = {
//     kidney: <Heart size={80} color="#EF4444" />,
//     fever: <Thermometer size={80} color="#F97316" />,
//     infection: <Thermometer size={80} color="#F97316" />,
//     pregnancy: <Baby size={80} color="#EC4899" />,
//     diabetes: <Activity size={80} color="#3B82F6" />,
//     sugar: <Activity size={80} color="#3B82F6" />,
//     vitamin: <Pill size={80} color="#10B981" />,
//     liver: <Droplet size={80} color="#8B5CF6" />,
//   };

//   // 🔹 Get icon based on test name
//   const getCategoryIcon = (testName: string) => {
//     const lower = testName.toLowerCase();
//     const match = Object.entries(categoryIcons).find(([keyword]) => {
//       const words = lower.split(/[\s-]+/);
//       return words.includes(keyword);
//     });
//     return match ? match[1] : <Activity size={80} />; // default icon
//   };

//   useEffect(() => {
//     if (!test) navigate("/all-lab-test");
//   }, [test, navigate]);

//   if (!test) return null;

//   const handleBookTest = async () => {
//     setLoading(true);
//     setBookingStatus(null);

//     try {
//       const token = document.cookie
//         .split("; ")
//         .find((row) => row.startsWith("patientToken="))
//         ?.split("=")[1];

//       if (!token) {
//         alert("Please login to book test");
//         setLoading(false);
//         return;
//       }

//       // Decode token to get patientId
//       let patientId: string | null = null;
//       try {
//         const base64Payload = token.split(".")[1];
//         const payload = JSON.parse(atob(base64Payload));
//         patientId = payload.id;
//       } catch (err) {
//         console.error("Error decoding token:", err);
//         alert("Invalid login token");
//         setLoading(false);
//         return;
//       }

//       if (!patientId) {
//         alert("Patient not found. Please login again.");
//         setLoading(false);
//         return;
//       }

//       const payload = {
//         test: {
//           labId: test.labId,
//           name: test.testName,
//           price: test.price,
//           category: test.category || "General",
//         },
//         patientId,
//       };

//       const res = await api.post("/api/lab/bookTest", payload, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       console.log("✅ Booking response:", res.data);
//       setBookingStatus("Booking successful!");
//     } catch (error: unknown) {
//       console.error("❌ Booking error:", error);
//       setBookingStatus("Booking failed. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//   <div className="min-h-screen bg-indigo-50 px-6 lg:px-16 py-10 flex flex-col lg:flex-row gap-10">
//     {/* Left Card */}
//     <div className="w-full lg:w-1/3 bg-white shadow-xl rounded-2xl p-6 border border-gray-100 flex flex-col items-center transition hover:shadow-2xl">
//       <div className="w-full h-52 flex items-center justify-center mb-6 bg-indigo-100 rounded-xl">
//         {getCategoryIcon(test.testName)}
//       </div>

//       <h2 className="text-2xl font-bold text-gray-800 mb-1 text-center">
//         {test.testName}
//       </h2>
//       <p className="text-gray-600 text-sm mb-6 text-center">
//         Provided by: <span className="font-medium">{test.labName}</span>
//       </p>

//       <div className="space-y-3 mb-6 text-gray-700 text-sm w-full">
//         <p>🧪 Sample collection within <span className="font-semibold">2 hours</span></p>
//         <p>📃 Reports available within <span className="font-semibold">10 hours</span></p>
//         <p>⏰ Fasting required: <span className="font-semibold">10–12 hours</span></p>
//       </div>

//       <div className="border-t border-gray-200 pt-5 w-full">
//         <div className="flex flex-col items-center">
//           <p className="text-gray-400 line-through text-sm">₹{test.price + 200}</p>
//           <p className="text-3xl font-bold text-indigo-700 mb-3">₹{test.price}</p>
//         </div>

//         <button
//           onClick={handleBookTest}
//           disabled={loading}
//           className={`w-full py-3 rounded-lg font-semibold transition duration-300 ${
//             loading
//               ? "bg-gray-400 cursor-not-allowed text-white"
//               : "bg-indigo-500 hover:bg-indigo-600 text-white"
//           }`}
//         >
//           {loading ? "Booking..." : "Book Now"}
//         </button>

//         {bookingStatus && (
//           <p
//             className={`text-sm mt-3 text-center ${
//               bookingStatus.includes("successful") ? "text-green-600" : "text-red-600"
//             }`}
//           >
//             {bookingStatus}
//           </p>
//         )}

//         {test.reportFile && (
//           <a
//             href={test.reportFile}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="block mt-3 text-indigo-700 hover:underline text-sm text-center"
//           >
//             📄 Download Report
//           </a>
//         )}
//       </div>
//     </div>

//     {/* Right Details */}
//     <div className="w-full lg:w-2/3 bg-white shadow-md rounded-2xl p-10 border border-gray-100">
//       <div className="flex justify-between items-center mb-4">
//         <h3 className="text-3xl font-bold text-gray-800">
//           {test.testName} Details
//         </h3>
//         <span className="bg-indigo-100 text-indigo-700 text-sm font-semibold px-3 py-1 rounded-full">
//           Health Checkup
//         </span>
//       </div>

//       <p className="text-gray-700 leading-relaxed mb-6 text-justify">
//         {test.description ||
//           `The ${test.testName} helps evaluate your ${test.category?.toLowerCase() || "health"} condition.
//           This test ensures early detection and effective monitoring of related conditions.`}
//       </p>

//       <div className="grid sm:grid-cols-2 gap-4 border-t border-gray-200 pt-4">
//         <Info label="Sample Type" value="Blood" />
//         <Info label="Gender" value="Both" />
//         <Info label="Age Group" value="7 years & above" />
//         <Info label="Category" value={test.category || "General"} />
//       </div>

//       {test.precautions && (
//         <div className="mt-8 bg-indigo-50 p-5 rounded-xl border border-indigo-100">
//           <h4 className="text-lg font-semibold text-indigo-700 mb-2">
//             ⚠️ Precautions
//           </h4>
//           <p className="text-indigo-800">{test.precautions}</p>
//         </div>
//       )}

//       <div className="mt-10">
//         <h4 className="text-lg font-semibold text-gray-800 mb-4">
//           🧾 Test(s) Included
//         </h4>
//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
//           {(test.includedTests || [
//             test.testName,
//             "Blood Sugar (Fasting)",
//             "Cholesterol Levels",
//             "HDL / LDL Ratio",
//           ]).map((t, i) => (
//             <div
//               key={i}
//               className="p-3 bg-indigo-50 hover:bg-indigo-100 transition rounded-lg text-gray-800 font-semibold text-center text-sm shadow-sm"
//             >
//               {t}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* 🔹 New Section: Benefits */}
//       <div className="mt-10 bg-gradient-to-r from-indigo-50 to-blue-50 p-5 rounded-xl">
//         <h4 className="text-lg font-semibold text-indigo-700 mb-3">
//           🌟 Why Choose This Test?
//         </h4>
//         <ul className="list-disc pl-5 text-gray-700 space-y-2 text-sm">
//           <li>Quick and accurate lab reports</li>
//           <li>Certified labs and expert technicians</li>
//           <li>Convenient home sample collection</li>
//           <li>Trusted by thousands of patients</li>
//         </ul>
//       </div>
//     </div>
//   </div>
// );
// ;
// }

// // Sub-component
// const Info = ({ label, value }: { label: string; value: string }) => (
//   <div className="flex flex-col items-start gap-1">
//     <p className="text-gray-500 text-sm">{label}</p>
//     <p className="font-semibold text-gray-800 bg-indigo-200 px-2 py-1 rounded-full text-sm">{value}</p>
//   </div>
// );


import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../Services/mainApi";

// ✅ Import same category images
import diabetes from "../../assets/diabetes.png";
import fever from "../../assets/Fever and infections.png";
import Pregnancy from "../../assets/Pregnancy.png";
import vitamin from "../../assets/vitamin.png";
import Liver from "../../assets/Liver.png";
import kidney from "../../assets/kidney.png";
import Heart from "../../assets/Heart.png";
import Imaging from "../../assets/Imaging.png";

interface Test {
  _id: string;
  testName: string;
  price: number;
  labId: string;
  labName: string;
  category?: string;
  description?: string;
  precautions?: string;
  includedTests?: string[];
  reportFile?: string | null;
}

export default function LabTestDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const test = location.state?.test as Test | undefined;

  const [loading, setLoading] = useState(false);
  const [bookingStatus, setBookingStatus] = useState<string | null>(null);
  const [otherTests, setOtherTests] = useState<Test[]>([]);

  // ✅ Category Images (same as AllLabTest)
  const categoryImages: Record<string, string> = {
    kidney,
    fever,
    pregnancy: Pregnancy,
    diabetes,
    vitamin,
    liver: Liver,
    heart: Heart,
    imaging: Imaging,
  };

  // ✅ Redirect if no test
  useEffect(() => {
    if (!test) navigate("/all-lab-test");
  }, [test, navigate]);

  // ✅ Fetch other tests from the same lab
  useEffect(() => {
    const fetchOtherTests = async () => {
      if (!test?.labId) return;
      try {
        const res = await api.get(`/api/lab/alllabtests`);
        if (Array.isArray(res.data)) {
          const sameLabTests = res.data.filter(
            (t: Test) => t.labId === test.labId && t._id !== test._id
          );
          setOtherTests(sameLabTests);
        }
      } catch (err) {
        console.error("Error fetching other tests:", err);
      }
    };
    fetchOtherTests();
  }, [test]);

  if (!test) return null;

  // ✅ Booking
  const handleBookTest = async () => {
    setLoading(true);
    setBookingStatus(null);

    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("patientToken="))
        ?.split("=")[1];

      if (!token) {
        alert("Please login to book test");
        setLoading(false);
        return;
      }

      let patientId: string | null = null;
      try {
        const base64Payload = token.split(".")[1];
        const payload = JSON.parse(atob(base64Payload));
        patientId = payload.id;
      } catch {
        alert("Invalid login token");
        setLoading(false);
        return;
      }

      const payload = {
        test: {
          labId: test.labId,
          name: test.testName,
          price: test.price,
          category: test.category || "General",
        },
        patientId,
      };

      const res = await api.post("/api/lab/bookTest", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("✅ Booking response:", res.data);
      setBookingStatus("Booking successful!");
    } catch (error) {
      console.error("❌ Booking error:", error);
      setBookingStatus("Booking failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleViewOtherTest = (selectedTest: Test) => {
    navigate(`/lab-test-details/${selectedTest._id}`, {
      state: { test: selectedTest },
    });
  };

  const categoryKey = test.category?.toLowerCase() || "";
  const imageSrc = categoryImages[categoryKey] || "/placeholder-image.jpg";

  return (
    <div className="min-h-screen bg-indigo-50 px-6 lg:px-16 py-10 flex flex-col lg:flex-row gap-10">
      {/* LEFT CARD */}
      <div className="w-full lg:w-1/3 bg-white shadow-xl rounded-2xl p-6 border border-gray-100 flex flex-col items-center transition hover:shadow-2xl">
        {/* ✅ Category Image in Circle */}
        <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-indigo-100 shadow mb-6">
          <img
            src={imageSrc}
            alt={test.testName}
            className="w-full h-full object-cover"
          />
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-1 text-center">
          {test.testName}
        </h2>
        <p className="text-gray-600 text-sm mb-6 text-center">
          Provided by: <span className="font-medium">{test.labName}</span>
        </p>

        <div className="space-y-3 mb-6 text-gray-700 text-sm w-full">
          <p>
            🧪 Sample collection within{" "}
            <span className="font-semibold">2 hours</span>
          </p>
          <p>
            📃 Reports available within{" "}
            <span className="font-semibold">10 hours</span>
          </p>
          <p>
            ⏰ Fasting required:{" "}
            <span className="font-semibold">10–12 hours</span>
          </p>
        </div>

        <div className="border-t border-gray-200 pt-5 w-full">
          <div className="flex flex-col items-center">
            <p className="text-gray-400 line-through text-sm">
              ₹{test.price + 200}
            </p>
            <p className="text-3xl font-bold text-indigo-700 mb-3">
              ₹{test.price}
            </p>
          </div>

          <button
            onClick={handleBookTest}
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold transition duration-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-indigo-500 hover:bg-indigo-600 text-white"
            }`}
          >
            {loading ? "Booking..." : "Book Now"}
          </button>

          {bookingStatus && (
            <p
              className={`text-sm mt-3 text-center ${
                bookingStatus.includes("successful")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {bookingStatus}
            </p>
          )}

          {test.reportFile && (
            <a
              href={test.reportFile}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-3 text-indigo-700 hover:underline text-sm text-center"
            >
              📄 Download Report
            </a>
          )}
        </div>

        {/* ✅ Other Tests from same Lab */}
        {otherTests.length > 0 && (
          <div className="mt-10 w-full">
            <h4 className="text-lg font-semibold text-gray-800 mb-4 text-center">
              🧪 Other Tests from {test.labName}
            </h4>
            <ul className="space-y-3">
              {otherTests.map((t) => (
                <li
                  key={t._id}
                  onClick={() => handleViewOtherTest(t)}
                  className="flex justify-between items-center bg-indigo-50 hover:bg-indigo-100 transition p-3 rounded-lg shadow-sm cursor-pointer"
                >
                  <span className="font-semibold text-gray-800">
                    {t.testName}
                  </span>
                  <span className="text-indigo-600 font-medium">
                    ₹{t.price}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* RIGHT DETAILS */}
      <div className="w-full lg:w-2/3 bg-white shadow-md rounded-2xl p-10 border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-3xl font-bold text-gray-800">
            {test.testName} Details
          </h3>
          <span className="bg-indigo-100 text-indigo-700 text-sm font-semibold px-3 py-1 rounded-full">
            {test.category || "Health Checkup"}
          </span>
        </div>

        <p className="text-gray-700 leading-relaxed mb-6 text-justify">
          {test.description ||
            `The ${test.testName} helps evaluate your ${
              test.category?.toLowerCase() || "health"
            } condition.`}
        </p>

        <div className="grid sm:grid-cols-2 gap-4 border-t border-gray-200 pt-4">
          <Info label="Sample Type" value="Blood" />
          <Info label="Gender" value="Both" />
          <Info label="Age Group" value="7 years & above" />
          <Info label="Category" value={test.category || "General"} />
        </div>

        {test.precautions && (
          <div className="mt-8 bg-indigo-50 p-5 rounded-xl border border-indigo-100">
            <h4 className="text-lg font-semibold text-indigo-700 mb-2">
              ⚠️ Precautions
            </h4>
            <p className="text-indigo-800">{test.precautions}</p>
          </div>
        )}

        {/* 🔹 Benefits (skip for now) */}
        <div className="mt-10 bg-gradient-to-r from-indigo-50 to-blue-50 p-5 rounded-xl">
          <h4 className="text-lg font-semibold text-indigo-700 mb-3">
            🌟 Why Choose This Test?
          </h4>
          <ul className="list-disc pl-5 text-gray-700 space-y-2 text-sm">
            <li>Quick and accurate lab reports</li>
            <li>Certified labs and expert technicians</li>
            <li>Convenient home sample collection</li>
            <li>Trusted by thousands of patients</li>
          </ul>
        </div> 

         

        {/* 🔹 New Section: Lab Info */}
        <div className="mt-10 bg-indigo-50 p-5 rounded-xl border border-indigo-100">
          <h4 className="text-lg font-semibold text-indigo-700 mb-2">
            🧫 About {test.labName}
          </h4>
          <p className="text-gray-700 text-sm leading-relaxed">
            {test.labName} is a trusted diagnostic center known for accurate
            results, certified technicians, and modern testing equipment. The
            lab ensures hygienic sample collection and timely report delivery.
          </p>
        </div>
      </div>
    </div>
  );
}

// Sub-component
const Info = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col items-start gap-1">
    <p className="text-gray-500 text-sm">{label}</p>
    <p className="font-semibold text-gray-800 bg-indigo-200 px-2 py-1 rounded-full text-sm">
      {value}
    </p>
  </div>
);
