
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../Services/mainApi";

// ✅ Strong Types
interface Address {
  city?: string;
  pincode?: number;
}

interface EmergencyContact {
  name?: string;
  number?: number;
}

export interface User {
  fullName: string;
  gender: string;
  dob: string;
  email: string;
  mobileNumber: number;
  aadhar: number;
  address: Address;
  abhaId?: string;
  emergencyContact: EmergencyContact;
}

interface UserResponse {
  message: string;
  user: User;
}

const fields: {
  key:
    | keyof User
    | "address.city"
    | "address.pincode"
    | "emergencyContact.name"
    | "emergencyContact.number";
  label: string;
}[] = [
  { key: "fullName", label: "Full Name" },
  { key: "gender", label: "Gender" },
  { key: "dob", label: "Date of Birth" },
  { key: "email", label: "Email" },
  { key: "mobileNumber", label: "Mobile Number" },
  { key: "aadhar", label: "Aadhar Number" },
  { key: "address.city", label: "City" },
  { key: "address.pincode", label: "Pincode" },
  { key: "abhaId", label: "ABHA ID" },
  { key: "emergencyContact.name", label: "Emergency Contact Name" },
  { key: "emergencyContact.number", label: "Emergency Contact Number" },
];

// ✅ Type Safe value extractor
const getValue = (obj: User, path: string): string | number | undefined => {
  return path.split(".").reduce((acc: any, key) => acc?.[key], obj);
};

function UserProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<User | null>(null);

  const { id } = useParams();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get<UserResponse>(
          `/api/patient/${id}`
        );
        setUser(res.data.user);
       
      } catch (err) {
        console.error("Profile fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchUser();
  }, [userId, id]);
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editData) return;

    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      const key = name.split(".")[1] as keyof Address;
      setEditData({
        ...editData,
        address: {
          ...editData.address,
          [key]: key === "pincode" ? Number(value) : value,
        },
      });
    } else if (name.startsWith("emergencyContact.")) {
      const key = name.split(".")[1] as keyof EmergencyContact;
      setEditData({
        ...editData,
        emergencyContact: {
          ...editData.emergencyContact,
          [key]: key === "number" ? Number(value) : value,
        },
      });
    } else {
      const key = name as keyof User;
      const finalValue =
        key === "mobileNumber" || key === "aadhar" ? Number(value) : value;

      setEditData({
        ...editData,
        [key]: finalValue,
      });
    }
  };

  const handleSave = async () => {
    try {
      const res = await api.put<{ message: string; user: User }>(
        `/api/patient/update/${id}`,
        editData
      );
      alert("Profile Updated Successfully!");
      setUser(res.data.user);
      setIsEditing(false);
    } catch (err) {
      console.error("Update error:", err);
      alert("Update failed!");
    }
  };

  if (loading)
    return <div className="text-center text-gray-500 mt-8">Loading...</div>;

  if (!user)
    return (
      <div className="text-center text-red-500 mt-8">User Not Found.</div>
    );

  return (
    <div className="max-w-5xl mx-auto bg-white  p-10 shadow-lg">
      
      {/* ✅ HEADER */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">User Profile</h1>
          <p className="text-gray-500">{user.email}</p>
        </div>

        {!isEditing && (
          <button
            onClick={() => {
              setEditData(user);
              setIsEditing(true);
            }}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
          >
            Edit
          </button>
        )}
      </div>

      {/* ✅ FORM GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {fields.map(({ key, label }) => {
          const value = isEditing
            ? getValue(editData!, key)
            : getValue(user!, key);

          return (
            <div key={key} className="flex flex-col">
              <label className="text-sm text-gray-500 mb-1">{label}</label>

              {isEditing ? (
                <input
                  type="text"
                  name={key}
                  value={value ?? ""}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-400 outline-none transition"
                />
              ) : (
                <div className="w-full px-4 py-3 rounded-xl bg-gray-100 text-gray-700">
                  {value ?? "-"}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ✅ SAVE / CANCEL */}
      {isEditing && (
        <div className="flex gap-4 mt-10">
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl"
          >
            Save
          </button>

          <button
            onClick={() => setIsEditing(false)}
            className="px-6 py-3 bg-gray-400 hover:bg-gray-500 text-white rounded-xl"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
