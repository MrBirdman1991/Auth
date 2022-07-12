import  { FC, useState } from "react";
import  { AxiosError } from "axios";
import { useNavigate } from 'react-router-dom';

import { CreateUserInput } from "../../schema/userSchema";
import RegisterForm from "../../components/auth/RegisterForm";
import ErrorModal from "../../components/shared/ErrorModal";
import { registerUser } from "../../api/userApi";

interface IError {
  message: string;
  statusCode: number;
}

const RegisterPage: FC = (props) => {
  const navigate = useNavigate();
  const [error, setError] = useState<null | IError>(null);

  async function onSubmitHandler(values: CreateUserInput) {
    try {
      await registerUser(values);
      navigate("/")
    } catch (err) {
      const error = err as AxiosError<IError>;
      const response = error.response?.data as IError;
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

      <h1 className="text-5xl text-gray-800 mb-10">Register</h1>
      <RegisterForm onSubmit={onSubmitHandler} />
    </div>
  );
};

export default RegisterPage;
