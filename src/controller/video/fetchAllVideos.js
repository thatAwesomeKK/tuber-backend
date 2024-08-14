import Video from "../../models/Video.js";
import { getMinimumProfile } from "@thatawesomekk/single-sign-on";

export default async function (req, res) {
  try {
    const vids = await Video.find({ isPublished: true }).select(
      "title thumbnail likes videoId userId createdAt views"
    );

    if (!vids) {
      return res.status(400).json({
        success: false,
        message: "No videos found",
      });
    }

    const userIds = vids.map((video) => video.userId);

    const payload = await fetchAuthor(userIds).then((res) => res.users);

    for (let i = 0; i < vids.length; i++) {
      const video = vids[i];
      const user = payload.find((user) => user.uid === video.userId);
      video._doc.userId = user;
    }

    return res.status(200).json({
      success: true,
      videos: vids,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

const fetchAuthor = async (userIds) => {
  return await getMinimumProfile(userIds);
};
