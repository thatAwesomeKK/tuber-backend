import { Router } from "express";
const router = Router();

import publishedController from "../controller/hook/publishedController.js";

router.post("/published", publishedController);

export default router;
