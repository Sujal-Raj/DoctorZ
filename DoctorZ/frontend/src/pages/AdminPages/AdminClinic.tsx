

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import api from "../../Services/mainApi";

type ClinicStatus = "pending" | "approved" | "rejected";

interface Clinic {
  _id: string;
  clinicName: string;
  email: string;
  state: string;
  district: string;
  pincode: string;
  address: string;
  operatingHours: string;
  status: ClinicStatus;
}

interface ApiClinicsResponse {
   Clinics: Clinic[];
}  

interface ProcessingState {
  id: string;
  action: "approve" | "reject";
}

export default function AdminClinic() {
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [processing, setProcessing] = useState<ProcessingState | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

const fetchClinicDetails = async (): Promise<void> => {
  try {
    setLoading(true);
    const res = await api.get<ApiClinicsResponse>("http://localhost:3000/api/admin/clinics/pending");
    // ✅ Access the correct key from backend
  setClinics(res.data.Clinics || []);
    console.log("Fetched clinics:", res.data.Clinics);
  } catch (err) {
    console.error("Error fetching clinics:", err);
    setClinics([]);
  } finally {
    setLoading(false);
  }
};



  const handleAction = async (id: string, action: "approve" | "reject"): Promise<void> => {
    try {
      setProcessing({ id, action });
      await api.put(`http://localhost:3000/api/admin/clinic/${id}/${action}`);
      Swal.fire({
        title: action === "approve" ? "✅ Clinic Approved" : "❌ Clinic Rejected",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      await fetchClinicDetails();
    } catch (err: any) {
      Swal.fire({
        title: "Error",
        text: err?.response?.data?.message || `Failed to ${action} clinic.`,
        icon: "error",
      });
    } finally {
      setProcessing(null);
    }
  };

  useEffect(() => {
    fetchClinicDetails();
  }, []);

  // Filtered & paginated clinics
  const filteredClinics: Clinic[] = clinics.filter(
    (c) =>
      c.clinicName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages: number = Math.ceil(filteredClinics.length / itemsPerPage);
  const startIndex: number = (currentPage - 1) * itemsPerPage;
  const endIndex: number = startIndex + itemsPerPage;
  const currentClinics: Clinic[] = filteredClinics.slice(startIndex, endIndex);

  const goToPage = (page: number): void => setCurrentPage(Math.max(1, Math.min(page, totalPages)));

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6">
      {/* Header */}
      <div className="mb-6 flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Clinic Approval Management</h1>
          <p className="text-gray-600">Review and approve pending clinic registrations.</p>
        </div>
        <div className="bg-white px-6 py-4 rounded-2xl shadow border border-gray-200 text-center min-w-[140px]">
          <p className="text-sm text-gray-500 uppercase">Total Pending</p>
          <p className="text-2xl font-bold text-gray-900">{clinics.length}</p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-4 max-w-md relative">
        <input
          type="text"
          placeholder="Search by name, district, or state..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full pl-4 pr-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-700 placeholder-gray-400"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow-md border border-gray-200">
        <table className="min-w-full text-left">
          <thead className="bg-gray-800 text-white text-xs uppercase">
            <tr>
              <th className="py-3 px-4">Clinic Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Location</th>
              <th className="py-3 px-4">Timings</th>
              <th className="py-3 px-4 text-center">Status</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentClinics.map((clinic, i) => (
              <tr key={clinic._id} className={`border-b hover:bg-gray-50 ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                <td className="py-3 px-4 font-semibold">{clinic.clinicName}</td>
                <td className="py-3 px-4">{clinic.email}</td>
                <td className="py-3 px-4">{clinic.district}, {clinic.state} ({clinic.pincode})</td>
                <td className="py-3 px-4">{clinic.operatingHours}</td>
                <td className="py-3 px-4 text-center">
                  <span
                    className={`px-2 py-1 rounded-md text-xs ${
                      clinic.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : clinic.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {clinic.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  {clinic.status === "pending" ? (
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleAction(clinic._id, "approve")}
                        disabled={processing?.id === clinic._id && processing.action === "approve"}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium text-white ${
                          processing?.id === clinic._id && processing.action === "approve"
                            ? "bg-green-300"
                            : "bg-green-500 hover:bg-green-600"
                        }`}
                      >
                        {processing?.id === clinic._id && processing.action === "approve" ? "Approving..." : "Approve"}
                      </button>
                      <button
                        onClick={() => handleAction(clinic._id, "reject")}
                        disabled={processing?.id === clinic._id && processing.action === "reject"}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium text-white ${
                          processing?.id === clinic._id && processing.action === "reject"
                            ? "bg-red-300"
                            : "bg-red-500 hover:bg-red-600"
                        }`}
                      >
                        {processing?.id === clinic._id && processing.action === "reject" ? "Rejecting..." : "Reject"}
                      </button>
                    </div>
                  ) : (
                    <span className="text-gray-500 text-sm italic">
                      {clinic.status === "approved" ? "Approved ✅" : "Rejected ❌"}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 p-4 bg-gray-50 border-t border-gray-200 mt-4 rounded-b-lg">
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredClinics.length)} of {filteredClinics.length} results
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} className="p-2 rounded border bg-white hover:bg-gray-100 disabled:opacity-50">&lt;</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button key={page} onClick={() => goToPage(page)} className={`px-3 py-1 rounded ${currentPage === page ? "bg-gray-800 text-white" : "bg-white text-gray-800 border"}`}>{page}</button>
            ))}
            <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} className="p-2 rounded border bg-white hover:bg-gray-100 disabled:opacity-50">&gt;</button>
          </div>
        </div>
      )}
    </main>
  );
}
