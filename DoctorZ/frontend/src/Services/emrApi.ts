//  // import api from "./mainApi";

// // export interface EmrResponse {
// //   _id: string;
// //   patientId?: string;
// //   doctorId?: string;
// //   [key: string]: unknown;
// // }


// // export const createEMR = async (formData: FormData): Promise<EmrResponse>  => {
// //   const res = await api.post<EmrResponse>("/api/emr/createEmr", formData, {
// //     headers: { "Content-Type": "multipart/form-data" },
// //   });

// //   return res.data;
// // };

import api from "./mainApi";

export interface EmrResponse {
  _id: string;
  patientId?: string;
  doctorId?: string;
  emr?: { _id?: string };
  [key: string]: unknown;
}

export const createEMR = async (formData: FormData): Promise<EmrResponse> => {
  const res = await api.post<EmrResponse>("/api/emr/createEmr", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};
