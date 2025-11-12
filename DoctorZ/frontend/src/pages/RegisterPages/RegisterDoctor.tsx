
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import { useOutletContext } from "react-router-dom";
import { FileText, Upload } from "lucide-react";
import { registerDoctor } from "../../Services/doctorApi";
import Cookies from "js-cookie";
import * as jwt_decode from "jwt-decode";
import api from "../../Services/client";
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
  address: string;
  state: string;
  city: string;
};

interface ClinicContext {
  clinicId?: string;
}

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
        <title>Doctor Registration | Clinic Portal</title>
        <meta
          name="description"
          content="Register qualified doctors with verified credentials and complete profile details for your clinic."
        />
      </Helmet>

      <main className="min-h-screen bg-white flex items-center justify-center p-4">
        <section className="w-full max-w-5xl bg-white rounded-2xl shadow-lg border border-gray-300 p-6 md:p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-[#28328C]">
              🩺 Doctor Registration
            </h1>
            <p className="mt-2 text-gray-600 text-sm md:text-base">
              Fill in the details below to register a doctor under your clinic.
            </p>
          </div>

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
