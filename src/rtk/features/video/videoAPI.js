import customizedAxios from "../../../utils/customizedAxios";
export const getVideo = async (id) => {
  const response = await customizedAxios.get(`/videos/${id}`);
  return response.data;
};
