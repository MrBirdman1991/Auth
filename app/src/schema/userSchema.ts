import { object, string, TypeOf } from "zod";

export type CreateUserInput = TypeOf<typeof userSchema>;

const userSchema = object({
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

export const createUserSchema = () => userSchema;