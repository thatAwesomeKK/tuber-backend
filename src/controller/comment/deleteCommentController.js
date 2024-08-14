import Comment from "../../models/Comment.js";

export default async function (req, res) {
  try {
    const { videoid } = req.params;
    const { userId } = req.body;

    const comment = await Comment.findOne({ videoId: videoid, userId });
    if (!comment) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    }

    await Comment.deleteOne({ _id: comment._id });

    return res
      .status(200)
      .json({ success: true, message: "Comment deleted successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}
