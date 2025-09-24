import React from "react";
import { useForm } from "react-hook-form";

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
  } = useForm<PatientFormInputs>();

  const onSubmit = async (data: PatientFormInputs) => {
    try {
      const res = await fetch("http://localhost:5000/api/patients/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      console.log(" Patient Registered:", result);
      alert("Patient registered successfully!");
    } catch (err) {
      console.error(" Error:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-100 p-6">
      <div className="w-full max-w-4xl bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          🧑‍⚕️ Patient Registration
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 font-medium">Full Name</label>
            <input
              {...register("fullName", { required: "Full name is required" })}
              className="mt-2 w-full rounded-xl border border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-blue-400"
              placeholder="John Doe"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.fullName.message}
              </p>
            )}
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
            {errors.gender && (
              <p className="text-red-500 text-sm mt-1">
                {errors.gender.message}
              </p>
            )}
          </div>

          {/* DOB */}
          <div>
            <label className="block text-gray-700 font-medium">
              Date of Birth
            </label>
            <input
              type="date"
              {...register("dob", { required: "Date of Birth is required" })}
              className="mt-2 w-full rounded-xl border border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-blue-400"
            />
            {errors.dob && (
              <p className="text-red-500 text-sm mt-1">{errors.dob.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              })}
              className="mt-2 w-full rounded-xl border border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-blue-400"
              placeholder="example@email.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="mt-2 w-full rounded-xl border border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-blue-400"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Mobile */}
          <div>
            <label className="block text-gray-700 font-medium">
              Mobile Number
            </label>
            <input
              type="tel"
              {...register("mobileNumber", {
                required: "Mobile number is required",
                pattern: { value: /^[0-9]{10}$/, message: "Must be 10 digits" },
              })}
              className="mt-2 w-full rounded-xl border border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-blue-400"
              placeholder="9876543210"
            />
            {errors.mobileNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.mobileNumber.message}
              </p>
            )}
          </div>

          {/* Aadhar */}
          <div>
            <label className="block text-gray-700 font-medium">Aadhar</label>
            <input
              type="text"
              {...register("aadhar", {
                pattern: {
                  value: /^[0-9]{12}$/,
                  message: "Aadhar must be 12 digits",
                },
              })}
              className="mt-2 w-full rounded-xl border border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-blue-400"
              placeholder="1234 5678 9101"
            />
            {errors.aadhar && (
              <p className="text-red-500 text-sm mt-1">
                {errors.aadhar.message}
              </p>
            )}
          </div>

          {/* City */}
          <div>
            <label className="block text-gray-700 font-medium">City</label>
            <input
              {...register("city")}
              className="mt-2 w-full rounded-xl border border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-blue-400"
              placeholder="Delhi"
            />
          </div>

          {/* Pincode */}
          <div>
            <label className="block text-gray-700 font-medium">Pincode</label>
            <input
              type="number"
              {...register("pincode")}
              className="mt-2 w-full rounded-xl border border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-blue-400"
              placeholder="110001"
            />
          </div>

          {/* Abha ID */}
          <div>
            <label className="block text-gray-700 font-medium">ABHA ID</label>
            <input
              {...register("abhaId")}
              className="mt-2 w-full rounded-xl border border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-blue-400"
              placeholder="ABHA12345"
            />
          </div>

          {/* Emergency Contact */}
          <div>
            <label className="block text-gray-700 font-medium">
              Emergency Contact Name
            </label>
            <input
              {...register("emergencyName")}
              className="mt-2 w-full rounded-xl border border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-blue-400"
              placeholder="Jane Doe"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">
              Emergency Contact Number
            </label>
            <input
              type="tel"
              {...register("emergencyNumber", {
                pattern: { value: /^[0-9]{10}$/, message: "Must be 10 digits" },
              })}
              className="mt-2 w-full rounded-xl border border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-blue-400"
              placeholder="9876543210"
            />
            {errors.emergencyNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.emergencyNumber.message}
              </p>
            )}
          </div>

          {/* ✅ Submit Button */}
          <div className="col-span-2 mt-6 text-center">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-700 transition-all"
            >
              Register Patient
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPatient;
