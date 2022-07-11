import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";
import { ErrorResponse } from "../utils/Response";

const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (err: any) {
      next(new ErrorResponse(422,  "validation error", err.errors))
    }
  };

export default validate;
