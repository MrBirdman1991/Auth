import { refreshToken } from "../api/userApi";
import { useAuth, AuthActionTypes } from "./useAuth";

export const useRefreshToken = () => {
  const {authDispatch, authState} = useAuth()

  const refresh = async () => {
   const {data}  = await refreshToken();
   authDispatch({type: AuthActionTypes.SET_AUTH, payload: data.data.accessKey})
   return data.data.accessKey;
  }

  return refresh;
}
