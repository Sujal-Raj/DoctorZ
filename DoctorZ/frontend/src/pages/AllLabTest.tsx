// import kidney from "../assets/kidneys.png";
// import fever from "../assets/fever.png";
// import pregnancy from "../assets/pregnancy.png";
// import diabetes from "../assets/Diabetes.png";
// import vitamin from "../assets/supplements.png";
// import liver from "../assets/liver.png";
// import { useState, useEffect, useRef } from "react";
// import api from "../api/client";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// interface Test {
//   _id: string;
//   name: string;
//   price: number;
//   labName: string;
//   labId: string;
// }

// export default function AllLabTest() {
//   //  Decode patient token
//   const token = document.cookie
//     .split("; ")
//     .find((row) => row.startsWith("patientToken="))
//     ?.split("=")[1];
//   const payloadBase64 = token?.split(".")[1];
//   const pay = payloadBase64 ? JSON.parse(atob(payloadBase64)) : null;
//   const patientId = pay?.id;

//   const [tests, setTests] = useState<Test[]>([]);
//   const scrollRef = useRef<HTMLDivElement>(null);

//   const scroll = (direction: "left" | "right") => {
//     if (scrollRef.current) {
//       const scrollAmount = 300;
//       scrollRef.current.scrollBy({
//         left: direction === "left" ? -scrollAmount : scrollAmount,
//         behavior: "smooth",
//       });
//     }
//   };

//   const categories = [
//     { img: kidney, name: "Kidney" },
//     { img: fever, name: "Fever and Infection" },
//     { img: vitamin, name: "Vitamin" },
//     { img: pregnancy, name: "Pregnancy" },
//     { img: diabetes, name: "Diabetes" },
//     { img: liver, name: "Liver" },
//   ];

//   // ✅ Fetch tests from backend
//   useEffect(() => {
//     const fetchTests = async () => {
//       try {
//         const response = await api.get("/api/lab/alllabtests");
//         setTests(response.data as Test[]);
//       } catch (error) {
//         console.error("Error fetching tests:", error);
//       }
//     };
//     fetchTests();
//   }, []);

//   // ✅ Handle booking test
//   const handleBookTest = async (test: Test) => {
//     if (!token) {
//       alert("Please login to book test");
//       return;
//     }

//     try {
//       await api.post("/api/lab/addTestData", { test, patientId });
//       alert("Test booked successfully!");
//     } catch (error) {
//       console.error("Error booking test:", error);
//       alert("Something went wrong. Please try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white px-4 sm:px-6 lg:px-10 py-8">
//       {/* Popular Categories */}
//       <div className="mb-10 relative">
//         <div className="flex justify-between items-center mb-4">
//           <h1 className="text-xl font-bold text-gray-800">
//             Popular Categories <span className="text-gray-500">(6)</span>
//           </h1>
//           <button className="text-blue-600 font-semibold hover:underline">
//             View All
//           </button>
//         </div>

//         <div className="relative">
//           {/* Left Arrow */}
//           <button
//             onClick={() => scroll("left")}
//             className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-300 p-2 rounded-full shadow hover:bg-gray-100"
//           >
//             <ChevronLeft className="w-5 h-5 text-gray-700" />
//           </button>

//           {/* Scrollable container */}
//           <div
//             ref={scrollRef}
//             className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-10"
//           >
//             {categories.map((category, index) => (
//               <div
//                 key={index}
//                 className="flex-shrink-0 flex items-center gap-3 border border-gray-300 rounded-xl px-5 py-3 bg-white hover:shadow-lg transition cursor-pointer min-w-[180px]"
//               >
//                 <img src={category.img} alt={category.name} className="w-10 h-10" />
//                 <p className="font-medium text-gray-700 text-sm sm:text-base">
//                   {category.name}
//                 </p>
//               </div>
//             ))}
//           </div>

//           {/* Right Arrow */}
//           <button
//             onClick={() => scroll("right")}
//             className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-300 p-2 rounded-full shadow hover:bg-gray-100"
//           >
//             <ChevronRight className="w-5 h-5 text-gray-700" />
//           </button>
//         </div>
//       </div>

//       {/* All Tests Section */}
//       <h2 className="text-xl font-bold text-gray-800 mb-4">Available Tests</h2>

