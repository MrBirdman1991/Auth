import "dotenv/config"
import express, { NextFunction, Request, Response } from "express";
import connect from "./utils/connect";
import logger from "./utils/logger";
import cors from "cors";
import cookieParser from "cookie-parser";


import helperRoutes from "./routes/helper.routes";
import usersRoutes from "./routes/users.routes";
import { IJsonResponse } from "./utils/Response";

const PORT = process.env.PORT || 8080;
const connectionString = process.env.DB_URI as string;
const app = express();


app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true
    })
  );

app.use(cookieParser());  

app.use(express.json()); 
app.use("/api/helper", helperRoutes);
app.use("/api/users", usersRoutes);


//ErrorHandler
app.use(
    (error: IJsonResponse, req: Request, res: Response, next: NextFunction) => {
      if (res.headersSent) return next(error);
      res.status(error.code).json({ ...error });
    }
  );


app.listen(PORT, async () => {
    logger.info(`app is running on ${PORT}`);
    await connect(connectionString);
  });
  