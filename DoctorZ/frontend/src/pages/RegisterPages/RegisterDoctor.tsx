// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { Helmet } from "react-helmet";
// import { registerDoctor } from "../../Services/doctorApi";
// import { useOutletContext } from "react-router-dom";
// import { FileText } from "lucide-react";

// type DoctorFormInputs = {
//   fullName: string;
//   email: string;
//   gender: string;
//   dob: string;
//   regNumber: string;
//   mobileNo: string;
//   qualification: string;
//   experience: string;
//   fees: string;
//   languages: string;
//   aadhar: string;
//   pan: string;
//   specialization: string;
//   password: string;
//   address: string;
//   state: string;
//   city: string;
// };

// interface ClinicContext {
//   clinicId?: string;
// }

// const RegisterDoctor: React.FC = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<DoctorFormInputs>();

//   const context = useOutletContext<ClinicContext | null>();
//   const clinicId = context?.clinicId || null;

//   const [degreeFile, setDegreeFile] = useState<File | null>(null);
//   const [photoFile, setPhotoFile] = useState<File | null>(null);
//   const [signatureFile, setSignatureFile] = useState<File | null>(null);

//   const [degreePreview, setDegreePreview] = useState<string | null>(null);
//   const [photoPreview, setPhotoPreview] = useState<string | null>(null);
//   const [sigPreview, setSigPreview] = useState<string | null>(null);

//   const onSubmit = async (data: DoctorFormInputs) => {
//     const formData = new FormData();
//     Object.entries(data).forEach(([key, value]) => formData.append(key, value));
//     if (clinicId) formData.append("clinicId", clinicId);
//     if (degreeFile) formData.append("degreeCert", degreeFile);
//     if (photoFile) formData.append("photo", photoFile);
//     if (signatureFile) formData.append("signature", signatureFile);

//     try {
//       const result = await registerDoctor(formData);
//       console.log("Doctor Registered:", result);
//       alert("Doctor registered successfully!");
//     } catch {
//       alert("Something went wrong!");
//     }
//   };

//   return (
//     <>
//       <Helmet>
//         <title>Doctor Registration | Clinic Portal</title>
//         <meta
//           name="description"
//           content="Register qualified doctors with verified credentials and complete profile details. Clinic Portal – seamless onboarding for healthcare professionals."
//         />
//         <meta
//           name="keywords"
//           content="doctor registration, medical profile, clinic management, healthcare onboarding"
//         />
//       </Helmet>

//       <div className="min-h-screen bg-gray-50 flex justify-center items-start py-10 px-4 sm:px-8">
//         <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 sm:p-10">
//           <h2
//             className="text-3xl sm:text-4xl font-bold text-center mb-10"
//             style={{ color: "#28328C" }}
//           >
//             Doctor Registration
//           </h2>

//           <form
//             onSubmit={handleSubmit(onSubmit)}
//             className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
//           >
//             {/* Text Inputs */}
//             <FormInput label="Full Name" name="fullName" register={register} error={errors.fullName} placeholder="Dr. John Doe" />
//             <SelectInput label="Gender" name="gender" register={register} error={errors.gender} />
//             <FormInput label="Password" name="password" type="password" register={register} error={errors.password} placeholder="••••••••" />
//             <FormInput label="Date of Birth" name="dob" type="date" register={register} error={errors.dob} />
//             <FormInput label="Email" name="email" register={register} error={errors.email} placeholder="doctor@example.com" />
//             <FormInput label="Medical Reg. Number" name="regNumber" register={register} error={errors.regNumber} placeholder="MED123456" />
//             <FormInput label="Qualification" name="qualification" register={register} error={errors.qualification} placeholder="MBBS, MD" />
//             <FormInput label="Specialization" name="specialization" register={register} error={errors.specialization} placeholder="Dermatology" />
//             <FormInput label="Mobile No" name="mobileNo" register={register} error={errors.mobileNo} placeholder="9876543210" />
//             <FormInput label="Experience (Years)" name="experience" type="number" register={register} error={errors.experience} placeholder="5" />
//             <FormInput label="Consultation Fees" name="fees" type="number" register={register} error={errors.fees} placeholder="500" />
//             <FormInput label="Languages Known" name="languages" register={register} placeholder="English, Hindi" />
//             <FormInput label="Aadhar No" name="aadhar" register={register} placeholder="123456789012" />
//             <FormInput label="PAN No" name="pan" register={register} placeholder="ABCDE1234F" />
//             <FormInput label="Address" name="address" register={register} placeholder="Risali" />
//             <FormInput label="State" name="state" register={register} placeholder="CG" />
//             <FormInput label="City" name="city" register={register} placeholder="Bhilai" />

