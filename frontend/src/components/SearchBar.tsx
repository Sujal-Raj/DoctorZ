import { useState } from "react";

interface SearchBarProps {
  onResults?: (data: any) => void;
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
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search Clinics, Doctors"
        className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleSearch}
        disabled={loading}
        className={`px-4 py-2 rounded-md transition w-full sm:w-1/3 ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        {loading ? "Searching..." : "Search"}
      </button>
    </div>
  );
}
