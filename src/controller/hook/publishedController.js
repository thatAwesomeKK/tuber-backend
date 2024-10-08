import Video from "../../models/Video.js";
import { uploadQueue } from "../../config/queue.js";
import { socket } from "../../config/socket.js";

const clientUrl = process.env.CLIENT_URL;

export default async function (req, res) {
  try {
    const { filename, thumbnail } = req.body;

    console.log(filename);

    const updateVideo = await Video.findOneAndUpdate(
      {
        videoId: filename,
      },
      { isPublished: true, thumbnail }
    );

    const index = uploadQueue.findIndex((item) =>
      filename.includes(item.filename)
    );

    const uploadId = uploadQueue[index].id;

    uploadQueue.splice(index, 1);

    socket.emit("process-complete", { uploadId });
    socket.disconnect();

    res.status(200).send("ok");
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
