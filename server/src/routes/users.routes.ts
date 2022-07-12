import { Router } from "express";
import {
  createUserHandler,
  loginUserHandler,
} from "../controllers/user.controllers";
import validate from "../middleware/validateResource";
import { userSchema } from "../schema/user.schema";

const router = Router();

//@route    POST /api/users/register
//@desc     create a new User
//@access   Public
router.post("/register", validate(userSchema), createUserHandler);

//@route    POST /api/users/login
//@desc     logs user into Dashboard
//@access   Public
router.post("/login", validate(userSchema), loginUserHandler);

export default router;
