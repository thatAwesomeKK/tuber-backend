import Comment from "../../models/Comment.js";

export default async function (req, res) {
  try {
    const { videoId, userId, comment } = req.body;

    if (!videoId || !userId || !comment) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all the fields" });
    }

    const findComment = await Comment.findOne({ videoId, userId });
    if (!findComment) {
      return res.status(400).json({
        success: false,
        message: "Comment not found",
      });
    }

    const edittedComment = {};
    if (comment !== findComment.comment) edittedComment.comment = comment;

    await Comment.findOneAndUpdate(findComment._id, edittedComment);

    return res.status(200).json({
      success: true,
      message: "Comment editted success!",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: true, message: "Internal server error" });
  }
}
