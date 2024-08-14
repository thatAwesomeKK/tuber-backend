import { getMinimumProfile } from "@thatawesomekk/single-sign-on";
import Video from "../../models/Video.js";

export default async function (req, res) {
  const { id } = req.params;

  try {
    const foundVideo = await Video.findById(id);
    if (!foundVideo) {
      return res
        .status(404)
        .json({ success: false, message: "Video not found" });
    }

    const videos = await Video.find({
      _id: { $ne: foundVideo._id },
      tags: { $in: foundVideo.tags },
    });

    const userIds = videos.map((video) => video.userId);

    const payload = await fetchAuthor(userIds).then((res) => res.users);

    for (let i = 0; i < videos.length; i++) {
      const video = videos[i];
      const user = payload.find((user) => user.uid === video.userId);
      video._doc.userId = user;
    }

    return res.status(200).json({
      success: true,
      videos,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}

const fetchAuthor = async (userId) => {
  return await getMinimumProfile(userId);
};
