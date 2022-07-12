import { FC } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface IProps {
  type: "text" | "email" | "password";
  placeholder?: string;
  id: string;
  label?: string;
  register: UseFormRegisterReturn;
  errorMessage: string | undefined;
}

function Input(props: IProps) {
  return (
    <>
      <div className="m-1">
        {props.label && <label htmlFor={props.id}>{props.label}</label>}

        <input
          {...props.register}
          id={props.id}
          type={props.type}
          placeholder={props.placeholder && props.placeholder}
          className={`border-2 transition duration-500  placeholder-blue-400 focus:placeholder-transparent ${
            props.errorMessage
              ? "border-red-400 text-red-400"
              : "border-blue-400 text-blue-400"
          }  min-w-full py-2 text-center  bg-transparent rounded-md focus:outline-none shadow-md`}
        />
        {props.errorMessage && (
          <small className="text-red-600">{props.errorMessage}</small>
        )}
      </div>
    </>
  );
}

export default Input;
