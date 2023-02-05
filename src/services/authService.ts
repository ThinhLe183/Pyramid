import axiosClient from "./axiosClient";

export const refreshAccessToken = async () => {
  const response = await axiosClient.post("auth/refreshToken", {
    refresh_token: localStorage.getItem("refresh_token"),
  });
  localStorage.setItem("access_token", response.data.access_token);
  localStorage.setItem("refresh_token", response.data.refresh_token);
  return response.data;
};
