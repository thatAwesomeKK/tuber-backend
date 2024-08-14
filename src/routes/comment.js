import { Router } from "express";
import fetchByVideoController from "../controller/comment/fetchByVideoController.js";
import createCommentController from "../controller/comment/createCommentController.js";
import deleteCommentController from "../controller/comment/deleteCommentController.js";
import editCommentController from "../controller/comment/editCommentController.js";
const router = Router();

router.post("/create", createCommentController);
router.get("/fetch-by-video/:id", fetchByVideoController);
router.delete("/delete/:videoid", deleteCommentController);
router.put("/edit", editCommentController);

export default router;
