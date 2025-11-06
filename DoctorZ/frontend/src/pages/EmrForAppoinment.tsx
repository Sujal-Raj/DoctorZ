// import { forwardRef, useImperativeHandle } from "react";
// import { useForm } from "react-hook-form";
// import { createEMR } from "../Services/emrApi";

// // ✅ Define EMR response type
// export interface EmrResponse {
//   _id: string;
//   patientId?: string;
//   doctorId?: string;
//   [key: string]: unknown;
// }

// // ✅ Define handle type for parent
// export interface EmrHandle {
//   submitEmr: () => Promise<EmrResponse | null>;
// }

// type EMRInputs = {
//   allergies: string;
//   diseases: string;
//   pastSurgeries: string;
//   currentMedications: string;
//   reports?: FileList;
// };

// interface EmrForAppointmentProps {
//   doctorId: string;
//   patientId: string | null;
// }

// const EmrForAppointment = forwardRef<EmrHandle, EmrForAppointmentProps>(
//   ({ doctorId, patientId }, ref) => {
//     const { register, getValues, reset } = useForm<EMRInputs>();

//     // ✅ Fallback for localStorage check
//     const storedPatientId = patientId || localStorage.getItem("userId");
//     const storedDoctorId = doctorId || localStorage.getItem("doctorId") || "";

//     console.log("🧾 Preparing EMR Data:", {
//       patientId: storedPatientId,
//       doctorId: storedDoctorId,
//       allergies: getValues("allergies"),
//       diseases: getValues("diseases"),
//     });

//     useImperativeHandle(ref, () => ({
//       submitEmr: async () => {
//         const data = getValues();

//         if (!storedPatientId) {
//           alert("Session expired. Please login again.");
//           throw new Error("❌ No patient ID found");
//         }

//         if (!storedDoctorId || storedDoctorId.trim() === "") {
//           alert("Doctor ID is missing. Please reopen the appointment form.");
//           throw new Error("❌ Doctor ID missing");
//         }

//         // ✅ Prepare form data
//         const formData = new FormData();
//         formData.append("patientId", storedPatientId);
//         formData.append("doctorId", storedDoctorId);
//         formData.append(
//           "allergies",
//           JSON.stringify(data.allergies?.split(",").map((s) => s.trim()) || [])
//         );
//         formData.append(
//           "diseases",
//           JSON.stringify(data.diseases?.split(",").map((s) => s.trim()) || [])
//         );
//         formData.append(
//           "pastSurgeries",
//           JSON.stringify(
//             data.pastSurgeries?.split(",").map((s) => s.trim()) || []
//           )
//         );
//         formData.append(
//           "currentMedications",
//           JSON.stringify(
//             data.currentMedications?.split(",").map((s) => s.trim()) || []
//           )
//         );

//         if (data.reports?.length) {
//           Array.from(data.reports).forEach((file) =>
//             formData.append("reports", file)
//           );
//         }

//         console.log("📤 Sending EMR Data to Backend:", {
//           patientId: storedPatientId,
//           doctorId: storedDoctorId,
//         });

//         // ✅ API Call
//         const responseData: EmrResponse = await createEMR(formData);
//         reset();

//         console.log("✅ EMR Created Successfully:", responseData);
//         return responseData || null;
//       },
//     }));

//     return (
//       <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
//         <h3 className="text-base font-semibold text-blue-600 mb-3 text-center">
//           Add Medical Record (EMR)
//         </h3>

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//           <div>
//             <label className="text-sm text-gray-600">Allergies</label>
//             <input
//               className="w-full border border-gray-300 p-2 rounded-md text-sm focus:ring-2 focus:ring-blue-400"
//               placeholder="Dust, Pollen"
//               {...register("allergies")}
//             />
//           </div>

//           <div>
//             <label className="text-sm text-gray-600">Diseases</label>
//             <input
//               className="w-full border border-gray-300 p-2 rounded-md text-sm focus:ring-2 focus:ring-blue-400"
//               placeholder="Diabetes, BP"
//               {...register("diseases")}
//             />
//           </div>

