import { Router } from "express";
import fetchUserVideosController from "../controller/profile/fetchUserVideosController.js";

const router = Router();

router.post("/videos", fetchUserVideosController);

export default router;
