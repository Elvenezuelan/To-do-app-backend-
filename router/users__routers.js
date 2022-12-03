import userscontrollers from "../controllers/userscontrollers.js";
import { Router } from "express";

const router = Router();

router.route("/user/signup").post(userscontrollers.create);

router.route("/user/login").post(userscontrollers.logIn);

export default router;
