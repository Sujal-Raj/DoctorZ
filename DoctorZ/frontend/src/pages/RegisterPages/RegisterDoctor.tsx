
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { registerDoctor } from "../../Services/doctorApi";
import Cookies from "js-cookie";
import * as jwt_decode from "jwt-decode";
import api from "../Services/client";
import { useOutletContext } from "react-router-dom";

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
};

interface ClinicContext {
  clinicId?: string;
}

const RegisterDoctor: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DoctorFormInputs>();

  const context = useOutletContext<ClinicContext | null>();
  const clinicId = context?.clinicId || null;

  const [degreeFile, setDegreeFile] = useState<File | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [signatureFile, setSignatureFile] = useState<File | null>(null);

  const [degreeName, setDegreeName] = useState("No file selected");
  const [photoName, setPhotoName] = useState("No file selected");
  const [sigName, setSigName] = useState("No file selected");

  const onSubmit = async (data: DoctorFormInputs) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => formData.append(key, value));
    if (clinicId) formData.append("clinicId", clinicId);
    if (degreeFile) formData.append("degreeCert", degreeFile);
    if (photoFile) formData.append("photo", photoFile);
    if (signatureFile) formData.append("signature", signatureFile);

    try {
      const result = await registerDoctor(formData);
      console.log("Doctor Registered:", result);
      alert("Doctor registered successfully!");
    } catch {
      alert("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-start   overflow-hidden">
      <div className="w-full max-w-6xl bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10">
        <h2 className="text-2xl sm:text-3xl md:text-3xl font-bold text-center text-blue-700 mb-8">
          Doctor Registration
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* Text Inputs */}
          <FormInput label="Full Name" name="fullName" register={register} error={errors.fullName} placeholder="Dr. John Doe" />
          <SelectInput label="Gender" name="gender" register={register} error={errors.gender} />
          <FormInput label="Password" name="password" type="password" register={register} error={errors.password} placeholder="••••••••" />
          <FormInput label="Date of Birth" name="dob" type="date" register={register} error={errors.dob} />
          <FormInput label="Email" name="email" register={register} error={errors.email} placeholder="doctor@example.com" />
          <FormInput label="Medical Reg. Number" name="regNumber" register={register} error={errors.regNumber} placeholder="MED123456" />
          <FormInput label="Qualification" name="qualification" register={register} error={errors.qualification} placeholder="MBBS, MD" />
          <FormInput label="Specialization" name="specialization" register={register} error={errors.specialization} placeholder="Dermatology" />
          <FormInput label="Mobile No" name="mobileNo" register={register} error={errors.mobileNo} placeholder="9876543210" />
          <FormInput label="Experience (Years)" name="experience" type="number" register={register} error={errors.experience} placeholder="5" />
          <FormInput label="Consultation Fees" name="fees" type="number" register={register} error={errors.fees} placeholder="500" />
          <FormInput label="Languages Known" name="languages" register={register} placeholder="English, Hindi" />
          <FormInput label="Aadhar No" name="aadhar" register={register} placeholder="123456789012" />
          <FormInput label="PAN No" name="pan" register={register} placeholder="ABCDE1234F" />

          {/* File Uploads */}
          <FileUpload label="Degree Certificate" fileName={degreeName} setFile={setDegreeFile} setFileName={setDegreeName} accept="image/*,application/pdf" />
          <FileUpload label="Recent Photo" fileName={photoName} setFile={setPhotoFile} setFileName={setPhotoName} accept="image/*" />
          <FileUpload label="Signature" fileName={sigName} setFile={setSignatureFile} setFileName={setSigName} accept="image/*" />

          {/* Submit Button */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-3 mt-8 flex justify-center">
            <button
              type="submit"
              className="px-8 py-3 bg-green-600 text-white font-semibold rounded-xl shadow-md hover:bg-green-700 transition-all text-lg"
            >
              Register Doctor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

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

export default RegisterDoctor;
