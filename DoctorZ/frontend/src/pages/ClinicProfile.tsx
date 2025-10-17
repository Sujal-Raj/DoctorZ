
import { useEffect, useState, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

interface Clinic {
  _id: string;
  clinicName: string;
  clinicType: "Private" | "Government";
  operatingHours: string;
  specialities: string[];
  phone: string;
  email: string;
  address: string;
  state: string;
  district: string;
  pincode: number;
  clinicLicenseNumber: string;
  registrationCertificate?: string; // URL or base64 string
  aadharNumber: number;
  panNumber: string;
  staffName: string;
  staffEmail: string;
  staffId: string;
  doctors: string[];
}

interface OutletContext {
  clinicId: string;
}

export default function ClinicProfile() {
  const { clinicId } = useOutletContext<OutletContext>();
  const [clinic, setClinic] = useState<Clinic | null>(null);
  const [formData, setFormData] = useState<Clinic | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);

  // Modal state for showing certificate
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const fetchClinicData = async () => {
    if (!clinicId) return;
    try {
      const res = await axios.get<{ clinic: Clinic }>(
        `http://localhost:3000/api/clinic/getClinicById/${clinicId}`
      );
      const clinicData = res.data.clinic;
      setClinic(clinicData);
      setFormData(clinicData);
    } catch (error) {
      console.error("Error fetching clinic data:", error);
      toast.error("Failed to load clinic profile");
    }
  };

  useEffect(() => {
    fetchClinicData();
  }, [clinicId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!formData) return;
    const { name, value } = e.target;

    // For specialities array, if you want comma separated input, you can add logic here.
    if (name === "specialities") {
      const arr = value.split(",").map((s) => s.trim());
      setFormData({ ...formData, [name]: arr });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle file upload for Registration Certificate
 const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  if (!formData) return;
  const file = e.target.files?.[0];
  if (!file) return;

  const uploadForm = new FormData();
  uploadForm.append("file", file);

  try {
    const response = await axios.put<{ registrationCertificate: string }>(
      `http://localhost:3000/api/clinic/updateCertificate/${formData._id}`,
      uploadForm,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    setFormData({
      ...formData,
      registrationCertificate: response.data.registrationCertificate,
    });

    toast.success("Certificate uploaded successfully");
  } catch (error) {
    console.error("Certificate upload error:", error);
    toast.error("Failed to upload certificate");
  }
};


  const handleUpdate = async () => {
    if (!formData) return;
    try {
      setSaving(true);
      await axios.put(
        `http://localhost:3000/api/clinic/update/${formData._id}`,
        formData
      );
      toast.success("Clinic profile updated successfully");
      setEditMode(false);
      setSaving(false);
      await fetchClinicData();
    } catch (error) {
      console.error("Error updating clinic:", error);
      toast.error("Failed to update profile");
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!clinic) return;
    if (window.confirm("Are you sure you want to delete this clinic?")) {
      try {
        await axios.delete(
          `http://localhost:3000/api/clinic/delete/${clinic._id}`
        );
        toast.success("Clinic deleted successfully");
        setClinic(null);
      } catch (error) {
        console.error("Error deleting clinic:", error);
        toast.error("Failed to delete clinic");
      }
    }
  };

  if (!clinic || !formData)
    return (
      <p className="text-center mt-6 text-gray-500 text-lg">
        Loading clinic profile...
      </p>
    );

  const fields: { label: string; key: keyof Clinic }[] = [
    { label: "Clinic Name", key: "clinicName" },
    { label: "Clinic Type", key: "clinicType" },
    { label: "Operating Hours", key: "operatingHours" },
    { label: "Specialities", key: "specialities" },
    { label: "Phone", key: "phone" },
    { label: "Email", key: "email" },
    { label: "Address", key: "address" },
    { label: "State", key: "state" },
    { label: "District", key: "district" },
    { label: "Pincode", key: "pincode" },
    { label: "Clinic License Number", key: "clinicLicenseNumber" },
    { label: "Registration Certificate", key: "registrationCertificate" },
    { label: "Aadhar Number", key: "aadharNumber" },
    { label: "PAN Number", key: "panNumber" },
    { label: "Staff Name", key: "staffName" },
    { label: "Staff Email", key: "staffEmail" },
    { label: "Staff ID", key: "staffId" },
  ];

  

  return (
    <>
      <section className="bg-white rounded-xl shadow-md border border-gray-200 p-6 max-w-full md:max-w-3xl mx-auto">
        {/* Title & Buttons */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-2xl font-semibold text-gray-800 tracking-wide">
            Clinic Profile
          </h1>
          <div className="flex gap-3">
            {editMode ? (
              <>
                <button
                  onClick={handleUpdate}
                  disabled={saving}
                  className="px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-medium shadow-sm transition focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                  {saving ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={() => {
                    setFormData(clinic);
                    setEditMode(false);
                  }}
                  className="px-4 py-2 rounded-md bg-gray-500 hover:bg-gray-600 text-white font-medium shadow-sm transition focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setEditMode(true)}
                  className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm transition focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white font-medium shadow-sm transition focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </header>

        {/* Clinic Info Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
          {fields.map(({ label, key }) => (
            <div key={key as string} className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">
                {label}
              </label>

              {key === "registrationCertificate" ? (
                editMode ? (
                  <>
                    <input
                      type="file"
                      accept=".pdf,image/*"
                      onChange={handleFileChange}
                      ref={fileInputRef}
                      className="text-gray-700"
                    />
                    {formData.registrationCertificate && (
                      <p className="text-xs mt-1 text-green-600 break-all">
                        File selected
                      </p>
                    )}
                  </>
                ) : formData.registrationCertificate ? (
                  <button
                    onClick={() => setShowCertificateModal(true)}
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm font-medium transition"
                  >
                    View Certificate
                  </button>
                ) : (
                  <span className="text-gray-500">No certificate uploaded</span>
                )
              ) : editMode ? (
                <input
                  type={
                    key === "pincode" || key === "aadharNumber"
                      ? "number"
                      : "text"
                  }
                  name={key}
                  value={
                    Array.isArray(formData[key])
                      ? (formData[key] as string[]).join(", ")
                      : (formData[key] as string | number | undefined) || ""
                  }
                  onChange={handleChange}
                  className="rounded-md border border-gray-300 p-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-sm"
                  placeholder={`Enter ${label.toLowerCase()}`}
                />
              ) : (
                <div className="bg-gray-50 rounded-md p-3 text-gray-800 min-h-[40px] shadow-inner break-words">
                  {Array.isArray(formData[key])
                    ? (formData[key] as string[]).join(", ")
                    : formData[key]}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Certificate Modal */}
      {showCertificateModal && formData?.registrationCertificate && (
  <div
    className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4"
    onClick={() => setShowCertificateModal(false)}
  >
    <div
      className="bg-white rounded-lg overflow-auto max-w-full max-h-full p-4 relative"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className="absolute top-2 right-2 text-gray-700 hover:text-gray-900 font-bold text-xl"
        onClick={() => setShowCertificateModal(false)}
        aria-label="Close modal"
      >
        &times;
      </button>

      {/* Check if it's a PDF or image based on URL or base64 */}
      {formData.registrationCertificate.endsWith(".pdf") ||
      formData.registrationCertificate.startsWith("data:application/pdf") ? (
        <iframe
          src={formData.registrationCertificate}
          title="Registration Certificate"
          className="w-[80vw] h-[80vh]"
        />
      ) : (
        <img
          src={formData.registrationCertificate}
          alt="Registration Certificate"
          className="max-w-full max-h-[80vh] object-contain"
        />
      )}
    </div>
  </div>
)}

    </>
  );
}
