import Video from "../../models/Video.js";

export default async function (req, res) {
  const { fileid } = req.query;
  
  const video = await Video.findById(fileid).select("videoId");
  const videoId = video.videoId;

  return res.status(200).json({
    success: true,
    videoId,
  });
}
