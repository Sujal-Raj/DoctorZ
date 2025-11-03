import React from "react";
import { useForm } from "react-hook-form";

import { createEMR } from "../Services/emrApi";
import { useParams } from "react-router-dom";

type EMRInputs = {
  allergies: string;
  diseases: string;
  pastSurgeries: string;
  currentMedications: string;
  reports?: FileList;
};

const AddEmr: React.FC = () => {

// const token = Cookies.get("patientToken") || "";
// const decoded: any = token ? jwtDecode(token) : {};

// const patientId = decoded.id;
// console.log("Patient ID from token:", patientId);
const patientId=useParams().id;

  const { register, handleSubmit, reset } = useForm<EMRInputs>();

  const onSubmit = async (data: EMRInputs) => {
    if (!patientId) {
    alert("Session expired. Please login again.");
    return;
  }
    const formData = new FormData();

    
    formData.append("patientId", patientId);
    
    // Convert comma fields to array
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
      JSON.stringify(
        data.pastSurgeries?.split(",").map((s) => s.trim()) || []
      )
    );
    formData.append(
      "currentMedications",
      JSON.stringify(
        data.currentMedications?.split(",").map((s) => s.trim()) || []
      )
    );

    // Reports (multiple file upload)
    if (data.reports?.length) {
      Array.from(data.reports).forEach((file) =>
        formData.append("reports", file)
      );
    }

    await createEMR(formData);
    alert("✅ EMR Added Successfully!");

    reset();
  };

  return (
   

      <div className="w-full max-w-3xl bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Add Medical Record (EMR)
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Allergies */}
          <div>
            <label className="font-medium text-gray-700">Allergies</label>
            <input
              className="inputBox"
              placeholder="Dust, Pollen"
              {...register("allergies")}
            />
          </div>

          {/* Diseases */}
          <div>
            <label className="font-medium text-gray-700">Diseases</label>
            <input
              className="inputBox"
              placeholder="Diabetes, BP"
              {...register("diseases")}
            />
          </div>

          {/* Surgeries */}
          <div>
            <label className="font-medium text-gray-700">Past Surgeries</label>
            <input
              className="inputBox"
              placeholder="Knee Surgery"
              {...register("pastSurgeries")}
            />
          </div>

          {/* Medications */}
          <div>
            <label className="font-medium text-gray-700">
              Current Medications
            </label>
            <input
              className="inputBox"
              placeholder="Paracetamol"
              {...register("currentMedications")}
            />
          </div>

          {/* Reports Upload */}
          <div className="md:col-span-2">
            <label className="font-medium text-gray-700">
              Upload Reports (Multiple)
            </label>
            <input
              type="file"
              multiple
              {...register("reports")}
              className="mt-2 w-full"
            />
          </div>

          {/* Submit */}
          <div className="md:col-span-2 text-center">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
              Add EMR
            </button>
          </div>
        </form>
      </div>
   
  );
};

export default AddEmr;
