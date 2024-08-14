import Video from "../../models/Video.js";

export default async function (req, res) {
  const { videoId } = req.params;

  try {
    const foundVideo = await Video.findById(videoId);
    if (!foundVideo) {
      return res
        .status(404)
        .json({ success: false, message: "Video not found" });
    }

    await Video.findByIdAndDelete(foundVideo._id);

    return res.status(200).json({ success: true, message: "Video Deleted" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}
