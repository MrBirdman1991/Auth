import React, { useReducer, FC } from "react";

export enum AuthActionTypes {
  SET_AUTH = "SET_AUTH",
  RESET_AUTH = "RESET_AUTH",
}

type AuthAction =
  | { type: AuthActionTypes.SET_AUTH; payload: string }
  | { type: AuthActionTypes.RESET_AUTH };

interface AuthState {
  isLoggedIn: boolean;
  key: string;
}

const initialState: AuthState = {
  isLoggedIn: false,
  key: "",
};

// Our reducer function that uses a switch statement to handle our actions
function authReducer(state: AuthState, action: AuthAction) {
  switch (action.type) {
    case AuthActionTypes.SET_AUTH:
      return { isLoggedIn: true, key: action.payload };
    case AuthActionTypes.RESET_AUTH:
      return { isLoggedIn: false, key: ""};
    default:
      return state;
  }
}

interface IAuthContext {
    authState: AuthState,
    authDispatch: React.Dispatch<AuthAction>
}


export const AuthContext = React.createContext<IAuthContext>({authState: initialState, authDispatch: () => {}});

const AuthProvider: FC<{children: JSX.Element[] | JSX.Element}> = (props) => {
    const [authState, authDispatch] = useReducer(authReducer, {
        ...initialState,
      });

    return (
        <AuthContext.Provider value={{authState, authDispatch}}>
            <div>{props.children}</div> 
        </AuthContext.Provider>
    ) 
}

export default AuthProvider;
