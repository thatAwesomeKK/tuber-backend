import Comment from "../../models/Comment.js";

export default async function (req, res) {
  try {
    const { videoId, userId, comment, expiresAt } = req.body;
    console.log(req.body);

    if (!videoId || !userId || !comment) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all the fields" });
    }

    const newComment = await new Comment({
      videoId,
      userId,
      comment,
      expiresAt: expiresAt ?? undefined,
    }).save();

    return res.status(200).json({
      success: true,
      message: "Comment created success!",
      comment: newComment,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: true, message: "Internal server error" });
  }
}
