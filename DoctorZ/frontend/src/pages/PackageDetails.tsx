import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../Services/mainApi";
import { Clock, FileText, AlertCircle } from "lucide-react";

// --- Interfaces ---
interface Test {
  _id: string;
  testName: string;
  price: number;
  category: string;
  description: string;
}

interface PackageDetailsType {
  _id: string;
  labId: string | { _id: string };
  packageName: string;
  description: string;
  totalPrice: number;
  tests: Test[];
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  message: string;
  packageDetails: PackageDetailsType;
}

// --- Component ---
export const PackageDetails: React.FC = () => {
  const { packageId } = useParams<{ packageId: string }>();
  const [packageDetails, setPackageDetails] = useState<PackageDetailsType | null>(null);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        const response = await api.get<ApiResponse>(`/api/lab/packages/${packageId}`);
        setPackageDetails(response.data.packageDetails);
      } catch (error) {
        console.error("Error fetching package details:", error);
      }
    };
    fetchPackageDetails();
  }, [packageId]);

  if (!packageDetails) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold text-gray-600">
        Loading Package Details...
      </div>
    );
  }
  const handlePackageBooking = async (packageId:string,labId: string) => {
    try{
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
      console.log("Booking package for patient ID:", patientId,"Package ID:", packageId,"Lab ID:", labId);
      const response=await api.post(`/api/lab/packages/book`,{
        packageId,
        patientId,
        labId
      },{
        headers:{
          Authorization:`Bearer ${token}`
        }
      });
      alert("Package booked successfully!");

    }catch(error){
      console.error("Error booking package:", error);
      alert("Failed to book package. Please try again later."); 
    }
  }
  return (
    <div className="min-h-screen bg-[#f8f9ff] p-6 md:p-10 flex flex-col md:flex-row gap-6 justify-center items-start">
      {/* Left: Package Summary */}
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full md:w-1/3">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {packageDetails.packageName}
        </h2>
        <p className="text-gray-600 mb-4 leading-relaxed">
          {packageDetails.description}
        </p>

        <div className="text-md border-t border-gray-200 pt-4 space-y-3 text-gray-700">
          <div className="flex items-center gap-2">
            <Clock className="text-indigo-600" size={18} />
            <span>Sample collection within <strong>2 hours</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="text-indigo-600" size={18} />
            <span>Reports available within <strong>10 hours</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <AlertCircle className="text-indigo-600" size={18} />
            <span>10–12 hr fasting is required</span>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-gray-600 line-through text-sm">
            MRP ₹{Math.round(packageDetails.totalPrice * 1.6)}
          </p>
          <p className="text-2xl font-bold text-indigo-700">
            ₹{packageDetails.totalPrice}
          </p>
          <p className="text-green-600 font-medium text-sm">60% off</p>
        </div>

        <button onClick={() => handlePackageBooking(
          packageDetails._id, typeof packageDetails.labId === "string" ? packageDetails.labId : packageDetails.labId._id)} className="mt-6 w-full bg-indigo-600 text-white font-semibold py-3 rounded-xl hover:bg-indigo-700 transition">
         {loading ? "Booking..." : "Book Now"}
        </button>
      </div>

      {/* Right: Tests List */}
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full md:w-2/3">
        <h3 className="text-xl font-bold mb-4 text-gray-800">
          Test(s) Included ({packageDetails.tests.length})
        </h3>

        {packageDetails.tests.length > 0 ? (
          <div className="space-y-4">
            {packageDetails.tests.map((test) => (
              <div
                key={test._id}
                className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition"
              >
                <h4 className="font-semibold text-indigo-700 text-lg">
                  {test.testName}
                </h4>
                {test.description && (
                  <p className="text-gray-600 text-sm mt-1">
                    {test.description}
                  </p>
                )}
                <p className="text-gray-600 text-sm mt-1">
                  <span className="font-medium">Category:</span> {test.category}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No tests available for this package.</p>
        )}
      </div>
    </div>
  );
};
