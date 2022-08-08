import axios from "../api/axiosInstance";
import { useAuth, AuthActionTypes } from "./useAuth";

const useRefreshToken = () => {
  const {authDispatch} = useAuth()

  const refresh = async () => {
  }
}

export default useRefreshToken