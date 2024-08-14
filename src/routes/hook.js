import { Router } from "express";
const router = Router();

import publishedController from "../controller/hook/publishedController.js";
import videoDeleteController from "../controller/hook/videoDeleteController.js";
import publishedThumbnail from "../controller/hook/publishedThumbnail.js";

router.post("/published-video", publishedController);
router.post("/published-thumbnail", publishedThumbnail);
router.delete("/delete:/id", videoDeleteController);

export default router;
