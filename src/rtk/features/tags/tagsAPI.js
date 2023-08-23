import customizedAxios from "../../../utils/customizedAxios";

export const getTags = async () => {
  const response = await customizedAxios.get("/tags");
  return response.data;
};
