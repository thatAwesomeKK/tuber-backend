import { Router } from "express";
const router = Router();
import uploadVideoController from "../controller/video/uploadVideoController.js";
import updateMetadataController from "../controller/video/updateMetadataController.js";
import fetchVideoMetadataController from "../controller/video/fetchVideoMetadataController.js";
import streamVideoController from "../controller/video/streamVideoController.js";
import fetchAllVideos from "../controller/video/fetchAllVideos.js";
import deleteVideoController from "../controller/video/deleteVideoController.js";
import uploadVideoComplete from "../controller/video/uploadVideoComplete.js";
import streamMetadataController from "../controller/video/streamMetadataController.js";
import fetchVideoByTagController from "../controller/video/fetchVideoByTagController.js";
import handleViewCountController from "../controller/video/handleViewCountController.js";
import handleLikeController from "../controller/video/handleLikeController.js";
import handleDislikeController from "../controller/video/handleDislikeController.js";
import searchVideoController from "../controller/video/searchVideoController.js";

router.post("/upload", uploadVideoController);
router.post("/upload-complete", uploadVideoComplete);
router.put("/update-metadata/:id", updateMetadataController);
router.get("/fetch-metadata/:id", fetchVideoMetadataController);

router.put("/handle-like", handleLikeController);
router.put("/handle-dislike", handleDislikeController);

router.put("/handle-view-count/:id", handleViewCountController);

router.get("/stream/:filename", streamVideoController);
router.get("/stream-metadata", streamMetadataController);
router.get("/fetch", fetchAllVideos);
router.get("/fetch-by-tag/:id", fetchVideoByTagController);
router.get("/search", searchVideoController);

router.delete("/delete/:videoId", deleteVideoController);

export default router;
