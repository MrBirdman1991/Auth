import { object, string, TypeOf } from "zod";

export const userSchema = object({
  body: object({
    email: string({
      required_error: "Email is required",
    }).email("not valid email"),

    password: string({
      required_error: "password is required",
    }).min(6, "Password too short - should be 6 chars"),
  }),
});
