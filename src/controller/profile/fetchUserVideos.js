import Video from "../../models/Video.js";

export default async function (req, res) {
  try {
    const user = req.verify;
    const vids = await Video.find({ userId: user.uid }).select(
      "title thumbnail likes videoId userId description"
    );
    if (!vids) {
      return res.status(400).json({
        success: false,
        message: "No videos found",
      });
    }

    return res.status(200).json({
      success: true,
      videos: vids,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
