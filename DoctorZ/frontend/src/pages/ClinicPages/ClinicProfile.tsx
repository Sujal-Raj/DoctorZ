import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import { FileText } from "lucide-react";
import api from "../../Services/mainApi";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (!formData) return;

    if (name === "staffPassword") {
      setPasswordInput(value);
      return;
    }

    const updatedValue =
      name === "specialities"
        ? value.split(",").map((item) => item.trim())
        : value;

    // setFormData({
    //   ...formData,
    //   [name]: updatedValue,
    // });
    setFormData({
  ...formData,
  [name as keyof Clinic]: updatedValue,
});

  };

  const handleUpdate = async () => {
    if (!formData) return;

    try {
      setSaving(true);
      const payload = {
        ...formData,
        ...(passwordInput ? { staffPassword: passwordInput } : {}),
      };

      await api.put(
        `/api/clinic/update/${formData._id}`,
        payload
      );

      toast.success("Clinic profile updated successfully");
      setEditMode(false);
      setSaving(false);
      setPasswordInput("");
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
        await api.delete(
          `/api/clinic/delete/${clinic._id}`
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
      <p className="text-center mt-6 text-gray-500">Loading clinic profile...</p>
    );

  const groups = [
    {
      title: "Clinic Details",
      fields: [
        { label: "Clinic Name", key: "clinicName" },
        { label: "Clinic Type", key: "clinicType" },
        { label: "Operating Hours", key: "operatingHours" },
        { label: "Specialities", key: "specialities" },
        { label: "Clinic License Number", key: "clinicLicenseNumber" },
        { label: "Registration Certificate", key: "registrationCertificate" },
      ],
    },
    {
      title: "Contact Details",
      fields: [
        { label: "Phone", key: "phone" },
        { label: "Email", key: "email" },
        { label: "Address", key: "address" },
        { label: "State", key: "state" },
        { label: "District", key: "district" },
        { label: "Pincode", key: "pincode" },
      ],
    },
    {
      title: "Staff & Credentials",
      fields: [
        { label: "Aadhar Number", key: "aadharNumber" },
        { label: "PAN Number", key: "panNumber" },
        { label: "Staff Name", key: "staffName" },
        { label: "Staff Email", key: "staffEmail" },
        { label: "Staff ID", key: "staffId" },
        { label: "Staff Password", key: "staffPassword" },
      ],
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 sm:p-10 bg-white rounded-2xl shadow-lg border border-gray-200 mt-8">
      <Helmet>
        <title>{clinic?.clinicName || "Clinic Profile"} | HealthSync</title>
        <meta
          name="description"
          content={`View and update details for ${clinic?.clinicName}, including operating hours, specialties, and contact info.`}
        />
      </Helmet>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h2 className="text-3xl font-bold text-[#28328C]">Clinic Profile</h2>
        <div className="flex flex-wrap gap-3">
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
              className="bg-[#28328C] hover:bg-blue-900 text-white px-5 py-2 rounded-lg transition"
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

      {/* Sections */}
      {groups.map((group) => (
        <div key={group.title} className="mb-10">
          <h3 className="text-xl font-semibold text-[#28328C] mb-4 border-b pb-1">
            {group.title}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {group.fields.map(({ label, key }) => (
              <div key={key as string} className="flex flex-col">
                <label className="text-sm font-medium text-gray-600 mb-1">
                  {label}
                </label>

                {/* Registration Certificate box */}
                {key === "registrationCertificate" ? (
                  <div className="flex flex-col gap-2">
                    {formData.registrationCertificate ? (
                      <a
                        href={formData.registrationCertificate}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block"
                      >
                        <div className="w-32 h-32 border border-gray-300 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all hover:scale-[1.02]">
                          {formData.registrationCertificate.match(
                            /\.(jpeg|jpg|png|gif|webp)$/i
                          ) ? (
                            <img
                              src={formData.registrationCertificate}
                              alt="Registration Certificate"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full text-gray-500 text-sm">
                              <FileText size={18} className="mr-2" /> View File
                            </div>
                          )}
                        </div>
                      </a>
                    ) : (
                      <p className="text-gray-500 text-sm italic">
                        No certificate uploaded
                      </p>
                    )}

                    {editMode && (
                      <input
                        type="file"
                        name="registrationCertificate"
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const url = URL.createObjectURL(file);
                            setFormData({
                              ...formData,
                              registrationCertificate: url,
                            });
                          }
                        }}
                        className="text-sm text-gray-700 border border-gray-300 rounded-lg p-2 cursor-pointer focus:ring-2 focus:ring-[#28328C]"
                      />
                    )}
                  </div>
                ) : editMode ? (
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
                      

                       : Array.isArray(formData[key as keyof Clinic])
  ? (formData[key as keyof Clinic] as string[]).join(", ")
  : (formData[key as keyof Clinic] as string | number | undefined) || ""

                    }
                    onChange={handleChange}
                    placeholder={
                      key === "staffPassword" ? "Enter new password" : ""
                    }
                    className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#28328C] focus:outline-none bg-white"
                  />
                ) : (
                  <p className="bg-gray-50 border border-gray-200 p-2 rounded-md text-gray-800">
                    {key === "staffPassword"
                      ? "••••••••"
                     
                      :Array.isArray(formData[key as keyof Clinic])
  ? (formData[key as keyof Clinic] as string[]).join(", ")
  : formData[key as keyof Clinic] || "-"
                    }
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
