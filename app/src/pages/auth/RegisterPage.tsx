import React, { FC, useState } from "react";
import axios, { AxiosError } from "axios";

import { CreateUserInput } from "../../components/auth/RegisterForm";
import RegisterForm from "../../components/auth/RegisterForm";
import ErrorModal from "../../components/shared/ErrorModal";

interface IError {
  message: string;
  statusCode: number;
}

const RegisterPage: FC = (props) => {
  const [error, setError] = useState<null | IError>(null);

  async function onSubmitHandler(values: CreateUserInput) {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/register",
        { ...values }
      );
      console.log(response);
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
