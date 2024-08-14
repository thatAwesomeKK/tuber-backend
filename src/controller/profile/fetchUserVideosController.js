import Video from "../../models/Video.js";

export default async function (req, res) {
  try {
    const { userId } = req.body;

    const videos = await Video.find({ userId });

    return res.status(200).json({ success: true, videos });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