//             {/* File Uploads - Smaller boxes with previews */}
//             <FileUpload
//               label="Degree Certificate"
//               file={degreeFile}
//               setFile={setDegreeFile}
//               preview={degreePreview}
//               setPreview={setDegreePreview}
//               accept="image/*,application/pdf"
//             />
//             <FileUpload
//               label="Recent Photo"
//               file={photoFile}
//               setFile={setPhotoFile}
//               preview={photoPreview}
//               setPreview={setPhotoPreview}
//               accept="image/*"
//             />
//             <FileUpload
//               label="Signature"
//               file={signatureFile}
//               setFile={setSignatureFile}
//               preview={sigPreview}
//               setPreview={setSigPreview}
//               accept="image/*"
//             />

//             {/* Submit Button */}
//             <div className="col-span-1 sm:col-span-2 lg:col-span-3 mt-10 flex justify-center">
//               <button
//                 type="submit"
//                 className="px-10 py-3 font-semibold text-white rounded-xl text-lg shadow-md transition-all duration-300"
//                 style={{ backgroundColor: "#28328C" }}
//               >
//                 Register Doctor
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// /* -------------------------- Reusable Inputs -------------------------- */
// const FormInput = ({ label, name, register, error, placeholder, type = "text" }: any) => (
//   <div className="flex flex-col">
//     <label className="text-gray-700 font-medium">{label}</label>
//     <input
//       type={type}
//       {...register(name, { required: `${label} is required` })}
//       placeholder={placeholder}
//       className="mt-2 w-full rounded-xl border border-gray-300 p-3 text-sm focus:ring-2 focus:ring-[#28328C] shadow-sm"
//     />
//     {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
//   </div>
// );

// const SelectInput = ({ label, name, register, error }: any) => (
//   <div className="flex flex-col">
//     <label className="text-gray-700 font-medium">{label}</label>
//     <select
//       {...register(name, { required: `${label} is required` })}
//       className="mt-2 w-full rounded-xl border border-gray-300 p-3 text-sm focus:ring-2 focus:ring-[#28328C] shadow-sm"
//     >
//       <option value="">Select Gender</option>
//       <option>Male</option>
//       <option>Female</option>
//       <option>Other</option>
//     </select>
//     {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
//   </div>
// );

// /* -------------------------- File Upload with Preview -------------------------- */
// const FileUpload = ({ label, file, setFile, preview, setPreview, accept }: any) => {
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFile = e.target.files?.[0];
//     setFile(selectedFile || null);
//     if (selectedFile && selectedFile.type.startsWith("image/")) {
//       const reader = new FileReader();
//       reader.onload = (event) => setPreview(event.target?.result as string);
//       reader.readAsDataURL(selectedFile);
//     } else {
//       setPreview(null);
//     }
//   };

//   return (
//     <div className="flex flex-col">
//       <label className="text-gray-700 font-medium mb-2">{label}</label>
//       <div className="relative w-full h-28 rounded-xl border border-gray-300 bg-gray-50 flex flex-col items-center justify-center cursor-pointer hover:border-[#28328C] hover:bg-gray-100 transition-all">
//         {preview ? (
//           <img
//             src={preview}
//             alt="Preview"
//             className="w-full h-full object-contain rounded-xl p-1"
//           />
//         ) : file ? (
//           <div className="flex flex-col items-center text-gray-600 text-sm">
//             <FileText size={24} />
//             <p className="truncate mt-1">{file.name}</p>
//           </div>
//         ) : (
//           <span className="text-gray-400 text-sm">Click to upload</span>
//         )}
//         <input
//           type="file"
//           accept={accept}
//           className="absolute inset-0 opacity-0 cursor-pointer"
//           onChange={handleFileChange}
//         />
//       </div>
//     </div>
//   );
// };

