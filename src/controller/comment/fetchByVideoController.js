import { getMinimumProfile } from "@thatawesomekk/single-sign-on";
import Comment from "../../models/Comment.js";

export default async function (req, res) {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide video id" });
    }

    const comments = await Comment.find({ videoId: id });
    if (!comments) {
      return res
        .status(400)
        .json({ success: false, message: "No comments found" });
    }

    const userIds = comments.map((comment) => comment.userId);

    const payload = await fetchAuthor(userIds).then((res) => res.users);

    for (let i = 0; i < comments.length; i++) {
      const comment = comments[i];
      const user = payload.find((user) => user.uid === comment.userId);
      comment._doc.userId = user;
    }

    // for (let i = 0; i < comments.length; i++) {
    //   const comment = comments[i];
    //   const payload = await fetchAuthor(comment.userId);
    //   const user = payload.user;
    //   comment._doc.userId = user;
    // }

    return res.status(200).json({ success: true, comments });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: true, message: "Internal server error" });
  }
}

const fetchAuthor = async (userId) => {
  return await getMinimumProfile(userId);
};
