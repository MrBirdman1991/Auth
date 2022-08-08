import { Request, Response, NextFunction } from "express";
import { UserInput } from "../models/user.model";
import { createUser, existingUser } from "../services/user.service";
import { signJwt, verifyJwt } from "../utils/jwt.utils";
import {JwtPayload} from "jsonwebtoken";
import {
  ErrorResponse,
  IJsonResponse,
  SuccessResponse,
} from "../utils/Response";
import { userSchema } from "../schema/user.schema";
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

    const refreshKey = signJwt(
      { id: user.id },
      process.env.REFRESH_KEY as string,
      { expiresIn: "1d" }
    );


    res.cookie("jwt", refreshKey, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000});  
    res.json(new SuccessResponse(_, "user Logged in", {isLoggedIn: true, accessKey}));
  } catch (err) {
    const error = err as IJsonResponse;
    next(new ErrorResponse(error.code, error.message));
  }
};


export const refreshTokenHandler = (req: Request, res: Response, next: NextFunction) => {
  try{
    const cookies = req.cookies;
    if(!cookies.jwt) throw new ErrorResponse(401, "Unauthorized");
    
    const refreshToken = cookies.jwt as string;

    const decode = verifyJwt(refreshToken, process.env.REFRESH_KEY as string) as JwtPayload;
    if(!decode)  throw new ErrorResponse(401, "Unauthorized");

    const accessKey = signJwt(
      { id: decode.id },
      process.env.ACCESS_KEY as string,
      { expiresIn: "15min" }
    );
    res.json(new SuccessResponse(_, "user refreshed AccessKey", {isLoggedIn: true, accessKey}));
  }catch(err){
    const error = err as IJsonResponse;
    next(new ErrorResponse(error.code, error.message));
  }
}