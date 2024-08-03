import { Router } from "express";
const router = Router();
import uploadVideoController from "../controller/video/uploadVideoController.js";
import { verifyAccessToken } from "../middleware/verifyAccessToken.js";
import updateMetadataController from "../controller/video/updateMetadataController.js";
import fetchVideoMetadataController from "../controller/video/fetchVideoMetadataController.js";
import streamVideoController from "../controller/video/streamVideoController.js";
import fetchAllVideos from "../controller/video/fetchAllVideos.js";
import deleteVideoController from "../controller/video/deleteVideoController.js";
import multer from "multer";
import Video from "../models/Video.js";
const upload = multer({ dest: "temp/" });

router.post(
  "/upload",
  verifyAccessToken,
  upload.single("video"),
  uploadVideoController
);
router.post("/fetch-metadata", verifyAccessToken, fetchVideoMetadataController);
router.post("/metadata", verifyAccessToken, updateMetadataController);

router.get("/stream/:filename", streamVideoController);
router.get("/stream-metadata", async (req, res) => {
  const { fileid } = req.query;
  const video = await Video.findById(fileid).select("videoId");
  const videoId = video.videoId;
  return res.status(200).json({
    success: true,
    videoId,
  });
});
router.get("/fetch", fetchAllVideos);

router.delete("/delete/:videoId", verifyAccessToken, deleteVideoController);

export default router;
