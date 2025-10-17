import { useEffect, useState } from "react";
import axios from "axios";
import { useOutletContext } from "react-router-dom";

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
  message: string;
}

interface UpdateLabResponse {
  lab: Lab;
  message: string;
}

const LabProfile = () => {
  const outletContext = useOutletContext<LabDashboardContext>();
  const contextLabId = outletContext.labId;

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

  const [loading, setLoading] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");

  // ✅ Fetch Lab Profile
  useEffect(() => {
    if (!contextLabId) return;

    const fetchLab = async () => {
      setLoading(true);
      try {
        const res = await axios.get<GetLabResponse>(
          `http://localhost:3000/api/lab/getLabById/${contextLabId}`
        );
        if (res.data.labDetails) {
          setLab(res.data.labDetails);
        }
      } catch (err) {
        console.error("Error fetching lab:", err);
        alert("Failed to load lab data");
      } finally {
        setLoading(false);
      }
    };

    fetchLab();
  }, [contextLabId]);

  // ✅ Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "password") {
      setPasswordInput(value);
    } else {
      setLab((prevLab) => ({
        ...prevLab,
        [name]: value,
      }));
    }
  };

  // ✅ Save Changes
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!contextLabId) {
      alert("Lab ID not found in context!");
      return;
    }

    try {
      const payload = {
        ...lab,
        ...(passwordInput ? { password: passwordInput } : {}),
      };

      const res = await axios.put<UpdateLabResponse>(
        `http://localhost:3000/api/lab/updateLabProfile/${contextLabId}`,
        payload
      );

      alert("Profile updated successfully!");
      setLab(res.data.lab);
      setPasswordInput(""); // Clear password field after update
    } catch (err) {
      console.error("Error updating lab:", err);
      alert("Failed to update profile!");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Lab Profile</h2>

      {loading ? (
        <p>Loading profile...</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">

          {/* Editable Lab ID */}
          <div className="flex flex-col">
            <label htmlFor="labId" className="text-sm font-medium text-gray-700 mb-1">
              Lab ID
            </label>
            <input
              id="labId"
              name="labId"
              value={lab.labId}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Lab ID"
            />
          </div>

          {/* Input Fields */}
          {[
            { label: "Lab Name", name: "name" },
            { label: "Email", name: "email" },
            { label: "Address", name: "address" },
            { label: "City", name: "city" },
            { label: "State", name: "state" },
            { label: "Pincode", name: "pincode" },
          ].map(({ label, name }) => (
            <div key={name} className="flex flex-col">
              <label htmlFor={name} className="text-sm font-medium text-gray-700 mb-1">
                {label}
              </label>
              <input
                id={name}
                name={name}
                value={(lab as any)[name]}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={label}
              />
            </div>
          ))}

          {/* Password Field */}
          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={passwordInput}
              onChange={handleChange}
              placeholder="Enter new password"
              className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
          >
            Save Changes
          </button>
        </form>
      )}
    </div>
  );
};

export default LabProfile;
