import { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "../shared/Button";
import Input from "../shared/Input";
import { createUserSchema, CreateUserInput } from "../../schema/userSchema";

interface IProps {
  onSubmit: (e: any) => void;
}

const userSchema = createUserSchema()


const RegisterForm: FC<IProps> = ({ onSubmit }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateUserInput>({
    mode: "onBlur",
    resolver: zodResolver(userSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Input
        id="email"
        type="email"
        label="email"
        register={register("email")}
        errorMessage={errors.email?.message}
      />

      <Input
        id="password"
        type="password"
        label="password"
        register={register("password")}
        errorMessage={errors.password?.message}
      />

      <Input
        id="passwordConfirmation"
        type="password"
        label="password repeat"
        register={register("passwordConfirmation")}
        errorMessage={errors.passwordConfirmation?.message}
      />

      <Button type="submit">Submit</Button>
    </form>
  );
};

export default RegisterForm;
