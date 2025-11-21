import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../Services/mainApi";
import Swal from "sweetalert2";
import userIcon from "../../assets/UserIcon.png";
import { Camera } from "lucide-react";
//  Strong Types
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
  profilePhoto: string;
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
const getValue = (obj: any, path: string): string | number => {
  return (
    path
      .split(".")
      .reduce(
        (acc, key) => (acc && acc[key] !== undefined ? acc[key] : ""),
        obj
      ) || ""
  );
};

function UserProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<User | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { id } = useParams();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get<UserResponse>(`/api/patient/${id}`);
        let fetchedUser = res.data.user;

        // Check if address/emergencyContact are strings, then parse
        if (typeof fetchedUser.address === "string") {
          try {
            fetchedUser.address = JSON.parse(fetchedUser.address);
          } catch (e) {
            fetchedUser.address = { city: "", pincode: 0 };
          }
        }

        if (typeof fetchedUser.emergencyContact === "string") {
          try {
            fetchedUser.emergencyContact = JSON.parse(
              fetchedUser.emergencyContact
            );
          } catch (e) {
            fetchedUser.emergencyContact = { name: "", number: 0 };
          }
        }

        setUser(fetchedUser);
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
      const formData = new FormData();

      if (selectedFile) {
        formData.append("profilePhoto", selectedFile);
      }

      // Add other fields
      if (editData) {
        Object.entries(editData).forEach(([key, value]) => {
          if (typeof value !== "object") formData.append(key, String(value));
        });
        // Nested objects
        formData.append("address", JSON.stringify(editData.address));
        formData.append(
          "emergencyContact",
          JSON.stringify(editData.emergencyContact)
        );
      }

      const res = await api.put<UserResponse>(
        `/api/patient/update/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      let updatedUser = res.data.user;

      // Parse nested objects
      if (typeof updatedUser.address === "string") {
        try {
          updatedUser.address = JSON.parse(updatedUser.address);
        } catch {
          updatedUser.address = { city: "", pincode: 0 };
        }
      }

      if (typeof updatedUser.emergencyContact === "string") {
        try {
          updatedUser.emergencyContact = JSON.parse(
            updatedUser.emergencyContact
          );
        } catch {
          updatedUser.emergencyContact = { name: "", number: 0 };
        }
      }

      Swal.fire({ icon: "success", title: "Profile Updated Successfully" });
      setUser(updatedUser);
      setIsEditing(false);
      setSelectedFile(null);
    } catch (err) {
      console.error("Update error:", err);
      Swal.fire({ icon: "error", title: "Update failed" });
    }
  };

  if (loading)
    return <div className="text-center text-gray-500 mt-8">Loading...</div>;

  if (!user)
    return <div className="text-center text-red-500 mt-8">User Not Found.</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* LEFT PROFILE CARD */}

        <div
          className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center 
                w-full h-auto self-start"
        >
          <div className="relative w-48 h-48">
            <img
              src={
                selectedFile
                  ? URL.createObjectURL(selectedFile)
                  : user.profilePhoto
                  ? `http://localhost:3000${user.profilePhoto}`
                  : userIcon
              }
              alt="profile"
              className="w-50 h-50 object-cover rounded-full shadow-md"
            />

            {isEditing && (
              <>
                {/* Always visible edit icon */}
                <div className="absolute bottom-2 right-2 bg-blue-500 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer shadow-md">
                  <label htmlFor="profilePhotoInput" className="cursor-pointer">
                    <Camera className="text-white w-5 h-5" />
                  </label>
                </div>

                <input
                  id="profilePhotoInput"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setSelectedFile(e.target.files[0]);
                      setEditData(
                        (prev) =>
                          prev && {
                            ...prev,
                            profilePhoto: URL.createObjectURL(
                              e.target.files![0]
                            ),
                          }
                      );
                    }
                  }}
                  className="hidden"
                />
              </>
            )}
          </div>

          <div className="w-full  text-center p-3.5">
            <h2 className="text-lg font-semibold ">{user?.fullName}</h2>
            <p className="text-sm text-gray-900 truncate">{user?.email}</p>
          </div>

          {/* Save / Edit Button */}
          {!isEditing && (
            <button
              onClick={() => {
                setEditData({
                  ...user,
                  address: user.address || { city: "", pincode: 0 },
                  emergencyContact: user.emergencyContact || {
                    name: "",
                    number: 0,
                  },
                });
                setIsEditing(true);
              }}
              className="mt-6 px-5 py-3 rounded-full bg-blue-500 text-white font-medium shadow hover:scale-105 transition cursor-pointer"
            >
              Edit Profile
            </button>
          )}
        </div>

        {/* RIGHT DETAILS CARD */}
        <div className="md:col-span-2 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">
            Personal Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fields.map(({ key, label }) => {
              const value = isEditing
                ? getValue(editData!, key)
                : getValue(user!, key);

              return (
                <div key={key} className="flex flex-col gap-1">
                  <span className="text-sm text-gray-500">{label}</span>

                  {isEditing ? (
                    <input
                      type={
                        key === "dob"
                          ? "date"
                          : key === "address.pincode" ||
                            key === "emergencyContact.number"
                          ? "number"
                          : "text"
                      }
                      name={key}
                      value={
                        key === "dob"
                          ? new Date(String(value)).toISOString().split("T")[0]
                          : value ?? ""
                      }
                      onChange={handleChange}
                      className="w-full py-2 bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500 transition"
                    />
                  ) : (
                    <div className="py-2 text-gray-700 border-b border-gray-200">
                      {key === "dob"
                        ? new Date(String(value)).toLocaleDateString("en-GB")
                        : value ?? "-"}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {isEditing && (
            <div className="flex gap-4 mt-10">
              <button
                onClick={handleSave}
                className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700"
              >
                Save
              </button>

              <button
                onClick={() => setIsEditing(false)}
                className="px-6 py-3 bg-gray-400 text-white rounded-xl hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
