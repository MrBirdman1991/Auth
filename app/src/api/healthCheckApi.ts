import axios from "./axiosInstance";




export const healthCheck = () => {
  return axios.get("/helper/healthcheck");
}


