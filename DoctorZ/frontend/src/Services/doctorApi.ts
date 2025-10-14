// src/api/doctorApi.ts

import api from "./mainApi"; // your axios instance

export const registerDoctor = async (formData: FormData) => {
  try {
    const response = await api.post("/api/doctor/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};

interface LoginResponse {
  message: string;
  token: string;
  doctor: {
    _id: string;
    doctorId: string;
    fullName: string;
    email: string;
  };
}

export const loginDoctor = async (
  doctorId: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>("/api/doctor/login", {
      doctorId,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Login Error:", error);
    throw error;
  }
};
