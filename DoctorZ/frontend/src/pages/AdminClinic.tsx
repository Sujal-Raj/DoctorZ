import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import api from "../Services/mainApi";

interface Clinic {
  _id: string;
  clinicName: string;
  email: string;
  state: string;
  district: string;
  pincode: string;
  address: string;
  operatingHours: string;
  status: string; // "pending", "approved", "rejected"
}

export default function AdminClinic() {
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState<{ id: string; action: "approve" | "reject" } | null>(null);

  // Fetch all pending clinics
  const fetchClinicDetails = async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/admin/clinics/pending");
      const data = response.data as { Clinics: Clinic[] };
      setClinics(data.Clinics);
      setError("");
    } catch (err: any) {
      console.error(err);
      setError(err?.response?.data?.message || "Failed to fetch clinics");
    } finally {
      setLoading(false);
    }
  };

  // Approve or Reject clinic
  const handleAction = async (id: string, action: "approve" | "reject") => {
    try {
      setProcessing({ id, action }); // Mark action in progress

      const url = action === "approve"
        ? `/api/admin/clinic/${id}/approve`
        : `/api/admin/clinic/${id}/reject`;

      const response = await api.put(url);

      if (response.status === 200) {
        Swal.fire({
          title: action === "approve" ? "Clinic Approved ✅" : "Clinic Rejected ❌",
          text: action === "approve"
            ? "The clinic can now log in using its staff credentials."
            : "The clinic registration has been rejected.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });

        // Refresh list
        fetchClinicDetails();
      }
    } catch (err: any) {
      console.error(err);
      Swal.fire({
        title: "Error!",
        text: err?.response?.data?.message || `Failed to ${action} the clinic.`,
        icon: "error",
        confirmButtonText: "Ok",
      });
    } finally {
      setProcessing(null); // Done processing
    }
  };

  useEffect(() => {
    fetchClinicDetails();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-700 text-lg">
        Fetching clinic details...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-600 font-semibold">
        {error}
      </div>
    );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-xl font-bold mb-4">Pending Clinics</h2>
      {clinics.length === 0 ? (
        <p className="text-gray-600">No pending clinics found.</p>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-blue-600 text-white uppercase text-xs">
              <tr>
                <th className="py-3 px-4">Clinic Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Timings</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {clinics.map((clinic) => (
                <tr key={clinic._id} className="border-b hover:bg-gray-50 transition">
                  <td className="py-3 px-4 font-medium">{clinic.clinicName}</td>
                  <td className="py-3 px-4">{clinic.email}</td>
                  <td className="py-3 px-4">
                    {clinic.district}, {clinic.state} ({clinic.pincode})
                  </td>
                  <td className="py-3 px-4">{clinic.operatingHours}</td>
                  <td className="py-3 px-4 capitalize font-semibold">
                    <span
                      className={`${
                        clinic.status === "approved"
                          ? "text-green-600"
                          : clinic.status === "rejected"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {clinic.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    {clinic.status === "pending" ? (
                      <div className="flex gap-2 justify-center">
                        {(!processing || processing.id === clinic._id) && (
                          <>
                            <button
                              onClick={() => handleAction(clinic._id, "approve")}
                              disabled={processing?.id === clinic._id && processing.action === "approve"}
                              className={`px-3 py-1 rounded-lg text-sm text-white ${
                                processing?.id === clinic._id && processing.action === "approve"
                                  ? "bg-green-300 cursor-not-allowed"
                                  : "bg-green-500 hover:bg-green-600"
                              }`}
                            >
                              {processing?.id === clinic._id && processing.action === "approve"
                                ? "Approving..."
                                : "Approve"}
                            </button>

                            <button
                              onClick={() => handleAction(clinic._id, "reject")}
                              disabled={processing?.id === clinic._id && processing.action === "reject"}
                              className={`px-3 py-1 rounded-lg text-sm text-white ${
                                processing?.id === clinic._id && processing.action === "reject"
                                  ? "bg-red-300 cursor-not-allowed"
                                  : "bg-red-500 hover:bg-red-600"
                              }`}
                            >
                              {processing?.id === clinic._id && processing.action === "reject"
                                ? "Rejecting..."
                                : "Reject"}
                            </button>
                          </>
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-500 text-sm italic">
                        {clinic.status === "approved"
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
