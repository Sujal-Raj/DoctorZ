// import React, { useEffect, useState } from "react";
// import axios from "axios";

// // ✅ Define your User type
// interface User {
//   fullName: string;
//   gender: string;
//   dob: string;
//   email: string;
//   mobileNumber: number;
//   Aadhar: number;
//   address?: {
//     city?: string;
//     pincode?: number;
//   };
//   abhaId?: string;
//   emergencyContact?: {
//     name?: string;
//     number?: number;
//   };
// }

// // ✅ Define API response type
// interface UserResponse {
//   message: string;
//   user: User;
// }

// function UserProfile() {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);
//   const userId = localStorage.getItem("userId");

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         // ✅ Tell axios what type we expect
//         const res = await axios.get<UserResponse>(
//           `http://localhost:3000/api/patient/${userId}`
//         );

//         setUser(res.data.user);
//       } catch (err) {
//         console.error("Error fetching user profile:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (userId) fetchUserProfile();
//   }, [userId]);

//   if (loading) return <div className="text-center mt-10">Loading profile...</div>;
//   if (!user) return <div className="text-center mt-10 text-red-500">User not found.</div>;

//   return (
//     <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-md">
//       <h2 className="text-2xl font-bold mb-6 text-gray-800">User Profile</h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
//         <p><strong>Full Name:</strong> {user.fullName}</p>
//         <p><strong>Gender:</strong> {user.gender}</p>
//         <p><strong>Date of Birth:</strong> {new Date(user.dob).toLocaleDateString()}</p>
//         <p><strong>Email:</strong> {user.email}</p>
//         <p><strong>Mobile:</strong> {user.mobileNumber}</p>
//         <p><strong>Aadhar:</strong> {user.Aadhar}</p>
//         <p><strong>City:</strong> {user.address?.city}</p>
//         <p><strong>Pincode:</strong> {user.address?.pincode}</p>
//         <p><strong>ABHA ID:</strong> {user.abhaId}</p>
//         <p><strong>Emergency Contact:</strong> {user.emergencyContact?.name} ({user.emergencyContact?.number})</p>
//       </div>
//     </div>
//   );
// }

// export default UserProfile;

import React, { useEffect, useState } from "react";
import axios from "axios";
import EMR from "../pages/EMR";

interface User {
  fullName: string;
  gender: string;
  dob: string;
  email: string;
  mobileNumber: number;
  Aadhar: number;
  address?: {
    city?: string;
    pincode?: number;
  };
  abhaId?: string;
  emergencyContact?: {
    name?: string;
    number?: number;
  };
}

interface UserResponse {
  message: string;
  user: User;
}

function UserProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<User | null>(null);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get<UserResponse>(
          `http://localhost:3000/api/patient/${userId}`
        );
        setUser(res.data.user);
      } catch (err) {
        console.error("Error fetching user profile:", err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchUserProfile();
  }, [userId]);

  const handleEditClick = () => {
    setEditData(user);
    setIsEditing(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editData) return;
    const { name, value } = e.target;

    // Nested fields handle
    if (name.startsWith("address.")) {
      const key = name.split(".")[1];
      setEditData({
        ...editData,
        address: { ...editData.address, [key]: value },
      });
    } else if (name.startsWith("emergencyContact.")) {
      const key = name.split(".")[1];
      setEditData({
        ...editData,
        emergencyContact: { ...editData.emergencyContact, [key]: value },
      });
    } else {
      setEditData({ ...editData, [name]: value });
    }
  };

  const handleSave = async () => {
    try {
      const res = await axios.put<{ message: string; user: User }>(
        `http://localhost:3000/api/patient/update/${userId}`,
        editData
      );
      alert("Profile updated successfully!");
      setUser(res.data.user);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile!");
    }
  };

  if (loading)
    return <div className="text-center mt-10">Loading profile...</div>;
  if (!user)
    return (
      <div className="text-center mt-10 text-red-500">User not found.</div>
    );

  return (
      <>
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">User Profile</h2>

        {!isEditing && (
          <button
            onClick={handleEditClick}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Edit
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
        {Object.entries({
          fullName: "Full Name",
          gender: "Gender",
          dob: "Date of Birth",
          email: "Email",
          mobileNumber: "Mobile",
          Aadhar: "Aadhar",
          "address.city": "City",
          "address.pincode": "Pincode",
          abhaId: "ABHA ID",
          "emergencyContact.name": "Emergency Contact Name",
          "emergencyContact.number": "Emergency Contact Number",
        }).map(([key, label]) => {
          const value = key.split(".").reduce<unknown>(
            (obj, k) => {
              if (obj && typeof obj === "object" && k in obj) {
                return (obj as Record<string, unknown>)[k];
              }
              return undefined;
            },
            isEditing ? editData : user
          );

          return (
            <div key={key}>
              <strong>{label}:</strong>{" "}
              {isEditing ? (
                <input
                  type="text"
                  name={key}
                    value={typeof value === "string" || typeof value === "number" ? value : ""}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md px-2 py-1 w-full mt-1"
                />
              ) : (
                   <span>{String(value ?? "-")}</span> 
              )}
            </div>
          );
        })}
      </div>

      {isEditing && (
        <div className="flex gap-4 mt-6">
          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
          >
            Cancel
          </button>
        </div>
      )}
    </div>

      <EMR />
      </>
     
  );
}

export default UserProfile;
