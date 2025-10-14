import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { registerClinic } from "../api/mainClinicApi";  // Adjust path as needed

type ClinicFormInputs = {
  clinicName: string;
  clinicType: string;
  specialities: string;
  address: string;
  state: string;
  district: string;
  pincode: string;
  contact: string;
  email: string;
  operatingHours: string;
  licenseNo: string;
  ownerAadhar: string;
  ownerPan: string;
  staffName: string;
  staffEmail: string;
  staffPassword: string;
  staffId: string;
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
    const staffId = generateStaffID(8);
    console.log("Generated Staff ID:", staffId);

    try {
      await registerClinic({
        clinicName: data.clinicName || "",
        clinicType: data.clinicType || "",
        specialities: data.specialities.split(",").map(s => s.trim()),
        address: data.address || "",
        state: data.state || "",
        district: data.district || "",
        pincode: data.pincode || "",
        contact: data.contact || "",
        email: data.email || "",
        operatingHours: data.operatingHours || "",
        licenseNo: data.licenseNo || "",
        ownerAadhar: data.ownerAadhar || "",
        ownerPan: data.ownerPan || "",
        staffName: data.staffName || "",
        staffEmail: data.staffEmail || "",
        staffPassword: data.staffPassword || "",
        staffId,
        registrationCert: registrationFile || undefined,
      });

      alert("Your clinic details have been sent for admin approval. You’ll receive login access once approved.");
    } catch (err) {
      alert("Something went wrong!");
      console.error("Error:", err);
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

          {/* Pincode */}
          <div>
            <label className="block text-gray-700 font-medium">Pincode</label>
            <input {...register("pincode")} className="mt-2 w-full rounded-xl border p-3 shadow-sm focus:ring-2 focus:ring-purple-400" placeholder="110001" />
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

          {/* Opening Hours */}
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

          {/* Staff Email */}
          <div>
            <label className="block text-gray-700 font-medium">Staff Email</label>
            <input {...register("staffEmail")} className="mt-2 w-full rounded-xl border p-3 shadow-sm focus:ring-2 focus:ring-purple-400" placeholder="staff@email.com" />
          </div>

          {/* Staff Password */}
          <div>
            <label className="block text-gray-700 font-medium">Staff Password</label>
            <input type="password" {...register("staffPassword")} className="mt-2 w-full rounded-xl border p-3 shadow-sm focus:ring-2 focus:ring-purple-400" placeholder="********" />
          </div>

          {/* Registration Certificate */}
          <div>
            <label className="block text-gray-700 font-medium">Registration Certificate</label>
            <label className="mt-2 flex items-center justify-center w-full px-4 py-2 bg-purple-600 text-white rounded-xl shadow-md cursor-pointer hover:bg-purple-700 transition-all">
              Upload File
              <input
                type="file"
                accept="image/*,application/pdf"
                className="hidden"
                onChange={(e) => {
                  setCertName(e.target.files?.[0]?.name || "No file selected");
                  setRegistrationFile(e.target.files?.[0] || null);
                }}
              />
            </label>
            <p className="mt-2 text-sm text-gray-500">{certName}</p>
          </div>

          {/* Submit Button */}
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
