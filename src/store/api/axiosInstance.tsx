import axios from "axios";
import { getAccessToken } from "./../../lib/utils";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/",
});

//Add request interceptor
axiosInstance.interceptors.request.use(
  async (config: any) => {
    console.log("request ", config);
    const accessToken = await getAccessToken();
    if (!accessToken) {
      // You can modify the request config here, e.g., add authentication headers
      // config.headers.Authorization = `Bearer ${getToken()}`
      return config;
    }
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// Add response interceptor
axiosInstance.interceptors.response.use(
  (response: any) => {
    // You can modify the response data here
    return response;
  },
  (error: any) => {
    console.log("error ", error);
    httpErrorHandler(error);
    return Promise.reject(error);
  }
);

const httpErrorHandler = (error: any) => {
  if (error === null) throw new Error("Unrecoverable error!! Error is null");
  if (axios.isAxiosError(error)) {
    const response = error?.response;

    if (response) {
      const statusCode = response?.status;
      if (statusCode === 401) {
        console.log("Please login to access the resource");
        window.location.href = "/";
      }
    }
  }
  console.log(error.message);
};

export default axiosInstance;
