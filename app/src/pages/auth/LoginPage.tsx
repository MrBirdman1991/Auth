import  { FC, useState, useContext } from "react";
import   { AxiosError } from "axios";
import { useNavigate } from 'react-router-dom';

import { CreateUserInput } from "../../schema/userSchema";
import LoginForm from "../../components/auth/LoginForm";
import ErrorModal from "../../components/shared/ErrorModal";
import { loginUser} from "../../api/userApi";
import { AuthActionTypes, AuthContext } from "../../context/AuthContext";

interface IError {
  message: string;
  statusCode: number;
}

const LoginPage: FC = (props) => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState<null | IError>(null);

  async function onSubmitHandler(values: CreateUserInput) {
    try {
      const {data} = await loginUser(values)
      authContext.authDispatch({type: AuthActionTypes.SET_AUTH, payload: data.data.accessKey})
      navigate("/")
    } catch (err) {
      const error = err as AxiosError<IError>;
      const response = error.response?.data as IError;
      console.log(response)
      setError(response);
    }
  }

  return (
    <div>
      {error?.message && (
        <ErrorModal
          errorMessage={error && error.message}
          onChange={(e) => {
            setError(null);
          }}
        />
      )}

      <h1 className="text-5xl text-gray-800 mb-10">Login</h1>
      <LoginForm onSubmit={onSubmitHandler} />
    </div>
  );
};

export default LoginPage;
