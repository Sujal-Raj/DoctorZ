
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import { useOutletContext } from "react-router-dom";

import { registerDoctor } from "../../Services/doctorApi";


type DoctorFormInputs = {
  fullName: string;
  email: string;
  gender: string;
  dob: string;
  regNumber: string;
  mobileNo: string;
  qualification: string;
  experience: string;
  fees: string;
  languages: string;
  aadhar: string;
  pan: string;
  specialization: string;
  password: string;
  address: string;
  state: string;
  city: string;
};

interface ClinicContext {
  clinicId?: string;
}

/* -------------------------- Reusable Inputs -------------------------- */
const FormInput = ({ label, name, register, error, placeholder, type = "text" }: any) => (
  <div className="flex flex-col">
    <label className="text-gray-700 font-medium">{label}</label>
    <input
      type={type}
      {...register(name, { required: `${label} is required` })}
      placeholder={placeholder}
      className="mt-2 w-full rounded-xl border border-gray-300 p-3 text-sm sm:text-base focus:ring-2 focus:ring-blue-400 shadow-sm"
    />
    {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
  </div>
);

const SelectInput = ({ label, name, register, error }: any) => (
  <div className="flex flex-col">
    <label className="text-gray-700 font-medium">{label}</label>
    <select
      {...register(name, { required: `${label} is required` })}
      className="mt-2 w-full rounded-xl border border-gray-300 p-3 text-sm sm:text-base focus:ring-2 focus:ring-blue-400 shadow-sm"
    >
      <option value="">Select Gender</option>
      <option>Male</option>
      <option>Female</option>
      <option>Other</option>
    </select>
    {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
  </div>
);

const FileUpload = ({ label, fileName, setFile, setFileName, accept }: any) => (
  <div className="flex flex-col">
    <label className="text-gray-700 font-medium">{label}</label>
    <label className="mt-2 flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white rounded-xl shadow-md cursor-pointer hover:bg-blue-700 transition-all text-sm sm:text-base">
      Upload File
      <input
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          setFile(file || null);
          setFileName(file?.name || "No file selected");
        }}
      />
    </label>
    <p className="mt-2 text-xs sm:text-sm text-gray-500 truncate">{fileName}</p>
  </div>
);

const RegisterDoctor: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DoctorFormInputs>();

  const context = useOutletContext<ClinicContext | null>();
  const clinicId = context?.clinicId || null;

  const [degreeFile, setDegreeFile] = useState<File | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [signatureFile, setSignatureFile] = useState<File | null>(null);

  const [degreePreview, setDegreePreview] = useState<string | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [sigPreview, setSigPreview] = useState<string | null>(null);

  const [degreeName, setDegreeName] = useState<string>("No file selected");
  const [photoName, setPhotoName] = useState<string>("No file selected");
  const [sigName, setSigName] = useState<string>("No file selected");

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: DoctorFormInputs) => {
    setLoading(true);
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => formData.append(key, value));
    if (clinicId) formData.append("clinicId", clinicId);
    if (degreeFile) formData.append("degreeCert", degreeFile);
    if (photoFile) formData.append("photo", photoFile);
    if (signatureFile) formData.append("signature", signatureFile);

    try {
      await registerDoctor(formData);
      Swal.fire({
        icon: "success",
        title: "Doctor Registered!",
        text: "Your details have been submitted for verification.",
        confirmButtonColor: "#28328C",
      });
      reset();
      setDegreeFile(null);
      setPhotoFile(null);
      setSignatureFile(null);
      setDegreePreview(null);
      setPhotoPreview(null);
      setSigPreview(null);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error?.response?.data?.message || "Something went wrong!",
        confirmButtonColor: "#28328C",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Helmet>
        <title>Register Doctor - DoctorZ</title>
      </Helmet>
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Doctor Registration</h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FormInput label="Full Name" name="fullName" register={register} error={errors.fullName} placeholder="Enter your full name" />
            <FormInput label="Email" name="email" register={register} error={errors.email} placeholder="Enter your email" type="email" />
            <SelectInput label="Gender" name="gender" register={register} error={errors.gender} />
            <FormInput label="Date of Birth" name="dob" register={register} error={errors.dob} type="date" />
            <FormInput label="Registration Number" name="regNumber" register={register} error={errors.regNumber} placeholder="Enter registration number" />
            <FormInput label="Mobile No" name="mobileNo" register={register} error={errors.mobileNo} placeholder="Enter mobile number" />
            <FormInput label="Qualification" name="qualification" register={register} error={errors.qualification} placeholder="Enter qualification" />
            <FormInput label="Experience (Years)" name="experience" register={register} error={errors.experience} placeholder="Enter years of experience" />
            <FormInput label="Consultation Fees" name="fees" register={register} error={errors.fees} placeholder="Enter consultation fees" />
            <FormInput label="Languages" name="languages" register={register} error={errors.languages} placeholder="Enter languages spoken" />
            <FormInput label="Aadhar" name="aadhar" register={register} error={errors.aadhar} placeholder="Enter aadhar number" />
            <FormInput label="PAN" name="pan" register={register} error={errors.pan} placeholder="Enter PAN" />
            <FormInput label="Specialization" name="specialization" register={register} error={errors.specialization} placeholder="Enter specialization" />
            <FormInput label="Password" name="password" register={register} error={errors.password} placeholder="Enter password" type="password" />
            <FormInput label="Address" name="address" register={register} error={errors.address} placeholder="Enter address" />
            <FormInput label="State" name="state" register={register} error={errors.state} placeholder="Enter state" />
            <FormInput label="City" name="city" register={register} error={errors.city} placeholder="Enter city" />
          </div>

          {/* File Uploads */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            <FileUpload label="Degree Certificate" fileName={degreeName} setFile={setDegreeFile} setFileName={setDegreeName} accept="image/*,application/pdf" />
            <FileUpload label="Recent Photo" fileName={photoName} setFile={setPhotoFile} setFileName={setPhotoName} accept="image/*" />
            <FileUpload label="Signature" fileName={sigName} setFile={setSignatureFile} setFileName={setSigName} accept="image/*" />
          </div>

          {/* Submit Button */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-3 mt-8 flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-green-600 text-white font-semibold rounded-xl shadow-md hover:bg-green-700 transition-all text-lg disabled:opacity-50"
            >
              {loading ? "Registering..." : "Register Doctor"}
            </button>
          </div>
        </form>
      </main>
    </>
  );
};

export default RegisterDoctor;

