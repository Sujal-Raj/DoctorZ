import { useEffect, useState } from "react";
import axios from "axios";
import { useOutletContext } from "react-router-dom";

interface Lab {
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
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
  const { labId } = useOutletContext<LabDashboardContext>();

  const [lab, setLab] = useState<Lab>({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [loading, setLoading] = useState(false);

  // ✅ Fetch Lab Profile
  useEffect(() => {
    if (!labId) return;

    const fetchLab = async () => {
      setLoading(true);
      try {
        const res = await axios.get<GetLabResponse>(
          `http://localhost:3000/api/lab/getLabById/${labId}`
        );
        if (res.data.labDetails) setLab(res.data.labDetails);
      } catch (err) {
        console.error("Error fetching lab:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLab();
  }, [labId]);

  // ✅ Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLab({ ...lab, [e.target.name]: e.target.value });
  };

  // ✅ Save Changes
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!labId) {
      alert("Lab ID not found!");
      return;
    }

    try {
      const res = await axios.put<UpdateLabResponse>(
        `http://localhost:3000/api/lab/updateLabProfile/${labId}`,
        lab
      );
      alert("Profile updated successfully!");
      setLab(res.data.lab);
    } catch (err) {
      console.error("Error updating lab:", err);
      alert("Failed to update profile!");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Lab Profile</h2>

      {loading ? (
        <p>Loading profile...</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
          <input
            name="name"
            value={lab.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Lab Name"
          />
          <input
            name="email"
            value={lab.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Email"
          />
          <input
            name="address"
            value={lab.address}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Address"
          />
          <input
            name="city"
            value={lab.city}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="City"
          />
          <input
            name="state"
            value={lab.state}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="State"
          />
          <input
            name="pincode"
            value={lab.pincode}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Pincode"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save Changes
          </button>
        </form>
      )}
    </div>
  );
};

export default LabProfile;