import Video from "../../models/Video.js";

export default async function (req, res) {
  try {
    const user = req.verify;
    const { originalname } = req.body;

    const newVideo = new Video({
      userId: user.uid,
      videoId: `${originalname}_master.m3u8`,
    });

    await newVideo.save();

    return res.status(200).json({
      success: true,
      message: "Video uploading!",
      id: newVideo._id,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
