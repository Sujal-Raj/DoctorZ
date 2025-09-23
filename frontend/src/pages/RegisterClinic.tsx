import React, { useState } from "react";
import { useForm } from "react-hook-form";

type ClinicFormInputs = {
  clinicName: string;
  clinicType: string;
  specialities: string;
  address: string;
  state: string;
  district: string;
  pincode:string;
  contact: string;
  email: string;
 operatingHours: string;
  licenseNo: string;
  ownerAadhar: string;
  ownerPan: string;
  staffName: string;
  staffEmail: string;
  staffPassword: string;
  staffId:string;
  registrationCert?: FileList;
};

const RegisterClinic: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ClinicFormInputs>();
  const [certName, setCertName] = useState<string>("No file selected");
const [registrationFile, setRegistrationFile] = useState<File | null>(null);



// Utility to generate alphanumeric ID
const generateStaffID = (length = 8) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let id = "";
  for (let i = 0; i < length; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
};



  const onSubmit = async (data: ClinicFormInputs) => {
   const   staffId = generateStaffID(8); // 8 character ID
   console.log("Generated Staff ID:", staffId);
    const formData = new FormData();
    formData.append("clinicName", data.clinicName || "");
    formData.append("clinicType", data.clinicType || "");
     formData.append("specialities", JSON.stringify(data.specialities.split(",").map(s => s.trim())));
    formData.append("address", data.address || "");
    formData.append("state", data.state || "");
    formData.append("district", data.district || "");
     formData.append("pincode", data.pincode || "");
    formData.append("contact", data.contact || "");
    formData.append("email", data.email || "");
    formData.append("operatingHours", data.operatingHours || "");
    formData.append("licenseNo", data.licenseNo || "");
    formData.append("ownerAadhar", data.ownerAadhar || "");
    formData.append("ownerPan", data.ownerPan || "");
    formData.append("staffName", data.staffName || "");
    formData.append("staffEmail", data.staffEmail || "");
    formData.append("staffPassword", data.staffPassword || "");

  formData.append("staffId", staffId);
     if (registrationFile) {
  formData.append("registrationCert", registrationFile);
}

    try {
    console.log("📦 FormData contents:");
for (const [key, value] of formData.entries()) {
  console.log(key, value);
}

      const res = await fetch("http://localhost:3000/api/clinic/register", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      console.log(" Clinic Registered:", result);
      alert("Clinic registered successfully!");
    } catch (err) {
      console.error(" Error:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-100 p-6">
      <div className="w-full max-w-4xl bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">🏥 Clinic Registration</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Clinic Name */}
          <div>
            <label className="block text-gray-700 font-medium">Clinic Name</label>
            <input
              {...register("clinicName", { required: "Clinic name is required" })}
              className="mt-2 w-full rounded-xl border border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-purple-400"
              placeholder="ABC Clinic"
            />
            {errors.clinicName && <p className="text-red-500 text-sm mt-1">{errors.clinicName.message}</p>}
          </div>

          {/* Clinic Type */}
          <div>
            <label className="block text-gray-700 font-medium">Clinic Type</label>
            <input
              {...register("clinicType")}
              className="mt-2 w-full rounded-xl border border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-purple-400"
              placeholder="Private / Govt"
            />
          </div>

          {/* Speciality */}
          <div>
            <label className="block text-gray-700 font-medium">Speciality</label>
            <input
              {...register("specialities")}
              className="mt-2 w-full rounded-xl border border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-purple-400"
              placeholder="Cardiology"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-gray-700 font-medium">Address</label>
            <input
              {...register("address")}
              className="mt-2 w-full rounded-xl border border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-purple-400"
              placeholder="123, Street, City"
            />
          </div>

          {/* State */}
          <div>
            <label className="block text-gray-700 font-medium">State</label>
            <input {...register("state")} className="mt-2 w-full rounded-xl border p-3 shadow-sm focus:ring-2 focus:ring-purple-400" placeholder="Delhi" />
          </div>

          {/* District */}
          <div>
            <label className="block text-gray-700 font-medium">District</label>
            <input {...register("district")} className="mt-2 w-full rounded-xl border p-3 shadow-sm focus:ring-2 focus:ring-purple-400" placeholder="New Delhi" />
          </div>

            <div>
            <label className="block text-gray-700 font-medium">Pincode</label>
            <input {...register("pincode")} className="mt-2 w-full rounded-xl border p-3 shadow-sm focus:ring-2 focus:ring-purple-400" placeholder="New Delhi" />
          </div>

          {/* Contact */}
          <div>
            <label className="block text-gray-700 font-medium">Contact Number</label>
            <input {...register("contact")} className="mt-2 w-full rounded-xl border p-3 shadow-sm focus:ring-2 focus:ring-purple-400" placeholder="9876543210" />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input type="email" {...register("email")} className="mt-2 w-full rounded-xl border p-3 shadow-sm focus:ring-2 focus:ring-purple-400" placeholder="clinic@email.com" />
          </div>

          {/* Hours */}
          <div>
            <label className="block text-gray-700 font-medium">Opening Hours</label>
            <input {...register("operatingHours")} className="mt-2 w-full rounded-xl border p-3 shadow-sm focus:ring-2 focus:ring-purple-400" placeholder="9 AM - 6 PM" />
          </div>

          {/* License No */}
          <div>
            <label className="block text-gray-700 font-medium">License No</label>
            <input {...register("licenseNo")} className="mt-2 w-full rounded-xl border p-3 shadow-sm focus:ring-2 focus:ring-purple-400" placeholder="CLN12345" />
          </div>

          {/* Owner Aadhar */}
          <div>
            <label className="block text-gray-700 font-medium">Owner Aadhar</label>
            <input {...register("ownerAadhar")} className="mt-2 w-full rounded-xl border p-3 shadow-sm focus:ring-2 focus:ring-purple-400" placeholder="123456789012" />
          </div>

          {/* Owner PAN */}
          <div>
            <label className="block text-gray-700 font-medium">Owner PAN</label>
            <input {...register("ownerPan")} className="mt-2 w-full rounded-xl border p-3 shadow-sm focus:ring-2 focus:ring-purple-400" placeholder="ABCDE1234F" />
          </div>
             
          {/* Staff Name */}
              <div>
            <label className="block text-gray-700 font-medium">Staff Name</label>
            <input {...register("staffName")} className="mt-2 w-full rounded-xl border p-3 shadow-sm focus:ring-2 focus:ring-purple-400" placeholder="Staff Name" />
          </div>
          {/* Staff Email*/}
             <div>
            <label className="block text-gray-700 font-medium">Staff Email</label>
            <input {...register("staffEmail")} className="mt-2 w-full rounded-xl border p-3 shadow-sm focus:ring-2 focus:ring-purple-400" placeholder="Staff Name" />
          </div>


          {/* Staff Password */}
          <div>
            <label className="block text-gray-700 font-medium">Staff Password</label>
            <input type="password" {...register("staffPassword")} className="mt-2 w-full rounded-xl border p-3 shadow-sm focus:ring-2 focus:ring-purple-400" placeholder="********" />
          </div>
          
          {/* Registration Certificate (styled upload) */}
          <div>
            <label className="block text-gray-700 font-medium">Registration Certificate</label>
            <label className="mt-2 flex items-center justify-center w-full px-4 py-2 bg-purple-600 text-white rounded-xl shadow-md cursor-pointer hover:bg-purple-700 transition-all">
              Upload File
              <input
             
                type="file"
               
                accept="image/*,application/pdf"
                // {...register("registrationCert")}
                className="hidden"
                onChange={(e) => {setCertName(e.target.files?.[0]?.name || "No file selected");
                  setRegistrationFile(e.target.files?.[0] || null);}
                }
              />
            </label>
            <p className="mt-2 text-sm text-gray-500">{certName}</p>
          </div>

          {/* Submit */}
          <div className="col-span-2 mt-6 text-center">
            <button type="submit" className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-xl shadow-lg hover:bg-purple-700 transition-all">
              Register Clinic
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterClinic;
