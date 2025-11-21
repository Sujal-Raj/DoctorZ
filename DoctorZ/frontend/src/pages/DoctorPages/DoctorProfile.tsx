import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import api from "../../Services/mainApi";

const PRIMARY = "#0C213E";

interface Doctor {
  _id: string;
  fullName: string;
  specialization: string;
  qualification: string;
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
  const navigate = useNavigate();
  const storedDoctorId = localStorage.getItem("doctorId");

  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<Partial<Doctor>>({});
  const [showConfirm, setShowConfirm] = useState(false);

  // Login Credentials Edit Mode
  const [editCreds, setEditCreds] = useState(false);

  const [newDoctorId, setNewDoctorId] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [updatingCreds, setUpdatingCreds] = useState(false);

  // FETCH PROFILE
  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await api.get<{ doctor: Doctor }>(
          `/api/doctor/${storedDoctorId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setDoctor(res.data.doctor);
        setFormData(res.data.doctor);
      } catch {
        toast.error("Failed to load doctor data");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, []);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // UPDATE PROFILE DETAILS
  const handleProfileUpdate = async () => {
    try {
      await api.put(`/api/doctor/update/${doctor?._id}`, formData);
      alert("Profile Updated Successfully!");
      setEditMode(false);
    } catch {
      toast.error("Update failed");
    }
  };

  // DELETE DOCTOR
  const handleDelete = async () => {
    try {
      await api.delete(`/api/doctor/delete/${doctor?._id}`);

      localStorage.removeItem("doctorId");
      localStorage.removeItem("token");
      navigate("/");
    } catch {
      toast.error("Delete failed");
    }
  };

  // UPDATE LOGIN CREDENTIALS
  const handleCredUpdate = async (e: any) => {
    e.preventDefault();
    setUpdatingCreds(true);

    try {
      await api.put(`/api/doctor/updateCreds/${storedDoctorId}`, {
        doctorId: newDoctorId,
        password: newPassword,
      });

      toast.success("Login Credentials Updated Successfully!");

      setNewDoctorId("");
      setNewPassword("");
      setEditCreds(false);
      navigate(`/doctordashboard/${storedDoctorId}`);
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || "Failed to update login credentials"
      );
    } finally {
      setUpdatingCreds(false);
    }
  };
  const formatDMY = (dateString: string | undefined) => {
    if (!dateString) return "";
    const d = new Date(dateString);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  if (loading) return <p className="text-center p-8">Loading...</p>;

  const labelClass = "text-sm font-semibold text-gray-700";
  const inputClass =
    "w-full rounded-xl border border-gray-300 p-3 focus:border-[#0C213E] focus:ring-2 focus:ring-blue-200 transition";

  return (
    <>
      {/* TOAST */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2400,
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        }}
      />

      <Helmet>
        <title>Dr. {doctor?.fullName} | Profile</title>
      </Helmet>

      <div className="min-h-screen bg-gray-100 px-4 py-6 md:px-10">
        <div className="mx-auto max-w-20xl">
          {/* PROFILE TOP COMPACT CARD */}
          <div
            className="rounded-2xl p-5 shadow-lg"
            style={{ backgroundColor: PRIMARY }}
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Photo */}
              <div className="h-28 w-28 rounded-xl border-4 border-white shadow-md overflow-hidden bg-gray-100">
                {doctor?.photo ? (
                  <img
                    src={`http://localhost:3000/uploads/${doctor.photo}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white">
                    No Photo
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="text-white flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold">{doctor?.fullName}</h3>
                <p className="mt-1 text-gray-300">{doctor?.specialization}</p>
                <p className="text-gray-300 text-sm">{doctor?.email}</p>
                <p className="text-gray-300 mt-1 text-sm">
                  Reg No: {doctor?.MedicalRegistrationNumber}
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 justify-end mt-5">
              <button
                onClick={() => setEditMode(!editMode)}
                className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg shadow text-sm"
              >
                {editMode ? "Cancel" : "Edit"}
              </button>

              <button
                onClick={() => setShowConfirm(true)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow text-sm"
              >
                Delete
              </button>
            </div>
          </div>

          {/* GRID */}
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT COLUMN */}
            <div className="lg:col-span-2 space-y-8">
              {/* Professional Info */}
              <div className="rounded-2xl bg-white p-6 shadow-md">
                <h3 className="text-xl font-bold mb-4" style={{ color: PRIMARY }}>
                  Professional Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {[
                    ["qualification", "Qualification"],
                    ["experience", "Experience (Years)"],
                    ["language", "Languages"],
                    ["consultationFee", "Consultation Fee"],
                    ["dob", "Date of Birth"],
                    ["Aadhar", "Aadhar Number"],
                  ].map(([field, label]) => (
                    <div key={field}>
                      <label className={labelClass}>{label}</label>
                      {editMode ? (
                        <input
                          name={field}
                          type={field === "dob" ? "text" : "text"}
                          value={
                            field === "dob"
                              ? formatDMY(formData.dob)
                              : (formData as any)[field]
                          }
                          onChange={handleChange}
                          className={inputClass}
                        />
                      ) : field === "dob" ? (
                        <p className="p-2 text-gray-700">
                          {formatDMY(formData.dob)}
                        </p>
                      ) : (
                        <p className="p-2 text-gray-700">
                          {(formData as any)[field]}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                {editMode && (
                  <button
                    onClick={handleProfileUpdate}
                    className="mt-6 w-full text-white py-3 rounded-xl shadow-md"
                    style={{ backgroundColor: PRIMARY }}
                  >
                    Save Profile Changes
                  </button>
                )}
              </div>

              {/* Certificates */}
              <div className="rounded-2xl bg-white p-6 shadow-md">
                <h3 className="text-xl font-bold mb-4" style={{ color: PRIMARY }}>
                  Certificates & Signature
                </h3>

                <div className="flex flex-wrap gap-10 items-end">
                  {doctor?.signature && (
                    <div>
                      <p className="font-semibold mb-2">Digital Signature</p>
                      <img
                        src={`http://localhost:3000/uploads/${doctor.signature}`}
                        className="w-40 border shadow"
                      />
                    </div>
                  )}

                  {doctor?.DegreeCertificate && (
                    <a
                      href={`http://localhost:3000/uploads/${doctor.DegreeCertificate}`}
                      target="_blank"
                      className="inline-block px-3 py-3 rounded-xl shadow-md text-white text-sm"
                      style={{ backgroundColor: PRIMARY }}
                    >
                      View Degree Certificate
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="space-y-8">
              {/* Contact Info */}
              <div className="rounded-2xl bg-white p-6 shadow-md">
                <h3 className="text-xl font-bold mb-5" style={{ color: PRIMARY }}>
                  Contact Information
                </h3>

                <label className={labelClass}>Phone Number</label>
                {editMode ? (
                  <input
                    name="MobileNo"
                    value={formData.MobileNo}
                    onChange={handleChange}
                    className={inputClass}
                  />
                ) : (
                  <p className="mt-1 text-gray-700">{doctor?.MobileNo}</p>
                )}

                <label className={`${labelClass} mt-4 block`}>Email</label>
                {editMode ? (
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClass}
                  />
                ) : (
                  <p className="mt-1 text-gray-700">{doctor?.email}</p>
                )}
              </div>

              {/* LOGIN CREDENTIALS */}
              <div className="rounded-2xl bg-white p-6 shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold" style={{ color: PRIMARY }}>
                    Update Login Credentials
                  </h3>

                  <button
                    type="button"
                    onClick={() => setEditCreds(!editCreds)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-1 rounded-lg shadow text-sm"
                  >
                    {editCreds ? "Cancel" : "Edit"}
                  </button>
                </div>

                <form onSubmit={handleCredUpdate} className="space-y-4">
                  {!editCreds && (
                    <p className="text-gray-500 text-sm">
                      Click Edit to update login credentials
                    </p>
                  )}

                  {editCreds && (
                    <>
                      <div>
                        <label className={labelClass}>New Doctor ID</label>
                        <input
                          type="text"
                          className={inputClass}
                          value={newDoctorId}
                          onChange={(e) => setNewDoctorId(e.target.value)}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>New Password</label>
                        <input
                          type="password"
                          className={inputClass}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={updatingCreds}
                        className="w-full text-white py-3 rounded-xl shadow-md text-sm"
                        style={{ backgroundColor: PRIMARY }}
                      >
                        {updatingCreds ? "Updating..." : "Update Credentials"}
                      </button>
                    </>
                  )}
                </form>
              </div>
            </div>
          </div>

          {/* DELETE CONFIRM MODAL */}
          {showConfirm && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="bg-white p-6 rounded-xl shadow-lg w-80 text-center">
                <p className="text-lg font-semibold mb-4">
                  Delete your profile permanently?
                </p>

                <div className="flex justify-between">
                  <button
                    onClick={handleDelete}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg shadow"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setShowConfirm(false)}
                    className="bg-gray-400 text-white px-4 py-2 rounded-lg shadow"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DoctorProfile;
