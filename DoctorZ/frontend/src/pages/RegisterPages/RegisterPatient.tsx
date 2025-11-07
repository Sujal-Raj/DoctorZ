// src/pages/RegisterPatient.tsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import { Upload, FileText } from "lucide-react";

type PatientFormInputs = {
  fullName: string;
  gender: string;
  dob: string;
  email: string;
  password: string;
  mobileNumber: string;
  aadhar: string;
  city: string;
  pincode: string;
  abhaId: string;
  emergencyName: string;
  emergencyNumber: string;
};

const RegisterPatient: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PatientFormInputs>();

  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [idFile, setIdFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [idPreview, setIdPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>,
    setPreview: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    const selectedFile = e.target.files?.[0];
    setFile(selectedFile || null);
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      setPreview(null);
    }
  };

  const onSubmit = async (data: PatientFormInputs) => {
    setLoading(true);
    try {
      const payload = new FormData();
      Object.entries(data).forEach(([k, v]) => payload.append(k, v));
      if (photoFile) payload.append("photo", photoFile);
      if (idFile) payload.append("idProof", idFile);

      const res = await fetch("http://localhost:3000/api/patient/register", {
        method: "POST",
        body: payload,
      });

      const result = await res.json();
      Swal.fire({
        icon: "success",
        title: "Patient Registered!",
        text: "Registration successful.",
        confirmButtonColor: "#28328C",
      });
      reset();
      setPhotoFile(null);
      setIdFile(null);
      setPhotoPreview(null);
      setIdPreview(null);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Something went wrong during registration.",
        confirmButtonColor: "#28328C",
      });
    } finally {
      setLoading(false);
    }
  };

  const InputField = ({
    id,
    label,
    type = "text",
    placeholder,
    registerField,
    error,
  }: {
    id: string;
    label: string;
    type?: string;
    placeholder?: string;
    registerField: any;
    error?: string;
  }) => (
    <div className="relative">
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-gray-700 mb-1"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        {...registerField}
        className="w-full rounded-lg border border-gray-300 bg-white p-2.5 text-gray-800 shadow-sm focus:ring-2 focus:ring-[#28328C] focus:border-[#28328C] transition-all"
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Patient Registration | HealthCare Portal</title>
        <meta
          name="description"
          content="Register as a patient to access healthcare services, book appointments, and manage your health online."
        />
      </Helmet>

      <main className="min-h-screen bg-white flex items-center justify-center p-4">
        <section className="w-full max-w-5xl bg-white rounded-2xl shadow-lg border border-gray-300 p-6 md:p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-[#28328C]">
              🏥 Patient Registration
            </h1>
            <p className="mt-2 text-gray-600 text-sm md:text-base">
              Fill in the details below to register and access healthcare
              services.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800"
            encType="multipart/form-data"
          >
            {/* --- Basic Info --- */}
            <h2 className="md:col-span-2 text-lg font-semibold text-[#28328C] border-b border-[#28328C]/20 pb-2">
              Personal Information
            </h2>

            <InputField
              id="fullName"
              label="Full Name"
              placeholder="John Doe"
              registerField={register("fullName", {
                required: "Full name is required",
              })}
              error={errors.fullName?.message}
            />

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Gender
              </label>
              <select
                {...register("gender", { required: "Gender is required" })}
                className="w-full rounded-lg border border-gray-300 bg-white p-2.5 text-gray-800 shadow-sm focus:ring-2 focus:ring-[#28328C]"
              >
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.gender.message}
                </p>
              )}
            </div>

            <InputField
              id="dob"
              label="Date of Birth"
              type="date"
              registerField={register("dob", {
                required: "Date of Birth is required",
              })}
              error={errors.dob?.message}
            />

            <InputField
              id="email"
              label="Email"
              type="email"
              placeholder="example@email.com"
              registerField={register("email", {
                required: "Email is required",
              })}
              error={errors.email?.message}
            />

            <InputField
              id="password"
              label="Password"
              type="password"
              placeholder="••••••••"
              registerField={register("password", {
                required: "Password is required",
              })}
              error={errors.password?.message}
            />

            <InputField
              id="mobileNumber"
              label="Mobile Number"
              placeholder="9876543210"
              registerField={register("mobileNumber", {
                required: "Mobile number is required",
              })}
              error={errors.mobileNumber?.message}
            />

            <InputField
              id="aadhar"
              label="Aadhar Number"
              placeholder="123456789012"
              registerField={register("aadhar")}
            />
            <InputField
              id="city"
              label="City"
              placeholder="Delhi"
              registerField={register("city")}
            />
            <InputField
              id="pincode"
              label="Pincode"
              placeholder="110001"
              registerField={register("pincode")}
            />
            <InputField
              id="abhaId"
              label="ABHA ID"
              placeholder="ABHA12345"
              registerField={register("abhaId")}
            />

            {/* --- Emergency Contact --- */}
            <h2 className="md:col-span-2 text-lg font-semibold text-[#28328C] border-b border-[#28328C]/20 pt-4 pb-2">
              Emergency Contact
            </h2>

            <InputField
              id="emergencyName"
              label="Emergency Contact Name"
              placeholder="Jane Doe"
              registerField={register("emergencyName")}
            />
            <InputField
              id="emergencyNumber"
              label="Emergency Contact Number"
              placeholder="9876543210"
              registerField={register("emergencyNumber")}
            />

            {/* --- Upload Section --- */}
            <h2 className="md:col-span-2 text-lg font-semibold text-[#28328C] border-b border-[#28328C]/20 pt-4 pb-2">
              Upload Documents
            </h2>

            {[ 
              {
                label: "Profile Photo",
                file: photoFile,
                setFile: setPhotoFile,
                preview: photoPreview,
                setPreview: setPhotoPreview,
                accept: "image/*",
              },
              {
                label: "ID Proof (Aadhar/PAN)",
                file: idFile,
                setFile: setIdFile,
                preview: idPreview,
                setPreview: setIdPreview,
                accept: "image/*,application/pdf",
              },
            ].map((fileInput, idx) => (
              <div key={idx} className="md:col-span-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {fileInput.label}
                </label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center justify-center w-full h-28 border-2 border-dashed border-[#28328C]/40 rounded-lg cursor-pointer hover:bg-[#28328C]/5 transition">
                    <Upload className="text-[#28328C] mr-2" size={20} />
                    <span className="text-gray-600 text-sm">
                      {fileInput.file ? "Change File" : "Upload"}
                    </span>
                    <input
                      type="file"
                      accept={fileInput.accept}
                      className="hidden"
                      onChange={(e) =>
                        handleFileChange(
                          e,
                          fileInput.setFile,
                          fileInput.setPreview
                        )
                      }
                    />
                  </label>

                  {fileInput.file && (
                    <div className="border border-[#28328C]/30 rounded-lg p-2 bg-gray-50 shadow-sm flex items-center justify-center w-28 h-28">
                      {fileInput.preview ? (
                        <img
                          src={fileInput.preview}
                          alt="Preview"
                          className="object-cover w-full h-full rounded-md"
                        />
                      ) : (
                        <div className="flex flex-col items-center text-gray-600 text-xs text-center">
                          <FileText size={20} />
                          <p className="mt-1 truncate">{fileInput.file.name}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Submit Button */}
            <div className="md:col-span-2 text-center mt-6">
              <button
                type="submit"
                disabled={loading}
                className={`px-8 py-2.5 text-white text-base font-semibold rounded-lg shadow-md transition-all duration-300 ${
                  loading
                    ? "bg-[#3a49c9] cursor-not-allowed"
                    : "bg-[#28328C] hover:bg-[#1f2775] hover:scale-[1.02]"
                }`}
              >
                {loading ? "Submitting..." : "Register Patient"}
              </button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
};

export default RegisterPatient;
