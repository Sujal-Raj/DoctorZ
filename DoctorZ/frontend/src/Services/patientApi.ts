// src/api/patient.ts
import api from "./mainApi";

export interface PatientFormPayload {
  fullName: string;
  gender: string;
  dob: string;
  email: string;
  password: string;
  mobileNumber: string;
  Aadhar: string;
  abhaId: string;
  address: {
    city: string;
    pincode: string;
  };
  emergencyContact: {
    name: string;
    number: string;
  };
}

export interface RegisterPatientResponse {
  message: string;
  patientId?: string;
}

export const registerPatient = async (
  formData: PatientFormPayload
): Promise<RegisterPatientResponse> => {
  try {
    const response = await api.post<RegisterPatientResponse>(
      "/api/patient/register",
      formData
    );
    return response.data;
  } catch (error) {
    console.error("Register Patient Error:", error);
    throw error;
  }
};

export interface LoginResponse {
  token: string;
  user: {
    _id: string; // ✅ Corrected from id to _id
    email: string;
  };
}

export interface PatientLoginPayload {
  email: string;
  password: string;
}

export const loginPatient = async (
  credentials: PatientLoginPayload
): Promise<LoginResponse> => {
  const res = await api.post<LoginResponse>("/api/patient/login", credentials);
  return res.data;
};