import {Router} from "express";

const router = Router();

//@route    GET /api/helper/healthcheck
//@desc     checks if server is running
//@access   Public
router.get("/healthcheck", (req, res, next) => {
    console.log(req.headers)
    res.sendStatus(200)
})

export default router;