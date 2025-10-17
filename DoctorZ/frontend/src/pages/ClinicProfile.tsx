import { useEffect, useState } from "react";
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
  staffPassword?: string;
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
  const [passwordInput, setPasswordInput] = useState("");

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

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (!formData) return;

    if (name === "staffPassword") {
      setPasswordInput(value); // Update separate state
      return;
    }

    const updatedValue =
      name === "specialities"
        ? value.split(",").map((item) => item.trim())
        : value;

    setFormData({
      ...formData,
      [name]: updatedValue,
    });
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

      const payload = {
        ...formData,
        ...(passwordInput ? { staffPassword: passwordInput } : {}), // Only send if entered
      };

      await axios.put(
        `http://localhost:3000/api/clinic/update/${formData._id}`,
        payload
      );

      alert("Clinic profile updated successfully");
      setEditMode(false);
      setSaving(false);
      setPasswordInput(""); // Clear password field after update
      fetchClinicData();
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
      <p className="text-center mt-6 text-gray-500">
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
    { label: "Staff Password", key: "staffPassword" },
  ];

  return (
    <div className="max-w-5xl mx-auto p-8 mt-10 bg-white rounded-2xl shadow-lg border border-gray-200">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-blue-700">Clinic Profile</h2>
        <div className="flex gap-3">
          {editMode ? (
            <>
              <button
                onClick={handleUpdate}
                disabled={saving}
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => {
                  setEditMode(false);
                  setPasswordInput("");
                  fetchClinicData();
                }}
                className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg transition"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
            >
              Edit
            </button>
          )}
          <button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {fields.map(({ label, key }) => (
          <div key={key as string} className="flex flex-col">
            <label className="text-sm font-semibold text-gray-600 mb-1">
              {label}
            </label>
            {editMode ? (
              <input
                type={
                  key === "pincode" || key === "aadharNumber"
                    ? "number"
                    : key === "staffPassword"
                    ? "password"
                    : "text"
                }
                name={key}
                value={
                  key === "staffPassword"
                    ? passwordInput
                    : Array.isArray(formData[key])
                    ? (formData[key] as string[]).join(", ")
                    : (formData[key] as string | number | undefined) || ""
                }
                onChange={handleChange}
                placeholder={
                  key === "staffPassword" ? "Enter new password" : ""
                }
                className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            ) : (
              <p className="bg-gray-100 p-2 rounded-md text-gray-800">
                {key === "staffPassword"
                  ? "••••••••"
                  : Array.isArray(formData[key])
                  ? (formData[key] as string[]).join(", ")
                  : formData[key]}
              </p>
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
