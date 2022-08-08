import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";
export {AuthActionTypes} from "../context/AuthContext"

export const useAuth = () => useContext(AuthContext);