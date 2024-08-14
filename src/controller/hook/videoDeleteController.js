import Video from "../../models/Video.js";

export default async function (req, res) {
  try {
    const { filename } = req.params;

    await Video.findOneAndDelete({
      videoId: filename,
    });

    res.status(200).send("ok");
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
