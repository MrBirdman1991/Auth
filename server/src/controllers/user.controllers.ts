import {Request, Response, NextFunction} from "express";
import { UserInput } from "../models/user.model";
import { createUser, isExistingUser } from "../services/user.service";
import { ErrorResponse, IJsonResponse, SuccessResponse } from "../utils/Response";


export const createUserHandler = async (req: Request<{}, {}, UserInput>, res: Response, next: NextFunction) => {
   try{
    const {email} = req.body;
    const isExisting = await isExistingUser(email);
    if(isExisting) throw new ErrorResponse(422, "User already exists")


    const userAgent = req.get('User-Agent') ||"";
    const createdUser = await createUser({...req.body, userAgent});

    res.status(201).json(new SuccessResponse(201, "User created", createdUser))
   }catch(err){
    const error = err as IJsonResponse;
    next(new ErrorResponse(error.code,  error.message))
   }
}