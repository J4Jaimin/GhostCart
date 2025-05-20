import axiosInstance from "./axiosInstance";

export const registerApi = async (name, email, password) => {
  const { data } = await axiosInstance.post("/auth/register", { name, email, password });
  return data;
};

export const loginApi = async (email, password) => {
  const { data } = await axiosInstance.post("/auth/login", { email, password });
  return data;
};

export const logoutApi = async () => {
  await axiosInstance.post("/auth/logout");
};

export const getUserProfileAPI = async () => {
  const { data } = await axiosInstance.get("/auth/profile");
  return data;
};
