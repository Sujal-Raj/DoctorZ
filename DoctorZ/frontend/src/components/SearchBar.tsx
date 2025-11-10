// import { useState } from "react";

// interface SearchBarProps {
//   onResults?: (data: any) => void;
// }

// export default function SearchBar({ onResults }: SearchBarProps) {
//   const [query, setQuery] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSearch = async () => {
//     if (!query.trim()) return;

//     try {
//       setLoading(true);
//       // Purane results clear karne ke liye
//       if (onResults) onResults([]);

//       const response = await fetch(
//         `http://localhost:3000/api/clinic/search?q=${query}`
//       );
//       if (!response.ok) throw new Error("Network response was not ok");

//       const data = await response.json();
//       console.log("Search results:", data);

//       if (onResults) onResults(data);
//     } catch (err) {
//       console.log("Search error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col sm:flex-row w-full max-w-4xl mx-auto mt-6 gap-4 justify-center px-4">
//       <input
//         type="text"
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         placeholder="Search Clinics, Doctors"
//         className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />
//       <button
//         onClick={handleSearch}
//         disabled={loading}
//         className={`px-4 py-2 rounded-md transition w-full sm:w-1/3 ${
//           loading
//             ? "bg-gray-400 cursor-not-allowed"
//             : "bg-blue-600 text-white hover:bg-blue-700"
//         }`}
//       >
//         {loading ? "Searching..." : "Search"}
//       </button>
//     </div>
//   );
// }



import { useState } from "react";

interface SearchBarProps {
  onResults?: (data: unknown) => void;
}

export default function SearchBar({ onResults }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      setLoading(true);
      // Purane results clear karne ke liye
      if (onResults) onResults([]);

      const response = await fetch(
        `http://localhost:3000/api/clinic/search?q=${query}`
      );
      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      console.log("Search results:", data);

      if (onResults) onResults(data);
    } catch (err) {
      console.log("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
   <div className="flex flex-col sm:flex-row w-full max-w-4xl mx-auto mt-6 gap-4 justify-center px-4">
  <div className="relative w-full sm:w-2/3">
    <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.8}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.35z"
        />
      </svg>
    </span>

    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search for clinics, doctors..."
      className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 shadow-sm 
                 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none
                 transition-all duration-200 placeholder-gray-400 text-gray-800"
    />
  </div>

  <button
    onClick={handleSearch}
    disabled={loading}
    className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 
                w-full sm:w-1/3 focus:outline-none
                ${
                  loading
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md active:scale-95"
                }`}
  >
    {loading ? "Searching..." : "Search"}
  </button>
</div>

  );
}