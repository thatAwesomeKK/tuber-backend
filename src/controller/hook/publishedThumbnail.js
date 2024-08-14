import Video from "../../models/Video.js";
import { uploadQueue } from "../../config/queue.js";
import { socket } from "../../config/socket.js";

const clientUrl = process.env.CLIENT_URL;

export default async function (req, res) {
  try {
    const { filename, thumbnail } = req.body;

    const updateVideo = await Video.findOneAndUpdate(
      {
        videoId: filename,
      },
      { thumbnail }
    );

    const uploadId = uploadQueue.find((item) =>
      filename.includes(item.filename)
    ).id;
    console.log("UploadId: " + uploadId);

    socket.emit("thumbnail-complete", { uploadId, thumbnail });

    res.status(200).send("ok");
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
