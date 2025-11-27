
import { useEffect, useState } from "react";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  Building2,
  Mail,
  MapPin,
  Edit3,
  Save,
  
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

interface Lab {
  labId: string;
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  password?: string;
}

interface LabDashboardContext {
  labId: string | null;
}

interface GetLabResponse {
  labDetails: Lab;
}

interface UpdateLabResponse {
  lab: Lab;
}

const LabProfile = () => {
  const { labId: contextLabId } = useOutletContext<LabDashboardContext>();

  const [lab, setLab] = useState<Lab>({
    labId: "",
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    password: "",
  });

  // Removed unused loading state
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Fetch Data
  useEffect(() => {
    if (!contextLabId) return;

    const fetchLab = async () => {
      try {
        const res = await axios.get<GetLabResponse>(
          `http://localhost:3000/api/lab/getLabById/${contextLabId}`
        );
        setLab(res.data.labDetails);
      } catch {
        showNotification("error", "Failed to load lab data");
      }
    };

    fetchLab();
  }, [contextLabId]);

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLab({ ...lab, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contextLabId) return;

    setSaving(true);
    try {
      const res = await axios.put<UpdateLabResponse>(
        `http://localhost:3000/api/lab/updateLabProfile/${contextLabId}`,
        lab
      );
      setLab(res.data.lab);
      setIsEditing(false);
      showNotification("success", "Profile updated successfully!");
    } catch {
      showNotification("error", "Failed to update profile");
    }
    setSaving(false);
  };

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto">

      {/* SEO */}
      <Helmet>
        <title>Lab Profile | Dashboard</title>
        <meta
          name="description"
          content="Manage your laboratory profile, update information, and keep your lab details accurate."
        />
      </Helmet>

      {/* HEADER */}
      <div className="bg-[#0C213E] rounded-2xl shadow-xl p-5 mb-6 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-white/10 p-3 rounded-xl">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Laboratory Profile
            </h1>
            <p className="text-gray-200 text-sm sm:text-base">
              Manage your lab information
            </p>
          </div>
        </div>

        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-white text-[#0C213E] px-5 py-2.5 rounded-xl font-semibold shadow hover:shadow-lg text-sm sm:text-base transition flex items-center gap-2"
          >
            <Edit3 className="w-5 h-5" />
            Edit
          </button>
        )}
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-5 sm:p-7 border border-gray-200 text-sm sm:text-base"
      >
        <div className="grid gap-6">

          {/* Single Input Reusable */}
          {[
            { label: "Laboratory Name", field: "name", icon: Building2 },
            { label: "Email", field: "email", icon: Mail, type: "email" },
            { label: "Address", field: "address", icon: MapPin },
          ].map((item) => (
            <div key={item.field}>
              <label className="font-semibold text-gray-700 mb-1 block">
                {item.label}
              </label>
              <div className="relative">
                <item.icon
                  className="absolute left-3 top-3 h-5 w-5 text-gray-400"
                />
                <input
                  type={item.type || "text"}
                  name={item.field}
                  value={(lab as any)[item.field]}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full pl-10 pr-3 py-2.5 rounded-xl border outline-none transition ${
                    isEditing
                      ? "border-gray-300 focus:border-[#0C213E] focus:ring-2 focus:ring-[#0C213E]/20"
                      : "bg-gray-100 border-gray-200 cursor-default"
                  }`}
                />
              </div>
            </div>
          ))}

          {/* CITY / STATE / PINCODE */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {["city", "state", "pincode"].map((field) => (
              <div key={field}>
                <label className="font-semibold text-gray-700 mb-1 block capitalize">
                  {field}
                </label>
                <input
                  name={field}
                  value={(lab as any)[field]}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full px-3 py-2.5 rounded-xl border outline-none transition ${
                    isEditing
                      ? "border-gray-300 focus:border-[#0C213E] focus:ring-2 focus:ring-[#0C213E]/20"
                      : "bg-gray-100 border-gray-200 cursor-default"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* BUTTONS */}
        {isEditing && (
          <div className="mt-6 flex gap-4">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="flex-1 bg-gray-200 py-2.5 rounded-xl font-semibold hover:bg-gray-300 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-[#0C213E] text-white py-2.5 rounded-xl font-semibold hover:opacity-90 transition flex items-center justify-center gap-2"
            >
              {saving ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Save
                </>
              )}
            </button>
          </div>
        )}
      </form>

      {/* NOTIFICATION */}
      {notification && (
        <div
          className={`fixed bottom-6 right-6 px-4 py-3 rounded-lg text-white flex items-center gap-3 shadow-lg ${
            notification.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {notification.type === "success" ? (
            <CheckCircle2 className="w-5 h-5" />
          ) : (
            <AlertCircle className="w-5 h-5" />
          )}
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default LabProfile;
