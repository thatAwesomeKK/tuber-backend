import { Router } from "express";
import createPlaylistController from "../controller/playlist/createPlaylistController.js";
import fetchPlaylistByIdController from "../controller/playlist/fetchPlaylistByIdController.js";
import handleVidsController from "../controller/playlist/handleVidsController.js";
import updatePlaylistController from "../controller/playlist/updatePlaylistController.js";
import deletePlaylistController from "../controller/playlist/deletePlaylistController.js";
import fetchPlaylistByUserIdController from "../controller/playlist/fetchPlaylistByUserIdController.js";
const router = Router();

router.post("/create", createPlaylistController);
router.get("/fetch-by-id/:id", fetchPlaylistByIdController);
router.patch("/update/:id", updatePlaylistController);
router.delete("/delete/:id", deletePlaylistController);

router.get("/fetch-by-user/:userId", fetchPlaylistByUserIdController);

router.patch("/handle-vids/:id", handleVidsController);

export default router;
