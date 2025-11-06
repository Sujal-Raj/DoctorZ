import React from "react";
import { useForm } from "react-hook-form";
import { registerPatient } from "../../Services/patientApi";
import "../../index.css";

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

  const onSubmit = async (data: PatientFormInputs) => {
    const formData = new FormData();

    formData.append("fullName", data.fullName);
    formData.append("gender", data.gender);
    formData.append("dob", data.dob);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("mobileNumber", data.mobileNumber);
    formData.append("aadhar", data.aadhar);
    formData.append("abhaId", data.abhaId);

    formData.append("city", data.city);
    formData.append("pincode", data.pincode);
    formData.append("name", data.emergencyName);
    formData.append("number", data.emergencyNumber);

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

    if (data.medicalReports?.length) {
      Array.from(data.medicalReports).forEach((file) =>
        formData.append("medicalReports", file)
      );
    }

    await registerPatient(formData);
    alert("✅ Registered Successfully!");
  };

  return (
    <div className="w-full  min-h-[100vh] bg-gradient-to-br from-blue-50 to-cyan-100 flex justify-center items-start pt-10 pb-20 px-4 overflow-hidden">
      <div className="w-full max-w-4xl bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-5 md:p-10 ">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-700 mb-6">
          Patient Registration
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full"
        >
          {/* Full Name */}
          <div>
            <label className="font-medium text-gray-700">Full Name</label>
            <input
              placeholder="Ritika Sharma"
              {...register("fullName")}
              className="inputBox"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="font-medium text-gray-700">Gender</label>
            <select {...register("gender")} className="inputBox">
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          {/* DOB */}
          <div>
            <label className="font-medium text-gray-700">Date of Birth</label>
            <input type="date" {...register("dob")} className="inputBox" />
          </div>

          {/* Email */}
          <div>
            <label className="font-medium text-gray-700">Email</label>
            <input
              placeholder="example@gmail.com"
              {...register("email")}
              className="inputBox"
              type="email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="font-medium text-gray-700">Password</label>
            <input
              placeholder="Enter password"
              type="password"
              {...register("password")}
              className="inputBox"
            />
          </div>

          {/* Mobile */}
          <div>
            <label className="font-medium text-gray-700">Mobile Number</label>
            <input
              placeholder="9876543210"
              {...register("mobileNumber")}
              className="inputBox"
            />
          </div>

          {/* Aadhar */}
          <div>
            <label className="font-medium text-gray-700">Aadhar</label>
            <input
              placeholder="123456789012"
              {...register("aadhar")}
              className="inputBox"
            />
          </div>

          {/* City */}
          <div>
            <label className="font-medium text-gray-700">City</label>
            <input
              placeholder="Bhilai"
              {...register("city")}
              className="inputBox"
            />
          </div>

          {/* Pincode */}
          <div>
            <label className="font-medium text-gray-700">Pincode</label>
            <input
              placeholder="490001"
              {...register("pincode")}
              className="inputBox"
            />
          </div>

          {/* ABHA */}
          <div>
            <label className="font-medium text-gray-700">ABHA ID</label>
            <input
              placeholder="ABHA123456"
              {...register("abhaId")}
              className="inputBox"
            />
          </div>

          {/* Allergies */}
          <div>
            <label className="font-medium text-gray-700">
              Allergies (Optional)
            </label>
            <input
              placeholder="Dust, Peanuts"
              {...register("allergies")}
              className="inputBox"
            />
          </div>
          {/* Diseases */}
          <div>
            <label className="font-medium text-gray-700">
              Diseases (Optional)
            </label>
            <input
              placeholder="Diabetes, Asthma"
              {...register("diseases")}
              className="inputBox"
            />
          </div>

          {/* Past Surgeries */}
          <div>
            <label className="font-medium text-gray-700">
              Past Surgeries (Optional)
            </label>
            <input
              placeholder="Appendix Removal"
              {...register("pastSurgeries")}
              className="inputBox"
            />
          </div>

          {/* Current Medications */}
          <div>
            <label className="font-medium text-gray-700">
              Current Medications (Optional)
            </label>
            <input
              placeholder="Paracetamol, Vitamin D"
              {...register("currentMedications")}
              className="inputBox"
            />
          </div>

          {/* Medical Reports */}
          <div className="md:col-span-2">
            <label className="font-medium text-gray-700">
              Medical Reports (Multiple)
            </label>
            <input
              type="file"
              multiple
              {...register("medicalReports")}
              className="mt-1 w-full"
            />
          </div>

          {/* Emergency Name */}
          <div>
            <label className="font-medium text-gray-700">
              Emergency Contact Name
            </label>
            <input
              placeholder="Rahul Sharma"
              {...register("emergencyName")}
              className="inputBox"
            />
          </div>

          {/* Emergency Number */}
          <div>
            <label className="font-medium text-gray-700">
              Emergency Contact Number
            </label>
            <input
              placeholder="9876541230"
              {...register("emergencyNumber")}
              className="inputBox"
            />
          </div>

          {/* Submit */}
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