//           <div>
//             <label className="text-sm text-gray-600">Past Surgeries</label>
//             <input
//               className="w-full border border-gray-300 p-2 rounded-md text-sm focus:ring-2 focus:ring-blue-400"
//               placeholder="Knee Surgery"
//               {...register("pastSurgeries")}
//             />
//           </div>

//           <div>
//             <label className="text-sm text-gray-600">Current Medications</label>
//             <input
//               className="w-full border border-gray-300 p-2 rounded-md text-sm focus:ring-2 focus:ring-blue-400"
//               placeholder="Paracetamol"
//               {...register("currentMedications")}
//             />
//           </div>

//           <div className="sm:col-span-2">
//             <label className="text-sm text-gray-600">Upload Reports</label>
//             <input
//               type="file"
//               multiple
//               {...register("reports")}
//               className="w-full mt-2 text-sm"
//             />
//           </div>
//         </div>
//       </div>
//     );
//   }
// );

// export default EmrForAppointment;

// import axios from "axios";
// import { forwardRef, useImperativeHandle } from "react";
// import { useForm } from "react-hook-form";
// import { createEMR } from "../Services/emrApi";

// // ✅ Define EMR response type
// export interface EmrResponse {
//   _id: string;
//   patientId?: string;
//   doctorId?: string;
//   emr?: { _id?: string };
//   [key: string]: unknown;
// }

// // ✅ Define handle type for parent
// export interface EmrHandle {
//   submitEmr: () => Promise<EmrResponse | null>;
// }

// type EMRInputs = {
//   allergies: string;
//   diseases: string;
//   pastSurgeries: string;
//   currentMedications: string;
//   reports?: FileList;
// };

// interface EmrForAppointmentProps {
//   doctorId: string;
//   patientId: string | null;
// }

// const EmrForAppointment = forwardRef<EmrHandle, EmrForAppointmentProps>(
//   ({ doctorId, patientId }, ref) => {
//     const { register, getValues, reset } = useForm<EMRInputs>();

//     // ✅ Fallback for localStorage check
//     const storedPatientId = patientId || localStorage.getItem("userId");
//     const storedDoctorId = doctorId || localStorage.getItem("doctorId") || "";

//     useImperativeHandle(ref, () => ({
//       submitEmr: async () => {
//         const data = getValues();

//         if (!storedPatientId) {
//           alert("Session expired. Please login again.");
//           throw new Error("❌ No patient ID found");
//         }

//         if (!storedDoctorId || storedDoctorId.trim() === "") {
//           alert("Doctor ID is missing. Please reopen the appointment form.");
//           throw new Error("❌ Doctor ID missing");
//         }

//         // ✅ Prepare EMR form data
//         const formData = new FormData();
//         formData.append("patientId", storedPatientId);
//         formData.append("doctorId", storedDoctorId);
//         formData.append(
//           "allergies",
//           JSON.stringify(data.allergies?.split(",").map((s) => s.trim()) || [])
//         );
//         formData.append(
//           "diseases",
//           JSON.stringify(data.diseases?.split(",").map((s) => s.trim()) || [])
//         );
//         formData.append(
//           "pastSurgeries",
//           JSON.stringify(
//             data.pastSurgeries?.split(",").map((s) => s.trim()) || []
//           )
//         );
//         formData.append(
//           "currentMedications",
//           JSON.stringify(
//             data.currentMedications?.split(",").map((s) => s.trim()) || []
//           )
//         );

//         if (data.reports?.length) {
//           Array.from(data.reports).forEach((file) =>
//             formData.append("reports", file)
//           );
//         }

//         console.log("📤 Sending EMR Data to Backend:", {
//           patientId: storedPatientId,
//           doctorId: storedDoctorId,
//         });

//         // ✅ Step 1: Create EMR (typed properly)
//         const emrResponse = (await createEMR(formData)) as EmrResponse;
//         console.log("✅ EMR Created Successfully:", emrResponse);

