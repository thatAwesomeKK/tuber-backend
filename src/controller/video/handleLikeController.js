import Video from "../../models/Video.js";

export default async function (req, res) {
  try {
    const { videoId, userId } = req.body;

    const video = await Video.findById(videoId);

    if (video.likes.includes(userId)) {
      await Video.findOneAndUpdate(
        { _id: videoId },
        {
          $pull: {
            likes: userId,
          },
        }
      );
      return res.status(200).json({
        success: true,
        message: "Like Removed!",
        likes: video.likes.length - 1 > 0 ? video.likes.length - 1 : 0,
        dislikes: video.dislikes.length,
      });
    } else {
      await Video.findOneAndUpdate(
        { _id: videoId },
        {
          $pull: {
            dislikes: userId,
          },
          $addToSet: {
            likes: userId,
          },
        }
      );
      return res.status(200).json({
        success: true,
        message: "Like Added!",
        likes: video.likes.length + 1,
        dislikes: video.dislikes.length - 1 > 0 ? video.dislikes.length - 1 : 0,
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}
