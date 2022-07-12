import { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "../shared/Button";
import Input from "../shared/Input";
import { loginUserSchema, LoginUserInput } from "../../schema/userSchema";

interface IProps {
  onSubmit: (value: LoginUserInput) => void;
}

const userSchema = loginUserSchema()


const LoginForm: FC<IProps> = ({ onSubmit }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginUserInput>({
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

      <Button type="submit">Submit</Button>
    </form>
  );
};

export default LoginForm;
