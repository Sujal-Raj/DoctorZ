

import React from "react";
import { useForm } from "react-hook-form";

import "../../index.css";
import { registerPatient } from "../../Services/patientApi";

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

  allergies: string;
  diseases: string;
  pastSurgeries: string;
  currentMedications: string;
  medicalReports?: FileList;

};

const RegisterPatient: React.FC = () => {
  const { register, handleSubmit } = useForm<PatientFormInputs>();
  const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);


  const onSubmit = async (data: PatientFormInputs) => {
    const formData = new FormData();
console.log("FILES SELECTED BY USER:", selectedFiles);

    // Basic info
    formData.append("fullName", data.fullName);
    formData.append("gender", data.gender);
    formData.append("dob", data.dob);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("mobileNumber", data.mobileNumber);
    formData.append("aadhar", data.aadhar);
    formData.append("city", data.city);
    formData.append("pincode", data.pincode);
    formData.append("abhaId", data.abhaId);

    // Emergency
    formData.append("name", data.emergencyName);
    formData.append("number", data.emergencyNumber);

    // Medical Record fields → Convert to array
    formData.append(
      "allergies",
      JSON.stringify(data.allergies?.split(",").map((s) => s.trim()) || [])
    );
    formData.append(
      "diseases",
      JSON.stringify(data.diseases?.split(",").map((s) => s.trim()) || [])
    );
    formData.append(
      "pastSurgeries",
      JSON.stringify(data.pastSurgeries?.split(",").map((s) => s.trim()) || [])
    );
    formData.append(
      "currentMedications",
      JSON.stringify(
        data.currentMedications?.split(",").map((s) => s.trim()) || []
      )
    );

    // File Uploads
    
  
    selectedFiles.forEach((file) => {
  formData.append("medicalReports", file);
   
});
   for (let pair of formData.entries()) {
  console.log(pair[0], pair[1]);
}



    await registerPatient(formData);
    alert("✅ Registered Successfully!");
  };

  return (
    <div className="w-full min-h-[100vh] bg-gradient-to-br from-blue-50 to-cyan-100 flex justify-center items-start pt-10 pb-20 px-4">
      <div className="w-full max-w-4xl bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-5 md:p-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-700 mb-6">
          Patient Registration
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full"
        >
          {/* ✅ Normal Details */}
          <div>
            <label className="font-medium text-gray-700">Full Name</label>
            <input
              {...register("fullName")}
              className="inputBox"
              placeholder="Ritika Sharma"
            />
          </div>

          <div>
            <label className="font-medium text-gray-700">Gender</label>
            <select {...register("gender")} className="inputBox">
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="font-medium text-gray-700">Date of Birth</label>
            <input type="date" {...register("dob")} className="inputBox" />
          </div>

          <div>
            <label className="font-medium text-gray-700">Email</label>
            <input
              {...register("email")}
              className="inputBox"
              placeholder="example@gmail.com"
            />
          </div>

          <div>
            <label className="font-medium text-gray-700">Password</label>
            <input
              type="password"
              {...register("password")}
              className="inputBox"
              placeholder="Enter password"
            />
          </div>

          <div>
            <label className="font-medium text-gray-700">Mobile Number</label>
            <input
              {...register("mobileNumber")}
              className="inputBox"
              placeholder="9876543210"
            />
          </div>

          <div>
            <label className="font-medium text-gray-700">Aadhar</label>
            <input
              {...register("aadhar")}
              className="inputBox"
              placeholder="123456789012"
            />
          </div>

          <div>
            <label className="font-medium text-gray-700">City</label>
            <input
              {...register("city")}
              className="inputBox"
              placeholder="Bhilai"
            />
          </div>

          <div>
            <label className="font-medium text-gray-700">Pincode</label>
            <input
              {...register("pincode")}
              className="inputBox"
              placeholder="490001"
            />
          </div>

          <div>
            <label className="font-medium text-gray-700">ABHA ID</label>
            <input
              {...register("abhaId")}
              className="inputBox"
              placeholder="ABHA123456"
            />
          </div>

          <div>
            <label className="font-medium text-gray-700">
              Emergency Contact Name
            </label>
            <input
              {...register("emergencyName")}
              className="inputBox"
              placeholder="Rahul Sharma"
            />
          </div>

          <div>
            <label className="font-medium text-gray-700">
              Emergency Contact Number
            </label>
            <input
              {...register("emergencyNumber")}
              className="inputBox"
              placeholder="9876541230"
            />
          </div>

          {/* ✅ SECTION DIVIDER */}
          <div className="md:col-span-2 mt-6">
            <div className="w-full h-px bg-gray-300 my-4"></div>
            <h3 className="text-xl font-semibold text-blue-700 mb-4">
              Medical Records
            </h3>
          </div>

          {/* ✅ Medical fields */}
          <div>
            <label className="font-medium text-gray-700">Allergies</label>
            <input
              {...register("allergies")}
              className="inputBox"
              placeholder="Dust, Peanuts"
            />
          </div>

          <div>
            <label className="font-medium text-gray-700">Diseases</label>
            <input
              {...register("diseases")}
              className="inputBox"
              placeholder="Asthma, Diabetes"
            />
          </div>

          <div>
            <label className="font-medium text-gray-700">Past Surgeries</label>
            <input
              {...register("pastSurgeries")}
              className="inputBox"
              placeholder="Appendix Removal"
            />
          </div>

          <div>
            <label className="font-medium text-gray-700">
              Current Medications
            </label>
            <input
              {...register("currentMedications")}
              className="inputBox"
              placeholder="Paracetamol, Vitamin D"
            />
          </div>

          {/* ✅ Dropbox-Style File Upload */}
          <div className="md:col-span-2">
            <label className="font-medium text-gray-700">
              Upload Medical Reports
            </label>

            <div
              className="
                mt-2 border-2 border-dashed border-blue-300 rounded-xl p-6 
                bg-blue-50/30 hover:bg-blue-50 transition cursor-pointer
                flex flex-col items-center justify-center text-center
                relative
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-blue-500 mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 16l5-5 4 4 8-8" />
                <path d="M14 7h7v7" />
              </svg>

              <p className="text-gray-600 font-medium">
                Drag & Drop files here
              </p>
              <p className="text-gray-400 text-sm">or click to browse</p>
             
              
<input
  type="file"
  multiple
  accept="image/*,application/pdf"
  {...register("medicalReports")}
  onChange={(e) => {
    const files = Array.from(e.target.files || []);
    console.log("Selected:", files);
    setSelectedFiles(files);
  }}
  className="absolute inset-0 opacity-0 cursor-pointer"
/>


            </div>
           
          </div>
           {selectedFiles.length > 0 && (
              <ul className="mt-3 space-y-1 text-gray-700 text-sm">
                {selectedFiles.map((file, index) => (
                  <li key={index} className="flex items-center gap-2">
                    📄 {file.name}
                  </li>
                ))}
              </ul>
            )}

          {/* ✅ Submit */}
          <div className="col-span-1 md:col-span-2 text-center mt-4">
            <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition">
              Register Patient
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPatient;
