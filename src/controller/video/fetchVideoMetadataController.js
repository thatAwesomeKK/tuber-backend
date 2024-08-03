import Video from "../../models/Video.js";

export default async function (req, res) {
  try {
    let videoId = req.body.videoId;
    if (!videoId) {
      return res.status(400).json({
        success: false,
        message: "Please provide a video id",
      });
    }
    const foundVideo = await Video.findById(videoId);
    if (!foundVideo) {
      return res.status(404).json({
        success: false,
        message: "No video found",
      });
    }
    return res.status(200).json({ success: true, video: foundVideo });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