//         // ✅ Step 2: Create Booking (directly here)
//         const bookingPayload = {
//           doctorId: storedDoctorId,
//           userId: storedPatientId,
//           mode: "online",
//           datetime: new Date().toISOString(),
//           fees: 500,
//           status: "booked",
//           emrId: emrResponse?.emr?._id || emrResponse?._id || null,
//         };

//         console.log("📦 Sending Booking Payload:", bookingPayload);

//         try {
//           const bookingRes = await axios.post<{ message: string }>(
//             "http://localhost:3000/api/booking/book",
//             bookingPayload,
//             {
//               headers: { "Content-Type": "application/json" },
//             }
//           );

//           console.log("✅ Booking Created Successfully:", bookingRes.data);
//         } catch (error) {
//           console.error("❌ Booking creation failed:", error);
//           alert("Booking failed. Check console for details.");
//         }

//         reset();
//         return emrResponse || null;
//       },
//     }));

//     return (
//       <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 max-h-[400px] overflow-y-auto">
//         <h3 className="text-base font-semibold text-blue-600 mb-3 text-center">
//           Add Medical Record (EMR)
//         </h3>

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//           <div>
//             <label className="text-sm text-gray-600">Allergies</label>
//             <input
//               className="w-full border border-gray-300 p-2 rounded-md text-sm focus:ring-2 focus:ring-blue-400"
//               placeholder="Dust, Pollen"
//               {...register("allergies")}
//             />
//           </div>

//           <div>
//             <label className="text-sm text-gray-600">Diseases</label>
//             <input
//               className="w-full border border-gray-300 p-2 rounded-md text-sm focus:ring-2 focus:ring-blue-400"
//               placeholder="Diabetes, BP"
//               {...register("diseases")}
//             />
//           </div>

//           <div>
//             <label className="text-sm text-gray-600">Past Surgeries</label>
//             <input
//               className="w-full border border-gray-300 p-2 rounded-md text-sm focus:ring-2 focus:ring-blue-400"
//               placeholder="Knee Surgery"
//               {...register("pastSurgeries")}
//             />
//           </div>

//           <div>
//             <label className="text-sm text-gray-600">Current Medications</label>
//             <input
//               className="w-full border border-gray-300 p-2 rounded-md text-sm focus:ring-2 focus:ring-blue-400"
//               placeholder="Paracetamol"
//               {...register("currentMedications")}
//             />
//           </div>

//           <div className="sm:col-span-2">
//             <label className="text-sm text-gray-600">Upload Reports</label>
//             <input
//               type="file"
//               multiple
//               {...register("reports")}
//               className="w-full mt-2 text-sm"
//             />
//           </div>
//         </div>
//       </div>
//     );
//   }
// );

// export default EmrForAppointment;

// import axios from "axios";
// import { forwardRef, useImperativeHandle } from "react";
// import { useForm } from "react-hook-form";
// import { createEMR } from "../Services/emrApi";

// // ✅ Define EMR response type
// export interface EmrResponse {
//   _id: string;
//   patientId?: string;
//   doctorId?: string;
//   emr?: {
//     _id?: string;
//     allergies?: string[];
//     diseases?: string[];
//     pastSurgeries?: string[];
//     currentMedications?: string[];
//     reports?: string[];
//   };
//   [key: string]: unknown;
// }


// // ✅ Define handle type for parent
// export interface EmrHandle {
//   submitEmr: () => Promise<EmrResponse | null>;
// }

// type EMRInputs = {
//   allergies: string;
//   diseases: string;
//   pastSurgeries: string;
//   currentMedications: string;
//   reports?: FileList;
// };

// interface EmrForAppointmentProps {
//   doctorId: string;
//   patientId: string | null;
// }

// // ✅ Base URL from .env (example: VITE_API_BASE_URL=http://localhost:3000)
// const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

// const EmrForAppointment = forwardRef<EmrHandle, EmrForAppointmentProps>(
//   ({ doctorId, patientId }, ref) => {
//     const { register, getValues, reset } = useForm<EMRInputs>();

//     // ✅ Fallback for localStorage
//     const storedPatientId = patientId || localStorage.getItem("userId");
//     const storedDoctorId = doctorId || localStorage.getItem("doctorId") || "";