//       {tests.length === 0 ? (
//         <p className="text-center text-gray-500">No tests available</p>
//       ) : (
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//   {tests.map((test) => (
//     <div
//       key={test._id}
//       className="border border-gray-200 bg-white rounded-xl p-5 flex flex-col justify-between shadow-md hover:shadow-xl transition min-h-[200px]"
//     >
//       <div>
//         <h2 className="font-semibold text-gray-800 text-base sm:text-lg mb-2">
//           {test.name}
//         </h2>
//         <span className="text-gray-800 font-semibold text-lg sm:text-xl mb-2 block">
//           ₹{test.price}
//         </span>
//         <p className="text-gray-600 text-sm">
//           Lab Name: <span className="font-medium">{test.labName}</span>
//         </p>
//       </div>
//       <button
//         onClick={() => handleBookTest(test)}
//         className="bg-blue-600 w-full hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition mt-4"
//       >
//         Book Test
//       </button>
//     </div>
//   ))}
// </div>

//       )}
//     </div>
//   );
// }

import kidney from "../assets/kidneys.png";
import fever from "../assets/fever.png";
import pregnancy from "../assets/pregnancy.png";
import diabetes from "../assets/Diabetes.png";
import vitamin from "../assets/supplements.png";
import liver from "../assets/liver.png";
import { useState, useEffect, useRef } from "react";
import api from "../api/client";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

interface Test {
  _id: string;
  name: string;
  price: number;
  labName: string;
  labId: string;
}

export default function AllLabTest() {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("patientToken="))
    ?.split("=")[1];
  const payloadBase64 = token?.split(".")[1];
  const pay = payloadBase64 ? JSON.parse(atob(payloadBase64)) : null;
  const patientId = pay?.id;

  const [tests, setTests] = useState<Test[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const categories = [
    { img: kidney, name: "Kidney" },
    { img: fever, name: "Fever and Infection" },
    { img: vitamin, name: "Vitamin" },
    { img: pregnancy, name: "Pregnancy" },
    { img: diabetes, name: "Diabetes" },
    { img: liver, name: "Liver" },
  ];

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await api.get("/api/lab/alllabtests");
        console.log(response.data);
        setTests(response.data as Test[]);
      } catch (error) {
        console.error("Error fetching tests:", error);
      }
    };
    fetchTests();
  }, []);

  const handleBookTest = async (test: Test) => {
    if (!token) {
      alert("Please login to book test");
      return;
    }

    try {
      await api.post("/api/lab/addTestData", { test, patientId });
      alert("Test booked successfully!");
    } catch (error) {
      console.error("Error booking test:", error);
      alert("Something went wrong. Please try again.");
    }
  };


  // Dynamic filtering inside render
 
const filteredTests = tests.filter((test) => {
  const query = searchQuery.trim().toLowerCase();
  if (!query) return true; // show all if search empty
  return test.name.toLowerCase().includes(query); // matches anywhere in name
});



  return (
    <div className="min-h-screen bg-white px-4 sm:px-6 lg:px-10 py-8">
      
      {/* Search Bar */}
      <div className="mb-6 relative w-full max-w-md mx-auto">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search tests..."
          className="w-full border border-gray-300 rounded-lg py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
      </div>

      {/* Categories */}
      <div className="mb-10 relative">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-gray-800">
            Popular Categories <span className="text-gray-500">(6)</span>
          </h1>
          <button className="text-blue-600 font-semibold hover:underline">
            View All
          </button>
        </div>

        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-300 p-2 rounded-full shadow hover:bg-gray-100"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-10"
          >
            {categories.map((category, index) => (
              <div
                key={index}
                className="flex-shrink-0 flex items-center gap-3 border border-gray-300 rounded-xl px-5 py-3 bg-white hover:shadow-lg transition cursor-pointer min-w-[180px]"
              >
                <img src={category.img} alt={category.name} className="w-10 h-10" />
                <p className="font-medium text-gray-700 text-sm sm:text-base">
                  {category.name}
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-300 p-2 rounded-full shadow hover:bg-gray-100"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Available Tests */}
      <h2 className="text-xl font-bold text-gray-800 mb-4">Available Tests</h2>
      {filteredTests.length === 0 ? (
        <p className="text-center text-gray-500">No tests found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredTests.map((test,index) => (
            <div
               key={test._id + "_" + index}
              className="border border-gray-200 bg-white rounded-xl p-5 flex flex-col justify-between shadow-md hover:shadow-xl transition min-h-[200px]"
            >
              <div>
                <h2 className="font-semibold text-gray-800 text-base sm:text-lg mb-2">
                  {test.name}
                </h2>
                <span className="text-gray-800 font-semibold text-lg sm:text-xl mb-2 block">
                  ₹{test.price}
                </span>
                <p className="text-gray-600 text-sm">
                  Lab Name: <span className="font-medium">{test.labName}</span>
                </p>
              </div>
              <button
                onClick={() => handleBookTest(test)}
                className="bg-blue-600 w-full hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition mt-4"
              >
                Book Test
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
