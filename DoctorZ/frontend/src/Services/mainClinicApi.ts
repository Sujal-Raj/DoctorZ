// clinicApi.ts
import axios from "axios";
import api from "./mainApi";
export interface LoginResponse {
  message: string;
  clinic: {
    id: string;
    staffId: string;
    staffName: string;
    staffEmail: string;
    clinicName: string;
  };
  jwtToken: string;
}
export interface RegisterClinicData {
  clinicName: string;
  clinicType: string;
  specialities: string[];
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
  registrationCert?: File;
}

export const registerClinic = async (data: RegisterClinicData): Promise<any> => {
  const formData = new FormData();
  formData.append("clinicName", data.clinicName);
  formData.append("clinicType", data.clinicType);
  formData.append("specialities", JSON.stringify(data.specialities));
  formData.append("address", data.address);
  formData.append("state", data.state);
  formData.append("district", data.district);
  formData.append("pincode", data.pincode);
  formData.append("contact", data.contact);
  formData.append("email", data.email);
  formData.append("operatingHours", data.operatingHours);
  formData.append("licenseNo", data.licenseNo);
  formData.append("ownerAadhar", data.ownerAadhar);
  formData.append("ownerPan", data.ownerPan);
  formData.append("staffName", data.staffName);
  formData.append("staffEmail", data.staffEmail);
  formData.append("staffPassword", data.staffPassword);
  formData.append("staffId", data.staffId);

  if (data.registrationCert) {
    formData.append("registrationCert", data.registrationCert);
  }

  const response = await axios.post("http://localhost:3000/api/clinic/register", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const loginClinic = (staffId: string, staffPassword: string) => {
  return api.post<LoginResponse>("/api/clinic/clinicLogin", { staffId, staffPassword });
};