//     useImperativeHandle(ref, () => ({
//       submitEmr: async () => {
//         const data = getValues();

//         if (!storedPatientId) {
//           alert("Session expired. Please login again.");
//           throw new Error("❌ No patient ID found");
//         }

//         if (!storedDoctorId.trim()) {
//           alert("Doctor ID is missing. Please reopen the appointment form.");
//           throw new Error("❌ Doctor ID missing");
//         }

//         // ✅ Prepare EMR form data
//         const formData = new FormData();
//         formData.append("patientId", storedPatientId);
//         formData.append("doctorId", storedDoctorId);
//         formData.append(
//           "allergies",
//           JSON.stringify(data.allergies?.split(",").map((s) => s.trim()) || [])
//         );
//         formData.append(
//           "diseases",
//           JSON.stringify(data.diseases?.split(",").map((s) => s.trim()) || [])
//         );
//         formData.append(
//           "pastSurgeries",
//           JSON.stringify(
//             data.pastSurgeries?.split(",").map((s) => s.trim()) || []
//           )
//         );
//         formData.append(
//           "currentMedications",
//           JSON.stringify(
//             data.currentMedications?.split(",").map((s) => s.trim()) || []
//           )
//         );

//         if (data.reports?.length) {
//           Array.from(data.reports).forEach((file) =>
//             formData.append("reports", file)
//           );
//         }

//         console.log("📤 Sending EMR Data to Backend:", {
//           patientId: storedPatientId,
//           doctorId: storedDoctorId,
//         });

//         // ✅ Step 1: Create EMR
//         const emrResponse = await createEMR(formData);
        

//         console.log("✅ EMR Created Successfully:", emrResponse);

//         // ✅ Step 2: Create Booking
//         const bookingPayload = {
//           doctorId: storedDoctorId,
//           userId: storedPatientId,
//           mode: "online",
//           datetime: new Date().toISOString(),
//           fees: 500,
//           status: "booked",
//           emrId:(emrResponse?.emr?._id ?? emrResponse?._id) || null || emrResponse?._id || null,
//         };

//         console.log("📦 Sending Booking Payload:", bookingPayload);

//         try {
//           const bookingRes = await axios.post<{ message: string }>(
//             `${API_URL}/api/booking/book`,
//             bookingPayload,
//             {
//               headers: { "Content-Type": "application/json" },
//             }
//           );

//           console.log("✅ Booking Created Successfully:", bookingRes.data);
//           alert("Booking successful!");
//         } catch (error) {
//           console.error("❌ Booking creation failed:", error);
//           alert("Booking failed. Check console for details.");
//         }

//         reset();
//         return emrResponse || null;
//       },
//     }));

//     return (
//       <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 max-h-[400px] overflow-y-auto">
//         <h3 className="text-base font-semibold text-blue-600 mb-3 text-center">
//           Add Medical Record (EMR)
//         </h3>

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//           <div>
//             <label className="text-sm text-gray-600">Allergies</label>
//             <input
//               className="w-full border border-gray-300 p-2 rounded-md text-sm focus:ring-2 focus:ring-blue-400"
//               placeholder="Dust, Pollen"
//               {...register("allergies")}
//             />
//           </div>

//           <div>
//             <label className="text-sm text-gray-600">Diseases</label>
//             <input
//               className="w-full border border-gray-300 p-2 rounded-md text-sm focus:ring-2 focus:ring-blue-400"
//               placeholder="Diabetes, BP"
//               {...register("diseases")}
//             />
//           </div>

//           <div>
//             <label className="text-sm text-gray-600">Past Surgeries</label>
//             <input
//               className="w-full border border-gray-300 p-2 rounded-md text-sm focus:ring-2 focus:ring-blue-400"
//               placeholder="Knee Surgery"
//               {...register("pastSurgeries")}
//             />
//           </div>

