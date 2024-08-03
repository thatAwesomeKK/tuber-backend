import { Router } from "express";
import fetchPfpController from "../controller/profile/fetchPfpController.js";
import { verifyAccessToken } from "../middleware/verifyAccessToken.js";
import fetchUserVideos from "../controller/profile/fetchUserVideos.js";
const router = Router();

router.get("/pfp", verifyAccessToken, fetchPfpController);
router.get("/videos", verifyAccessToken, fetchUserVideos);

export default router;
