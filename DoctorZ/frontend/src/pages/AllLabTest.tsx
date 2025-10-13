import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/client";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ✅ Import category images
import diabetes from "../assets/diabetes.png";
import fever from "../assets/Fever and infections.png";
import Pregnancy from "../assets/Pregnancy.png";
import vitamin from "../assets/vitamin.png";
import Liver from "../assets/Liver.png";
import kidney from "../assets/kidney.png";
import Heart from "../assets/Heart.png";
import Imaging from "../assets/Imaging.png";

interface Test {
  _id: string;
  testName?: string;
  price?: number;
  labName?: string;
  labId?: string;
  category?: string;
}

export default function AllLabTest() {
  const [tests, setTests] = useState<Test[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // ✅ Category mapping with image
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

  const categories = [
    { name: "Kidney", key: "kidney" },
    { name: "Fever and Infection", key: "fever" },
    { name: "Vitamin", key: "vitamin" },
    { name: "Pregnancy", key: "pregnancy" },
    { name: "Diabetes", key: "diabetes" },
    { name: "Liver", key: "liver" },
    { name: "Heart", key: "heart" },
    { name: "Imaging", key: "imaging" },
  ];

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await api.get("/api/lab/alllabtests");
        setTests(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching tests:", error);
        setTests([]);
      }
    };
    fetchTests();
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleViewDetails = (test: Test) => {
    navigate(`/lab-test-details/${test._id}`, { state: { test } });
  };

  return (
    <div className="min-h-screen bg-indigo-50 px-4 sm:px-6 lg:px-10 py-10">
      {/* 🔹 Popular Categories */}
      <div className="mb-12 relative">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Popular Categories
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
            className="flex gap-8 overflow-x-auto scrollbar-hide scroll-smooth px-10 py-2"
          >
            {categories.map((cat) => (
              <div
                key={cat.key}
                className="flex-shrink-0 flex flex-col items-center cursor-pointer"
              >
                <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-indigo-100 shadow hover:shadow-lg hover:scale-105 transition-all duration-300">
                  <img
                    src={categoryImages[cat.key]}
                    alt={cat.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="mt-3 font-semibold text-gray-800 text-center text-sm sm:text-base">
                  {cat.name}
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

      {/* 🔹 All Tests Section */}
      <h2 className="text-2xl font-bold text-gray-800 mb-8">Available Tests</h2>

      {tests.length === 0 ? (
        <p className="text-center text-gray-500">No tests available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {tests.map((test) => {
            const categoryKey = test.category?.toLowerCase() || "";
            const imageSrc =
              categoryImages[categoryKey] || "/placeholder-image.jpg";

            return (
              <div
                key={test._id}
                className="bg-white rounded-2xl p-6 flex flex-col items-center shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-indigo-100 shadow">
                  <img
                    src={imageSrc}
                    alt={test.testName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="font-semibold text-gray-800 text-lg mt-4 text-center">
                  {test.testName || "Unnamed Test"}
                </h2>
                <p className="text-gray-900 font-semibold text-base mt-1">
                  ₹{test.price ?? "N/A"}
                </p>
                {test.category && (
                  <span className="mt-2 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold">
                    {test.category}
                  </span>
                )}
                <p className="text-gray-600 mt-2 text-sm text-center">
                  Lab:{" "}
                  <span className="font-medium">
                    {test.labName || "Unknown"}
                  </span>
                </p>
                <button
                  onClick={() => handleViewDetails(test)}
                  className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition-all duration-300"
                >
                  View Details
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}