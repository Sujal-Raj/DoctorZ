

import React, { useEffect, useState } from "react";
import axios from "axios";

interface Doctor {
  _id: string;
  fullName: string;
  specialization: string;
  qualification: string;
  password: string;
  experience: number;
  dob: string;
  consultationFee: number;
  language: string;
  MobileNo: string;
  email: string;
  MedicalRegistrationNumber: number;
  Aadhar: number;
  photo?: string;
  signature?: string;
  DegreeCertificate?: string;
}

const DoctorProfile: React.FC = () => {
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [editMode, setEditMode] = useState<boolean>(false);
  const [formData, setFormData] = useState<Partial<Doctor>>({});
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const token = localStorage.getItem("token");
        const doctorId = localStorage.getItem("doctorId");
        if (!doctorId) {
          setError("Doctor ID not found. Please login again.");
          setLoading(false);
          return;
        }

        const res = await axios.get<{ doctor: Doctor }>(
          `http://localhost:3000/api/doctor/${doctorId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setDoctor(res.data.doctor);
        setFormData(res.data.doctor);
      } catch (err) {
        setError(err + " Failed to fetch doctor details");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      if (!doctor?._id) return;
      const res = await axios.put<{ doctor: Doctor }>(
        `http://localhost:3000/api/doctor/update/${doctor._id}`,
        formData
      );
      alert("Profile updated successfully ✅");
      setDoctor(res.data.doctor);
      setEditMode(false);
    } catch (err) {
      alert(err + " Failed to update profile ❌");
    }
  };

  const handleDelete = async () => {
    try {
      if (!doctor?._id) return;
      await axios.delete(`http://localhost:3000/api/doctor/delete/${doctor._id}`);
      alert("Doctor profile deleted ❌");
      localStorage.removeItem("doctorId");
      localStorage.removeItem("token");
      window.location.href = "/";
    } catch (err) {
      alert(err + " Failed to delete doctor ❌");
    }
  };

  if (loading) return <p className="text-center text-lg">Loading profile...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!doctor) return <p className="text-center">Doctor not found</p>;

  const inputClass =
    "bg-transparent border-0 outline-none w-full text-gray-900 placeholder-gray-400 focus:underline focus:underline-offset-2 focus:text-blue-600";

  const smallInputClass =
    "bg-transparent border-0 outline-none w-full text-gray-700 placeholder-gray-400 text-sm focus:underline focus:underline-offset-2 focus:text-blue-600";

  return (
    <div className="max-w-6xl w-full ml-6 p-4 sm:p-6 bg-white rounded-xl shadow-lg border flex flex-col lg:flex-row items-center lg:items-start gap-8">
      {/* Profile Image */}
      <div className="flex-shrink-0 w-full sm:w-80 md:w-96 flex justify-center">
        {doctor.photo ? (
          <img
            src={`http://localhost:3000/uploads/${doctor.photo}`}
            alt={doctor.fullName}
            className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 object-cover rounded-xl shadow-md"
          />
        ) : (
          <div className="w-48 h-48 sm:w-64 sm:h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
            No Photo
          </div>
        )}
      </div>

      {/* Profile Details */}
      <div className="flex-1 w-full">
        {/* Action Buttons */}
        <div className="flex justify-end gap-2 mb-4 flex-wrap">
          <button
            onClick={() => {
              if (editMode) {
                setFormData(doctor);
                setEditMode(false);
              } else {
                setEditMode(true);
              }
            }}
            className="bg-yellow-500 text-white px-3 py-1.5 rounded-md hover:bg-yellow-600 transition text-sm"
          >
            {editMode ? "Cancel" : "Edit"}
          </button>
          <button
            onClick={() => setShowConfirm(true)}
            className="bg-red-600 text-white px-3 py-1.5 rounded-md hover:bg-red-700 transition text-sm"
          >
            Delete
          </button>
        </div>

        {/* Name and Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-1 text-center sm:text-left">
          {editMode ? (
            <input
              type="text"
              name="fullName"
              value={formData.fullName || ""}
              onChange={handleChange}
              className={inputClass}
              placeholder="Full Name"
            />
          ) : (
            doctor.fullName
          )}
        </h1>
        <h2 className="text-lg sm:text-xl font-semibold text-blue-600 mb-4 text-center sm:text-left">
          {editMode ? (
            <input
              type="text"
              name="specialization"
              value={formData.specialization || ""}
              onChange={handleChange}
              className={inputClass}
              placeholder="Specialization"
            />
          ) : (
            doctor.specialization
          )}
        </h2>

        {/* Info Grid */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700 text-sm">
          {[
            ["dob", "DOB", new Date(formData.dob || doctor.dob).toLocaleDateString()],
            ["qualification", "Qualification", formData.qualification || doctor.qualification],
            ["experience", "Experience", (formData.experience ?? doctor.experience) + "+ years"],
            ["consultationFee", "Consultation Fee", "₹" + (formData.consultationFee ?? doctor.consultationFee)],
            ["language", "Languages", formData.language || doctor.language],
            ["MedicalRegistrationNumber", "Registration No", formData.MedicalRegistrationNumber ?? doctor.MedicalRegistrationNumber],
            ["Aadhar", "Aadhar", formData.Aadhar ?? doctor.Aadhar],
          ].map(([field, label, value]) => (
            <p key={field}>
              <span className="font-semibold">{label}:</span>{" "}
              {editMode ? (
                <input
                  type={
                    field === "dob"
                      ? "date"
                      : ["experience", "consultationFee", "MedicalRegistrationNumber", "Aadhar"].includes(
                          field as string
                        )
                      ? "number"
                      : "text"
                  }
                  name={String(field)}
                  value={formData[field as keyof Doctor] ?? doctor[field as keyof Doctor]}
                  onChange={handleChange}
                  className={smallInputClass}
                  placeholder={label as string}
                />
              ) : (
                value
              )}
            </p>
          ))}
        </div>

        {/* Contact Info */}
        <div className="mt-6 bg-gray-50 p-4 rounded-lg flex flex-col sm:flex-row items-center sm:items-start gap-4 border border-gray-200">
          <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">
            +
          </div>
          <div className="flex-1 text-center sm:text-left">
            <p className="text-blue-800 font-semibold text-sm">Consultation Contact</p>
            {editMode ? (
              <>
                <input
                  type="text"
                  name="MobileNo"
                  value={formData.MobileNo || ""}
                  onChange={handleChange}
                  className={smallInputClass + " mt-1"}
                  placeholder="Mobile Number"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email || ""}
                  onChange={handleChange}
                  className={smallInputClass + " mt-1"}
                  placeholder="Email"
                />
              </>
            ) : (
              <>
                <p className="text-gray-700 text-sm">📞 {doctor.MobileNo}</p>
                <p className="text-gray-600 text-xs">{doctor.email}</p>
              </>
            )}
          </div>
        </div>

        {/* Degree & Signature */}
        <div className="mt-8 flex flex-col sm:flex-row gap-6 items-center justify-center sm:justify-start">
          {doctor.signature && (
            <div className="flex flex-col items-center">
              <p className="font-semibold mb-2 text-gray-700 text-sm">Digital Signature</p>
              <img
                src={`http://localhost:3000/uploads/${doctor.signature}`}
                alt="Signature"
                className="w-40 sm:w-56 h-20 object-contain border-b-2 border-gray-400"
              />
            </div>
          )}
          {doctor.DegreeCertificate && (
            <a
              href={`http://localhost:3000/uploads/${doctor.DegreeCertificate}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm"
            >
              🎓 View Degree Certificate
            </a>
          )}
        </div>

        {/* Save Button */}
        {editMode && (
          <div className="flex justify-center mt-6">
            <button
              onClick={handleUpdate}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Save Changes
            </button>
          </div>
        )}

        {/* Delete Confirmation */}
        {showConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
              <p className="text-lg font-semibold mb-4">
                Are you sure you want to delete your profile?
              </p>
              <div className="flex justify-around">
                <button
                  onClick={handleDelete}
                  className="bg-red-600 text-white px-4 py-1 rounded-lg hover:bg-red-700"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={() => setShowConfirm(false)}
                  className="bg-gray-400 text-white px-4 py-1 rounded-lg hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorProfile;
