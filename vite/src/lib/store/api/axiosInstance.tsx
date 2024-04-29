import axios from "axios";
import { getAccessToken } from "@/lib/utils";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/",
});

//Add request interceptor
axiosInstance.interceptors.request.use(
  async (config: any) => {
    const token = await getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('Sending request with config:', config);
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
      }
    }
  }
  console.log(error.message);
};

export default axiosInstance;
