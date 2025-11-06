



import { forwardRef, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import { createEMR } from "../Services/emrApi";

// ✅ Define EMR response type
export interface EmrResponse {
  _id: string;
  patientId?: string;
  doctorId?: string;
  [key: string]: unknown;
}

// ✅ Define handle type for parent
export interface EmrHandle {
  submitEmr: () => Promise<EmrResponse | null>;
}

type EMRInputs = {
  allergies: string;
  diseases: string;
  pastSurgeries: string;
  currentMedications: string;
  reports?: FileList;
};

interface EmrForAppointmentProps {
  doctorId: string;
  patientId: string | null;
}

const EmrForAppointment = forwardRef<EmrHandle, EmrForAppointmentProps>(
  ({ doctorId, patientId }, ref) => {
    const { register, getValues, reset } = useForm<EMRInputs>();

    // ✅ Fallback for localStorage check
    const storedPatientId = patientId || localStorage.getItem("userId");
    const storedDoctorId =
      doctorId || localStorage.getItem("doctorId") || "";

    console.log("🧾 Preparing EMR Data:", {
      patientId: storedPatientId,
      doctorId: storedDoctorId,
      allergies: getValues("allergies"),
      diseases: getValues("diseases"),
    });

    useImperativeHandle(ref, () => ({
      submitEmr: async () => {
        const data = getValues();

        if (!storedPatientId) {
          alert("Session expired. Please login again.");
          throw new Error("❌ No patient ID found");
        }

        if (!storedDoctorId || storedDoctorId.trim() === "") {
          alert("Doctor ID is missing. Please reopen the appointment form.");
          throw new Error("❌ Doctor ID missing");
        }

        // ✅ Prepare form data
        const formData = new FormData();
        formData.append("patientId", storedPatientId);
        formData.append("doctorId", storedDoctorId);
        formData.append(
          "allergies",
          JSON.stringify(
            data.allergies?.split(",").map((s) => s.trim()) || []
          )
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

        if (data.reports?.length) {
          Array.from(data.reports).forEach((file) =>
            formData.append("reports", file)
          );
        }

        console.log("📤 Sending EMR Data to Backend:", {
          patientId: storedPatientId,
          doctorId: storedDoctorId,
        });

        // ✅ API Call
        const responseData: EmrResponse = await createEMR(formData);
        reset();

        console.log("✅ EMR Created Successfully:", responseData);
        return responseData || null;
      },
    }));

    return (
      <div className="w-full max-w-3xl bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Add Medical Record (EMR)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="font-medium text-gray-700">Allergies</label>
            <input
              className="inputBox"
              placeholder="Dust, Pollen"
              {...register("allergies")}
            />
          </div>

          <div>
            <label className="font-medium text-gray-700">Diseases</label>
            <input
              className="inputBox"
              placeholder="Diabetes, BP"
              {...register("diseases")}
            />
          </div>

          <div>
            <label className="font-medium text-gray-700">Past Surgeries</label>
            <input
              className="inputBox"
              placeholder="Knee Surgery"
              {...register("pastSurgeries")}
            />
          </div>

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

          <div className="md:col-span-2">
            <label className="font-medium text-gray-700">Upload Reports</label>
            <input
              type="file"
              multiple
              {...register("reports")}
              className="mt-2 w-full"
            />
          </div>
        </div>
      </div>
    );
  }
);

export default EmrForAppointment;
