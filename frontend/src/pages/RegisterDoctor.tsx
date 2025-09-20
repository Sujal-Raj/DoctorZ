import React, { useState } from "react";
import { useForm } from "react-hook-form";

type DoctorFormInputs = {
  fullName: string;
  gender: string;
  dob: string;
  regNumber: string;
  qualification: string;
  experience: string;
  fees: string;
  languages: string;
  aadhar: string;
  pan: string;
  degreeCert?: FileList;
  photo?: FileList;
  signature?: FileList;
};

const RegisterDoctor: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DoctorFormInputs>();

  // local state for showing filenames
  const [degreeName, setDegreeName] = useState<string>("No file selected");
  const [photoName, setPhotoName] = useState<string>("No file selected");
  const [sigName, setSigName] = useState<string>("No file selected");

  const onSubmit = async (data: DoctorFormInputs) => {
    const formData = new FormData();
    formData.append("fullName", data.fullName || "");
    formData.append("gender", data.gender || "");
    formData.append("dob", data.dob || "");
    formData.append("regNumber", data.regNumber || "");
    formData.append("qualification", data.qualification || "");
    formData.append("experience", data.experience || "");
    formData.append("fees", data.fees || "");
    formData.append("languages", data.languages || "");
    formData.append("aadhar", data.aadhar || "");
    formData.append("pan", data.pan || "");

    if (data.degreeCert && data.degreeCert.length > 0) {
      formData.append("degreeCert", data.degreeCert[0]);
    }
    if (data.photo && data.photo.length > 0) {
      formData.append("photo", data.photo[0]);
    }
    if (data.signature && data.signature.length > 0) {
      formData.append("signature", data.signature[0]);
    }

    try {
      const res = await fetch("http://localhost:5000/api/doctors/register", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      console.log(" Doctor Registered:", result);
      alert("Doctor registered successfully!");
    } catch (err) {
      console.error(" Error:", err);
      alert("Something went wrong!");
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

          {/* Degree Certificate (styled upload) */}
          <div>
            <label className="block text-gray-700 font-medium">Degree Certificate</label>
            <label className="mt-2 flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white rounded-xl shadow-md cursor-pointer hover:bg-blue-700 transition-all">
              Upload File
              <input
                type="file"
                accept="image/*,application/pdf"
                {...register("degreeCert")}
                className="hidden"
                onChange={(e) => setDegreeName(e.target.files?.[0]?.name || "No file selected")}
              />
            </label>
            <p className="mt-2 text-sm text-gray-500">{degreeName}</p>
          </div>

          {/* Photo (styled upload) */}
          <div>
            <label className="block text-gray-700 font-medium">Recent Photo</label>
            <label className="mt-2 flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white rounded-xl shadow-md cursor-pointer hover:bg-blue-700 transition-all">
              Upload Photo
              <input
                type="file"
                accept="image/*"
                {...register("photo")}
                className="hidden"
                onChange={(e) => setPhotoName(e.target.files?.[0]?.name || "No file selected")}
              />
            </label>
            <p className="mt-2 text-sm text-gray-500">{photoName}</p>
          </div>

          {/* Signature (styled upload) */}
          <div>
            <label className="block text-gray-700 font-medium">Signature</label>
            <label className="mt-2 flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white rounded-xl shadow-md cursor-pointer hover:bg-blue-700 transition-all">
              Upload Signature
              <input
                type="file"
                accept="image/*"
                {...register("signature")}
                className="hidden"
                onChange={(e) => setSigName(e.target.files?.[0]?.name || "No file selected")}
              />
            </label>
            <p className="mt-2 text-sm text-gray-500">{sigName}</p>
          </div>

          {/* Submit Button */}
          <div className="col-span-2 mt-6 text-center">
            <button type="submit" className="px-6 py-3 bg-green-600 text-white font-semibold rounded-xl shadow-lg hover:bg-green-700 transition-all">
              Register Doctor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterDoctor;
