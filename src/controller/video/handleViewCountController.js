import Video from "../../models/Video.js";

export default async function (req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Please provide a video id",
      });
    }
    const foundVideo = await Video.findById(id);
    if (!foundVideo) {
      return res.status(404).json({
        success: false,
        message: "No video found",
      });
    }

    await Video.findOneAndUpdate(
      { _id: foundVideo._id },
      {
        $inc: {
          views: 1,
        },
      }
    );
    return res.status(200).json({
      success: true,
      message: "View count updated",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
