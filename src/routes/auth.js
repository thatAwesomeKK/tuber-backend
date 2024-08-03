import { Router } from "express";
const router = Router();

import loginUserController from "../controller/auth/loginUserController.js";
import AccountController from "../controller/auth/AccountController.js";
import logoutUserController from "../controller/auth/logoutUserController.js";

router.get("/signin", loginUserController);
router.get("/signout", logoutUserController);
router.get("/account", AccountController);

export default router;
