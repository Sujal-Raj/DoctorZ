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
  registrationCertificate?: string;
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

  // Fetch clinic data
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

  // Update clinic
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

  // Delete clinic
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
        ))}
      </div>
    </div>
  );
}