// export default RegisterDoctor;
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import { useOutletContext } from "react-router-dom";
import { FileText, Upload } from "lucide-react";
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
            className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800"
            encType="multipart/form-data"
          >
            {/* --- Doctor Info --- */}
            <h2 className="md:col-span-2 text-lg font-semibold text-[#28328C] border-b border-[#28328C]/20 pb-2">
              Doctor Information
            </h2>

            <InputField
              id="fullName"
              label="Full Name"
              placeholder="Dr. John Doe"
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
              registerField={register("dob")}
            />
            <InputField
              id="email"
              label="Email"
              type="email"
              placeholder="doctor@example.com"
              registerField={register("email")}
            />
            <InputField
              id="mobileNo"
              label="Mobile Number"
              placeholder="9876543210"
              registerField={register("mobileNo")}
            />
            <InputField
              id="regNumber"
              label="Medical Registration Number"
              placeholder="MED123456"
              registerField={register("regNumber")}
            />
            <InputField
              id="qualification"
              label="Qualification"
              placeholder="MBBS, MD"
              registerField={register("qualification")}
            />
            <InputField
              id="specialization"
              label="Specialization"
              placeholder="Dermatology"
              registerField={register("specialization")}
            />

            <InputField
              id="experience"
              label="Experience (Years)"
              placeholder="5"
              type="number"
              registerField={register("experience")}
            />
            <InputField
              id="fees"
              label="Consultation Fees"
              placeholder="500"
              type="number"
              registerField={register("fees")}
            />

            <InputField
              id="languages"
              label="Languages Known"
              placeholder="English, Hindi"
              registerField={register("languages")}
            />

            {/* --- Personal Info --- */}
            <h2 className="md:col-span-2 text-lg font-semibold text-[#28328C] border-b border-[#28328C]/20 pt-4 pb-2">
              Personal Details
            </h2>

            <InputField
              id="aadhar"
              label="Aadhar Number"
              placeholder="123456789012"
              type="number"
              registerField={register("aadhar")}
            />
            <InputField
              id="pan"
              label="PAN Number"
              placeholder="ABCDE1234F"
              registerField={register("pan")}
            />
            <InputField
              id="address"
              label="Address"
              placeholder="123 Main Street"
              registerField={register("address")}
            />
            <InputField
              id="city"
              label="City"
              placeholder="Bhilai"
              registerField={register("city")}
            />
            <InputField
              id="state"
              label="State"
              placeholder="Chhattisgarh"
              registerField={register("state")}
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

            {/* --- Documents --- */}
            <h2 className="md:col-span-2 text-lg font-semibold text-[#28328C] border-b border-[#28328C]/20 pt-4 pb-2">
              Upload Documents
            </h2>

            {/* File Uploads */}
            {[
              {
                label: "Degree Certificate",
                file: degreeFile,
                setFile: setDegreeFile,
                preview: degreePreview,
                setPreview: setDegreePreview,
                accept: "image/*,application/pdf",
              },
              {
                label: "Recent Photo",
                file: photoFile,
                setFile: setPhotoFile,
                preview: photoPreview,
                setPreview: setPhotoPreview,
                accept: "image/*",
              },
              {
                label: "Signature",
                file: signatureFile,
                setFile: setSignatureFile,
                preview: sigPreview,
                setPreview: setSigPreview,
                accept: "image/*",
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
                          <p className="mt-1 truncate">
                            {fileInput.file.name}
                          </p>
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
                {loading ? "Submitting..." : "Register Doctor"}
              </button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
};

export default RegisterDoctor;
