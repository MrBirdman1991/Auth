import { Request, Response, NextFunction } from "express";
import { UserInput } from "../models/user.model";
import { createUser, existingUser } from "../services/user.service";
import { signJwt } from "../utils/jwt.utils";
import {
  ErrorResponse,
  IJsonResponse,
  SuccessResponse,
} from "../utils/Response";
const _ = undefined;

export const createUserHandler = async (
  req: Request<{}, {}, UserInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    const isExisting = await existingUser(email);
    if (isExisting) throw new ErrorResponse(422, "User already exists");

    const userAgent = req.get("User-Agent") || "";
    const createdUser = await createUser({ ...req.body, userAgent });

    res.status(201).json(new SuccessResponse(201, "User created", createdUser));
  } catch (err) {
    const error = err as IJsonResponse;
    next(new ErrorResponse(error.code, error.message));
  }
};

export const loginUserHandler = async (
  req: Request<{}, {}, UserInput>,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    const user = await existingUser(email);
    if (!user) throw new ErrorResponse(401, "Unauthorized");

    const isMatch = await user.matchPasswords(password);
    if (!isMatch) throw new ErrorResponse(401, "Unauthorized");

    const accessKey = signJwt(
      { id: user.id },
      process.env.ACCESS_KEY as string,
      { expiresIn: "15min" }
    );

    res.json(new SuccessResponse(_, "user Logged in", {isLoggedIn: true, accessKey}));
  } catch (err) {
    const error = err as IJsonResponse;
    next(new ErrorResponse(error.code, error.message));
  }
};
