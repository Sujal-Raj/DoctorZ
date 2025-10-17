
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import api from "../Services/client";

interface Timings {
  open: string;
  close: string;
}

interface Test {
  testName: string;
  price: number;
}

interface Lab {
  _id: string;
  name: string;
  email: string;
  state: string;
  city: string;
  pincode: string;
  address: string;
  timings: Timings;
  status: string; // "pending", "approved", "rejected"
}

export default function AdminLab() {
  const [labs, setLabs] = useState<Lab[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Fetch all pending labs
  const fetchLabDetails = async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/admin/labs/pending");
      setLabs(response.data as Lab[]);
      setError("");
    } catch (err: any) {
      console.error(err);
      setError(err?.response?.data?.message || "Failed to fetch labs");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Approve or Reject lab
  const handleAction = async (id: string, action: "approve" | "reject") => {
    try {
      const url =
        action === "approve"
          ? `/api/admin/lab/${id}/approve`
          : `/api/admin/lab/${id}/reject`;

      const response = await api.put(url);

      if (response.status === 200) {
        Swal.fire({
          title:
            action === "approve"
              ? "Lab Approved ✅"
              : "Lab Rejected ❌",
          text:
            action === "approve"
              ? "This lab can now log in using its credentials."
              : "The lab registration has been rejected.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        // Refresh list
        fetchLabDetails();
      }
    } catch (err: any) {
      console.error(err);
      Swal.fire({
        title: "Error!",
        text: err?.response?.data?.message || `Failed to ${action} the lab.`,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  useEffect(() => {
    fetchLabDetails();
  }, []);

  // ✅ Loading and Error States
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-700 text-lg">
        Fetching lab details...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-600 font-semibold">
        {error}
      </div>
    );

  // ✅ Main UI
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        🧪 Lab Approval Dashboard
      </h1>

      {labs.length === 0 ? (
        <p className="text-center text-gray-600">No pending labs found.</p>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-blue-600 text-white uppercase text-xs">
              <tr>
                <th className="py-3 px-4">Lab Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Timings</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {labs.map((lab) => (
                <tr
                  key={lab._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-4 font-medium">{lab.name}</td>
                  <td className="py-3 px-4">{lab.email}</td>
                  <td className="py-3 px-4">
                    {lab.city}, {lab.state} ({lab.pincode})
                  </td>
                  <td className="py-3 px-4">
                    {lab.timings.open} - {lab.timings.close}
                  </td>
                  <td className="py-3 px-4 capitalize font-semibold">
                    <span
                      className={`${
                        lab.status === "approved"
                          ? "text-green-600"
                          : lab.status === "rejected"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {lab.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    {lab.status === "pending" ? (
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => handleAction(lab._id, "approve")}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleAction(lab._id, "reject")}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-500 text-sm italic">
                        {lab.status === "approved"
                          ? "Approved ✅"
                          : "Rejected ❌"}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

