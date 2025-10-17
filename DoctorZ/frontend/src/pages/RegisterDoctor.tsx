import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import * as jwt_decode from "jwt-decode";
import api from "../Services/client";
import { useOutletContext } from "react-router-dom";
type DoctorFormInputs = {
  fullName: string;
    email:string;
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
   password:string;
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
  const clinicId = context?.clinicId || null; // safe access
  console.log("Clinic ID in RegisterDoctor:", clinicId);
 
 


  // Files in state
  const [degreeFile, setDegreeFile] = useState<File | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [signatureFile, setSignatureFile] = useState<File | null>(null);

  // filenames for display
  const [degreeName, setDegreeName] = useState("No file selected");
  const [photoName, setPhotoName] = useState("No file selected");
  const [sigName, setSigName] = useState("No file selected");

  const onSubmit = async (data: DoctorFormInputs) => {
    const formData = new FormData();
    formData.append("fullName", data.fullName);
     formData.append("email",data.email);
    formData.append("gender", data.gender);
    formData.append("dob", data.dob);
    formData.append("regNumber", data.regNumber);
    formData.append("qualification", data.qualification);
    formData.append("experience", data.experience);
    formData.append("fees", data.fees);
    formData.append("languages", data.languages);
    formData.append("aadhar", data.aadhar);
    formData.append("pan", data.pan);
    formData.append("specialization", data.specialization);
    formData.append("mobileNo", data.mobileNo);
      formData.append("password",data.password);
    if(clinicId) formData.append("clinicId", clinicId);
    if (degreeFile) formData.append("degreeCert", degreeFile);
    if (photoFile) formData.append("photo", photoFile);
    if (signatureFile) formData.append("signature", signatureFile);

   try {
    const result = await registerDoctor(formData);
    console.log('Doctor Registered:', result);
    alert('Doctor registered successfully!');
  } catch (err) {
    alert('Something went wrong!');
  }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-100 p-6">
      <div className="w-full max-w-4xl bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          👨‍⚕️ Doctor Registration
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 font-medium">Full Name</label>
            <input
              {...register("fullName", { required: "Full name is required" })}
              className="mt-2 w-full rounded-xl border border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-blue-400"
              placeholder="Dr. John Doe"
            />
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
          </div>

          {/* Gender */}
          <div>
            <label className="block text-gray-700 font-medium">Gender</label>
            <select
              {...register("gender", { required: "Gender is required" })}
              className="mt-2 w-full rounded-xl border border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>}
          </div>
          

          {/* password */}
          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <input type="password"
              {...register("password", { required: "Full name is required" })}
              className="mt-2 w-full rounded-xl border border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-blue-400"
              
            />
            {errors.password&& <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {/* DOB */}
          <div>
            <label className="block text-gray-700 font-medium">Date of Birth</label>
            <input
              type="date"
              {...register("dob", { required: "Date of Birth is required" })}
              className="mt-2 w-full rounded-xl border border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-blue-400"
            />
            {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob.message}</p>}
          </div>

            {/* email */}
        <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              {...register("email", { required: "Full name is required" })}
              className="mt-2 w-full rounded-xl border border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-blue-400"
              placeholder="john@gmail.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Medical Reg Number */}
          <div>
            <label className="block text-gray-700 font-medium">Medical Registration Number</label>
            <input
              {...register("regNumber", { required: "Registration number is required" })}
              className="mt-2 w-full rounded-xl border border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-blue-400"
              placeholder="MED123456"
            />
            {errors.regNumber && <p className="text-red-500 text-sm mt-1">{errors.regNumber.message}</p>}
          </div>

          {/* Qualification */}
          <div>
            <label className="block text-gray-700 font-medium">Qualification</label>
            <input
              {...register("qualification", { required: "Qualification is required" })}
              className="mt-2 w-full rounded-xl border border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-blue-400"
              placeholder="MBBS, MD"
            />
            {errors.qualification && <p className="text-red-500 text-sm mt-1">{errors.qualification.message}</p>}
          </div>

          {/* Specialization */}
          <div>
            <label className="block text-gray-700 font-medium">Specialization</label>
            <input
              {...register("specialization", { required: "Specialization is required" })}
              className="mt-2 w-full rounded-xl border border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-blue-400"
              placeholder="Dermatology"
            />
            {errors.specialization && <p className="text-red-500 text-sm mt-1">{errors.specialization.message}</p>}
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-gray-700 font-medium">Mobile Number</label>
            <input
              {...register("mobileNo", { required: "Mobile number is required" })}
              className="mt-2 w-full rounded-xl border border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-blue-400"
              placeholder="9876543210"
            />
            {errors.mobileNo && <p className="text-red-500 text-sm mt-1">{errors.mobileNo.message}</p>}
          </div>

          {/* Experience */}
          <div>
            <label className="block text-gray-700 font-medium">Experience (Years)</label>
            <input
              type="number"
              {...register("experience", { required: "Experience is required" })}
              className="mt-2 w-full rounded-xl border border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-blue-400"
              placeholder="10"
            />
            {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience.message}</p>}
          </div>

          {/* Fees */}
          <div>
            <label className="block text-gray-700 font-medium">Consultation Fees</label>
            <input
              type="number"
              {...register("fees", { required: "Fees is required" })}
              className="mt-2 w-full rounded-xl border border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-blue-400"
              placeholder="500"
            />
            {errors.fees && <p className="text-red-500 text-sm mt-1">{errors.fees.message}</p>}
          </div>

          {/* Languages */}
          <div>
            <label className="block text-gray-700 font-medium">Languages Known</label>
            <input
              {...register("languages")}
              className="mt-2 w-full rounded-xl border border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-blue-400"
              placeholder="English, Hindi"
            />
          </div>

          {/* Aadhar */}
          <div>
            <label className="block text-gray-700 font-medium">Aadhar No</label>
            <input
              {...register("aadhar")}
              className="mt-2 w-full rounded-xl border border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-blue-400"
              placeholder="123456789012"
            />
          </div>

          {/* PAN */}
          <div>
            <label className="block text-gray-700 font-medium">PAN No</label>
            <input
              {...register("pan")}
              className="mt-2 w-full rounded-xl border border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-blue-400"
              placeholder="ABCDE1234F"
            />
          </div>

          {/* Degree Certificate */}
          <div>
            <label className="block text-gray-700 font-medium">Degree Certificate</label>
            <label className="mt-2 flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white rounded-xl shadow-md cursor-pointer hover:bg-blue-700 transition-all">
              Upload File
              <input
                type="file"
                accept="image/*,application/pdf"
                className="hidden"
                onChange={(e) => {
                  setDegreeFile(e.target.files?.[0] || null);
                  setDegreeName(e.target.files?.[0]?.name || "No file selected");
                }}
              />
            </label>
            <p className="mt-2 text-sm text-gray-500">{degreeName}</p>
          </div>

          {/* Photo */}
          <div>
            <label className="block text-gray-700 font-medium">Recent Photo</label>
            <label className="mt-2 flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white rounded-xl shadow-md cursor-pointer hover:bg-blue-700 transition-all">
              Upload Photo
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  setPhotoFile(e.target.files?.[0] || null);
                  setPhotoName(e.target.files?.[0]?.name || "No file selected");
                }}
              />
            </label>
            <p className="mt-2 text-sm text-gray-500">{photoName}</p>
          </div>

          {/* Signature */}
          <div>
            <label className="block text-gray-700 font-medium">Signature</label>
            <label className="mt-2 flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white rounded-xl shadow-md cursor-pointer hover:bg-blue-700 transition-all">
              Upload Signature
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  setSignatureFile(e.target.files?.[0] || null);
                  setSigName(e.target.files?.[0]?.name || "No file selected");
                }}
              />
            </label>
            <p className="mt-2 text-sm text-gray-500">{sigName}</p>
          </div>

          {/* Submit Button */}
          <div className="col-span-2 mt-6 text-center">
            <button
              type="submit"
              className="px-6 py-3 bg-green-600 text-white font-semibold rounded-xl shadow-lg hover:bg-green-700 transition-all"
            >
              Register Doctor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterDoctor;
