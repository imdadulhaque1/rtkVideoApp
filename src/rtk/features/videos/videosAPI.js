import customizedAxios from "../../../utils/customizedAxios";

export const getVideos = async () => {
  const response = await customizedAxios.get("/videos");
  return response.data;
};
