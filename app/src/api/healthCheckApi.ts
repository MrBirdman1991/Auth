import axios from "./axiosInstance";
import { AxiosRequestConfig } from "axios";


export const healthCheck = () => {
  return axios.get("/helper/healthcheck");
}

export const authCheck = (config?: AxiosRequestConfig ) => {
  return axios.get("/helper/authcheck", {...config});
}

