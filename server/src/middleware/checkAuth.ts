import {Request, Response, NextFunction} from "express"
import { verifyJwt } from "../utils/jwt.utils";
import {JwtPayload} from "jsonwebtoken"

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    if(!authHeader) return res.sendStatus(401)

    const token = authHeader.split(" ")[1];

    try{
       const decoded =  verifyJwt(token, process.env.ACCESS_KEY as string) as JwtPayload;
       res.locals.user = decoded.id;  
       next();
    }catch(err){
        return res.sendStatus(403);
    }
}