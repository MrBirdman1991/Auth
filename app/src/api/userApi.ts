import axios from "./axiosInstance";
import { CreateUserInput } from "../schema/userSchema";

export const registerUser =  (values: CreateUserInput) => axios.post(
    "/users/register",
    { ...values }
  )