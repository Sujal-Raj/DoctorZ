import api from "./mainApi"; 

export interface AdminLoginPayload {
  email: string;
  password: string;
}

export interface AdminLoginResponse {
  message: string;
  token: string;
  user: {
    email: string;
   
  };
}

export const adminLogin = async (
  payload: AdminLoginPayload
): Promise<AdminLoginResponse> => {
  try {
    const response = await api.post<AdminLoginResponse>("/api/admin/login", payload);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};
