import axios from "./axiosInstance";
import { CreateUserInput } from "../schema/userSchema";
import { AxiosRequestConfig } from "axios";

export const registerUser = (values: CreateUserInput) =>
  axios.post("/users/register", { ...values });

export const loginUser = (values: CreateUserInput) =>
  axios.post("/users/login", { ...values });

export const refreshToken = (config?: AxiosRequestConfig) =>
  axios.get("/users/refresh", {...config});  