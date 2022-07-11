import  { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { object, string, TypeOf } from "zod";

import Button from "../shared/Button";
import Input from "../shared/Input";

interface IProps {
    onSubmit: (e: any) => void
}

export type CreateUserInput = TypeOf<typeof createUserSchema>;

const createUserSchema = object({
  email: string({
    required_error: "Email is required",
  }).email("not valid email"),

  password: string({
    required_error: "password is required",
  }).min(6, "Password too short - should be 6 chars"),

  passwordConfirmation: string({
    required_error: "password is required",
  }).min(6, "Password too short - should be 6 chars"),
}).refine((data) => data.password === data.passwordConfirmation, {
  message: "Passwords do not match",
  path: ["passwordConfirmation"],
});

const RegisterForm: FC<IProps> = ({onSubmit}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateUserInput>({
    mode: "onBlur",
    resolver: zodResolver(createUserSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Input id="email" type="email" label="email" register={register("email")} errorMessage={errors.email?.message}/>

      <Input id="password" type="password"  label="password" register={register("password")} errorMessage={errors.password?.message}/>

      <Input id="passwordConfirmation" type="password"  label="password repeat" register={register("passwordConfirmation")} errorMessage={errors.passwordConfirmation?.message}/>

      <Button type="submit">Submit</Button>
    </form>
  );
};

export default RegisterForm;
