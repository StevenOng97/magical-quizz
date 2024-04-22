import axios from "axios";
import { camelizeKeys } from "humps";
import { storage } from "@/lib/utils";

const axiosClient = axios.create({
  // Uncomment once we integrate our API
  // headers: {
  //   'Access-Control-Allow-Origin': '*',
  // },
  // withCredentials: true,
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = storage.getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => {
    if (response.headers["content-type"].indexOf("application/json") > -1) {
      response.data = camelizeKeys(response.data);
    }
    return response?.data;
  },
  (error) => Promise.reject(error?.response?.data)
);

export const DEFAULT_API_PATH = "/api";

export const API_VERSION = {
  v1: "v1",
};

export default axiosClient;
