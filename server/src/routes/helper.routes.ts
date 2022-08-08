import {Router} from "express";
import { checkAuth } from "../middleware/checkAuth";

const router = Router();

//@route    GET /api/helper/healthcheck
//@desc     checks if server is running
//@access   Public
router.get("/healthcheck", (req, res, next) => {
    res.sendStatus(200)
})

//@route    GET /api/helper/authcheck
//@desc     checks if user is logged in
//@access   private
router.get("/authcheck",checkAuth, (req, res, next) => {
    res.json("the user is ...")
})

export default router;