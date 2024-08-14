import { uploadQueue } from "../../config/queue.js";
import { socket } from "../../config/socket.js";
import Video from "../../models/Video.js";

// route for uploading a file  /video/upload
export default async function (req, res) {
  try {
    try {
      const { originalname, user, uploadId } = req.body;

      const newVideo = new Video({
        userId: user.uid,
        videoId: `${originalname}_master.m3u8`,
        expiresAt: user.signInMethod === "guest" ? user.expiresAt : undefined,
      });

      await newVideo.save();

      socket.connect();

      if (socket.connected) {
        socket.emit("connect-metadata", {
          uploadId,
        });
      }

      uploadQueue.push({
        id: uploadId,
        filename: originalname,
      });

      return res.status(200).json({
        success: true,
        message: "Video uploading!",
        videoId: newVideo._id,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  } catch (error) {
    console.log(error);

    console.log(error.response);
  }
}
