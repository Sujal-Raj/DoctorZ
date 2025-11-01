import api from "./mainApi";

export const createEMR = async (formData: FormData) => {
  const res = await api.post("/api/emr/createEmr", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};