//           <div>
//             <label className="text-sm text-gray-600">Current Medications</label>
//             <input
//               className="w-full border border-gray-300 p-2 rounded-md text-sm focus:ring-2 focus:ring-blue-400"
//               placeholder="Paracetamol"
//               {...register("currentMedications")}
//             />
//           </div>

//           <div className="sm:col-span-2">
//             <label className="text-sm text-gray-600">Upload Reports</label>
//             <input
//               type="file"
//               multiple
//               {...register("reports")}
//               className="w-full mt-2 text-sm"
//             />
//           </div>
//         </div>
//       </div>
//     );
//   }
// );

// export default EmrForAppointment;


import axios from "axios";
import { forwardRef, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import { createEMR } from "../Services/emrApi";
import  type { EmrResponse } from "../Services/emrApi";

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

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const EmrForAppointment = forwardRef<EmrHandle, EmrForAppointmentProps>(
  ({ doctorId, patientId }, ref) => {
    const { register, getValues, reset } = useForm<EMRInputs>();

    const storedPatientId = patientId || localStorage.getItem("userId") || "";
    const storedDoctorId = doctorId || localStorage.getItem("doctorId") || "";

    useImperativeHandle(ref, () => ({
      submitEmr: async (): Promise<EmrResponse | null> => {
        const data = getValues();

        if (!storedPatientId) throw new Error("❌ No patient ID found");
        if (!storedDoctorId.trim()) throw new Error("❌ Doctor ID missing");

        const formData = new FormData();
        formData.append("patientId", storedPatientId);
        formData.append("doctorId", storedDoctorId);
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
          JSON.stringify(data.currentMedications?.split(",").map((s) => s.trim()) || [])
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

        // ✅ Step 1: Create EMR (properly typed)
        const emrResponse: EmrResponse = await createEMR(formData);
        console.log("✅ EMR Created Successfully:", emrResponse);

        // ✅ Step 2: Create Booking
        const bookingPayload = {
          doctorId: storedDoctorId,
          userId: storedPatientId,
          mode: "online",
          datetime: new Date().toISOString(),
          fees: 500,
          status: "booked",
          emrId: (emrResponse?.emr?._id ?? emrResponse?._id) || null,
        };

        console.log("📦 Sending Booking Payload:", bookingPayload);

        try {
          const bookingRes = await axios.post<{ message: string }>(
            `${API_URL}/api/booking/book`,
            bookingPayload,
            { headers: { "Content-Type": "application/json" } }
          );

          console.log("✅ Booking Created Successfully:", bookingRes.data);
          alert("Booking successful!");
        } catch (error) {
          console.error("❌ Booking creation failed:", error);
          alert("Booking failed. Check console for details.");
        }

        reset();
        return emrResponse;
      },
    }));

    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 max-h-[400px] overflow-y-auto">
        <h3 className="text-base font-semibold text-blue-600 mb-3 text-center">
          Add Medical Record (EMR)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-sm text-gray-600">Allergies</label>
            <input
              className="w-full border border-gray-300 p-2 rounded-md text-sm focus:ring-2 focus:ring-blue-400"
              placeholder="Dust, Pollen"
              {...register("allergies")}
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Diseases</label>
            <input
              className="w-full border border-gray-300 p-2 rounded-md text-sm focus:ring-2 focus:ring-blue-400"
              placeholder="Diabetes, BP"
              {...register("diseases")}
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Past Surgeries</label>
            <input
              className="w-full border border-gray-300 p-2 rounded-md text-sm focus:ring-2 focus:ring-blue-400"
              placeholder="Knee Surgery"
              {...register("pastSurgeries")}
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Current Medications</label>
            <input
              className="w-full border border-gray-300 p-2 rounded-md text-sm focus:ring-2 focus:ring-blue-400"
              placeholder="Paracetamol"
              {...register("currentMedications")}
            />
          </div>

          <div className="sm:col-span-2">
            <label className="text-sm text-gray-600">Upload Reports</label>
            <input
              type="file"
              multiple
              {...register("reports")}
              className="w-full mt-2 text-sm"
            />
          </div>
        </div>
      </div>
    );
  }
);

export default EmrForAppointment;
