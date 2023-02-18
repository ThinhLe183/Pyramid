import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { refreshAccessToken } from "./authService";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080/api/v1/",
  timeout: 10 * 1000,
  withCredentials: true,
  headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
});

const handleRefreshTokenExpire = () => {
  localStorage.clear();
};

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    const status = error.response ? error.response.status : null;

    if (status === 401 && !originalRequest._retry) {
      //custom field prevent infinite loop
      originalRequest._retry = true;
      // Refresh token when get authorized error
      try {
        const { access_token: newAccessToken } = await refreshAccessToken();
        if (!originalRequest.headers) {
          originalRequest.headers = {};
        }
        originalRequest.headers.Authorization = newAccessToken;
        return axios(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }
    //Refresh token failed
    if (status === 401) {
      handleRefreshTokenExpire();
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
