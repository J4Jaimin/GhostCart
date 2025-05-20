import axiosInstance from "./axiosInstance";

export const addToCartApi = async (courseId) => {
  const { data } = await axiosInstance.post("/cart", { courseId });
  return data;
};

export const getCartApi = async () => {
  const { data } = await axiosInstance.get("/cart");
  return data;
};

export const removeFromCartApi = async (courseId) => {
  console.log(courseId);
  const { data } = await axiosInstance.delete(`/cart/${courseId}`);
  return data;
};
