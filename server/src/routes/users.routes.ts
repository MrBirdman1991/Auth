import {Router} from "express";
import { createUserHandler } from "../controllers/user.controllers";
import validate from "../middleware/validateResource"
import { userSchema } from "../schema/user.schema";


const router = Router();

//@route    POST /api/usersregister
//@desc     create a new User
//@access   Public
router.post("/register", validate(userSchema),createUserHandler)

export default router;